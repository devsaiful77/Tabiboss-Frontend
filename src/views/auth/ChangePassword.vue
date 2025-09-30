<template>
    <Breadcrumb />
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
                            <!--  -->
                            <div class="input-group">
                                <label for="password">Password</label>
                                <div class="password-container">
                                    <input
                                        :type="
                                            isMainPasswordVisible
                                                ? 'text'
                                                : 'password'
                                        "
                                        class="form-control"
                                        id="password"
                                        v-model="mainPassword"
                                        placeholder="********************"
                                        required
                                    />
                                    <button
                                        type="button"
                                        @click="toggleMainPasswordVisibility"
                                    >
                                        <span v-if="isMainPasswordVisible"
                                            ><i class="ri-eye-off-line"></i
                                        ></span>
                                        <span v-else
                                            ><i class="ri-eye-line"></i
                                        ></span>
                                    </button>
                                </div>
                            </div>

                            <!-- Confirm Password -->
                            <div class="input-group">
                                <label for="c_password">Confirm Password</label>
                                <div class="password-container">
                                    <input
                                        :type="
                                            isConfirmPasswordVisible
                                                ? 'text'
                                                : 'password'
                                        "
                                        class="form-control"
                                        id="c_password"
                                        v-model="confirmPassword"
                                        placeholder="********************"
                                        required
                                    />
                                    <button
                                        type="button"
                                        @click="toggleConfirmPasswordVisibility"
                                    >
                                        <span v-if="isConfirmPasswordVisible"
                                            ><i class="ri-eye-off-line"></i
                                        ></span>
                                        <span v-else
                                            ><i class="ri-eye-line"></i
                                        ></span>
                                    </button>
                                </div>
                            </div>
                            <div class="flex-input">
                                <div class="default-checkbox">
                                    <input
                                        type="checkbox"
                                        class="form-check-input"
                                        id="policyCheck"
                                    />
                                    <label
                                        class="form-check-label"
                                        for="policyCheck"
                                        >reminder me</label
                                    >
                                </div>
                            </div>
                            <div class="btn__submit">
                                <button
                                    type="submit"
                                    class="btn btn-primary w-100"
                                >
                                    Change Password
                                </button>
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
import Breadcrumb from "@/components/Breadcrumb.vue";
import { ref } from "vue";
// Only For Email & Phone
const isEmail = ref(true); // Reactive state to toggle between Email and Phone input
const email = ref("");
const phone = ref("");

// Toggle function to switch between Email and Phone inputs
const toggleInputType = () => {
    isEmail.value = !isEmail.value;
};

// Reactive variables for the main and confirm password
const mainPassword = ref("");
const confirmPassword = ref("");
const isMainPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

// Toggles for each password field
const toggleMainPasswordVisibility = () => {
    isMainPasswordVisible.value = !isMainPasswordVisible.value;
};
const toggleConfirmPasswordVisibility = () => {
    isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
};
</script>
