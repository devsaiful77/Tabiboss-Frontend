<template>
    <!-- Brands Section Start -->
     <section class="brands-section py-30">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <SectionTitle :item="sectionTitleData" />
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="product-wrapper position-relative">
                        <swiper
                            :modules="modules"
                            :space-between="24"
                            :slides-per-view="'auto'"
                            :autoplay="{ delay: 3000, disableOnInteraction: false }"
                            :effect="''"
                            :navigation="{ nextEl: '.brand-next', prevEl: '.brand-prev' }"
                            :scrollbar="false"
                            
                            :breakpoints="{
                                200: { slidesPerView: 2,slidesPerGroup: 2, spaceBetween: 20 },
                                479: { slidesPerView: 3,slidesPerGroup: 3, spaceBetween: 20 },
                                767: { slidesPerView: 4,slidesPerGroup: 4, spaceBetween: 30 },
                                1199: { slidesPerView: 6,slidesPerGroup: 6, spaceBetween: 30 },
                                1439: { slidesPerView: 7,slidesPerGroup: 7, spaceBetween: 40 }
                            }"
                        >
                            <!-- Loop through the products and render the ProductItem component -->
                            <swiper-slide v-for="(item, index) in BrandLoop" :key="index">
                                <BrandItem :item="item" />
                            </swiper-slide>
                        </swiper>
                        <!-- Custom Navigation Start -->
                        <div class="custom-navigation">
                            <div class="brand-prev swiper-button-prev"><i class="ri-arrow-left-s-line"></i></div>
                            <div class="brand-next swiper-button-next"><i class="ri-arrow-right-s-line"></i></div>
                        </div>
                        <!-- Custom Navigation End -->
                    </div>
                </div>
            </div>
        </div>
     </section>
    <!-- Brands Section Start -->
</template>


<script setup>
    import { ref } from 'vue'

    // Import Swiper core and required modules
    import { Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y } from 'swiper/modules';
    
    // Import Own components
    import BrandItem from '@/components/BrandItem.vue';
    import SectionTitle from '@/components/SectionTitle.vue';


    var BrandData = ref([
        {   
            title: "Puma",
            thumb: "brands/brands-01.png",
        },
        {   
            title: "Suzuki",
            thumb: "brands/brands-02.png",
        },
        {   
            title: "Adidas",
            thumb: "brands/brands-03.png",
        },
    ]);
    
        // Section Title Data
    const sectionTitleData = ref({
        sec_title: "Popular Brand",
        sec_subtitle: "",
        sec_buttonTxt: "See All",
        sec_buttonLink: "brands",
    });

    // Define a reactive variable to hold the loop data
    const BrandLoop = BrandData;

    // Swiper Modules
    const modules = [Autoplay, Navigation, Pagination, Scrollbar, EffectFade, A11y];
    
</script>
