"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageEncoder = void 0;
const imageEncoder = (file, callback) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64 = e.target.result;
      callback(base64); // Invoke the callback with the Base64 string
    };
    reader.readAsDataURL(file);
  }
};
exports.imageEncoder = imageEncoder;