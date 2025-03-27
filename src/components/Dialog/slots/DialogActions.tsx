import { ReactNode } from 'react';
import MuiDialogActions from '@mui/material/DialogActions';
import Button, { ButtonProps } from '@mui/material/Button';

export type DialogActionButtonProps =
  | (Omit<ButtonProps, 'fullWidth'> & {
      label?: ReactNode;
    })
  | {
      button: ReactNode; // render button
    };

export type DialogActionsProps = {
  actions?: DialogActionButtonProps[];
  cancelText?: string;
  actionsLayout?: 'onlyClose' | 'noAction';
  onClose: () => void;
};

const DialogActions = ({ actions, cancelText, actionsLayout, onClose }: DialogActionsProps) => {
  if (actionsLayout === 'noAction') {
    return null;
  }

  if (actionsLayout === 'onlyClose') {
    return (
      <MuiDialogActions>
        {(actions || []).map((buttonProps, key) => {
          if ('button' in buttonProps) {
            return buttonProps.button;
          }

          const { onClick, ...restButtonProps } = buttonProps;

          return (
            <Button
              key={key}
              onClick={
                onClick
                  ? e => {
                      onClick(e);
                      onClose();
                    }
                  : onClose
              }
              fullWidth
              {...restButtonProps}
            >
              {buttonProps.label}
            </Button>
          );
        })}
      </MuiDialogActions>
    );
  }

  return (
    <MuiDialogActions>
      {onClose && (
        <Button variant="outlined" onClick={onClose} sx={{ marginRight: 'auto' }} fullWidth>
          {cancelText}
        </Button>
      )}

      {(actions || []).map((buttonProps, key) =>
        'button' in buttonProps ? (
          buttonProps.button
        ) : (
          <Button fullWidth key={key} {...buttonProps}>
            {buttonProps.label}
          </Button>
        )
      )}
    </MuiDialogActions>
  );
};

export default DialogActions;
