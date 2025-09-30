<template lang="html">
  <!-- SignUp  Section Start -->
  <section class="signup-section pt-40 pb-100">
    <div class="container">
      <div class="signupForm-wrapper">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="signup-thumb">
              <img
                :src="settings.forgot_password_banner"
                alt="forgot_password"
                class="img-fluid"
              />
            </div>
          </div>

          <!-- send email -->
          <div class="col-lg-6">
            <form @submit.prevent class="signup-form">
              <!-- Forgot password -->
              <div class="title text-center mb-40">
                <h1>{{lang.fORGOT_pASSWORD}}</h1>
                <p v-if="form.resetCode == null">{{lang.enter_email_recover_your_password}}</p>
                <p v-if="form.resetCode != null">{{lang.enter_your_new_password}}</p>
              </div>

              <div class="input-group mb-25" v-if="form.resetCode == null">
                <!-- <label for="email">Enter your email address to recover your password</label> -->
                <input type="email" v-model="form.email" class="form-control"
                   :placeholder="lang.email" :class="{ 'error_border' : errors.email }">
                <p> <span class="validation_error" v-if="errors.email">{{ errors.email[0] }}</span> </p>
              </div>


              <template v-if="form.resetCode != null">

                <div class="input-group mb-25">
                    <input type="password"  v-model="form.newPassword" class="form-control"
                       :placeholder="lang.new_password" :class="{ 'error_border' : errors.newPassword }">
                    <p> <span class="validation_error" v-if="errors.newPassword">{{ errors.newPassword[0] }}</span> </p>
                </div>

                <div class="input-group mb-25">
                    <input type="password" v-model="form.confirmPassword" class="form-control" :class="{ 'error_border' : errors.confirmPassword }"
                       :placeholder="lang.confirm_password">
                    <p> <span class="validation_error" v-if="errors.confirmPassword">{{ errors.confirmPassword[0] }}</span> </p>
                </div>

              </template>




              <div class="btn__submit">
                <button @click="submit" type="submit" v-if="!form.resetCode && !loading" class="btn btn-primary w-100" :class="{ 'disable_btn' : this.loading }">{{lang.send}}</button>
                <loading_button v-if="loading" :class_name="'btn btn-primary w-100'"></loading_button>
                <button @click.prevent="createPassword" v-if="form.resetCode && !loading" type="submit" class="btn btn-primary w-100">{{lang.create_new_password}}</button>
              </div>
              <p class="account text-center">
                 <router-link :to="{ name: 'login' }">{{ lang.back }}</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- SignUp  Section End -->
</template>

<script>
export default {
  data() {
    return {
      static_image_url: this.getUrl("frontends/images/"),

      form: {
        email: this.$route.params.email,
        newPassword: "",
        confirmPassword: "",
        resetCode: this.$route.params.code,
      },
      loading: false,
    };
  },

  methods: {
    submit() {
      this.loading = true;
      let url = this.getUrl("reset-password");
      axios
        .post(url, this.form)
        .then((response) => {
          this.loading = false;
          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          }
          if (response.data.success) {
            this.errors = [];
            this.form.email = "";
            this.$toast.success(response.data.success, this.lang.Success + " !!");
          }
        })
        .catch((error) => {
          this.loading = false;
          if (error.response && error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
    },

    createPassword() {
      let url = this.getUrl("create-new-password");
      this.loading = true;
      axios
        .post(url, this.form)
        .then((response) => {
          this.loading = false;
          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          }
          if (response.data.success) {
            this.errors = [];
            this.$toast.success(response.data.success, this.lang.Success + " !!");
            this.$router.push({ name: "login" });
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
