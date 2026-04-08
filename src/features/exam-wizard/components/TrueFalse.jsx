import { useForm } from "react-hook-form";

function TrueFalse({ onAdd }) {
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    console.log(data);

    const question = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now(),
      type: "TrueFalse",
      question: data.question,
      options: ["True", "False"],
      correctOption: Number(data.correctAnswerIndex),
      marks: Number(data.marks),
    };

    onAdd(question);
    reset();
  }

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
      </div>

      <div className='gap-lg flex flex-col'>
        <label className='text-text text-sm font-bold tracking-wide uppercase'>
          Select Correct Answer
        </label>

        <label className='gap-lg border-border bg-surface-2 p-lg hover:border-accent flex cursor-pointer items-center rounded-lg border transition-all'>
          <input
            type='radio'
            value={0}
            {...register("correctAnswerIndex", { required: true })}
            className='accent-accent h-5 w-5 cursor-pointer'
          />
          <span className='text-text text-base font-medium'>True</span>
        </label>

        <label className='gap-lg border-border bg-surface-2 p-lg hover:border-accent flex cursor-pointer items-center rounded-lg border transition-all'>
          <input
            type='radio'
            value={1}
            {...register("correctAnswerIndex", { required: true })}
            className='accent-accent h-5 w-5 cursor-pointer'
          />
          <span className='text-text text-base font-medium'>False</span>
        </label>
      </div>

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
      </div>

      <button
        type='submit'
        className='bg-accent px-lg py-md text-bg hover:bg-opacity-90 w-full cursor-pointer rounded-lg font-bold transition-all active:scale-95'
      >
        Add True/False Question
      </button>
    </form>
  );
}

export default TrueFalse;
