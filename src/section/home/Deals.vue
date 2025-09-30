<template>
    <!-- Deals Section Start -->
    <section class="deals-section pt-60 pb-30">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <SectionTitle :item="sectionTitleData" />
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="deals-wrapper">
                        <ProductItem
                            v-for="items in products"
                            :key="items.id"
                            :item="items"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Deals Section End -->
</template>

<script setup>
import { ref, onMounted } from "vue";

// Import Own components
import ProductItem from "@/components/ProductItem.vue";
import SectionTitle from "@/components/SectionTitle.vue";

var products = ref([
    {
        id: 1,
        title: "The Alpaca Waffle-Stitch Polo",
        price: 4.49,
        discount: 15.2,
        badge_text: "Sale",
        buttonTxt: "Add To Cart",
        quick_view: "Quick View",
        thumb: "products/product-02.png",
    },
    {
        id: 2,
        title: "The Alpaca Waffle-Stitch Polo",
        price: 4.49,
        discount: 15.2,
        badge_text: "New",
        buttonTxt: "Add To Cart",
        quick_view: "Quick View",
        thumb: "products/product-02.png",
    },
]);

// Section Title Data
const sectionTitleData = ref({
    sec_title: "Today's special deals!",
    sec_subtitle: "",
    sec_buttonTxt: "Show All",
    sec_buttonLink: "",
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
