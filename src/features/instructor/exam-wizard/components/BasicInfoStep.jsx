import { useForm } from "react-hook-form";
import Button from "../../../../components/Button";
import FormRow from "../../../../components/FormRow";
import { useExamData } from "../hooks/useExamData";
import { formatDateForInput } from "../../../../Utils/formatDate";

const GRADES = ["Grade 1", "Grade 2", "Grade 3", "Grade 4"];
const DEPARTMENTS = [
  "General",
  "computer science",
  "information systems",
  "information technology",
];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

function BasicInfoStep({ onNext }) {
  const { examDetails, handleExamDetails, isEditMode } = useExamData();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    values: {
      ...examDetails,
      startDate: formatDateForInput(examDetails?.startDate),
      endDate: formatDateForInput(examDetails?.endDate),
    },
  });

  function onSubmit(data) {
    handleExamDetails({
      ...examDetails,   // preserve id, instructor_id, etc. in edit mode
      ...data,
    });
    onNext();
  }

  const inputClass = (fieldError) => `
    w-full px-md py-sm text-sm font-medium rounded-md border bg-surface-2 text-text
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0
    ${fieldError ? "border-danger focus:border-danger focus:ring-danger/20" : "border-border focus:border-primary focus:ring-primary/20"}
  `;

  return (
    <div className="bg-surface p-lg rounded-md">
      <h2 className="text-text mb-lg text-2xl font-bold">Exam Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="gap-lg flex flex-col">
        {/* Exam Name & Subject */}
        <div className="gap-lg grid grid-cols-1 md:grid-cols-2">
          <FormRow label="Exam Name" error={errors.title?.message} required>
            <input
              {...register("title", { required: "Exam title is required" })}
              placeholder="e.g. Midterm — Data Structures"
              className={inputClass(errors.title)}
            />
          </FormRow>

          <FormRow label="Subject" error={errors.subject?.message} required>
            <input
              {...register("subject", { required: "Subject is required" })}
              placeholder="e.g. Data Structures"
              className={inputClass(errors.subject)}
            />
          </FormRow>
        </div>

        {/* Duration & Difficulty */}
        <div className="gap-lg grid grid-cols-1 md:grid-cols-2">
          <FormRow
            label="Duration (minutes)"
            error={errors.duration?.message}
            required
          >
            <input
              type="number"
              placeholder="e.g. 60"
              min="1"
              {...register("duration", { required: "Required", min: 1 })}
              className={inputClass(errors.duration)}
            />
          </FormRow>

          <FormRow
            label="Difficulty"
            error={errors.difficulty?.message}
            required
          >
            <select
              {...register("difficulty", { required: "Select difficulty" })}
              className={inputClass(errors.difficulty)}
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d.toLowerCase()}>
                  {d}
                </option>
              ))}
            </select>
          </FormRow>
        </div>

        {/* Dates */}
        <div className="gap-lg grid grid-cols-1 md:grid-cols-2">
          <FormRow
            label="Start Date & Time"
            error={errors.startDate?.message}
            required
          >
            <input
              type="datetime-local"
              {...register("startDate", {
                required: "Date & time is required",
                setValueAs: (v) => (v ? new Date(v).toISOString() : v),
              })}
              className={inputClass(errors.startDate)}
            />
          </FormRow>
          <FormRow
            label="End Date & Time"
            error={errors.endDate?.message}
            required
          >
            <input
              type="datetime-local"
              {...register("endDate", {
                required: "Date & time is required",
                setValueAs: (v) => (v ? new Date(v).toISOString() : v),
              })}
              className={inputClass(errors.endDate)}
            />
          </FormRow>

          <FormRow label="Grade" error={errors.grade?.message} required>
            <select
              {...register("grade", { required: "Select Grade" })}
              className={inputClass(errors.grade)}
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </FormRow>

          <FormRow
            label="Department"
            error={errors.department?.message}
            required
          >
            <select
              {...register("department", { required: "Select Department" })}
              className={inputClass(errors.department)}
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </FormRow>
        </div>

        {/* Buttons */}
        <div className={`mt-lg gap-3 flex flex-wrap items-center justify-end`}>
          <Button
            variation="secondary"
            size="md"
            type="button"
            onClick={() => {
              reset({
                title: "",
                subject: "",
                duration: "",
                difficulty: "",
                startDate: "",
                endDate: "",
                grade: "",
                department: "",
              });
            }}
          >
            Clear Data
          </Button>

          <Button variation="primary" size="md" type="submit">
            Next (Add Questions) →
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BasicInfoStep;
