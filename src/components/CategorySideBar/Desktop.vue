<template lang="html">
  <div>
    <div
      class="category-item"
    >
      <ul
        class="category-list"
        v-if="
          lengthCounter(visibleCategory) > 0 &&
          !(home && addons.includes('ishopet'))
        "
      >
        <li>
          <router-link :to="{ name: 'campaigns' }">
            <div class="icon">
              <OfferSVG />
            </div>
            {{ lang.all_offers }}
          </router-link>
        </li>

        <!-- category Menu -->
        <li
          class="has-dropdown"
          v-for="(category, index) in visibleCategory.slice(0, 8)"
          :key="index"
          :class="{ 'sg-dropdown': category.child_categories.length > 0 }"
        >
          <router-link
            :class="category.child_categories.length > 0 && 'nav-link'"
            :to="{
              name: 'product.by.category',
              params: { slug: category.slug },
            }"
          >
            <div class="icon" v-if="category.icon">
              <span :class="[category.icon]" class="mdi-18px"></span>
            </div>

            <div class="icon" v-else>
              <span class="mdi mdi-view-dashboard-outline mdi-18px"></span>
            </div>

            {{ category.title }}
          </router-link>

          <ul class="mega-menu" v-if="category.child_categories.length > 0">
            <li
              class="sub-mega-menu"
              v-for="(child_category, child_index) in category.child_categories"
              :key="child_index"
            >
              <div class="single-menu">
                <router-link
                  class="menu-title"
                  :to="{
                    name: 'product.by.category',
                    params: { slug: child_category.slug },
                  }"
                >
                  {{ child_category.title }}
                </router-link>
                <ul v-if="child_category.categories.length > 0">
                  <li
                    v-for="(
                      children_category, cat_index
                    ) in child_category.categories"
                    :key="cat_index"
                  >
                    <router-link
                      :to="{
                        name: 'product.by.category',
                        params: { slug: children_category.slug },
                      }"
                    >
                      {{ children_category.title }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
        <!-- see Categories -->
        <li class="has-dropdown">
          <router-link :to="{ name: 'categories' }" class="nav-link btn">{{
            lang.view_all_categories
          }}</router-link>
        </li>
      </ul>

      <!-- home -->
      <ul class="category-list" v-else-if="home && addons.includes('ishopet')">
        <li
          class="has-dropdown"
          v-for="(category, index) in visibleCategory"
          :key="index"
          :class="{ 'sg-dropdown': Object.keys(menu).length > 2 }"
          @click="$parent.toggleCategory"
        >
          <a v-if="urlCheck(menu.url)" :href="menu.url">{{ menu.label }}</a>
          <router-link
            v-else
            :to="menu.url"
            :class="{ active: menu.url == $route.fullPath }"
          >
            {{ menu.label }}</router-link
          >
          <span
            v-if="Object.keys(menu).length > 2"
            class="icon mdi mdi-name mdi-chevron-down"
          ></span>
          <ul class="mega-menu" v-if="Object.keys(menu).length > 2">
            <li
              class="sub-mega-menu"
              v-for="(sub_menu, j) in menu"
              :key="'sub_menu' + j"
              v-if="sub_menu.url"
            >
              <div class="single-menu">
                <a
                  class="menu-title"
                  v-if="urlCheck(sub_menu.url)"
                  :href="sub_menu.url"
                  >{{ sub_menu.label }}</a
                >
                <router-link class="menu-title" v-else :to="sub_menu.url">{{
                  sub_menu.label
                }}</router-link>
              </div>
            </li>
          </ul>
        </li>

        <!-- see Categories -->
        <li class="has-dropdown">
          <router-link :to="{ name: 'categories' }" class="nav-link btn">{{
            lang.view_all_categories
          }}</router-link>
        </li>
      </ul>

      <!-- shimmer -->
      <ul class="category-list" v-else-if="sidebarCategory">
        <li
          class="has-dropdown"
          v-for="(seller, index) in addons.includes('ishopet') ? 7 : 9"
          :key="index"
        >
          <a href="javascript:void(0)" class="menu-title">
            <span><shimmer :height="23"></shimmer></span>
            <shimmer :height="23"></shimmer>
          </a>
        </li>
      </ul>
    </div>
  </div>
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
    loadCategory() {
      let url = this.getUrl("sidebar/categories");
      axios.get(url).then((response) => {
        if (response.data.error) {
          this.toast.error(response.data.error, this.lang.Error + " !!");
        } else {
          this.$store.commit("setSidebar", false);
          this.$store.dispatch("categories", response.data.categories);
        }
      });
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
