interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`shinny rounded-md bg-[#A4A1AA] ${className} `} />;
}
