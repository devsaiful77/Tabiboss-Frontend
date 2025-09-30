<template>
    <!-- categories Item Start -->
    <div :class="['categoriesItem', loading ? 'skeleton' : '']">
        <h4 class="categoriesTitle">{{ item.main_title }}</h4>

        <div class="categories-inner">
            <!-- Loop through CategoriesItemData if it exists -->
            <a
                v-for="(category, index) in item.CategoriesItemData"
                :key="index"
                :href="category.cata_link"
                class="single-categories"
            >
                <div class="categories-thumb">
                    <img :src="static_image_url + category.cata_thumb" alt="" />
                </div>
                <h4 class="title">{{ category.cata_title }}</h4>
            </a>
        </div>
        <div v-if="item.show_btnTxt" class="show-btn">
            <router-link class="solid-btn" to="#">{{
                item.show_btnTxt
            }}</router-link>
        </div>
    </div>
    <!-- categories Item End -->
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            loading: true,
        };
    },
    mounted() {
        setTimeout(() => {
            this.loading = false;
        }, 1500);
    },
};
</script>
