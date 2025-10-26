'use client';

import Lottie from 'lottie-react';

import loadingAnimation from '../../../../public/lottie/loading-2.json';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Lottie animationData={loadingAnimation} style={{ width: 120 }} />
    </div>
  );
};

export default Loading;
