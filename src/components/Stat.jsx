function Stat({ value, label, colorClass }) {
  return (
    <div className='flex flex-col items-center gap-1 px-5 py-2'>
      <span className={`font-display text-2xl font-bold ${colorClass}`}>
        {value}
      </span>
      <span className='text-text-muted text-xs'>{label}</span>
    </div>
  );
}

export default Stat;
