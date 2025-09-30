<template lang="html">
    <div>
        <!-- Breadcrumb Section Start -->
        <section class="breadcrumb-section bg-color py-10">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="breadcrumb-area">
                            <ul class="list">
                                <li class="linked">
                                    <router-link to="/">
                                        {{ lang.home }}
                                    </router-link>
                                </li>

                                <template v-if="form.slug">
                                <li class="linked" v-if="form.slug && breadcrumb_title">{{ breadcrumb_title }}</li>

                                </template>

                                <li class="" v-if="!form.slug">{{ lang.Products }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Breadcrumb Section End -->

        <!-- main content -->

        <section class="productFilter-section py-40">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="productFilter-wrapper">
                            <!-- data visible state -->
                            <div
                                class="productFilter-sidebar position-sticky"
                                v-if="lengthCounter(productList) > 0"
                            >
                                <div
                                    class="accordion"
                                    id="productFilter-accordion"
                                >
                                    <!-- main category -->
                                    <div
                                        class="accordion-item"
                                        v-if="
                                            !category_routes.includes(
                                                form.route
                                            )
                                        "
                                    >
                                        <h2 class="accordion-header">
                                            <button
                                                class="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#category"
                                                aria-expanded="true"
                                                aria-controls="category"
                                                @click="category = !category"
                                                :class="{
                                                    collapsed: !category,
                                                }"
                                            >
                                                {{ lang.all_categories }}
                                            </button>
                                        </h2>

                                        <div
                                            id="category"
                                            class="accordion-collapse collapse"
                                            :class="{ show: category }"
                                            data-bs-parent="#productFilter-accordion"
                                        >
                                            <div class="accordion-body">
                                                <ul class="filterList">
                                                    <li
                                                        v-for="(
                                                            category, index
                                                        ) in categories"
                                                        :key="
                                                            'category' + index
                                                        "
                                                        @click="
                                                            categoryAttributes(
                                                                category
                                                            )
                                                        "
                                                    >
                                                        <label
                                                            v-if="
                                                                category.title
                                                            "
                                                        >
                                                            <router-link
                                                                :to="{
                                                                    name: 'product.by.category',
                                                                    params: {
                                                                        slug: category.slug,
                                                                    },
                                                                }"
                                                                >{{
                                                                    category.title
                                                                }}</router-link
                                                            >
                                                            <span
                                                                v-if="
                                                                    category.total_products
                                                                "
                                                                >{{
                                                                    category.total_products
                                                                }}</span
                                                            >
                                                        </label>
                                                    </li>
                                                </ul>

                                                <div
                                                    v-if="
                                                        category_load_more ||
                                                        categories.next_page_url
                                                    "
                                                >
                                                    <a
                                                        @click="loadCategories"
                                                        href="javaScript:void(0)"
                                                        >{{ lang.show_more }}</a
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- child category -->
                                    <div
                                        class="accordion-item"
                                        v-if="
                                            page &&
                                            page.child_categories &&
                                            page.child_categories.length > 0
                                        "
                                    >
                                        <h2 class="accordion-header">
                                            <button
                                                class="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#childCategoryCollapse"
                                                aria-expanded="false"
                                                aria-controls="childCategoryCollapse"
                                            >
                                                {{ lang.child_categories }}
                                            </button>
                                        </h2>
                                        <div
                                            id="childCategoryCollapse"
                                            class="accordion-collapse collapse"
                                            data-bs-parent="#productFilter-accordion"
                                        >
                                            <div class="accordion-body">
                                                <ul class="filterList checkbox">
                                                    <li>
                                                        <a
                                                            href="javascript:void(0)"
                                                            @click="
                                                                $router.go(-1)
                                                            "
                                                            ><i
                                                                class="mdi mdi-arrow-left"
                                                            ></i>
                                                            {{
                                                                lang.all_categories
                                                            }}</a
                                                        >
                                                    </li>

                                                    <li
                                                        v-for="(
                                                            child_category,
                                                            index
                                                        ) in page.child_categories"
                                                        :key="
                                                            'child_category' +
                                                            index
                                                        "
                                                    >

                                                        <input
                                                            type="checkbox"
                                                            @change="
                                                                filterProducts
                                                            "
                                                            :id="
                                                                'child_category' +
                                                                child_category.id
                                                            "
                                                            :value="
                                                                child_category.id
                                                            "
                                                            v-model="
                                                                form.child_category
                                                            "
                                                        />


                                                        <label
                                                            :for="
                                                                'child_category' +
                                                                child_category.id
                                                            "
                                                        >

                                                            {{
                                                                child_category.title
                                                            }}
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Brand Filter -->
                                    <div
                                        class="accordion-item"
                                        v-if="
                                            addons.includes('ramdhani') ||
                                            form.route != 'product.by.brand'
                                        "
                                    >
                                        <h2 class="accordion-header">
                                            <button
                                                class="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#brandCollapse"
                                                aria-expanded="false"
                                                aria-controls="brandCollapse"
                                            >
                                                {{ lang.brand }}
                                            </button>
                                        </h2>
                                        <div
                                            id="brandCollapse"
                                            class="accordion-collapse collapse"
                                            data-bs-parent="#productFilter-accordion"
                                        >
                                            <div class="accordion-body">
                                                <ul class="filterList checkbox">
                                                    <li
                                                        v-for="(
                                                            brand, i
                                                        ) in brands.data"
                                                        :key="i"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            :id="
                                                                'brand' +
                                                                brand.id
                                                            "
                                                            @change="
                                                                filterProducts
                                                            "
                                                            :value="brand.id"
                                                            v-model="form.brand"
                                                        />
                                                        <label
                                                            :for="
                                                                'brand' +
                                                                brand.id
                                                            "
                                                            >{{
                                                                brand.title
                                                            }}</label
                                                        >
                                                    </li>
                                                </ul>
                                                <!-- <div
                          v-if="brands.data && brands.data.length > 0"
                          v-observe-visibility="handleScrolledForBrands"
                        ></div> -->
                                            </div>
                                        </div>
                                    </div>

                                    <!-- price filter by product -->
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button
                                                class="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#priceRangeCollapse"
                                                aria-expanded="true"
                                                aria-controls="priceRangeCollapse"
                                            >
                                                {{ lang.price }}
                                            </button>
                                        </h2>
                                        <div
                                            id="priceRangeCollapse"
                                            class="accordion-collapse collapse"
                                            data-bs-parent="#productFilter-accordion"
                                        >
                                            <div class="accordion-body">
                                                <div class="filter-range">
                                                    <!-- Display the selected range -->

                                                    <!--

                                <div class="price-top">

                                </div>
                                <div class="range-slider">

                                </div>
                                 -->

                                                    <div
                                                        class="selected-range-display"
                                                    >
                                                        <div class="form-group">
                                                            <input
                                                                type="text"
                                                                min="0"
                                                                :max="
                                                                    min_amount
                                                                "
                                                                @focusout="
                                                                    filterProducts
                                                                "
                                                                v-model="
                                                                    form.price
                                                                        .min
                                                                "
                                                                class="form-control"
                                                                :placeholder="
                                                                    lang.min
                                                                "
                                                            />
                                                        </div>
                                                        <div class="form-group">
                                                            <input
                                                                type="text"
                                                                :min="
                                                                    min_amount
                                                                "
                                                                @focusout="
                                                                    filterProducts
                                                                "
                                                                :max="
                                                                    max_amount
                                                                "
                                                                v-model="
                                                                    form.price
                                                                        .max
                                                                "
                                                                class="form-control"
                                                                :placeholder="
                                                                    lang.max
                                                                "
                                                            />
                                                        </div>
                                                    </div>

                                                    <!-- Range slider -->
                                                    <div
                                                        class="slider-container"
                                                    >
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            :max="max_amount"
                                                            step="1"
                                                            @change="
                                                                filterProducts
                                                            "
                                                            v-model="
                                                                form.price.min
                                                            "
                                                            id="min_range"
                                                            class="slider"
                                                        />
                                                        <input
                                                            type="range"
                                                            :min="min_amount"
                                                            :max="max_amount"
                                                            step="1"
                                                            @change="
                                                                filterProducts
                                                            "
                                                            v-model="
                                                                form.price.max
                                                            "
                                                            id="max_range"
                                                            class="slider"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- price filter by product -->

                                    <!-- Attribute wise filter -->
                                    <div
                                        class="accordion-item"
                                        v-for="(attribute, index) in attributes"
                                        :key="'attribute' + index"
                                    >
                                        <h2 class="accordion-header">
                                            <button
                                                class="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                :data-bs-target="
                                                    '#attributeCollapse-' +
                                                    attribute.id
                                                "
                                                aria-expanded="false"
                                                :aria-controls="
                                                    'attributeCollapse-' +
                                                    attribute.id
                                                "
                                            >
                                                {{ attribute.title }}
                                            </button>
                                        </h2>
                                        <div
                                            :id="
                                                'attributeCollapse-' +
                                                attribute.id
                                            "
                                            class="accordion-collapse collapse"
                                            data-bs-parent="#productFilter-accordion"
                                        >
                                            <div class="accordion-body">
                                                <ul class="filterList checkbox">
                                                    <li
                                                        v-for="(
                                                            value, index
                                                        ) in attribute.attribute_value"
                                                        :key="'value' + index"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            :id="
                                                                attribute.id +
                                                                'attribute' +
                                                                value.id
                                                            "
                                                            @change="
                                                                filterProducts(
                                                                    attribute.id,
                                                                    value.id
                                                                )
                                                            "
                                                            :value="value.id"
                                                            v-model="
                                                                form.attribute_value_id
                                                            "
                                                        />
                                                        <label
                                                            :for="
                                                                attribute.id +
                                                                'attribute' +
                                                                value.id
                                                            "
                                                            >{{
                                                                value.value
                                                            }}</label
                                                        >
                                                    </li>
                                                </ul>
                                                <!-- <div
                          v-if="brands.data && brands.data.length > 0"
                          v-observe-visibility="handleScrolledForBrands"
                        ></div> -->
                                            </div>
                                        </div>
                                    </div>

                                    <!-- color Filter -->
                                    <div
                                        class="accordion-item"
                                        v-if="settings.color == 1"
                                    >
                                        <h2 class="accordion-header">
                                            <button
                                                class="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#colorCollapse"
                                                aria-expanded="false"
                                                aria-controls="colorCollapse"
                                            >
                                                {{ lang.color }}
                                            </button>
                                        </h2>
                                        <div
                                            id="colorCollapse"
                                            class="accordion-collapse collapse"
                                            data-bs-parent="#productFilter-accordion"
                                        >
                                            <div class="accordion-body">
                                                <ul class="filterList checkbox">
                                                    <li
                                                        v-for="(
                                                            color, index
                                                        ) in colors.data"
                                                        :key="'color' + index"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            :id="
                                                                'filter_color' +
                                                                color.id
                                                            "
                                                            @change="
                                                                filterProducts
                                                            "
                                                            :value="color.id"
                                                            v-model="form.color"
                                                        />
                                                        <label
                                                            class="colorBox"
                                                            :for="
                                                                'filter_color' +
                                                                color.id
                                                            "
                                                            >{{
                                                                color.name
                                                            }}</label
                                                        >
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Ratting Filter -->
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button
                                                class="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#ratingCollapse"
                                                aria-expanded="false"
                                                aria-controls="ratingCollapse"
                                            >
                                                {{ lang.ratting }}
                                            </button>
                                        </h2>
                                        <div
                                            id="ratingCollapse"
                                            class="accordion-collapse collapse"
                                            data-bs-parent="#productFilter-accordion"
                                        >
                                            <div class="accordion-body">
                                                <ul class="filterList checkbox">
                                                    <li
                                                        v-for="item in ratings"
                                                        :key="item.value"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            :id="
                                                                'rating' +
                                                                item.value
                                                            "
                                                            @change="
                                                                filterProducts
                                                            "
                                                            :value="item.value"
                                                            v-model="
                                                                form.rating
                                                            "
                                                        />
                                                        <label
                                                            :for="
                                                                'rating' +
                                                                item.value
                                                            "
                                                        >
                                                            <img
                                                                :src="
                                                                    static_image_url +
                                                                    item.thumb
                                                                "
                                                                :alt="item.name"
                                                            />
                                                        </label>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- loading state -->
                            <div
                                class="productFilter-sidebar position-sticky"
                                v-else
                            >
                                <div class="sg-sitebar">
                                    <Shimmer
                                        class="mb-3"
                                        v-for="(list, i) in 3"
                                        :key="i"
                                        :height="list == 1 ? 355 : 290"
                                    />
                                </div>
                            </div>

                            <!-- product places -->
                            <div
                                class="productFilter-item"
                                v-if="lengthCounter(productList) > 0"
                            >
                                <div
                                    class="productFilter-ads"
                                    v-if="page && page.image_835x200"
                                >
                                    <div
                                        v-if="
                                            page.image_835x200 ==
                                            getUrl(
                                                'images/default/default-image-835x200.png'
                                            )
                                        "
                                    >
                                        <a
                                            v-if="
                                                settings.category_default_banner !=
                                                null
                                            "
                                            class="ads-thumb"
                                        >
                                            <img
                                                loading="lazy"
                                                :src="
                                                    settings.category_default_banner
                                                "
                                                :alt="form.slug"
                                            />
                                        </a>

                                        <a v-else class="ads-thumb">
                                            <img
                                                loading="lazy"
                                                :src="page.image_835x200"
                                                :alt="form.slug"
                                            />
                                        </a>
                                    </div>
                                    <div v-else>
                                        <a
                                            v-if="page.image_835x200"
                                            class="ads-thumb"
                                        >
                                            <img
                                                loading="lazy"
                                                :src="page.image_835x200"
                                                :alt="form.slug"
                                            />
                                        </a>
                                    </div>
                                </div>

                                <!-- product Filter Title -->
                                <div class="productFilter-title">
                                    <div class="title-wrap">
                                        <h4 class="title">
                                            {{ lang.all_products }}
                                            <!-- {{ lang.sort_by }} -->
                                        </h4>
                                        <div class="showItem">
                                            Showing {{ products.data.length > 0 ? products.total : 0 }} results
                                        </div>
                                    </div>
                                    <div class="filterRight">
                                        <div class="filterOption">
                                            <VueSelect
                                                v-model="form.sort"
                                                :options="SortByOptions"
                                                :reduce="
                                                    (option) => option.value
                                                "
                                                label="label"
                                                @update:modelValue="
                                                    sortProducts
                                                "
                                            />
                                        </div>
                                        <div class="filterOption">
                                            <div class="form-group">
                                                <VueSelect
                                                    v-model="form.paginate"
                                                    :options="SortFilter"
                                                    :reduce="
                                                        (option) => option.value
                                                    "
                                                    label="label"
                                                    @update:modelValue="
                                                        sortProducts
                                                    "
                                                />

                                                <!--  -->
                                            </div>
                                        </div>
                                    </div>
                                    <!-- product Filter  List Grid View -->
                                    <div class="listGrid-view">
                                        <div
                                            class="grid"
                                            :class="{ active: isGrid }"
                                            @click="isGrid = true"
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M7.22222 1H1V7.22222H7.22222V1Z"
                                                    stroke="#FEBD0D"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M16.9996 1H10.7773V7.22222H16.9996V1Z"
                                                    stroke="#FEBD0D"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M16.9996 10.7778H10.7773V17.0001H16.9996V10.7778Z"
                                                    stroke="#FEBD0D"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M7.22222 10.7778H1V17.0001H7.22222V10.7778Z"
                                                    stroke="#FEBD0D"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <div
                                            class="list"
                                            :class="{ active: !isGrid }"
                                            @click="isGrid = false"
                                        >
                                            <svg
                                                width="20"
                                                height="14"
                                                viewBox="0 0 20 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M6 1H19"
                                                    stroke="#333333"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M6 7H19"
                                                    stroke="#333333"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M6 13H19"
                                                    stroke="#333333"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M1 1H1.01"
                                                    stroke="#333333"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M1 7H1.01"
                                                    stroke="#333333"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M1 13H1.01"
                                                    stroke="#333333"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <!-- Filter Showing Option -->

                                <div class="productFilter-inner mt-30">
                                    <div class="row" v-if="isGrid">
                                        <div

                                            class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6 mb-20"
                                            v-for="(item, index) in productList"
                                            :key="index"
                                        >
                                            <ProductItem v-if="item != 'id'"
                                                :product="item"
                                                :number="8"
                                                :grid_class="'grid-4'"
                                            />
                                        </div>
                                    </div>
                                    <div class="row" v-else>
                                        <div
                                            class="col-md-12 col-sm-12"
                                            v-for="(item, index) in productList"
                                            :key="index"
                                        >
                                            <ProductListItem
                                                v-if="item != 'id'"
                                                :product="item"
                                                :number="8"
                                                :grid_class="'grid-4'"
                                            />
                                        </div>
                                    </div>

                                    <!-- show more -->
                                    <div
                                        class="show-more text-center"
                                        v-if="
                                            products &&
                                            products.next_page_url &&
                                            !loading
                                        "
                                    >
                                        <a
                                            href="javaScript:void(0)"
                                            @click="loadProduct"
                                            class="btn btn-primary"
                                            >{{ lang.show_more }}</a
                                        >
                                    </div>

                                    <!-- loading state -->
                                    <div
                                        class="col-md-12 text-center show-more"
                                        v-show="loading"
                                    >
                                        <loading_button
                                            :class_name="'btn btn-primary'"
                                        ></loading_button>
                                    </div>
                                </div>
                            </div>

                            <!-- loading state -->
                            <div class="productFilter-item" v-else>
                                <div class="productFilter-ads">
                                    <Shimmer :height="200" />
                                </div>

                                <!-- product Filter Title -->
                                <div class="productFilter-title">
                                    <Shimmer :height="50" />
                                </div>

                                <div class="productFilter-inner mt-30">
                                    <div class="row">
                                        <div class="grid-5">
                                            <a
                                                href="javascript:void(0)"
                                                v-for="(product, index) in 15"
                                            >
                                                <shimmer
                                                    :height="300"
                                                ></shimmer>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- loading state -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- main content -->
    </div>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import ProductListItem from "@/components/Product/ListItem.vue";
