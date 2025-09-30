<template>
    <!-- Brand Item Start -->
    <router-link :class="['brandItem', loading ? 'skeleton' : '']" to="#">
        <div class="brandItem-thumb">
            <img :src="static_image_url + item.thumb" alt="item.title">
        </div>
        <div class="brandItem-content">
            <h4 class="title">{{ item.title }}</h4>
        </div>
    </router-link>
    <!-- Brand Item End -->
</template>

<script setup>
    import { ref, onMounted, defineProps } from 'vue';
    
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