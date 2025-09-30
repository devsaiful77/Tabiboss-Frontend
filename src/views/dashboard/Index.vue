<template lang="html">
  <!-- Order Wrapper Start -->
  <div class="orderBox-wrapper">
    <h4 class="mb-3">{{ lang.dashboard }}</h4>
    <!-- report counting -->
    <div class="row">
      <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4">
        <router-link :to="{ name: 'order.history' }">
          <div class="orderBox">
            <div class="icon"><CubeSVG /></div>
            <div class="content">
              <h4 class="title">{{ lang.total_order }}</h4>
              <span class="count">{{
                profileOrders ? profileOrders.total : 0
              }}</span>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4">
        <router-link :to="{ name: 'cart' }">
          <div class="orderBox">
            <div class="icon"><CubeSVG /></div>
            <div class="content">
              <h4 class="title">{{ lang.product_cart }}</h4>
              <span class="count"> {{ carts ? carts.length : 0 }}</span>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4">
        <router-link :to="{ name: 'wishlist' }">
          <div class="orderBox">
            <div class="icon"><CubeSVG /></div>
            <div class="content">
              <h4 class="title">{{ lang.product_you_love }}</h4>
              <span class="count"> {{ wishlists }}</span>
            </div>
          </div>
        </router-link>
      </div>

      <div
        class="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4"
        v-if="settings.wallet_system == 1"
      >
        <router-link :to="{ name: 'wallet.history' }">
          <div class="orderBox">
            <div class="icon"><CubeSVG /></div>
            <div class="content">
              <h4 class="title">{{ lang.wallet_balance }}</h4>
              <span class="count"> {{ priceFormat(authUser.balance) }} </span>
            </div>
          </div>
        </router-link>
      </div>

      <div
        class="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4"
        v-if="settings.wallet_system == 1"
      >
        <router-link :to="{ name: 'wallet.history' }">
          <div class="orderBox">
            <div class="icon"><CubeSVG /></div>
            <div class="content">
              <h4 class="title">{{ lang.last_recharge }}</h4>
              <span class="count">
                {{ priceFormat(authUser.last_recharge) }}
              </span>
            </div>
          </div>
        </router-link>
      </div>

      <!-- need modal -->
      <div
        class="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4"
        v-if="settings.wallet_system == 1"
      >
        <a
          href="javascript:void(0)"
          data-bs-toggle="modal"
          data-bs-target="#recharge_wallet"
          class="walletHistory highlight"
        >
          <h4 class="title">{{ lang.recharge_wallet }}</h4>
          <div class="addIcon">
            <WalletSVG />
          </div>
        </a>
      </div>

      <div
        class="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4"
        v-if="addons.includes('reward')"
      >
        <router-link :to="{ name: 'reward.history' }">
          <div class="orderBox">
            <div class="icon"><CubeSVG /></div>
            <div class="content">
              <h4 class="title">{{ lang.total_rewards }}</h4>
              <span class="count">
                {{ totalReward ? totalReward.reward_sum : 0 }}
              </span>
            </div>
          </div>
        </router-link>
      </div>

      <div
        class="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4"
        v-if="addons.includes('reward')"
      >
        <router-link :to="{ name: 'reward.history' }">
          <div class="orderBox">
            <div class="icon"><CubeSVG /></div>
            <div class="content">
              <h4 class="title">{{ lang.current_rewards }}</h4>
              <span class="count">
                {{ totalReward ? totalReward.rewards : 0 }}
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- shipping address -->
    <div class="address-wrapper mt-20" v-if="authUser">
      <div class="addressWith-title">
        <div class="mainHeader">
          <h4 class="mainTitle">{{ lang.default_shipping }}</h4>
        </div>
        <div class="addressItem" v-if="default_shipping">
          <ul class="addressList">
            <li>
              <span>{{ lang.name }}</span
              >: {{ default_shipping.name }}
            </li>
            <li>
              <span>{{ lang.email }}</span
              >: {{ default_shipping.email }}
            </li>
            <li>
              <span>{{ lang.phone }}</span
              >: {{ default_shipping.phone_no }}
            </li>
            <li>
              <span>{{ lang.street_address }}</span
              >: {{ default_shipping.default_shipping }}
            </li>
            <li>
              <span>{{ lang.city }}</span
              >: {{ default_shipping.city }}
            </li>
            <li>
              <span>{{ lang.country }}</span
              >: {{ default_shipping.country }}
            </li>
          </ul>
        </div>
      </div>

      <div class="addressWith-title">
        <div class="mainHeader">
          <h4 class="mainTitle">{{ lang.default_billing }}</h4>
        </div>
        <div class="addressItem" v-if="default_billing">
          <ul class="addressList">
            <li>
              <span>{{ lang.name }}</span
              >: {{ default_billing.name }}
            </li>
            <li>
              <span>{{ lang.email }}</span
              >: {{ default_billing.email }}
            </li>
            <li>
              <span>{{ lang.phone }}</span
              >: {{ default_billing.phone_no }}
            </li>
            <li>
              <span>{{ lang.street_address }}</span
              >: {{ default_billing.default_shipping }}
            </li>
            <li>
              <span>{{ lang.city }}</span
              >: {{ default_billing.city }}
            </li>
            <li>
              <span>{{ lang.country }}</span
              >: {{ default_billing.country }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- shipping address -->

    <!-- Recharge Wallet Modal -->
    <div
      class="modal fade customModal RechargeWalletModal"
      id="recharge_wallet"
      tabindex="-1"
      aria-labelledby="recharge_walletLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div class="title">{{ lang.wallet_recharge }}</div>
            <button
              type="button"
              class="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="ri-close-large-fill"></i>
            </button>
          </div>
          <div class="modal-body p-0">
            <div class="wallet-wrapper text-center">
              <div class="amount-wrapper">
                <input
                  type="text"
                  class="form-control"
                  id="amount"
                  @input="removeData"
                  v-model="form.total"
                  :placeholder="lang.enter_amount"
                />

                <!-- payment option -->
                <ul
                  class="payment-select"
                  :class="{ disable_section: form.total == 0 }"
                >
                  <!-- paypal -->
                  <li v-if="settings.is_paypal_activated == 1">
                    <label
                      :class="
                        payment_form.payment_type == 'paypal' ? 'selected' : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="paypal"
                        @change="razorPayRemove"
                        value="paypal"
                        v-model="payment_form.payment_type"
                        name="radio"
                      />
                      <img
                        :src="getUrl('images/payment-method/paypal.svg')"
                        :alt="payment_form.payment_type"
                      />
                    </label>
                  </li>

                  <!-- stripe -->
                  <li v-if="settings.is_stripe_activated == 1">
                    <label
                      :class="
                        payment_form.payment_type == 'stripe' ? 'selected' : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="stripe"
                        @change="razorPayRemove"
                        value="stripe"
                        v-model="payment_form.payment_type"
                        name="radio"
                      />
                      <img
                        :src="getUrl('images/payment-method/stripe.svg')"
                        :alt="payment_form.payment_type"
                      />
                    </label>
                  </li>

                  <!-- ssl commerce -->
                  <li
                    v-if="
                      settings.is_sslcommerz_activated == 1 &&
                      checkCurrency('BDT')
                    "
                  >
                    <label
                      :class="
                        payment_form.payment_type == 'ssl_commerze'
                          ? 'selected'
                          : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="ssl_commerze"
                        @change="razorPayRemove"
                        value="ssl_commerze"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="
                          getUrl('public/images/payment-method/sslcommerze.svg')
                        "
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- paytom -->
                  <li
                    v-if="
                      settings.is_paytm_activated == 1 && checkCurrency('INR')
                    "
                  >
                    <label
                      :class="
                        payment_form.payment_type == 'paytm' ? 'selected' : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="paytm"
                        @change="razorPayRemove"
                        value="paytm"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="getUrl('images/payment-method/paytm.svg')"
                        :alt="payment_form.payment_type"
                      />
                    </label>
                  </li>

                  <!-- razor pay -->
                  <li
                    v-if="
                      settings.is_razorpay_activated == 1 &&
                      checkCurrency('INR')
                    "
                  >
                    <label
                      :class="
                        payment_form.payment_type == 'razor_pay'
                          ? 'selected'
                          : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="razor_pay"
                        @change="razorPayRemove"
                        value="razor_pay"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="
                          getUrl('public/images/payment-method/razorpay.svg')
                        "
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- jazz cash -->
                  <li
                    v-if="
                      settings.is_jazz_cash_activated == 1 &&
                      checkCurrency('PKR')
                    "
                  >
                    <label
                      :class="
                        payment_form.payment_type == 'jazz_cash'
                          ? 'selected'
                          : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="jazz_cash"
                        @change="razorPayRemove"
                        value="jazz_cash"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="
                          getUrl('public/images/payment-method/jazzCash.svg')
                        "
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- paystack -->
                  <li
                    v-if="
                      settings.is_paystack_activated == 1 &&
                      checkCurrency('NGN')
                    "
                  >
                    <label
                      :class="
                        payment_form.payment_type == 'paystack'
                          ? 'selected'
                          : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="paystack"
                        @change="razorPayRemove"
                        value="paystack"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="
                          getUrl('public/images/payment-method/paystack.svg')
                        "
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- flutter_wave -->
                  <li
                    v-if="
                      settings.is_flutterwave_activated == 1 &&
                      checkCurrency('NGN')
                    "
                  >
                    <label
                      :class="
                        payment_form.payment_type == 'flutter_wave'
                          ? 'selected'
                          : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="flutter_wave"
                        @change="razorPayRemove"
                        value="flutter_wave"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="getUrl('images/payment-method/fw.svg')"
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- mollie -->
                  <li v-if="settings.is_mollie_activated == 1">
                    <label
                      :class="
                        payment_form.payment_type == 'mollie' ? 'selected' : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="mollie"
                        @change="razorPayRemove"
                        value="mollie"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="getUrl('images/payment-method/mollie.svg')"
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- mercadopago -->
                  <li
                    v-if="
                      settings.is_mercado_pago_activated == 1 &&
                      checkCurrency('MXN')
                    "
                  >
                    <label
                      :class="
                        payment_form.payment_type == 'mercadopago'
                          ? 'selected'
                          : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="mercadopago"
                        @change="razorPayRemove"
                        value="mercadopago"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="getUrl('images/payment-method/mollie.svg')"
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- bkash -->
                  <li
                    v-if="settings.is_bkash_activated && checkCurrency('BDT')"
                  >
                    <label
                      :class="
                        payment_form.payment_type == 'bkash' ? 'selected' : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="bkash"
                        @change="razorPayRemove"
                        value="bkash"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="getUrl('images/payment-method/bKash.svg')"
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- google_pay -->
                  <li v-if="settings.is_google_pay_activated">
                    <label
                      :class="
                        payment_form.payment_type == 'google_pay'
                          ? 'selected'
                          : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="google_pay"
                        @change="razorPayRemove"
                        value="google_pay"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="
                          getUrl('public/images/payment-method/google_pay.svg')
                        "
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- Nagad -->
                  <li
                    v-if="settings.is_nagad_activated && checkCurrency('BDT')"
                  >
                    <label
                      :class="
                        payment_form.payment_type == 'nagad' ? 'selected' : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="nagad"
                        @change="razorPayRemove"
                        value="nagad"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="getUrl('images/payment-method/nagad.svg')"
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- Nagad -->
                  <li
                    v-if="settings.is_amarpay_activated && checkCurrency('BDT')"
                  >
                    <label
                      :class="
                        payment_form.payment_type == 'amarpay' ? 'selected' : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="amarpay"
                        @change="razorPayRemove"
                        value="amarpay"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="
                          getUrl('public/images/payment-method/amarpay.svg')
                        "
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- skrill -->
                  <li v-if="settings.is_skrill_activated">
                    <label
                      :class="
                        payment_form.payment_type == 'skrill' ? 'selected' : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="skrill"
                        @change="razorPayRemove"
                        value="skrill"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="getUrl('images/payment-method/skrill.svg')"
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- iyzico -->
                  <li v-if="settings.is_iyzico_activated">
                    <label
                      :class="
                        payment_form.payment_type == 'iyzico' ? 'selected' : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="iyzico"
                        @change="razorPayRemove"
                        value="iyzico"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="getUrl('images/payment-method/iyzico.svg')"
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- hitpay -->
                  <li
                    v-if="
                      settings.is_hitpay_activated &&
                      addons.includes('hitpay_payment_gateway')
                    "
                  >
                    <label
                      :class="
                        payment_form.payment_type == 'hitpay' ? 'selected' : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="hitpay"
                        @change="razorPayRemove"
                        value="hitpay"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="getUrl('images/payment-method/hitpay.svg')"
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- hitpay -->
                  <li
                    v-if="
                      settings.is_mid_trans_activated && checkCurrency('IDR')
                    "
                  >
                    <label
                      :class="
                        payment_form.payment_type == 'mid_trans'
                          ? 'selected'
                          : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="mid_trans"
                        @change="razorPayRemove"
                        value="mid_trans"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="
                          getUrl('public/images/payment-method/midtrans.svg')
                        "
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- hitpay -->
                  <li v-if="settings.is_telr_activated">
                    <label
                      :class="
                        payment_form.payment_type == 'telr' ? 'selected' : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="telr"
                        @change="razorPayRemove"
                        value="telr"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="getUrl('images/payment-method/telr.svg')"
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- kkiapay -->
                  <li v-if="settings.is_kkiapay_activated">
                    <label
                      :class="
                        payment_form.payment_type == 'kkiapay' ? 'selected' : ''
                      "
                    >
                      <input
                        type="radio"
                        class="d-none"
                        id="kkiapay"
                        @change="razorPayRemove"
                        value="kkiapay"
                        v-model="payment_form.payment_type"
                      />
                      <img
                        :src="
                          getUrl('public/images/payment-method/kkiapay.svg')
                        "
                        :alt="payment_form.payment_type"
                        width="90"
                      />
                    </label>
                  </li>

                  <!-- offline payment -->
                  <template v-if="addons.includes('offline_payment')">
                    <li
                      v-for="(offline, index) in offline_methods"
                      :key="index"
                    >
                      <label
                        :class="
                          payment_form.payment_type == 'offline_method'
                            ? 'selected'
                            : ''
                        "
                      >
                        <input
                          type="radio"
                          class="d-none"
                          :id="'offline' + offline.id"
                          @change="offlineCheck(offline)"
                          value="offline_method"
                          v-model="payment_form.payment_type"
                        />
                        <img
                          loading="lazy"
                          :src="offline.image"
                          :alt="offline.name"
                        />
                      </label>
                    </li>
                  </template>

                  <!-- <li>
                    <label class="selected">
                      <input
                        type="radio"
                        class="d-none"
                        id="'payment_' + index"
                      />
                      <img
                                            :src="static_image_url + payment"
                                            alt="icon"
                                        />
                    </label>
                  </li>

                  <li class="w-100">
                    <label class="selected">
                      <input
                        type="radio"
                        name="paymentRadio"
                        class="d-none"
                        id="payment_offline"
                        value="offline"
                      />
                      <div class="btn btn-gray w-100">
                        Offline - Bank Deposit
                      </div>
                    </label>
                  </li> -->
                </ul>
              </div>

              <div
                class="row justify-content-center text-end mt-3"
                :class="{ disable_section: !form.total }"
              >
                <div class="col-lg-5" id="payment_buttons">
                  <div
                    class="mx-auto"
                    v-show="payment_form.payment_type == 'paypal'"
                    id="paypal-button-container"
                    ref="paypal"
                  ></div>

                  <paypal
                    v-if="
                      settings.is_paypal_activated == 1 &&
                      settings.paypal_key &&
                      payment_form.payment_type == 'paypal'
                    "
                    :trx_id="trx_id"
                    :code="code"
                    :amount="form.total"
                    :payment_type="payment_form.payment_type"
                    :type="'wallet'"
                  ></paypal>

                  <a
                    href="javascript:void(0)"
                    class="btn btn-primary w-100 disable_btn"
                    v-if="!payment_form.payment_type"
                    >{{ lang.pay_now }}</a
                  >

                  <a
                    :href="
                      getUrl(
                        'stripe/redirect?amount=' + form.total + '&type=wallet'
                      )
                    "
                    class="btn btn-primary w-100"
                    v-if="payment_form.payment_type == 'stripe'"
                    >{{ lang.pay_now }}</a
                  >

                  <a
                    :href="
                      getUrl(
                        'get/ssl-response?amount=' + form.total + '&type=wallet'
                      )
                    "
                    class="btn btn-primary w-100"
                    v-if="payment_form.payment_type == 'ssl_commerze'"
                    >{{ lang.pay_now }}</a
                  >

                  <a
                    :href="
                      getUrl(
                        'user/payment/paytmRedirect?amount=' +
                          form.total +
                          '&type=wallet'
                      )
                    "
                    class="btn btn-primary w-100"
                    v-if="payment_form.payment_type == 'paytm'"
                    >{{ lang.pay_now }}</a
                  >

                  <a
                    href="javascript:void(0)"
                    class="btn btn-primary w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#offline"
                    v-if="offline_method.name"
                    >{{ lang.pay_now }}</a
                  >
                  <a
                    href="#"
                    class="btn btn-primary w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#paystack_modal"
                    @click="payment_component_load = true"
                    v-if="payment_form.payment_type == 'paystack'"
                  >
                    {{ lang.pay_now }}</a
                  >

                  <a
                    href="#"
                    class="btn btn-primary w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#fw_modal"
                    v-if="payment_form.payment_type == 'flutter_wave'"
                  >
                    {{ lang.pay_now }}</a
                  >

                  <a
                    :href="
                      getUrl('mollie/recharge-payment?amount=' + form.total)
                    "
                    class="btn btn-primary w-100"
                    v-if="payment_form.payment_type == 'mollie'"
                    >{{ lang.pay_now }}</a
                  >
                  <a
                    :href="
                      getUrl('mercadopago/redirect/wallet?amount=' + form.total)
                    "
                    class="btn btn-primary w-100"
                    v-if="payment_form.payment_type == 'mercadopago'"
                  >
                    {{ lang.pay_now }}</a
                  >
                  <a
                    :href="
                      getUrl(
                        'bkash/redirect?amount=' + form.total + '&type=wallet'
                      )
                    "
                    class="btn btn-primary w-100"
                    v-if="payment_form.payment_type == 'bkash'"
                  >
                    {{ lang.pay_now }}</a
                  >

                  <a
                    :href="getUrl('nagad/redirect/wallet?amount=' + form.total)"
                    class="btn btn-primary w-100"
                    v-if="payment_form.payment_type == 'nagad'"
                  >
                    {{ lang.pay_now }}</a
                  >

                  <a
                    :href="
                      getUrl(
                        'amarpay/redirect?amount=' +
                          form.total +
                          '&type=wallet&payment_type=amarpay'
                      )
                    "
                    class="btn btn-primary w-100"
                    v-if="payment_form.payment_type == 'amarpay'"
                  >
                    {{ lang.pay_now }}</a
                  >


                <button
                    v-if="payment_form.payment_type == 'razor_pay'"
                    @click="payWithRazorpay()"
                    type="button"
                    class="btn btn-primary w-100"
                    :disabled="is_disable"
                >
                    {{ lang.pay_now }}</button
                >




                  <google_pay
                    v-if="payment_form.payment_type == 'google_pay'"
                    :trx_id="trx_id"
                    :code="code"
                    :type="wallet_recharge"
                    :amount="form.total"
                  ></google_pay>

                  <a
                    :href="
                      getUrl(
                        'skrill/redirect?amount=' +
                          form.total +
                          '&type=wallet&payment_type=skrill'
                      )
                    "
                    class="btn btn-primary w-100"
                    v-if="payment_form.payment_type == 'skrill'"
                  >
                    {{ lang.pay_now }}</a
                  >

                  <a
                    :href="
                      getUrl('iyzico/redirect/wallet?amount=' + form.total)
                    "
                    class="btn btn-primary w-100"
                    v-if="payment_form.payment_type == 'iyzico'"
                  >
                    {{ lang.pay_now }}</a
                  >

                  <a
                    :href="
                      getUrl('hitpay/redirect/wallet?amount=' + form.total)
                    "
                    class="btn btn-primary w-100"
                    v-if="payment_form.payment_type == 'hitpay'"
                  >
                    {{ lang.pay_now }}</a
                  >

                  <a
                    :href="getUrl('telr/redirect/wallet?amount=' + form.total)"
                    class="btn btn-primary w-100"
                    v-if="payment_form.payment_type == 'telr'"
                  >
                    {{ lang.pay_now }}</a
                  >

                  <midtrans
                    v-if="payment_form.payment_type == 'mid_trans'"
                    :amount="form.total"
                    :type="wallet_recharge"
                  ></midtrans>
                  <kkiapay
                    v-if="
                      settings.is_kkiapay_activated &&
                      settings.kkiapay_public_key &&
                      payment_form.payment_type == 'kkiapay' &&
                      xof
                    "
                    :trx_id="trx_id"
                    :code="code"
                    :amount="form.total"
                    :payment_type="payment_form.payment_type"
                    :xof="xof"
                    :type="'wallet'"
                  ></kkiapay>

                  <form name="jsform" :action="jazz_url" method="get">
                    <input
                      v-for="(value, name) in jazz_data"
                      :key="name"
                      type="hidden"
                      :name="name"
                      :value="value"
                    />
                    <button
                      type="submit"
                      class="btn btn-primary w-100"
                      v-show="!loading"
                      v-if="payment_form.payment_type == 'jazz_cash'"
                    >
                      {{ lang.pay_now }}
                    </button>
                  </form>

                  <form
                    :action="getUrl('user/recharge-wallet')"
                    method="post"
                    v-show="payment_form.payment_type == 'razor_pay'"
                  >
                    <input type="hidden" name="_token" :value="token" />
                    <input
                      type="hidden"
                      name="payment_type"
                      :value="payment_form.payment_type"
                    />
                    <input type="hidden" name="amount" :value="form.total" />
                    <div ref="razor_pay"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- offline modal -->

    <!-- id="offline" tabindex="-1" aria-labelledby="offline_modal"
     aria-hidden="true" -->
    <div
      class="modal fade LogoutModal"
      id="offline"
      tabindex="-1"
      aria-labelledby="offline_modal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header custom-modal-header">
            <div class="title">
              {{ lang.pay_with }} {{ offline_method.name }}
            </div>
            <button
              type="button"
              class="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="ri-close-large-fill"></i>
            </button>
          </div>
          <div class="modal-body p-0">
            <div class="row">

              <div class="col-lg-12">
                <div class="form-group">
                    <label>{{ lang.upload_file }}</label>

                    <input
                        type="file"
                        id="upload"
                        @change="imageUpload($event)"
                        multiple
                        class="form-control"
                    />
                    <p class="mt-2 text-secondary" v-if="fileName">{{ fileName }}</p>


                </div>
                </div>

                <div class="col-lg-12 mt-2" v-if="offline_method.instructions">
                    <label>{{ lang.instructions }}</label>
                    <div
                    class="instruction"
                    v-html="offline_method.instructions"
                    ></div>
                </div>

                <div class="col-lg-12 text-center mt-3">
                    <button
                        @click="payment"
                        class="btn btn-primary"
                        v-show="!loading"
                    >
                        {{ lang.proceed }}
                    </button>
                    <loading_button
                        v-show="loading"
                        :class_name="'btn btn-primary'"
                    ></loading_button>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- play stack -->
    <div
      class="modal fade"
      id="paystack_modal"
      tabindex="-1"
      aria-labelledby="paystack_modal"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ lang.pay_with_paystack }}</h5>
            <button
              type="button"
              class="close modal_close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <paystack
            v-if="payment_component_load"
            :trx_id="trx_id"
            :transaction_type="'wallet_recharge'"
            :paystack_key="settings.paystack_pk"
            :ngn_exchange_rate="settings.ngn_exchange_rate"
            :code="code"
            :amount="form.total"
            :type="payment_form.payment_type"
          ></paystack>
        </div>
      </div>
    </div>

    <!-- Recharge Wallet Modal -->

    <flutter_wave
      :trx_id="trx_id"
      :code="code"
      :transaction_type="'wallet_recharge'"
      :amount="form.total"
      :type="payment_form.payment_type"
      ref="flutter_wave"
    ></flutter_wave>

    <div class="mt-20">
      <Order :orders="profileOrders.data" :user_dashboard="false" />
    </div>

  </div>
  <!-- Order Wrapper End -->
