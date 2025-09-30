<template>
    <!-- Vendor Item Start -->
    <div :class="['vendorItem', loading ? 'skeleton' : '']">
        <div class="vendorItem-header">
            <div class="thumb">
                <img :src="static_image_url + items.vendor_thumb" alt="items.vendor_title" />
            </div>
            <div class="content">
                <h4 class="vendor-title">{{ items.vendor_title }}</h4>
                <p class="vendor-item">{{ items.vendor_item }}</p>
            </div>
        </div>
        <div class="vendor-wrapper">
            <a
                v-for="(item, index) in items.VendorSingleData"
                :key="index"
                :href="item.vendor_link"
                class="single-item"
            >
                <img :src="static_image_url + item.vendor_thumb" alt="items.vendor_title" />
            </a>
        </div>
    </div>
    <!-- Vendor Item End -->
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";

// Define props with the Composition API
const props = defineProps({
    items: {
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
