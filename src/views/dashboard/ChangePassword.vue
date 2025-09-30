<template lang="html">
  <div class="cart-form">
    <div class="cart-header">
      <h4 class="store-title">{{ lang.change_password }}</h4>
    </div>
    <form @submit.prevent="changPassword()" class="signup-form px-15 pb-20">
      <div class="grid-2">
        <!--




                <div class="form-group">
                    <label></label>
                    <input type="password" >
                </div>

                <div class="form-group">
                    <label></label>
                    <input type="password" >
                </div>


                 -->

        <!-- Main Password -->
        <div class="input-group" v-if="authUser.is_password_set == 1">
          <label for="password">{{ lang.current_password }}</label>
          <div class="password-container">
            <input
              :type="isMainPasswordVisible ? 'text' : 'password'"
              class="form-control"
              :class="{ error_border: errors.current_password }"
              id="password"
              required
              v-model="formData.current_password"
              :placeholder="lang.current_password"
            />
            <button
              type="button"
              @click="isMainPasswordVisible = !isMainPasswordVisible"
            >
              <span v-if="isMainPasswordVisible"
                ><i class="ri-eye-off-line"></i
              ></span>
              <span v-else><i class="ri-eye-line"></i></span>
            </button>
          </div>
          <span class="validation_error" v-if="errors.current_password">{{
            errors.current_password[0]
          }}</span>
        </div>

        <!-- Confirm Password -->
        <div class="input-group">
          <label for="n_password">{{ lang.new_password }}</label>
          <div class="password-container">
            <input
              :type="isNewPasswordVisible ? 'text' : 'password'"
              class="form-control"
              id="n_password"
              required
              v-model="formData.new_password"
              :class="{ error_border: errors.new_password }"
              :placeholder="lang.new_password"
            />
            <button
              type="button"
              @click="isNewPasswordVisible = !isNewPasswordVisible"
            >
              <span v-if="isNewPasswordVisible"
                ><i class="ri-eye-off-line"></i
              ></span>
              <span v-else><i class="ri-eye-line"></i></span>
            </button>
          </div>
          <span class="validation_error" v-if="errors.new_password">{{
            errors.new_password[0]
          }}</span>
        </div>
      </div>
      <div class="grid-2">
        <!-- Confirm Password -->
        <div class="input-group">
          <label for="c_password">{{ lang.confirm_new_password }}</label>
          <div class="password-container">
            <input
              :type="isConfirmPasswordVisible ? 'text' : 'password'"
              id="c_password"
              required
              v-model="formData.confirm_password"
              class="form-control"
              :class="{ error_border: errors.confirm_password }"
              :placeholder="lang.confirm_new_password"
            />
            <button
              type="button"
              @click="isConfirmPasswordVisible = !isConfirmPasswordVisible"
            >
              <span v-if="isConfirmPasswordVisible"
                ><i class="ri-eye-off-line"></i
              ></span>
              <span v-else><i class="ri-eye-line"></i></span>
            </button>
          </div>
          <span class="validation_error" v-if="errors.confirm_password">{{
            errors.confirm_password[0]
          }}</span>
        </div>
      </div>
      <div class="btn__submit mt-30">
        <loading_button
          v-if="loading"
          :class_name="'btn btn-secondary'"
        ></loading_button>
        <button type="submit" v-else class="btn btn-secondary">
          {{ lang.save_change }}
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      static_image_url: this.getUrl("frontends/images/"),
      current: "change_password",
      loading: false,
      formData: {
        current_password: "",
        new_password: "",
        confirm_password: "",
        is_password_set: this.$store.getters.getUser.is_password_set,
      },

      isNewPasswordVisible: false,
      isMainPasswordVisible: false,
      isConfirmPasswordVisible: false,
    };
  },
  methods: {
    changPassword() {
      let url = this.getUrl("user/change-password");
      this.loading = true;
      axios
        .post(url, this.formData)
        .then((response) => {
          this.loading = false;
          if (response.data.success) {
            this.$toast.success(
              response.data.success,
              this.lang.Success + " !!"
            );
            this.formData.confirm_password = "";
            this.formData.new_password = "";
            this.formData.current_password = "";
            this.formData.is_password_set = response.data.data.is_password_set;
            this.$store.dispatch("user", response.data.data);
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
