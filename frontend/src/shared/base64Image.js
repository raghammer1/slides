export const imageEncoder = (file, callback) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64 = e.target.result;
      callback(base64); // Invoke the callback with the Base64 string
    };
    reader.readAsDataURL(file);
  }
};
