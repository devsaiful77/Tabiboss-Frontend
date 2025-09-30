<template lang="html">
  <!-- Breadcrumb Section Start -->
  <section class="breadcrumb-section bg-color py-10">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="breadcrumb-area">
            <ul class="list">
              <li @click="globNavigate('/')" class="linked">{{ lang.home }}</li>
              <li>{{ lang.cart }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Breadcrumb Section End -->

  <section class="cart-section pt-25 pb-100">
    <div class="container">
      <OrderProgress v-if="is_shimmer" />

      <!-- cart content -->
      <div v-if="is_shimmer">
        <div class="row" v-if="cartList && cartList.length > 0">
          <div class="col-xl 9 col-lg-8" v-if="seller_carts">
            <!-- items -->
            <div
              class="cart-form"
              v-for="(seller_cart, seller_id, seller_index) in seller_carts"
            >
              <div class="cart-header text-center">
                <h4 class="store-title">
                  {{ collapseAttribute[seller_index].name }}
                </h4>
              </div>
              <div class="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th class="cart-pd-thumb" width="50%">
                        {{ lang.product }}
                      </th>
                      <th class="cart-pd-price">{{ lang.unit_price }}</th>
                      <th class="cart-pd-qty">{{ lang.quantity }}</th>
                      <th class="cart-pd-subtotal">{{ lang.total_price }}</th>
                      <th class="cart-pd-action">{{ lang.action }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(cart, index) in carts" :key="index">
                      <tr v-if="seller_id == cart.seller_id">
                        <td class="cart-pd-thumb">
                          <div class="product-card--inline">
                            <router-link
                              :to="{
                                name: 'product.details',
                                params: { slug: cart.product_slug },
                              }"
                              class="product-image"
                            >
                              <img
                                :src="cart.image_72x72"
                                :alt="cart.product_name"
                              />
                            </router-link>
                            <div class="product-content">
                              <div class="product-title text-start">
                                <p class="text-ellips">
                                  {{ cart.product_name }}
                                </p>
                                <span v-if="cart.sku"
                                  >{{ lang.SKU }}: {{ cart.sku }}</span
                                >
                              </div>
                            </div>
                          </div>
                        </td>

                        <!-- unit price -->
                        <td class="cart-pd-price" data-title="Price">
                          <span class="me-3" v-if="cart.discount > 0"
                            ><del>{{ priceFormat(cart.price) }}</del></span
                          >
                          <span>{{
                            priceFormat(cart.price - cart.discount)
                          }}</span>
                        </td>

                        <!-- quantity -->
                        <td
                          class="cart-pd-qty"
                          data-title="Quantity"
                          v-if="cart.is_digital_product == 1"
                        >
                          1
                        </td>

                        <td
                          class="cart-pd-qty"
                          data-title="Quantity"
                          width="10%"
                          v-else
                        >
                          <div class="quantity bg-transparent border">
                            <button
                              type="button"
                              class="decressQnt"
                              @click="cartMinus(index)"
                            >
                              <i class="ri-subtract-line"></i>
                            </button>
                            <input
                              readonly
                              class="qnttinput"
                              type="number"
                              v-model="payment_form.quantity[index].quantity"
                              title="quantity"
                            />
                            <button
                              type="button"
                              class="incressQnt"
                              @click="cartPlus(index)"
                            >
                              <i class="ri-add-line"></i>
                            </button>
                          </div>
                        </td>

                        <!-- total price -->
                        <td class="cart-pd-subtotal" data-title="SubTotal">
                          <span class="me-3" v-if="cart.discount > 0"
                            ><del>{{
                              priceFormat(
                                cart.price *
                                  payment_form.quantity[index].quantity
                              )
                            }}</del></span
                          >
                          <span>{{
                            priceFormat(
                              (cart.price - cart.discount) *
                                payment_form.quantity[index].quantity
                            )
                          }}</span>
                        </td>

                        <td class="cart-pd-action" data-title="Action">
                          <button type="button" class="action-btn" @click="deleteCart(cart.id)">
                            <DeleteSVG />
                            <span>{{ lang.delete }}</span>
                          </button>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
              <!-- <div class="total-price text-end">Total: {{ priceFormat(storeTotal(seller_id)) }}</div> -->
              <div class="action-wrapper">
                <!-- <div class="coupon-box">
                    <input
                    type="text"
                    name="text"
                    class="form-control"
                    placeholder="Coupon Code"
                    />
                    <button type="submit" class="btn btn-secondary">
                    Apply Coupon
                    </button>
                </div> -->

                <div class="check-out">
                  <router-link to="/products" class="btn btn-primary">{{ lang.continue_shopping }}</router-link>
                </div>
              </div>
            </div>
            <!-- items -->
          </div>

          <!-- order details -->
          <div class="col-xl-3 col-lg-4">
            <div class="cart-order">
              <div class="cart-header">
                <h4 class="store-title">{{ lang.price_details }}</h4>
              </div>

              <Coupon v-if="authUser"
              :coupon_list="coupon_list"
              :cartList="cartList" />

              <!-- {{ payment_form.shipping_tax }} -->

              <PaymentDetails :sub_total="payment_form.sub_total"
              :tax="payment_form.tax"
              :discount_offer="payment_form.discount_offer"
              :shipping_tax="payment_form.shipping_tax"
              :coupon_discount="payment_form.coupon_discount"
              :total="payment_form.total" />

              <div class="cart-btns">
                <a href="javascript:void(0)" @click="handleCheckout" class="btn btn-secondary">{{ lang.proceed_to_checkout }}</a>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="justify-content-center text-center">
          <h4 class="breadcrumb-item text-danger">
            {{ lang.no_product_found }}
          </h4>
        </div>
      </div>
      <!-- cart content -->

      <div class="row" v-else-if="shimmer">
        <div class="col-xl 9 col-lg-8">
          <shimmer
            class="mb-3"
            :height="100"
            v-for="(cart, i) in 4"
            :key="i"
          ></shimmer>
        </div>
        <div class="col-xl-3 col-lg-4">
          <shimmer :height="400"></shimmer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import OrderProgress from "@/components/OrderProgress/Index.vue";
import Coupon from "@/components/Coupon.vue";
import PaymentDetails from "@/components/PaymentDetails.vue";
import DeleteSVG from "@/svg/DeleteSVG.vue";
export default {
  components: { Shimmer, OrderProgress, Coupon, PaymentDetails, DeleteSVG },

  data() {
    return {
      carts: [],
      seller_carts: [],
      coupon_area: true,
      coupon: [],
      cart_length: 0,
      collapseAttribute: [],
      disable: false,
      is_shimmer: false,
      coupon_list: [],
      shipping_classes: [],
    };
  },

  mounted() {
    this.getCheckout();
  },

  watch: {
    cartList(newValue, oldValue) {
      this.getCheckout();
    },
  },

  computed: {
    cartList() {
      return this.$store.getters.getCarts;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
  },

  methods: {
    getCheckout() {
      this.$progress.start();
      let url = this.getUrl("cart/list?cart_page=1");
      axios.get(url).then((response) => {
        this.is_shimmer = true;
        this.$store.commit("setShimmer", 0);
        if (response.data.error) {
          
          this.$toast.error(response.data.error, this.lang.Error + " !!");
        } else {
          this.$progress.finish();
          let checkouts = response.data.checkouts;
          let coupons = response.data.coupons;
          this.shipping_classes = response.data.shipping_classes;
          this.parseData(this.cartList, checkouts, coupons);
        }
      });
    },

    deleteCart(id) {
      if (confirm("Are you sure?")) {
        let url = this.getUrl("cart/delete/" + id);
        axios.get(url).then((response) => {
          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            this.$store.dispatch("carts", response.data.carts);
          }
        });
      }
    },
    checkout() {
      if (!this.authUser) {
        this.$toast.error(this.lang.login_first, this.lang.Error + " !!");
        this.$store.commit("setLoginRedirection", this.$route.name);
        this.$router.push({ name: "login" });
        return false;
      }
      if (this.authUser.user_type != "customer") {
        return this.$toast.warning(
          this.lang.you_are_not_able_topurchase_products,
          this.lang.Warning + " !!"
        );
      }
      this.$router.push({ name: "checkout" });
    },

    parseData(carts, checkouts, coupons) {
      this.resetForm();
      this.collapseAttribute = [];
      this.carts = [];

      if (carts) {
        for (let i = 0; i < carts.length; i++) {
          this.payment_form.quantity.push({
            id: carts[i].id,
            quantity: carts[i].quantity,
          });
          this.carts.push(carts[i]);
          this.payment_form.sub_total += parseFloat(
            carts[i].price * carts[i].quantity
          );
          this.payment_form.discount_offer +=
            parseFloat(carts[i].discount) * carts[i].quantity;
          if (this.settings.shipping_cost == "product_base") {
            this.payment_form.shipping_tax += parseFloat(
              carts[i].shipping_cost
            );
          }

          this.payment_form.tax += parseFloat(carts[i].tax * carts[i].quantity);
        }
      }

      if (checkouts) {
        this.seller_carts = checkouts;
        this.coupon = checkouts;

        for (let key in this.seller_carts) {
          this.collapseAttribute.push({
            name: checkouts[key].name,
            image: checkouts[key].image,
            status: true,
          });
          if (this.settings.shipping_cost != "area_base") {
            this.payment_form.shipping_tax += parseFloat(
              checkouts[key].shipping_cost
            );
          }
          this.payment_form.tax += parseFloat(checkouts[key].tax);
          if (this.settings.coupon_system == 1) {
            this.payment_form.coupon_discount += parseFloat(
              checkouts[key].discount
            );
          }
        }
      }

      if (coupons && this.settings.coupon_system == 1) {
        this.coupon_list = coupons;
        for (let i = 0; i < coupons.length; i++) {
          this.payment_form.coupon_discount += parseFloat(coupons[i].discount);
        }
      }

      if (
        this.settings.tax_type == "after_tax" &&
        this.settings.vat_and_tax_type == "order_base"
      ) {
        this.payment_form.total = parseFloat(
          parseFloat(this.payment_form.sub_total) +
            parseFloat(this.payment_form.shipping_tax) -
            (parseFloat(this.payment_form.discount_offer) +
              parseFloat(this.payment_form.coupon_discount))
        );
        this.payment_form.total += this.payment_form.tax;
        if (this.payment_form.total < 0) {
          this.payment_form.total = 0;
        }
      } else {
        this.payment_form.total = parseFloat(
          parseFloat(this.payment_form.sub_total) +
            parseFloat(this.payment_form.tax) +
            parseFloat(this.payment_form.shipping_tax) -
            (parseFloat(this.payment_form.discount_offer) +
              parseFloat(this.payment_form.coupon_discount))
        );
        if (this.payment_form.total < 0) {
          this.payment_form.total = 0;
        }
      }
    },
    cartPlus(index) {
      if (this.disable) {
        return false;
      }
      if (
        this.payment_form.quantity[index].quantity <
        this.carts[index].current_stock
      ) {
        let formData = {
          id: this.carts[index].id,
          quantity: 1,
        };

        this.disable = true;
        let url = this.getUrl("cart/update");
        axios
          .post(url, formData)
          .then((response) => {
            this.disable = false;
            if (response.data.error) {
              this.$toast.error(response.data.error, this.lang.Error + " !!");
            } else {
              this.$store.dispatch("carts", response.data.carts);
              let coupons = response.data.coupons;
              this.parseData(this.cartList, response.data.checkouts, coupons);
            }
          })
          .catch((error) => {
            this.disable = false;
          });
      } else {
        this.$toast.warning(
          this.lang.Only +
            " " +
            this.carts[index].current_stock +
            " " +
            this.lang.items_available_at_this_time,
          this.lang.Warning + " !!"
        );
      }
    },
    cartMinus(index) {
      if (this.disable) {
        return false;
      }
      if (
        this.payment_form.quantity[index].quantity >
        this.carts[index].min_quantity
      ) {
        let formData = {
          id: this.carts[index].id,
          quantity: -1,
          status: "minus",
        };

        let url = this.getUrl("cart/update");
        this.disable = true;

        axios.post(url, formData).then((response) => {
          this.disable = false;
          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            this.$store.dispatch("carts", response.data.carts);
            let coupons = response.data.coupons;
            let checkouts = response.data.checkouts;
            this.parseData(this.cartList, checkouts, coupons);
          }
        });
      } else {
        this.$toast.warning(
          this.lang.please_order_minimum_of +
            " " +
            this.carts[index].min_quantity +
            " " +
            this.lang.Quantity,
          this.lang.Warning + " !!"
        );
      }
    },
  },
};
</script>

<style scoped>
.coupon-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  gap: 10px;
}
</style>
