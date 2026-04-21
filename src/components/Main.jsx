function Main({ children }) {
  return (
    <main
      id='main-content'
      className='mt-md px-lg py-md bg-bg flex-1 overflow-y-auto md:flex-initial'
    >
      <div className='animate-fade-scale mx-auto w-full'>{children}</div>
    </main>
  );
}

export default Main;