</template>
<script>
import CubeSVG from "@/svg/CubeSVG.vue";
import WalletSVG from "@/svg/WalletSVG.vue";
import Shimmer from "@/components/Shimmer.vue";

import paystack from "@/payment_partials/paystack.vue";
import Flutter_wave from "@/payment_partials/flutter_wave.vue";
import google_pay from "@/payment_partials/google_pay.vue";
import midtrans from "@/payment_partials/midtrans.vue";
import paypal from "@/payment_partials/paypal.vue";
import kkiapay from "@/payment_partials/kkiapay.vue";
import Order from "./components/Order.vue";

export default {
  components: {
    CubeSVG,
    WalletSVG,
    Shimmer,

    paystack,
    Flutter_wave,
    google_pay,
    midtrans,
    paypal,
    kkiapay,
    Order,
  },
  data() {
    return {
      is_disable: false,
      current: "dashboard",
      amount: 0,
      offline_methods: [],
      indian_currency: {},
      form: {
        total: "",
      },
      ssl: {
        name: null,
        email: null,
        phone: null,
      },

      razor_form: {
        name: null,
        email: null,
        phone: null,
        description: null,
      },
      loading: false,
      jazz_data: [],
      jazz_url: "",
      offline_method: {
        id: "",
        name: "",
        image: "",
        instructions: "",
      },
      trx_id: "",
      code: "",
      payment_component_load: false,
      xof: "",
      fileName: ''
    };
  },
  mounted() {
    this.getProfileOrders();
    this.takeData();
  },

  computed: {
    profileOrders() {
      return this.$store.getters.getProfileOrders;
    },
    carts() {
      return this.$store.getters.getCarts;
    },
    wishlists() {
      return this.$store.getters.getTotalWishlists;
    },
    activeCurrency() {
      return this.$store.getters.getActiveCurrency;
    },
    totalReward() {
      return this.$store.getters.getTotalReward === ""
        ? null
        : this.$store.getters.getTotalReward;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
    default_shipping() {
      return this.authUser
        ? this.$store.getters.getUser.shipping_address
        : null;
    },
    default_billing() {
      return this.authUser ? this.$store.getters.getUser.billing_address : null;
    },
  },
  methods: {
    imageUpload(event) {
      let file = event.target.files[0];
      this.offline_method.image = file;
      this.fileName = file?.name || '';
    },

    getProfileOrders() {
      let url = this.getUrl("user/profile-orders");
      axios.get(url).then((response) => {
        this.$store.commit("setShimmer", false);
        this.xof = response.data.xof;
        this.$store.commit("getProfileOrders", response.data.orders);
      });
    },
    payment() {
      let payment_type = this.payment_form.payment_type;

      if (!payment_type) {
        this.$toast.warning(
          this.lang.please_choose_a_payment_method,
          this.lang.Warning + " !!"
        );

        return false;
      }
      let form = {
        id: this.offline_method.id,
        file: this.product_form.image,
        payment_type: payment_type,
        amount: this.form.total,
      };

      let url = this.getUrl("user/recharge-wallet");

      if (this.offline_method.id) {
        this.loading = true;


        const formData = this.$objectToFormData(form);

        axios.post(url, formData)
        .then((response) => {
            this.loading = false;
            if (response.data.error) {
              this.$toast.error(response.data.error, this.lang.Error + " !!");
            } else {
                const modal = bootstrap.Modal.getInstance(document.getElementById('offline'));
                if (modal) {
                        modal.hide();
                }
              let unshift = 1;
              this.$store.commit("getWalletRecharges", {
                unshift: unshift,
                data: response.data.recharges.data,
              });
              let image_selector = document.getElementById("upload-image");
              if (image_selector) {
                image_selector.innerHTML = "";
              }
              this.$router.push({ name: "wallet.history" });
            }
          })
          .catch((error) => {
            this.loading = false;
          });
      }
    },
    takeData() {
      this.$progress.start();
      let url = this.getUrl("user/wallet-data");
      axios.get(url).then((response) => {
        if (response.data.error) {
          
          this.$toast.error(response.data.error, this.lang.Error + " !!");
        } else {
          this.$progress.finish();
          this.indian_currency = response.data.indian_currency;
          this.offline_methods = response.data.offline_methods;
          this.jazz_data = response.data.jazz_data;
          this.jazz_url = response.data.jazz_url;
        }
      });
    },
    integrateRazorPay() {
      this.razorPayRemove();
      if (
        this.payment_form.payment_type == "razor_pay" &&
        this.indian_currency
      ) {
        var razorKeys = document.querySelectorAll(".razorpay-payment-button");

        for (let i = 0; i < razorKeys.length; i++) {
          razorKeys[i].style.display = "none";
        }

        let myScript = document.createElement("script");

        myScript.setAttribute("type", "text/javascript");
        myScript.setAttribute("language", "javascript");
        myScript.setAttribute("data-key", this.settings.razor_key);
        myScript.setAttribute(
          "data-amount",
          parseInt(this.form.total * 100 * this.indian_currency.exchange_rate)
        );
        myScript.setAttribute("data-name", "Yoori");
        myScript.setAttribute("data-description", "Rozerpay");
        myScript.setAttribute("data-image", this.settings.dark_logo);
        myScript.setAttribute("data-prefill.name", "name");
        myScript.setAttribute("data-prefill.email", "email");
        myScript.setAttribute("data-prefill.address", "address");
        myScript.setAttribute("data-theme.color", "#ff7529");
        myScript.setAttribute(
          "src",
          this.getUrl("public/frontend/js/razor_pay_checkout.js")
        );

        // Append script
        this.$refs.razor_pay.insertAdjacentElement("afterend", myScript);
      }
      if (this.payment_form.payment_type == "ssl_commerze") {
        var ssl_keys = document.getElementById("sslczPayBtn");
        if (ssl_keys) {
          ssl_keys.setAttribute(
            "endpoint",
            this.getUrl(
              "user/recharge-wallet?payment_type=ssl_commerze&amount=" +
                this.form.total
            )
          );
        }
      }
    },
    razorPayRemove() {
      var razorKeys = document.querySelectorAll(".razorpay-payment-button");

      for (let i = 0; i < razorKeys.length; i++) {
        razorKeys[i].style.display = "none";
      }

      this.offline_method.name = "";
      this.offline_method.image = "";
      this.offline_method.instructions = "";
    },
    removeData() {
      this.payment_form.payment_type = "";
      this.razorPayRemove();
    },
    offlineCheck(offline) {
      this.razorPayRemove();
      this.offline_method.id = offline.id;
      this.offline_method.name = offline.name;
      this.offline_method.image = offline.image;
      this.offline_method.instructions = offline.instructions;
    },
    checkCurrency(code) {
      let currency = this.$store.getters.getCurrencies;
      let find = currency.findIndex((c) => c.code == code);
      if (find > -1) {
        return true;
      } else {
        return false;
      }
    },


    // razor pay
    async payWithRazorpay() {
        if(this.is_disable == true){
            return;
        }


        // this.is_disable = true;
        try {
            const { data } = await axios.get(
                this.getUrl("wallet-razorpay/redirect"),
                {
                    params: {
                        amount: this.form.total,
                    },
                }
            );

            if (data.error) {
                this.$toast.error(data.error);
                this.is_disable = false;
                return;
            }

            const modal = bootstrap.Modal.getInstance(document.getElementById('recharge_wallet'));
            if (modal) {
                modal.hide();
            }

            const options = {
                key: data.razorpay_key,
                amount: data.amount,
                currency: data.currency,
                name: data.name,
                description: data.description,
                order_id: data.order_id,
                handler: (response) => {
                    axios
                        .post(
                            this.getUrl("wallet-razorpay/payment-verify"),
                            response
                        )
                        .then(() => {
                            this.$toast.success(
                                "Successfully Recharge Wallet"
                            );

                            setTimeout(() => {
                                window.location.reload();
                            }, 500);

                        })
                        .catch(() => {
                            this.$toast.error(
                                "Payment verification failed!"
                            );
                            this.is_disable = false;
                        });
                },
                theme: { color: "#3399cc" },
            };

            const rzp = new Razorpay(options);
            rzp.open();
            this.is_disable = false;
        } catch (error) {
            this.$toast.error("Failed to initiate Razorpay!");
            this.is_disable = false;
        }
    },
    // razor pay



  },
};
</script>
<style scoped>
.input-group {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
}

.custom-file {
  position: relative;
  flex: auto;
}

.upload-image.form-control {
  text-align: left;
  width: 100%;
  margin-left: 0;
  color: #999;
  background-color: transparent;
}

.modal-body .form-control {
  margin-bottom: 15px;
}

label.upload-image {
  font-size: 12px;
  height: 42px;
}

.upload-image input {
  display: none;
}

#upload-image {
  font-style: normal !important;
}

.upload-image.upload-text {
  background: #e9e9e9;
}

label.upload-image {
  font-size: 12px;
  height: 42px;
}

.upload-image {
  float: right;
  background-color: #f8f8f8;
  text-align: center;
  cursor: pointer;
  display: block;
  height: 50px;
  padding: 12px 15px;
  border-start-start-radius: 0;
  border-start-end-radius: 4px;
  border-end-end-radius: 4px;
  border-end-start-radius: 0;
  min-width: 100px;
  margin-left: -5px;
}



.instruction {
  border: 1px solid #ddd;
  padding: 10px 15px;
  margin: 10px 0px;
}

.custom-modal-header .close {
  background: transparent;
  border: none;
  outline: none;
  color: #ff3b30;
  font-size: 22px;
  z-index: 9;
  position: relative;
  width: 22px;
  height: 22px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
}

.disable_section {
    pointer-events: none;
    opacity: .5;
}

</style>
