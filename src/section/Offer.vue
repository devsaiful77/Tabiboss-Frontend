<template>
    <!-- Offer Section Start -->
    <section class="offer-section pt-30 pb-10">
        <div class="container">
            <div class="row">
                <div
                    class="col-lg-6 col-sm-6"
                    v-for="(item, index) in OfferLoop"
                    :key="index"
                >
                    <div class="campain-wrapper">
                        <router-link to="#" class="campain-thumb">
                            <img
                                :src="static_image_url + item.offer_thumb"
                                alt=""
                            />
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Offer Section End -->
</template>

<script setup>
import { ref } from 'vue';
// Offer Data here
const OfferLoop = ref([
    { offer_thumb: "offer/offer-01.jpg" },
    { offer_thumb: "offer/offer-02.jpg" },
]);
</script>
