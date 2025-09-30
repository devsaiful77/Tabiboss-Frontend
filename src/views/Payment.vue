<template lang="html">
    <!-- Breadcrumb Section Start -->
    <section class="breadcrumb-section bg-color py-10">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="breadcrumb-area">
                        <ul class="list">
                            <li @click="globNavigate('/cart')" class="linked">
                                {{ lang.view_cart }}
                            </li>
                            <li
                                @click="globNavigate('/checkout')"
                                class="linked"
                            >
                                {{ lang.check_out }}
                            </li>
                            <li>{{ lang.confirm_order }}</li>
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
                <div
                    class="col-xl-9 col-lg-8"
                    v-if="lengthCounter(settings) > 0"
                >
                    <!-- Payment Method -->
                    <div class="cart-form">
                        <div class="cart-header">
                            <h4 class="store-title">
                                {{ lang.payment_method }}
                            </h4>
                        </div>

                        <div class="payment-wrapper mt-15">
                            <payment_method
                                v-if="
                                    settings.is_paypal_activated == 1 &&
                                    settings.paypal_key
                                "
                                :value="'paypal'"
                                :label="lang.pay_with_payPal"
                                :image="
                                    getUrl(
                                        'images/payment-method/paypal.svg'
                                    )
                                "
                            />

                            <payment_method
                                v-if="settings.is_stripe_activated == 1"
                                :value="'stripe'"
                                :label="lang.pay_with_stripe"
                                :image="
                                    getUrl(
                                        'images/payment-method/stripe.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    settings.is_sslcommerz_activated == 1 &&
                                    checkCurrency('BDT')
                                "
                                :value="'ssl_commerze'"
                                :label="lang.pay_with_sSLCOMMERZE"
                                :image="
                                    getUrl(
                                        'images/payment-method/sslcommerze.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    settings.is_paytm_activated == 1 &&
                                    checkCurrency('INR')
                                "
                                :value="'ssl_commerze'"
                                :label="lang.pay_with_paytm"
                                :image="
                                    getUrl(
                                        'images/payment-method/paytm.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    settings.is_razorpay_activated == 1 &&
                                    checkCurrency('INR')
                                "
                                :value="'razor_pay'"
                                :label="lang.pay_with_razorpay"
                                :image="
                                    getUrl(
                                        'images/payment-method/razorpay.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    settings.is_jazz_cash_activated == 1 &&
                                    checkCurrency('PKR')
                                "
                                :value="'jazz_cash'"
                                :label="lang.pay_with_jazzCash"
                                :image="
                                    getUrl(
                                        'images/payment-method/jazzCash.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="settings.is_mollie_activated == 1"
                                :value="'mollie'"
                                :label="lang.pay_with_mollie"
                                :image="
                                    getUrl(
                                        'images/payment-method/mollie.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    settings.is_paystack_activated == 1 &&
                                    checkCurrency('NGN')
                                "
                                :value="'paystack'"
                                :label="lang.pay_with_paystack"
                                :image="
                                    getUrl(
                                        'images/payment-method/paystack.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    settings.is_flutterwave_activated == 1 &&
                                    checkCurrency('NGN')
                                "
                                :value="'flutter_wave'"
                                :label="lang.pay_with_flutter"
                                :image="
                                    getUrl(
                                        'images/payment-method/fw.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    settings.is_mercado_pago_activated == 1 &&
                                    checkCurrency('MXN')
                                "
                                :value="'mercadopago'"
                                :label="lang.pay_with_mercadopago"
                                :image="
                                    getUrl(
                                        'images/payment-method/mercado-pago.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    settings.is_mid_trans_activated == 1 &&
                                    checkCurrency('IDR')
                                "
                                :value="'mid_trans'"
                                :label="lang.pay_with_mid_trans"
                                :image="
                                    getUrl(
                                        'images/payment-method/midtrans.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="settings.is_telr_activated"
                                :value="'telr'"
                                :label="lang.pay_with_telr"
                                :image="
                                    getUrl(
                                        'images/payment-method/telr.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="settings.is_google_pay_activated"
                                :value="'google_pay'"
                                :label="lang.pay_with_google_pay"
                                :image="
                                    getUrl(
                                        'images/payment-method/google_pay.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    settings.is_bkash_activated &&
                                    checkCurrency('BDT')
                                "
                                :value="'bkash'"
                                :label="lang.pay_with_bkash"
                                :image="
                                    getUrl(
                                        'images/payment-method/bKash.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    settings.is_nagad_activated &&
                                    checkCurrency('BDT')
                                "
                                :value="'nagad'"
                                :label="lang.pay_with_nagad"
                                :image="
                                    getUrl(
                                        'images/payment-method/nagad.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    settings.is_amarpay_activated &&
                                    checkCurrency('BDT')
                                "
                                :value="'amarpay'"
                                :label="lang.pay_with_amarpay"
                                :image="
                                    getUrl(
                                        'images/payment-method/amarpay.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="settings.is_skrill_activated"
                                :value="'skrill'"
                                :label="lang.pay_with_skrill"
                                :image="
                                    getUrl(
                                        'images/payment-method/skrill.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="settings.is_iyzico_activated"
                                :value="'iyzico'"
                                :label="lang.pay_with_iyzico"
                                :image="
                                    getUrl(
                                        'images/payment-method/iyzico.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="settings.is_kkiapay_activated"
                                :value="'kkiapay'"
                                :label="lang.pay_with_kkiapay"
                                :image="
                                    getUrl(
                                        'images/payment-method/kkiapay.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    !code &&
                                    settings.pay_later_system == 1 &&
                                    authUser
                                "
                                :value="'pay_later'"
                                :label="lang.pay_later"
                                :image="
                                    getUrl(
                                        'images/payment-method/paylater.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    payment_form.total > 0 &&
                                    !code &&
                                    !check_cod
                                "
                                :value="'cash_on_delivery'"
                                :label="lang.cash_on_delivery"
                                :image="
                                    getUrl(
                                        'images/payment-method/cash.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    settings.is_hitpay_activated &&
                                    addons.includes('hitpay_payment_gateway')
                                "
                                :value="'hitpay'"
                                :label="lang.pay_with_hitpay"
                                :image="
                                    getUrl(
                                        'images/payment-method/hitpay.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    settings.is_hitpay_activated &&
                                    addons.includes('hitpay_payment_gateway')
                                "
                                :value="'hitpay'"
                                :label="lang.pay_with_hitpay"
                                :image="
                                    getUrl(
                                        'images/payment-method/hitpay.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="settings.is_dpo_activated"
                                :value="'dpo'"
                                :label="lang.pay_with_dpo"
                                :image="
                                    getUrl(
                                        'images/payment-method/dpo.svg'
                                    )
                                "
                            >
                            </payment_method>
                            <payment_method
                                v-if="
                                    settings.is_mpesa_activated &&
                                    addons.includes('ramdhani')
                                "
                                :value="'mpesa'"
                                :label="lang.pay_with_mpesa"
                                :image="
                                    getUrl(
                                        'images/payment-method/mpesa_logo.png'
                                    )
                                "
                            >
                            </payment_method>
                        </div>

                        <template
                            v-if="!code && addons.includes('offline_payment')"
                        >
                            <div class="subtitle">OR Select</div>
                            <div
                                class="delivery-btn"
                                v-for="(offline, index) in offline_methods"
                                :key="index"
                            >
                                <!-- <a href="#" class="btn btn-gray">Cash On Delivery</a> -->

                                <div class="input-checkbox paymentItem">
                                    <input
                                        type="radio"
                                        :id="'offline' + offline.id"
                                        @change="offlineCheck(offline)"
                                        value="offline_method"
                                        name="radio"
                                        v-model="payment_form.payment_type"
                                    />
                                    <label
                                        class="h-auto p-4 d-inline-flex gap-3"
                                        :for="'offline' + offline.id"
                                    >
                                        <img
                                            loading="lazy"
                                            :src="offline.image"
                                            :alt="offline.name"
                                            class="img-fluid"
                                        />
                                        {{ offline.name }}
                                    </label>
                                </div>
                            </div>
                        </template>

                        <div
                            class="row text-center"
                            v-if="
                                payment_form.total > 0 &&
                                authUser &&
                                authUser.balance >= payment_form.total &&
                                settings.wallet_system == 1
                            "
                        >
                            <div class="col-lg-12">
                                <div class="separator mb-3">
                                    <span class="bg-white px-3">
                                        <span class="opacity-60">{{
                                            lang.or
                                        }}</span>
                                    </span>
                                </div>
                            </div>
                            <div class="col-lg-12 mb-5">
                                <p>
                                    {{ lang.your_wallet_balance }} :
                                    {{ priceFormat(authUser.balance) }}
                                </p>
                                <a
                                    href="javascript:void(0)"
                                    @click="payment('wallet')"
                                    v-if="!wallet_loading"
                                    class="btn btn-primary"
                                    >{{ lang.pay_with_wallet }}</a
                                >
                                <loading_button
                                    v-if="wallet_loading"
                                    :class_name="'btn btn-primary'"
                                ></loading_button>
                            </div>
                        </div>
                    </div>

                    <GdPrPage
                        ref="payment_agreement"
                        :agreements="settings.payment_agreement"
                        :class="{
                            'mt-5 pt-5': !(
                                payment_form.total > 0 &&
                                authUser &&
                                authUser.balance >= payment_form.total &&
                                settings.wallet_system == 1
                            ),
                        }"
                    />
                </div>

                <div class="col-xl-9 col-lg-8" v-else-if="shimmer">
                    <Shimmer
                        class="mb-3"
                        :height="200"
                        v-for="(addresses, i) in 3"
                        :key="i"
                    />
                </div>

                <div class="col-xl-3 col-lg-4">
                    <div class="cart-order">
                        <div class="cart-header">
                            <h4 class="store-title">
                                {{ lang.price_details }}
                            </h4>
                        </div>

                        <form
                            :action="
                                authUser
                                    ? getUrl('user/complete-order?code=' + code)
                                    : getUrl(
                                          'user/complete-order?code=' +
                                              code +
                                              '&guest=1'
                                      )
                            "
                            method="post"
                        >
                            <input type="hidden" name="_token" :value="token" />
                            <input
                                type="hidden"
                                name="trx_id"
                                :value="trx_id"
                            />
                            <input
                                type="hidden"
                                name="payment_type"
                                :value="payment_form.payment_type"
                            />
                            <input
                                type="hidden"
                                name="amount"
                                :value="payment_form.total"
                            />
                            <div ref="razor_pay"></div>
                            <PaymentDetails
                                :sub_total="payment_form.sub_total"
                                :tax="payment_form.tax"
                                :discount_offer="payment_form.discount_offer"
                                :shipping_tax="payment_form.shipping_tax"
                                :coupon_discount="payment_form.coupon_discount"
                                :total="payment_form.total"
                            />
                        </form>

                        <div class="cart-btns">
                            <loading_button
                                v-if="
                                    loading &&
                                    (payment_form.payment_type ==
                                        'cash_on_delivery' ||
                                        payment_form.payment_type ==
                                            'pay_later')
                                "
                                :class_name="'btn btn-primary w-100'"
                            ></loading_button>

                            <a
                                @click="payment"
                                href="javascript:void(0)"
                                class="btn btn-primary w-100"
                                v-if="payment_form.payment_type == 'stripe'"
                            >
                                {{ lang.pay_now }}</a
                            >

                            <a
                                href="javascript:void(0)"
                                class="btn btn-primary disable_btn"
                                v-if="!payment_form.payment_type"
                            >
                                {{ lang.pay_now }}</a
                            >

                            <a
                                @click="payment"
                                href="javascript:void(0)"
                                class="btn btn-primary w-100"
                                v-if="payment_form.payment_type == 'paytm'"
                            >
                                {{ lang.pay_now }}</a
                            >

                            <a
                                href="javascript:void(0)"
                                @click="payment"
                                class="btn btn-primary w-100"
                                v-if="
                                    payment_form.payment_type == 'ssl_commerze'
                                "
                            >
                                {{ lang.pay_now }}</a
                            >



                            <a
                                href="javascript:void(0)"
                                @click="payment"
                                class="btn btn-primary w-100"
                                v-show="!loading"
                                v-if="
                                    payment_form.payment_type ==
                                        'cash_on_delivery' ||
                                    payment_form.payment_type == 'pay_later'
                                "
                                >{{ lang.confirm }}</a
                            >

                            <offline_method
                                v-if="
                                    offline_methods.length > 0 &&
                                    !code &&
                                    addons.includes('offline_payment')
                                "
                                :trx_id="trx_id"
                                :code="code"
                                :amount="payment_form.total"
                                :offline_method="offline_method"
                                :loading="loading"
                            ></offline_method>



                            <razorpay :trx_id="trx_id" :code="code" v-if="payment_form.payment_type == 'razor_pay'"></razorpay>

                            <a
                                href="javascript:void(0)"
                                @click="payment"
                                class="btn btn-primary w-100"
                                v-if="payment_form.payment_type == 'mollie'"
                            >
                                {{ lang.pay_now }}</a
                            >

                            <a
                                href="javascript:void(0)"
                                @click="payment"
                                class="btn btn-primary w-100"
                                v-if="payment_form.payment_type == 'telr'"
                            >
                                {{ lang.pay_now }}</a
                            >
                            <a
                                href="#"
                                class="btn btn-primary w-100"
                                data-bs-toggle="modal"
                                data-bs-target="#paystack_modal"
                                v-if="payment_form.payment_type == 'paystack'"
                            >
                                {{ lang.pay_now }}</a
                            >

                            <!-- midtrans -->
                            <midtrans
                                v-if="payment_form.payment_type == 'mid_trans'"
                                :amount="payment_form.total"
                                :mid_token="mid_trans_token"
                                :trx_id="trx_id"
                                :code="code"
                            ></midtrans>
                            <!-- flutter wave -->
                            <flutter_wave
                                v-if="settings.is_flutterwave_activated == 1"
                                :trx_id="trx_id"
                                :code="code"
                                :amount="payment_form.total"
                                :type="payment_form.payment_type"
                                ref="flutter_wave"
                            ></flutter_wave>

                            <!-- mercado pago -->
                            <a
                                href="javascript:void(0)"
                                @click="payment"
                                class="btn btn-primary w-100"
                                v-if="
                                    payment_form.payment_type == 'mercadopago'
                                "
                            >
                                {{ lang.pay_now }}</a
                            >

                            <!-- google pay -->
                            <google_pay
                                v-if="payment_form.payment_type == 'google_pay'"
                                :trx_id="trx_id"
                                :code="code"
                                :amount="payment_form.total"
                            ></google_pay>

                            <a
                                href="javascript:void(0)"
                                @click="payment"
                                class="btn btn-primary"
                                v-if="payment_form.payment_type == 'amarpay'"
                            >
                                {{ lang.pay_now }}</a
                            >

                            <a
                                href="javascript:void(0)"
                                @click="payment"
                                class="btn btn-primary"
                                v-if="payment_form.payment_type == 'bkash'"
                            >
                                {{ lang.pay_now }}</a
                            >

                            <a
                                href="javascript:void(0)"
                                @click="payment"
                                class="btn btn-primary"
                                v-if="payment_form.payment_type == 'nagad'"
                            >
                                {{ lang.pay_now }}</a
                            >
                            <a
                                href="javascript:void(0)"
                                @click="payment"
                                class="btn btn-primary"
                                v-if="payment_form.payment_type == 'skrill'"
                            >
                                {{ lang.pay_now }}</a
                            >
                            <a
                                href="javascript:void(0)"
                                @click="payment"
                                class="btn btn-primary w-100"
                                v-if="payment_form.payment_type == 'hitpay'"
                            >
                                {{ lang.pay_now }}</a
                            >
                            <a
                                href="javascript:void(0)"
                                @click="payment"
                                class="btn btn-primary w-100"
                                v-if="payment_form.payment_type == 'dpo'"
                            >
                                {{ lang.pay_now }}</a
                            >
                            <kkiapay
                                v-if="
                                    settings.is_kkiapay_activated &&
                                    settings.kkiapay_public_key &&
                                    payment_form.payment_type == 'kkiapay' &&
                                    xof
                                "
                                :trx_id="trx_id"
                                :code="code"
                                :amount="payment_form.total"
                                :payment_type="payment_form.payment_type"
                                :xof="xof"
                                :type="'order'"
                            ></kkiapay>

                            <paypal
                                v-if="
                                    settings.is_paypal_activated == 1 &&
                                    settings.paypal_key &&
                                    payment_form.payment_type == 'paypal'
                                "
                                :trx_id="trx_id"
                                :code="code"
                                :amount="payment_form.total"
                                :payment_type="payment_form.payment_type"
                                :type="'order'"
                            ></paypal>

                            <a
                                href="javascript:void(0)"
                                @click="payment"
                                class="btn btn-primary w-100"
                                v-if="payment_form.payment_type == 'mpesa'"
                                >{{ lang.pay_now }}</a
                            >

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
                                    v-if="
                                        payment_form.payment_type == 'jazz_cash'
                                    "
                                >
                                    {{ lang.pay_now }}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal pay stack -->
        <!-- /.shopping-cart -->
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
                        <h5 class="modal-title">
                            {{ lang.pay_with_paystack }}
                        </h5>
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
                        v-if="settings.is_paystack_activated == 1"
                        :trx_id="trx_id"
                        :paystack_key="settings.paystack_pk"
                        :ngn_exchange_rate="settings.ngn_exchange_rate"
                        :code="code"
                        :amount="payment_form.total"
                        :type="payment_form.payment_type"
                    ></paystack>
                </div>
            </div>
        </div>
        <!-- modal pay stack -->
    </section>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import OrderProgress from "@/components/OrderProgress/Index.vue";
import PaymentDetails from "@/components/PaymentDetails.vue";
import GdPrPage from "@/components/GdPr_Page.vue";

import offline_method from "@/payment_partials/offline_method.vue";
import payment_method from "@/payment_partials/payment_method.vue";

import midtrans from "@/payment_partials/midtrans.vue";
import paystack from "@/payment_partials/paystack.vue";
import stripe from "@/payment_partials/stripe.vue";
import flutter_wave from "@/payment_partials/flutter_wave.vue";
import google_pay from "@/payment_partials/google_pay.vue";
import paypal from "@/payment_partials/paypal.vue";
import kkiapay from "@/payment_partials/kkiapay.vue";
import apple_pay from "@/payment_partials/apple_pay.vue";
import razorpay from "@/payment_partials/Razorpay.vue";
import { setToast } from "@/utils/toast.js";

export default {
    components: {
        Shimmer,
        OrderProgress,
        PaymentDetails,
        payment_method,
        GdPrPage,
        offline_method,
        midtrans,
        flutter_wave,
        google_pay,
        apple_pay,
        kkiapay,
        paypal,
        paystack,
        stripe,
        razorpay,
    },

    data() {
        return {
            offline_methods: [],
            indian_currency: {},
            check_cod: false,
            razor_laod: false,
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
            trx_id: "",
            offline_method: {
                id: "",
                name: "",
                image: "",
                instructions: "",
            },
            jazz_data: [],
            jazz_url: "",
            wallet_loading: false,
            code:
                typeof this.$route.params.code != "undefined"
                    ? this.$route.params.code
                    : "",
            loading: false,
            offline_modal: false,
            showStripeModal: false,
            mid_trans_token: "",
            xof: "",
            agreement: "",
            offline_method_file: "",
        };
    },
    mounted() {
        this.takeOrders();
    },
    watch: {
        carts(newValue, oldValue) {
            this.$router.go(-1);
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
        takeOrders() {
            let carts = this.carts;
            let url = this.getUrl("user/payment-order?code=" + this.code);
            this.resetForm();
            axios.get(url).then((response) => {
                this.$store.commit("setShimmer", 0);
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.$store.commit("setLoginRedirection", "");
                    let orders = response.data.orders;
                    let coupons = response.data.coupons;
                    this.indian_currency = response.data.indian_currency;
                    this.xof = response.data.xof;
                    this.offline_methods = response.data.offline_methods;
                    this.jazz_data = response.data.jazz_data;
                    this.jazz_url = response.data.jazz_url;
                    this.mid_trans_token = response.data.mid_trans_token;
                    if (response.data.check_cod) {
                        this.check_cod = response.data.check_cod;
                    }

                    if (orders) {
                        for (let i = 0; i < orders.length; i++) {
                            this.payment_form.sub_total += parseFloat(
                                orders[i].sub_total
                            );
                            this.payment_form.discount_offer += parseFloat(
                                orders[i].discount
                            );
                            this.payment_form.shipping_tax += parseFloat(
                                orders[i].shipping_cost
                            );
                            this.payment_form.tax += parseFloat(
                                orders[i].total_tax
                            );
                            if (this.settings.coupon_system == 1) {
                                this.coupon_list = coupons;
                                for (let i = 0; i < coupons.length; i++) {
                                    this.payment_form.coupon_discount +=
                                        parseFloat(coupons[i].discount);
                                }
                            }

                            this.trx_id = orders[i].trx_id;
                        }

                        if (
                            this.settings.tax_type == "after_tax" &&
                            this.settings.vat_and_tax_type == "order_base"
                        ) {
                            this.payment_form.total = parseFloat(
                                parseFloat(this.payment_form.sub_total) +
                                    parseFloat(this.payment_form.shipping_tax) -
                                    (parseFloat(
                                        this.payment_form.discount_offer
                                    ) +
                                        parseFloat(
                                            this.payment_form.coupon_discount
                                        ))
                            );
                            this.payment_form.total += parseFloat(
                                this.payment_form.tax
                            );
                            if (this.payment_form.total < 0) {
                                this.payment_form.total = 0;
                            }
                        } else {
                            this.payment_form.total = parseFloat(
                                parseFloat(this.payment_form.sub_total) +
                                    parseFloat(this.payment_form.tax) +
                                    parseFloat(this.payment_form.shipping_tax) -
                                    (parseFloat(
                                        this.payment_form.discount_offer
                                    ) +
                                        parseFloat(
                                            this.payment_form.coupon_discount
                                        ))
                            );
                            if (this.payment_form.total < 0) {
                                this.payment_form.total = 0;
                            }
                        }
                    }

                    if (!this.trx_id) {
                        setToast('warning',this.lang.something_went_wrong_try_chooing_address);
                        this.$router.push({ name: "checkout" });
                    }
                }
            });
        },
        integrateRazorPay() {
            this.razorPayRemove();
            if (
                this.settings.is_razorpay_activated == 1 &&
                this.indian_currency
            ) {
                alert(true);
                let myScript = document.createElement("script");

                myScript.setAttribute("type", "text/javascript");
                myScript.setAttribute("language", "javascript");
                myScript.setAttribute("data-key", this.settings.razor_key);
                myScript.setAttribute(
                    "data-amount",
                    this.round(
                        this.payment_form.total *
                            100 *
                            this.indian_currency.exchange_rate
                    )
                );
                myScript.setAttribute("data-name", this.settings.system_name);
                myScript.setAttribute("data-description", "Razorpay");
                myScript.setAttribute("data-image", this.settings.dark_logo);
                myScript.setAttribute("data-prefill.name", "");
                myScript.setAttribute("data-prefill.email", "");
                myScript.setAttribute("data-prefill.address", "");
                myScript.setAttribute(
                    "data-theme.color",
                    this.settings.menu_background_color
                );
                myScript.setAttribute(
                    "src",
                    this.getUrl("public/frontend/js/razor_pay_checkout.js")
                );
                // Append script
                this.$refs.razor_pay.insertAdjacentElement(
                    "afterend",
                    myScript
                );
            }
        },

        razorPayRemove() {
            var razorKeys = document.querySelectorAll(
                ".razorpay-payment-button"
            );

            for (let i = 0; i < razorKeys.length; i++) {
                razorKeys[i].style.display = "none";
            }

            this.offline_method.name = "";
            this.offline_method.image = "";
            this.offline_method.instructions = "";
        },


        offlineCheck(offline) {

            // console.log(offline.name)

            this.razorPayRemove();
            this.offline_method.id = offline.id;
            this.offline_method.name = offline.name;
            this.offline_method.image = offline.image;
            this.offline_method.instructions = offline.instructions;
        },

        payment(wallet) {
            if (!this.$refs.payment_agreement.checkAgreements()) {
                return this.$toast.info(
                    this.lang.accept_terms,
                    this.lang.Error + " !!"
                );
            }
            let payment_type = "";
            if (wallet == "wallet") {
                this.wallet_loading = true;
                payment_type = wallet;
            } else {
                payment_type = this.payment_form.payment_type;
            }

            if (!payment_type) {
                this.$toast.warning(
                    this.lang.please_choose_a_payment_method,
                    this.lang.Warning + " !!"
                );
                return false;
            }
            let form = {
                id: this.offline_method.id,
                file: this.offline_method_file,
                payment_type: payment_type,
                trx_id: this.trx_id,
                is_buy_now: this.$route.params.is_type
                    ? this.$route.params.is_type
                    : 0,
            };

            let url = this.getUrl("user/complete-order?code=" + this.code);
            if (
                payment_type == "cash_on_delivery" ||
                payment_type == "pay_later" ||
                this.offline_method.id ||
                payment_type == "wallet"
            ) {
                if (wallet != "wallet") {
                    this.loading = true;
                }

                const formData = this.$objectToFormData(form);
                axios
                    .post(url, formData)
                    .then((response) => {




                        this.wallet_loading = false;
                        this.loading = false;
                        if (response.data.error) {
                            this.$toast.error(
                                response.data.error,
                                this.lang.Error + " !!"
                            );
                        } else {

                            console.log(response.data);

                            // let modalEl = document.getElementById('offline');
                            // let modal = bootstrap.Modal.getInstance(modalEl);
                            // if (!modal) {
                            //   modal = new bootstrap.Modal(modalEl);
                            // }
                            // modal.hide();


                            const closeBtn = document.querySelector(
                                '[id="offline_payment_close"]'
                            );
                            if (closeBtn) {
                                closeBtn.click();
                            }





                            let image_selector = document.getElementById("upload-image");
                            if (image_selector) {
                                image_selector.innerHTML = "";
                            }
                            if (this.code) {
                                this.$router.push({
                                    name: "get.invoice",
                                    params: { orderCode: this.code },
                                });
                                return;
                            }
                            this.$router.push({
                                name: "invoice.list",
                                params: { trx_id: this.trx_id },
                            });
                        }
                    })
                    .catch((error) => {
                        this.loading = false;
                    });
            } else if (payment_type == "paystack") {
                return this.$refs.paystack.payStack();
            } else if (payment_type == "stripe") {
                return (window.location.href = this.getUrl(
                    "stripe/redirect?trx_id=" +
                        this.trx_id +
                        "&code=" +
                        this.$route.params.code
                ));
            } else if (payment_type == "paytm") {
                return (window.location.href = this.getUrl(
                    "user/payment/paytmRedirect?trx_id=" +
                        this.trx_id +
                        "&code=" +
                        this.$route.params.code +
                        "&payment_type=paytm"
                ));
            } else if (payment_type == "ssl_commerze") {
                return (window.location.href = this.getUrl(
                    "get/ssl-response?payment_type=ssl_commerze&code=" +
                        this.$route.params.code +
                        "&trx_id=" +
                        this.trx_id
                ));
            } else if (payment_type == "mollie") {
                return (window.location.href = this.getUrl(
                    "mollie/payment?code=" +
                        this.$route.params.code +
                        "&trx_id=" +
                        this.trx_id
                ));
            } else if (payment_type == "telr") {
                return (window.location.href = this.getUrl(
                    "telr/redirect?code=" +
                        this.$route.params.code +
                        "&trx_id=" +
                        this.trx_id
                ));
            } else if (payment_type == "mercadopago") {
                return (window.location.href = this.getUrl(
                    "mercadopago/redirect?code=" +
                        this.$route.params.code +
                        "&trx_id=" +
                        this.trx_id
                ));
            } else if (payment_type == "amarpay") {
                return (window.location.href = this.getUrl(
                    "amarpay/redirect?code=" +
                        this.$route.params.code +
                        "&trx_id=" +
                        this.trx_id
                ));
            } else if (payment_type == "bkash") {
                return (window.location.href = this.getUrl(
                    "bkash/redirect?code=" +
                        this.$route.params.code +
                        "&trx_id=" +
                        this.trx_id
                ));
            } else if (payment_type == "nagad") {
                return (window.location.href = this.getUrl(
                    "nagad/redirect?code=" +
                        this.$route.params.code +
                        "&trx_id=" +
                        this.trx_id
                ));
            } else if (payment_type == "skrill") {
                return (window.location.href = this.getUrl(
                    "skrill/redirect?code=" +
                        this.$route.params.code +
                        "&trx_id=" +
                        this.trx_id
                ));
            } else if (payment_type == "hitpay") {
                return (window.location.href = this.getUrl(
                    "hitpay/redirect?code=" +
                        this.$route.params.code +
                        "&trx_id=" +
                        this.trx_id
                ));
            } else if (payment_type == "dpo") {
                return (window.location.href = this.getUrl(
                    "dpo/redirect?code=" +
                        this.$route.params.code +
                        "&trx_id=" +
                        this.trx_id
                ));
            } else if (payment_type == "mpesa") {
                return (window.location.href = this.getUrl(
                    "mpesa/redirect?code=" +
                        this.$route.params.code +
                        "&trx_id=" +
                        this.trx_id
                ));
            }
        },
        checkCurrency(code) {
            let currency = this.$store.getters.getCurrencies;
            let find = currency.findIndex((c) => c.code == code);
            return find > -1;
        },
    },
};
</script>
<style lang=""></style>
