import { useCallback, useEffect, useState } from 'react';

type UseTriggerRefreshReturn = [show: boolean, triggerRefresh: () => void];

const useTriggerRefresh = (delay = 0): UseTriggerRefreshReturn => {
  const [refreshing, setRefreshing] = useState(false);

  const triggerRefresh = useCallback(() => setRefreshing(true), []);

  useEffect(() => {
    if (refreshing) {
      if (delay) {
        setTimeout(() => setRefreshing(false), delay);
      } else {
        setRefreshing(false);
      }
    }
  }, [refreshing, delay]);

  return [refreshing, triggerRefresh];
};

export default useTriggerRefresh;
