<template lang="html">
  <div class="col-lg-10 m-auto mt-10 mb-10">
    <!-- Order Confirm -->
    <div class="orderConfirm" v-if="is_shimmer">
      <template v-if="order">
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
              {{ lang.name
              }}<span>{{ order.user.full_name ?? "Unknown" }}</span>
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

              <div class="title" v-if="addons.includes('refund')">
                {{ lang.refund }}
              </div>
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

                  <p>
                    {{ lang.total_amount }} :
                    {{ priceFormat(order_detail.total_amount) }}
                  </p>
                </span>

                <!-- Refund -->
                <span class="value" v-if="addons.includes('refund')">
                  <span
                    v-if="order_detail.refund"
                    :class="
                      order_detail.refund.status == 'pending'
                        ? 'text-warning'
                        : order_detail.refund.status == 'rejected'
                        ? 'text-danger'
                        : 'text-success'
                    "
                  >
                    <a
                      href="javascript:void(0)"
                      class="text-danger"
                      v-if="order_detail.refund.status == 'rejected'"
                      @click="rejectedModal(order_detail, index)"
                    >
                      {{ order_detail.refund.status }}
                    </a>
                    <span v-else> {{ order_detail.refund.status }} </span>
                  </span>
                  <a
                    href="javascript:void(0)"
                    v-else-if="
                      order_detail.is_refundable &&
                      order.delivery_status == 'delivered' &&
                      order.delivered_days < settings.refund_request_time
                    "
                    @click="refundModal(order_detail, index)"
                    ><span class="mdi mdi-cash-refund"></span
                  ></a>
                  <span v-else>N/A</span>
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
              <router-link to="/products" class="btn btn-primary"
                >{{ lang.continue_shopping }}</router-link
              >
            </div>
          </div>
        </div>

        <div class="product_modal">
          <div class="modal fade" id="refund_modal" tabindex="-1" aria-labelledby="exampleModalLabel"
               aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">{{ lang.send_refund_request }}</h5>
                  <button type="button" class="close modal_close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form @submit.prevent="refundSubmit()">
                  <div class="modal-body text-left">
                    <div class="form-group">
                      <label for="order">{{ lang.product }}</label>
                      <input type="hidden" v-model="form.order" class="form-control" disabled/>
                      <input type="hidden" v-model="form.order_detail_id" class="form-control" disabled/>
                      <input type="text" v-model="form.product_name" class="form-control"
                             :class="{ error_border: errors.order_id }" disabled id="order"/>
                      <span class="validation_error" v-if="errors.order_detail_id">{{
                          errors.order_detail_id[0]
                        }}</span>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="order_id">{{ lang.total_paid }}</label>
                          <input
                              type="text"
                              v-model="form.total_amount"
                              class="form-control"
                              :class="{ error_border: errors.total_amount }"
                              disabled
                              id="order_id"
                          />
                        </div>
                        <span class="validation_error" v-if="errors.total_amount">{{ errors.total_amount[0] }}</span>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="shipping_cost">{{ lang.shipping_cost }}</label>
                          <input
                              type="text"
                              v-model="form.shipping_cost"
                              class="form-control"
                              :class="{ error_border: errors.shipping_cost }"
                              disabled
                              id="shipping_cost"
                          />
                        </div>
                        <span class="validation_error" v-if="errors.shipping_cost">{{ errors.shipping_cost[0] }}</span>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="refundable_amount">{{ lang.refundable_amount }}</label>
                          <input
                              type="text"
                              v-model="form.refundable_amount"
                              class="form-control"
                              :class="{ error_border: errors.refundable_amount }"
                              disabled
                              id="refundable_amount"
                          />
                        </div>
                      </div>
                      <span class="validation_error" v-if="errors.refundable_amount">{{
                          errors.refundable_amount[0]
                        }}</span>
                    </div>
                    <div class="form-group">
                      <label for="refund_reason" class="col-form-label">{{ lang.refund_reason }}</label>
                      <textarea class="form-control" v-model="form.refund_reason"
                                :class="{ error_border: errors.refund_reason }" id="refund_reason"></textarea>
                    </div>
                    <span class="validation_error" v-if="errors.refund_reason">{{ errors.refund_reason[0] }}</span>

                    <div class="modal-footer">
                      <button type="submit" class="btn btn-primary" v-show="!loading">
                        {{ lang.send_request }}
                      </button>
                      <loading_button v-show="loading" :class_name="'btn btn-primary'"></loading_button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Refund Modal -->
          <div class="modal fade" id="rejected_modal" tabindex="-1" aria-labelledby="exampleModalLabel"
               aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">{{ lang.refund_rejected }}</h5>
                  <button type="button" class="close modal_close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body text-left">
                  <div class="form-group">
                    <label for="product" class="col-form-label">{{ lang.product }}</label>
                    <input type="text" v-model="product_name_show" class="form-control" disabled id="product"/>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="total_paid" class="col-form-label">{{ lang.total_paid }}</label>
                        <input type="text" v-model="total_amount_show" class="form-control" disabled id="total_paid"/>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="shipping_cost_show" class="col-form-label">{{ lang.shipping_cost }}</label>
                        <input type="text" v-model="shipping_cost_show" class="form-control" disabled
                               id="shipping_cost_show"/>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="refundable_amount_show" class="col-form-label">{{ lang.refundable_amount }}</label>
                        <input type="text" v-model="refundable_amount_show" class="form-control" disabled
                               id="refundable_amount_show"/>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="refund_reason_show" class="col-form-label">{{ lang.refund_reason }}</label>
                    <textarea class="form-control" v-model="refund_reason_show" disabled
                              id="refund_reason_show"></textarea>
                  </div>
                  <div class="form-group" v-if="reject_reason_show">
                    <label for="reject_reason" class="col-form-label">{{ lang.reject_reason }}</label>
                    <textarea class="form-control" v-model="reject_reason_show" disabled id="reject_reason"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </template>
    </div>

    <!-- with shimmer -->
    <div v-else-if="shimmer">
      <div class="orderConfirm-wrapper text-center">
        <shimmer
          class="mb-3"
          v-for="(order, index) in 3"
          :key="index"
          :height="20"
        ></shimmer>
      </div>

      <div class="border radius py-30 px-30 mt-60">
        <div class="order-details">
          <div class="order-info">
            <shimmer :height="5"></shimmer>
          </div>
        </div>
      </div>

      <div class="cart-order v2 mt-40">
        <div
          class="cart-header d-flex align-items-center justify-content-between"
        >
          <div class="table">
            <div class="step-content">
              <div class="table-responsive">
                <shimmer :height="50"></shimmer>
              </div>
              <div class="account-table">
                <div class="table-responsive">
                  <shimmer :height="155"></shimmer>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 offset-md-8">
              <shimmer :height="288"></shimmer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import { setToast } from "@/utils/toast";
