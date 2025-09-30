// plugins/objectToFormData.js
import objectToFormData from "../utils/objectToFormData";

export default {
  install(app) {
    app.config.globalProperties.$objectToFormData = objectToFormData;
  },
};
