function Main({ children }) {
  return (
    <main className='p-sm md:p-md bg-bg flex-1 overflow-y-auto md:flex-initial'>
      <div className='animate-fade-scale mx-auto w-full md:max-w-6xl'>
        {children}
      </div>
    </main>
  );
}

export default Main;
