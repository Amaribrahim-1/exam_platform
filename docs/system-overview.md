# Exam.io System Overview (LLM-Optimized)

## Tech Stack
- Frontend: React 19, Vite 8
- Routing: `react-router-dom` (protected + role-based routing)
- Data fetching/cache: TanStack Query (`@tanstack/react-query`)
- Backend: Supabase (Auth, Postgres, Realtime, Storage)
- Styling/UI: Tailwind CSS v4, shadcn styles, `tw-animate-css`
- Forms/UX: React Hook Form, React Toastify, Framer Motion, Recharts

## Project Architecture
- `src/features/auth`: authentication and user session mapping
- `src/features/student`: available exams, exam session, results, profile, history, dashboard
- `src/features/instructor`: exam wizard, exam management, students, history, results, dashboard
- `src/features/admin`: admin routes/pages (currently placeholders)
- `src/services`: shared Supabase data services (`supabase.js`, `examApi.js`, `userApi.js`)
- `src/components` + `src/layouts`: shared UI shell, navigation, route guards
- `src/hooks`: shared reusable hooks (e.g., exams/filters/state)

Core logic centers around:
- `src/App.jsx` for route tree
- `src/components/ProtectedRoute.jsx` and `src/components/RoleRoute.jsx` for access control
- `src/features/student/exam-session/*` for exam runtime
- `src/features/instructor/exam-wizard/*` and `src/services/examApi.js` for exam publishing

## Core Features & Roles

### Student
- View eligible exams based on profile (`grade`, `department`)
- Start and take timed exams with anti-cheat enforcement
- Submit manually or via auto-submit (timeout/violations)
- View result details and exam history
- Complete/update profile (required for exam eligibility)

### Instructor
- Create exams with 3-step wizard (metadata, questions, review/publish)
- Publish exams and manage status/lifecycle
- View exam history and submission-level performance
- Review individual student result records
- Access student aggregates through materialized app views

### Admin
- Admin-protected route space exists (`/admin/*`)
- Current pages are scaffolds/placeholders (dashboard/users/exams/reports)

## Data Flow (Exam Lifecycle)
1. Instructor creates exam metadata and questions in wizard context (state persisted locally during draft).
2. On publish, app inserts `exams` row then bulk inserts `questions` rows with `exam_id`.
3. Student available exams query returns active exams filtered by student profile constraints.
4. Student opens `exam-session/:examId`; session data (`exam + questions`) is fetched.
5. During exam, answers/position/flags/timer are tracked in context and synced to local storage.
6. Anti-cheat + timer + realtime exam status updates can trigger auto-submit.
7. On submit, app calculates score from canonical DB questions and inserts into `exam_submissions`.
8. Result/history/dashboard queries are invalidated and refreshed for student/instructor views.

## Key Modules & Logic

### `ExamSessionContext`
File: `src/features/student/exam-session/context/ExamSessionContext.jsx`
- Owns in-session state: `currentQ`, `userAnswers`, `flagged`, `timerSec`
- Restores/persists session state to local storage
- Resets stale local state when `examId` changes
- Initializes countdown from exam timing (`end_date`, `duration`)
- Computes `timeTaken` and submits with reason: `manual`, `time_up`, or `cheat`
- Subscribes to Supabase Realtime (`exams` updates) and forces submission if exam closes

### `useExamSession`
File: `src/features/student/exam-session/hooks/useExamSession.js`
- TanStack Query wrapper keyed by `["examSession", examId]`
- Fetches exam payload via `fetchExamSession(examId)` from `examSessionApi`
- Returns `{ examSession, isFetchingExamSession }`

### Timer handling
- Source of truth: `timerSec` in exam session context
- Countdown implemented with recursive `setTimeout` (avoids `setInterval` drift accumulation)
- Auto-submit when timer reaches zero (`reason = "time_up"`)
- Local storage stores active timer state to survive refreshes

### Anti-cheat handling
File: `src/features/student/exam-session/hooks/useAntiCheat.js`
- Detects: tab switches, blur/focus loss, devtools heuristics, blocked shortcuts, right-click, copy/select attempts, navigation away, back/forward attempts, split-screen/resize heuristics
- Tracks violation count and warns user
- Auto-submits exam after max violations (default: 3) with `reason = "cheat"`

## Database Schema (Supabase)
Public schema core tables:
- `exams` (exam metadata, schedule, targeting, status; FK `instructor_id -> auth.users.id`)
- `questions` (question payload; FK `exam_id -> exams.id`)
- `exam_submissions` (attempt/results; FK `exam_id -> exams.id`, `user_id -> auth.users.id`)
- `student_profiles` (student attributes; FK `id -> auth.users.id`)
- `instructor_profiles` (instructor attributes; FK `id -> auth.users.id`)

Views used by app:
- `exam_results_view`: joins submissions + exams + profiles + user metadata; includes computed percentage
- `students_view`: per-student aggregate performance metrics for instructor-facing analytics

Relationship model:
- one instructor -> many exams
- one exam -> many questions
- one exam -> many submissions
- one student user -> one profile + many submissions
- submissions connect students to exams

## Coding Standards & Integration Notes
- Feature-first React organization under `src/features/<role>/<domain>`
- Tailwind utility-first styling with centralized design tokens in `src/index.css`
- Supabase access encapsulated in domain service files and consumed by query/mutation hooks
- Route-level auth + role gates enforced before layout rendering
- React Query invalidation strategy used after mutations for data consistency
- Local storage used intentionally for wizard draft persistence and exam-session continuity
