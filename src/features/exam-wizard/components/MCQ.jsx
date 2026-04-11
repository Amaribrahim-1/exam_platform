import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ErrorMessage from "../../../components/ErrorMessage";
import { useExamData } from "../hooks/useExamData";
import Button from "../../../components/Button";

function MCQ() {
  const {
    questions,
    editingQuestionId,
    setEditingQuestionId,
    handleAddQuestion,
  } = useExamData();

  const questionToEdit =
    questions?.find((q) => q.id === editingQuestionId) || null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: editingQuestionId
      ? {
          ...questionToEdit,
          correctAnswerIndex: String(questionToEdit.correctAnswerIndex),
        }
      : {},
  });

  function onSubmit(data) {
    // حولنا الـ Object لـ Array عشان يتخزن صح
    const optionsArray = Array.isArray(data.options)
      ? data.options
      : Object.values(data.options);

    const finalQuestion = {
      type: "MCQ",
      question: data.question,
      options: optionsArray,
      correctAnswerIndex: Number(data.correctAnswerIndex), // تأكد من الاسم هنا
      marks: Number(data.marks),
    };

    handleAddQuestion(finalQuestion);

    toast.success(
      `Question ${editingQuestionId ? "updated" : "added"} successfully!`,
    );

    reset({
      question: "",
      options: ["", "", "", ""],
      correctAnswerIndex: null,
      marks: "",
    });
  }

  const optionsList = [1, 2, 3, 4];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-lg border-border bg-surface p-lg rounded-lg border'
    >
      <div className='gap-sm flex flex-col'>
        <label className='text-text-muted text-xs font-semibold uppercase'>
          Question
        </label>
        <textarea
          dir='auto'
          {...register("question", { required: "Question is required" })}
          className='border-border bg-surface-2 p-md text-text placeholder-text-muted focus:border-primary min-h-20 w-full rounded-lg border transition-colors outline-none'
          placeholder='Enter your question here...'
        ></textarea>
        <ErrorMessage message={errors.question?.message} />
      </div>

      <div className='gap-lg flex flex-col'>
        <label className='text-text text-sm font-bold tracking-wide uppercase'>
          Select Correct Answer & Enter Options
        </label>

        {optionsList.map((num) => (
          <div
            key={num}
            className='gap-lg border-border bg-surface-2 p-lg hover:border-primary flex items-center rounded-lg border transition-all'
          >
            <input
              type='radio'
              value={num - 1}
              {...register("correctAnswerIndex", {
                required: "Please select the correct answer.",
              })}
              className='accent-accent h-5 w-5 cursor-pointer'
            />

            <input
              type='text'
              placeholder={`Option ${num}`}
              className='text-text placeholder-text-faint flex-1 border-none bg-transparent outline-none'
              {...register(`options.${num - 1}`, {
                required: "Option is required",
              })}
            />
            {errors.options?.[num - 1] && (
              <ErrorMessage message={errors.options?.[num - 1]?.message} />
            )}
          </div>
        ))}
        <ErrorMessage message={errors.correctAnswerIndex?.message} />
      </div>

      <div className='gap-lg flex items-end'>
        <div className='gap-sm flex flex-col'>
          <label className='text-text-muted text-xs font-semibold uppercase'>
            Points
          </label>
          <input
            type='number'
            min={1}
            className='border-border bg-surface-2 p-md text-text focus:border-primary w-32 rounded-lg border transition-colors outline-none'
            placeholder='Enter marks'
            {...register("marks", { required: "Marks are required" })}
          />
          <ErrorMessage message={errors.marks?.message} />
        </div>
      </div>

      <button
        type='submit'
        className='bg-primary px-lg py-md text-bg hover:bg-opacity-90 w-full cursor-pointer rounded-lg font-bold transition-all active:scale-95'
      >
        {editingQuestionId ? "Update MCQ Question" : "Add MCQ Question"}
      </button>

      {editingQuestionId && (
        <button
          onClick={() => {
            reset({
              question: "",
              options: ["", "", "", ""],
              correctAnswerIndex: null,
              marks: "",
            });
            setEditingQuestionId(null);
          }}
          type='button'
          className='bg-surface-2 px-lg py-md text-text hover:bg-opacity-90 w-full cursor-pointer rounded-lg font-bold transition-all active:scale-95'
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default MCQ;