import ProductItem from "@/components/Product/Item.vue";
import VueSelect from "vue3-select-component";

export default {
    components: {
        Shimmer,
        ProductItem,
        ProductListItem,
        VueSelect,
    },

    watch: {
        $route(to, from) {
            this.form.route = to.name;
            this.form.slug = to.params.slug;
            this.form.key = to.query.q;
            this.$store.dispatch("products", this.form);
            if (this.attributes.length == 0) {
                if (this.$route.name == "product.by.category") {
                    this.$store.dispatch("filterData", this.$route.params.slug);
                } else {
                    this.$store.dispatch("filterData");
                }
            }
        },
        priceRange(newValue, oldValue) {
            this.min_amount = this.priceFormat(newValue.min, true);
            this.max_amount = this.priceFormat(newValue.max, true);
            this.form.price.min = this.priceFormat(newValue.min, true);
            this.form.price.max = this.priceFormat(newValue.max, true);
        },
        activeCurrency() {
            this.min_amount = this.priceFormat(this.priceRange.min, true);
            this.max_amount = this.priceFormat(this.priceRange.max, true);
            this.form.price.min = this.priceFormat(this.priceRange.min, true);
            this.form.price.max = this.priceFormat(this.priceRange.max, true);
        },
        brands() {
            // push id where slug is params slug
            if (this.addons.includes("ramdhani")) {
                let index = this.brands.data.findIndex(
                    (brand) => brand.slug == this.$route.params.slug
                );
                if (index > -1) {
                    this.form.brand.push(this.brands.data[index].id);
                }
                this.$store.dispatch("products", this.form);
            }
        },
    },

    created() {
        let tag = document.querySelector('meta[name="author"]');
        if (tag) {
            tag.setAttribute("content", this.form.route);
        }
    },

    data() {
        return {
            static_image_url: this.getUrl("frontends/images/"),
            activeClass: "",
            category_load_more: false,
            form: {
                category: [],
                child_category: [],
                price: {
                    min: 0,
                    max: 0,
                },
                brand: [],
                color: [],
                rating: [],
                attribute_value_id: [],
                paginate: 24,
                sort: "newest",
                slug: this.$route.params.slug,
                page: 1,
                route: this.$route.name,
                key: this.$route.query.q,
            },
            category_routes: ["product.by.gadget", "product.by.category"],
            total_product: 0,

            loading: false,
            category: true,
            child_category: true,
            price: false,
            brand: true,
            size: false,
            color: false,
            ratting: false,
            min_amount: 0,
            max_amount: 0,
            collapseAttribute: [],
            category_page: 1,
            color_page: 1,
            attribute_value_page: 1,
            brand_page: 1,
            brand_last_page: 1,
            color_last_page: 1,

            activeFilter: null,

            ratings: [
                {
                    name: "rating-5",
                    value: 5,
                    thumb: "rating/rating-icon-01.svg",
                },
                {
                    name: "rating-4",
                    value: 4,
                    thumb: "rating/rating-icon-02.svg",
                },
                {
                    name: "rating-3",
                    value: 3,
                    thumb: "rating/rating-icon-03.svg",
                },
                {
                    name: "rating-2",
                    value: 2,
                    thumb: "rating/rating-icon-04.svg",
                },
                {
                    name: "rating-1",
                    value: 1,
                    thumb: "rating/rating-icon-05.svg",
                },
            ],
            selectedFilters: [],

            isGrid: true,
            breadcrumb_title: "",
        };
    },

    mounted() {
        if (this.attributes.length == 0) {
            if (this.$route.name == "product.by.category") {
                this.$store.dispatch("filterData", this.$route.params.slug);
            } else {
                this.$store.dispatch("filterData");
            }
        }
        if (this.priceRange) {
            this.min_amount = this.priceFormat(this.priceRange.min, true);
            this.max_amount = this.priceFormat(this.priceRange.max, true);
            this.form.price.min = this.priceFormat(this.priceRange.min, true);
            this.form.price.max = this.priceFormat(this.priceRange.max, true);
        }
        if (
            this.addons.includes("ramdhani") &&
            this.brands.data &&
            this.brands.data.length > 0
        ) {
            // push id where slug is params slug
            let index = this.brands.data.findIndex(
                (brand) => brand.slug == this.$route.params.slug
            );
            if (index > -1) {
                this.form.brand.push(this.brands.data[index].id);
            }
        }
        this.$store.dispatch("products", this.form);
        this.getCategoryPageTitle();
        this.getCategorySlug();
    },

    computed: {
        productList() {
            if (
                this.products &&
                this.products.data &&
                this.products.data.length == 0
            ) {
                return ["id"];
            } else if (
                this.products &&
                this.products.data &&
                this.products.data.length > 0
            ) {
                return this.products.data;
            } else {
                return [];
            }
        },
        categories() {
            return this.$store.getters.getShopCategories;
        },
        brands() {
            let bnd = this.$store.getters.getShopBrands;
            this.brand_last_page = bnd.last_page;
            return bnd;
        },
        colors() {
            let colors = this.$store.getters.getShopColors;
            this.color_last_page = colors.last_page;
            return colors;
        },
        priceRange() {
            return this.$store.getters.getPriceRange;
        },
        shimmer() {
            return this.$store.state.module.shimmer;
        },
        attributes() {
            let attributes = this.$store.getters.getShopAttributes;
            // console.log(attributes)

            if (this.$route.name == "product.by.category") {
                let slug = this.$route.params.slug;

                let attribute_index = attributes.findIndex(
                    (attribute) => attribute.slug == slug
                );

                if (attribute_index > -1) {
                    return attributes[attribute_index].attributes;
                } else {
                    return [];
                }
            }
            if (this.$route.name == "all.products") {
                let attribute_index = attributes.findIndex(
                    (attribute) => attribute.slug == "all"
                );
                if (attribute_index > -1) {
                    return attributes[attribute_index].attributes;
                } else {
                    return [];
                }
            }

            return [];
        },
        products() {
            let products = [];

            if (
                this.form.route == "product.by.category" ||
                this.form.route == "product.by.gadget"
            ) {
                let data = this.$store.getters.getCategoryProducts;
                if (data) {
                    products = this.dataAssign(data);
                }
            } else if (this.form.route == "product.by.brand") {
                let data = this.$store.getters.getBrandProducts;
                if (data) {
                    products = this.dataAssign(data);
                }
            } else if (this.form.route == "product.by.offer") {
                products = this.$store.getters.getOfferProducts;
            } else if (this.form.route == "product.by.selling") {
                products = this.$store.getters.getSellingProducts;
            } else {
                products = this.$store.getters.getProducts;
            }
            return products;
        },
        page() {
            let page = "";

            if (
                this.form.route == "product.by.category" ||
                this.form.route == "product.by.gadget"
            ) {
                let data = this.$store.getters.getCategoryPage;
                if (data) {
                    page = this.pageAssign(data);
                }
            } else if (this.form.route == "product.by.brand") {
                let data = this.$store.getters.getBrandPage;
                if (data) {
                    page = this.pageAssign(data);
                }
            } else if (this.form.route == "shop") {
                let data = this.$store.getters.getSellerPage;
                if (data) {
                    page = this.pageAssign(data);
                }
            }

            return page;
        },
    },

    methods: {
        toggleRating(value) {
            const index = this.selectedFilters.indexOf(value);
            if (index === -1) {
                this.selectedFilters.push(value);
            } else {
                this.selectedFilters.splice(index, 1);
            }
        },


        

        getCategoryPageTitle(){
            let slug = this.$route.params.slug

            if(slug){
                let url = this.getUrl("home/get-title/breadcrumb/" + slug + '/' + this.$route.name);
                axios.get(url).then((response) => {
                    if (response.data.error) {
                        this.$toast.error(response.data.error, this.lang.Error + " !!");
                    } else {
                        this.breadcrumb_title = response.data
                    }
                });
            }


        },


        getCategorySlug(receive_slug = null){
            let slug = receive_slug ?? this.form.slug

            if(slug){
                let url = this.getUrl("home/get-category/breadcrumb/" + slug);
                axios.get(url).then((response) => {
                    if (response.data.error) {
                        this.$toast.error(response.data.error, this.lang.Error + " !!");
                    }
                });
            }

        },

        loadCategories() {
            this.category_page++;
            let url =
                this.url + "/home/load-categories?page=" + this.category_page;
            this.loading = true;
            axios.get(url).then((response) => {
                if (response.data.error) {
                    this.$toast.error(response.data.error, this.lang.Error + " !!");
                } else {
                    this.loading = false;
                    let length = response.data.categories.total;
                    let products = response.data.categories.data;

                    if (length > 0) {
                        for (var i in products) {
                            this.categories.data.push(products[i]);
                        }
                    }
                    this.category_load_more =
                        !!response.data.categories.next_page_url;
                    this.categories.next_page_url =
                        response.data.categories.next_page_url;
                }
            });
        },
        loadBrands() {
            // this.brand_page++;
            let url = this.url + "/home/load-brands?page=" + this.brand_page;
            this.loading = true;
            axios.get(url).then((response) => {
                if (response.data.error) {
                    this.$toast.error(response.data.error, this.lang.Error + " !!");
                } else {
                    this.loading = false;
                    let length = response.data.brands.total;
                    let products = response.data.brands.data;
                    this.brand_last_page = response.data.brands.last_page;

                    if (length > 0) {
                        for (var i in products) {
                            this.brands.data.push(products[i]);
                        }
                    }
                    this.brands.next_page_url =
                        response.data.brands.next_page_url;
                }
            });
        },
        categoryAttributes(category) {},
        loadColors() {
            let url = this.url + "/home/load-colors?page=" + this.color_page;
            this.loading = true;
            axios.get(url).then((response) => {
                if (response.data.error) {
                    this.$toast.error(response.data.error, this.lang.Error + " !!");
                } else {
                    this.loading = false;
                    let length = response.data.colors.total;
                    let colors = response.data.colors.data;
                    this.color_last_page = response.data.colors.last_page;

                    if (length > 0) {
                        for (var i in colors) {
                            this.colors.data.push(colors[i]);
                        }
                    }
                    this.colors.next_page_url =
                        response.data.colors.next_page_url;
                }
            });
        },
        filterProducts(attribute = null, value = null) {
            if (attribute) {
                this.form.attribute_value_id.push(value);
            }
            if (attribute && this.form.attribute_value_id.includes(value)) {
                var index = this.form.attribute_value_id.indexOf(value);
                if (index > -1) {
                    this.form.attribute_value_id.splice(index, 1);
                }
            }

            let url = this.getUrl("home/filtered_products");
            this.form.page = 1;
            this.loading = true;
            axios.get(url, { params: this.form }).then((response) => {
                if (response.data.error) {
                    this.$toast.error(response.data.error, this.lang.Error + " !!");
                } else {
                    this.loading = false;
                    this.products.data = response.data.products.data;
                    this.products.next_page_url =
                        response.data.products.next_page_url;
                }
            });
        },
        loadProduct() {
            this.form.page++;
            let url = this.getUrl("home/filtered_products");
            this.loading = true;
            axios.get(url, { params: this.form }).then((response) => {
                if (response.data.error) {
                    this.$toast.error(response.data.error, this.lang.Error + " !!");
                } else {
                    this.loading = false;
                    let products = response.data.products.data;

                    if (products.length > 0) {
                        for (var i in products) {
                            this.products.data.push(products[i]);
                        }
                    }
                    this.products.next_page_url =
                        response.data.products.next_page_url;
                }
            });
        },
        dataAssign(data) {
            for (let i = 0; i < Object.keys(data).length; i++) {
                if (data[i].slug == this.form.slug) {
                    return data[i].products;
                }
            }
        },
        pageAssign(data) {
            for (let i = 0; i < Object.keys(data).length; i++) {
                if (data[i].slug == this.form.slug) {
                    return data[i].page;
                }
            }
        },
        sortProducts() {
            this.form.page = 1;
            this.$store.dispatch("products", this.form);
        },
        handleScrolledForBrands(isVisible) {
            if (!isVisible) {
                return true;
            }
            if (this.brand_page >= this.brand_last_page) {
                return true;
            }
            this.brand_page++;
            this.loadBrands();
        },
        handleScrolledForColors(isVisible) {
            if (!isVisible) {
                return true;
            }
            if (this.color_page >= this.color_last_page) {
                return true;
            }
            this.color_page++;
            this.loadColors();
        },
    },
};
</script>

<style scoped>
.form-group {
    display: flex;
    align-items: center;
    gap: 5px;
}

.form-group input {
    display: inline-block;
    width: 25px;
    height: 20px;
    cursor: pointer;
}

.form-group label {
    cursor: pointer;
}

/* .productFilter-ads img{
    height: 270px !important;
} */

</style>
