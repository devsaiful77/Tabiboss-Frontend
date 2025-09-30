<template lang="html">
    <!-- Product Single Content -->
    <div class="productDetail-wrapper">
        <h2 class="productDetail-title">
            {{ productDetails.product_name }}
        </h2>
        <!-- Meta Start -->
        <div class="productDetail-meta">
            <div
                class="meta-item"
                v-if="stockFind() && stockFind().sku && attributes_fetched"
            >
                {{ lang.SKU }} :<span>{{ stockFind().sku }}</span>
            </div>

            <div class="meta-item" v-if="productDetails.rating > 0">
                {{ productDetails.rating.toFixed(2) }}

                <div class="rating">
                    <i
                        v-for="i in 5"
                        :key="i"
                        :class="
                            i <= Math.round(productDetails.rating)
                                ? 'ri-star-fill'
                                : 'ri-star-line'
                        "
                    ></i>
                </div>

                <div class="total-rating">
                    ({{ productDetails.reviews_count }} {{ lang.reviews }})
                </div>
            </div>
            <a
                class="meta-item"
                v-if="checkCompare()"
                href="javascript:void(0)"
                @click="removeCompare"
                ><i class="ri-repeat-line"></i>{{ lang.remove }}</a
            >
            <a
                class="meta-item"
                v-else
                href="javascript:void(0)"
                @click="compare"
                ><i class="ri-repeat-line"></i>{{ lang.compare }}</a
            >
        </div>

        <!-- price section -->
        <h3 class="variations_price" v-if="productDetails.has_variant">
            <span>{{ lang.variations_price }} :</span> {{ productDetails.variation_price }}
        </h3>


        <!-- wholesale price -->
        <h3 class="productDetail-price" v-if="!productDetails.is_wholesale">
            <span v-if="productDetails.special_discount_check > 0">{{
                priceFormat(productDetails.product_stock.discount_percentage)
            }}</span>

            <span v-else>{{
                priceFormat(productDetails.product_stock.price)
            }}</span>
            <del v-if="productDetails.special_discount_check > 0">
                {{ priceFormat(productDetails.product_stock.price) }}</del
            >

            <div class="discount-price-show" v-if="productDetails.special_discount_check > 0">
                <p class="text-start">
                    {{ lang.you_save }}
                    <span>{{
                        productDetails.special_discount_type == "flat"
                            ? priceFormat(productDetails.special_discount_check)
                            : productDetails.special_discount_check + "%"
                    }}</span>
                </p>
            </div>
        </h3>

        <h3 class="productDetail-price" v-else>
            <span>{{ priceFormat(productDetails.price) }} </span>
        </h3>


        <div class="mb-4"
            v-if="productDetails.short_description"
            v-html="productDetails.short_description"
        ></div>

        <!-- product attribute -->
        <div class="product-attr">
            <div class="list" v-if="productDetails.brand_title">
                {{ lang.brands }} :
                <span>{{ productDetails.brand_title }}</span>
            </div>

            <div
                class="list"
                v-if="
                    productType() &&
                    productDetails.is_digital != 1 &&
                    productDetails.stock_visibility != 'hide_stock'
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

            <!-- has color wise variant -->
            <div class="mb-3" v-if="productDetails.color_wise_variant">
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
                            @change="setCwvColor(color.id)"
                        >
                            <label>
                                <input
                                    type="radio"
                                    class="d-none"
                                    :id="'color' + color.id"
                                    :value="color.id"
                                    v-model="product_form.color_id"
                                />
                                <div
                                    class="box"
                                    :style="'background:' + color.code"
                                    :class="[
                                        {
                                            selected: select_color == color.id,
                                        },
                                    ]"
                                ></div>
                            </label>
                        </li>
                    </ul>
                </div>

                <!-- attribute -->
                <template v-if="attributes.length > 0">
                    <div
                        class="list"
                        v-for="(attribute, attribute_index) in attributes"
                        :key="'attribute' + attribute_index"
                    >
                        {{ attribute.title }}:
                        <ul
                            class="product-attr-size"
                            v-if="cws_variants && cws_variants.length > 0"
                        >
                            <template
                                v-for="(item, item_index) in cws_variants"
                                :key="item_index"
                            >
                                <li
                                    v-if="item.attribute_id == attribute.id"
                                    :class="{
                                        selected: select_size == item.id,
                                    }"
                                    @click="
                                        setVariant(
                                            'cwv_variant',
                                            attribute.id,
                                            item.id
                                        )
                                    "
                                >
                                    {{ item.value }}
                                </li>
                            </template>
                        </ul>
                    </div>
                </template>
            </div>

            <!-- without color wise variant -->
            <div class="mb-3" v-else>
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
                            @change="setColor(color.id)"
                        >
                            <label>
                                <input
                                    type="radio"
                                    class="d-none"
                                    :id="'color' + color.id"
                                    :value="color.id"
                                    v-model="product_form.color_id"
                                />
                                <div
                                    class="box"
                                    :style="'background:' + color.code"
                                    :class="[
                                        {
                                            selected: select_color == color.id,
                                        },
                                    ]"
                                ></div>
                            </label>
                        </li>
                    </ul>
                </div>

                <!-- attribute -->

                <!-- {{ attributes }} -->
                <div
                    class="list"
                    v-for="(attribute, attribute_index) in attributes"
                    :key="'attribute' + attribute_index"
                    v-if="attributes.length > 0"
                >
                    {{ attribute.title }}:
                    <ul
                        class="product-attr-size"
                        v-if="
                            productDetails.attribute_values &&
                            productDetails.attribute_values.length > 0
                        "
                    >
                        <template
                            v-for="(
                                item, item_index
                            ) in productDetails.attribute_values"
                            :key="item_index"
                        >
                            <li
                                v-if="item.attribute_id == attribute.id"
                                :class="{ selected: select_size == item.id }"
                                @click="
                                    setVariant('att', attribute.id, item.id)
                                "
                            >
                                {{ item.value }}
                            </li>
                        </template>




                    </ul>
                </div>
            </div>

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
                    productDetails.special_discount_check > 0 &&
                    productDetails.is_wholesale != 1
                "
                >{{
                    priceFormat(
                        productDetails.product_stock.discount_percentage *
                            product_form.quantity
                    )
                }}
            </span>
            <span v-else-if="productDetails.is_wholesale != 1">{{
                priceFormat(
                    productDetails.product_stock.price * product_form.quantity
                )
            }}</span>
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
                            addToCart(productDetails.minimum_order_quantity)
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
                <h5 class="title">{{ lang.share }} :</h5>
                <ul class="social-list">
                    <li>
                        <a
                            target="_blank"
                            :href="
                                'https://www.facebook.com/sharer/sharer.php?u=' +
                                getUrl('product/' + productDetails.slug)
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
                                getUrl('product/' + productDetails.slug)
                            "
                            ><i class="ri-twitter-x-fill"></i
                        ></a>
                    </li>
                    <li>
                        <a
                            target="_blank"
                            :href="
                                'https://www.linkedin.com/sharing/share-offsite?mini=true&url=' +
                                getUrl('product/' + productDetails.slug) +
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
                                getUrl('product/' + productDetails.slug)
                            "
                            ><i class="ri-whatsapp-line"></i
                        ></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Product Single Content -->
