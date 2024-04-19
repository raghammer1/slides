// Validates a given URL to see if it points to a loadable image.
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
