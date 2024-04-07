export const imageEncoder = (file, callback) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64 = e.target.result;
      callback(base64);
    };
    reader.readAsDataURL(file);
  }
};
