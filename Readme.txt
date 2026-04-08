# Exam.io — Multi-Module Exam Platform

A modern, professional exam management system designed for instructors and students. Built with a focus on **reusable architecture**, **scalability**, and **seamless user experience**.

---

## 🚀 Recent Progress

### 1. Instructor Dashboard Layout
- **Global Design System**: Configured Tailwind CSS v4 theme with custom design tokens for spacing, colors, and shadows.
- **Responsive Layout**: Engineered a professional-grade grid layout featuring:
    - Persistent Sidebar with active link tracking (using `NavLink`).
    - Dynamic Navbar with User Profile and navigation logic.
    - Fully responsive main content area that adapts to all device sizes.

### 2. Exam Creation Wizard (Basic Info Step)
- **Reusable Component Architecture**: Developed a custom UI kit to speed up development and ensure consistency:
    - `Button`: Multi-variation component (Primary, Secondary, Ghost).
    - `FormRow`: A reusable wrapper handling labels, required indicators, and error state logic.
    - `PageHeader` & `ProgressIndicator`: To guide the instructor through the multi-step creation process.
- **Form Management**: Integrated `React Hook Form` for high-performance validation and state handling.
- **Validation**: Robust error handling for all required metadata (Duration, Passing Score, Difficulty, and Timing).

---

## 🛠️ Tech Stack & Patterns

- **Frontend**: React.js with Tailwind CSS v4.
- **State & Forms**: React Hook Form, Zustand (Planned).
- **Backend**: Supabase (PostgreSQL, Auth).
- **Architecture**: Atomic Design Principles (splitting UI into reusable Atoms and Molecules).
- **UX/UI**: Mobile-first approach with focus on accessibility.

---

## 🚦 Current Status
- [x] Dashboard Layout & Navigation
- [x] Basic Info Phase
- [ ] Question Management Phase (In Progress)
- [ ] Exam Preview & Logic