function ProgressIndicator({ step_param }) {
  const steps = [
    { id: 1, label: "Basic Info" },
    { id: 2, label: "Questions" },
    { id: 3, label: "Review & Publish" },
  ];

  return (
    <div className='flex items-center justify-around'>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`flex ${index < steps.length - 1 ? "flex-1" : ""} items-center`}
        >
          {/* Step Circle */}
          <div className='flex flex-col items-center'>
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                step.id < step_param
                  ? "bg-primary text-text"
                  : step.id === step_param
                    ? "ring-primary ring-offset-surface bg-surface-2 text-primary border-primary border ring-2 ring-offset-2"
                    : "bg-surface-2 text-text-muted border-border border"
              }`}
            >
              {step.id < step_param ? "✓" : step.id}
            </div>
            <p
              className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                step.id <= step_param ? "text-text" : "text-text-muted"
              }`}
            >
              {step.label}
            </p>
          </div>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div
              className='mx-2 mb-6 h-1 flex-1 rounded-full transition-all duration-300'
              style={{
                backgroundColor:
                  step.id < step_param
                    ? "var(--color-primary)"
                    : "var(--color-border)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProgressIndicator;
