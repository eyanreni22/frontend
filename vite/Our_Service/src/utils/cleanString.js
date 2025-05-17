// src/utils/cleanString.js
export const cleanString = (str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/^"+|"+$/g, '');
  };
  