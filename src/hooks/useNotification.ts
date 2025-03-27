import Notiflix from 'notiflix';

export const useNotification = () => {
  const success = (message: string) => {
    Notiflix.Notify.success(message);
  };

  const error = (message: string) => {
    Notiflix.Notify.failure(message);
  };

  const warning = (message: string) => {
    Notiflix.Notify.warning(message);
  };

  const info = (message: string) => {
    Notiflix.Notify.info(message);
  };

  return {
    success,
    error,
    warning,
    info,
  };
};
