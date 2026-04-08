function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <p className='text-danger mt-1 flex items-center gap-1 px-1.5 text-sm font-medium'>
      <span>⚠</span> {message}
    </p>
  );
}

export default ErrorMessage;
