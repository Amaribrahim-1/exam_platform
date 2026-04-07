function PageHeader({ head, description }) {
  return (
    <header className='flex flex-col gap-2'>
      <h1 className='font-display text-text gap-sm flex items-center text-xl font-bold'>
        {head}
      </h1>
      <p className='text-text-muted text-sm'>{description}</p>
    </header>
  );
}

export default PageHeader;
