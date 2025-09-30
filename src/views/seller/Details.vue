<template lang="html">
    <!-- Breadcrumb Section Start -->
    <section class="breadcrumb-section bg-color py-10">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="breadcrumb-area">
                        <ul class="list">
                            <li @click="globNavigate('/')" class="linked">
                                {{ lang.home }}
                            </li>
                            <li @click="globNavigate('/sellers')" class="linked">{{ lang.shop }}</li>
                            <li>{{ shop.shop_name }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Breadcrumb Section End -->

    <section class="store-details pt-40 pb-100">
        <div class="container">
            <!-- store banner -->
            <div class="row" v-if="lengthCounter(productList) > 0">
                <div class="col-12">
                    <div class="storeBanner" :style="'background-image: url(' + shop.image_899x480 + ')'">
                        <div class="storeInfo">
                            <div class="storeLogo">
                                <img :src="shop.image_82x82" :alt="shop.shop_name" />
                            </div>
                            <div class="content">
                                <h4 class="title">
                                    {{ shop.shop_name }}<i class="ri-verified-badge-fill" ></i>
                                </h4>

                                <div class="rating">
                                    <div class="avarage-rating">{{ shop.rating_count }}</div>

                                    <StarRating :rating="shop.rating_count" />
                                    <div class="ttl-rating">({{ shop.reviews_count }} {{ lang.reviews }})</div>
                                </div>
                                <div class="list">
                                    <div class="data">{{ lang.products }}: {{ shop.total_products }}</div>
                                    <div class="data">{{ lang.joined }}: {{ shop.join_date }}</div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>

            <div class="row" v-else-if="shimmer">
                <div class="col-md-12">
                    <Shimmer :height="232" />
                </div>
            </div>

            <!-- store content -->
            <div class="row">
                <div class="col-12">
                    <div class="tabs customTabs-wrapper pt-60">
                        <!-- Tab Headers -->
                        <ul class="tabList-item" v-if="lengthCounter(productList) > 0">
                            <li
                                :class="{ active: active_tab == 'store' }"
                                @click="changeTab('store')"
                            >
                                {{ lang.store }}
                            </li>

                            <li
                                :class="{ active: active_tab == 'coupons' }"
                                @click="changeTab('coupons')"
                            >
                                {{ lang.coupons }}
                            </li>

                            <li
                                :class="{ active: active_tab == 'product' }"
                                @click="changeTab('product')"
                            >
                                {{ lang.all_products }}
                            </li>

                            <li
                                :class="{
                                    active: active_tab == 'contact_seller',
                                }"
                                @click="changeTab('contact_seller')"
                            >
                                {{ lang.Seller }}
                            </li>
                        </ul>

                        <ul class="tabList-item" v-else-if="shimmer">
                            <shimmer :height="50"></shimmer>
                        </ul>


                        <!-- Tab Content -->
                        <div class="tab-body" v-if="lengthCounter(productList) > 0">
                            <div class="tab-content">
                                <div class="tab-body">
                                    <div
                                        v-if="active_tab == 'store'"
                                        class="product-desc-table"
                                    >


                                        <template v-if="products.total > 0" v-for="(componentName, index) in supportedComponents" :key="index">
                                            <component
                                                :is="componentName"
                                                :banners="componentName == 'banner' ? results[index].data : []"
                                                :featured_products="componentName == 'featured_products' ? results[index].data : []"
                                                :new_arrival="componentName == 'new_arrival' ? results[index].data : []"
                                                :best_rated="componentName == 'best_rated_products' ? results[index].data : []"
                                                :best_selling_product="componentName == 'best_selling_products' ? results[index].data : []"
                                                :offer_ending_products="componentName == 'offer_ending_soon' ? results[index].data : []">
                                            </component>
                                          </template>


                                    </div>

                                    <div v-else-if="active_tab == 'coupons'">
                                        <template
                                            v-if="settings.coupon_system == 1"
                                        >
                                            <div class="cupon-wrapper">
                                                <div class="row">
                                                    <div
                                                        class="col-xl-4 col-lg-6 col-md-6"
                                                        v-for="(
                                                            coupon, i
                                                        ) in coupons.data"
                                                        :key="i"
                                                    >
                                                        <div class="cuponCard">
                                                            <div
                                                                class="cupon-content"
                                                            >
                                                                <h4
                                                                    class="title"
                                                                >
                                                                    {{
                                                                        coupon.title
                                                                    }}
                                                                </h4>
                                                                <!-- <p class="desc" v-if="item.desc">{{ item.desc }}</p>
                                                                <p class="dates" v-if="item.startDate">{{ item.startDate }} to {{ item.endDate }}</p> -->
                                                                <button
                                                                    class="copy-btn"
                                                                    type="button"
                                                                    @click="
                                                                        copyTestingCode(
                                                                            coupon.code
                                                                        )
                                                                    "
                                                                >
                                                                    {{
                                                                        lang.get_code
                                                                    }}
                                                                </button>
                                                                <input
                                                                    type="hidden"
                                                                    class="form-control"
                                                                    :id="
                                                                        'testing-code_' +
                                                                        coupon.code
                                                                    "
                                                                    :value="
                                                                        coupon.code
                                                                    "
                                                                />
                                                            </div>
                                                            <div
                                                                class="coupon-discount"
                                                            >
                                                                <div
                                                                    class="discount"
                                                                >
                                                                    <span>{{
                                                                        coupon.discount_type ==
                                                                        "flat"
                                                                            ? priceFormat(
                                                                                  coupon.discount
                                                                              )
                                                                            : coupon.discount
                                                                    }}</span
                                                                    >% OFF
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="show-more mt-4"
                                                        v-if="
                                                            coupons &&
                                                            coupons.next_page_url &&
                                                            !loading
                                                        "
                                                    >
                                                        <a
                                                            href="javascript:void(0)"
                                                            @click="loadCoupon"
                                                            class="btn btn-primary"
                                                            >{{
                                                                lang.show_more
                                                            }}</a
                                                        >
                                                    </div>
                                                    <loading_button
                                                        v-if="loading"
                                                        :class_name="'show-more border-0 bg_none'"
                                                    ></loading_button>
                                                </div>
                                            </div>
                                        </template>
                                    </div>

                                    <!--
                                        ===============================
                                        ===============================
                                        ===============================
                                        product list with filter
                                        ===============================
                                        ===============================
                                        ===============================
                                     -->
                                    <div v-else-if="active_tab == 'product'">
                                        <section
                                            class="productFilter-section py-40"
                                        >
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div
                                                            class="productFilter-wrapper"
                                                        >
                                                            <!-- data visible state -->
                                                            <div
                                                                class="productFilter-sidebar position-sticky"
                                                                v-if="
                                                                    lengthCounter(
                                                                        productList
                                                                    ) > 0
                                                                "
                                                            >
                                                                <div
                                                                    class="accordion"
                                                                    id="productFilter-accordion"
                                                                >
                                                                    <!-- Brand Filter -->
                                                                    <div
                                                                        class="accordion-item"
                                                                        v-if="
                                                                            addons.includes(
                                                                                'ramdhani'
                                                                            ) ||
                                                                            form.route !=
                                                                                'product.by.brand'
                                                                        "
                                                                    >
                                                                        <h2
                                                                            class="accordion-header"
                                                                        >
                                                                            <button
                                                                                class="accordion-button collapsed"
                                                                                type="button"
                                                                                data-bs-toggle="collapse"
                                                                                data-bs-target="#brandCollapse"
                                                                                aria-expanded="false"
                                                                                aria-controls="brandCollapse"
                                                                            >
                                                                                {{
                                                                                    lang.brand
                                                                                }}
                                                                            </button>
                                                                        </h2>
                                                                        <div
                                                                            id="brandCollapse"
                                                                            class="accordion-collapse collapse"
                                                                            data-bs-parent="#productFilter-accordion"
                                                                        >
                                                                            <div
                                                                                class="accordion-body"
                                                                            >
                                                                                <ul
                                                                                    class="filterList checkbox"
                                                                                >
                                                                                    <li
                                                                                        v-for="(
                                                                                            brand,
                                                                                            i
                                                                                        ) in brands.data"
                                                                                        :key="
                                                                                            i
                                                                                        "
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
                                                                                            :value="
                                                                                                brand.id
                                                                                            "
                                                                                            v-model="
                                                                                                form.brand
                                                                                            "
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
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <!-- price filter by product -->
                                                                    <div
                                                                        class="accordion-item"
                                                                    >
                                                                        <h2
                                                                            class="accordion-header"
                                                                        >
                                                                            <button
                                                                                class="accordion-button collapsed"
                                                                                type="button"
                                                                                data-bs-toggle="collapse"
                                                                                data-bs-target="#priceRangeCollapse"
                                                                                aria-expanded="true"
                                                                                aria-controls="priceRangeCollapse"
                                                                            >
                                                                                {{
                                                                                    lang.price
                                                                                }}
                                                                            </button>
                                                                        </h2>
                                                                        <div
                                                                            id="priceRangeCollapse"
                                                                            class="accordion-collapse collapse"
                                                                            data-bs-parent="#productFilter-accordion"
                                                                        >
                                                                            <div
                                                                                class="accordion-body"
                                                                            >
                                                                                <div
                                                                                    class="filter-range"
                                                                                >
                                                                                    <div
                                                                                        class="selected-range-display"
                                                                                    >
                                                                                        <div
                                                                                            class="form-group"
                                                                                        >
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
                                                                                                    form
                                                                                                        .price
                                                                                                        .min
                                                                                                "
                                                                                                class="form-control"
                                                                                                :placeholder="
                                                                                                    lang.min
                                                                                                "
                                                                                            />
                                                                                        </div>
                                                                                        <div
                                                                                            class="form-group"
                                                                                        >
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
                                                                                                    form
                                                                                                        .price
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
                                                                                            :max="
                                                                                                max_amount
                                                                                            "
                                                                                            step="1"
                                                                                            @change="
                                                                                                filterProducts
                                                                                            "
                                                                                            v-model="
                                                                                                form
                                                                                                    .price
                                                                                                    .min
                                                                                            "
                                                                                            id="min_range"
                                                                                            class="slider"
                                                                                        />
                                                                                        <input
                                                                                            type="range"
                                                                                            :min="
                                                                                                min_amount
                                                                                            "
                                                                                            :max="
                                                                                                max_amount
                                                                                            "
                                                                                            step="1"
                                                                                            @change="
                                                                                                filterProducts
                                                                                            "
                                                                                            v-model="
                                                                                                form
                                                                                                    .price
                                                                                                    .max
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
                                                                        v-for="(
                                                                            attribute,
                                                                            index
                                                                        ) in attributes"
                                                                        :key="
                                                                            'attribute' +
                                                                            index
                                                                        "
                                                                    >
                                                                        <h2
                                                                            class="accordion-header"
                                                                        >
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
                                                                                {{
                                                                                    attribute.title
                                                                                }}
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
                                                                            <div
                                                                                class="accordion-body"
                                                                            >
                                                                                <ul
                                                                                    class="filterList checkbox"
                                                                                >
                                                                                    <li
                                                                                        v-for="(
                                                                                            value,
                                                                                            index
                                                                                        ) in attribute.attribute_value"
                                                                                        :key="
                                                                                            'value' +
                                                                                            index
                                                                                        "
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
                                                                                            :value="
                                                                                                value.id
                                                                                            "
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
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <!-- color Filter -->
                                                                    <div
                                                                        class="accordion-item"
                                                                        v-if="
                                                                            settings.color ==
                                                                            1
                                                                        "
                                                                    >
                                                                        <h2
                                                                            class="accordion-header"
                                                                        >
                                                                            <button
                                                                                class="accordion-button collapsed"
                                                                                type="button"
                                                                                data-bs-toggle="collapse"
                                                                                data-bs-target="#colorCollapse"
                                                                                aria-expanded="false"
                                                                                aria-controls="colorCollapse"
                                                                            >
                                                                                {{
                                                                                    lang.color
                                                                                }}
                                                                            </button>
                                                                        </h2>
                                                                        <div
                                                                            id="colorCollapse"
                                                                            class="accordion-collapse collapse"
                                                                            data-bs-parent="#productFilter-accordion"
                                                                        >
                                                                            <div
                                                                                class="accordion-body"
                                                                            >
                                                                                <ul
                                                                                    class="filterList checkbox"
                                                                                >
                                                                                    <li
                                                                                        v-for="(
                                                                                            color,
                                                                                            index
                                                                                        ) in colors.data"
                                                                                        :key="
                                                                                            'color' +
                                                                                            index
                                                                                        "
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
                                                                                            :value="
                                                                                                color.id
                                                                                            "
                                                                                            v-model="
                                                                                                form.color
                                                                                            "
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
                                                                    <div
                                                                        class="accordion-item"
                                                                    >
                                                                        <h2
                                                                            class="accordion-header"
                                                                        >
                                                                            <button
                                                                                class="accordion-button collapsed"
                                                                                type="button"
                                                                                data-bs-toggle="collapse"
                                                                                data-bs-target="#ratingCollapse"
                                                                                aria-expanded="false"
                                                                                aria-controls="ratingCollapse"
                                                                            >
                                                                                {{
                                                                                    lang.ratting
                                                                                }}
                                                                            </button>
                                                                        </h2>
                                                                        <div
                                                                            id="ratingCollapse"
                                                                            class="accordion-collapse collapse"
                                                                            data-bs-parent="#productFilter-accordion"
                                                                        >
                                                                            <div
                                                                                class="accordion-body"
                                                                            >
                                                                                <ul
                                                                                    class="filterList checkbox"
                                                                                >
                                                                                    <li
                                                                                        v-for="item in ratings"
                                                                                        :key="
                                                                                            item.value
                                                                                        "
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
                                                                                            :value="
                                                                                                item.value
                                                                                            "
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
                                                                                                :alt="
                                                                                                    item.name
                                                                                                "
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
                                                                <div
                                                                    class="sg-sitebar"
                                                                >
                                                                    <Shimmer
                                                                        class="mb-3"
                                                                        v-for="(
                                                                            list,
                                                                            i
                                                                        ) in 3"
                                                                        :key="i"
                                                                        :height="
                                                                            list ==
                                                                            1
                                                                                ? 355
                                                                                : 290
                                                                        "
                                                                    />
                                                                </div>
                                                            </div>

                                                            <!-- product places -->
                                                            <div
                                                                class="productFilter-item"
                                                                v-if="
                                                                    lengthCounter(
                                                                        productList
                                                                    ) > 0
                                                                "
                                                            >
                                                                <!-- product Filter Title -->
                                                                <div
                                                                    class="productFilter-title"
                                                                >
                                                                    <div
                                                                        class="title-wrap"
                                                                    >
                                                                        <h4
                                                                            class="title"
                                                                        >
                                                                            {{
                                                                                lang.all_products
                                                                            }}
                                                                            <!-- {{ lang.sort_by }} -->
                                                                        </h4>
                                                                        <div
                                                                            class="showItem"
                                                                        >
                                                                            Showing
                                                                            {{
                                                                                products.total
                                                                            }}
                                                                            results
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        class="filterRight"
                                                                    >
                                                                        <div
                                                                            class="filterOption"
                                                                        >
                                                                            <VueSelect
                                                                                v-model="
                                                                                    form.sort
                                                                                "
                                                                                :options="
                                                                                    SortByOptions
                                                                                "
                                                                                :reduce="
                                                                                    (
                                                                                        option
                                                                                    ) =>
                                                                                        option.value
                                                                                "
                                                                                label="label"
                                                                                @update:modelValue="
                                                                                    sortProducts
                                                                                "
                                                                            />
                                                                        </div>
                                                                        <div
                                                                            class="filterOption"
                                                                        >
                                                                            <div
                                                                                class="form-group"
                                                                            >
                                                                                <VueSelect
                                                                                    v-model="
                                                                                        form.paginate
                                                                                    "
                                                                                    :options="
                                                                                        SortFilter
                                                                                    "
                                                                                    :reduce="
                                                                                        (
                                                                                            option
                                                                                        ) =>
                                                                                            option.value
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
                                                                    <div
                                                                        class="listGrid-view"
                                                                    >
                                                                        <div
                                                                            class="grid"
                                                                            :class="{
                                                                                active: isGrid,
                                                                            }"
                                                                            @click="
                                                                                isGrid = true
                                                                            "
                                                                        >
                                                                            <GridSVG />
                                                                        </div>
                                                                        <div
                                                                            class="list"
                                                                            :class="{
                                                                                active: !isGrid,
                                                                            }"
                                                                            @click="
                                                                                isGrid = false
                                                                            "
                                                                        >
                                                                            <ListSVG />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <!-- Filter Showing Option -->

                                                                <div
                                                                    class="productFilter-inner mt-30"
                                                                    v-if="products.total > 0"
                                                                >
                                                                    <div
                                                                        class="row"
                                                                        v-if="
                                                                            isGrid
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6 mb-20"
                                                                            v-for="(
                                                                                item,
                                                                                index
                                                                            ) in productList"
                                                                            :key="
                                                                                index
                                                                            "
                                                                        >
                                                                            <ProductItem
                                                                                :product="
                                                                                    item
                                                                                "
                                                                                :number="
                                                                                    8
                                                                                "
                                                                                :grid_class="'grid-4'"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        class="row"
                                                                        v-else
                                                                    >
                                                                        <div
                                                                            class="col-md-12 col-sm-12"
                                                                            v-for="(
                                                                                item,
                                                                                index
                                                                            ) in productList"
                                                                            :key="
                                                                                index
                                                                            "
                                                                        >
                                                                            <ProductListItem
                                                                                :product="
                                                                                    item
                                                                                "
                                                                                :number="
                                                                                    8
                                                                                "
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
                                                                            @click="
                                                                                loadProduct
                                                                            "
                                                                            class="btn btn-primary"
                                                                            >{{
                                                                                lang.show_more
                                                                            }}</a
                                                                        >
                                                                    </div>

                                                                    <!-- loading state -->
                                                                    <div
                                                                        class="col-md-12 text-center show-more"
                                                                        v-show="
                                                                            loading
                                                                        "
                                                                    >
                                                                        <loading_button
                                                                            :class_name="'btn btn-primary'"
                                                                        ></loading_button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- loading state -->
                                                            <div
                                                                class="productFilter-item"
                                                                v-else
                                                            >
                                                                <div
                                                                    class="productFilter-ads"
                                                                >
                                                                    <Shimmer
                                                                        :height="
                                                                            200
                                                                        "
                                                                    />
                                                                </div>

                                                                <!-- product Filter Title -->
                                                                <div
                                                                    class="productFilter-title"
                                                                >
                                                                    <Shimmer
                                                                        :height="
                                                                            50
                                                                        "
                                                                    />
                                                                </div>

                                                                <div
                                                                    class="productFilter-inner mt-30"
                                                                >
                                                                    <div
                                                                        class="row"
                                                                    >
                                                                        <div
                                                                            class="grid-5"
                                                                        >
                                                                            <a
                                                                                href="javascript:void(0)"
                                                                                v-for="(
                                                                                    product,
                                                                                    index
                                                                                ) in 15"
                                                                            >
                                                                                <shimmer
                                                                                    :height="
                                                                                        300
                                                                                    "
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
                                    </div>

                                    <!--
                                        ===============================
                                        ===============================
                                        ===============================
                                        Contact Seller
                                        ===============================
                                        ===============================
                                        ===============================
                                     -->
                                    <div
                                        v-else-if="
                                            active_tab == 'contact_seller'
                                        "
                                        class="other-tab-content"
                                    >
                                        <template v-if="!addons.includes('ramdhani')">
                                            <form @submit.prevent="submit" class="seller-contact">
                                                <h4
                                                    class="contact-title pt-10 pb-15"
                                                >
                                                    {{ lang.send_message_to_seller }}
                                                </h4>

                                                <div class="grid-3">
                                                    <div class="input-group">
                                                        <input
                                                            type="text"
                                                            class="form-control input-bg"
                                                            v-model="contact_form.name" :placeholder="lang.name"
                                                            :class="{ 'is-invalid': errors.name }"
                                                        />
                                                        <p><span class="validation_error" v-if="errors.name">{{ errors.name[0] }}</span></p>
                                                    </div>
                                                    <div class="input-group">
                                                        <input
                                                            type="email"
                                                            class="form-control input-bg"
                                                            v-model="contact_form.email" :placeholder="lang.email"
                                                            :class="{ 'is-invalid': errors.email }"
                                                        />
                                                        <p><span class="validation_error" v-if="errors.email">{{ errors.email[0] }}</span></p>
                                                    </div>

                                                    <div class="input-group">
                                                        <input
                                                            type="text"
                                                            class="form-control input-bg"
                                                            v-model="contact_form.subject" :placeholder="lang.subject"
                                                            :class="{ 'is-invalid': errors.subject }"
                                                        />
                                                        <p><span class="validation_error" v-if="errors.subject">{{ errors.subject[0] }}</span></p>
                                                    </div>
                                                </div>
                                                <div class="input-group mt-20">
                                                    <textarea class="form-control input-bg" cols="30" rows="12" v-model="contact_form.message" :placeholder="lang.write_your_message"
                                                    :class="{ 'is-invalid': errors.message }"></textarea>
                                                </div>
                                                <p><span class="validation_error" v-if="errors.message">{{ errors.message[0] }}</span></p>
                                                <div class="submit-btn mt-40">
                                                    <loading_button v-if="loading" :class_name="'btn btn-secondary d-block'"></loading_button>
                                                    <button type="submit" v-else class="btn btn-secondary d-block">
                                                      {{ lang.send }}
                                                    </button>
                                                </div>
                                            </form>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- with shimmer -->
                        <div class="tab-body" v-else-if="shimmer">
                            <div class="offers-section p-0">
                              <div class="row">
                                <div class="col-md-3 mb-4" v-for="(attr, i) in 12">
                                  <a href="javascript:void(0)" class="add-banner">
                                    <shimmer :height="200"></shimmer>
                                  </a>
                                </div>
                              </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import StarRating from "@/components/Product/Rating.vue";
