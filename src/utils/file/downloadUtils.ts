// File could be Blob or dataUri (base64) string
export const downloadFile = (blob: Blob | ArrayBuffer | string, fileName: string) => {
  if (!(blob instanceof Blob)) {
    blob = new Blob([blob]);
  }

  const link = document.createElement('a');
  link.setAttribute('href', URL.createObjectURL(blob));
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
