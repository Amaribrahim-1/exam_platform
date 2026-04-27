import { Edit2Icon, TrashIcon } from "lucide-react";
import { useExamData } from "../hooks/useExamData";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import { useState } from "react";

function QuestionPreviewCard({ questions, handleDelete, handleEdit }) {
  const { editingQuestionId } = useExamData();
  const [questionToDeleteId, setQuestionToDeleteId] = useState(null);

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
            key={index}
            className='border-border bg-surface-2 p-lg hover:border-text-faint rounded-lg border transition-all'
          >
            <div className='mb-md flex items-center justify-between'>
              <span className='gap-sm bg-surface px-md py-sm inline-flex items-center rounded-full'>
                <span className='text-accent text-xs font-semibold uppercase'>
                  Q{index + 1}
                </span>
                <span className='text-accent text-xs font-bold'>
                  {question.marks} pts
                </span>
              </span>
              <div className='gap-md flex items-center'>
                <span className='text-text-muted text-md font-medium uppercase'>
                  {question.type}
                </span>
                <div className='flex items-center gap-3'>
                  {handleEdit && (
                    <Button
                      onClick={() => handleEdit(question.id)}
                      disabled={editingQuestionId !== null}
                      variation="ghost"
                      size="icon"
                      className="text-primary hover:bg-primary/10"
                    >
                      <Edit2Icon size={20} />
                    </Button>
                  )}
                  {handleDelete && (
                    <Button
                      onClick={() => setQuestionToDeleteId(question.id)}
                      disabled={editingQuestionId !== null}
                      variation="ghost"
                      size="icon"
                      className="text-danger hover:bg-danger/10"
                    >
                      <TrashIcon size={20} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <p className='mb-md text-text font-medium' dir='auto'>
              {question.question}
            </p>
            <div className='gap-sm flex flex-col'>
              {question.options.map((option, optIdx) => (
                <div
                  key={optIdx}
                  className={`gap-sm px-md py-sm flex items-center rounded ${optIdx === question.correctAnswerIndex
                    ? "bg-opacity-20 border-accent text-accent border-l-2"
                    : "text-text-muted"
                    }`}
                >
                  <span className='text-xs font-semibold'>
                    {String.fromCharCode(65 + optIdx)}.
                  </span>
                  <span>{option}</span>
                  {optIdx === question.correctAnswerIndex && (
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

      <Modal
        isOpen={questionToDeleteId !== null}
        onClose={() => setQuestionToDeleteId(null)}
        title="Delete Question"
        actions={
          <>
            <Button
              onClick={() => setQuestionToDeleteId(null)}
              variation="secondary"
              size="md"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDelete(questionToDeleteId);
                setQuestionToDeleteId(null);
              }}
              variation="danger"
              size="md"
            >
              Delete
            </Button>
          </>
        }
      >
        <div className="flex flex-col items-center justify-center p-6 gap-2 text-center w-[90vw] sm:w-[22rem]">
          <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center text-danger mb-2">
            <TrashIcon size={24} />
          </div>
          <h3 className="text-lg font-bold text-text">Are you sure?</h3>
          <p className="text-text-muted text-sm max-w-[15rem]">
            This action cannot be undone. This will permanently delete the question from this exam.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default QuestionPreviewCard;
