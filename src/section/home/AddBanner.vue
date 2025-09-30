<template lang="html">
  <!-- Campaign Section Start -->
  <section class="campain-section pt-30">
    <div class="container">
      <div class="row" v-if="countBanner > 0">
        <div
          v-for="(banner, index, i) in banners"
          :key="index"
          class="col-md-6"
        >
          <div class="campain-wrapper">
            <a v-if="urlCheck(banner)" :href="banner" class="">
              <img :src="index.slice(0, -2)" alt="Image" />
            </a>

            <router-link
              v-else
              :to="banner"
              :id="index.substr(-2, 2)"
            >
              <img :src="index.slice(0, -2)" :alt="index" />
            </router-link>
          </div>
        </div>
      </div>

      <div class="row" v-else-if="show_shimmer">
        <div class="col-6" v-for="(attr, i) in 2" :key="'banner_' + i">
        <div class="campain-wrapper">
          <a href="javascript:void(0)" class="campain-thumb campain-thumb-banner">
            <shimmer :height="320"></shimmer>
          </a>

        </div>

        </div>
      </div>
    </div>
  </section>
  <!-- Campaign Section End -->
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";

export default {
  components: { Shimmer },
  props: ["banners"],

  data() {
    return {
      show_shimmer: true,
    };
  },

  mounted() {
    this.checkHomeComponent("banner");
  },

  watch: {
    homeResponse() {
      this.checkHomeComponent("banner");
    },
  },

  computed: {
    countBanner() {
      let length = 0;
      if (this.banners) {
        length = Object.keys(this.banners).length;
      }
      return length;
    },
  },

  methods: {
    checkHomeComponent(component_name) {
      let component = this.homeResponse.find((data) => data == component_name);

      if (component) {
        return (this.show_shimmer = false);
      }
    },
  },
};
</script>


<style scoped>

</style>
