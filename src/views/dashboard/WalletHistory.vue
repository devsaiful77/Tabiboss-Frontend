<template lang="html">
  <!-- Wallet History Start -->
  <div class="cart-form">
    <div class="cart-header">
      <h4 class="store-title">{{ lang.my_wallet }}</h4>
    </div>
    <div class="walletHistory-wrapper p-4">
      <div class="row" v-if="is_shimmer">
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4">
          <a href="javascript:void(0)">
            <div class="orderBox">
              <div class="icon"><CubeSVG /></div>
              <div class="content">
                <h4 class="title">{{ lang.total_balance }}</h4>
                <span class="count">
                  {{ priceFormat(authUser.balance) }}
                </span>
              </div>
            </div>
          </a>
        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4">
          <a
            href="javascript:void(0)"
            data-bs-toggle="modal"
            data-bs-target="#recharge_wallet"
          >
            <div class="orderBox">
              <div class="icon"><CubeSVG /></div>
              <div class="content">
                <h4 class="title">{{ lang.recharge_wallet }}</h4>
                <span class="count">
                  <i class="ri-add-line"></i>
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="row" v-else-if="shimmer">
        <div class="col-md-6 mb-3" v-for="(num, i) in 2">
          <shimmer :height="100"></shimmer>
        </div>
      </div>
    </div>
  </div>
  <!-- Wallet History End -->

  <div v-if="is_shimmer" class="cart-form mt-20">
    <div class="cart-header">
      <h4 class="store-title">{{ lang.wallet_history }}</h4>
    </div>
    <div class="table-responsive">
      <table class="table-v2">
        <thead>
          <tr>
            <th class="cart-pd-number">#</th>
            <th class="cart-pd-date">{{ lang.date }}</th>
            <th class="cart-pd-thumb text-start">{{ lang.source }}</th>
            <th class="cart-pd-price">{{ lang.amount }}</th>
            <th class="cart-pd-method">{{ lang.payment_method }}</th>
            <th class="cart-pd-status text-end">{{ lang.status }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(wallet, index) in wallets" :key="index">
            <td class="cart-pd-number">{{ ++index }}</td>
            <td class="cart-pd-date text-nowrap" data-title="date">
              {{ wallet.recharge_date }}
            </td>
            <td class="cart-pd-thumb">
              <div class="product-title text-start">
                {{ wallet.source.replaceAll("_", " ") }}
              </div>
            </td>
            <td class="cart-pd-thumb">
              <div class="product-title text-start">
                {{ priceFormat(wallet.amount) }}
              </div>
            </td>
            <td class="cart-pd-thumb">
              <div class="product-title text-start">
                {{ wallet.payment_method.replace("_", " ") }}
              </div>
            </td>
            <td class="cart-pd-status text-nowrap text-end" data-title="Status">
              <div
                :class="{
                  'text-success': wallet.status == 'approved',
                  'text-danger': wallet.status == 'rejected',
                  'text-warning': wallet.status == 'pending',
                }"
                class="badges badges-success"
              >
                {{ wallet.status }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="col-md-12 text-center show-more mt-3"
      v-if="next_page_url && !loading"
    >
      <a
        href="javascript:void(0)"
        @click="loadWallets()"
        class="btn btn-primary"
        >{{ lang.show_more }}</a
      >
    </div>
    <div class="col-md-12 text-center show-more mt-3" v-show="loading">
      <a href="javascript:void(0)" class="btn btn-primary"
        ><img
          width="20"
          :src="getUrl('images/default/preloader.gif')"
          alt="preloader"
        />{{ lang.loading }}</a
      >
    </div>
  </div>

  <div class="cart-form mt-20" v-else-if="shimmer">
    <div class="row">
      <div class="col-md-12 mb-3 overflow-y-auto" v-for="(num, i) in 6">
        <shimmer :height="50"></shimmer>
      </div>
    </div>
  </div>
  <!-- Product History Table End -->

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
                    settings.is_razorpay_activated == 1 && checkCurrency('INR')
                  "
                >
                  <label
                    :class="
                      payment_form.payment_type == 'razor_pay' ? 'selected' : ''
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
                      :src="getUrl('images/payment-method/razorpay.svg')"
                      :alt="payment_form.payment_type"
                      width="90"
                    />
                  </label>
                </li>

                <!-- jazz cash -->
                <li
                  v-if="
                    settings.is_jazz_cash_activated == 1 && checkCurrency('PKR')
                  "
                >
                  <label
                    :class="
                      payment_form.payment_type == 'jazz_cash' ? 'selected' : ''
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
                      :src="getUrl('images/payment-method/jazzCash.svg')"
                      :alt="payment_form.payment_type"
                      width="90"
                    />
                  </label>
                </li>

                <!-- paystack -->
                <li
                  v-if="
                    settings.is_paystack_activated == 1 && checkCurrency('NGN')
                  "
                >
                  <label
                    :class="
                      payment_form.payment_type == 'paystack' ? 'selected' : ''
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
                      :src="getUrl('images/payment-method/paystack.svg')"
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
                <li v-if="settings.is_bkash_activated && checkCurrency('BDT')">
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
                <li v-if="settings.is_nagad_activated && checkCurrency('BDT')">
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
                      :src="getUrl('images/payment-method/amarpay.svg')"
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
                  v-if="settings.is_mid_trans_activated && checkCurrency('IDR')"
                >
                  <label
                    :class="
                      payment_form.payment_type == 'mid_trans' ? 'selected' : ''
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
                      :src="getUrl('images/payment-method/midtrans.svg')"
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
                      :src="getUrl('images/payment-method/kkiapay.svg')"
                      :alt="payment_form.payment_type"
                      width="90"
                    />
                  </label>
                </li>

                <!-- offline payment -->
                <template v-if="addons.includes('offline_payment')">
                  <li v-for="(offline, index) in offline_methods" :key="index">
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
                  :href="getUrl('mollie/recharge-payment?amount=' + form.total)"
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
                  :href="getUrl('iyzico/redirect/wallet?amount=' + form.total)"
                  class="btn btn-primary w-100"
                  v-if="payment_form.payment_type == 'iyzico'"
                >
                  {{ lang.pay_now }}</a
                >

                <a
                  :href="getUrl('hitpay/redirect/wallet?amount=' + form.total)"
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


                <button
                    v-if="payment_form.payment_type == 'razor_pay'"
                    @click="payWithRazorpay()"
                    type="button"
                    class="btn btn-primary w-100"
                    :disabled="is_disable"
                >
                    {{ lang.pay_now }}</button
                >





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
          <div class="title">{{ lang.pay_with }} {{ offline_method.name }}</div>
          <button
            type="button"
            class="close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="closeWalletHistoryModal"
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
  },

  data() {
    return {
      is_disable: false,
      current: "wallet_history",
      page: 1,
      next_page_url: false,
      stripe_form: {
        name: null,
        email: null,
        phone: null,
        description: null,
        loading: null,
      },
      amount: 0,
      offline_methods: [],
      indian_currency: {},
      xof: "",
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
      is_shimmer: false,

      trx_id: "",
      code: "",
      wallet_recharge: "wallet_recharge",
      payment_component_load: false,
      fileName: ''
    };
  },
  created() {
    if (this.settings.wallet_system != 1) {
      this.$router.push({ name: "home" });
    }
  },
  mounted() {
    if (this.lengthCounter(this.wallets) == 0) {
      this.loadWallets();
    }
    if (this.lengthCounter(this.wallets) > 0) {
      this.is_shimmer = true;
    }
    this.takeData();
  },
  computed: {
    wallets() {
      return this.$store.getters.getWalletRecharges;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
  },
  methods: {

    imageUpload(event) {
      let file = event.target.files[0];
      this.offline_method.image = file;
      this.fileName = file?.name || '';
    },

    loadWallets() {
      let url = this.getUrl("user/wallet-history?page=" + this.page);

      if (this.page > 1) {
        this.loading = true;
      }
      this.$progress.start();

      axios.get(url).then((response) => {
        this.loading = false;
        this.is_shimmer = true;
        if (response.data.error) {
          this.$toast.error(response.data.error, this.lang.Error + " !!");
        } else {
          let unshift = 0;

          this.$store.commit("getWalletRecharges", {
            unshift: unshift,
            data: response.data.recharges.data,
          });

          this.next_page_url = response.data.recharges.next_page_url;
          this.page++;
          this.$progress.finish();
        }
      });
    },

    payment() {
      let payment_type = this.payment_form.payment_type;

      if (!payment_type) {
        return this.$toast.warning(
          this.lang.please_choose_a_payment_method,
          this.lang.Warning + " !!"
        );
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
            this.is_shimmer = true;
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
        this.is_shimmer = true;
        if (response.data.error) {
          
          this.$toast.error(response.data.error, this.lang.Error + " !!");
        } else {
          this.$progress.finish();
          this.indian_currency = response.data.indian_currency;
          this.offline_methods = response.data.offline_methods;
          this.jazz_data = response.data.jazz_data;
          this.jazz_url = response.data.jazz_url;
          this.xof = response.data.xof;
        }
      });
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
