<template lang="html">
  <!-- Breadcrumb Section Start -->
  <section class="breadcrumb-section bg-color py-10">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="breadcrumb-area">
            <ul class="list">
              <li @click="globNavigate('/')" class="linked">{{ lang.home }}</li>
              <li>{{ lang.track_order }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Breadcrumb Section End -->

  <!-- Contact Section Start -->
  <section class="contact-section pt-40 pb-30">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="page-title">
            <h1>{{ lang.track_order }}</h1>
          </div>
          <form @submit.prevent>
            <div class="track-order">
              <div class="row align-items-center">

                <div class="col-md-10">
                    <div class="input-group mr-3">
                        <input
                            type="text"
                            class="form-control"
                            :placeholder="lang.enter_your_order_id"
                            v-model="order_id"
                        />
                    </div>
                </div>

                <div class="col-md-2">
                    <button
                      type="submit"
                      @click="trackOrder"
                      class="btn btn-primary ml-5 d-block"
                    >
                      {{ lang.track }}
                    </button>
                </div>



              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <!-- Contact Section End -->
</template>
<script>
export default {
  data() {
    return {
      order_id: null,
    };
  },
  methods: {
    trackOrder() {
      if (this.order_id) {
        this.$router.push({
          name: "get.invoice",
          params: { orderCode: this.order_id },
        });
      }
    },
  },
};
</script>
