import React from 'react';

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmOnly?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  message,
  onClose,
  onConfirm,
  confirmOnly = false,
}) => {
  if (!isOpen) return null;

  // 배경 클릭 시 모달을 닫을 수 있도록 하는 함수
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bgopacity"
      onClick={handleBackgroundClick}
    >
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <p className="text-center text-lg font-bold">{message}</p>
        <div className="mt-4 flex gap-4">
          {/* 확인 버튼 */}
          <button
            onClick={onConfirm || onClose}
            className="flex-1 rounded-lg bg-blue-500 py-2 text-center text-white"
          >
            확인
          </button>
          {/* 닫기(취소) 버튼 (확인 버튼만 보이는 경우 제외) */}
          {!confirmOnly && (
            <button
              onClick={onClose}
              className="flex-1 rounded-lg bg-gray py-2 text-center text-white"
            >
              취소
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
