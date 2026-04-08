import { TrashIcon } from "lucide-react";

function QuestionsPreview({ questions, handleDelete }) {
  return (
    <div className='gap-lg flex flex-col'>
      <div className='flex items-center justify-between'>
        <h2 className='text-text text-lg font-bold'>
          Questions Added ({questions.length})
        </h2>
        <span className='text-text-muted text-sm'>
          Total: {questions.reduce((sum, q) => sum + q.marks, 0)} points
        </span>
      </div>
      <div className='space-y-md'>
        {questions.map((question, index) => (
          <div
            key={question.id}
            className='border-border bg-surface-2 p-lg hover:border-text-faint rounded-lg border transition-all'
          >
            <div className='mb-md flex items-center justify-between'>
              <span className='gap-sm bg-surface px-md py-sm inline-flex items-center rounded-full'>
                <span className='text-primary text-xs font-semibold uppercase'>
                  Q{index + 1}
                </span>
                <span className='text-accent text-xs font-bold'>
                  {question.marks} pts
                </span>
              </span>
              <span className='text-text-muted text-md flex items-center gap-2.5 font-medium uppercase'>
                {question.type}
                {handleDelete && (
                  <TrashIcon
                    onClick={() => handleDelete(question.id)}
                    className='text-danger cursor-pointer'
                  />
                )}
              </span>
            </div>
            <p className='mb-md text-text font-medium' dir='auto'>
              {question.question}
            </p>
            <div className='gap-sm flex flex-col'>
              {question.options.map((option, optIdx) => (
                <div
                  key={optIdx}
                  className={`gap-sm px-md py-sm flex items-center rounded ${
                    optIdx === question.correctOption
                      ? "bg-opacity-20 border-accent text-accent border-l-2"
                      : "text-text-muted"
                  }`}
                >
                  <span className='text-xs font-semibold'>
                    {String.fromCharCode(65 + optIdx)}.
                  </span>
                  <span>{option}</span>
                  {optIdx === question.correctOption && (
                    <span className='ml-auto text-xs font-bold uppercase'>
                      ✓ Correct
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionsPreview;
