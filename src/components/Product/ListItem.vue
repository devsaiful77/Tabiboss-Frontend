<template>
  <!-- Product Item Start -->
  <div class="productlistItem">
    <!-- Thumb -->
    <div class="productThumb-wrapper">
      <!-- Conditional Rendering for Badges -->
      <!-- <div v-if="item.badge_text === 'Sale'" class="badge badge-success">{{ item.badge_text }}</div>
            <div v-else-if="item.badge_text === 'New'" class="badge badge-warning">{{ item.badge_text }}</div>
            <div v-else-if="item.badge_text === 'Hot'" class="badge badge-danger">{{ item.badge_text }}</div> -->
      <!-- <div class="badge">-20%</div> -->

      <a
        :href="'product/' + product.slug"
        @click.prevent="routerNavigator('product.details', product.slug)"
        class="productThumb"
      >
        <img :src="product.image_190x230" :alt="product.product_name" />
      </a>
    </div>
    <!-- Content Start -->
    <div class="product-content">
      <div class="product-meta">
        <div class="product-category">{{ product.brand_name }} </div>

        <!-- product sold -->
        <template v-if="productSold == 1">
            <div class="product-status" v-if="product.sold > 0">{{ lang.sold }} {{ product.sold }}</div>
            <div class="product-status" v-else>{{ lang.sold }} 0</div>
        </template>

      </div>
      <h5 class="title text-ellips">
        <a
          :href="'product/' + product.slug"
          @click.prevent="routerNavigator('product.details', product.slug)"
        >
          {{ product.product_name }}
        </a>
      </h5>
        <a href="javaScript:void(0)" @click="productFetch(product.slug)"
            class="btn btn-primary">{{ lang.quick_view }}</a>

    </div>
    <!-- Product Price -->
    <div class="pricing-wrapper">
      <span class="price">
        <del v-if="product.special_discount_check > 0"
          >{{ priceFormat(product.price) }}
        </del>

        <span v-if="product.special_discount_check > 0">
          {{ priceFormat(product.discount_percentage) }}
        </span>
        <span v-else>{{ priceFormat(product.price) }}</span>
      </span>

      <a
        v-if="
          product.minimum_order_quantity <= product.current_stock &&
          !product.is_catalog &&
          !product.is_classified
        "
        href="javaScript:void(0)"
        @click="cartBtn(product, index)"
        class="addCart-btn btn btn-primary"
        >{{ lang.add_to_cart }}</a
      >

      <a href="javaScript:void(0)" v-else class="btn btn-primary">{{ lang.stock_out }}</a>

      <!-- if auth then access wishlist -->
      <div class="product-actions" v-if="authUser">
        <a class="action-btn wishlist" v-if="$store.getters.isThisWishlisted(product.id)" href="javaScript:void(0)" @click="removeWishlist(product.id)">
          <i class="ri-heart-3-fill"></i>{{ lang.wishlist }}
        </a>

        <a class="action-btn" v-else href="javaScript:void(0)" :class="{ disable_btn: is_disabled == true }" @click="addToWishlist(product.id)">
            <i class="ri-heart-3-line"></i>{{ lang.wishlist }}
        </a>
      </div>


      <!-- compare -->
      <div class="product-actions">
        <a class="action-btn mb-2" v-if="compareCheck(product)" :class="{ disable_btn: is_disabled == true }" @click="removeCompare(product.id)" href="javaScript:void(0)">
            <i class="ri-scales-3-fill"></i>{{ lang.remove }}
        </a>

        <a class="action-btn" v-else @click="addToCompare(product)" :class="{ disable_btn: is_disabled == true }" href="javaScript:void(0)">
            <i class="ri-scales-3-line"></i>{{ lang.compare }}
        </a>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  props: ["product", "grid_class", "type", "number"],

  data() {
    return {
      checkListing: true,
      showModal: false,
      currentSlide: 0,
      is_disabled: false,
      loading: false,
    };
  },

  mounted() {
    if (this.authUser) {
      setTimeout(() => this.pushWishlists(), 2000);
    }
    this.compareList();
  },
  computed: {
    activeCurrency() {
      return this.$store.getters.getActiveCurrency;
    },
    wishlists() {
      return this.$store.getters.getUserWishlist;
    },
    compareLists() {
      return this.$store.getters.getUserCompare;
    },
    count_compare() {
      return this.$store.getters.getCountCompare;
    },

    productDetails() {
      let products = this.$store.getters.getProductDetails;
      for (let i = 0; i < products.length; i++) {
        if (products[i].slug == this.active_modal) {
          return products[i].product;
        }
      }
      return false;
    },
  },

  methods: {
    addToWishlist(id) {
      this.is_disabled = true;
      this.$store.commit("addNewWishlistId", id);
      let url = this.getUrl("user/add-to-wishlist/" + id);
      axios.get(url).then((response) => {
        this.is_disabled = false;
        if (response.data.error) {
          this.$Progress.error();
          toastr.error(response.data.error, this.lang.Error + " !!");
        } else {
          this.$store.dispatch("userWishlistProduct", response.data.wishlist);
          this.$store.dispatch("wishlists", response.data.wishlists);
          toastr.success(response.data.success, this.lang.Success + " !!");
        }
      });
    },
    compareCheck(product) {
      let length = Object.keys(this.compareLists).length;

      for (let i = 0; i < length; i++) {
        if (product.id == this.compareLists[i].id) {
          return true;
        }
      }
      return false;
    },
    removeWishlist(id) {
      this.checkListing = false;
      this.$store.commit("removeFromWishlistID", id);

      let url = this.getUrl("user/remove-wishlist-product/" + id);
      axios.get(url).then((response) => {
        if (response.data.error) {
          
          toastr.error(response.data.error, this.lang.Error + " !!");
        } else {
          this.checkListing = true;
          this.$store.commit("getRemoveWishlist", response.data.wishlist);
          this.$store.dispatch("wishlists", response.data.totalWishlist);
          toastr.success(response.data.success, this.lang.Success + " !!");
        }
      });
    },
    pushWishlists() {
      if (this.wishlists.length > 0) {
        let length = Object.keys(this.wishlists).length;

        if (length == 0) {
          let product_length = this.products.length;
          for (let i = 0; i < product_length; i++) {
            let wishlist = this.products[i].user_wishlist;
            if (wishlist) {
              this.$store.dispatch("userWishlistProduct", wishlist);
            }
          }
        }
      }
    },
    compareList() {
      let length = this.compareLists.length;
      let flag = this.count_compare;

      if (length == 0 && flag) {
        this.$store.commit("getCountCompare", false);
        let url = this.getUrl("home/compare-list");
        axios.get(url).then((response) => {
          if (response.data.error) {
            toastr.error(response.data.error, this.lang.Error + " !!");
          } else {
            let products = response.data.products;
            for (let i = 0; i < products.length; i++) {
              let compare = products[i];
              if (compare) {
                this.$store.dispatch("userCompareProduct", compare);
              }
            }
            // this.pushCompare();
          }
        });
      }
    },
    addToCompare(product) {
      this.is_disabled = true;
      let url = this.getUrl("home/add-to-compare/" + product.id);
      axios.get(url).then((response) => {
        this.is_disabled = false;
        if (response.data.error) {
          toastr.error(response.data.error, this.lang.Error + " !!");
        } else {
          this.$store.commit("getUserCompare", response.data.product);
          this.$store.dispatch("compareList", response.data.compare_list);
        }
      });
    },
    removeCompare(id) {
      let url = this.getUrl("home/remove-compare_product/" + id);
      axios.get(url).then((response) => {
        if (response.data.error) {
          toastr.error(response.data.error, this.lang.Error + " !!");
        } else {
          this.$store.commit("getRemoveCompare", response.data.product);
          this.$store.dispatch("compareList", response.data.compare_list);
        }
      });
    },
    pageChange(i) {
      this.currentSlide = i;
    },
    swipeSlide() {
      setTimeout(() => {
        if (this.$refs.carousel_best) {
          this.$refs.carousel_best.pause();
        }
      }, 1000);
    },
    swipe(event) {
      if (event == "left") {
        this.$refs.carousel_best.next();
      } else if (event == "right") {
        this.$refs.carousel_best.prev();
      }
    },
  },
};
</script>

<style scoped>

.wishlist i[data-v-d0eae3ca] {
  color: #fa4549;
  background: gray;
}
</style>
