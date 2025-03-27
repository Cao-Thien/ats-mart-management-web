type Props = {
  id: string;
  onClick: () => void;
};

// Purpose is to make onClick event trigger globally
// This needs another button which type is "submit" and form equal to this id to trigger
const TriggerButton = ({ id, onClick }: Props) => {
  return (
    <form
      id={id}
      onSubmit={e => {
        e.preventDefault();
        onClick();
      }}
      noValidate
      style={{ display: 'none' }}
    />
  );
};

export default TriggerButton;
