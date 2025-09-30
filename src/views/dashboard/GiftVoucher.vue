<template lang="html">



<!-- Wallet History Start -->
<div class="cart-form ">
    <div class="cart-header">
        <h4 class="store-title" v-if="coupons.data">{{ lang.coupons_code }}</h4>
        <h4 class="store-title" v-else-if="!shimmer">{{ lang.no_founds_coupons_code }}</h4>
        <h4 class="store-title" v-else>{{ lang.loading }}</h4>
    </div>


    <div class="cuponCard-wrapper p-4" v-if="is_shimmer" >
        <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12" v-for="(coupon, i) in coupons.data" :key="i">
                <div class="cuponCard">


                    <div class="cupon-content">
                        <h4 class="title">{{ coupon.title }}</h4>
                        <!-- <p class="desc">Coupon Description</p> -->
                        <p class="dates">{{ coupon.start_date }} to {{ coupon.end_date }}</p>

                        <button class="copy-btn" type="button" @click="copyTestingCode(coupon.code)">{{ lang.get_code }}</button>
                        <input
                          type="hidden"
                          class="form-control"
                          :id="'testing-code_' + coupon.code"
                          :value="coupon.code"
                        />
                    </div>

                    <div class="coupon-discount" v-if="coupon.discount_type == 'flat'">
                        <div class="discount"><span>{{ coupon.discount }}</span></div>
                    </div>

                    <div class="coupon-discount" v-else>
                        <div class="discount"><span>{{ coupon.discount }}</span>% OFF</div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <!-- v-else-if="shimmer" -->
    <div class="cuponCard-wrapper p-4" v-else-if="shimmer">
        <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12" v-for="(coupon, i) in 4" :key="i">
                <Shimmer :height="200" style="margin-bottom: 15px;" />
            </div>
        </div>
    </div>


</div>
<!-- Wallet History End -->
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
export default {
  name: "gift-voucher",
  data() {
    return {
      current: "gift_voucher",
      testingCode: "",
      is_shimmer: false,
    };
  },
  components: {
    Shimmer,
  },
  mounted() {
    if (this.settings.coupon_system != 1) {
      this.$router.push({ name: "home" });
    }
    if (
      this.lengthCounter(this.coupons.data) == 0 &&
      this.settings.coupon_system == 1
    ) {
      this.userCoupon();
    }
    if (this.lengthCounter(this.coupons.data) > 0) {
      this.is_shimmer = true;
    }
  },
  computed: {
    coupons() {
      return this.$store.getters.getUserCoupons;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
  },
  methods: {
    copyTestingCode(code) {
      var copyText = document.getElementById("testing-code_" + code);

      /* Select the text field */
      if (copyText) {
        copyText.setAttribute("type", "text");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        // navigator.clipboard.writeText(copyText.value);
        document.execCommand("copy");

        /* Alert the copied text */
        alert("Copied the text: " + copyText.value);
        copyText.setAttribute("type", "hidden");
        window.getSelection().removeAllRanges();
      }
    },
    userCoupon() {
      let url = this.getUrl("user/coupons");
      axios.get(url).then((response) => {
        this.is_shimmer = true;
        this.$store.commit("getUserCoupons", response.data.coupons);
      });
    },
  },
};
</script>


<style scoped>
    .cart-form {
        padding: 0 10px;
    }
</style>
