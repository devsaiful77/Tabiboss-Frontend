<template lang="html">
  <div class="coupon-code-list">
    <div
      class="coupon-code"
      v-for="(coupon, index) in coupon_list"
      :key="index"
    >
      <h5>{{ coupon.title }}</h5>
      <p>{{
        coupon.discount_type == "flat"
          ? priceFormat(coupon.discount)
          : coupon.coupon_discount + "% " + lang.off
      }}</p>
      <button
        type="button"
        class="btn-close"
        @click="removeCoupon(coupon.coupon_id)"
        aria-label="Close"
        v-bind:disabled="disabled"
      ></button>
    </div>
  </div>

  <div class="action-wrapper px-3 mt-3">
    <div class="coupon-box flex-column align-items-start">
      <!-- coupon list -->
      <form @submit.prevent="applyCoupon">
        <input
          type="text"
          v-model="payment_form.coupon_code"
          :placeholder="lang.enter_coupon_code"
          required
          class="form-control w-100"
        />
        <loading_button
          v-if="loading"
          :class_name="'opacity_5'"
        ></loading_button>
        <button class="btn btn-secondary w-100 mt-10" v-else>{{ lang.apply }}</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["coupon_list", "cartList", "trx_id"],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    applyCoupon() {
      let url = this.getUrl("user/apply_coupon");
      if (this.cartList[0] && this.cartList[0].trx_id) {
        this.payment_form.trx_id = this.cartList[0].trx_id;
      } else {
        this.payment_form.trx_id = this.trx_id;
      }

      this.loading = true;
      axios
        .post(url, this.payment_form)
        .then((response) => {
          this.loading = false;
          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            this.$toast.success(
              response.data.success,
              this.lang.Success + " !!"
            );
            this.carts = [];
            let carts = response.data.carts;
            let checkouts = response.data.checkouts;
            let coupons = response.data.coupons;
            this.$parent.parseData(carts, checkouts, coupons);
            this.payment_form.coupon_code = "";
          }
        })
        .catch((error) => {
          this.loading = false;
          this.$toast.success("Something Went Wrong", "Error !!");
        });
    },
    removeCoupon(id) {
      if (confirm("Are You Sure ?")) {
        let url = this.getUrl("user/coupon-delete");
        this.disabled = true;
        let form = {
          trx_id: this.cartList[0].trx_id,
          coupon_id: id,
          user_id: this.authUser.id,
        };

        axios
          .post(url, form)
          .then((response) => {
            this.disabled = false;
            if (response.data.error) {
              this.$toast.error(response.data.error, this.lang.Error + " !!");
            } else {
              this.$toast.success(
                response.data.success,
                this.lang.Success + " !!"
              );
              this.carts = [];
              let carts = response.data.carts;
              let checkouts = response.data.checkouts;
              let coupons = response.data.coupons;
              this.$parent.parseData(carts, checkouts, coupons);
              this.payment_form.coupon_code = "";
            }
          })
          .catch((error) => {
            this.disabled = false;
            this.$toast.success("Something Went Wrong", "Error !!");
          });
      }
    },
  },
};
</script>
