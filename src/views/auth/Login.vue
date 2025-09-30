<template lang="html">
    <!-- SignUp  Section Start -->
    <section class="signup-section pt-40 pb-100">
        <div class="container">
            <div class="signupForm-wrapper">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                    <!-- {{ settings.login_banner }} -->
                        <div class="signup-thumb">
                            <img loading="lazy" :src="settings.login_banner" alt="login_banner" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <form  @submit.prevent="login" class="signup-form">
                            <div class="title">
                                {{ lang.sign_in }}
                                <p>{{ lang.sign_continue_shopping }}</p>
                            </div>
                            <!-- Social Login start -->
                            <div class="instant-login" v-if="settings.is_facebook_login_activated == 1 || settings.is_google_login_activated == 1 || settings.is_twitter_login_activated == 1">
                                <div class="login-action">
                                    <a v-if="settings.is_google_login_activated == 1" href="javascript:void(0)" @click="loginWithSocial('google')">
                                        <img
                                            :src="
                                                static_image_url + 'google.svg'
                                            "
                                            alt="google"
                                        />
                                        {{ lang.google }}
                                    </a>
                                    <a v-if="settings.is_facebook_login_activated == 1" href="javascript:void(0)" @click="loginWithSocial('fb')">
                                        <img
                                            :src="
                                                static_image_url +
                                                'facebook.svg'
                                            "
                                            alt="facebook"
                                        />
                                        {{ lang.facebook }}
                                    </a>
                                    <a v-if="settings.is_twitter_login_activated == 1" href="javascript:void(0)" @click="loginWithSocial('twitter')">
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
                            <!-- social Login Register -->
                            <div class="devider text-center">
                                <span>{{ lang.or_continue_with }}</span>
                            </div>
                            {{ lang.sign_in }}
                            <!-- email -->
                            <div class="input-group" v-if="optionTo=='phone'">
                                <label for="email">{{ lang.email }}</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    v-model="form.email"
                                    :class="{ 'error_border' : errors.email }"
                                    :placeholder="lang.email"
                                />
                                <p>
                                    <span class="validation_error" v-if="errors.email">{{ errors.email[0] }}</span>
                                </p>
                            </div>


                            <!-- phone -->
                            <div class="input-group" v-if="optionTo=='email'">
                                <label for="email">{{ lang.phone }}</label>
                                <Telephone @phone_no="getNumber" :phone_error="errors.phone ? errors.phone[0] : null" />
                                <p>
                                    <span class="validation_error" v-if="errors.phone">{{ errors.phone[0] }}</span>
                                </p>
                            </div>

                            <!-- use phone or email -->
                            <div class="form-group mb-3 text-end" v-if="addons.includes('otp_system') && !otp_field">
                                <a href="javaScript:void(0)" class="btn sign-in-option" @click="loginOptions(optionTo)">{{
                                    optionTo == 'email' ? lang.use_email_instead : lang.use_phone_instead
                                  }}</a>
                            </div>
                            <div class="form-group mt-4" v-if="otp_field">
                                <span class="mdi mdi-name mdi-lock-outline"></span>
                                <input type="text" v-model="phoneForm.otp" class="form-control" :placeholder="lang.enter_your_otp">
                            </div>


                            <!-- password -->
                            <div v-if="optionTo=='phone'">
                                <!-- Main Password -->
                                <div class="input-group">
                                    <label for="password">{{ lang.Password }}</label>
                                    <div class="password-container">
                                        <input
                                            :type="
                                                isMainPasswordVisible
                                                    ? 'text'
                                                    : 'password'
                                            "
                                            v-model="form.password"
                                            class="form-control"
                                           :class="{ 'error_border' : errors.password }"
                                           :placeholder="lang.Password"
                                        />
                                        <button
                                            type="button"
                                            @click="isMainPasswordVisible = !isMainPasswordVisible"
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
                                        <span class="validation_error" v-if="errors.password">{{ errors.password[0] }}</span>
                                    </p>
                                </div>
                            </div>

                            <div class="flex-input" v-if="optionTo == 'phone'">
                                <div class="default-checkbox">
                                    <input
                                        type="checkbox"
                                        class="form-check-input"
                                        id="policyCheck"
                                        v-model="form.remember" value="1"
                                    />
                                    <label
                                        class="form-check-label"
                                        for="policyCheck"
                                        >{{ lang.remember_me }}</label
                                    >
                                </div>
                                <router-link
                                    class="forget"
                                    :to="{ name: 'reset.password' }"
                                    >{{ lang.forgot_your_password }}</router-link
                                >
                            </div>

                            <div v-if="settings.is_recaptcha_activated == 1" class="g-recaptcha mb-2"
                                   :class="optionTo == 'email' ? 'd-none': ''" data-callback="myCallback"
                                   :data-sitekey="settings.recaptcha_Site_key">
                            </div>

                            <div class="btn__submit">
                                <loading_button v-if="loading" :class_name="'btn btn-primary w-100'"></loading_button>
                                <button type="submit" v-else class="btn btn btn-primary w-100">{{ buttonText }}</button>
                            </div>

                            <!-- demo user login -->
                            <div class="login-type" v-if="settings.demo_mode && !loading">
                                <button type="button" href="javascript:void(0)" @click="copyLoginInfo('admin@spagreen.net')"
                                        class="btn btn-secondary copy_btn">Admin
                                </button>
                                <button v-if="settings.seller_system == 1" type="button" href="javascript:void(0)"
                                        @click="copyLoginInfo('seller@spagreen.net')" class="btn btn-secondary copy_btn">Seller
                                </button>
                                <button type="button" href="javascript:void(0)" @click="copyLoginInfo('customer@spagreen.net')"
                                        class="btn btn-secondary copy_btn">Customer
                                </button>
                                <button type="button" href="javascript:void(0)" @click="copyLoginInfo('staff@spagreen.net')"
                                        class="btn btn-secondary copy_btn">Staff
                                </button>
                            </div>
                            <!-- demo user login -->


                            <p class="account text-center">
                                {{ lang.don_have_an_account }}
                                <router-link :to="{ name: 'register' }">{{ lang.sign_up }}</router-link>
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
import Telephone from "@/components/Telephone.vue";
import { setToast } from "@/utils/toast";
import {
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    TwitterAuthProvider,
} from "firebase/auth";

