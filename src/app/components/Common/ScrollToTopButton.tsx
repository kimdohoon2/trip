import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import useScrollTop from '@/app/hooks/useScrollTop';

interface ScrollToTopButtonProps {
  className?: string;
  buttonClassName?: string;
  spanClassName?: string;
  text?: string;
  showText?: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  className = '',
  buttonClassName = '',
  spanClassName = '',
  text = 'TOP',
  showText = true,
}) => {
  const { scrollToTop } = useScrollTop();

  return (
    <div className={className} onClick={scrollToTop}>
      <button aria-label="페이지 맨 위로 이동" onClick={scrollToTop} className={buttonClassName}>
        <FontAwesomeIcon icon={faUpLong} />
        {showText && <span className={spanClassName}>{text}</span>}
      </button>
    </div>
  );
};

export default ScrollToTopButton;
