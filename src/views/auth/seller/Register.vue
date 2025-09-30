<template lang="html">
    <!-- SignUp  Section Start -->
    <section class="signup-section pt-40 pb-100">
        <div class="container">
            <div class="signupForm-wrapper">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <div class="signup-thumb">
                            <img
                                :src="settings.seller_sing_up_banner"
                                :alt="form.user_type"
                            />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <form @submit.prevent="register" class="signup-form">
                            <div class="title">
                                {{ lang.sign_in }}
                                <p>{{ lang.sign_continue_shopping }}</p>
                            </div>

                            <template v-if="form.user_type == 'seller'">{{
                                lang.personal_info
                            }}</template>


                            <!-- first name -->
                            <div class="input-group">
                                <label>{{ lang.first_name }}</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="form.first_name"
                                    :class="{ error_border: errors.first_name }"
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

                            <!-- last name -->
                            <div class="input-group">
                                <label>{{ lang.last_name }}</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="form.last_name"
                                    :class="{ error_border: errors.last_name }"
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

                            <!-- email -->
                            <div class="input-group">
                                <label for="email">{{ lang.email }}</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    v-model="form.email"
                                    :class="{ error_border: errors.email }"
                                    :placeholder="lang.email"
                                />
                                <p>
                                    <span
                                        class="validation_error"
                                        v-if="errors.email"
                                        >{{ errors.email[0] }}</span
                                    >
                                </p>
                            </div>

                            <!-- phone -->
                            <div class="input-group">
                                <label for="email">{{ lang.phone }}</label>
                                <Telephone
                                    @phone_no="getNumber"
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

                            <!-- password -->
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
                                        v-if="errors.password"
                                        >{{ errors.password[0] }}</span
                                    >
                                </p>
                            </div>

                            <!-- password confirmation -->
                            <div class="input-group">
                                <label for="password">{{
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
                                        <span v-if="isConfirmPasswordVisible"
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
                                        v-if="errors.password_confirmation"
                                        >{{
                                            errors.password_confirmation[0]
                                        }}</span
                                    >
                                </p>
                            </div>


                            <h5 class="registration_heading" v-if="form.user_type == 'seller'">{{ lang.shop_info }}</h5>

                            <!-- shop name -->
                            <div class="input-group">
                                <label>{{ lang.shop_name }}</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="form.shop_name"
                                    :class="{ error_border: errors.shop_name }"
                                    :placeholder="lang.shop_name"
                                />
                                <p>
                                    <span
                                        class="validation_error"
                                        v-if="errors.shop_name"
                                        >{{ errors.shop_name[0] }}</span
                                    >
                                </p>
                            </div>


                            <!-- shop Address -->
                            <div class="input-group">
                                <label>{{ lang.shop_address }}</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="form.address"
                                    :class="{ error_border: errors.address }"
                                    :placeholder="lang.shop_address"
                                />
                                <p>
                                    <span
                                        class="validation_error"
                                        v-if="errors.address"
                                        >{{ errors.address[0] }}</span
                                    >
                                </p>
                            </div>

                            <GdPrPage
                                ref="seller_agreement"
                                :agreements="settings.seller_agreement"
                            />


                            <div
                                v-if="settings.is_recaptcha_activated == 1"
                                class="g-recaptcha mb-2"
                                :class="optionTo == 'email' ? 'd-none' : ''"
                                data-callback="myCallback"
                                :data-sitekey="settings.recaptcha_Site_key"
                            ></div>

                            <div class="btn__submit">
                                <loading_button
                                    v-if="loading"
                                    :class_name="'btn btn-primary w-100'"
                                ></loading_button>
                                <button
                                    type="submit"
                                    v-else
                                    class="btn btn btn-primary w-100"
                                >
                                    {{ lang.sign_up }}
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
import Telephone from "@/components/Telephone.vue";
import GdPrPage from "@/components/GdPr_Page.vue";

export default {
    components: {
        Telephone,
        GdPrPage
    },

    data() {
        return {
            static_image_url: this.getUrl("frontends/images/"),
            // Password fields
            isMainPasswordVisible: false,
            isConfirmPasswordVisible: false,

            form: {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                password_confirmation: "",
                shop_name: "",
                phone: "",
                address: "",
                phone_no: "",
                otp: "",
                user_type: this.$route.params.type,
                country_id: "",
            },

            loading: false,
            agreement: null,
        };
    },

    methods: {
        getNumber(args) {
            this.form.phone = args;
        },
        setCountry(args) {
            this.form.country_id = args;
        },

        register() {
            if (!this.$refs.seller_agreement.checkAgreements()) {
                return this.$toast.info(
                    this.lang.accept_terms,
                    this.lang.Error + " !!"
                );
            }

            let url = this.getUrl("seller-register");
            this.loading = true;
            this.form.real_otp = this.otp;
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
                        this.$router.push({ name: "login" });
                        this.errors = [];
                        this.$toast.success(
                            response.data.success,
                            this.lang.Success + " !!"
                        );
                    }
                })
                .catch((error) => {
                    this.loading = false;
                    if (error.response && error.response.status == 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        },
    },

    // end of object
};
</script>
