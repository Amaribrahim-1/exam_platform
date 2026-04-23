import { useEffect, useState } from "react";

function CircularProgress({ percentage }) {
  const size = 180;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setDisplayed(Math.round((1 - Math.pow(1 - p, 3)) * percentage));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [percentage]);

  const offset = circumference - (displayed / 100) * circumference;

  const ringClass =
    percentage >= 80
      ? "stroke-primary"
      : percentage >= 60
        ? "stroke-warning"
        : "stroke-danger";

  const textClass =
    percentage >= 80
      ? "text-primary"
      : percentage >= 60
        ? "text-warning"
        : "text-danger";

  return (
    <div
      className='relative flex items-center justify-center'
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className='absolute -rotate-90'>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          strokeWidth={stroke}
          className='stroke-border'
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          strokeWidth={stroke}
          strokeLinecap='round'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={ringClass}
        />
      </svg>
      <div className='relative flex flex-col items-center'>
        <span
          className={`font-display leading-none font-bold ${textClass}`}
          style={{ fontSize: 40 }}
        >
          {displayed}%
        </span>
        <span className='text-text-muted mt-1 text-sm'>Score</span>
      </div>
    </div>
  );
}

export default CircularProgress;
