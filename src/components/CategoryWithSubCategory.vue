<template lang="html">
    <!-- categories Item Start -->
    <div>
        <h4 class="categoriesTitle">
            <a
                :href="getUrl('category/' + category.slug)"
                @click.prevent="
                    routerNavigator('product.by.category', category.slug)
                "
            >
                {{ category.title }}
            </a>
        </h4>

        <div
            class="categories-inner"
            v-if="category.child_categories.length > 0"
        >
            <!-- Loop through CategoriesItemData if it exists -->
            <template
                v-for="(
                    child_category, child_index
                ) in category.child_categories"
                :key="child_index"
            >
                <router-link
                    :to="{
                        name: 'product.by.category',
                        params: { slug: child_category.slug },
                    }"
                    class="single-categories"
                >
                    <div class="categories-thumb">
                        <img
                            :src="child_category.top_image"
                            :alt="child_category.title"
                        />
                    </div>
                    <h4 class="title">{{ child_category.title }}</h4>
                </router-link>
            </template>
        </div>
        <div class="show-btn">
            <a
                :href="getUrl('categories')"
                @click.prevent="routerNavigator('categories', null)"
                class="solid-btn"
                >{{ lang.browse_all_categories }}
            </a>
        </div>
    </div>
    <!-- categories Item End -->
</template>
<script>
export default {
    props: ["category"],
};
</script>
