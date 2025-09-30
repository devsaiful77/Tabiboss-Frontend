<template lang="html">
  <!-- Breadcrumb Section Start -->
  <section class="breadcrumb-section bg-color py-10">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="breadcrumb-area">
            <ul class="list">
              <li @click="globNavigate('/')" class="linked">{{ lang.home }}</li>
              <li>{{ lang.daily_deals }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Breadcrumb Section End -->

  <!-- compare Section Start -->
  <section
    class="vendor-section py-30 pb-100"
    v-if="lengthCounter(productList) > 0"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <!-- product Filter Title -->
          <div class="productFilter-title">
            <div class="title-wrap">
              <CountDown :deadline="countDownTimer()" />
            </div>
            <div class="filterRight">
              <div class="filterOption">
                <div class="form-group">
                  <VueSelect v-model="form.paginate" :options="SortFilter" :reduce="(option) => option.value" label="label" @update:modelValue="filterProducts" />
                </div>
              </div>
            </div>
            <!-- product Filter  List Grid View -->
            <div class="listGrid-view">
              <div
                class="grid"
                :class="{ active: isGrid }"
                @click="isGrid = true"
              >
                <GridSVG />
              </div>
              <div
                class="list"
                :class="{ active: !isGrid }"
                @click="isGrid = false"
              >
                <ListSVG />
              </div>
            </div>
          </div>
          <!-- header -->

          <!-- product filter body -->
          <div class="productFilter-inner mt-30">
            <div class="row" v-if="isGrid">
              <div
                class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6 mb-20"
                v-for="(item, index) in productList"
                :key="index"
              >
                <ProductItem
                  :product="item"
                  :number="8"
                  :grid_class="'grid-4'"
                />
              </div>
            </div>
            <div class="row" v-else>
              <div
                class="col-md-12 col-sm-12"
                v-for="(item, index) in productList"
                :key="index"
              >
                <ProductListItem
                  :product="item"
                  :number="8"
                  :grid_class="'grid-4'"
                />
              </div>
            </div>

            <!-- show more -->
            <div
              class="show-more"
              v-if="products && products.next_page_url && !loading"
            >
              <a
                href="javaScript:void(0)"
                @click="loadProduct"
                class="btn btn-primary"
                >{{ lang.show_more }}</a
              >
            </div>

            <!-- loading state -->
            <div class="col-md-12 text-center show-more" v-show="loading">
              <loading_button :class_name="'btn btn-primary'"></loading_button>
            </div>
          </div>
          <!-- product filter body -->
        </div>
      </div>
    </div>
  </section>

  <section class="vendor-section py-30 pb-100" v-else-if="shimmer">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <!-- product Filter Title -->
          <div class="productFilter-title">
            <a href="javaScript:void(0)">
              <shimmer :height="50"></shimmer>
            </a>
          </div>
          <!-- header -->

          <!-- product filter body -->
          <div class="productFilter-inner mt-30">
            <div class="row" v-if="isGrid">
              <div
                class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6 mb-20"
                v-for="(product, index) in 12"
                :key="index"
              >
                <a href="javaScript:void(0)" >
                  <shimmer :height="290"></shimmer>
                </a>
              </div>
            </div>
            <div class="row" v-else>
              <div
                class="col-md-12 col-sm-12 mb-20"
                v-for="(product, index) in 12"
                :key="index"
              >
                <a href="javaScript:void(0)">
                  <shimmer :height="290"></shimmer>
                </a>
              </div>
            </div>

            <!-- show more -->
            <div class="show-more">
              <shimmer :height="20"></shimmer>
            </div>

            <!-- loading state -->
            <div class="col-md-12 text-center show-more">
              <shimmer :height="20"></shimmer>
            </div>
          </div>
        </div>
        <!-- product filter body -->
      </div>
    </div>
  </section>

  <!-- compare Section End -->
</template>

<script>
import CountDown from "@/components/CountDown.vue";
import ListSVG from "@/svg/ListSVG.vue";
import GridSVG from "@/svg/GridSVG.vue";
import Shimmer from "@/components/Shimmer.vue";
import ProductListItem from "@/components/Product/ListItem.vue";
import ProductItem from "@/components/Product/Item.vue";
import VueSelect from "vue3-select-component";

export default {
  components: {
    CountDown,
    ListSVG,
    GridSVG,
    ProductListItem,
    ProductItem,
    Shimmer,
    VueSelect
  },
  data() {
    return {
      isGrid: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      page: 1,
      form: {
        paginate: 12,
      },
      activeClass: "",
      loading: false,
    };
  },

  metaInfo() {
    return {
      title: "Daily-Deals",
    };
  },

  mounted() {
    if (this.lengthCounter(this.products) == 0) {
      this.$store.dispatch("dailyDeals", this.form);
    }
  },
  computed: {
    products() {
      return this.$store.getters.getDailyDeals;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
    productList() {
      if (
        this.products &&
        this.products.data &&
        this.products.data.length == 0
      ) {
        return ["id"];
      } else if (
        this.products &&
        this.products.data &&
        this.products.data.length > 0
      ) {
        return this.products.data;
      } else {
        return [];
      }
    },
  },

  created() {},
  methods: {
    countDownTimer() {
      const now = new Date().getTime();
      // let startOfDay = new Date(now - (now % 86400000)).toUTCString();
      let end_time = new Date(now - (now % 86400000) + 86400000); //2022-12-25 09:33:00
      let final_end_time = "";
      final_end_time += end_time.getFullYear() + "-";
      final_end_time += end_time.getMonth() + 1 + "-";
      final_end_time += end_time.getDate() - 1 + " ";
      final_end_time += "23:";
      final_end_time += "59:";
      final_end_time += "59";
      return final_end_time;
    },
    filterProducts() {
      this.$store.dispatch("dailyDeals", this.form);
    },
    loadMoreData() {
      if (this.page == 1) {
        this.loading = true;
      }
      this.page++;
      let url = this.url + "/home/daily-deals?page=" + this.page;
      this.$progress.start();
      axios.get(url, { params: this.form }).then((response) => {
        if (response.data.error) {
          this.$toast.error(response.data.error, this.lang.Error + " !!");
        } else {
          this.loading = false;
          let products = response.data.products.data;

          if (products.length > 0) {
            for (let i = 0; i < products.length; i++) {
              this.products.data.push(products[i]);
            }
          }
        }
        this.products.next_page_url = response.data.products.next_page_url;
        this.$progress.finish();
      });
    },
  },
};
</script>
