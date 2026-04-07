function FormRow({ label, error, children, required }) {
  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label className='text-text-muted block text-xs font-semibold tracking-wide uppercase'>
          {label} {required && <span className='text-danger'>*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className='text-danger mt-1 flex items-center gap-1 text-xs font-medium'>
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

export default FormRow;
