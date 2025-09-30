<template lang="html">
  <div class="cart-form">
    <div class="cart-header">
      <h4 class="store-title">{{ lang.shop_information }}</h4>
    </div>
    <div class="editProfile-wrapper">
      <form @submit.prevent="register" class="signup-form w-100">
        <div class="input-group">
          <label for="name">{{ lang.shop_name }}</label>
          <input
            type="text"
            class="form-control"
            :class="{ error_border: errors.shop_name }"
            v-model="form.shop_name"
            id="name"
            placeholder="Enter Your Shop Name"
          />

          <div>
            <span class="validation_error" v-if="errors.shop_name">{{
              errors.shop_name[0]
            }}</span>
          </div>
        </div>

        <div class="input-group">
          <label for="address">{{ lang.shop_address }}</label>
          <input
            type="text"
            class="form-control"
            :class="{ error_border: errors.address }"
            v-model="form.address"
            id="address"
            :placeholder="lang.enter_your_shop_address"
          />

          <div>
            <span class="validation_error" v-if="errors.address">{{
              errors.address[0]
            }}</span>
          </div>
        </div>

        <div class="input-group">
          <label for="address">{{ lang.phone }}</label>

          <Telephone @phone_no="getNumber" />

          <div>
            <span class="validation_error" v-if="errors.phone_no">{{
              errors.phone_no[0]
            }}</span>
          </div>
        </div>

        <div class="input-group">
          <label for="license_no">{{ lang.license_no }}</label>
          <input
            type="text"
            class="form-control"
            :class="{ error_border: errors.license_no }"
            v-model="form.license_no"
            id="license_no"
            placeholder="Enter Your License No"
          />

          <div>
            <span class="validation_error" v-if="errors.license_no">{{
              errors.license_no[0]
            }}</span>
          </div>
        </div>

        <div class="input-group">
          <label for="license_no">{{ lang.tax_paper }}</label>

          <input
            type="file"
            class="form-control"
            id="tax_paper"
            @change="taxUp($event)"
          />
        </div>

        <div class="input-group">
          <label for="license_no">{{ lang.logo }}</label>
          <input
            type="file"
            class="form-control"
            :class="{ error_border: errors.banner }"
            id="tax_paper"
            @change="logoUp($event)"
          />
        </div>

        <div class="input-group">
          <label for="license_no">{{ lang.banner }}</label>
          <input
            type="file"
            class="form-control"
            :class="{ error_border: errors.banner }"
            id="tax_paper"
            @change="bannerUp($event)"
          />
        </div>

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
import Telephone from "@/components/Telephone.vue";
import {setToast} from "@/utils/toast.js"
export default {
  components: {
    Telephone,
  },

  data() {
    return {
      current: "migrate_to_seller",
      loading: false,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        shop_name: "",
        phone: "",
        address: "",
        phone_no: "",
        user_type: "seller-migrate",
        tax_paper: "",
        logo: "",
        banner: "",
      },
    };
  },
  methods: {
    register() {
      let url = this.getUrl("user/user-to-seller");
      if (confirm("Are you sure, You want to be Seller?")) {
        this.loading = true;
        const formData = this.$objectToFormData(this.form);
        axios
          .post(url, formData)
          .then((response) => {
            this.loading = false;
            if (response.data.error) {
              this.$toast.error(response.data.error, this.lang.Error + " !!");
            } else {
              setToast('success',response.data.migrate_msg)
              this.$store.dispatch("user", null);
              this.$router.push({ name: "home" });
            }
          })
          .catch((error) => {
            this.loading = false;
            if (error.response.status == 422) {
              this.errors = error.response.data.errors;
            }
          });
      } else {
        return false;
      }
    },

    taxUp(event) {
      this.form.tax_paper = event.target.files[0];
    //   this.$refs.taxUpload.innerHTML = this.form.tax_paper.name;
    },
    logoUp(event) {
      this.form.logo = event.target.files[0];
    //   this.$refs.logoUpload.innerHTML = this.form.logo.name;
    },
    bannerUp(event) {
      this.form.banner = event.target.files[0];
    //   this.$refs.bannerUpload.innerHTML = this.form.banner.name;
    },
    getNumber(number) {
      this.form.phone_no = number;
    },
  },
};
</script>
