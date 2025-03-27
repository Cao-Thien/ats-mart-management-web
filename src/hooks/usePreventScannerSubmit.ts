export const usePreventScannerSubmit = () => {
  const onEnterKeyDown = (e: WindowEventMap['keydown']) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return { onEnterKeyDown };
};

export default usePreventScannerSubmit;
