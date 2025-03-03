import React, { useEffect, useState } from 'react';
import { useToastStore } from '@/app/stores/useToastStore';

const Toast: React.FC = () => {
  const { message, type, clearMessage } = useToastStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        clearMessage();
      }, 150); // 애니메이션 완료 후 메시지 초기화
    }, 1500);

    return () => clearTimeout(timer);
  }, [message, clearMessage]);

  if (!message && !visible) return null;

  // Tailwind 클래스를 조건부로 지정
  const baseClass =
    'text-sm fixed bottom-16 left-1/2 z-50 -translate-x-1/2 transform rounded-md p-4 shadow-lg text-white transition-opacity duration-300 lg:text-base';
  const typeClass = {
    success: 'bg-red',
    error: 'bg-black',
  };

  return (
    <div className={`${baseClass} ${typeClass[type]} ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {message}
    </div>
  );
};

export default Toast;
