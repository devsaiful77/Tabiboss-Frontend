<template lang="html">
  <!-- Breadcrumb Section Start -->
  <section class="breadcrumb-section bg-color py-10">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="breadcrumb-area">
            <ul class="list">
              <li @click="globNavigate('/')" class="linked">Home</li>
              <li>Contact us</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Breadcrumb Section End -->

  <!-- Contact Section Start -->
  <section class="contact-section pt-60 pb-100">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="contact-wrapper">
            <div class="contact-bg">
              <img
                :src="static_image_url + 'contact/contact-banner.jpg'"
                alt=""
              />
            </div>
            <div class="contact-inner">
              <form @submit.prevent = "submit" class="contact-form">
                <h4 class="contact-title">{{ lang.send_message }}</h4>
                <div class="grid-2">
                  <div class="input-group">
                    <label for="name">{{ lang.name }}</label>
                    <input
                      type="text"
                      v-model="form.name"
                      class="form-control"
                      :class="{ error_border: errors.name }"
                      :placeholder="lang.name"
                    />
                    <div>
                        <span class="validation_error" v-if="errors.name">{{
                            errors.name[0]
                          }}</span>
                    </div>
                  </div>


                  <div class="input-group">
                    <label for="email">{{ lang.email }}</label>
                    <input
                      type="email"
                      v-model="form.email"
                      class="form-control"
                      :class="{ error_border: errors.email }"
                      :placeholder="lang.email"
                    />
                    <div>
                        <span class="validation_error" v-if="errors.email">{{
                            errors.email[0]
                          }}</span>
                    </div>
                  </div>

                </div>

                <div class="input-group">
                  <label for="subject">{{ lang.subject }}</label>
                  <input
                    type="text"
                    v-model="form.subject"
                    class="form-control"
                    :class="{ error_border: errors.subject }"
                    :placeholder="lang.subject"
                  />
                </div>
                <span class="validation_error" v-if="errors.subject">{{
                  errors.subject[0]
                }}</span>

                <div class="input-group">
                  <label>{{ lang.message }}</label>
                  <textarea
                    class="form-control"
                    v-model="form.message"
                    :class="{ error_border: errors.message }"
                    :placeholder="lang.write_your_message"
                  ></textarea>
                </div>
                <span class="validation_error" v-if="errors.message">{{
                  errors.message[0]
                }}</span>

                <div class="submit-btn mt-40">
                  <loading_button
                    v-if="loading"
                    :class_name="'btn btn-primary'"
                  ></loading_button>
                  <button type="submit" v-else class="btn btn-primary">
                    {{ lang.send }}
                  </button>
                </div>
              </form>

              <div class="contact-information">
                <h4 class="title">{{ lang.reach_on_us }}</h4>

                <ul class="address-list">
                    <li v-if="contact.address"><i class="ri-map-pin-line"></i>{{ contact.address }}</li>
                    <li v-if="contact.phone || contact.optional_phone"><i class="ri-phone-line"></i> <a
                        :href="'tel:'+contact.phone">{{ contact.phone }}</a> <a
                        :href="'tel:'+contact.optional_phone">{{ contact.optional_phone }}</a></li>
                    <li v-if="contact.email || contact.optional_email"><i class="ri-mail-line"></i> <a
                        :href="'mailto:'+contact.email">{{ contact.email }}</a> <a
                        :href="'mailto:'+contact.optional_email">{{ contact.optional_email }}</a></li>
                </ul>


                <div v-if="settings.show_social_links && settings.show_social_links == 1">
                    <h4 class="title pb-0 border-none">{{ lang.follow_us }}</h4>
                    <div class="social-icon">
                        <!-- facebook -->
                        <a v-if="settings.facebook_link" :href="settings.facebook_link"><i class="ri-facebook-fill"></i></a>
                        <!-- twitter -->
                        <a v-if="settings.twitter_link" :href="settings.twitter_link"><i class="ri-twitter-x-fill"></i></a>
                        <!-- linkedin -->
                        <a v-if="settings.linkedin_link" :href="settings.linkedin_link"><i class="ri-linkedin-fill"></i></a>
                        <!-- instagram -->
                        <a v-if="settings.instagram_link" :href="settings.instagram_link"><i class="ri-instagram-line"></i></a>
                        <!-- youtube -->
                        <a v-if="settings.youtube_link" :href="settings.youtube_link"><i class="ri-youtube-fill"></i></a>
                    </div>
                    <div class="map-area">
                    <div class="map-location">
                        <div class="map" id="map" style="height: 250px"></div>
                    </div>
                    </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Contact Section End -->
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";

export default {
  name: "contact",
  components: {
    Shimmer,
  },
  mounted() {
    let that = this;
    if (!that.contact) {
      that.$store.dispatch("contactPage");
    }
    if (that.settings.map_api_key) {
      var script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        that.settings.map_api_key +
        "&callback=initMap&v=weekly";
      script.async = true;
      window.initMap = function () {
        let map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 23.822141, lng: 90.440813 },
          zoom: parseInt(that.settings.zoom_level),
        });
        new google.maps.Marker({
          position: new google.maps.LatLng(23.822141, 90.440813),
          map: map,
          title: "Cryptox",
        });
      };
      document.head.appendChild(script);
    }
  },
  data() {
    return {
      static_image_url: this.getUrl("frontends/images/"),
      loading: false,
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      map: "",
    };
  },

  computed: {
    contact() {
      return this.$store.getters.getContactPage;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
  },
  methods: {
    submit() {
      this.loading = true;
      let url = this.getUrl("send-message");
      axios
        .post(url, this.form)
        .then((response) => {
          this.loading = false;
          if (response.data.success) {
            this.$toast.success(
              this.lang.message_sent_successfully,
              this.lang.Success + " !!"
            );
            this.errors = [];
            this.form.email = "";
            this.form.name = "";
            this.form.subject = "";
            this.form.message = "";
          } else {
            if (response.data.error) {
              this.$toast.error(response.data.error, this.lang.Error + " !!");
            }
          }
        })
        .catch((error) => {
          this.loading = false;
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
  },
};
</script>
