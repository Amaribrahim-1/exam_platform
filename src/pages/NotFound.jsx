import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { SearchX } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='bg-bg flex min-h-screen flex-col items-center justify-center p-6 text-center'>
      <div className='relative mb-8 flex items-center justify-center'>
        <div className='bg-primary/10 absolute h-32 w-32 animate-pulse rounded-full blur-xl'></div>
        <SearchX size={80} className='text-primary relative z-10' />
      </div>

      <h1 className='font-display text-text mb-4 text-6xl font-bold tracking-tight md:text-8xl'>
        404
      </h1>
      <h2 className='text-text mb-6 text-2xl font-semibold md:text-3xl'>
        Page Not Found
      </h2>
      <p className='text-text-muted mb-10 max-w-[24rem] text-base md:text-lg'>
        Sorry, the page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
      </p>

      <Button
        onClick={() => navigate(-1)}
        variation='primary'
        size='lg'
        className='shadow-glow transition-transform hover:scale-105'
      >
        Go Back
      </Button>
    </div>
  );
}

export default NotFound;
