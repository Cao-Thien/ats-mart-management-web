import { useCallback, useState } from 'react';

type UseTriggerRefreshReturn = [shouldUpdate: number, triggerUpdate: () => void];

const useTriggerUpdate = (): UseTriggerRefreshReturn => {
  const [shouldUpdate, setShouldUpdate] = useState(1);

  const triggerUpdate = useCallback(() => setShouldUpdate(prevState => ++prevState), []);

  return [shouldUpdate, triggerUpdate];
};

export default useTriggerUpdate;
