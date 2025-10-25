'use client';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return <p>에러입니다...</p>;
};

export default Error;
