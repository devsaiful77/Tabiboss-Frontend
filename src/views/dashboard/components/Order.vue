<template lang="html">
  <div>
    <!-- Product History Table Start -->
    <!-- looping -->
    <div class="cart-form mt-0">
      <div class="table-responsive">
        <!-- v-else -->
        <table class="table-v2">
          <thead>
            <tr>
              <th scope="col">{{ lang.product }}</th>
              <th scope="col">{{ lang.date }}</th>
              <th scope="col">{{ lang.delivery_status }}</th>
              <th scope="col">{{ lang.pay_status }}</th>
              <th scope="col">{{ lang.total }}</th>
              <th scope="col">{{ lang.action }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(orderDetails, i) in orders"
              :key="i"
            >
              <template v-if="orderDetails.is_deleted == 0">
                <!-- product -->
                <td class="cart-pd-thumb">
                  <div class="product-card--inline">
                    <a href="#" class="product-image">
                      <img
                        :src="orderDetails.image"
                        :alt="orderDetails.product_name"
                        class="img-fluid"
                      />
                    </a>
                    <div class="product-content text-start">
                      <div class="product-id">{{ orderDetails.code }}</div>
                      <div class="product-title text-start">
                        {{ orderDetails.product_name }}
                      </div>
                      <div class="product-price" v-if="orderDetails.variation">
                        {{ orderDetails.variation }}
                      </div>
                      <div class="product-price" v-else>
                        {{ orderDetails.sku }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- order date -->
                <td class="cart-pd-date text-nowrap" data-title="date">
                  {{ orderDetails.order_date }}
                </td>

                <!-- delivery status -->
                <td class="cart-pd-status text-nowrap" data-title="Status">
                  <div
                    class="badges badges-"
                    :class="
                      orderDetails.delivery_status == 'pending'
                        ? 'warning'
                        : orderDetails.delivery_status == 'delivered'
                        ? 'success'
                        : orderDetails.delivery_status == 'canceled'
                        ? 'danger'
                        : 'info'
                    "
                  >
                    <span>
                      {{
                        orderDetails.delivery_status == "pending"
                          ? lang.Pending
                          : orderDetails.delivery_status == "delivered"
                          ? lang.delivered
                          : orderDetails.delivery_status == "canceled"
                          ? lang.Canceled
                          : orderDetails.delivery_status == "confirmed" ||
                            orderDetails.delivery_status == "confirm"
                          ? lang.Confirmed
                          : orderDetails.delivery_status == "picked_up"
                          ? lang.picked_up
                          : orderDetails.delivery_status == "on_the_way"
                          ? lang.on_the_way
                          : ""
                      }}
                    </span>
                  </div>
                </td>

                <!-- payment status -->
                <td class="cart-pd-price text-primary" data-title="Price">
                  <div
                    :class="
                      orderDetails.payment_status == 'paid'
                        ? 'text-primary'
                        : 'text-danger'
                    "
                  >
                    {{
                      orderDetails.payment_status == "paid"
                        ? lang.Paid
                        : orderDetails.payment_status == "unpaid"
                        ? lang.Unpaid
                        : lang.refunded_to_wallet
                    }}
                  </div>

                  <!-- {{ item.bill }} -->
                </td>

                <td>
                  <span>{{ priceFormat(orderDetails.total_payable) }}</span>
                </td>

                <!-- <td>
                  <div class="dropdown">
                    <button
                      class="dropdown-toggle btn-primary"
                      type="button"
                      id=""
                      @click="orderDropdown(orderDetails.order_id)"
                      :class="
                        orderDetails.order_id == order_dropdown ? 'show' : ''
                      "
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {{ lang.Actions }}
                    </button>
                    <ul
                      class="dropdown-menu text-capitalize"
                      :class="
                        orderDetails.order_id == order_dropdown ? 'show' : ''
                      "
                    >
                      <li v-if="orderDetails.delivery_status == 'pending'">
                        <a
                          href="javascript:void(0)"
                          @click="cancelOrder(orderDetails.order_id, i)"
                          >{{ lang.cancel }}</a
                        >
                      </li>
                      <li>
                        <router-link
                          v-if="
                            orderDetails.payment_status == 'unpaid' &&
                            orderDetails.payment_type != 'cash_on_delivery' &&
                            orderDetails.delivery_status != 'cancelled' &&
                            orderDetails.delivery_status != 'offline_method'
                          "
                          :to="{
                            name: 'payment',
                            params: { code: orderDetails.code },
                          }"
                          >{{ lang.pay_now }}
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          :to="{
                            name: 'get.invoice',
                            params: { orderCode: orderDetails.code },
                          }"
                          >{{ lang.view }}
                        </router-link>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          @click="
                            download(orderDetails.order_id, orderDetails.code)
                          "
                          >{{ lang.download }}</a
                        >
                      </li>
                      <li
                        v-if="
                          orderDetails.product_file_id &&
                          orderDetails.payment_status == 'paid'
                        "
                      >
                        <a
                          v-for="(url, index) in orderUrls"
                          :key="index"
                          v-if="index == orderDetails.id"
                          :href="url"
                          >{{ lang.download_file }}</a
                        >
                      </li>
                      <li
                        v-if="
                          orderDetails.delivery_status == 'delivered' ||
                          orderDetails.delivery_status == 'canceled'
                        "
                      >
                        <a
                          href="javascript:void(0)"
                          @click="removeOrder(orderDetails.order_id, i)"
                          >{{ lang.delete }}</a
                        >
                      </li>
                    </ul>
                  </div>
                </td> -->

                <td class="cart-pd-action" data-title="Action">
                  <div class="dropdown defaultDropdown">
                    <button
                      class="dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {{ lang.Actions }}
                    </button>
                    <ul class="dropdown-menu">
                      <li v-if="orderDetails.delivery_status == 'pending'">
                        <a
                          class="dropdown-item"
                          href="javascript:void(0)"
                          @click="cancelOrder(orderDetails.order_id, i)"
                          >{{ lang.cancel }}</a
                        >
                      </li>
                      <li>
                        <router-link
                          class="dropdown-item"
                          v-if="
                            orderDetails.payment_status == 'unpaid' &&
                            orderDetails.payment_type != 'cash_on_delivery' &&
                            orderDetails.delivery_status != 'cancelled' &&
                            orderDetails.delivery_status != 'offline_method'
                          "
                          :to="{
                            name: 'payment',
                            params: { code: orderDetails.code },
                          }"
                          >{{ lang.pay_now }}
                        </router-link>
                      </li>
                      <li>
                        <router-link
                          class="dropdown-item"
                          :to="{
                            name: 'get.invoice',
                            params: { orderCode: orderDetails.code },
                          }"
                          >{{ lang.view }}
                        </router-link>
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          href="javascript:void(0)"
                          @click="
                            download(orderDetails.order_id, orderDetails.code)
                          "
                          >{{ lang.download }}</a
                        >
                      </li>
                      <li
                        v-if="
                          orderDetails.product_file_id &&
                          orderDetails.payment_status == 'paid'
                        "
                      >
                        <a
                          class="dropdown-item"
                          v-for="(url, index) in orderUrls"
                          :key="index"
                          v-if="index == orderDetails.id"
                          :href="url"
                          >{{ lang.download_file }}</a
                        >
                      </li>
                      <li
                        v-if="
                          orderDetails.delivery_status == 'delivered' ||
                          orderDetails.delivery_status == 'canceled'
                        "
                      >
                        <a
                          class="dropdown-item"
                          href="javascript:void(0)"
                          @click="removeOrder(orderDetails.order_id, i)"
                          >{{ lang.delete }}</a
                        >
                      </li>
                    </ul>
                  </div>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Product History Table End -->
  </div>
