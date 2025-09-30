<template lang="html">
  <!-- Cart Section Start -->
  <div class="row">
    <div class="col-12">
      <div class="step-progress">
        <!-- Tab List -->
        <ul class="nav nav-pills mb-3">
          <li class="nav-item">
            <button class="step" :class="{ active: $route.name === 'cart' }">
              <div class="icon"><CartSVG /></div>
              {{ lang.view_cart }}
            </button>
          </li>
          <li class="nav-item">
            <button
              class="step"
              :class="{ active: $route.name === 'checkout' }"
            >
              <div class="icon"><ShippingPaySVG /></div>
              {{ lang.check_out }}
            </button>
          </li>
          <li class="nav-item">
            <button class="step" :class="{ active: $route.name === 'success' }">
              <div class="icon"><CheckSVG /></div>
              {{ lang.confirm_order }}
            </button>
          </li>
        </ul>
        <div class="progress-bar">
          <div class="progress" :style="{ width: progressWidth + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartSVG from "@/svg/CartSVG.vue";
import ShippingPaySVG from "@/svg/ShippingPaySVG.vue";
import CheckSVG from "@/svg/CheckSVG.vue";

export default {
  components: { CartSVG, ShippingPaySVG, CheckSVG },

  computed: {
    progressWidth() {
      const routeName = this.$route.name;

      if (routeName === "cart") {
        return 33;
      } else if (routeName === "checkout") {
        return 66;
      } else if (routeName === "payment") {
        return 100;
      } else {
        return 0; // fallback if needed
      }
    },
  },
};
</script>
<style lang=""></style>
