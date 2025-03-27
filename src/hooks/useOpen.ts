import { useCallback, useMemo, useState } from 'react';

type OpenComponentFn<Data = undefined> = Data extends undefined ? () => void : (data: Data) => void;

type ChangeComponentState<State> = <Key extends keyof State>(key: Key, value: State[Key]) => void;

type ComponentProps = {
  open: boolean;
  onClose: () => void;
};

const useOpen = <Data = undefined, State = undefined>(
  defaultState?: State extends undefined ? never : State
): [
  OpenComponentFn<Data>, // function to open outer UI component (could be dialog, popover, etc.)
  ComponentProps, // outer UI component props
  Partial<Data>, // data passed to inner component (component inside UI component)
  ChangeComponentState<State>, // function to change outer UI component state, pass this function to inner component
  State, // shared state of UI component, use to communicate from inner component with UI component
] => {
  const [openState, setOpenState] = useState<{ open: boolean; openData: Partial<Data> }>({ open: false, openData: {} });
  const [componentState, setComponentState] = useState<State>(defaultState || ({} as State));

  const openComponent = useCallback(
    (data?: Data) => setOpenState({ open: true, openData: data || {} }),
    []
  ) as OpenComponentFn<Data>;

  const changeComponentState: ChangeComponentState<State> = useCallback(
    (key, value) => setComponentState(prevState => ({ ...prevState, [key]: value })),
    [setComponentState]
  );

  const componentProps: ComponentProps = useMemo(
    () => ({
      open: openState.open,
      onClose: () => {
        setOpenState({ open: false, openData: {} });
        setComponentState({} as State);
      },
    }),
    [openState.open]
  );

  return [openComponent, componentProps, openState.openData, changeComponentState, componentState];
};

export default useOpen;
