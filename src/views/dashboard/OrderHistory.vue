<template lang="html">
  <!-- Product History Table Start -->
  <div class="cart-form">
    <div class="cart-header">
      <h4 class="store-title" v-if="lengthCounter(profileOrders.data) > 0">
        {{ lang.order_history }}
      </h4>
        <h4 class="store-title" v-else-if="lengthCounter(profileOrders.data) == 0">
          {{ lang.no_order_founds }}
        </h4>
        <h4 class="store-title" v-else>{{ lang.loading }}</h4>
    </div>
    <div class="table-responsive">
      <Order
        :orders="profileOrders.data"
        :user_dashboard="false"
        v-if="is_shimmer"
      />

      <table
        class="table-v2"
        v-for="(profileOrders, index) in 8"
        v-else-if="shimmer"
      >
        <Shimmer :height="70" :key="index" />
      </table>
    </div>
  </div>
  <!-- Product History Table End -->
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import Order from "./components/Order.vue";

export default {
  components: { Shimmer, Order },
  data() {
    return {
      current: "order_history",
      url: "",
      page: 2,
      next_page_url: false,
      is_shimmer: false,
      loading: false,
    };
  },

  mounted() {
    this.getOrders();
    this.getProfileOrders();
  },
  computed: {
    profileOrders() {
      return this.$store.getters.getProfileOrders;
    },
    orders() {
      return this.$store.getters.getUserOrderList;
    },

    baseUrl() {
      return this.$store.getters.getBaseUrl;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
  },
  methods: {
    loadMoreData() {
      let data = {
        page: this.page,
      };
      this.loading = true;
      this.url = this.baseUrl + "/home/user/order-list?page=" + this.page;
      axios
        .get(this.url)
        .then((response) => {
          this.loading = false;
          // this.$store.commit('setShimmer',false)
          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            let orders = response.data.orderList;
            if (orders.data.length > 0) {
              for (let i = 0; i < orders.data.length; i++) {
                this.orders.data.push(orders.data[i]);
              }
            }
          }
          this.next_page_url = response.data.orderList.next_page_url;
          // this.show_load_more = !!response.data.orderList.next_page_url;
          this.page++;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    getProfileOrders() {
      let url = this.getUrl("user/profile-orders");
      axios.get(url).then((response) => {
        this.$store.commit("setShimmer", false);
        this.xof = response.data.xof;
        this.$store.commit("getProfileOrders", response.data.orders);
      });
    },
    getOrders() {
      let url = this.baseUrl + "/home/user/order-list?page=1";
      axios
        .get(url)
        .then((response) => {
          this.next_page_url = response.data.orderList.next_page_url;
          this.$store.commit("getUserOrderList", response.data.orderList);
          this.is_shimmer = true;
        })
        .catch((error) => {
          this.is_shimmer = true;
          if (error.response.status == 401) {
          }
        });
    },
  },
};
</script>
