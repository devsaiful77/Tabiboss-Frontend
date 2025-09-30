<template lang="html">
  <div class="cart-form">
    <div class="cart-header">
      <h4 class="store-title">{{ lang.edit_profile }}</h4>
    </div>
    <div class="editProfile-wrapper">
      <form @submit.prevent="updateProfile" class="signup-form w-100">
        <template v-if="lengthCounter(authUser) > 0">
          <div class="grid-2">
            <div class="input-group">
              <label for="first_name">{{ lang.first_name }}</label>
              <input
                type="text"
                class="form-control"
                :class="{ error_border: errors.first_name }"
                v-model="form.first_name"
                id="first_name"
                :placeholder="lang.first_name"
              />

              <div>
                <span class="validation_error" v-if="errors.first_name">{{
                  errors.first_name[0]
                }}</span>
              </div>
            </div>

            <div class="input-group">
              <label for="first_name">{{ lang.last_name }}</label>
              <input
                type="text"
                class="form-control"
                :class="{ error_border: errors.last_name }"
                v-model="form.last_name"
                id="last_name"
                :placeholder="lang.last_name"
              />

              <div>
                <span class="validation_error" v-if="errors.last_name">{{
                  errors.last_name[0]
                }}</span>
              </div>
            </div>
          </div>

          <div class="grid-2">
            <div class="input-group">
              <label for="email">{{ lang.email }}</label>
              <input
                type="text"
                class="form-control"
                :class="{ error_border: errors.email }"
                v-model="form.email"
                id="email"
                :placeholder="lang.email"
              />

              <div>
                <span class="validation_error" v-if="errors.email">{{
                  errors.email[0]
                }}</span>
              </div>
            </div>

            <div class="input-group">
              <label for="first_name">{{ lang.phone }}</label>
              <Telephone @phone_no="getNumber" />

              <div>
                <span class="validation_error" v-if="errors.phone">{{
                  errors.phone[0]
                }}</span>
              </div>
            </div>
          </div>

          <div class="grid-2">
            <div class="input-group">
              <label for="first_name">{{ lang.gender }}</label>

              <select
                class="form-control"
                id="gender"
                v-model="form.gender"
                :class="{ error_border: errors.gender }"
              >
                <option selected>{{ lang.select_gender }}</option>
                <option value="male">{{ lang.male }}</option>
                <option value="female">{{ lang.female }}</option>
                <option value="others">{{ lang.others }}</option>
              </select>

              <div>
                <span class="validation_error" v-if="errors.gender">{{
                  errors.gender[0]
                }}</span>
              </div>
            </div>

            <div class="input-group">
              <label for="date_of_birth">{{ lang.date_of_birth }}</label>
              <input
                type="date"
                class="form-control"
                :class="{ error_border: errors.date_of_birth }"
                v-model="form.date_of_birth"
                id="date_of_birth"
                :placeholder="lang.date_of_birth"
              />

              <div>
                <span class="validation_error" v-if="errors.date_of_birth">{{
                  errors.date_of_birth[0]
                }}</span>
              </div>
            </div>
          </div>

          <div class="grid-2">
            <div class="input-group">
              <label for="license_no">{{ lang.profile_image }}</label>
              <input
                type="file"
                class="form-control"
                id="upload-1"
                @change="imageUp($event)"
              />
            </div>

            <div class="input-group">
              <label for="first_name">{{ lang.facebook }}</label>
              <input
                type="url"
                class="form-control"
                v-model="socials.facebook"
                id="facebook"
                placeholder="https://facebook.com/xxxxxxxx"
              />
            </div>
          </div>

          <div class="grid-2">
            <div class="input-group">
              <label for="twitter">{{ lang.twitter }}</label>
              <input
                type="url"
                class="form-control"
                v-model="socials.twitter"
                id="twitter"
                placeholder="https://twitter.com/xxxxxxxx"
              />
            </div>

            <div class="input-group">
              <label for="linkedin">{{ lang.linkedin }}</label>
              <input
                type="url"
                class="form-control"
                v-model="socials.linkedin"
                id="linkedin"
                placeholder="https://LinkedIn.com/xxxxxxxx"
              />
            </div>
          </div>

          <div class="grid-2">
            <div class="input-group">
              <label for="instagram">{{ lang.instagram }}</label>
              <input
                type="url"
                class="form-control"
                v-model="socials.instagram"
                id="instagram"
                placeholder="https://instagram.com/xxxxxxxx"
              />
            </div>

            <div class="input-group">
              <label for="pinterest">{{ lang.pinterest }}</label>
              <input
                type="url"
                class="form-control"
                v-model="socials.pinterest"
                id="pinterest"
                placeholder="https://pinterest.com/xxxxxxxx"
              />
            </div>
          </div>

          <div class="input-group">
            <label for="youTube">{{ lang.youTube }}</label>
            <input
              type="url"
              class="form-control"
              v-model="socials.youTube"
              id="youTube"
              placeholder="https://youtube.com/xxxxxxxx"
            />
          </div>
        </template>

        <template v-else-if="shimmer">
          <div class="row">
            <div class="col-md-6 mb-3" v-for="(num, i) in 12">
              <div class="form-group">
                <shimmer :height="100"></shimmer>
              </div>
            </div>
          </div>
        </template>

        <div class="btn__submit mt-30">
          <loading_button
            v-if="loading"
            :class_name="'btn btn-secondary'"
          ></loading_button>
          <button class="btn btn-secondary" v-else>{{ lang.update }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";

import Telephone from "@/components/Telephone.vue";
export default {
  components: {
    Telephone,
    Shimmer,
  },

  data() {
    return {
      current: "edit_profile",
      loading: false,
      form: {
        first_name: "",
        last_name: "",
        phone: "",
        gender: "",
        date_of_birth: "",
      },
      socials: {
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
        pinterest: "",
        youtube: "",
      },
      country_code: [],
    };
  },

  mounted() {
    this.form = this.authUser;
    if (this.authUser.socials) {
      this.socials = this.authUser.socials;
    }
    this.$store.commit("setMobileNo", this.form.phone);
  },
  methods: {
    profile() {
      let keys = Object.keys(this.authUser);
      for (let i = 0; i < keys.length; i++) {
        if (
          keys[i] == "socials" &&
          this.authUser["socials"] &&
          typeof this.authUser["socials"] != "object"
        ) {
          delete this.authUser["socials"];
        }
      }
      Object.assign(this.form, this.authUser);
      // this.form = this.authUser;
    },
    imageUp(event) {
      this.form.image = event.target.files[0];
      document.getElementById("upload-image").innerHTML = this.form.image.name;
    },


    updateProfile() {
      this.form.socials = this.socials;
    //   this.loading = true;
      this.form.sellers = null;
      let url = this.getUrl("user/update-profile");

      const formData = this.$objectToFormData(this.form);

      /*
      console.log("Form Data:", formData);
      
      // এখন formData দিয়ে Axios POST করতে পারবেন
      // axios.post('/api/profile', formData)
      // .then(response => console.log(response))
      // .catch(error => console.error(error));
      
      */ 
      axios.post(url, formData)
        .then((response) => {
          this.loading = false;
          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            this.errors = [];
            this.$toast.success(
              response.data.success,
              this.lang.Success + " !!"
            );
            this.$store.dispatch("user", response.data.user);
          }
        })
        .catch((error) => {
            console.log(error)
          this.loading = false;
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
    getNumber(number) {
      this.form.phone = number;
    },
  },
};
</script>
