import { useState } from 'react';

export const useModalLogic = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
