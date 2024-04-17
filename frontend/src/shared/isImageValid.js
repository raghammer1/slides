export const isValidImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true); // Image has loaded successfully
    img.onerror = () => resolve(false); // Image failed to load
    img.src = url;

    // Optional: set a timeout for the load
    setTimeout(() => {
      resolve(false); // Assume failure if the image hasn't loaded within a timeout
    }, 10000); // 10 seconds timeout
  });
};