export default {
    components: {
        Telephone,
    },

    data() {
        return {
            static_image_url: this.getUrl("frontends/images/"),
            // Password fields
            mainPassword: "",
            confirmPassword: "",
            isMainPasswordVisible: false,
            isConfirmPasswordVisible: false,

            form: {
                email: "",
                password: "",
                _token: this.token,
                remember: 0,
                captcha: "",
            },
            phoneForm: {
                phone: "",
                otp: "",
            },
            otp_field: false,
            loading: false,
            optionTo: "phone",
            buttonText: "Sign In",
            social_login_active: false,
        };
    },

    mounted() {
        if (this.authUser) {
            this.$router.go(-1);
        }
        if (this.settings.is_recaptcha_activated == 1) {
            this.captcha();
        }
        this.loginOptions();
    },
    watch: {
        lang() {
            this.loginOptions();
        },
    },
    computed: {
        loginRedirect() {
            return this.$store.getters.getLoginRedirection;
        },
    },

    methods: {
        login(direct_login) {
            let form = this.form;
            let url = this.getUrl("login");
            if (direct_login == "direct_login") {
                this.form.captcha = "1";
            } else {
                if (
                    this.settings.is_recaptcha_activated == 1 &&
                    this.optionTo == "phone"
                ) {
                    let captcha = window.captcha;

                    if (captcha) {
                        this.form.captcha = captcha;
                    } else {
                        return this.$toast.warning(
                            this.lang.verify_google_recaptcha,
                            this.lang.Warning + " !!"
                        );
                    }
                }
            }

            const axiosWithCredentials = axios.create({
                withCredentials: true,
            });
            this.$store.commit("getCountCompare", true);

            if (direct_login != "direct_login") {
                if (this.optionTo == "phone") {
                    form = this.form;
                } else if (this.optionTo == "email" && !this.otp_field) {
                    if (!this.settings.disable_otp) {
                        url = this.getUrl("get-otp");
                    }
                    form = this.phoneForm;
                } else if (this.otp_field) {
                    url = this.getUrl("submit-otp");
                    form = this.phoneForm;
                }
            }

            this.loading = true;

            axiosWithCredentials
                .post(url, form)
                .then((response) => {
                    this.loading = false;
                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    }

                    if (response.data.success) {
                        window.captcha = "";
                        this.errors = [];

                        if (
                            this.optionTo == "email" &&
                            !this.otp_field &&
                            direct_login != "direct_login" &&
                            !this.settings.disable_otp
                        ) {
                            this.otp_field = true;
                            this.buttonText = this.lang.sign_in;
                        } else {


                            if (this.loginRedirect) {
                                this.$router.push({ name: this.loginRedirect });
                            } else {
                                let user = response.data.user;
                                if (user.user_type == "customer") {
                                    setToast("success",'Successfully Login')
                                    this.$router.push({ name: "dashboard" });
                                } else if (
                                    user.user_type == "admin" ||
                                    user.user_type == "staff"
                                ) {
                                    this.loading = true;
                                    document.location.href =
                                        this.getUrl("admin/dashboard");
                                } else if (user.user_type == "seller") {
                                    this.loading = true;
                                    document.location.href =
                                        this.getUrl("seller/dashboard");
                                }
                            }

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
                    }
                })
                .catch((error) => {
                    this.loading = false;
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


        loginOptions(optionTo) {
            this.errors = [];
            if (optionTo) {
                if (optionTo == "phone") {
                    if (this.settings.disable_otp) {
                        this.buttonText = this.lang.sign_in;
                    } else {
                        this.buttonText = this.lang.get_oTP;
                    }
                    this.optionTo = "email";
                } else {
                    this.buttonText = this.lang.sign_in;
                    this.optionTo = "phone";
                }
            } else {
                if (this.addons.includes("otp_system")) {
                    this.optionTo = "email";
                    if (this.settings.disable_otp) {
                        this.buttonText = this.lang.sign_in;
                    } else {
                        this.buttonText = this.lang.get_oTP;
                    }
                } else {
                    this.buttonText = this.lang.sign_in;
                    this.optionTo = "phone";
                }
            }
        },
        captcha() {
            const script = document.createElement("script");
            script.src = "https://www.google.com/recaptcha/api.js";
            document.body.appendChild(script);
        },
        copyLoginInfo(email) {
            this.form.email = email;
            this.form.password = "123456";
            this.login("direct_login");
        },
        getNumber(number) {
            this.phoneForm.phone = number;
        },


        loginWithSocial(type) {

            


            let provider = "";
            if (type == "fb") {
                provider = new FacebookAuthProvider();
                // provider.addScope("user_birthday");
                // provider.addScope("user_gender");
                // provider.addScope("public_profile");

                provider.addScope("public_profile");
                provider.addScope("email");


            } else if (type == "google") {
                provider = new GoogleAuthProvider();
                provider.addScope("profile");
                provider.addScope("email");
            } else if (type == "twitter") {
                provider = new TwitterAuthProvider();
            }

            

            const auth = getAuth();

            console.log('okay....');

            signInWithPopup(auth, provider)
                .then((result) => {

                    console.log(result, type);
                    console.log("okay", provider, auth);


                    let raw_user = JSON.parse(
                        result._tokenResponse.rawUserInfo
                    );

                    console.log(raw_user);


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

                    console.log(user);

                    let form = {
                        name: raw_user.name ? raw_user.name : "",
                        email: raw_user.email ? raw_user.email : "",
                        phone: raw_user.phoneNumber ? raw_user.phoneNumber : "",
                        uid: user.uid,
                        dob: raw_user.birthday,
                        gender: raw_user.gender,
                        image: picture,
                    };

                    console.log(form);


                    this.socialLogin(form);
                })
                .catch((error) => {


                    console.log(error);
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


        langKeywords() {
            let url = this.getUrl("language/keywords");
            axios.get(url).then((response) => {
                if (response.data.error) {
                    this.$toast.info(response.data.error, this.lang.Info + " !!");
                } else {
                    this.$store.commit("setLangKeywords", response.data.lang);
                    let language = response.data.language;
                    if (language.text_direction == "rtl") {
                        document.body.setAttribute("dir", "rtl");
                        this.settings.text_direction = "rtl";
                    }
                }
            });
        },
    },

    // end of object
};
</script>
