<template lang="html">
  <div class="col-lg-10 m-auto mt-10 mb-10">
    <!-- Order Confirm -->

    <!-- is_shimmer -->
    <div class="orderConfirm mt-3 mb-3" v-if="is_shimmer">
      <template v-for="(order, index) in orders" :key="index">
        <div class="orderConfirm-wrapper text-center">
          <div class="icon"><i class="ri-check-line"></i></div>
          <h2 class="title">{{ lang.thank_you }}</h2>
          <p class="desc">{{ lang.your_order_status_as_follows }}</p>
          <h2>{{ lang.order_id }} {{ order.code }}</h2>
        </div>

        <div class="border radius py-30 px-30 mt-60">
          <div class="title">
            <h4>{{ lang.account_details }}</h4>
          </div>
          <div class="order-details">
            <div class="order-info">
              {{ lang.order_code }}<span>{{ order.code }}</span>
            </div>
            <div class="order-info">
              {{ lang.name }}<span>{{ order.user.name ?? "Unknown" }}</span>
            </div>
            <div class="order-info">
              {{ lang.email }}<span>{{ order.user.email }}</span>
            </div>
            <div class="order-info">
              {{ lang.shipping_address
              }}<span>{{ order.shipping_address.address }}</span>
            </div>
            <div class="order-info">
              {{ lang.billing_address
              }}<span>{{ order.billing_address.address }}</span>
            </div>
            <div class="order-info">
              {{ lang.order_date }}<span>{{ order.date }}</span>
            </div>
            <div
              class="order-info"
              v-if="addons.includes('ramdhani') && order.delivery_date"
            >
              {{ lang.delivery_date }}<span>{{ order.delivery_date }}</span>
            </div>
            <div class="order-info">
              {{ lang.order_status }}<span>{{ order.delivery_status }}</span>
            </div>
            <div class="order-info">
              {{ lang.payment_status }}<span>{{ order.payment_status }}</span>
            </div>
            <div class="order-info">
              {{ lang.payment_type }}<span>{{ order.payment_type }}</span>
            </div>
            <div
              class="order-info"
              v-if="!addons.includes('ramdhani') && !order.delivery_date"
            >
              <span></span>
            </div>
          </div>

          <div class="cart-order v2 mt-40">
            <div
              class="cart-header d-flex align-items-center justify-content-between"
            >
              <h4 class="store-title">{{ lang.order_details }}</h4>
              <h4 class="store-title"></h4>
            </div>
            <div class="table-header">
              <div class="title">{{ lang.product_name }}</div>
              <div class="title">{{ lang.price }}</div>
              <div class="title">{{ lang.total_amount }}</div>

              <!-- <div class="title" v-if="addons.includes('refund')">
                {{ lang.refund }}
              </div> -->
            </div>

            <!-- product items -->
            <ul class="shopPurchase">
              <li
                v-for="(order_detail, index) in order.order_details"
                :key="'order' + index"
              >
                <span class="label" style="max-width: 200px">
                  {{ order_detail.product_name }}
                  {{ order_detail.variation }}
                </span>

                <span class="value">
                  <p>
                    {{ lang.price }} : {{ priceFormat(order_detail.price) }} X
                    {{ order_detail.quantity }} =
                    {{
                      priceFormat(order_detail.price * order_detail.quantity)
                    }}
                  </p>

                  <!-- tax -->
                  <p
                    v-if="
                      (order.tax_method &&
                        order.tax_method.vat_tax_type == 'product_base') ||
                      !order.tax_method ||
                      !order.tax_method.vat_tax_type
                    "
                  >
                    {{ lang.tax }} :
                    <span v-if="order_detail.tax > 0">
                      {{ priceFormat(order_detail.tax) }} X
                      {{ order_detail.quantity }} =
                      {{
                        priceFormat(order_detail.tax * order_detail.quantity)
                      }}
                    </span>
                    <span v-else>
                      {{
                        priceFormat(order_detail.tax * order_detail.quantity)
                      }}
                    </span>
                  </p>
                  <!-- shipping cost -->
                  <p
                    v-if="
                      order.shipping_method == 'product_base' ||
                      !order.shipping_method
                    "
                  >
                    {{ lang.shipping_cost }} :
                    <span
                      v-if="order_detail.shipping_cost.depend_on_quantity == 1"
                    >
                      {{ priceFormat(order_detail.shipping_cost.per_cost) }}
                      X {{ order_detail.quantity }} =
                      {{ priceFormat(order_detail.shipping_cost.total_cost) }}
                    </span>
                    <span>
                      {{ priceFormat(order_detail.shipping_cost.total_cost) }}
                    </span>
                  </p>

                  <!-- discount -->
                  <p>
                    {{ lang.discount }} :
                    <span
                      v-if="order_detail.discount * order_detail.quantity > 0"
                    >
                      {{ priceFormat(order_detail.discount) }}
                      X {{ order_detail.quantity }} =
                      {{
                        priceFormat(
                          order_detail.discount * order_detail.quantity
                        )
                      }}
                    </span>
                    <span v-else>{{ priceFormat(0) }}</span>
                  </p>

                  <!-- coupon discount -->
                  <p
                    v-if="
                      order.is_coupon_system_active == 1 &&
                      order.coupon_discount > 0
                    "
                  >
                    {{ lang.coupon_discount }} :
                    {{ priceFormat(order_detail.coupon_discount.discount) }}
                  </p>

                  <!-- total amount -->
                </span>

                <!-- Refund -->
                <span class="value">
                  {{ priceFormat(order_detail.total_amount) }}
                </span>
              </li>
            </ul>

            <!-- total product amount -->
            <ul class="cart-subtotal">
              <li>
                <span class="label">{{ lang.subtotal }} </span
                ><span class="value">{{ priceFormat(order.sub_total) }}</span>
              </li>
              <li
                v-if="
                  order.tax_type == 'before_tax' ||
                  order.vat_tax_type == 'product_base' ||
                  (order.total_tax > 0 && addons.includes('ramdhani'))
                "
              >
                <span class="label">{{ lang.tax }}</span
                ><span class="value">{{ priceFormat(order.total_tax) }}</span>
              </li>
              <li>
                <span class="label">{{ lang.discount }}</span
                ><span class="value">{{ priceFormat(order.discount) }}</span>
              </li>
              <li
                v-if="
                  settings.shipping_cost != 'area_base' || $route.name != 'cart'
                "
              >
                <span class="label">{{ lang.shipping_cost }}</span
                ><span class="value">{{
                  priceFormat(order.shipping_cost)
                }}</span>
              </li>

              <li v-if="settings.coupon_system == 1">
                <span class="label">{{ lang.coupon_discount }}</span
                ><span class="value">{{
                  priceFormat(order.coupon_discount)
                }}</span>
              </li>

              <!-- order base -->
              <li
                v-if="
                  settings.tax_type == 'after_tax' &&
                  settings.vat_and_tax_type == 'order_base'
                "
              >
                <span class="label">{{ lang.total }}</span>
                <div class="value">
                  <p class="font_weight_400">
                    <span>{{
                      priceFormat(
                        parseFloat(order.sub_total) +
                          parseFloat(order.shipping_cost) -
                          (parseFloat(order.coupon_discount) +
                            parseFloat(order.discount))
                      )
                    }}</span>
                  </p>
                  <p class="font_weight_400">
                    {{ lang.tax }}
                    <span>{{ priceFormat(order.total_tax) }}</span>
                  </p>
                  <p class="grand_total_style">
                    {{ lang.grand_total }}
                    <span>{{ priceFormat(order.total_payable) }}</span>
                  </p>
                </div>
              </li>

              <li v-else>
                <span class="label">{{ lang.total }}</span>
                <div class="value">
                  <p>
                    <span>{{ priceFormat(order.total_payable) }}</span>
                  </p>
                </div>
              </li>
            </ul>

            <div class="cart-btns">
              <loading_button
                v-if="loading"
                :class_name="'btn btn-secondary'"
              ></loading_button>
              <a
                href="javascript:void(0)"
                v-else
                class="btn btn-secondary"
                @click="download(order.id, order.code)"
                >{{ lang.download }} {{ lang.invoice }}</a
              >
              <router-link to="/products" class="btn btn-primary">{{
                lang.continue_shopping
              }}</router-link>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- with shimmer -->
    <!-- shimmer -->
    <div class="orderConfirm" v-else-if="shimmer" style="margin: 20px 0px">
      <shimmer :height="50" style="margin-bottom: 20px"></shimmer>
      <shimmer :height="155" style="margin-bottom: 20px"></shimmer>
      <shimmer :height="155" style="margin-bottom: 20px"></shimmer>
      <shimmer :height="155" style="margin-bottom: 20px"></shimmer>
      <shimmer :height="155" style="margin-bottom: 20px"></shimmer>
    </div>
  </div>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
