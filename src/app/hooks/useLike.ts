import { useToastStore } from '@/app/stores/useToastStore';
import { useInteractionStore } from '@/app/stores/useInteractionStore';

export default function useLike() {
  const { heartStates, setHeartStates } = useInteractionStore();
  // 좋아요 버튼 함수
  const toggleHeart = (contentid: string) => {
    const isLiked = heartStates[contentid];

    if (isLiked) {
      setHeartStates((prevStates) => ({
        ...prevStates,
        [contentid]: false,
      }));
      useToastStore.setState({
        message: '좋아요가 취소되었습니다!',
        type: 'error', // 취소 시 에러 타입
      });
    } else {
      setHeartStates((prevStates) => ({
        ...prevStates,
        [contentid]: true,
      }));
      useToastStore.setState({
        message: '좋아요를 클릭하셨습니다!',
        type: 'success', // 추가 시 성공 타입
      });
    }
  };
  return {
    heartStates,
    toggleHeart,
  };
}
