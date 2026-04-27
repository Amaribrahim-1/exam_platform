import { Component } from "react";
import Button from "./Button";
import { AlertTriangle } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='bg-bg flex min-h-screen flex-col items-center justify-center p-6 text-center'>
          <div className='relative mb-8 flex items-center justify-center'>
            <div className='bg-danger/10 absolute h-32 w-32 animate-pulse rounded-full blur-xl'></div>
            <AlertTriangle size={80} className='text-danger relative z-10' />
          </div>

          <h1 className='font-display text-text mb-4 text-4xl font-bold md:text-5xl'>
            Oops! Something went wrong.
          </h1>
          <p className='text-text-muted mb-6 max-w-lg text-base md:text-lg'>
            We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
          </p>

          {this.state.error && (
            <div className='bg-surface-2 border-border mb-10 max-w-xl overflow-hidden rounded-lg border p-4 text-left shadow-lg'>
              <p className='text-danger font-mono text-sm break-words whitespace-pre-wrap'>
                {this.state.error.toString()}
              </p>
            </div>
          )}

          <Button
            onClick={() => window.location.replace("/")}
            variation='primary'
            size='lg'
            className='shadow-glow transition-transform hover:scale-105'
          >
            Reload Platform
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
