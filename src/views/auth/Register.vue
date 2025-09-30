<template lang="html">
    <!-- SignUp  Section Start -->
    <section class="signup-section pt-40 pb-100">
        <div class="container">
            <div class="signupForm-wrapper">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <div class="signup-thumb">
                            <img
                                :src="settings.sign_up_banner"
                                loading="lazy"
                                :alt="form.user_type"
                            />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <form @submit.prevent="register" class="signup-form">
                            <div class="title">
                                {{ lang.sign_up }}
                                <p v-if="otp && !settings.disable_otp">
                                    {{ lang.enter_to_complete_registration }}
                                </p>
                                <p v-else>
                                    {{ lang.sign_to_continue_shopping }}
                                </p>

                                <h5
                                    class="registration_heading"
                                    v-if="form.user_type == 'seller'"
                                >
                                    {{ lang.personal_info }}
                                </h5>
                            </div>
                            <div
                                class="instant-login"
                                v-if="
                                    settings.is_facebook_login_activated == 1 ||
                                    settings.is_google_login_activated == 1 ||
                                    settings.is_twitter_login_activated == 1
                                "
                            >
                                <div class="login-action">
                                    <a
                                        v-if="
                                            settings.is_facebook_login_activated ==
                                            1
                                        "
                                        href="javascript:void(0)"
                                        @click="loginWithSocial('fb')"
                                    >
                                        <img
                                            :src="
                                                static_image_url +
                                                'facebook.svg'
                                            "
                                            alt="facebook"
                                        />
                                        {{ lang.facebook }}
                                    </a>
                                    <a
                                        v-if="
                                            settings.is_google_login_activated ==
                                            1
                                        "
                                        href="javascript:void(0)"
                                        @click="loginWithSocial('google')"
                                    >
                                        <img
                                            :src="
                                                static_image_url + 'google.svg'
                                            "
                                            alt="google"
                                        />
                                        {{ lang.google }}
                                    </a>
                                    <a
                                        v-if="
                                            settings.is_twitter_login_activated ==
                                            1
                                        "
                                        href="javascript:void(0)"
                                        @click="loginWithSocial('twitter')"
                                    >
                                        <img
                                            :src="
                                                static_image_url + 'twitter.svg'
                                            "
                                            alt="twitter"
                                        />
                                        {{ lang.twitter }}
                                    </a>
                                </div>
                            </div>
                            <div class="devider text-center">
                                <span>{{ lang.or_continue_with }}</span>
                            </div>
                            <div class="grid-2">
                                <div class="input-group">
                                    <label for="f_name">{{
                                        lang.first_name
                                    }}</label>
                                    <input
                                        type="text"
                                        v-model="form.first_name"
                                        class="form-control"
                                        :class="{
                                            error_border: errors.first_name,
                                        }"
                                        :placeholder="lang.first_name"
                                    />

                                    <p>
                                        <span
                                            class="validation_error"
                                            v-if="errors.first_name"
                                            >{{ errors.first_name[0] }}</span
                                        >
                                    </p>
                                </div>
                                <div class="input-group">
                                    <label for="l_name">{{
                                        lang.last_name
                                    }}</label>
                                    <input
                                        type="text"
                                        v-model="form.last_name"
                                        class="form-control"
                                        :class="{
                                            error_border: errors.last_name,
                                        }"
                                        :placeholder="lang.last_name"
                                    />
                                    <p>
                                        <span
                                            class="validation_error"
                                            v-if="errors.last_name"
                                            >{{ errors.last_name[0] }}</span
                                        >
                                    </p>
                                </div>
                            </div>
                            <!--  -->
                            <div class="input-group" v-if="optionTo == 'phone'">
                                <label for="email">{{ lang.email }}</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    :placeholder="lang.email"
                                    v-model="form.email"
                                    :class="{
                                        'error_border mb-0': errors.email,
                                    }"
                                />
                                <p>
                                    <span
                                        class="validation_error"
                                        v-if="
                                            errors.email && optionTo == 'phone'
                                        "
                                        >{{ errors.email[0] }}</span
                                    >
                                </p>
                            </div>

                            <div
                                class="input-group"
                                v-if="
                                    optionTo == 'email' &&
                                    addons.includes('otp_system')
                                "
                            >
                                <!-- <label for="email">Enter Phone Number</label>
                                <vue-tel-input
                                    class="form-control"
                                    v-model="phone"
                                    mode="international"
                                ></vue-tel-input> -->

                                <Telephone
                                    @phone_no="getNumber"
                                    @country_id="setCountry"
                                    :phone_error="
                                        errors.phone ? errors.phone[0] : null
                                    "
                                />

                                <p>
                                    <span
                                        class="validation_error"
                                        v-if="errors.phone"
                                        >{{ errors.phone[0] }}</span
                                    >
                                </p>
                            </div>

                            <div
                                v-if="addons.includes('otp_system')"
                                class="change-type text-end"
                            >
                                <a
                                    href="javascript:void(0)"
                                    class="btn sign-in-option"
                                    @click="loginOptions(optionTo)"
                                    >{{
                                        optionTo == "email"
                                            ? lang.use_email_instead
                                            : lang.use_phone_instead
                                    }}</a
                                >
                            </div>

                            <!--  -->
                            <div
                                class="grid-2"
                                v-if="optionTo == 'phone'"
                                :class="{
                                    'mt-4': !addons.includes('otp_system'),
                                }"
                            >
                                <!-- Main Password -->
                                <div class="input-group">
                                    <label for="password">{{
                                        lang.Password
                                    }}</label>
                                    <div class="password-container">
                                        <input
                                            :type="
                                                isMainPasswordVisible
                                                    ? 'text'
                                                    : 'password'
                                            "
                                            v-model="form.password"
                                            class="form-control"
                                            :class="{
                                                error_border: errors.password,
                                            }"
                                            :placeholder="lang.Password"
                                        />
                                        <button
                                            type="button"
                                            @click="
                                                isMainPasswordVisible =
                                                    !isMainPasswordVisible
                                            "
                                        >
                                            <span v-if="isMainPasswordVisible"
                                                ><i class="ri-eye-off-line"></i
                                            ></span>
                                            <span v-else
                                                ><i class="ri-eye-line"></i
                                            ></span>
                                        </button>
                                    </div>
                                    <p>
                                        <span
                                            class="validation_error"
                                            v-if="
                                                errors.password &&
                                                optionTo == 'phone'
                                            "
                                            >{{ errors.password[0] }}</span
                                        >
                                    </p>
                                </div>

                                <!-- Confirm Password -->
                                <div
                                    class="input-group"
                                    v-if="optionTo == 'phone'"
                                    :class="{
                                        'mt-4': !addons.includes('otp_system'),
                                    }"
                                >
                                    <label for="c_password">{{
                                        lang.password_confirmation
                                    }}</label>
                                    <div class="password-container">
                                        <input
                                            :type="
                                                isConfirmPasswordVisible
                                                    ? 'text'
                                                    : 'password'
                                            "
                                            v-model="form.password_confirmation"
                                            class="form-control"
                                            :class="{
                                                error_border:
                                                    errors.password_confirmation,
                                            }"
                                            :placeholder="
                                                lang.password_confirmation
                                            "
                                        />
                                        <button
                                            type="button"
                                            @click="
                                                isConfirmPasswordVisible =
                                                    !isConfirmPasswordVisible
                                            "
                                        >
                                            <span
                                                v-if="isConfirmPasswordVisible"
                                                ><i class="ri-eye-off-line"></i
                                            ></span>
                                            <span v-else
                                                ><i class="ri-eye-line"></i
                                            ></span>
                                        </button>
                                    </div>

                                    <span
                                        class="validation_error"
                                        v-if="
                                            errors.password_confirmation &&
                                            optionTo == 'phone'
                                        "
                                        >{{
                                            errors.password_confirmation[0]
                                        }}</span
                                    >
                                </div>
                            </div>

                            <!-- for otp code -->
                            <div
                                class="form-group mt-4"
                                v-if="
                                    addons.includes('otp_system') &&
                                    otp &&
                                    !settings.disable_otp
                                "
                            >
                                <span
                                    class="mdi mdi-name mdi-lock-outline"
                                ></span>
                                <input
                                    type="text"
                                    v-model="form.otp"
                                    class="form-control otp mb-0"
                                    :class="{ error_border: errors.otp }"
                                    :placeholder="lang.enter_oTP"
                                />
                            </div>
                            <div v-if="addons.includes('otp_system') && otp">
                                <p
                                    class="count_down_timer"
                                    v-if="!settings.disable_otp"
                                >
                                    <span
                                        v-if="otp && minute >= 0 && second >= 0"
                                        >0{{ minute }}:{{ second }}</span
                                    >
                                    <span @click="registerByPhone" v-else>{{
                                        lang.otp_request
                                    }}</span>
                                </p>
                            </div>
                            <!-- for otp code -->

                            <GdPrPage
                                ref="customer_agreement"
                                :agreements="settings.customer_agreement"
                            />

                            <div class="btn__submit">
                                <button
                                    type="submit"
                                    class="btn btn-primary w-100"
                                    v-if="otp && !loading"
                                    :class="{
                                        disable_btn:
                                            form.otp.length != 5 &&
                                            !settings.disable_otp,
                                    }"
                                >
                                    {{ lang.sign_up }}
                                </button>

                                <button
                                    type="submit"
                                    class="btn btn-primary w-100 text-uppercase"
                                    v-else-if="optionTo == 'phone' && !loading"
                                >
                                    {{ lang.sign_up }}
                                </button>
                                <loading_button
                                    v-if="loading"
                                    :class_name="'btn btn-primary w-100 text-uppercase'"
                                ></loading_button>
                                <button
                                    type="button"
                                    @click="registerByPhone"
                                    class="btn btn-primary w-100 text-uppercase"
                                    v-else-if="optionTo == 'email' && !otp"
                                >
                                    {{ lang.get_oTP }}
                                </button>
                            </div>
                            <p class="account text-center">
                                {{ lang.have_an_account }}
                                <router-link :to="{ name: 'login' }">{{
                                    lang.sign_in
                                }}</router-link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- SignUp  Section End -->
