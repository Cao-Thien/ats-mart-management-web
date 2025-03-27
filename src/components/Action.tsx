import { SyntheticEvent } from 'react';

export type FormSubmitEvent = SyntheticEvent<HTMLFormElement, SubmitEvent>;

export type ProcessHandler = (e: FormSubmitEvent) => void;

type Props = {
  id: string;
  onProcess: ProcessHandler;
};

// Purpose is to make onClick event trigger globally
// This needs another button which type is "submit" and form equal to this id to trigger
const Action = ({ id, onProcess }: Props) => {
  return (
    <form
      id={id}
      onSubmit={(e: FormSubmitEvent) => {
        e.preventDefault();
        onProcess(e);
      }}
      noValidate
      style={{ display: 'none' }}
    />
  );
};

export default Action;
