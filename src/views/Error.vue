<template>
  <!-- Error Section Start -->
  <section class="error-section pt-40 pb-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 m-auto">
          <div class="errorPage-wrapper text-center">
            <div class="errorPage-thumb">
              <img :src="static_image_url + '404-thumb.svg'" alt="error"/>
            </div>
            <div class="errorPage-content">
              <h2 class="title">
                404
              </h2>
              <p class="desc">
                {{lang.the_you_looking_not_be_found}}
              </p>
              <div class="back-btn">
                <router-link :to="{ name : 'home' }" class="btn btn-primary">{{lang.home}}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Error Section End -->
</template>

<script>
export default {
  data() {
    return {
      static_image_url: this.getUrl("frontends/images/"),
    };
  },
};
</script>

