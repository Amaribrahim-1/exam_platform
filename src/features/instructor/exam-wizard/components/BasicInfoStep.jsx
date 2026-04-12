import { useForm } from "react-hook-form";
import Button from "../../../../components/Button";
import FormRow from "../../../../components/FormRow";
import { useExamData } from "../hooks/useExamData";

function BasicInfoStep({ onNext }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    values: localStorage.getItem("exam-details")
      ? JSON.parse(localStorage.getItem("exam-details"))
      : {},
  });

  const { handleExamDetails } = useExamData();

  function onSubmit(data) {
    handleExamDetails({
      ...data,
      status: "draft",
      instructorId: "d3608b52-2c2d-4b00-b898-2241f9329279",
    });
    onNext();
  }

  const inputClass = (fieldError) => `
    w-full px-md py-sm text-sm font-medium rounded-md border bg-surface-2 text-text
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0
    ${fieldError ? "border-danger focus:border-danger focus:ring-danger/20" : "border-border focus:border-primary focus:ring-primary/20"}
  `;

  return (
    <div className='bg-surface p-lg rounded-md'>
      <h2 className='text-text mb-lg text-2xl font-bold'>Exam Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='gap-lg flex flex-col'>
        {/* Exam Name & Subject */}
        <div className='gap-lg grid grid-cols-1 md:grid-cols-2'>
          <FormRow label='Exam Name' error={errors.title?.message} required>
            <input
              {...register("title", { required: "Exam title is required" })}
              placeholder='e.g. Midterm — Data Structures'
              className={inputClass(errors.title)}
            />
          </FormRow>

          <FormRow label='Subject' error={errors.subject?.message} required>
            <input
              {...register("subject", { required: "Subject is required" })}
              placeholder='Enter subject name'
              className={inputClass(errors.subject)}
            />
          </FormRow>
        </div>

        {/* Duration & Difficulty */}
        <div className='gap-lg grid grid-cols-1 md:grid-cols-2'>
          <FormRow
            label='Duration (minutes)'
            error={errors.duration?.message}
            required
          >
            <input
              type='number'
              min='1'
              {...register("duration", { required: "Required", min: 1 })}
              className={inputClass(errors.duration)}
            />
          </FormRow>

          <FormRow
            label='Difficulty'
            error={errors.difficulty?.message}
            required
          >
            <select
              {...register("difficulty", { required: "Select difficulty" })}
              className={inputClass(errors.difficulty)}
            >
              <option value=''>Select level</option>
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </FormRow>
        </div>

        {/* Start Date & Time & End Date & Time */}
        <div className='gap-lg grid grid-cols-1 md:grid-cols-2'>
          <FormRow
            label='Start Date & Time'
            error={errors.startDate?.message}
            required
          >
            <input
              type='datetime-local'
              {...register("startDate", {
                required: "Date & time is required",
              })}
              className={inputClass(errors.startDate)}
            />
          </FormRow>

          <FormRow
            label='End Date & Time'
            error={errors.endDate?.message}
            required
          >
            <input
              type='datetime-local'
              {...register("endDate", { required: "Date & time is required" })}
              className={inputClass(errors.endDate)}
            />
          </FormRow>
        </div>

        {/* Buttons Section */}
        <div className={`mt-lg gap-md flex items-center justify-end`}>
          <Button
            variation='secondary'
            size='md'
            onClick={() => {
              reset({
                title: "",
                subject: "",
                duration: "",
                difficulty: "",
                startDate: "",
                endDate: "",
              });
              localStorage.removeItem("exam-details");
            }}
          >
            Clear Data
          </Button>

          <Button variation='primary' size='md' type='submit'>
            Next (Add Questions) →
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BasicInfoStep;
