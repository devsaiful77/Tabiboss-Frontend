<template>
    <!-- Product Item Start -->
    <div :class="['productlistItem', loading ? 'skeleton' : '']">
        <!-- Thumb -->
        <div class="productThumb-wrapper">
            <!-- Conditional Rendering for Badges -->
            <div v-if="item.badge_text === 'Sale'" class="badge badge-success">{{ item.badge_text }}</div>
            <div v-else-if="item.badge_text === 'New'" class="badge badge-warning">{{ item.badge_text }}</div>
            <div v-else-if="item.badge_text === 'Hot'" class="badge badge-danger">{{ item.badge_text }}</div>
            <!-- <div class="badge">-20%</div> -->
            
            <router-link class="productThumb" :to="{ name: 'productSingle' }">
                <img :src="item.thumb" :alt="item.title" />
            </router-link>
        </div>
        <!-- Content Start -->
        <div class="product-content">
            <div class="product-meta">
                <div class="product-category">Apple</div>
                <div class="product-status">Sold 10</div>
            </div>
            <h5 class="title text-ellips">
                <router-link :to="{ name: 'productSingle' }">{{ item.title }}</router-link>
            </h5>
            <ul class="feature-list">
                <li>Immersive 24-inch 4.5K Retina display.</li>
                <li>Immersive 24-inch 4.5K Retina display.</li>
                <li>Immersive 24-inch 4.5K Retina display.</li>
                <li>Immersive 24-inch 4.5K Retina display.</li>
            </ul>
        </div>
        <!-- Product Price -->
        <div class="pricing-wrapper">
            <span class="price">${{ item.price }} <del v-if="item.discount">${{ item.discount }}</del></span>
            <a href="#" class="addCart-btn btn btn-primary" >Add To Cart</a>
            <div class="product-actions">
                <a href="#" class="action-btn wishlist"><i class="ri-heart-3-fill"></i>Add Wishlist</a>
                <a href="#" class="action-btn "><i class="ri-scales-3-fill"></i>Compare </a>
            </div>
         </div>
    </div>
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
