"use client"

import dynamic from 'next/dynamic';

const AnimationLottie = dynamic(
  () => import('./animation-lottie'),
  { 
    ssr: false,
    loading: () => <div style={{ width: '95%' }} />
  }
);

export default AnimationLottie;