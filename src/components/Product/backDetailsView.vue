<template lang="html">
    <div>
        <section class="product-single py-30" v-if="productDetails.id">
            <div class="container">
                <!-- product Single Section Start -->
                <div class="row">
                    <div
                        class="col-lg-7 col-md-6"
                        v-if="lengthCounter(productDetails.gallery) > 0"
                    >
                        <ProductThumb
                            :thumbnail="productDetails.gallery"
                            :product_name="productDetails.product_name"
                            :discountCheck="
                                productDetails.special_discount_check
                            "
                            :user_wishlist="productDetails.user_wishlist"
                            :product_id="productDetails.id"
                            :days="productDetails.countdown.days"
                            :hours="productDetails.countdown.hours"
                            :minutes="productDetails.countdown.mins"
                            :seconds="productDetails.countdown.secs"
                        />
                    </div>

                    <div class="col-lg-5 col-md-6">
                        <!-- <ProductSingleContent /> -->

                        <!-- Product Single Content -->
                        <div class="productDetail-wrapper">
                            <h2 class="productDetail-title">
                                {{ productDetails.product_name }}
                            </h2>
                            <!-- Meta Start -->
                            <div class="productDetail-meta">
                                <div
                                    class="meta-item"
                                    v-if="
                                        stockFind() &&
                                        stockFind().sku &&
                                        attributes_fetched
                                    "
                                >
                                    {{ lang.SKU }} :<span>{{
                                        stockFind().sku
                                    }}</span>
                                </div>

                                <div
                                    class="meta-item"
                                    v-if="productDetails.rating > 0"
                                >
                                    {{ productDetails.rating.toFixed(2) }}

                                    <div class="rating">
                                        <i
                                            v-for="i in 5"
                                            :key="i"
                                            :class="
                                                i <=
                                                Math.round(
                                                    productDetails.rating
                                                )
                                                    ? 'ri-star-fill'
                                                    : 'ri-star-line'
                                            "
                                        ></i>
                                    </div>

                                    <div class="total-rating">
                                        ({{ productDetails.reviews_count }}
                                        {{ lang.reviews }})
                                    </div>
                                </div>
                                <a
                                    class="meta-item"
                                    v-if="checkCompare()"
                                    href="javascript:void(0)"
                                    @click="removeCompare"
                                    ><i class="ri-repeat-line"></i
                                    >{{ lang.remove }}</a
                                >
                                <a
                                    class="meta-item"
                                    v-else
                                    href="javascript:void(0)"
                                    @click="compare"
                                    ><i class="ri-repeat-line"></i
                                    >{{ lang.compare }}</a
                                >
                            </div>


                            <!-- price section -->
                            <h3 class="productDetail-price" v-if="productDetails.has_variant">
                                {{ productDetails.variation_price }}
                            </h3>
                            <!-- wholesale price -->
                            <h3  class="productDetail-price" v-if="!productDetails.is_wholesale">
                                <span v-if="productDetails.special_discount_check > 0">
                                    {{ priceFormat(productDetails.product_stock.discount_percentage)}}</span>

                                <span v-else>{{ priceFormat(productDetails.product_stock.price)}}</span>
                                <del v-if="productDetails.special_discount_check > 0">
                                    {{  priceFormat( productDetails.product_stock.price)}}</del
                                >

                                <p class="text-start"v-if="productDetails.special_discount_check > 0">
                                    {{ lang.you_save }}
                                    <span>{{ productDetails.special_discount_type == "flat" ? priceFormat( productDetails.special_discount_check)
                                            : productDetails.special_discount_check +
                                              "%"
                                    }}</span>
                                </p>


                            </h3>

                            <h3 class="productDetail-price" v-else>
                                <span
                                    >{{ priceFormat(productDetails.price) }}
                                </span>
                            </h3>

                            <!-- product attribute -->
                            <div class="product-attr">
                                <div class="list" v-if="productDetails.brand_title">
                                    {{ lang.brands }} :
                                    <span>{{
                                        productDetails.brand_title
                                    }}</span>
                                </div>

                                <div
                                    class="list"
                                    v-if="
                                        productType() &&
                                        productDetails.is_digital != 1 &&
                                        productDetails.stock_visibility !=
                                            'hide_stock'
                                    "
                                >
                                    <div v-if="stockFind().stock > 0">
                                        {{ lang.stock }} :
                                        <span
                                            >{{ lang.in_stock }}
                                            <span
                                                v-if="
                                                    productDetails.stock_visibility ==
                                                    'visible_with_quantity'
                                                "
                                                >({{ stockFind().stock }})</span
                                            ></span
                                        >
                                    </div>
                                    <div v-else>
                                        {{ lang.stock }} :
                                        <span>{{ lang.stock_out }}</span>
                                    </div>
                                </div>

                                <!-- color attribute -->
                                <div
                                    class="list"
                                    v-if="
                                        productDetails.product_colors &&
                                        productDetails.colors.length > 0
                                    "
                                >
                                    {{ lang.color }}:
                                    <ul class="product-attr-color">
                                        <li
                                            v-for="(
                                                color, index
                                            ) in productDetails.product_colors"
                                            :key="'color' + index"
                                            @change="attributeSelect(color.id)"
                                        >
                                            <label>
                                                <input
                                                    type="radio"
                                                    class="d-none"
                                                    :id="'color' + color.id"
                                                    :value="color.id"
                                                    v-model="
                                                        product_form.color_id
                                                    "
                                                />
                                                <div
                                                    class="box"
                                                    :style="
                                                        'background:' +
                                                        color.code
                                                    "
                                                    :class="[
                                                        {
                                                            selected:
                                                                select_color ==
                                                                color.id,
                                                        },
                                                    ]"
                                                ></div>
                                            </label>
                                        </li>
                                    </ul>
                                </div>

                                <!-- attribute -->
                                <div
                                    class="list"
                                    v-for="(
                                        attribute, attribute_index
                                    ) in attributes"
                                    :key="'attribute' + attribute_index"
                                    v-if="attributes.length > 0"
                                >
                                    {{ attribute.title }}:
                                    <ul
                                        class="product-attr-size"
                                        v-if="
                                            productDetails.attribute_values &&
                                            productDetails.attribute_values
                                                .length > 0
                                        "
                                    >
                                        <!--
                                        <li v-for="(size, index) in sizes" :key="index" :class="{ selected: selectedSize === size }" @click="selectSize(size)" >
                                            {{ size }}
                                        </li>

                                         -->

                                        <template
                                            v-for="(
                                                item, item_index
                                            ) in productDetails.attribute_values"
                                            :key="item_index"
                                        >
                                            <li
                                                v-if="
                                                    item.attribute_id ==
                                                    attribute.id
                                                "
                                                :class="{selected : select_size == item.id}"
                                                @click="attributeSelect('att',attribute.id,item.id)"

                                            >
                                                {{ item.value }}
                                            </li>
                                        </template>
                                    </ul>
                                </div>

                                <!--
                                  <div class="sg-product-size" v-for="(attribute, attribute_index) in attributes"
                                       :key="'attribute' + attribute_index" v-if="attributes.length > 0">
                                    <div class="sg-size">
                                      <h5>{{ attribute.title }}:</h5>
                                      <form action="#">
                                        <div v-for="(value, value_index) in productDetails.attribute_values" :key="'value' + value_index"
                                             v-if="value.attribute_id == attribute.id">
                                          <input type="radio" :id="attribute.id + '_attribute_' + value.id" :value="value.id"
                                                 v-model="product_form.attribute_values[attribute_index]"
                                                 @change="attributeSelect($event.target,attribute.id,value.id)"
                                                 :disabled="checkDisable(attribute_index,value)"/>
                                          <label :for="attribute.id + '_attribute_' + value.id"
                                                 :class="{ 'disabled_radio' : checkDisable(attribute_index,value) }">{{
                                              value.value
                                            }}</label>
                                        </div>
                                      </form>
                                    </div>
                                  </div>

                                 -->

                                <div
                                    class="product-offer product-border"
                                    v-if="productDetails.short_description"
                                    v-html="productDetails.short_description"
                                ></div>

                                <div
                                    class="list"
                                    v-if="
                                        productDetails.is_digital != 1 &&
                                        productDetails.is_catalog != 1 &&
                                        productDetails.is_classified != 1
                                    "
                                >
                                    {{ lang.quantity }} :
                                    <div class="quantity bg-transparent border">
                                        <button
                                            type="button"
                                            class="decressQnt"
                                            data-spin="down"
                                            @click="cartMinus"
                                        >
                                            <i class="ri-subtract-line"></i>
                                        </button>
                                        <input
                                            class="qnttinput"
                                            type="number"
                                            @focusout="quantityCheck"
                                            v-model="product_form.quantity"
                                            title="quantity"
                                            disabled
                                        />
                                        <button
                                            type="button"
                                            class="incressQnt"
                                            data-spin="up"
                                            @click="cartPlus"
                                        >
                                            <i class="ri-add-line"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- total price -->
                            <div class="total-price">
                                {{ lang.total_price }} :

                                <span
                                    v-if="
                                        productDetails.special_discount_check >
                                            0 &&
                                        productDetails.is_wholesale != 1
                                    "
                                    >{{
                                        priceFormat(
                                            productDetails.product_stock
                                                .discount_percentage *
                                                product_form.quantity
                                        )
                                    }}
                                </span>
                                <span
                                    v-else-if="productDetails.is_wholesale != 1"
                                    >{{
                                        priceFormat(
                                            productDetails.product_stock.price *
                                                product_form.quantity
                                        )
                                    }}</span
                                >
                                <span v-if="productDetails.is_wholesale == 1">{{
                                    priceFind()
                                }}</span>
                            </div>

                            <!-- product button v-if="productDetails.is_catalog != 1" for compare -->
                            <p
                                class="mt-3"
                                v-if="
                                    productDetails.is_digital == 0 &&
                                    productDetails.estimated_shipping_days &&
                                    productDetails.is_catalog != 1
                                "
                            >
                                {{ productDetails.estimated_shipping_days }}
                                {{ lang.days }}
                                <span>{{ lang.estimated_delivery_time }}</span>
                            </p>
                            <div class="product-group">
                                <div
                                    class="product-btn-group"
                                    v-if="productDetails.is_catalog != 1"
                                >
                                    <template v-if="productType()">
                                        <a
                                            href="javascript:void(0)"
                                            @click="
                                                addToCart(
                                                    productDetails.minimum_order_quantity
                                                )
                                            "
                                            class="btn btn-secondary"
                                            >{{ lang.add_to_cart }}</a
                                        >
                                        <a
                                            href="javascript:void(0)"
                                            @click="
                                                addToCart(
                                                    productDetails.minimum_order_quantity,
                                                    1,
                                                    1
                                                )
                                            "
                                            class="btn btn-primary"
                                            >{{ lang.buy_now }}</a
                                        >
                                    </template>
                                </div>
                                <div class="socialLink">
                                    <h5 class="title">Share :</h5>
                                    <ul class="social-list">
                                        <li>
                                            <a
                                                target="_blank"
                                                :href="
                                                    'https://www.facebook.com/sharer/sharer.php?u=' +
                                                    getUrl(
                                                        'product/' +
                                                            productDetails.slug
                                                    )
                                                "
                                                ><i class="ri-facebook-fill"></i
                                            ></a>
                                        </li>
                                        <li>
                                            <a
                                                target="_blank"
                                                :href="
                                                    'https://twitter.com/intent/tweet?text=' +
                                                    productDetails.product_name +
                                                    '&url=' +
                                                    getUrl(
                                                        'product/' +
                                                            productDetails.slug
                                                    )
                                                "
                                                ><i
                                                    class="ri-twitter-x-fill"
                                                ></i
                                            ></a>
                                        </li>
                                        <li>
                                            <a
                                                target="_blank"
                                                :href="
                                                    'https://www.linkedin.com/sharing/share-offsite?mini=true&url=' +
                                                    getUrl(
                                                        'product/' +
                                                            productDetails.slug
                                                    ) +
                                                    '&title=' +
                                                    productDetails.product_name +
                                                    '&summary=Extra+linkedin+summary+can+be+passed+here'
                                                "
                                                ><i class="ri-linkedin-fill"></i
                                            ></a>
                                        </li>
                                        <li>
                                            <a
                                                target="_blank"
                                                :href="
                                                    'https://wa.me?text=' +
                                                    getUrl(
                                                        'product/' +
                                                            productDetails.slug
                                                    )
                                                "
                                                ><i class="ri-whatsapp-line"></i
                                            ></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- store info -->
                            <div
                                v-if="
                                    settings.seller_system == 1 &&
                                    productDetails.seller &&
                                    $route.name == 'product.details'
                                "
                            >
                                <Store
                                    :shop="productDetails.seller"
                                    :productDetailsPage="true"
                                />
                            </div>
                        </div>
                        <!-- Product Single Content -->
                    </div>
                </div>
                <!-- product Single Section end -->

                <!-- product details and reviews -->
                <div class="row">
                    <div class="col-12">
                        <div class="tabs customTabs-wrapper pt-60">
                            <!-- Tab Headers -->
                            <ul class="tabList-item">
                                <li
                                    :class="{ active: 'details' == activeNav }"
                                    @click="activeNav = 'details'"
                                >
                                    {{ lang.details }}
                                </li>

                                <li
                                    v-if="
                                        productDetails.language_product &&
                                        productDetails.language_product
                                            .specification
                                    "
                                    :class="{
                                        active: 'specifications' == activeNav,
                                    }"
                                    @click="activeNav = 'specifications'"
                                >
                                    {{ lang.specifications }}
                                </li>

                                <li
                                    :class="{ active: 'delivery' == activeNav }"
                                    @click="fetchReviews"
                                >
                                    {{ lang.reviews }}
                                </li>
                            </ul>

                            <!-- Tab Content -->
                            <div class="tab-body">
                                <div class="tab-content">
                                    <!-- product details -->
                                    <div
                                        v-if="activeNav == 'details'"
                                        class="product-desc-table"
                                    >
                                        <div
                                            class="desc"
                                            v-if="
                                                productDetails.language_product
                                            "
                                            v-html="
                                                productDetails.language_product
                                                    .description
                                            "
                                        ></div>
                                        <div
                                            class="text-center"
                                            v-if="
                                                productDetails.description_image
                                                    .length > 0
                                            "
                                        >
                                            <div
                                                class="mt-3"
                                                v-for="(
                                                    image, index
                                                ) in productDetails.description_image"
                                                :key="index"
                                            >
                                                <img
                                                    loading="lazy"
                                                    :src="image"
                                                    :alt="
                                                        productDetails.product_name
                                                    "
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- specification -->
                                    <div
                                        v-if="
                                            activeNav == 'specifications' &&
                                            productDetails.language_product &&
                                            productDetails.language_product
                                                .specification
                                        "
                                        class="product-desc-table"
                                    >
                                        <div>
                                            <iframe
                                                :src="
                                                    productDetails
                                                        .language_product
                                                        .specification
                                                "
                                                height="842px"
                                            ></iframe>
                                        </div>
                                    </div>

                                    <!-- for review -->
                                    <div
                                        v-if="activeNav == 'delivery'"
                                        class="product-review"
                                    >
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div
                                                    class="product-review-avarage"
                                                >
                                                    <h5 class="review-title">
                                                        Average Rating
                                                    </h5>
                                                    <div class="avarage-rating">
                                                        {{
                                                            productDetails.rating >
                                                            0
                                                                ? productDetails.rating.toFixed(
                                                                      2
                                                                  )
                                                                : 0
                                                        }}
                                                        <small
                                                            >{{ lang.out_of }}
                                                            {{
                                                                reviews.total
                                                            }}</small
                                                        >
                                                    </div>

                                                    <div class="sg-rating">
                                                        <Rating
                                                            :rating="
                                                                productDetails.rating
                                                            "
                                                        />
                                                    </div>

                                                    <div class="total-rating">
                                                        ({{
                                                            productDetails.reviews_count
                                                        }}
                                                        {{ lang.reviews }})
                                                    </div>

                                                    <!-- rating step -->
                                                    <div class="rating-step">
                                                        <div
                                                            v-for="(
                                                                rating, index
                                                            ) in ratingsData"
                                                            :key="index"
                                                            class="rating-steps"
                                                        >
                                                            <!-- Star Icons -->
                                                            <div class="rating">
                                                                <i
                                                                    v-for="i in 5"
                                                                    :key="i"
                                                                    :class="
                                                                        i <=
                                                                        rating.stars
                                                                            ? 'ri-star-fill'
                                                                            : 'ri-star-line'
                                                                    "
                                                                ></i>
                                                            </div>

                                                            <!-- Progress Bar -->
                                                            <div
                                                                class="progress"
                                                            >
                                                                <div
                                                                    class="progress-bar bg-warning"
                                                                    role="progressbar"
                                                                    :style="{
                                                                        width:
                                                                            rating.percentage +
                                                                            '%',
                                                                    }"
                                                                    :aria-valuenow="
                                                                        rating.percentage
                                                                    "
                                                                    aria-valuemin="0"
                                                                    aria-valuemax="100"
                                                                ></div>
                                                            </div>

                                                            <!-- Total Ratings Count -->
                                                            <div
                                                                class="ttl-rating"
                                                            >
                                                                {{
                                                                    rating.count
                                                                }}
                                                                %
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- review submitted -->
                                            <div
                                                class="col-lg-6"
                                                v-if="
                                                    (authUser &&
                                                        !productDetails.user_review) ||
                                                    edit
                                                "
                                            >
                                                <div
                                                    class="review-form offset-lg-1"
                                                >
                                                    <div class="title">
                                                        {{
                                                            lang.write_your_own_review
                                                        }}
                                                    </div>
                                                    <form
                                                        @submit.prevent="
                                                            submitReview
                                                        "
                                                    >
                                                        <div
                                                            class="review-title"
                                                        >
                                                            <star-rating
                                                                v-model:rating="
                                                                    product_form.rating
                                                                "
                                                                :star-size="20"
                                                                active-color="#C9151B"
                                                            ></star-rating>
                                                        </div>

                                                        <div
                                                            class="input-group mb-4"
                                                        >
                                                            <input
                                                                class="form-control"
                                                                v-model="
                                                                    product_form.title
                                                                "
                                                                name="name"
                                                                type="text"
                                                                value=""
                                                                size="30"
                                                                aria-required="true"
                                                                required="required"
                                                            />
                                                        </div>

                                                        <div
                                                            class="input-group"
                                                        >
                                                            <textarea
                                                                name="message"
                                                                v-model="
                                                                    product_form.comment
                                                                "
                                                                class="form-control"
                                                                required="required"
                                                                rows="7"
                                                            ></textarea>
                                                        </div>
                                                        <div
                                                            class="image-upload"
                                                        >
                                                            <input
                                                                type="file"
                                                                class="form-control"
                                                                name="file"
                                                                id="upload-1"
                                                                @change="
                                                                    imageUp(
                                                                        $event
                                                                    )
                                                                "
                                                            />
                                                            <div class="icon">
                                                                <label
                                                                    for="upload-2"
                                                                >
                                                                    <input
                                                                        type="file"
                                                                        class="d-none"
                                                                        @change="
                                                                            imageUp(
                                                                                $event
                                                                            )
                                                                        "
                                                                    />
                                                                    <!-- <i ref="imageUpload" id="upload-image">{{ product_form.image_text }}</i> -->
                                                                    <i
                                                                        class="ri-image-line"
                                                                    ></i>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <!-- <div class="preview-thumb">
                              <div class="single-thumb">
                                <img
                                  :src="static_image_url + 'blog/blog-02.jpg'"
                                  alt=""
                                />
                                <div class="close">
                                  <i class="ri-close-large-fill"></i>
                                </div>
                              </div>
                              <div class="single-thumb">
                                <img
                                  :src="static_image_url + 'blog/blog-02.jpg'"
                                  alt=""
                                />
                                <div class="close">
                                  <i class="ri-close-large-fill"></i>
                                </div>
                              </div>
                              <div class="single-thumb">
                                <img
                                  :src="static_image_url + 'blog/blog-02.jpg'"
                                  alt=""
                                />
                                <div class="close">
                                  <i class="ri-close-large-fill"></i>
                                </div>
                              </div>
                            </div> -->
                                                        <div class="submit-btn">
                                                            <input
                                                                v-if="
                                                                    !review_loading
                                                                "
                                                                type="submit"
                                                                class="btn btn-secondary mt-20"
                                                                :value="
                                                                    lang.send
                                                                "
                                                            />
                                                            <loading_button
                                                                v-else
                                                                :class_name="'btn btn-secondary mt-20'"
                                                            ></loading_button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <!--  -->
                                            <div class="col-12">
                                                <div class="allReview-item">
                                                    <h2 class="title">
                                                        {{
                                                            lang.customer_reviews
                                                        }}
                                                        <small
                                                            >({{
                                                                reviews.total
                                                            }}
                                                            {{
                                                                lang.comments
                                                            }})</small
                                                        >
                                                    </h2>
                                                    <!-- review Item -->
                                                    <div
                                                        class="review-item"
                                                        v-for="(
                                                            review, index
                                                        ) in reviews.data"
                                                        :key="'review' + index"
                                                    >
                                                        <div
                                                            class="review-content"
                                                            v-if="review.user"
                                                        >
                                                            <div class="avatar">
                                                                <router-link
                                                                    :to="{
                                                                        name: 'dashboard',
                                                                    }"
                                                                >
                                                                    <img
                                                                        v-if="
                                                                            review
                                                                                .user
                                                                                .profile_image
                                                                        "
                                                                        loading="lazy"
                                                                        :src="
                                                                            review
                                                                                .user
                                                                                .profile_image
                                                                        "
                                                                        :alt="
                                                                            review
                                                                                .user
                                                                                .full_name
                                                                        "
                                                                    />
                                                                </router-link>
                                                            </div>
                                                            <div
                                                                class="review-desc"
                                                            >
                                                                <div
                                                                    class="review-wrap"
                                                                >
                                                                    <Rating
                                                                        :rating="
                                                                            review.rating
                                                                        "
                                                                    />
                                                                </div>
                                                                <h5
                                                                    class="title"
                                                                >
                                                                    <router-link
                                                                        :to="{
                                                                            name: 'dashboard',
                                                                        }"
                                                                        >{{
                                                                            review
                                                                                .user
                                                                                .full_name
                                                                        }}
                                                                    </router-link>
                                                                </h5>
                                                                <div
                                                                    class="date"
                                                                >
                                                                    {{
                                                                        review.review_date
                                                                    }}
                                                                </div>
                                                                <a
                                                                    class="float-end"
                                                                    v-if="
                                                                        authUser &&
                                                                        review.user_id ==
                                                                            authUser.id
                                                                    "
                                                                    @click="
                                                                        editReview(
                                                                            review
                                                                        )
                                                                    "
                                                                    href="javascript:void(0)"
                                                                    >{{
                                                                        lang.edit
                                                                    }}</a
                                                                >
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="review-para"
                                                        >
                                                            <p>
                                                                {{
                                                                    review.comment
                                                                }}
                                                            </p>
                                                        </div>

                                                        <div
                                                            class="preview-thumb"
                                                            v-if="review.images"
                                                        >
                                                            <div
                                                                class="single-thumb"
                                                            >
                                                                <img
                                                                    loading="lazy"
                                                                    :src="
                                                                        review.image_link
                                                                    "
                                                                    :alt="
                                                                        productDetails.product_name
                                                                    "
                                                                />
                                                            </div>
                                                        </div>

                                                        <div
                                                            class="like-replay"
                                                            v-if="authUser"
                                                        >
                                                            <!-- like and unlike -->
                                                            <a
                                                                v-if="
                                                                    alreadyLiked(
                                                                        review.review_likes
                                                                    )
                                                                "
                                                                href="javascript:void(0)"
                                                                @click="
                                                                    unLike(
                                                                        review.id
                                                                    )
                                                                "
                                                                class="avarage-reaction"
                                                            >
                                                                <span>
                                                                    <i
                                                                        class="ri-thumb-up-line"
                                                                    ></i>
                                                                    ({{
                                                                        review.review_likes
                                                                            ? review
                                                                                  .review_likes
                                                                                  .length
                                                                            : 0
                                                                    }})
                                                                </span>
                                                            </a>

                                                            <a
                                                                v-else
                                                                href="javascript:void(0)"
                                                                @click="
                                                                    reviewLike(
                                                                        review.id
                                                                    )
                                                                "
                                                                class="avarage-reaction"
                                                            >
                                                                <span>
                                                                    <i
                                                                        class="ri-thumb-up-line"
                                                                    ></i>
                                                                    ({{
                                                                        review.review_likes
                                                                            ? review
                                                                                  .review_likes
                                                                                  .length
                                                                            : 0
                                                                    }})
                                                                </span>
                                                            </a>

                                                            <!-- Share -->
                                                            <a
                                                                href="javascript:void(0)"
                                                                class="avarage-reaction"
                                                                @click="
                                                                    toggleReplyForm(
                                                                        review.id
                                                                    )
                                                                "
                                                            >
                                                                <span>
                                                                    Share
                                                                </span>
                                                            </a>

                                                            <!-- replay -->
                                                            <a
                                                                href="javascript:void(0)"
                                                                v-if="
                                                                    review
                                                                        .replies
                                                                        .length >
                                                                    0
                                                                "
                                                                class="avarage-reaction"
                                                                @click="
                                                                    showReplies(
                                                                        review.id
                                                                    )
                                                                "
                                                            >
                                                                <span>
                                                                    <i
                                                                        class="ri-thumb-up-line"
                                                                    ></i>
                                                                    {{
                                                                        review
                                                                            .replies
                                                                            .length
                                                                    }}
                                                                    {{
                                                                        lang.replies
                                                                    }}
                                                                </span>
                                                            </a>
                                                        </div>

                                                        <form
                                                            @submit.prevent="
                                                                reviewReply(
                                                                    review.id
                                                                )
                                                            "
                                                            v-if="
                                                                reply_form ==
                                                                review.id
                                                            "
                                                            class="mt-5"
                                                        >
                                                            <div class="row">
                                                                <div
                                                                    class="col-lg-1 pr-0"
                                                                ></div>
                                                                <div
                                                                    class="col-lg-9 pl-0"
                                                                >
                                                                    <textarea
                                                                        v-model="
                                                                            product_form.reply
                                                                        "
                                                                        class="form-control reply_box"
                                                                        required="required"
                                                                        rows="2"
                                                                    ></textarea>
                                                                </div>
                                                                <div
                                                                    class="col-lg-2"
                                                                >
                                                                    <input
                                                                        v-if="
                                                                            !reply_loading
                                                                        "
                                                                        type="submit"
                                                                        class="btn btn-primary"
                                                                        value="Send"
                                                                    />
                                                                    <loading_button
                                                                        v-else
                                                                        :class_name="'btn btn-primary'"
                                                                    ></loading_button>
                                                                </div>
                                                            </div>
                                                        </form>

                                                        <!-- review replay -->
                                                        <ul
                                                            class="children global-list"
                                                            v-if="
                                                                review.replies &&
                                                                replies ==
                                                                    review.id
                                                            "
                                                        >
                                                            <li
                                                                v-for="(
                                                                    reply, index
                                                                ) in review.replies"
                                                                :key="
                                                                    'reply' +
                                                                    index
                                                                "
                                                            >
                                                                <div
                                                                    class="comment_info"
                                                                >
                                                                    <div
                                                                        class="commenter-avatar"
                                                                        v-if="
                                                                            reply.user
                                                                        "
                                                                    >
                                                                        <router-link
                                                                            :to="{
                                                                                name: 'dashboard',
                                                                            }"
                                                                            ><img
                                                                                class="img-fluid"
                                                                                loading="lazy"
                                                                                :src="
                                                                                    reply
                                                                                        .user
                                                                                        .profile_image
                                                                                "
                                                                                :alt="
                                                                                    reply
                                                                                        .user
                                                                                        .full_name
                                                                                "
                                                                        /></router-link>
                                                                    </div>
                                                                    <div
                                                                        class="comment-box"
                                                                    >
                                                                        <div
                                                                            class="comment-title"
                                                                        >
                                                                            <span
                                                                                class="title-1"
                                                                                v-if="
                                                                                    reply.user
                                                                                "
                                                                                ><router-link
                                                                                    :to="{
                                                                                        name: 'dashboard',
                                                                                    }"
                                                                                    class="url"
                                                                                    >{{
                                                                                        reply
                                                                                            .user
                                                                                            .full_name
                                                                                    }}</router-link
                                                                                ></span
                                                                            >
                                                                            <div
                                                                                class="comment-meta"
                                                                            >
                                                                                <ul
                                                                                    class="global-list"
                                                                                >
                                                                                    <li>
                                                                                        <a
                                                                                            href="javascript:void(0)"
                                                                                            >{{
                                                                                                reply.reply_date
                                                                                            }}</a
                                                                                        >
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!-- /.comment-box -->
                                                                    <p>
                                                                        {{
                                                                            reply.reply
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <!-- review replay -->
                                                    </div>

                                                    <div
                                                        class="all-review mt-30"
                                                        v-if="
                                                            reviews.next_page_url
                                                        "
                                                    >
                                                        <a
                                                            href="javascript:void(0)"
                                                            @click="
                                                                loadReviews()
                                                            "
                                                            class="btn btn-primary"
                                                            >{{
                                                                lang.show_more
                                                            }}</a
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- product details and reviews -->
            </div>
        </section>
        <!-- product Single Section End -->
        <section class="product-single py-30" v-else-if="shimmer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 col-md-6">
                        <shimmer :height="630"></shimmer>
                    </div>
                    <div class="col-lg-5 col-md-6">
                        <div class="productDetail-wrapper">
                            <div>
                                <shimmer :height="200"></shimmer>
                            </div>

                            <div style="margin: 15px 0px">
                                <shimmer :height="200"></shimmer>
                            </div>

                            <div>
                                <shimmer :height="200"></shimmer>
                            </div>
                        </div>

                        <!-- <div class="row">
              <div class="col-md-8">
                <div class="products-details-info">
                  <ul class="global-list d-flex justify-content-between">
                    <div class="row">
                      <div class="col-lg-4" v-for="(list, i) in 21" :key="i">
                        <shimmer class="al-height mb-3" :height="20"></shimmer>
                      </div>
                    </div>
                  </ul>
                  <div class="stock-delivery">
                    <shimmer class="de-margin" v-for="(list, i) in 2" :key="i" :height="100"></shimmer>
                  </div>
                  <div class="row">
                    <div class="col-lg-4" v-for="(list, i) in 15" :key="i">
                      <shimmer class="al-height mb-3" :height="20"></shimmer>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <shimmer class="mb-3" v-for="(list, i) in 2" :key="i" :height="list == 1 ? 200 : 300"></shimmer>
              </div>
            </div> -->
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import ProductThumb from "@/components/ProductThumb.vue";
import Shimmer from "@/components/Shimmer.vue";
import Store from "@/components/Store.vue";
import StarRating from "vue-star-rating";

import Rating from "@/components/Product/Rating.vue";

export default {
    props: ["productDetails"],
    data() {
        return {
            clickedSlide: 0,
            currentCarousel: "0",
            added_to_cart: false,
            firstStock: {
                stock: 0,
                sku: "",
                price: 0,
                special_discount_check: 0,
            },

            activeNav: "details",
            hoveredReview: 0,
            reply_form: 0,
            replies: 0,
            paginate: 1,
            edit: false,
            review_loading: false,
            like_loading: false,
            reply_loading: false,
            percentages: [],
            totalRatings: 100,
            reviews: {
                data: [],
                total: 0,
            },
            total_price: 0,
            productView: {
                slug: this.$route.params.slug,
            },
            disable: false,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            index: null,
            large_image: "",
            current_index: 0,
            colors: [],
            attribute_list: [],
            attribute_values: [],
            attribute_selector: 0,
            selected_stock: [],
            allowed_attributes: [],
            attributes_fetched: false,

            // dummy
            static_image_url: "",
            TabsTitleLoop: [{ title: "Description" }, { title: "Reviews" }],
            TabsContentLoop: [
                { title: "Description", content: "Description" },
                { title: "Reviews", content: "Average Rating" },
            ],

            select_color: "",
            select_size: "",
        };
    },

    components: {
        ProductThumb,
        Shimmer,
        Store,
        Rating,
        StarRating,
    },

    mounted() {
        if (this.productDetails && this.productDetails.form) {
            document.title = this.productDetails.product_name;
            if (this.productDetails.special_discount_check > 0) {
                this.setCountDown();
            }
            this.product_form.quantity = this.productDetails.form.quantity;
            this.product_form.variants_ids =
                this.productDetails.form.variants_ids;
            this.product_form.variants_name =
                this.productDetails.form.variants_name;
            this.product_form.id = this.productDetails.form.id;
            this.product_form.color_id = this.productDetails.form.color_id;
            this.product_form.attribute_values =
                this.productDetails.form.attribute_values;
            this.large_image = this.productDetails.gallery.large[0];
            if (this.productDetails.attribute_selector == 1) {
                this.getAttributes();
            }
        }
    },

    watch: {
        productDetails() {
            if (this.productDetails && this.productDetails.form) {
                if (this.productDetails.special_discount_check > 0) {
                    this.setCountDown();
                }
                document.title = this.productDetails.product_name;
                this.product_form.quantity = this.productDetails.form.quantity;
                this.product_form.sku = this.productDetails.form.sku;
                this.product_form.variants_name =
                    this.productDetails.form.variants_name;
                this.product_form.id = this.productDetails.form.id;
                this.large_image = this.productDetails.gallery.large[0];
                if (this.productDetails.attribute_selector == 1) {
                    this.getAttributes();
                }
            }
        },
        index() {
            console.log(this.index);
        },
    },
    computed: {
        compareProducts() {
            return this.$store.getters.getUserCompare;
        },
        shimmer() {
            return this.$store.state.module.shimmer;
        },
        attributes() {
            return this.$store.getters.getProductAttributes;
        },
        carts() {
            let carts = this.$store.getters.getCarts;
            if (carts && carts[0]) {
                this.product_form.trx_id = carts[0].trx_id;
            }
            return carts;
        },

        ratingsData() {
            return Object.keys(this.percentages)
                .sort((a, b) => b - a)
                .map((star) => ({
                    stars: Number(star),
                    percentage: this.percentages[star],
                    count: Math.round(
                        (this.percentages[star] / 100) * this.totalRatings
                    ),
                }));
        },

        // totalReviewLikes() {
        //   const total = this.reviews.data.reduce((sum, review) => {
        //     return sum + (review.review_likes?.length || 0);
        //   }, 0);

        //   return this.formatNumberToK(total);
        // }
    },
    methods: {
        formatNumberToK(num) {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
            }
            if (num >= 1000) {
                return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
            }
            return num.toString();
        },

        setCountDown() {
            this.days = this.productDetails.countdown.days;
            this.hours = this.productDetails.countdown.hours;
            this.minutes = this.productDetails.countdown.mins;
            this.seconds = this.productDetails.countdown.secs;
            this.countDownTimer();
        },
        countDownTimer() {
            setTimeout(() => {
                this.seconds -= 1;
                if (this.seconds <= 0) {
                    this.seconds = 59;
                    this.minutes -= 1;
                    if (this.minutes < 0) {
                        this.minutes = 59;
                        this.hours -= 1;
                        if (this.hours < 0) {
                            this.hours = 23;
                            this.days -= 1;
                        }
                    }
                }
                this.countDownTimer();
            }, 1000);
        },
        pageChange(curr_page) {
            this.currentCarousel = curr_page;
        },
        checkCompare() {
            let length = Object.keys(this.compareProducts).length;
            let product = this.productDetails;
            for (let i = 0; i < length; i++) {
                if (
                    this.compareProducts[i] &&
                    product.id == this.compareProducts[i].id
                ) {
                    return true;
                }
            }
            return false;
        },
        removeCompare() {
            if (this.disable) {
                return false;
            }
            this.disable = true;
            let url = this.getUrl(
                "home/remove-compare_product/" + this.productDetails.id
            );
            axios.get(url).then((response) => {
                this.disable = false;
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.$store.commit(
                        "getRemoveCompare",
                        response.data.product
                    );
                    this.$store.dispatch(
                        "compareList",
                        response.data.compare_list
                    );
                }
            });
        },
        compare() {
            if (this.disable) {
                return false;
            }
            this.disable = true;
            let url = this.getUrl(
                "home/add-to-compare/" + this.productDetails.id
            );
            axios.get(url).then((response) => {
                this.disable = false;
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.$store.commit("getUserCompare", response.data.product);
                    this.$store.dispatch(
                        "compareList",
                        response.data.compare_list
                    );
                }
            });
        },

        stockFind() {
            return (this.firstStock = {
                stock: this.productDetails.product_stock.current_stock,
                sku: this.productDetails.product_stock.sku,
                price: this.productDetails.product_stock.price,
                special_discount_check:
                    this.productDetails.product_stock.special_discount_check,
            });
        },
        priceFind() {
            let price = this.productDetails.price;

            if (this.productDetails.wholesale_prices) {
                let whole_sales = this.productDetails.wholesale_prices;

                for (let i = 0; i < whole_sales.length; i++) {
                    if (
                        whole_sales[i].min_qty <= this.product_form.quantity &&
                        whole_sales[i].max_qty >= this.product_form.quantity
                    ) {
                        price = whole_sales[i].price;
                        break;
                    }
                }
            }
            return this.priceFormat(price * this.product_form.quantity);
        },


        attributeSelect(el, index, value) {
            // console.log(el, index, value)
            // return ;

            // this.select_size = value

            let selected_attribute = 0;

            if (this.product_form.attribute_values.length > 0) {
                selected_attribute += this.product_form.attribute_values.length;
            }

            if (this.product_form.color_id) {
                selected_attribute++;
            }

            if (index) {
                this.selected_stock[index] = value;
            }
            if (selected_attribute < this.productDetails.attribute_selector) {
                if (
                    selected_attribute + 1 ==
                    this.productDetails.attribute_selector
                ) {
                    console.log(value)

                    return this.getAttributes(value);
                }
                return false;
            }
            return this.fetchAttributeStock(value);
        },



        fetchAttributeStock(value) {
            this.select_color = this.product_form.color_id;
            let formData = {
                color_id: this.product_form.color_id,
                product_id: this.productDetails.id,
                variant_ids: this.selected_stock,
                selected_variant: value,
                trx_id:
                    this.carts && this.carts.length > 0
                        ? this.carts[0].trx_id
                        : "",
            };

            let url = this.getUrl("find/products-variants");
            axios.post(url, formData).then((response) => {
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    if (response.data.images) {
                        this.currentCarousel =
                            response.data.images["image_72x72_0"];

                        for (
                            let i = 0;
                            i < this.productDetails.gallery.length;
                            i++
                        ) {
                            if (
                                this.productDetails.gallery[i] ==
                                response.data.images["image_320x320"]
                            ) {
                                this.productDetails.gallery[i] =
                                    response.data.images["image_320x320"];
                                this.clickedSlide = i;
                            }
                        }
                    }
                    if (response.data.product_stock) {
                        this.productDetails.product_stock.current_stock =
                            response.data.product_stock.current_stock;
                        this.productDetails.product_stock.sku =
                            response.data.product_stock.sku;
                        this.productDetails.product_stock.price =
                            response.data.product_stock.price;
                        this.productDetails.product_stock.discount_percentage =
                            response.data.product_stock.discount_percentage;
                        this.product_form.variants_ids =
                            response.data.product_stock.variant_ids;
                        this.product_form.variants_name =
                            response.data.product_stock.name;
                    } else {
                        this.$toast.error(
                            response.data.msg,
                            this.lang.Error + " !!"
                        );
                    }
                }
            });
        },
        getAttributes() {
            let formData = {
                color_id: this.product_form.color_id,
                product_id: this.productDetails.id,
                variant_ids: this.selected_stock,
            };

            let url = this.getUrl("find/variants");
            axios.post(url, formData).then((response) => {
                this.allowed_attributes = response.data.variants;
                this.attributes_fetched = true;
            });
        },
        checkDisable(index, value) {
            if (this.attributes_fetched) {
                if (
                    this.productDetails.product_colors.length > 0 &&
                    this.productDetails.attribute_values.length > 0
                ) {
                    return (
                        this.productDetails.attribute_selector == index + 2 &&
                        !this.allowed_attributes.includes(value.id)
                    );
                } else {
                    return (
                        this.productDetails.attribute_selector == index + 1 &&
                        !this.allowed_attributes.includes(value.id)
                    );
                }
            }
            return false;
        },
        cartPlus() {
            if (
                this.product_form.quantity != this.firstStock.stock &&
                this.product_form.quantity < this.firstStock.stock
            ) {
                this.product_form.quantity++;
            } else {
                this.$toast.warning(
                    this.lang.Only +
                        " " +
                        this.firstStock.stock +
                        " " +
                        this.lang.items_available_at_this_time,
                    this.lang.Error + " !!"
                );
            }
        },
        cartMinus() {
            if (
                this.product_form.quantity >
                this.productDetails.minimum_order_quantity
            ) {
                this.product_form.quantity--;
            } else {
                this.$toast.warning(
                    this.lang.please_order_minimum_of +
                        " " +
                        this.productDetails.minimum_order_quantity +
                        " " +
                        this.lang.Quantity,
                    this.lang.Warning + " !!"
                );
            }
        },
        addToCart(min_qty, buy, is_buy_now) {
            if (
                is_buy_now == 1 &&
                !this.authUser &&
                this.settings.disable_guest
            ) {
                this.$toast.error(
                    this.lang.login_first,
                    this.lang.Error + " !!"
                );
                return this.$router.push({ name: "login" });
            }
            if (
                this.productDetails.has_variant &&
                !this.product_form.variants_ids
            ) {
                return this.$toast.error(
                    this.lang.please_select_all_attributes,
                    this.lang.Error + " !!"
                );
            }
            if (is_buy_now == 1) {
                this.product_form.is_buy_now = 1;
            } else {
                this.product_form.is_buy_now = 0;
            }
            let carts = this.carts;
            let url = this.getUrl("user/addToCart");
            axios.post(url, this.product_form).then((response) => {
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.$toast.success(
                        response.data.success,
                        this.lang.Success + " !!"
                    );
                    let carts = response.data.carts;
                    if (buy) {
                        $("#product").modal("hide");
                    }
                    this.$store.dispatch("carts", carts);
                    this.resetForm();
                    this.productDetails.product_stock.current_stock =
                        this.productDetails.product_stock.current_stock -
                        this.product_form.quantity;
                    this.product_form.quantity = min_qty;
                    if (buy) {
                        this.$router.push({ name: "checkout" });
                    } else {
                        this.added_to_cart = true;
                        setTimeout(() => {
                            this.added_to_cart = false;
                        }, 2000);
                    }
                }
            });
        },
        quantityCheck() {
            if (
                this.product_form.quantity != this.firstStock.stock &&
                this.product_form.quantity < this.firstStock.stock
            ) {
                this.product_form.quantity++;
            } else {
                this.product_form.quantity = this.firstStock.stock;
                this.$toast.warning(
                    this,
                    lang.only +
                        this.stockFind().stock +
                        " " +
                        this.lang.items_available_at_this_time,
                    this.lang.Warning + " !!"
                );
            }

            if (
                this.product_form.quantity >
                this.productDetails.minimum_order_quantity
            ) {
                this.product_form.quantity--;
            } else {
                this.product_form.quantity =
                    this.productDetails.minimum_order_quantity;
                this.$toast.warning(
                    this.lang.please_order_minimum_of +
                        this.productDetails.minimum_order_quantity +
                        " " +
                        this.lang.Quantity,
                    this.lang.Warning + " !!"
                );
            }
        },
        productType() {
            return !(
                this.productDetails.is_catalog == 1 ||
                this.productDetails.is_classified == 1
            );
        },
        submitReview() {
            if (this.product_form.rating == 0) {
                return this.$toast.error(
                    this.lang.choose_a_rating_star_first,
                    this.lang.Error + " !!"
                );
            }
            this.review_loading = true;
            this.product_form.product_id = this.productDetails.id;
            this.product_form.paginate = this.paginate;
            let url = this.getUrl("user/product-review-store");

            const formData = this.$objectToFormData(this.product_form);

            // axios
            //   .post(url, this.product_form, {
            //     transformRequest: [
            //       function (data, headers) {
            //         return objectToFormData(data);
            //       },
            //     ],
            //   })
            axios
                .post(url, formData)
                .then((response) => {
                    this.review_loading = false;
                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        // this.$toast.success(
                        //     response.data.success,
                        //     this.lang.Success + " !!"
                        // );
                        // this.resetForm();
                        // this.reviews = response.data.reviews;
                        // this.edit = false;
                        // this.percentages = response.data.percentages;
                        // this.$store.dispatch(
                        //     "productDetails",
                        //     this.$route.params.slug
                        // );
                        // this.productDetails.user_review = true;
                    }
                })
                .catch((error) => {
                    this.review_loading = false;
                });
        },
        fetchReviews() {
            this.activeNav = "delivery";
            if (this.reviews.data.length == 0) {
                let url = this.getUrl(
                    "home/product-reviews/" + this.productDetails.id
                );
                axios
                    .get(url)
                    .then((response) => {
                        if (response.data.error) {
                            this.$toast.error(
                                response.data.error,
                                this.lang.Error + " !!"
                            );
                        } else {
                            this.reviews = response.data.reviews;
                            this.percentages = response.data.percentages;
                        }
                    })
                    .catch((error) => {
                        this.$toast.error(
                            this.lang.Oops,
                            this.lang.Error + " !!"
                        );
                    });
            }
        },
        reviewReply(review_id) {
            this.reply_loading = true;
            this.product_form.review_id = review_id;
            this.product_form.product_id = this.productDetails.id;
            this.product_form.paginate = this.paginate;
            let url = this.getUrl("home/product-reply-store");
            axios
                .post(url, this.product_form)
                .then((response) => {
                    this.reply_loading = false;
                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        this.$toast.success(
                            response.data.success,
                            this.lang.Success + " !!"
                        );
                        this.resetForm();
                        this.reviews.data = response.data.reviews.data;
                        this.reviews.next_page_url =
                            response.data.reviews.next_page_url;
                        this.reviews.total = response.data.reviews.total;
                    }
                })
                .catch((error) => {
                    this.reply_loading = false;
                });
        },
        toggleReplyForm(review_id) {
            if (this.reply_form == review_id) {
                this.reply_form = 0;
            } else {
                this.reply_form = review_id;
            }
        },
        showReplies(review_id) {
            if (this.replies == review_id) {
                this.replies = 0;
            } else {
                this.replies = review_id;
            }
        },
        loadReviews() {
            this.paginate++;
            let url = this.getUrl(
                "home/product-reviews/" +
                    this.productDetails.id +
                    "?page=" +
                    this.paginate
            );
            axios.get(url).then((response) => {
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    let reviews = response.data.reviews.data;

                    if (reviews.length > 0) {
                        for (let i = 0; i < reviews.length; i++) {
                            this.reviews.data.push(reviews[i]);
                        }
                    }
                }
                this.reviews.next_page_url =
                    response.data.reviews.next_page_url;
            });
        },
        reviewLike(id) {
            let data = {
                paginate: this.paginate,
                id: id,
                product_id: this.productDetails.id,
            };
            this.like_loading = true;
            let url = this.getUrl("product/like-review");
            axios
                .post(url, data)
                .then((response) => {
                    this.like_loading = false;

                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        if (response.data.success) {
                            this.$toast.success(
                                response.data.success,
                                this.lang.Success + " !!"
                            );
                        }
                        this.reviews.data = response.data.reviews.data;
                        this.reviews.next_page_url =
                            response.data.reviews.next_page_url;
                        this.reviews.total = response.data.reviews.total;
                    }
                })
                .catch((error) => {
                    this.like_loading = false;
                });
        },
        unLike(id) {
            let data = {
                paginate: this.paginate,
                id: id,
                product_id: this.productDetails.id,
            };
            this.like_loading = true;

            let url = this.getUrl("product/unlike-review");
            axios
                .post(url, data)
                .then((response) => {
                    this.like_loading = false;

                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        if (response.data.success) {
                            this.$toast.success(
                                response.data.success,
                                this.lang.Success + " !!"
                            );
                        }
                        this.reviews.data = response.data.reviews.data;
                        this.reviews.next_page_url =
                            response.data.reviews.next_page_url;
                        this.reviews.total = response.data.reviews.total;
                    }
                })
                .catch((error) => {
                    this.like_loading = false;
                });
        },
        editReview(review) {
            this.edit = true;
            this.product_form.product_id = this.productDetails.id;
            this.product_form.rating = review.rating;
            this.product_form.title = review.title;
            this.product_form.comment = review.comment;
            let file_name = review.image_link;
            if (file_name) {
                let array = file_name.split("/");
                this.product_form.image_text = array[array.length - 1];
            }
        },
        imageUp(event) {
            this.product_form.image = event.target.files[0];
            // document.getElementById("upload-image").innerHTML =
            //   this.product_form.image.name;
        },
        variantClass(code) {
            return {
                border: "1px solid " + code,
            };
        },
    },
};
</script>

<style scoped>
.product-offer {
    margin-bottom: 20px;
}

.product-border {
    padding: 20px;
    border-radius: 4px;
    border: 1px solid #e1e1e1;
}

.like-replay {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* .comment_info {
  display: flex;
  align-items: center;
  gap: 20px;
} */
.commenter-avatar {
    width: 60px;
    height: 60px;
}

.commenter-avatar {
    float: left;
    margin-inline-end: 15px !important;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    overflow: hidden;
    background-color: #f7f5f6;
}

.comment-box {
    overflow: hidden;
}

ul.children.global-list {
    list-style: none;
    padding-left: 40px;
    margin-top: 30px;
    margin-bottom: 20px;
}

.comment_info p {
    margin-top: 15px;
    color: #666;
    line-height: 30px;
}
</style>
