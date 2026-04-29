import { cn } from '../../lib/utils';

interface SkeletonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Skeleton({ className, size = 'md' }: SkeletonProps) {
  const height = {
    sm: 'h-4',
    md: 'h-8',
    lg: 'h-12'
  }[size];

  return (
    <div className={cn(
      'animate-pulse rounded-md bg-muted',
      height,
      className
    )} />
  );
}

export default Skeleton;

