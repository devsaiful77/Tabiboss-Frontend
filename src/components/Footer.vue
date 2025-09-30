<template lang="html">
    <!-- Footer Section Start -->
    <section class="footer-section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="footer-top">
                        <div class="socialLink" v-if="settings.show_social_links && settings.show_social_links == 1">
                            <h5 class="title">{{ lang.stay_connected }}:</h5>
                            <ul class="social-list">
                                <li v-if="settings.facebook_link">
                                    <a target="_blank" :href="settings.facebook_link"><i class="ri-facebook-fill"></i></a>
                                </li>

                                <li v-if="settings.twitter_link">
                                    <a target="_blank" :href="settings.twitter_link">
                                        <i class="ri-twitter-x-fill"></i>
                                    </a>
                                </li>

                                <li v-if="settings.linkedin_link">
                                    <a target="_blank" :href="settings.linkedin_link">
                                        <i class="ri-linkedin-fill"></i>
                                    </a>
                                </li>

                                <li v-if="settings.instagram_link">
                                    <a target="_blank" :href="settings.instagram_link">
                                        <i class="ri-instagram-line"></i>
                                    </a>
                                </li>
                                <li v-if="settings.youtube_link">
                                    <a target="_blank" :href="settings.youtube_link">
                                        <i class="ri-youtube-line"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="payment-gataway">
                            <h5 class="title">{{ lang.payment_method }}:</h5>
                            <div class="payment__icon">
                                <img v-if="settings.visa_pay_banner" :src="getUrl('images/payment-method/visa.svg')" alt="payment" />

                                <img v-if="settings.master_card_pay_banner" :src="getUrl('images/payment-method/master-card.svg')" alt="payment" />

                                <img v-if="settings.american_express_pay_banner" :src="getUrl('images/payment-method/american-express.svg')" alt="payment" />

                                <img v-if="settings.paypal_payment_banner" :src="getUrl('images/payment-method/paypal.svg')" alt="payment" />

                                <img v-if="settings.apple_pay_banner" :src="getUrl('images/payment-method/apple-pay.svg')" alt="payment" />

                                <img v-if="settings.amazon_pay_banner" :src="getUrl('images/payment-method/amazon-pay.svg')" alt="payment" />

                                <img v-if="settings.after_pay_banner" :src="getUrl('images/payment-method/after-pay.svg')" alt="payment" />

                                <img v-if="settings.payment_method_banner" :src="settings.payment_method_banner" alt="payment" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div class="footer-wrapper">
                        <div class="footer-widget">
                            <h5 class="widget-title">
                                {{ lang.about }}
                            </h5>
                            <div v-html="settings.about_description"></div>
                            <div class="applist mt-3">
                                <a v-if="settings.topbar_play_store_link == 1" :href="settings.play_store_link ?? ''" target="_blank">
                                    <img :src="static_image_url + 'app-store.svg'" :alt="lang.apple_pay" />
                                    {{ lang.apple_pay }}
                                </a>
                                <a v-if="settings.topbar_app_store_link == 1" :href="settings.apple_store_link ?? ''" target="_blank">
                                    <img :src="static_image_url + 'play-store.svg'" alt="lang.play_store" />
                                    {{ lang.play_store }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-4 col-md-6 col-sm-6">
                    <div class="footer-wrapper">
                        <div class="footer-widget">
                            <h4 class="widget-title">{{ lang.contact_us }}</h4>
                            <ul class="widget-list list-none">
                                <li>
                                    <div class="icon">
                                        <i class="ri-map-pin-line"></i>
                                    </div>
                                    {{ settings.footer_contact_address }}
                                </li>
                                <li>
                                    <div class="icon">
                                        <i class="ri-phone-fill"></i>
                                    </div>
                                    <a :href="'tel:' + settings.footer_contact_phone">{{ settings.footer_contact_phone }}</a>
                                </li>
                                <li>
                                    <div class="icon">
                                        <i class="ri-mail-fill"></i>
                                    </div>
                                    <a :href="'mailto:' + settings.footer_contact_email">{{ settings.footer_contact_email }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-6">
                    <div class="footer-wrapper">
                        <div class="footer-widget">
                            <h4 class="widget-title">
                                {{ lang.useful_links }}
                            </h4>
                            <ul class="widget-list">
                                <li v-for="(link, i) in usefulLinks" :key="i">
                                    <router-link :to="link.url">{{ link.label }}</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-6">
                    <div class="footer-wrapper">
                        <div class="footer-widget">
                            <h4 class="widget-title">{{ lang.my_account }}</h4>
                            <ul class="widget-list" v-if="!authUser">
                                <li>
                                    <router-link :to="{ name: 'login' }">{{ lang.Login }}</router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'register' }">{{ lang.create_account }}</router-link>
                                </li>
                            </ul>
                            <ul class="widget-list" v-if="authUser && authUser.user_type == 'customer'">
                                <li>
                                    <router-link :to="{ name: 'dashboard' }">{{ lang.my_profile }}</router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'change.password' }">{{ lang.change_password }} </router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'order.history' }">{{ lang.order_history }}</router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'wishlist' }">{{ lang.my_wishlist }}</router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'addresses' }">{{ lang.addresses }}</router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'track.order' }">{{ lang.track_order }}</router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'gift.voucher' }">{{ lang.gift_voucher }}</router-link>
                                </li>
                            </ul>
                            <ul class="widget-list" v-else-if="authUser && (authUser.user_type == 'admin' || authUser.user_type == 'staff')">
                                <li>
                                    <a target="_blank" :href="getUrl('admin/dashboard')">{{ lang.dashboard }}</a>
                                </li>
                                <li>
                                    <a target="_blank" :href="getUrl('admin/profile')">{{ lang.my_profile }}</a>
                                </li>
                                <li>
                                    <a target="_blank" :href="getUrl('admin/password-change')">{{ lang.change_password }}</a>
                                </li>
                            </ul>
                            <ul class="widget-list" v-else-if="authUser && authUser.user_type == 'seller'">
                                <li>
                                    <a target="_blank" :href="getUrl('seller/dashboard')">{{ lang.dashboard }}</a>
                                </li>
                                <li>
                                    <a target="_blank" :href="getUrl('seller/profile')">{{ lang.my_profile }}</a>
                                </li>
                                <li>
                                    <a target="_blank" :href="getUrl('seller/password-change')">{{ lang.change_password }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-4">
                    <FooterSubscribe />
                </div>
            </div>
            
        </div>
        <!-- Footer Bottom -->
        <div class="footer-bottom">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="footer-content text-center">
                            <div class="content">
                                <p>{{ settings.copyright }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Footer Section End -->
</template>

<script>
import FooterSubscribe from "./FooterSubscribe.vue";

export default {
    components: {
        FooterSubscribe,
    },
    data() {
        return {
            gdpr: true,
            static_image_url: this.getUrl("frontends/images/"),
        };
    },
    computed: {
        usefulLinks() {
            return this.settings.useful_links;
        },
        footerMenu() {
            return this.settings.footer_menu;
        },
    },
    methods: {
        checkGDPR() {
            return !localStorage.getItem("gdpr") && this.settings.gdpr_enable == 1;
        },
        setGDPR() {
            this.gdpr = false;
            return localStorage.setItem("gdpr", "1");
        },
        classObj() {
            return [this.settings.seller_system == 1 && !this.authUser ? "col-lg-2" : "col-lg-3"];
        },
    },
};
</script>
