// app/loading.tsx
'use client';

import AtsLoading from '@/components/atoms/AtsLoading';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return <AtsLoading open={show} />;
}
