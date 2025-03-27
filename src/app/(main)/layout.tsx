'use client';

import { ReactNode } from 'react';
import BasicLayout from '@/components/templates/layouts';

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <BasicLayout>{children}</BasicLayout>;
}
