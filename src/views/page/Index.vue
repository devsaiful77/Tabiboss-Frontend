<template lang="html">
  <!-- Breadcrumb Section Start -->
  <section class="breadcrumb-section bg-color py-10">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="breadcrumb-area">
            <ul class="list">
              <li @click="globNavigate('/')" class="linked">Home</li>
              <li>{{page.title}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Breadcrumb Section End -->


    <!-- About Section Start -->
    <section class="about-section pt-30 pb-40" v-if="lengthCounter(page)>0">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="aboutContent">
                        <h2 class="title">{{page.title}}</h2>
                        <div v-html="page.content"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- About Section End -->

    <section class="about-section pt-30 pb-40" v-else-if="shimmer">
    <div class="container" v-for="(page,i) in 3">
        <div class="row">
            <div class="col-lg-12">
                <shimmer :height="200"></shimmer>
            </div>
        </div>
    </div>
    </section>



</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
export default {
  name: "about",
  components: {
    Shimmer,
  },
  data() {
    return {
      slug: this.$route.params.slug,
    };
  },
  watch: {
    $route() {
      if (this.page.link != this.$route.params.slug) {
        this.$store.dispatch("othersPage", this.$route.params.slug);
      }
    },
    page() {
      document.title = this.page.title;
    },
  },
  mounted() {
    if (this.page.link != this.$route.params.slug) {
      this.$store.dispatch("othersPage", this.slug);
    }
    document.title = this.page.title;
  },
  computed: {
    page() {
      return this.$store.getters.getPageData;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
  },
};
</script>
