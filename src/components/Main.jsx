function Main({ children }) {
  return (
    <main className="flex-1 md:flex-initial overflow-y-auto p-sm md:p-xl bg-bg">
      <div className="w-full md:max-w-5xl mx-auto animate-fade-scale">
        {children}
      </div>
    </main>
  );
}

export default Main;
