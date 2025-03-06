'use client';

import React, { useEffect, useRef } from 'react';
import useSessionStorage from '@/app/hooks/useSessionStorage';
import { SESSION_STORAGE_KEYS } from '@/app/constant/sessionStorageKeys';

export default function CircleDown() {
  const pathRef = useRef<SVGPathElement>(null);
  const [hasAnimated, setHasAnimated] = useSessionStorage(SESSION_STORAGE_KEYS.ANIMATED, false);

  useEffect(() => {
    if (hasAnimated) return;

    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();

      path.style.opacity = '0';
      path.style.strokeDasharray = length.toString();
      path.style.strokeDashoffset = length.toString();

      // 강제 리플로우 (렌더링 트리거)
      path.getBoundingClientRect();

      setTimeout(() => {
        path.style.opacity = '1';
        path.style.transition = 'stroke-dashoffset 2s ease-in-out';
        path.style.strokeDashoffset = '0';
      }, 100);

      setTimeout(() => {
        path.style.transition = 'fill 1s ease-in-out';
        path.style.fill = '#003478';
        setHasAnimated(true);
      }, 2000);
    }
  }, [hasAnimated, setHasAnimated]);

  return (
    <svg
      className="h-full w-full"
      width="1200"
      height="904"
      viewBox="0 0 1200 904"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d="M1200 304H1199.97C1199.99 302.669 1200 301.335 1200 300C1200 134.315 1065.69 0 900 0C734.314 0 600 134.315 600 300C600 301.335 600.008 302.669 600.026 304H599.974C597.833 467.842 464.35 600 300 600C135.65 600 2.16699 467.842 0.0258789 304H0C0 635.371 268.629 904 600 904C931.371 904 1200 635.371 1200 304Z"
        fill={hasAnimated ? '#003478' : 'transparent'}
        stroke="#003478"
        strokeWidth="3"
        strokeDasharray={length}
        strokeDashoffset={length}
      />
    </svg>
  );
}
