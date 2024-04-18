export const isValidImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;

    setTimeout(() => {
      resolve(false);
    }, 10000);
  });
};
