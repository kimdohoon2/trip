'use client';

import React, { useEffect, useRef } from 'react';
import useSessionStorage from '@/app/hooks/useSessionStorage';
import { SESSION_STORAGE_KEYS } from '@/app/constant/sessionStorageKeys';

export default function LeftBottomBar() {
  const pathRefs = [
    useRef<SVGPathElement>(null),
    useRef<SVGPathElement>(null),
    useRef<SVGPathElement>(null),
    useRef<SVGPathElement>(null),
  ];
  const [hasAnimated, setHasAnimated] = useSessionStorage(SESSION_STORAGE_KEYS.ANIMATED, false);

  useEffect(() => {
    if (hasAnimated) return;

    const animatePath = (pathRef: React.RefObject<SVGPathElement>, delay: number) => {
      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();

        path.style.strokeDasharray = length.toString();
        path.style.strokeDashoffset = length.toString();
        path.style.stroke = 'black';
        path.style.fill = 'transparent';

        setTimeout(() => {
          path.style.transition = 'stroke-dashoffset 2s ease-in-out, fill 1s ease-in-out 2s';
          path.style.strokeDashoffset = '0';
          path.style.fill = 'black';
        }, delay);
      }
    };

    const delays = [0, 500, 1500, 2000];
    pathRefs.forEach((ref, index) => animatePath(ref, delays[index]));

    // 모든 애니메이션이 완료된 후 상태 업데이트
    setTimeout(() => setHasAnimated(true), 4000);
  }, [hasAnimated, setHasAnimated]);

  return (
    <svg
      className="h-full w-full"
      width="400"
      height="600"
      viewBox="0 0 400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path ref={pathRefs[0]} d="M400 600H300V0H400V600Z" strokeWidth="5" />
      <path ref={pathRefs[1]} d="M250 600H150V325H250V600Z" strokeWidth="5" />
      <path ref={pathRefs[2]} d="M250 275H150V-5.96046e-06H250V275Z" strokeWidth="5" />
      <path ref={pathRefs[3]} d="M100 600H0V0H100V600Z" strokeWidth="5" />
    </svg>
  );
}
