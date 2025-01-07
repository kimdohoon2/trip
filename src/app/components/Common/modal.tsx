import React from 'react';

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  // 배경 클릭 시 모달을 닫을 수 있도록 하는 함수
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="bg-bgopacity fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackgroundClick}
    >
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <p className="text-center text-lg font-bold">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 block w-full rounded-lg bg-blue-500 py-2 text-center text-white"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
