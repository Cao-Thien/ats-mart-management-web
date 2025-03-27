import Skeleton, { SkeletonProps } from '@mui/material/Skeleton';

type Props = SkeletonProps;

export default function AtsSkeleton({ animation = 'wave', ...rest }: Props) {
  return <Skeleton animation={animation} {...rest} />;
}
