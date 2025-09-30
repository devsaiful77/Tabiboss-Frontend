<template lang="html">
    <ul class="offcanvas-nav-menu">
        <li class="active" @click="$store.commit('setSmCategory', false)">
            <a
                href="javascript:void(0)"
                @click="catNavigate({ name: 'campaigns' })"
            >
                {{ lang.all_offers }}
            </a>
        </li>

        <!-- Loop through Category Menu Data -->
        <li v-for="(category, index) in visibleCategory" :key="index">
            <a
                href="javascript:void(0)"
                @click="
                    catNavigate({
                        name: 'product.by.category',
                        params: { slug: category.slug },
                    })
                "
            >
                <span
                    class="mb-0"
                    @click="$store.commit('setSmCategory', false)"
                >
                    {{ category.title }}
                </span>
            </a>

            <span
                class="drop_menu"
                v-if="category.child_categories.length > 0"
                @click="
                    mobile_child_id == category.id
                        ? (mobile_child_id = 0)
                        : (mobile_child_id = category.id)
                "
            >
                <i class="ri-arrow-down-s-line"></i>
            </span>

            <!-- Check if Submenu exists -->
            <ul
                class="sub-menu"
                v-if="category.child_categories.length > 0"
                :class="{
                    'd-block': mobile_child_id == category.id,
                    'd-none': mobile_child_id != category.id,
                }"
            >
                <li
                    class="has__dropdown"
                    v-for="(
                        child_category, child_index
                    ) in category.child_categories"
                    :key="child_index"
                >
                    <a
                        href="javascript:void(0)"
                        @click="
                            catNavigate({
                                name: 'product.by.category',
                                params: { slug: child_category.slug },
                            })
                        "
                    >
                        <span
                            class="mb-0"
                            @click="$store.commit('setSmCategory', false)"
                        >
                            {{ child_category.title }}
                        </span>
                    </a>

                    <span
                        class="drop_menu"
                        v-if="child_category.categories.length > 0"
                        @click="
                            mobile_children_id == child_category.id
                                ? (mobile_children_id = 0)
                                : (mobile_children_id = child_category.id)
                        "
                    >
                        <i class="ri-arrow-down-s-line"></i>
                    </span>

                    <!-- Sub Sub Menu -->
                    <ul
                        class="sub-sub-menu"
                        :class="{
                            'd-block': mobile_children_id == child_category.id,
                            'd-none': mobile_children_id != child_category.id,
                        }"
                        v-if="child_category.categories.length > 0"
                    >
                        <li
                            v-for="(
                                children_category, cat_index
                            ) in child_category.categories"
                            :key="cat_index"
                        >
                            <a
                                href="javascript:void(0)"
                                @click="
                                    catNavigate({
                                        name: 'product.by.category',
                                        params: { slug: children_category.slug },
                                    })
                                "
                            >
                                <p
                                    class="mb-0"
                                    @click="
                                        $store.commit('setSmCategory', false)
                                    "
                                >
                                    {{ children_category.title }}
                                </p>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
import OfferSVG from "@/svg/OfferSVG.vue";
import Shimmer from "@/components/Shimmer.vue";
export default {
    components: {
        OfferSVG,
        Shimmer,
    },

    props: ["slider", "home"],

    data() {
        return {
            mobile_child_id: 0,
            mobile_children_id: 0,

            activeDropdown: null,
            activeSubDropdown: null,
        };
    },

    computed: {
        visibleCategory() {
            let categories = this.$store.getters.getCategories;
            return categories?.length > 0 ? categories : [];
        },
        defaultCategoryShow() {
            return this.$store.getters.getDefaultCategory;
        },
        sidebarCategory() {
            return this.$store.getters.getSidebarCategory;
        },
        smCategory() {
            return this.$store.getters.getSmCategory;
        },
        headerMenu() {
            return this.settings.header_menu;
        },
    },

    methods: {
        catNavigate(routeObj) {
            this.closeCartModal(() => {
                this.$router.push(routeObj);
            });
        },

        closeCartModal(callback) {
            const offcanvasElement =
                document.getElementById("offcanvasCategory");
            const offcanvasInstance =
                bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvasInstance) {
                offcanvasInstance.hide();
            }
            setTimeout(() => {
                if (typeof callback === "function") {
                    callback();
                }
            }, 300);
        },

        loadCategory() {
            let url = this.getUrl("sidebar/categories");
            axios.get(url).then((response) => {
                if (response.data.error) {
                    this.toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    this.$store.commit("setSidebar", false);
                    this.$store.dispatch(
                        "categories",
                        response.data.categories
                    );
                }
            });
        },

        subSubmenu_toggleDropdown(index) {
            this.activeSubDropdown =
                this.activeSubDropdown === index ? null : index;
        },

        toggleDropdown(index) {
            this.activeDropdown = this.activeDropdown === index ? null : index;
        },
    },

    mounted() {
        let navBar = "";
        if (this.addons.includes("ishopet")) {
            navBar = document.getElementById("middle_nav");
        } else {
            navBar = document.getElementById("nav");
        }
        if (navBar) {
            window.onscroll = () => {
                this.active = window.scrollY > navBar.offsetTop;
                this.$store.dispatch("navbarClass", this.active);
            };
        }

        if (this.visibleCategory.length == 0) {
            this.loadCategory();
        }
    },
};
</script>

<style scoped>
span.drop_menu {
    display: inline-block;
    width: 32px;
    height: 25px;
    /* background: #ddd; */
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 8px;
    right: 5px;
    font-size: 20px;
}
</style>
