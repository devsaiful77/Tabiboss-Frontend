<template lang="html">
  <!-- Breadcrumb Section Start -->
  <section class="breadcrumb-section bg-color py-10">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="breadcrumb-area">
            <ul class="list">
              <li @click="globNavigate('/')" class="linked">{{ lang.home }}</li>
              <li @click="globNavigate('/cart')" class="linked">{{ lang.cart }}</li>
              <li>{{ lang.check_out }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Breadcrumb Section End -->

  <section class="cart-section pt-25 pb-100">
    <div class="container">
      <OrderProgress />

      <!-- checkout page -->
      <div class="row">
        <!-- order summary -->
        <div class="col-xl-9 col-lg-8" v-if="true">
          <h4>{{ lang.choose_a_way_to_collect_order }}</h4>

          <!-- PicHub Point -->
          <div class="cart-form payment-accordion" v-if="pick_hubs.length > 0">
            <div class="defaultCheck radius border-none">
              <!-- customCheckbox -->
              <div class="customCheckbox">
                <input
                  type="radio"
                  id="address"
                  value="2"
                  v-model="checkout_method"
                  @change="calculateShippingCost"
                />
                <label for="address">{{
                  lang.use_shipping_billing_addresses
                }}</label>
              </div>

              <div class="customCheckbox mt-3">
                <input
                  type="radio"
                  id="pickhub"
                  value="1"
                  v-model="checkout_method"
                  @change="calculateShippingCost"
                />
                <label for="pickhub">{{ lang.use_pickHub_point }}</label>
              </div>
            </div>
            <!-- Dropdown Item -->
            <div
              v-if="pick_hubs.length > 0 && checkout_method == 1"
              class="input-group py-15 px-20 border-top rounded-0"
            >
              <select
                v-model="pick_hub_id"
                @change="calculateShippingCost"
                class="form-control"
              >
                <option value="">{{ lang.select_pickHub_point }}</option>
                <option
                  v-for="(hub, index) in pick_hubs"
                  :key="index"
                  :value="hub.id"
                >
                  {{ hub.name }} => {{ hub.address }}
                </option>
              </select>
            </div>
          </div>

          <!-- Shipping Address Details -->
          <div v-if="addresses.length > 0 && checkout_method == 2">
            <div class="cart-form border-none payment-accordion">
              <div
                class="cart-header border d-flex align-items-center justify-content-between"
              >
                <h4 class="store-title">{{ lang.shipping_address }}</h4>
              </div>
              <div
                class="addressWrapper"
                v-if="addresses && checkout_method == 2"
              >
                <!-- Address Item Start -->
                <div
                  class="col-md-6 addressItem"
                  v-for="(address, index) in addresses"
                  :key="index"
                  :class="default_shipping.id == address.id ? 'active' : ''"
                >
                  <div class="customCheckbox">
                    <input
                      type="radio"
                      :value="address"
                      name="radioNoLabel"
                      :id="'shipping_' + address.id"
                      v-model="default_shipping"
                      @change="fetchShippingCost"
                      aria-label="..."
                    />
                    <label
                      class="addressTitle"
                      :id="'shipping_' + address.id"
                      :for="'shipping_' + address.id"
                    >
                      <div class="addressHeader">
                        <div class="left">
                          <div class="title"></div>
                        </div>

                        <div class="right">
                          <a
                            class="badge-btn mr-3"
                            href="javascript:void(0)"
                            @click="$refs.address_form.edit(address)"
                            >{{ lang.edit }}</a
                          >
                          <a
                            class="badge-btn"
                            href="javascript:void(0)"
                            v-if="
                              !address.default_shipping &&
                              !address.default_billing
                            "
                            @click="
                              $refs.address_form.deleteAddress(address.id)
                            "
                            >{{ lang.delete }}</a
                          >
                        </div>
                      </div>
                    </label>
                    <ul class="addressList">
                      <li>{{ lang.name }} : {{ address.name }}</li>
                      <li>{{ lang.email }} : {{ address.email }}</li>
                      <li>{{ lang.phone }} : {{ address.phone_no }}</li>
                      <li>{{ lang.street_address }} : {{ address.address }}</li>
                      <li>{{ lang.country }} : {{ address.country }}</li>
                      <li>{{ lang.state }} : {{ address.state }}</li>
                      <li>{{ lang.city }} : {{ address.city }}</li>
                    </ul>
                  </div>
                </div>
                <!-- Address Item Start -->
              </div>
            </div>
          </div>

          <!-- billing address -->
          <!-- v-if="addresses.length > 0 && !same_address && checkout_method == 2" -->

          <div class="defaultCheck customDefaultCheckbox">
            <div class="customCheckbox">
              <input
                v-model="same_address"
                checked
                id="same_as"
                type="checkbox"
                @change="billingAddressSelect"
              />
              <label for="same_as">{{ lang.address_is_shipping }} </label>
            </div>
          </div>

          <div
            class="cart-form border-none payment-accordion"
            v-if="addresses.length > 0 && !same_address && checkout_method == 2"
          >
            <div
              class="cart-header border d-flex align-items-center justify-content-between"
            >
              <h4 class="store-title">{{ lang.billing_address }}</h4>
            </div>

            <div class="addressWrapper">
              <!-- Address Item Start -->
              <div
                class="col-md-6 addressItem"
                v-for="(address, index) in addresses"
                :key="index"
                :class="default_shipping.id == address.id ? 'active' : ''"
              >
                <div class="customCheckbox">
                  <input
                    type="radio"
                    :value="address"
                    name="radioNoLabel"
                    :id="'shipping_' + address.id"
                    v-model="default_shipping"
                    @change="fetchShippingCost"
                    aria-label="..."
                  />
                  <label
                    class="addressTitle"
                    :id="'shipping_' + address.id"
                    :for="'shipping_' + address.id"
                  >
                    <div class="addressHeader">
                      <div class="left">
                        <div class="title"></div>
                      </div>

                      <div class="right">
                        <a
                          class="badge-btn mr-3"
                          href="javascript:void(0)"
                          @click="$refs.address_form.edit(address)"
                          >{{ lang.edit }}</a
                        >
                        <a
                          class="badge-btn"
                          href="javascript:void(0)"
                          v-if="
                            !address.default_shipping &&
                            !address.default_billing
                          "
                          @click="$refs.address_form.deleteAddress(address.id)"
                          >{{ lang.delete }}</a
                        >
                      </div>
                    </div>
                  </label>
                  <ul class="addressList">
                    <li>{{ lang.name }} : {{ address.name }}</li>
                    <li>{{ lang.email }} : {{ address.email }}</li>
                    <li>{{ lang.phone }} : {{ address.phone_no }}</li>
                    <li>{{ lang.street_address }} : {{ address.address }}</li>
                    <li>{{ lang.country }} : {{ address.country }}</li>
                    <li>{{ lang.state }} : {{ address.state }}</li>
                    <li>{{ lang.city }} : {{ address.city }}</li>
                  </ul>
                </div>
              </div>
              <!-- Address Item Start -->
            </div>
          </div>
          <!-- billing address -->

          <!-- Billing method Data -->
          <div class="cart-form border-none payment-accordion">
            <div
              class="cart-header border d-flex align-items-center justify-content-between"
            >
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed bg-transparent"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#billingCollapse"
                  aria-expanded="true"
                  aria-controls="billingCollapse"
                >
                  {{ lang.update_address }}
                </button>
              </h2>
            </div>
            <div class="col-12">
              <div
                id="billingCollapse"
                class="accordion-collapse collapse show"
                data-bs-parent="#billing-accordion"
              >
                <AddressForm ref="address_form" v-if="checkout_method == 2" />
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-9 col-lg-8" v-else-if="shimmer">
          <Shimmer
            class="mb-3"
            :height="200"
            v-for="(addresses, i) in 3"
            :key="i"
          />
        </div>

        <!-- order Details -->
        <div class="col-xl-3 col-lg-4">
          <div class="cart-order">
            <div class="cart-header">
              <h4 class="store-title">{{ lang.price_details }}</h4>
            </div>

            <Coupon
              v-if="authUser"
              :coupon_list="coupon_list"
              :cartList="carts"
              :trx_id="payment_form.trx_id"
            />

            <PaymentDetails
              :sub_total="payment_form.sub_total"
              :tax="payment_form.tax"
              :discount_offer="payment_form.discount_offer"
              :shipping_tax="payment_form.shipping_tax"
              :coupon_discount="payment_form.coupon_discount"
              :total="payment_form.total"
            />

            <GdPrPage
              ref="privacy_agreement"
              :agreements="settings.privacy_agreement"
            />
            <div class="cart-btns">
              <loading_button
                v-if="loading"
                :class_name="'btn btn-secondary'"
              ></loading_button>
              <a
                href="javascript:void(0)"
                v-else
                @click="confirmOrder"
                class="btn btn-secondary"
                >{{ lang.proceed_to_payment }}</a
              >
            </div>
          </div>
        </div>
      </div>
      <!-- checkout page -->
    </div>
  </section>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import Telephone from "@/components/Telephone.vue";
import Coupon from "@/components/Coupon.vue";
import OrderProgress from "@/components/OrderProgress/Index.vue";
import PaymentDetails from "@/components/PaymentDetails.vue";
import AddressForm from "@/components/AddressFormCheckout.vue";
import GdPrPage from "@/components/GdPr_Page.vue";

export default {
  components: {
    Shimmer,
    Telephone,
    Coupon,
    OrderProgress,
    AddressForm,
    PaymentDetails,
    GdPrPage
  },

  data() {
    return {
      coupon_area: true,
      coupon_list: [],
      checkout: {},
      form: {
        id: "",
        name: "",
        email: "",
        phone_no: "",
        address: "",
        country_id: "",
        state_id: "",
        city_id: "",
        postal_code: "",
      },
      shipping_cost: 0,
      address_area: false,
      default_shipping: {},
      default_billing: {},
      same_address: true,
      addresses: [],
      pick_hubs: [],
      pick_hub_id: "",
      checkout_method: 2,
      loading: false,
      save_loading: false,
      address_area_title: "Add a new address",
      address_submit_button: "Add",
    };
  },
  mounted() {
    this.getAddress();
    this.address_submit_button = this.lang.add;
  },
  watch: {
    carts(newValue, oldValue) {
      this.getAddress();
    },
    lang(newValue, oldValue) {
      this.address_submit_button = this.lang.add;
    },
  },
  computed: {
    carts() {
      return this.$store.getters.getCarts;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
  },

  methods: {
    getAddress() {
      let url = this.getUrl(
        "user/address?cart_page=" + this.$route.query.cart_page
      );
      // this.$progress.start();
      axios
        .get(url, { params: this.$route.params.type })
        .then((response) => {
          if (response.data.error) {
            // 
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            this.$store.commit("setLoginRedirection", "");
            let coupons = response.data.coupons;
            this.parseData(
              response.data.carts,
              response.data.checkouts,
              coupons
            );
            this.addresses = response.data.addresses;
            this.checkout = response.data.checkout;
            this.pick_hubs = response.data.pickup_hubs;

            for (let i = 0; i < this.addresses.length; i++) {
              if (this.addresses[i].default_shipping == 1) {
                this.default_shipping = this.addresses[i];
              }
              if (this.addresses[i].default_billing == 1) {
                this.default_billing = this.addresses[i];
              }
            }

            if (this.addresses.length === 0) {
              this.address_area = true;
            }

            // this.$progress.finish();
          }
        })
        .catch((error) => {
          console.log(error)
          // 
        });
    },
    confirmOrder() {
      if (!this.$refs.privacy_agreement.checkAgreements()) {
        return this.$toast.success(
          this.lang.accept_terms,
          this.lang.Error + " !!"
        );
      }
      this.payment_form.checkout_method = this.checkout_method;
      if (this.checkout_method == 1) {
        if (!this.pick_hub_id) {
          return this.$toast.success(
            this.lang.please_choose_a_pickHub_point,
            this.lang.Error + " !!"
          );
        }
        this.payment_form.pick_hub_id = this.pick_hub_id;
      } else {
        if (!this.default_shipping.id) {
          return this.$toast.success(
            this.lang.please_choose_a_billing_address,
            this.lang.Error + " !!"
          );
        }
        this.payment_form.shipping_address = this.default_shipping;
        this.payment_form.billing_address = this.default_billing;
      }

      this.payment_form["buy_now"] = this.$route.params.type
        ? this.$route.params.type.is_buy_now
        : 0;
      let url = this.getUrl("user/confirm-order");
      // this.$progress.start();
      this.loading = true;

      axios
        .post(url, this.payment_form)
        .then((response) => {
          this.loading = false;
          if (response.data.error) {
            // 
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            // this.$progress.finish();
            this.$router.push({ name: "payment" });
          }
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    billingAddressSelect() {
      if (this.same_address) {
        this.default_billing = this.default_shipping;
      } else {
        this.default_billing = {};
      }
    },
    parseData(carts, checkouts, coupons) {
      this.resetForm();
      for (let i = 0; i < carts.length; i++) {
        this.payment_form.quantity.push({
          id: carts[i].id,
          quantity: carts[i].quantity,
        });
        this.payment_form.sub_total += parseFloat(
          carts[i].price * carts[i].quantity
        );
        this.payment_form.discount_offer += parseFloat(
          carts[i].discount * carts[i].quantity
        );
        if (this.settings.shipping_cost == "product_base") {
          this.payment_form.shipping_tax += parseFloat(carts[i].shipping_cost);
        }
        this.payment_form.tax += parseFloat(carts[i].tax * carts[i].quantity);
        this.payment_form.trx_id = carts[i].trx_id;
      }

      if (checkouts) {
        for (let key in checkouts) {
          this.payment_form.shipping_tax += parseFloat(
            checkouts[key].shipping_cost
          );
          this.payment_form.tax += parseFloat(checkouts[key].tax);
        }
      }

      if (coupons && this.settings.coupon_system == 1) {
        this.coupon_list = coupons;
        for (let i = 0; i < coupons.length; i++) {
          this.payment_form.coupon_discount += parseFloat(coupons[i].discount);
        }
      }

      this.shipping_cost = this.payment_form.shipping_tax;

      this.calculateShippingCost();
    },
    fetchShippingCost() {
      this.default_billing = this.default_shipping;
      if (this.settings.shipping_fee_type == "area_base") {
        let url = this.getUrl("user/find/shipping_cost");

        let form = {
          city_id: this.default_shipping.address_ids.city_id,
        };

        axios.post(url, form).then((response) => {
          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            this.payment_form.shipping_tax = response.data.shipping_cost;
            this.shipping_cost = this.payment_form.shipping_tax;
            this.payment_form.total = parseFloat(
              parseFloat(this.payment_form.sub_total) +
                parseFloat(this.payment_form.tax) +
                parseFloat(this.payment_form.shipping_tax) -
                (parseFloat(this.payment_form.discount_offer) +
                  parseFloat(this.payment_form.coupon_discount))
            );

            if (this.settings.tax_type == "after_tax") {
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
          }
        });
      }
      return false;
    },
    calculateShippingCost() {
      this.payment_form.shipping_tax = 0;
      if (this.checkout_method == 1) {
        this.payment_form.shipping_tax = 0;
      } else {
        this.payment_form.shipping_tax = this.shipping_cost;
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
    getNumber(number) {
      this.form.phone_no = number;
    },
  },
};
</script>
<style scoped>
.customDefaultCheckbox {
  border: 0px !important;
}

.payment-accordion .accordion-body {

      border-width: 1px !important;
  }
</style>
