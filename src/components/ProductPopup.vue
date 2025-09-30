<template lang="html">
  <!-- Modal -->
  <div
    class="modal fade PopupModal"
    id="productPopup"
    tabindex="-1"
    aria-labelledby="productPopupLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <button
            id="product_modal_close"
            type="button"
            class="close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="ri-close-large-fill"></i>
          </button>
        </div>

        <!-- with real data -->
        <div class="modal-body" v-if="productDetails">

        <!-- {{ productDetails }} -->
          <div class="container">
            <div class="row align-items-start">
              <div class="col-lg-7 col-md-6" v-if="lengthCounter(productDetails.gallery) > 0">
                <ProductThumb
                    :thumbnail="productDetails.gallery"
                    :product_name="productDetails.product_name"
                    :discountCheck="productDetails.special_discount_check"
                    :user_wishlist="productDetails.user_wishlist"
                    :product_id="productDetails.id"

                    :days="productDetails.countdown.days"
                    :hours="productDetails.countdown.hours"
                    :minutes="productDetails.countdown.mins"
                    :seconds="productDetails.countdown.secs"

                    type="popup"
                />
              </div>
              <div class="col-lg-5 col-md-6">
                <ProductSingleContent :productDetails="productDetails" />
              </div>
            </div>
          </div>
        </div>
        <!-- with demo data -->
        <div class="modal-body" v-else-if="shimmer">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-7 col-md-6">
                <Shimmer :height="620" />
              </div>
              <div class="col-lg-5 col-md-6">
                <div class="mb-3">
                  <Shimmer :height="190" />
                </div>
                <div class="mb-3">
                  <Shimmer :height="200" />
                </div>
                <div class="mb-3">
                  <Shimmer :height="200" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end -->
      </div>
    </div>
  </div>
</template>

<script>
import ProductThumb from "./ProductThumb.vue";
import ProductSingleContent from "./ProductSingleContent.vue";
import Shimmer from "@/components/Shimmer.vue";

export default {
  components: {
    ProductThumb,
    ProductSingleContent,
    Shimmer,
  },

  data() {
    return {
      loading: false,
      disable: false,
    };
  },

  computed: {
    active_modal() {
      return this.$store.getters.getActiveModal;
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

};
</script>
