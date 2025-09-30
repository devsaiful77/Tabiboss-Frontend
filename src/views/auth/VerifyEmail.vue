<template lang="html">
    <!-- SignUp  Section Start -->
    <section class="signup-section pt-40 pb-100">
        <div class="container">
            <div class="signupForm-wrapper">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <div class="signup-thumb">
                            <img
                                :src="static_image_url + 'signup/signup.jpg'"
                                alt="title"
                            />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <form action="#" class="signup-form">
                            <div class="forget-thumb">
                                <img
                                    :src="
                                        static_image_url +
                                        'signup/forget-thumb.svg'
                                    "
                                    alt="title"
                                />
                            </div>
                            <!-- <div class="title text-center mb-40">Don’t Worry!</div>  -->
                            <!--  -->
                            <div class="input-group mb-25">
                                <label for="email" class="text-center"
                                    >Code has been send to
                                    info@spagreen.net</label
                                >
                                <div class="verify-otp">
                                    <v-otp-input
                                        ref="otpInput"
                                        input-classes="otp-input"
                                        :conditionalClass="[
                                            'one',
                                            'two',
                                            'three',
                                            'four',
                                        ]"
                                        separator=""
                                        inputType="letter-numeric"
                                        :num-inputs="4"
                                        v-model:value="bindValue"
                                        :should-auto-focus="true"
                                        :should-focus-order="true"
                                        @on-change="handleOnChange"
                                        @on-complete="handleOnComplete"
                                        :placeholder="['', '', '', '']"
                                    />
                                </div>
                                <div class="otp-duration">
                                    Resend code in 33 s
                                </div>
                            </div>
                            <div class="btn__submit">
                                <!-- <button type="submit" class="btn btn-primary w-100">Verify Now</button> -->
                                <router-link
                                    class="btn btn-primary w-100"
                                    :to="{ name: 'changepassword' }"
                                    >Verify Now</router-link
                                >
                            </div>
                            <p class="account text-center">
                                Back to
                                <router-link :to="{ name: 'signin' }"
                                    >Sign In</router-link
                                >
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- SignUp  Section End -->
</template>

<script setup>

import { ref } from "vue";
import VOtpInput from "vue3-otp-input";

// Refs for OTP Input and binding modal
const otpInput = ref(null); // Instance of VOtpInput
const bindModal = ref(""); // Value for OTP input

// Event Handlers
const handleOnComplete = (value) => {
    console.log("OTP completed: ", value);
};

const handleOnChange = (value) => {
    console.log("OTP changed: ", value);
};

// Utility Functions
const clearInput = () => {
    otpInput.value?.clearInput();
};

const fillInput = (value) => {
    otpInput.value?.fillInput(value);
};
</script>
