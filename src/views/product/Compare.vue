<template lang="html">
    <div>
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
                                <li>{{ lang.compare_list }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Breadcrumb Section End -->

        <!-- compare Section Start -->
        <section class="vendor-section py-30 pb-100">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="section-title">
                            <div class="wrap">
                                <h2 class="title">
                                    {{ lang.compare_list }}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- without Shimmer -->
                <!-- <div class="row" v-if="is_shimmer"> -->
                <div class="row" v-if="is_shimmer">
                    <div class="col-12" v-if="compare > 0">
                        <div class="compare-table">
                            <div class="table-responsive">
                                <table>
                                    <template
                                        v-for="(
                                            chunk, chunkIndex
                                        ) in chunkedProducts"
                                        :key="'chunk' + chunkIndex"
                                    >
                                        <tbody>
                                            <tr>
                                                <th class="title">
                                                    {{ lang.name }}
                                                </th>
                                                <td
                                                    v-for="(
                                                        product, index
                                                    ) in chunk"
                                                    :key="index"
                                                >
                                                    <div class="product-header">
                                                        <router-link
                                                            :to="{
                                                                name: 'product.details',
                                                                params: {
                                                                    slug: product.slug,
                                                                },
                                                            }"
                                                        >
                                                            <img
                                                                class="compare-thumb"
                                                                loading="lazy"
                                                                :src="
                                                                    product.image_190x230
                                                                "
                                                                :alt="
                                                                    product.product_name
                                                                "
                                                            />
                                                            <span>{{
                                                                product.product_name
                                                            }}</span>
                                                        </router-link>
                                                        <button
                                                            class="removeBtn"
                                                            type="button"
                                                            @click="
                                                                removeProduct(
                                                                    product.id
                                                                )
                                                            "
                                                        >
                                                            ✖
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <th class="title">
                                                    {{ lang.price }}
                                                </th>
                                                <td
                                                    v-for="(
                                                        product, index
                                                    ) in chunk"
                                                    :key="'price' + index"
                                                >
                                                    <span class="price"
                                                        ><del
                                                            v-if="
                                                                product.special_discount_check >
                                                                0
                                                            "
                                                            >{{
                                                                priceFormat(
                                                                    product.price
                                                                )
                                                            }}</del
                                                        >
                                                        <span
                                                            v-if="
                                                                product.special_discount_check >
                                                                0
                                                            "
                                                        >
                                                            {{
                                                                priceFormat(
                                                                    product.discount_percentage
                                                                )
                                                            }}
                                                        </span>
                                                        <span v-else>{{
                                                            priceFormat(
                                                                product.price
                                                            )
                                                        }}</span>
                                                    </span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <th class="title">
                                                    {{ lang.brand }}
                                                </th>
                                                <td
                                                    v-for="(
                                                        product, index
                                                    ) in chunk"
                                                    :key="'brand' + index"
                                                >
                                                    {{ product.brand }}
                                                </td>
                                            </tr>

                                            <tr>
                                                <th class="title">
                                                    {{ lang.category }}
                                                </th>
                                                <td
                                                    v-for="(
                                                        product, index
                                                    ) in chunk"
                                                    :key="'category' + index"
                                                >
                                                    {{ product.category }}
                                                </td>
                                            </tr>

                                            <tr>
                                                <th class="title">&nbsp;</th>

                                                <td
                                                    v-for="(
                                                        product, index
                                                    ) in chunk"
                                                    :key="'btn' + index"
                                                >
                                                    <div
                                                        class="text-center show-more"
                                                    >
                                                        <a
                                                            v-if="
                                                                product.status ==
                                                                'published'
                                                            "
                                                            href="javascript:void(0)"
                                                            @click="
                                                                cartBtn(product)
                                                            "
                                                            class="btn btn-primary"
                                                            >{{
                                                                lang.add_o_cart
                                                            }}</a
                                                        >
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12" v-else>
                        <div class="compare-table">
                            <h4>{{ lang.no_product_found }}</h4>
                        </div>
                    </div>

                </div>

                <!-- <div class="row" v-else-if="shimmer"> -->
                <div class="row" v-else-if="shimmer">
                    <div class="col-12">
                        <div class="compare-table">
                            <div class="row">
                                <div class="col-md-3" v-for="i in 4" :key="i">
                                    <Shimmer :height="600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- compare Section End -->
    </div>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";

export default {
    components: { Shimmer },

    data() {
        return {
            products: [],
            active_modal: "",
            is_shimmer: false,
        };
    },
    methods: {
        // required
        compareList() {
            let url = this.getUrl("home/compare-list");
            this.$progress.start();
            axios.get(url).then((response) => {
                this.is_shimmer = true;
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.products = response.data.products;
                    this.$progress.finish();
                }
            });
        },
        removeProduct(id) {
            let url = this.getUrl("home/remove-compare_product/" + id);
            axios.get(url).then((response) => {
                this.is_shimmer = true;
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.products = response.data.products;
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
    },

    mounted() {
        this.compareList();
    },
    computed: {
        chunkedProducts() {
            const chunkSize = 3;
            const chunks = [];
            for (let i = 0; i < this.products.length; i += chunkSize) {
                chunks.push(this.products.slice(i, i + chunkSize));
            }
            return chunks;
        },

        compare() {
            return this.$store.getters.getCompareList;
        },
        shimmer() {
            return this.$store.state.module.shimmer;
        },
    },
};
</script>
