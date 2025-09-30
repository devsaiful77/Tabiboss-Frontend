import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "vuex";

import { mixing } from "./helper";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Swiper imports
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/vue"; // Vue components
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  EffectFade,
  Thumbs,
  A11y,
} from "swiper/modules"; // Swiper modules

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// Custom toast wrapper
const globalToast = {
  success(msg, options = {}) {
    toast.success(msg, {
      hideProgressBar: true,
      autoClose: 1000,
      ...options,
    });
  },
  error(msg, options = {}) {
    toast.error(msg, {
      hideProgressBar: true,
      autoClose: 1000,
      ...options,
    });
  },
  // You can add more like info(), warning(), etc.
};

import Vue3Progress from "vue3-progress";
const options = {
  color: "var(--primary-color)",
  failedColor: "#bb2d3b",
  thickness: "2px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};

// import custom component
import LoadingButton from "@/components/LoadingButton.vue";

// Countdown
import Countdown from "vue3-flip-countdown";

// Auto Counter
import Vue3Autocounter from "vue3-autocounter";

// LightShot
import VueEasyLightbox from "vue-easy-lightbox";

// Tel Input with Flag
import VueTelInput from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

import storeData from "./store/index";
import module from "./store/module";
import progress from "./store/modules/progress";

const store = createStore({
  modules: {
    module,
    storeData,
    progress,
  },
});


import objectToFormDataPlugin from "@/plugins/objectToFormData";

// firebase
import { initializeApp } from "firebase/app";

function getValueFromId(id)
{
    let value = '';
    let input_box = document.getElementById(id);

    if (input_box)
    {
        value = input_box.value;
    }
    return value;
}

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: getValueFromId('api_key'),
    authDomain: getValueFromId('auth_domain'),
    projectId: getValueFromId('project_id'),
    storageBucket: getValueFromId('storage_bucket'),
    messagingSenderId: getValueFromId('messaging_sender_id'),
    appId: getValueFromId('app_id'),
    measurementId: getValueFromId('measurement_id')
};

initializeApp(firebaseConfig);

// vue app instance create.....
const app = createApp();



app.use(store);
app.mixin(mixing);
app.use(router);
app.use(Vue3Progress, options);
app.component("app-master", App);
// Attach it to the global properties
app.config.globalProperties.$toast = globalToast;

// Register Swiper components globally
app.component("Swiper", Swiper);
app.component("SwiperSlide", SwiperSlide);
app.component("loading_button", LoadingButton);

// Attach Swiper modules globally (optional, depending on your app's structure)
app.provide("swiperModules", [
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  EffectFade,
  Thumbs,
  A11y,
]);

app.use(Countdown);
app.use(objectToFormDataPlugin);
app.use(Vue3Autocounter);
app.use(VueTelInput);
app.use(VueEasyLightbox);
app.use(Toast);
app.mount("#app");