export default {
  mounted() {
    this.loadOrder();
  },
  components: {
    Shimmer,
  },
  computed: {
    order() {
      return this.$store.getters.getInvoices;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
  },
  props: ["orderCode"],
  data() {
    return {
      code: this.orderCode,
      current_status: 0,
      status: ["pending", "confirm", "picked_up", "on_the_way", "delivered"],
      showModal: false,
      modal_height: 600,
      modal_width: 990,
      active_modal: "",
      product_name_show: "",
      refund_reason_show: "",
      total_amount_show: "",
      shipping_cost_show: "",
      refundable_amount_show: "",
      reject_reason_show: "",
      loading: false,
      current: false,
      is_shimmer: false,
      form: {
        order: "",
        order_detail_id: "",
        product_name: "",
        total_amount: "",
        shipping_cost: "",
        refundable_amount: "",
        refund_reason: "",
      },
    };
  },
  methods: {
    loadOrder() {
      let url = this.getUrl("user/invoice/" + this.code);

      this.$progress.start();
      axios.get(url, this.code).then((response) => {
        this.is_shimmer = true;
        if (response.data.error) {
        //   this.$toast.error(response.data.error, this.lang.Error + " !!");
          setToast("error",response.data.error, this.lang.Error + " !!")
          this.$router.push('/')
        } else {
          this.$store.commit("getInvoices", response.data.order);
          let index = this.status.indexOf(this.order.delivery_status);
          if (index > -1) {
            this.current_status = index;
          }
          this.$progress.finish();
        }
      });
    },
    refundModal(order_detail, index) {
      $("#refund_modal").modal("show");
      this.form.order = order_detail.order_id;
      this.form.order_detail_id = order_detail.id;
      this.form.product_name = order_detail.product_name;
      this.form.total_amount = this.priceFormat(
        order_detail.price * order_detail.quantity +
          order_detail.tax +
          order_detail.shipping_cost.total_cost -
          (order_detail.discount + order_detail.coupon_discount.discount)
      );
      this.form.shipping_cost = this.priceFormat(
        order_detail.shipping_cost.total_cost
      );
      if (this.settings.refund_with_shipping_cost) {
        this.form.refundable_amount = this.priceFormat(
          order_detail.price + order_detail.shipping_cost.total_cost
        );
      } else {
        this.form.refundable_amount = this.priceFormat(
          order_detail.price * order_detail.quantity +
            order_detail.tax -
            (order_detail.discount + order_detail.coupon_discount.discount)
        );
      }

      this.order_dropdown = "";
      this.current = index;
    },
    refundSubmit() {
      let url = this.getUrl("refund-request");
      this.loading = true;

      axios
        .post(url, this.form)
        .then((response) => {
          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");

            if (response.data.order_detail) {
              this.order.order_details[this.current] =
                response.data.order_detail;
            }
            this.loading = false;
            this.$modal.hide("refund_modal");

            this.errors = [];
          } else {
            this.$toast.success(
              response.data.success,
              this.lang.Success + " !!"
            );
            this.loading = false;
            // $("#refund_modal").modal("hide");

            this.errors = [];

            this.form.order = "";
            this.form.order_detail_id = "";
            this.form.product_name = "";
            this.form.total_amount = "";
            this.form.shipping_cost = "";
            this.form.refundable_amount = "";
            this.form.refund_reason = "";

            this.order.order_details[this.current] = response.data.order_detail;
          }

          this.loading = false;
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
          this.loading = false;
        });
    },
    rejectedModal(order_detail, index) {
      $("#rejected_modal").modal("show");

      this.product_name_show = order_detail.product_name;
      this.refund_reason_show = order_detail.refund.remark;
      this.total_amount_show = this.priceFormat(
        order_detail.refund.total_amount
      );
      this.shipping_cost_show = this.priceFormat(
        order_detail.refund.shipping_cost
      );
      this.refundable_amount_show = this.priceFormat(
        order_detail.refund.refund_amount
      );
      this.reject_reason_show = order_detail.refund.reject_reason;
    },
    download(id, code) {
      this.loading = true;
      axios
        .get(this.getUrl("user/invoice/download/" + id), {
          responseType: "arraybuffer",
        })
        .then((response) => {
          this.loading = false;
          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
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
          this.$toast.error(error.response.statusText, this.lang.Error + " !!");
        });
    },
  },
};
</script>
