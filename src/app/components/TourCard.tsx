import { TourItem } from "../type/type";
import Image from "next/image";

export default function TourCard({ item }: { item: TourItem }) {
  // 이미지가 없으면 null 반환
  if (!item.firstimage) {
    return null; // 이미지가 없을 경우 아무것도 렌더링하지 않음
  }

  return (
    <div>
      <Image src={item.firstimage} alt={item.title} width={100} height={100} />
      <div>{item.title}</div>
    </div>
  );
}