export default {
  components: {
    Shimmer,
  },
  data() {
    return {
      orders: [],
      is_shimmer: false,
      loading: false,
    };
  },
  mounted() {
    this.getInvoices();
  },

  computed: {
    shimmer() {
      return this.$store.state.module.shimmer;
    },
  },
  methods: {
    getInvoices() {
      this.$progress.start();
      let url = this.getUrl("user/get-invoices/" + this.$route.params.trx_id);
      axios
        .get(url)
        .then((response) => {
          this.is_shimmer = true;
          if (response.data.error) {
            toastr.error(response.data.error, this.lang.Error + " !!");
          } else {
            this.$progress.finish();
            if (!response.data.guest) {
              this.$store.dispatch("user", response.data.user);
            }
            this.$store.dispatch("compareList", response.data.compare_list);
            this.$store.dispatch("wishlists", response.data.wishlists);
            this.$store.dispatch("carts", []);

            let orders = response.data.orders;
            this.orders = orders;
            if (orders) {
              for (let i = 0; i < orders.length; i++) {
                this.payment_form.sub_total += orders[i].total_amount;
                this.payment_form.discount_offer += orders[i].discount;
                this.payment_form.shipping_tax += orders[i].shipping_cost;
                this.payment_form.tax += orders[i].total_tax;
                if (this.settings.coupon_system == 1) {
                  this.payment_form.coupon_discount +=
                    orders[i].coupon_discount;
                }
                this.trx_id = orders[i].trx_id;
              }

              if (orders[0].is_mailed == 0) {
                this.sendMail();
              }

              this.payment_form.total =
                this.payment_form.sub_total +
                this.payment_form.tax +
                this.payment_form.shipping_tax -
                (this.payment_form.discount_offer +
                  this.payment_form.coupon_discount);
            }
          }
        })
        .catch((error) => {
          this.$progress.finish();
        });
    },
    sendMail() {
      let url = this.getUrl("user/mail-order/" + this.trx_id);
      axios.get(url).then((response) => {
        // this.sendMailSeller();
      });
    },
    sendMailSeller() {
      let url = this.getUrl("user/mail-order-seller/" + this.trx_id);
      axios.get(url).then((response) => {});
    },
    download(id, code) {
      this.loading = true;
      axios
        .get(this.getUrl("user/invoice/download/" + id), {
          responseType: "arraybuffer",
        })
        .then((response) => {
          this.loading = false;
          1;
          if (response.data.error) {
            toastr.error(response.data.error, this.lang.Error + " !!");
          } else {
            let blob = new Blob([response.data], { type: "application/pdf" });
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = code + ".pdf";
            link.click();
          }
        })
        .catch((error) => {
          this.loading = false;
          toastr.error(error.response.statusText, this.lang.Error + " !!");
        });
    },
  },
};
</script>

<style scoped>
.orderConfirm.mt-3.mb-3 {
  margin: 30px 0px !important;
}

i.ri-check-line {
  color: #fff;
}
</style>
