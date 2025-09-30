<template lang="html">
    <!-- Header Start -->
    <header class="header">
        <!-- Header Topbar -->
        <div class="headerTopbar">
            <div class="container">
                <div class="headerTopbar-wrapper">
                    <div class="header-left">
                        <!-- language Dropdown -->
                        <div class="dropdown-list" ref="languageDropdownRef" v-if="settings.language_switcher != 0">
                            <!-- Selected Language -->
                            <a
                                href="javascript:void(0)"
                                class="selected"
                                @click.prevent="
                                    languageDropdown = !languageDropdown;
                                    currencyDropdown = false;
                                "
                            >
                                <template v-if="activeLanguage"> <img :src="activeLanguage.flag_image" alt="flag" />{{ activeLanguage.name }} </template>
                            </a>

                            <!-- Dropdown Items -->
                            <ul class="dropdown-item" :class="{ active: languageDropdown }">
                                <li v-for="(language, index) in languages" :key="index" @click="changeLanguage(language.locale)">
                                    <a href="javascript:void(0)"> <img :src="language.flag_image" alt="flag" />{{ language.name }} </a>
                                </li>
                            </ul>
                        </div>

                        <!-- Currency Dropdown -->
                        <div class="dropdown-list" ref="currencyDropdownRef" v-if="settings.currency_switcher != 0">
                            <a
                                href="#"
                                class="selected text-uppercase"
                                @click.prevent="
                                    currencyDropdown = !currencyDropdown;
                                    languageDropdown = false;
                                "
                            >
                                {{ activeCurrency.name }}
                            </a>

                            <ul class="dropdown-item" :class="{ active: currencyDropdown }">
                                <li v-for="(currency, index) in currencies" :key="index">
                                    <a @click="changeCurrency(currency)" href="javascript:void(0)">{{ currency.name }}</a>
                                </li>
                            </ul>
                        </div>

                        <!-- Find Store -->
                        <div class="play-items">
                            <span>Find a Store</span>
                            <a v-if="settings.topbar_play_store_link == 1" :href="settings.play_store_link ?? ''" target="_blank">
                                <i class="ri-google-play-fill"></i>
                            </a>
                            <a v-if="settings.topbar_app_store_link == 1" :href="settings.apple_store_link ?? ''" target="_blank">
                                <i class="ri-apple-fill"></i>
                            </a>
                        </div>
                        <!-- Find Store -->
                    </div>
                    <div class="header-right">
                        <ul class="list-item">
                            <li>
                                <router-link :class="{ has_compare: compareList > 0 }" :to="{ name: 'compare.list' }"
                                    >{{ lang.compare }} <span v-if="compareList > 0">({{ compareList }})</span></router-link
                                >
                            </li>

                            <li v-if="addons.includes('affiliate')">
                                <router-link to="#">
                                    <span class="mdi mdi-name mdi-bank"></span>
                                    Affiliate Program
                                </router-link>
                            </li>

                            <li>
                                <router-link :to="{ name: 'track.order' }">
                                    {{ lang.track_order }}
                                </router-link>
                            </li>

                            <li v-if="settings.header_contact_phone">
                                <!-- {{ lang.call }} -->
                                Helpline
                                <a :href="'tel:' + settings.header_contact_phone">
                                    {{ settings.header_contact_phone }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Header Topbar -->

        <!-- Header Middle Start -->
        <div class="headerMiddle">
            <div class="container">
                <div class="headerMiddle-wrapper">
                    <!-- Header Logo End -->
                    <div class="header-logo">
                        <router-link :to="{ name: 'home' }">
                            <img :src="settings.dark_logo" alt="Logo" class="img-fluid" width="138" />
                        </router-link>
                    </div>

                    <!-- Header Logo End -->

                    <!-- Search Form Start -->
                    <div :class="['search-form d-md-block d-none']">
                        <div class="input-group">
                            <input v-model="searchKey" type="text" class="form-control" :placeholder="lang.looking_for" @keyup="searchProducts" @click.stop="searchDropdown" />
                            <button
                                type="button"
                                @click="
                                    $router.push({
                                        name: 'search.product',
                                        query: { q: searchKey },
                                    })
                                "
                            >
                                <i class="ri-search-2-line"></i>
                            </button>
                        </div>

                        <div class="search-result-wrapper" v-if="search_products.length > 0 && search_key_focus" @click.stop>
                            <div class="search-overflow">
                                <!-- Search Result -->
                                <a
                                    href="javascript:void(0)"
                                    class="search-result"
                                    v-for="(product, index) in search_products"
                                    :key="index"
                                    @click.prevent="routerNavigator('product.details', product.slug)"
                                >
                                    <div class="thumb">
                                        <img :src="product.image_190x230" :alt="product.product_name" />
                                    </div>
                                    <div class="content">
                                        <h4 class="title text-ellips">
                                            {{ product.product_name }}
                                        </h4>
                                        <div class="all-rating">
                                            {{ product.rating }}
                                            <Rating :rating="product.rating" />
                                            <div class="total-rating">({{ product.reviews_count }})</div>
                                        </div>
                                        <div class="price-wrap">
                                            <span class="discount" v-if="product.special_discount_check > 0">{{ priceFormat(product.price) }}</span>

                                            <div class="price" v-if="product.special_discount_check > 0">
                                                {{ priceFormat(product.discount_percentage) }}
                                            </div>
                                            <div class="price" v-else>
                                                {{ priceFormat(product.price) }}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- Search Form End -->

                    <!-- Header Action -->
                    <div class="header-action">
                        <!-- Search Off Canvas Start -->
                        <div class="offcanvas offcanvas-top h-100" tabindex="-1" id="searchOffcanvas" aria-labelledby="searchOffcanvasLabel">
                            <div class="offcanvas-header justify-content-end pt-4 pe-5">
                                <button @click="searchKey = ''" type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                                <!-- Search Form Start -->
                                <div :class="['search-form']">
                                    <div class="input-group">
                                        <input
                                            v-model="searchKey"
                                            type="text"
                                            class="form-control"
                                            :placeholder="lang.looking_for"
                                            @keyup="searchProducts"
                                            @click.stop="searchDropdown"
                                        />
                                        <button
                                            type="button"
                                            @click="
                                                $router.push({
                                                    name: 'search.product',
                                                    query: { q: searchKey },
                                                })
                                            "
                                        >
                                            <i class="ri-search-2-line"></i>
                                        </button>
                                    </div>

                                    <div class="search-result-wrapper" v-if="search_products.length > 0 && search_key_focus" @click.stop>
                                        <div class="search-overflow">
                                            <!-- Search Result -->
                                            <a
                                                href="javascript:void(0)"
                                                class="search-result"
                                                v-for="(product, index) in search_products"
                                                :key="index"
                                                @click.prevent="goToProduct(product.slug, 'search_canvans')"
                                            >
                                                <div class="thumb">
                                                    <img :src="product.image_190x230" :alt="product.product_name" />
                                                </div>
                                                <div class="content">
                                                    <h4 class="title text-ellips">
                                                        {{ product.product_name }}
                                                    </h4>
                                                    <div class="all-rating">
                                                        {{ product.rating }}
                                                        <Rating :rating="product.rating" />
                                                        <div class="total-rating">({{ product.reviews_count }})</div>
                                                    </div>
                                                    <div class="price-wrap">
                                                        <span class="discount" v-if="product.special_discount_check > 0">{{ priceFormat(product.price) }}</span>

                                                        <div class="price" v-if="product.special_discount_check > 0">
                                                            {{ priceFormat(product.discount_percentage) }}
                                                        </div>
                                                        <div class="price" v-else>
                                                            {{ priceFormat(product.price) }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Search Form End -->
                            </div>
                        </div>
                        <!-- Search Off Canvas End -->
                        <a href="#" class="action-list header-search d-md-none" data-bs-toggle="offcanvas" data-bs-target="#searchOffcanvas" aria-controls="searchOffcanvas">
                            <div class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                                    <path
                                        d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"
                                    />
                                </svg>
                            </div>
                        </a>

                        <!-- wishlist -->
                        <router-link class="action-list d-sm-flex d-none" :to="{ name: 'wishlist' }" v-if="authUser && authUser.user_type == 'customer'">
                            <div class="icon">
                                <WishlistSVG />
                                <span class="count" v-if="wishlists > 0">{{ wishlists }}</span>
                                <span class="count" v-else>0</span>
                            </div>

                            <div class="content">
                                <span>{{ lang.wishlist }}</span>
                                {{ lang.items }}
                            </div>

                        </router-link>

                        <a class="action-list d-sm-flex d-none" href="javascript:void(0)" v-else>
                            <div class="icon">
                                <WishlistSVG />
                                <span class="count">0</span>
                            </div>
                            <div class="content">
                                <span>{{ lang.wishlist }}</span>
                                {{ lang.items }}
                            </div>
                        </a>

                        <!-- cart...  -->
                        <a href="javascript:void(0)" class="action-list" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart">
                            <div class="icon">
                                <CartSVG />

                                <div class="count" v-if="carts && carts.length > 0">
                                    {{ carts.filter((cart) => cart.is_buy_now == false).length }}
                                </div>

                                <div class="count" v-else>0</div>
                            </div>
                            <div class="content" v-if="carts && carts.length > 0">
                                <span>{{ priceFormat(carts.reduce((sum, item) => sum + (item.price - item.discount) * item.quantity, 0)) }}</span
                                >{{ lang.total }}
                            </div>

                            <div class="content" v-else><span>0</span>{{ lang.total }}</div>
                        </a>

                        <div class="userHeader" ref="dropdownRef" v-if="authUser">
                            <div class="userProfile">
                                <a href="javascript:void(0)" class="action-list" @click.prevent="UserDropdown = !UserDropdown">
                                    <div class="thumb">
                                        <!-- <img :src="authUser.user_profile_image" alt="User" /> -->

                                        <img
                                            :src="authUser.profile_image"
                                            :alt="authUser.full_name"
                                          />
                                    </div>
                                    <div class="content">
                                        {{ authUser.first_name + " " + authUser.last_name }}<span>{{ lang.profile }}<i class="ri-arrow-down-s-line"></i></span>
                                    </div>
                                </a>
                            </div>
                            <div class="sideBar-menu" :class="{ active: UserDropdown }">
                                <ul class="menu-item">
                                    <li @click.prevent="UserDropdown = !UserDropdown">
                                        <router-link v-if="authUser.user_type == 'customer'" :to="{ name: 'dashboard' }">
                                            <div class="icon">
                                                <img :src="static_image_url + 'dashboard-icon/grid.svg'" alt="icon" />
                                            </div>
                                            <span>{{ lang.dashboard }}</span>
                                        </router-link>

                                        <a href="javascript:void(0)" @click="goToAdminDashboard('seller/dashboard')" v-else-if="authUser.user_type == 'seller'">
                                            <div class="icon">
                                                <img :src="static_image_url + 'dashboard-icon/grid.svg'" alt="icon" />
                                            </div>
                                            <span>{{ lang.dashboard }}</span>
                                        </a>

                                        <a
                                            href="javascript:void(0)"
                                            @click="goToAdminDashboard('admin/dashboard')"
                                            v-else-if="authUser.user_type == 'admin' || authUser.user_type == 'staff'"
                                        >
                                            <div class="icon">
                                                <img :src="static_image_url + 'dashboard-icon/grid.svg'" alt="icon" />
                                            </div>
                                            <span>{{ lang.dashboard }}</span>
                                        </a>
                                    </li>

                                    <li @click.prevent="UserDropdown = !UserDropdown">
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#logoutPopup" class="logoutBtn">
                                            <div class="icon">
                                                <img :src="static_image_url + 'dashboard-icon/logout.svg'" alt="icon" />
                                            </div>
                                            <span>{{ lang.logout }}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <router-link v-else class="action-list" :to="{ name: 'login' }">
                            <div class="icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_2072_1015)">
                                        <path
                                            d="M12 12C13.1867 12 14.3467 11.6481 15.3334 10.9888C16.3201 10.3295 17.0892 9.39246 17.5433 8.2961C17.9974 7.19975 18.1162 5.99335 17.8847 4.82946C17.6532 3.66558 17.0818 2.59648 16.2426 1.75736C15.4035 0.918247 14.3344 0.346802 13.1705 0.115291C12.0067 -0.11622 10.8003 0.00259972 9.7039 0.456726C8.60754 0.910851 7.67047 1.67989 7.01118 2.66658C6.35189 3.65328 6 4.81331 6 6C6.00159 7.59081 6.63424 9.11602 7.75911 10.2409C8.88399 11.3658 10.4092 11.9984 12 12ZM12 2C12.7911 2 13.5645 2.2346 14.2223 2.67412C14.8801 3.11365 15.3928 3.73836 15.6955 4.46927C15.9983 5.20017 16.0775 6.00444 15.9231 6.78036C15.7688 7.55629 15.3878 8.26902 14.8284 8.82843C14.269 9.38784 13.5563 9.7688 12.7804 9.92314C12.0044 10.0775 11.2002 9.99827 10.4693 9.69552C9.73836 9.39277 9.11365 8.88008 8.67412 8.22228C8.2346 7.56449 8 6.79113 8 6C8 4.93914 8.42143 3.92172 9.17157 3.17158C9.92172 2.42143 10.9391 2 12 2Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M12 14C9.61386 14.0026 7.32622 14.9517 5.63896 16.639C3.95171 18.3262 3.00265 20.6139 3 23C3 23.2652 3.10536 23.5196 3.29289 23.7071C3.48043 23.8946 3.73478 24 4 24C4.26522 24 4.51957 23.8946 4.70711 23.7071C4.89464 23.5196 5 23.2652 5 23C5 21.1435 5.7375 19.363 7.05025 18.0503C8.36301 16.7375 10.1435 16 12 16C13.8565 16 15.637 16.7375 16.9497 18.0503C18.2625 19.363 19 21.1435 19 23C19 23.2652 19.1054 23.5196 19.2929 23.7071C19.4804 23.8946 19.7348 24 20 24C20.2652 24 20.5196 23.8946 20.7071 23.7071C20.8946 23.5196 21 23.2652 21 23C20.9974 20.6139 20.0483 18.3262 18.361 16.639C16.6738 14.9517 14.3861 14.0026 12 14Z"
                                            fill="white"
                                        />
                                    </g>
                                </svg>
                            </div>
                            <div class="content">
                                <span>{{ lang.Login }}</span>
                            </div>
                        </router-link>
                    </div>
                    <!-- Header Action -->
                </div>
            </div>
        </div>
        <!-- Header Middle Start -->

        <!-- Header main Start -->
        <div class="headerBottom" :class="{ sticky: isSticky }" ref="headerBottom">
            <div class="container">
                <div class="headerBottom-wrapper">
                    <!-- Header Menu Start -->
                    <div class="header-menu">
                        <!-- All Categories -->
                        <div class="header-category">
                            <div class="category-header d-none d-lg-flex" @click.prevent="isCategoryMenu = !isCategoryMenu">
                                <div class="bar">
                                    <CategorySVG />
                                </div>
                                {{ lang.all_categories }}
                            </div>
                            <div class="category-header d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCategory">
                                <div class="bar">
                                    <CategorySVG />
                                </div>
                                {{ lang.all_categories }}
                            </div>
                            <!-- Sidebar Category Component -->
                            <Desktop v-if="isCategoryMenu" :home="true" />
                        </div>
                        <!-- All Categories End -->

                        <!-- Desktop Header menu -->
                        <ul class="main-menu">
                            <li
                                v-for="(menu, i) in headerMenu"
                                :key="'menu' + i"
                                :class="{
                                    'has-dropdown': Object.keys(menu).length > 2,
                                }"
                                @click="$store.commit('setSmHomeMenu', false)"
                            >
                                <a v-if="Object.keys(menu).length > 2" href="javascript:void(0)">{{ menu.label }}</a>

                                <span v-else>
                                    <a v-if="urlCheck(menu.url)" :href="menu.url">{{ menu.label }}</a>
                                    <router-link
                                        v-else
                                        :to="menu.url"
                                        :class="{
                                            active: menu.url == $route.fullPath,
                                        }"
                                    >
                                        {{ menu.label }}
                                    </router-link>
                                </span>

                                <ul class="sub-menu" v-if="Object.keys(menu).length > 2">
                                    <li
                                        v-for="(sub_menu, j) in Object.keys(menu)
                                            .filter((k) => !isNaN(k))
                                            .map((k) => menu[k])"
                                        :key="'sub_menu' + j"
                                        @click="$store.commit('setSmHomeMenu', false)"
                                    >
                                        <a v-if="urlCheck(sub_menu.url)" :href="sub_menu.url">{{ sub_menu.label }}</a>
                                        <router-link v-else :to="sub_menu.url">{{ sub_menu.label }}</router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <!-- Header Menu End -->

                    <!-- Header Meta Start -->
                    <div class="header-meta">
                        <div class="meta-list">
                            <div class="header-btn">
                                <router-link :to="{ name: 'daily.deals' }" class="btn btn-primary"><i class="ri-flashlight-line"></i>{{ lang.daily_deals }}</router-link>
                            </div>
                            <!-- Header Toggle Start -->
                            <div class="header-toggle" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">
                                <div class="toggle-bar"></div>
                            </div>
                            <!-- Header Toggle End -->

                            <!-- Mobile Header Menu Start -->
                            <div class="offcanvas offcanvas-end custom-offcanvas" tabindex="-1" id="offcanvasRight">
                                <!-- Haeder Start -->
                                <div class="offcanvas-header">
                                    <div class="brand-logo">
                                        <router-link :to="{ name: 'home' }">
                                            <img :src="settings.dark_logo" alt="Logo" class="img-fluid" width="138" />
                                        </router-link>
                                    </div>
                                    <button type="button" class="close-btn" data-bs-dismiss="offcanvas" aria-label="Close">
                                        {{ lang.Close }}<i class="ri-arrow-right-line"></i>
                                    </button>
                                </div>

                                <div class="offcanvas-body p-0">
                                    <ul class="offcanvas-nav-menu">
                                        <li
                                            v-for="(menu, i) in headerMenu"
                                            :key="'menu' + i"
                                            :class="[
                                                {
                                                    'has-dropdown': Object.keys(menu).length > 2,
                                                },
                                            ]"
                                            :ref="Object.keys(menu).length > 2 ? 'dropdown' : null"
                                            @click="$store.commit('setSmHomeMenu', false)"
                                        >
                                            <span v-if="Object.keys(menu).length <= 2">
                                                <a v-if="urlCheck(menu.url)" :href="menu.url">{{ menu.label }}</a>
                                                <router-link
                                                    v-else
                                                    :to="menu.url"
                                                    :class="{
                                                        active: menu.url == $route.fullPath,
                                                    }"
                                                >
                                                    {{ menu.label }}
                                                </router-link>
                                            </span>

                                            <a v-else class="nav-link" href="javascript:void(0)" @click.prevent="NavToggleDropdown">{{ menu.label }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Mobile Footer Menu End -->
                        </div>
                    </div>
                    <!-- Header Meta End -->
                </div>
            </div>
        </div>
        <!-- Header main End -->

        <!-- Responsive Category Item Start -->
        <div class="offcanvas offcanvas-start custom-offcanvas d-block d-lg-none" tabindex="-1" id="offcanvasCategory">
            <div class="offcanvas-header">
                <div class="brand-logo">
                    <router-link :to="{ name: 'home' }">
                        <img :src="settings.dark_logo" alt="Logo" class="img-fluid" width="138" />
                    </router-link>
                </div>
                <button type="button" class="close-btn" data-bs-dismiss="offcanvas" aria-label="Close" @click="$store.commit('setSmCategory', false)">
                    {{ lang.Close }}<i class="ri-arrow-left-line"></i>
                </button>
            </div>
            <!-- Haeder End -->
            <div class="offcanvas-body p-0">
                <!-- mobile category -->
                <Mobile />
            </div>
        </div>
        <!-- Responsive Category Item End -->

        <!-- ======================= Shopping Cart start =======================  -->
        <div class="offcanvas offcanvas-end shoppingCart-offcanvas custom-offcanvas" tabindex="-1" id="offcanvasCart">
            <!-- Header Start -->
            <div class="offcanvas-header px-0">
                <h4 class="title">{{ lang.cart_items }}</h4>
                <button type="button" class="close-btn" data-bs-dismiss="offcanvas" aria-label="Close">{{ lang.Close }}<i class="ri-arrow-right-line"></i></button>
            </div>
            <!-- Header End -->

            <div class="offcanvas-body p-0">
                <!-- Shopping cart -->
                <div v-if="carts && carts.length > 0">
                    <div class="shoppingCard" v-for="(cart, index) in carts" :key="index">
                        <!-- cart item -->
                        <a class="shoppingCard-thumb" v-if="!cart.is_buy_now" @click.prevent="goToProduct(cart.product_slug)" href="javascript:void(0)">
                            <img loading="lazy" :src="cart.image_40x40" :alt="cart.product_name" />
                        </a>

                        <div class="shoppingCard-content" v-if="!cart.is_buy_now">
                            <h5 class="title">
                                <a @click.prevent="goToProduct(cart.product_slug)" href="javascript:void(0)">
                                    {{ cart.product_name }}
                                </a>
                            </h5>

                            <div class="meta" v-if="cart.variant">
                                <span>{{ lang.Variant }} : {{ cart.variant }}</span>
                            </div>

                            <span class="price">{{ priceFormat(cart.price - cart.discount) }}</span>

                            <div class="shoppingCard-bottom">
                                <div class="quantity-wrapper">
                                    <div class="stock-item">{{ lang.Qty }}: {{ cart.quantity }}</div>
                                </div>
                                <button type="button" class="remove-btn text-capitalize" @click="deleteCart(cart.id)">
                                    {{ lang.remove }}
                                </button>
                            </div>
                        </div>
                        <!-- cart item -->
                    </div>
                </div>

                <!-- cart Empty Start -->
                <div class="shoppingCard-empty" v-else>
                    <div class="thumb">
                        <img :src="static_image_url + 'cart/cart-empty.svg'" alt="empty" />
                    </div>
                    <h4 class="title">{{ lang.Your_cart_is_empty }}</h4>

                    <div class="return-btn">
                        <a href="javascript:void(0)" @click.prevent="gotoProductLink()" class="btn btn-secondary">{{ lang.continue_shopping }}</a>
                    </div>
                </div>
                <!-- cart Empty End -->
            </div>
            <div class="offcanvas-footer" v-if="carts && carts.length > 0">
                <ul class="shoppingCard-subtotal">
                    <li>
                        <span class="label">{{ lang.subtotal }} : </span>
                        <span class="value">{{ priceFormat(carts.reduce((sum, item) => sum + item.price * item.quantity, 0)) }}</span>
                    </li>
                </ul>

                <ul class="shoppingCard-total">
                    <li>{{ lang.total }}:</li>
                    <li class="total">
                        {{ priceFormat(carts.reduce((sum, item) => sum + item.price * item.quantity, 0)) }}
                    </li>
                </ul>
                <div class="shoppingCard-button">
                    <a href="javascript:void(0)" class="btn btn-secondary" @click.prevent="goToCart">{{ lang.view_cart }}</a>
                    <a :href="getUrl('checkout')" @click="checkoutPage($event)" class="btn btn-primary">{{ lang.check_out }}</a>
                </div>
            </div>
        </div>
        <!-- ======================= Shopping Cart start =======================  -->
    </header>
    <!-- Header End -->
</template>

<script>
import QuantityItem from "@/components/QuantityItem.vue";
import CategorySVG from "@/svg/Category.vue";
import OfferSVG from "@/svg/OfferSVG.vue";
import Desktop from "@/components/CategorySideBar/Desktop.vue";
import Mobile from "@/components/CategorySideBar/Mobile.vue";
import Rating from "@/components/Product/Rating.vue";
import WishlistSVG from "@/svg/WishlistSVG.vue";
import CartSVG from "@/svg/CartSVG.vue";
import LogoSVG from "@/svg/LogoSVG.vue";

export default {
    components: {
        QuantityItem,
        CategorySVG,
        OfferSVG,
        Desktop,
        Mobile,
        Rating,
        WishlistSVG,
        CartSVG,
        LogoSVG,
    },
    data() {
        return {
            static_image_url: this.getUrl("frontends/images/"),
            mobile_child_id: 0,
            mobile_children_id: 0,
            searchKey: this.$route.query.q,
            menu: false,
            subMenu: false,
            search_bar: false,
            show_search_icon: false,
            search_key_focus: false,
            active: false,
            home_child_id: 0,

            isCategoryMenu: false,
            isHomePage: this.$route.path === "/",
            isSticky: false,
            headerBottom: null,
            languageDropdown: false,
            currencyDropdown: false,
            UserDropdown: false,
            languageDropdownRef: null,
            currencyDropdownRef: null,
            userDropdownRef: null,
            isOpen: false,
            //
        };
    },

    computed: {
        languages() {
            return this.$store.getters.getLanguages;
        },
        currencies() {
            return this.$store.getters.getCurrencies;
        },
        activeLanguage() {
            return this.$store.getters.getActiveLanguage;
        },
        activeCurrency() {
            return this.$store.getters.getActiveCurrency;
        },
        carts() {
            return this.$store.getters.getCarts;
        },


        visibleCategory() {
            let categories = this.$store.getters.getCategories;
            return categories?.length > 0 ? categories : [];
        },


        headerMenu() {
            return this.settings.header_menu;
        },
        wishlists() {
            return this.$store.getters.getTotalWishlists;
        },
        active_modal() {
            return this.$store.getters.getActiveModal;
        },
        productDetails() {
            let products = this.$store.getters.getProductDetails;
            for (let i = 0; i < products.length; i++) {
                if (products[i].slug == this.active_modal) {
                    return products[i].product;
                }
            }
            return false;
        },
        navbar_class() {
            return this.$store.getters.getNavBarClass;
        },
        smCategory() {
            return this.$store.getters.getSmCategory;
        },
        smHomeMenu() {
            return this.$store.getters.getSmHomeMenu;
        },

        compareList() {
            return this.$store.getters.getCompareList;
        },
    },

    watch: {
        "$route.fullPath"() {
            // Hide category menu
            if (this.isCategoryMenu) {
                this.isCategoryMenu = false;
            }

            // Hide offcanvas if it's open
            const offcanvasEl = document.getElementById("offcanvasRight");
            if (offcanvasEl && bootstrap?.Offcanvas?.getInstance(offcanvasEl)) {
                const instance = bootstrap.Offcanvas.getInstance(offcanvasEl);
                instance.hide();
            }
        },
    },

    mounted() {
        if (!this.lang) {
            this.$store.dispatch("languageKeywords");
        }

        window.addEventListener("scroll", this.handleScroll);
        document.addEventListener("click", this.handleClickOutside);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        document.removeEventListener("click", this.handleClickOutside);
    },

    methods: {
        goToAdminDashboard(dash_url) {
            window.location.href = this.getUrl(dash_url);
        },

        gotoProductLink() {
            this.closeCartModal(() => {
                this.$router.push({ name: "all.products" });
            });
        },

        goToCart() {
            this.closeCartModal(() => {
                this.$router.push({ name: "cart" });
            });
        },

        checkoutPage(event) {
            event.preventDefault();
            this.closeCartModal(() => {
                this.$router.push({ name: "checkout" });
                // window.location.href = this.getUrl("checkout");
            });
        },

        goToProduct(slug, type = null) {
            // search_canvans

            if (type == "search_canvans") {
                this.closeSearchModal(() => {
                    this.$router.push({
                        name: "product.details",
                        params: { slug },
                    });
                });
            }

            this.closeCartModal(() => {
                this.$router.push({
                    name: "product.details",
                    params: { slug },
                });
            });
        },

        closeSearchModal(callback) {
            const offcanvasElement = document.getElementById("searchOffcanvas");
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvasInstance) {
                offcanvasInstance.hide();
            }
            setTimeout(() => {
                if (typeof callback === "function") {
                    callback();
                }
            }, 300);
        },

        closeCartModal(callback) {
            const offcanvasElement = document.getElementById("offcanvasCart");
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvasInstance) {
                offcanvasInstance.hide();
            }
            setTimeout(() => {
                if (typeof callback === "function") {
                    callback();
                }
            }, 300);
        },

        // for searching
        searchDropdown() {
            this.search_key_focus = true;
            this.search_key_focus &&
                this.$nextTick(() => {
                    document.addEventListener("click", this.hideSearchDropdown);
                });
        },

        hideSearchDropdown: function () {
            this.search_key_focus = false;
            document.removeEventListener("click", this.hideSearchDropdown);
        },

        searchProducts() {
            this.search_bar = true;
            let url = this.getUrl("search/product");
            let form = { key: this.searchKey };
            axios
                .post(url, form)
                .then((response) => {
                    if (response.data.error) {
                        this.$toast.error(response.data.error, this.lang.Error + " !!");
                    } else {
                        this.search_products = response.data.products;
                    }
                })
                .catch((error) => {
                    this.search_products = [];
                });
        },
        // for searching

        deleteCart(id) {
            if (confirm("Are you sure?")) {
                let url = this.getUrl("cart/delete/" + id);
                axios.get(url).then((response) => {
                    if (response.data.error) {
                        this.$toast.error(response.data.error, this.lang.Error + " !!");
                    } else {
                        this.$store.dispatch("carts", response.data.carts);
                    }
                });
            }
        },

        changeLanguage(locale) {
            let url = this.getUrl("change/locale/" + locale);
            this.language_dropdown = false;
            axios.get(url).then((response) => {
                if (response.data.error) {
                    this.$toast.info(response.data.error, this.lang.Info + " !!");
                } else {
                    window.location.reload();
                }
            });
        },

        changeCurrency(currency) {
            let url = this.getUrl("change/currency/" + currency.code);
            // this.currency_dropdown = false;

            this.currencyDropdown = false;
            //   this.$Progress.start();
            axios.get(url).then((response) => {
                if (response.data.error) {
                    this.$toast.info(response.data.error, this.lang.Info + " !!");
                } else {
                    this.$store.dispatch("activeCurrency", response.data.active_currency);
                    //   this.$Progress.finish();
                }
            });
        },

        handleScroll() {
            if (this.headerBottom) {
                const offset = this.headerBottom.getBoundingClientRect().top;
                this.isSticky = offset <= 0;
            }
        },

        handleClickOutside(event) {
            if (this.languageDropdown && this.languageDropdownRef && !this.languageDropdownRef.contains(event.target)) {
                this.languageDropdown = false;
            }
            if (this.currencyDropdown && this.currencyDropdownRef && !this.currencyDropdownRef.contains(event.target)) {
                this.currencyDropdown = false;
            }
            if (this.UserDropdown && this.userDropdownRef && !this.userDropdownRef.contains(event.target)) {
                this.UserDropdown = false;
            }

            const dropdown = this.$refs.dropdownRef;
            if (dropdown && !dropdown.contains(event.target)) {
                this.UserDropdown = false;
            }
        },
        NavToggleDropdown() {
            this.isOpen = !this.isOpen;
        },
    },
};
</script>
