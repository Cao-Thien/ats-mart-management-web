// COMPONENTS
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions, { DialogActionsProps } from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Button, { ButtonProps } from '@mui/material/Button';

// ICONS
import CloseIcon from '@mui/icons-material/Close';
import { useFormStatus } from 'react-dom';

export type BasicButtonActionType = 'submit' | 'close' | 'delete' | 'button';
export type ActionButton = ButtonProps & {
  actionType?: BasicButtonActionType;
  label?: string;
  form?: string;
  loading?: boolean;
};
export type DialogProps = MuiDialogProps & {
  fullHeight?: boolean;
  title?: string;
  noPadding?: boolean;
  buttons?: ActionButton[];
  cancelText?: string;
  cancelColor?: ButtonProps['color'];
  hiddenAction?: boolean;
  actionsSx?: DialogActionsProps['sx'];
  contentsSx?: DialogActionsProps['sx'];
  hideCancelButton?: boolean;
  hideCloseIcon?: boolean;
  onClose: () => void;
} & DialogActionsProps;

const Dialog = ({
  title,
  buttons,
  cancelText = '취소',
  cancelColor,
  onClose,
  children,
  noPadding,
  hiddenAction,
  hideCancelButton,
  actionsSx,
  contentsSx,
  hideCloseIcon,
  ...restProps
}: DialogProps) => {
  const { pending } = useFormStatus();

  return (
    <MuiDialog {...restProps}>
      {title && (
        <DialogTitle display="flex" justifyContent={!hideCloseIcon ? 'space-between' : 'center'} alignItems="center">
          {title}
          {!hideCloseIcon ? (
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
      )}

      <DialogContent sx={{ padding: noPadding ? 0 : '', ...contentsSx }}>{children}</DialogContent>

      {!hiddenAction && (
        <DialogActions sx={actionsSx}>
          {!hideCancelButton ? (
            <Button color={cancelColor} onClick={onClose}>
              {cancelText}
            </Button>
          ) : null}
          {buttons &&
            buttons.map((button, index) => {
              return (
                <Button
                  key={index}
                  onClick={button.actionType === 'close' ? onClose : () => {}}
                  type={button?.actionType === 'submit' ? 'submit' : 'button'}
                  disabled={pending}
                  {...button}
                >
                  {button?.label}
                </Button>
              );
            })}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;