import GridSVG from "@/svg/GridSVG.vue";
import ListSVG from "@/svg/ListSVG.vue";
import ProductListItem from "@/components/Product/ListItem.vue";
import ProductItem from "@/components/Product/Item.vue";
import VueSelect from "vue3-select-component";

import addBanner from "@/section/home/AddBanner.vue";
import new_arrival from "@/section/home/NewArrival.vue";
import best_selling_product from "@/section/home/BestSellingProduct.vue";
import best_rated from "@/section/home/BestRated.vue";
import offer_ending from "@/section/home/OfferEnding.vue";
import featured_products from "@/section/home/FeatureProduct.vue";


export default {
    components: {
        Shimmer,
        StarRating,
        GridSVG,
        ListSVG,
        ProductListItem,
        ProductItem,
        VueSelect,

        banner: addBanner,
        featured_products: featured_products,
        new_arrival: new_arrival,
        best_selling_products: best_selling_product,
        best_rated_products: best_rated,
        offer_ending_soon: offer_ending,
    },

    data() {
        return {
            static_image_url: this.getUrl("frontends/images/"),
            supportedComponents: [],
            results: [],
            //for filter products
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
                paginate: 20,
                sort: "newest",
                slug: this.$route.params.slug,
                page: 1,
                route: this.$route.name,
                key: this.$route.query.key,
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
            brand_page: 1,
            color_page: 1,
            attribute_value_page: 1,
            coupon_page: 1,
            contact_form: {
                name: "",
                email: "",
                subject: "",
                message: "",
            },

            active_tab: "store",
            isGrid: true,

            // dump
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
        };
    },

    methods: {
        changeTab(type) {
            console.log(type);

            switch (type) {
                case "store":
                    this.active_tab = type;
                    this.$store.commit("setActiveTab", "store");
                    break;

                case "coupons":
                    this.active_tab = type;
                    this.$store.commit("setActiveTab", "coupons");
                    break;

                case "product":
                    this.active_tab = type;
                    this.$store.commit("setActiveTab", "product");
                    break;

                case "contact_seller":
                    this.active_tab = type;
                    break;
                default:
                    break;
            }
        },

        loadContents() {
            let url = this.getUrl("shop-page-data/" + this.$route.params.slug);
            if (!this.shop) {
                this.$progress.start();
                axios
                    .get(url)
                    .then((response) => {
                        if (response.data.error) {
                            this.$toast.error(
                                response.data.error,
                                this.lang.Error + " !!"
                            );
                        } else {
                            let shop = response.data.shop;

                            this.$store.commit("setShopContents", shop);
                            this.$store.commit("setShopComponents", shop);
                            this.contentCreator(shop);
                            let coupon_data = {
                                slug: shop.slug,
                                coupons: response.data.coupons,
                            };
                            let product_data = {
                                slug: shop.slug,
                                products: response.data.products,
                            };
                            // this.style.backgroundImage = shop.image_1905x350;
                            this.$store.commit("setSellerCoupons", coupon_data);
                            this.$store.commit(
                                "setSellerProducts",
                                product_data
                            );
                            this.$progress.finish();
                        }
                    })
                    .catch((error) => {
                        
                    });
            } else {
                this.contentCreator(this.shop);
            }
        },
        contentCreator(shop) {
            for (let i = 0; i < shop.shop_page_contents.length; i++) {
                this.supportedComponents.push(
                    Object.keys(shop.shop_page_contents[i])[0]
                );
            }

            let data = Object.keys(shop.contents);
            for (let i = 0; i < data.length; i++) {
                this.results.push({
                    key: Object.keys(shop.shop_page_contents[i])[0],
                    data: shop.contents[data[i]],
                });
            }
        },
        copyTestingCode(code) {
            var copyText = document.getElementById("testing-code_" + code);

            /* Select the text field */
            if (copyText) {
                copyText.setAttribute("type", "text");
                copyText.select();
                copyText.setSelectionRange(0, 99999); /* For mobile devices */

                /* Copy the text inside the text field */
                // navigator.clipboard.writeText(copyText.value);
                document.execCommand("copy");

                /* Alert the copied text */
                alert("Copied the text: " + copyText.value);
                copyText.setAttribute("type", "hidden");
                window.getSelection().removeAllRanges();
            }
        },
        //products
        loadCategories() {
            this.category_page++;
            let url =
                this.url + "/home/load-categories?page=" + this.category_page;
            this.loading = true;
            axios.get(url).then((response) => {
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
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
            this.brand_page++;
            let url = this.url + "/home/load-brands?page=" + this.brand_page;
            this.loading = true;
            axios.get(url).then((response) => {
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.loading = false;
                    let length = response.data.brands.total;
                    let products = response.data.brands.data;

                    if (length > 0) {
                        for (var i in products) {
                            this.brands.data.push(products[i]);
                        }
                    }
                    this.brand_load_more = !!response.data.brands.next_page_url;
                    this.brands.next_page_url =
                        response.data.brands.next_page_url;
                }
            });
        },
        loadColors() {
            this.color_page++;
            let url = this.url + "/home/load-colors?page=" + this.color_page;
            this.loading = true;
            axios.get(url).then((response) => {
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.loading = false;
                    let length = response.data.colors.total;
                    let colors = response.data.colors.data;

                    if (length > 0) {
                        for (var i in colors) {
                            this.colors.data.push(colors[i]);
                        }
                    }
                    this.color_load_more = !!response.data.colors.next_page_url;
                    this.colors.next_page_url =
                        response.data.colors.next_page_url;
                }
            });
        },
        filterProducts(attribute = null, value = null) {
            this.form.page = 1;
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
            this.loading = true;
            axios.get(url, { params: this.form }).then((response) => {
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.loading = false;
                    this.products.data = response.data.products.data;
                    this.products.next_page_url =
                        response.data.products.next_page_url;
                }
            });
        },
        updatePrice() {
            if (this.form.price.min == "") {
                this.form.price.min = 0;
            }
            this.filterProducts();
        },
        loadProduct() {
            this.form.page++;
            let url = this.getUrl("home/filtered_products");
            this.loading = true;
            axios.get(url, { params: this.form }).then((response) => {
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
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
        sortProducts() {
            this.form.page = 1;
            this.$store.dispatch("products", this.form);
        },
        loadCoupon() {
            this.coupon_page++;
            let url = this.getUrl(
                "seller/coupons/" +
                    this.shop.user_id +
                    "?page=" +
                    this.coupon_page
            );
            this.loading = true;
            axios.get(url).then((response) => {
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.loading = false;
                    let coupons = response.data.coupons.data;

                    if (coupons.length > 0) {
                        for (var i in coupons) {
                            this.coupons.data.push(coupons[i]);
                        }
                    }
                    this.coupons.next_page_url =
                        response.data.coupons.next_page_url;
                }
            });
        },
        submit() {
            this.loading = true;
            this.contact_form.seller_id = this.shop.id;
            let url = this.getUrl("send-message");
            axios
                .post(url, this.contact_form)
                .then((response) => {
                    this.loading = false;
                    if (response.data.success) {
                        this.$toast.success(
                            this.lang.message_sent_successfully,
                            this.lang.Success + " !!"
                        );
                        this.errors = [];
                        this.contact_form.email = "";
                        this.contact_form.name = "";
                        this.contact_form.subject = "";
                        this.contact_form.message = "";
                    } else {
                        if (response.data.error) {
                            this.$toast.error(
                                response.data.error,
                                this.lang.Error + " !!"
                            );
                        }
                    }
                })
                .catch((error) => {
                    this.loading = false;
                    if (error.response.status == 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        },
    },

    watch: {

        priceRange(newValue, oldValue) {
            if (!newValue) return;
            this.min_amount = newValue.min ?? 0;
            this.max_amount = newValue.max ?? 0;
            this.form.price.min = newValue.min ?? 0;
            this.form.price.max = newValue.max ?? 0;
        },

        shop(newValue) {
            document.title = newValue.shop_name;
        },
    },
    mounted() {
        this.loadContents();
        if (!this.filterLoaded) {
            this.$store.dispatch("filterData");
            this.$store.commit("getFilterLoaded", true);
        }
        this.$store.commit("setActiveTab", "store");
        document.title = this.shop.shop_name;
        if (this.priceRange) {
            this.min_amount = this.priceRange.min;
            this.max_amount = this.priceRange.max;
            this.form.price.min = this.priceRange.min;
            this.form.price.max = this.priceRange.max;
        }
    },
    computed: {
        shop() {
            let shop = this.$store.getters.getShopContents;
            for (let i = 0; i < shop.length; i++) {
                if (shop[i].slug == this.$route.params.slug) {
                    return shop[i].contents;
                }
            }
            return false;
        },
        products() {
            let products = this.$store.getters.getSellerProducts;
            for (let i = 0; i < products.length; i++) {
                if (products[i].slug == this.$route.params.slug) {
                    return products[i].products;
                }
            }
            return [];
        },
        coupons() {
            let coupons = this.$store.getters.getSellerCoupons;
            for (let i = 0; i < coupons.length; i++) {
                if (coupons[i].slug == this.$route.params.slug) {
                    return coupons[i].coupons;
                }
            }
            return [];
        },
        attributes() {
            let attributes = this.$store.getters.getShopAttributes;
            let attribute_index = attributes.findIndex(
                (attribute) => attribute.slug == "all"
            );
            if (attribute_index > -1) {
                return attributes[attribute_index].attributes;
            } else {
                return [];
            }
        },
        priceRange() {
            return this.$store.getters.getPriceRange;
        },
        categories() {
            return this.$store.getters.getShopCategories;
        },
        brands() {
            return this.$store.getters.getShopBrands;
        },
        colors() {
            return this.$store.getters.getShopColors;
        },
        activeTab() {
            return this.$store.getters.getActiveTab;
        },
        shimmer() {
            return this.$store.state.module.shimmer;
        },


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
    },
};
</script>
