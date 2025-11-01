'use client';

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

const ErrorBoundary = ({ error, reset }: ErrorBoundaryProps) => {
  return <p>에러입니다...</p>;
};

export default ErrorBoundary;