</template>

<script>
import GdPrPage from "@/components/GdPr_Page.vue";
import Telephone from "@/components/Telephone.vue";
import {
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    TwitterAuthProvider,
} from "firebase/auth";

import { setToast } from "@/utils/toast.js";

export default {
    components: {
        GdPrPage,
        Telephone,
    },
    data() {
        return {
            static_image_url: this.getUrl("frontends/images/"),
            // Toggle between Email and Phone input
            isEmail: true,
            email: "",
            phone: "",

            // Passwords and their visibility toggles
            mainPassword: "",
            confirmPassword: "",
            isMainPasswordVisible: false,
            isConfirmPasswordVisible: false,

            form: {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                password_confirmation: "",
                phone: "",
                address: "",
                phone_no: "",
                otp: "",
                user_type: this.$route.params.type,
                country_id: "",
            },
            optionTo: "phone",
            social_login_active: false,
            loading: false,
            buttonText: "Get OTP",
            phone_no: "",
            minute: 1,
            second: 60,
            otp: "",
            agreement: "",
            country_code: [],
        };
    },

    watch: {
        $route(from, to) {
            this.form.user_type = from.params.type;
        },
    },

    computed: {
        loginRedirect() {
            return this.$store.getters.getLoginRedirection;
        },
    },

    methods: {
        // Toggle visibility for confirm password
        toggleConfirmPasswordVisibility() {
            this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
        },

        countDownTimer() {
            this.minute = 1;
            this.second = 60;
            setInterval(() => {
                this.second--;
                if (this.second == 0) {
                    this.minute--;
                    this.second = 60;
                    if (this.minute == 0) {
                        this.minute = 0;
                    }
                }
            }, 1000);
        },
        register() {
            if (!this.$refs.customer_agreement.checkAgreements()) {
                return this.$toast.info(
                    this.lang.accept_terms,
                    this.lang.Error + " !!"
                );
            }
            this.loading = true;
            let url = this.getUrl("register");
            this.form.real_otp = this.otp;
            if (this.form.real_otp != this.otp) {
                this.$toast.error(
                    this.lang.OTP_doesnt_match,
                    this.lang.Error + " !!"
                );
            }
            axios
                .post(url, this.form)
                .then((response) => {
                    this.loading = false;
                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    }
                    if (response.data.success) {
                        if (response.data.type == 1) {
                            this.$store.dispatch(
                                "user",
                                response.data.auth_user
                            );
                            setToast("success", 'Successfully Registered')
                            this.$router.push({ name: "dashboard" });
                        } else {
                            setToast("success", "Please Check your email! The account activation URL has been sent to your email.")
                            this.$router.push({ name: "login" });
                        }

                        this.errors = [];
                        setToast("success", response.data.success)
                    }
                })
                .catch((error) => {
                    this.loading = false;
                    // 
                    if (error.response && error.response.status == 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        },

        socialLogin(form) {
            this.social_login_active = true;
            let url = this.getUrl("social-login");
            axios
                .post(url, form)
                .then((response) => {
                    this.loading = false;
                    this.social_login_active = false;
                    if (response.data.success) {
                        this.errors = [];
                        if (this.loginRedirect) {
                            this.$router.push({ name: this.loginRedirect });
                        } else {
                            this.$router.push({ name: "dashboard" });

                            this.$store.dispatch("carts", response.data.carts);
                            this.$store.dispatch("user", response.data.user);
                            this.$store.dispatch(
                                "compareList",
                                response.data.compare_list
                            );
                            this.$store.dispatch(
                                "wishlists",
                                response.data.wishlists
                            );
                        }
                    } else {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    }
                })
                .catch((error) => {
                    this.loading = false;
                    this.social_login_active = false;
                    this.$toast.error(
                        "Something Went Wrong, Please Try Again",
                        this.lang.Error + " !!"
                    );
                });
        },
        loginWithSocial(type) {
            let provider = "";
            if (type == "fb") {
                provider = new FacebookAuthProvider();
                provider.addScope("user_birthday");
                provider.addScope("user_gender");
                provider.addScope("public_profile");
            } else if (type == "google") {
                provider = new GoogleAuthProvider();
                provider.addScope("profile");
                provider.addScope("email");
            } else if (type == "twitter") {
                provider = new TwitterAuthProvider();
            }

            const auth = getAuth();

            signInWithPopup(auth, provider)
                .then((result) => {
                    let raw_user = JSON.parse(
                        result._tokenResponse.rawUserInfo
                    );

                    let credential = "";
                    let picture = "";

                    if (type == "fb") {
                        credential =
                            FacebookAuthProvider.credentialFromResult(result);
                        picture = raw_user.picture
                            ? raw_user.picture.data.url
                            : "";
                    } else if (type == "google") {
                        credential =
                            GoogleAuthProvider.credentialFromResult(result);
                        picture = raw_user.picture ? raw_user.picture : "";
                    } else if (type == "twitter") {
                        credential =
                            TwitterAuthProvider.credentialFromResult(result);
                        picture = raw_user.picture ? raw_user.picture : "";
                    }

                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;

                    let form = {
                        name: raw_user.name ? raw_user.name : "",
                        email: raw_user.email ? raw_user.email : "",
                        phone: raw_user.phoneNumber ? raw_user.phoneNumber : "",
                        uid: user.uid,
                        dob: raw_user.birthday,
                        gender: raw_user.gender,
                        image: picture,
                    };

                    this.socialLogin(form);
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential =
                        GoogleAuthProvider.credentialFromError(error);
                    // ...
                });
        },
        loginOptions(optionTo) {
            if (optionTo) {
                if (optionTo == "phone") {
                    if (this.settings.disable_otp) {
                        this.otp = true;
                    }
                    this.buttonText = "Get OTP";
                    this.optionTo = "email";
                } else {
                    this.buttonText = "Sign Up";
                    this.optionTo = "phone";
                }
            } else {
                if (this.addons.includes("otp_system")) {
                    this.optionTo = "email";
                    if (this.settings.disable_otp) {
                        this.otp = true;
                    }
                    this.buttonText = "Get OTP";
                } else {
                    this.buttonText = "Sign Up";
                    this.optionTo = "phone";
                }
            }
        },
        registerByPhone() {
            this.form.email = null;
            if (!this.$refs.customer_agreement.checkAgreements()) {
                return this.$toast.info(
                    this.lang.accept_terms,
                    this.lang.Error + " !!"
                );
            }
            let url = this.getUrl("register/by-phone");

            this.loading = true;
            axios
                .post(url, this.form)
                .then((response) => {
                    this.loading = false;
                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        this.$toast.success(
                            response.data.data,
                            this.lang.Success + " !!"
                        );
                        this.errors = [];
                        this.otp = true;
                        this.countDownTimer();
                    }
                })
                .catch((error) => {
                    this.loading = false;
                    //
                    if (error.response && error.response.status == 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        },
        getNumber(number) {
            // alert(number);
            this.form.phone = number;
        },
        setCountry(id) {
            this.form.country_id = id;
        },
    },

    mounted() {
        this.loginOptions();
    },
};
</script>
