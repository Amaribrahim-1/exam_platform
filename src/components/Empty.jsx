import { FiInbox } from "react-icons/fi";

function Empty({ message, children }) {
  return (
    <div className='border-border bg-surface/30 animate-fade-scale flex h-100 w-full flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center'>
      {/* أيقونة شيك مع تأثير Glow */}
      <div className='relative mb-6'>
        <div className='bg-primary absolute inset-0 rounded-full opacity-20 blur-2xl'></div>
        <FiInbox className='text-text-muted/50 relative size-16' />
      </div>

      {/* العنوان باستخدام Font Display (Clash Display) */}
      <h3 className='font-display text-text mb-2 text-2xl font-semibold tracking-tight'>
        {message || "No data found"}
      </h3>

      {/* وصف فرعي لكسر حدة الصفحة */}
      <p className='text-text-muted max-w-62.5 text-sm leading-relaxed'>
        It seems there's nothing to show here at the moment.
      </p>

      {children && <div className='animate-slide-in'>{children}</div>}

      {/* لمسة جمالية: Shimmer Line */}
      <div className='bg-shimmer-grad animate-shimmer mt-8 h-px w-24'></div>
    </div>
  );
}

export default Empty;
