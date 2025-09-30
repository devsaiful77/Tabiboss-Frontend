// objectToFormData.js
export default function objectToFormData(obj, fd = new FormData(), pre = "") {
    function isUndefined(value) {
      return value === undefined;
    }
  
    function isObject(value) {
      return value === Object(value);
    }
  
    function isArray(value) {
      return Array.isArray(value);
    }
  
    function isFile(value) {
      return value instanceof File;
    }
  
    function isDate(value) {
      return value instanceof Date;
    }
  
    if (isUndefined(obj)) {
      return fd;
    } else if (isArray(obj)) {
      obj.forEach((value) => {
        const key = pre + "[]";
        objectToFormData(value, fd, key);
      });
    } else if (isObject(obj) && !isFile(obj) && !isDate(obj)) {
      Object.keys(obj).forEach((prop) => {
        let value = obj[prop];
        let key = pre ? `${pre}[${prop}]` : prop;
        objectToFormData(value, fd, key);
      });
    } else {
      fd.append(pre, obj);
    }
  
    return fd;
  }
  