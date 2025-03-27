'use client';

import AtsSelect, { SelectChangeEvent } from '@/components/AtsSelect';

// HOOKS
import { useInputQuery } from 'hooks/router';

type Props = {
  defaultView: string;
  viewOptions: { name: string; value: string }[];
};

export default function CabanasHeader({ viewOptions, defaultView }: Props) {
  const [view, setView] = useInputQuery('view', defaultView);

  return (
    <>
      <AtsSelect
        label="메뉴 선택"
        value={view}
        data={viewOptions}
        placeholder="View"
        // @ts-ignore
        onChange={(event: SelectChangeEvent) => setView(event.target.value)}
      />
    </>
  );
}