</template>

<script>
export default {
  props: ["orders", "user_dashboard"],
  data() {
    return {
      url: "",
      order_dropdown: "",
      page: 2,
    };
  },
  mounted() {},
  computed: {
    orderUrls() {
      return this.$store.getters.getOrderUrl;
    },
  },
  methods: {
    removeOrder(order_id, i) {
      let url = this.getUrl("user/remove-order/" + order_id);
      this.$progress.start();
      axios.get(url).then((response) => {
        if (response.data.error) {
          this.$toast.error(response.data.error, this.lang.Error + " !!");
        } else {
          this.$toast.success(response.data.success, this.lang.Success + " !!");
          this.show_load_more = this.orders.next_page_url;
          this.page--;
          this.orders.splice(i, 1);
        }
        this.order_dropdown = "";
        this.$progress.finish();
      });
    },
    cancelOrder(order_id, i) {
      let url = this.getUrl("user/cancel-order/" + order_id);
      if (confirm("Are you sure?")) {
        this.$progress.start();
        axios.get(url).then((response) => {
          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            this.orders[i].delivery_status = "canceled";
            this.orders[i].payment_status =
              this.orders[i].payment_status == "unpaid"
                ? "unpaid"
                : this.lang.refunded_to_wallet;
            this.$store.dispatch("user", response.data.user);
          }
          this.order_dropdown = "";
          this.$progress.finish();
        });
      }
    },
    orderDropdown(id) {
      if (this.order_dropdown == "") {
        this.order_dropdown = id;
      } else {
        this.order_dropdown = "";
      }
    },
    download(id, code) {
      axios
        .get(this.getUrl("user/invoice/download/" + id), {
          responseType: "arraybuffer",
        })
        .then((response) => {
          let blob = new Blob([response.data], { type: "application/pdf" });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = code + ".pdf";
          link.click();
          this.order_dropdown = "";
        });
    },
  },
};
</script>
