'use client';

import React, { useEffect, useRef } from 'react';
import useSessionStorage from '@/app/hooks/useSessionStorage';
import { SESSION_STORAGE_KEYS } from '@/app/constant/sessionStorageKeys';

export default function CircleUp() {
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
        path.style.fill = '#C8102E';
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
        d="M0.532525 599.5H0.500204C0.770261 268.635 269.072 0.5 600 0.5C921.944 0.5 1184.62 254.273 1198.89 572.695C1183.23 421.444 1055.39 303.5 900 303.5C735.541 303.5 601.939 435.613 599.533 599.5H599.467L599.474 600.007C599.492 601.336 599.5 602.667 599.5 604C599.5 769.409 465.409 903.5 300 903.5C134.591 903.5 0.5 769.409 0.5 604C0.5 602.667 0.508288 601.336 0.525835 600.007L0.532525 599.5Z"
        fill="transparent"
        stroke="#C8102E"
        strokeWidth="3"
        strokeDasharray={length}
        strokeDashoffset={length}
      />
    </svg>
  );
}
