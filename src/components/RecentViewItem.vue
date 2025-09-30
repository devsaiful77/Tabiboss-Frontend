<template>
    <!-- Recent View Item -->
    <div :class="['recentViewItem', loading ? 'skeleton' : '']">
        <div class="recentViewItem-thumb">
            <a href="#" class="thumb-inner">
                <img :src="static_image_url + item.thumb" alt="item.title" />
            </a>
        </div>
        <div class="recentViewItem-content">
            <div class="rating">
                <div class="d-flex">
                    <i class="active ri-star-fill"></i>
                    <i class="active ri-star-fill"></i>
                    <i class="active ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                </div>
                <div class="d-flex">
                    <div class="count">{{ item.totalRating }}</div>
                    ({{ item.ratingTxt }})
                </div>
            </div>
            <span class="price"
                >${{ item.price }}
                <del v-if="item.discount">${{ item.discount }}</del></span
            >
            <h5 class="title">
                <a href="#">{{ item.title }}</a>
            </h5>
        </div>
    </div>
    <!-- Recent View Item -->
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";

// Define props using defineProps
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

// State for loading
const loading = ref(true);

// Simulate data loading
onMounted(() => {
    setTimeout(() => {
        loading.value = false; // Set loading to false after data is ready
    }, 1500); // 2-second simulated delay
});
</script>