</template>

<script>
import QuantityItem from "./QuantityItem.vue";
import Store from "@/components/Store.vue";

export default {
    components: {
        QuantityItem,
        Store,
    },

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

            cws_variants: [],
            select_color: "",
            select_size: "",
            cwv_color_id: "",
        };
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
        setCwvColor(color_id) {
            this.select_size = ""
            this.select_color = "";
            this.cwv_color_id = "";


            this.select_color = color_id;
            this.cwv_color_id = color_id;
            return this.getAttributes(color_id);
        },

        setColor(color_id) {
            this.select_color = color_id;
            this.attributeSelect(color_id);
        },

        setVariant(el, attribute_id, variant_id) {
            if (el != "cwv_variant" && !this.cwv_color_id) {
                this.select_size = variant_id;
                this.attributeSelect(el, attribute_id, variant_id);
                return;
            }

            if (this.cwv_color_id) {
                this.select_size = variant_id;
                this.attributeSelect(el, attribute_id, variant_id);
                return;
            }
            this.$toast.warning("select color first.... ");
            return;
        },

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

        removeWishlist() {
            if (this.disable) {
                return false;
            }
            this.disable = true;
            let url = this.getUrl(
                "user/remove-wishlist-product/" + this.productDetails.id
            );
            axios.get(url).then((response) => {
                this.disable = false;
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.productDetails.user_wishlist = null;
                    this.$store.commit(
                        "getRemoveWishlist",
                        response.data.wishlist
                    );
                    this.$store.dispatch(
                        "wishlists",
                        response.data.totalWishlist
                    );
                }
            });
        },

        addToWishlist() {
            if (this.disable) {
                return false;
            }
            this.disable = true;
            let url = this.getUrl(
                "user/add-to-wishlist/" + this.productDetails.id
            );
            axios.get(url).then((response) => {
                this.disable = false;
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.$store.dispatch("wishlists", response.data.wishlists);
                    this.productDetails.user_wishlist = response.data.wishlist;
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
            return this.fetchAttributeStock(value);
        },

        fetchAttributeStock(value) {
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
                color_id: this.select_color,
                product_id: this.productDetails.id,
                variant_ids: this.selected_stock,
            };

            let url = this.getUrl("find/variants");
            axios.post(url, formData).then((response) => {
                this.cws_variants = response.data.variants;
                this.allowed_attributes = response.data.variantIds;
                this.attributes_fetched = true;
            });
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
            this.product_form.is_buy_now = 0;
            let carts = this.carts;
            let url = this.getUrl("user/addToCart");
            axios.post(url, this.product_form).then((response) => {
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    let message = buy == 1 ? 'Redirect To Checkout' : response.data.success
                    this.$toast.success(message);
                    let carts = response.data.carts;
                    this.$store.dispatch("carts", carts);
                    this.resetForm();
                    this.productDetails.product_stock.current_stock =
                        this.productDetails.product_stock.current_stock -
                        this.product_form.quantity;
                    this.product_form.quantity = min_qty;
                    if (buy) {
                        const closeBtn = document.querySelector(
                            '[id="product_modal_close"]'
                        );
                        if (closeBtn) {
                            closeBtn.click();
                        }
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
                        this.$toast.success(
                            response.data.success,
                            this.lang.Success + " !!"
                        );
                        this.resetForm();
                        this.reviews = response.data.reviews;
                        this.edit = false;
                        this.percentages = response.data.percentages;
                        this.$store.dispatch(
                            "productDetails",
                            this.$route.params.slug
                        );
                        this.productDetails.user_review = true;
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

    mounted() {
        this.select_color = "";
        this.select_size = "";
        this.cwv_color_id = "";


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

        if (this.productDetails.attribute_values) {
            this.cws_variants = [...this.productDetails.attribute_values];
        }
    },

    watch: {

        "productDetails.attribute_values": {
            handler(newVal) {
                if (newVal && Array.isArray(newVal)) {
                    this.cws_variants = [...newVal];
                }
            },
            immediate: true,
        },

        productDetails() {

            // Reset selected options
            this.select_color = "";
            this.select_size = "";
            this.cwv_color_id = "";

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
};
</script>
