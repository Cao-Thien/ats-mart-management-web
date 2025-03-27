// Read file and return base64 string
export const fileToDataUri = async (file: File): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.readAsDataURL(file);
  });
};

const BASE64_MARKER = ';base64,';

export const dataUriToBinaryBlob = (dataURI: string): Blob => {
  // Detach content
  const [prefix, base64] = dataURI.split(BASE64_MARKER);
  const contentType = prefix.split(':')[1];
  const raw = window.atob(base64);

  // Convert content to binary
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(new ArrayBuffer(rawLength));
  for (let i = 0; i < rawLength; i++) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  // Return binary as Blob
  return new Blob([uInt8Array], { type: contentType });
};
