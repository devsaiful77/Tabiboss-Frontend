<template lang="html">
    <!-- Breadcrumb Section Start -->
    <section class="breadcrumb-section bg-color py-10">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="breadcrumb-area">
                        <ul class="list">
                            <li class="linked">
                                <router-link to="/">{{
                                    lang.home
                                }}</router-link>
                            </li>
                            <li class="linked">
                                <router-link to="/blogs">{{
                                    lang.blog_news
                                }}</router-link>
                            </li>
                            <li>{{ commentForm.slug }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Breadcrumb Section End -->

    <!-- Blog Filter Section Start -->
    <section class="blog-section py-30" v-if="lengthCounter(blogDetails) > 0">
        <div class="container">
            <div class="row">
                <!-- blog Filter -->
                <div class="col-lg-4">
                    <div class="blogFilter">
                        <div class="accordion" id="blogFilter-accordion">
                            <!-- category -->
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button
                                        class="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#categoryCollapse"
                                        aria-expanded="true"
                                        aria-controls="categoryCollapse"
                                    >
                                        {{ lang.all_categories }}
                                    </button>
                                </h2>
                                <div
                                    id="categoryCollapse"
                                    class="accordion-collapse collapse show"
                                    data-bs-parent="#blogFilter-accordion"
                                >
                                    <div class="accordion-body">
                                        <ul class="filterList">
                                            <li
                                                v-for="(
                                                    category, index
                                                ) in categories.data"
                                                :key="index"
                                            >
                                                <router-link
                                                    :to="{
                                                        name: 'category.blogs',
                                                        params: {
                                                            slug: category.slug,
                                                        },
                                                    }"
                                                >
                                                    {{ category.title }}
                                                </router-link>
                                            </li>
                                            <li v-if="categories.next_page_url">
                                                <a
                                                    @click="loadCategories"
                                                    href="javascript:void(0)"
                                                    >{{ lang.show_more }}</a
                                                >
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <!-- recent blog -->
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button
                                        class="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#blogsCollapse"
                                        aria-expanded="false"
                                        aria-controls="blogsCollapse"
                                    >
                                        {{ lang.recent_post }}
                                    </button>
                                </h2>
                                <div
                                    id="blogsCollapse"
                                    class="accordion-collapse collapse"
                                    data-bs-parent="#blogFilter-accordion"
                                >
                                    <div class="accordion-body">
                                        <!-- Post List Start -->
                                        <div
                                            class="postList"
                                            v-for="(
                                                blog, index
                                            ) in recent_posts.data"
                                            :key="'post' + index"
                                        >
                                            <div class="thumb">
                                                <router-link
                                                    :to="{
                                                        name: 'blog.details',
                                                        params: {
                                                            slug: blog.slug,
                                                        },
                                                    }"
                                                >
                                                    <img
                                                        loading="lazy"
                                                        :src="
                                                            blog.recent_post_image
                                                        "
                                                        :alt="blog.title"
                                                    />
                                                </router-link>
                                            </div>
                                            <div class="content">
                                                <router-link
                                                    :to="{
                                                        name: 'blog.details',
                                                        params: {
                                                            slug: blog.slug,
                                                        },
                                                    }"
                                                    class="title"
                                                >
                                                    {{ blog.title }}
                                                </router-link>
                                                <span class="date">{{
                                                    blog.published_date
                                                }}</span>
                                            </div>
                                        </div>

                                        <div v-if="recent_posts.next_page_url">
                                            <router-link
                                                class="solid-btn"
                                                :to="{ name: 'blogs' }"
                                                href="javascript:void(0)"
                                                >{{ lang.show_more }}
                                            </router-link>
                                        </div>
                                        <!-- Post List Start -->
                                    </div>
                                </div>
                            </div>

                            <!-- tag -->
                            <div
                                class="accordion-item mt-20"
                                v-if="tags[1] != null"
                            >
                                <h2 class="accordion-header">
                                    <button
                                        class="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#tagCollapse"
                                        aria-expanded="false"
                                        aria-controls="tagCollapse"
                                    >
                                        {{ lang.tags }}
                                    </button>
                                </h2>
                                <div
                                    id="tagCollapse"
                                    class="accordion-collapse collapse"
                                    data-bs-parent="#blogFilter-accordion"
                                >
                                    <div class="accordion-body">
                                        <ul class="filterList tagItem">
                                            <li
                                                v-for="(tag, i) in tags"
                                                :key="i"
                                            >
                                                <label v-if="tag">
                                                    <input
                                                        type="checkbox"
                                                        class="d-none"
                                                        :value="tag"
                                                    />
                                                    {{ tag }}
                                                </label>
                                            </li>

                                            <a
                                                href="javascript:void(0)"
                                                v-for="(tag, i) in tags"
                                                :key="i"
                                                >{{ tag }}</a
                                            >
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button
                                        class="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#socialCollapse"
                                        aria-expanded="false"
                                        aria-controls="socialCollapse"
                                    >
                                        {{ lang.social_media }}
                                    </button>
                                </h2>
                                <div
                                    id="socialCollapse"
                                    class="accordion-collapse collapse"
                                    data-bs-parent="#blogFilter-accordion"
                                >
                                    <div class="accordion-body">
                                        <ul class="social-icon">
                                            <li>
                                                <a
                                                    target="_blank"
                                                    :href="
                                                        'https://www.facebook.com/sharer/sharer.php?u=' +
                                                        getUrl(
                                                            'blog/' +
                                                                blogDetails.slug
                                                        )
                                                    "
                                                >
                                                    <img
                                                        :src="
                                                            static_image_url +
                                                            'social-icon/facebook.svg'
                                                        "
                                                        alt="facebook"
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    target="_blank"
                                                    :href="
                                                        'https://twitter.com/intent/tweet?text=' +
                                                        blogDetails.title +
                                                        '&url=' +
                                                        getUrl(
                                                            'blog/' +
                                                                blogDetails.slug
                                                        )
                                                    "
                                                >
                                                    <img
                                                        :src="
                                                            static_image_url +
                                                            'social-icon/twitter.svg'
                                                        "
                                                        alt="twiter"
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    target="_blank"
                                                    :href="
                                                        'https://www.linkedin.com/sharing/share-offsite?mini=true&url=' +
                                                        getUrl(
                                                            'blog/' +
                                                                blogDetails.slug
                                                        ) +
                                                        '&title=' +
                                                        blogDetails.title +
                                                        '&summary=Extra+linkedin+summary+can+be+passed+here'
                                                    "
                                                >
                                                    <img
                                                        :src="
                                                            static_image_url +
                                                            'social-icon/linkedin.svg'
                                                        "
                                                        alt="linkedin"
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    target="_blank"
                                                    :href="
                                                        'https://wa.me?text=' +
                                                        getUrl(
                                                            'blog/' +
                                                                blogDetails.slug
                                                        )
                                                    "
                                                >
                                                    <img
                                                        :src="
                                                            static_image_url +
                                                            'social-icon/google.svg'
                                                        "
                                                        alt="google"
                                                    />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-12">
                            <div class="blogPost-single">
                                <h4 class="main-title">
                                    {{ blogDetails.title }}
                                </h4>

                                <div class="blog-single-meta">
                                    <span v-if="blogDetails.user">
                                        <a href="javascript:void(0)">
                                            <img
                                                v-if="
                                                    blogDetails.user
                                                        .user_profile_image
                                                "
                                                loading="lazy"
                                                :src="
                                                    blogDetails.user
                                                        .user_profile_image
                                                "
                                                :alt="
                                                    blogDetails.user.full_name
                                                "
                                                style="
                                                    width: 30px;
                                                    height: 30px;
                                                    border-radius: 50%;
                                                "
                                            />{{ blogDetails.user.full_name }}
                                        </a>
                                    </span>

                                    <span
                                        ><i class="ri-calendar-line"></i
                                        >{{ blogDetails.published_date }}</span
                                    >

                                    <span
                                        ><a href="#"
                                            ><i class="ri-message-2-line"></i
                                            >{{ blogDetails.blog_views_count }}
                                            {{ lang.view }}</a
                                        ></span
                                    >

                                    <span
                                        ><a href="#"
                                            ><i class="ri-message-2-line"></i
                                            >{{ comments.total }}
                                            {{ lang.comment }}</a
                                        ></span
                                    >
                                </div>

                                <div class="thumb">
                                    <img
                                        loading="lazy"
                                        :src="blogDetails.banner_img"
                                        v-if="blogDetails.banner_img"
                                        :alt="blogDetails.title"
                                    />
                                </div>

                                <div class="content">
                                    <div>
                                        <div
                                            v-html="blogDetails.description"
                                        ></div>
                                    </div>

                                    <!-- Share Blog Post -->
                                    <div class="shareOption">
                                        <div class="shareTitle">
                                            <i class="ri-share-line"></i
                                            >{{ lang.share }}
                                        </div>

                                        <ul class="social-icon">
                                            <li>
                                                <a
                                                    target="_blank"
                                                    :href="
                                                        'https://www.facebook.com/sharer/sharer.php?u=' +
                                                        getUrl(
                                                            'blog/' +
                                                                blogDetails.slug
                                                        )
                                                    "
                                                >
                                                    <img
                                                        :src="
                                                            static_image_url +
                                                            'social-icon/facebook.svg'
                                                        "
                                                        alt="facebook"
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    target="_blank"
                                                    :href="
                                                        'https://twitter.com/intent/tweet?text=' +
                                                        blogDetails.title +
                                                        '&url=' +
                                                        getUrl(
                                                            'blog/' +
                                                                blogDetails.slug
                                                        )
                                                    "
                                                >
                                                    <img
                                                        :src="
                                                            static_image_url +
                                                            'social-icon/twitter.svg'
                                                        "
                                                        alt="twiter"
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    target="_blank"
                                                    :href="
                                                        'https://www.linkedin.com/sharing/share-offsite?mini=true&url=' +
                                                        getUrl(
                                                            'blog/' +
                                                                blogDetails.slug
                                                        ) +
                                                        '&title=' +
                                                        blogDetails.title +
                                                        '&summary=Extra+linkedin+summary+can+be+passed+here'
                                                    "
                                                >
                                                    <img
                                                        :src="
                                                            static_image_url +
                                                            'social-icon/linkedin.svg'
                                                        "
                                                        alt="linkedin"
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    target="_blank"
                                                    :href="
                                                        'https://wa.me?text=' +
                                                        getUrl(
                                                            'blog/' +
                                                                blogDetails.slug
                                                        )
                                                    "
                                                >
                                                    <img
                                                        :src="
                                                            static_image_url +
                                                            'social-icon/google.svg'
                                                        "
                                                        alt="google"
                                                    />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                    <!-- Add comments -->
                                    <div>
                                        <form
                                            @submit.prevent="comment"
                                            class="all-comments"
                                            v-if="authUser"
                                        >
                                            <h2
                                                class="title py-15 mb-20 border-bottom"
                                            >
                                                {{ lang.write_a_comments }}
                                            </h2>
                                            <div class="input-group">
                                                <textarea
                                                    class="form-control"
                                                    required="required"
                                                    rows="8"
                                                    placeholder="Write Comment"
                                                    v-model="
                                                        commentForm.comment
                                                    "
                                                ></textarea>
                                            </div>
                                            <div class="submit-btn">
                                                <loading_button
                                                    v-if="loading"
                                                    :class_name="'btn btn-primary'"
                                                ></loading_button>
                                                <input
                                                    type="submit"
                                                    v-else
                                                    class="btn btn-secondary"
                                                    :value="lang.post"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <!-- List comments -->
                                    <Comment
                                        :comments="comments"
                                        :blog-details="blogDetails"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Blog Section End -->

    <!-- Blog Filter Section Start -->
    <section class="blog-section py-30" v-else-if="shimmer">
        <div class="container">
            <div class="row">
                <!-- blog Filter -->
                <div class="col-lg-4">
                    <div class="blogFilter">
                        <div class="accordion" id="blogFilter-accordion">
                            <!-- category -->
                            <Shimmer v-for="i in 4" :height="55" style="margin-bottom: 20px;" />

                        </div>
                    </div>
                </div>

                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-12">
                            <div class="blogPost-single">
                                <h4 class="main-title">
                                    <Shimmer :height="30" />
                                </h4>

                                <div class="blog-single-meta">
                                    <Shimmer :height="55" />
                                </div>

                                <div class="thumb">
                                    <Shimmer :height="446" />
                                </div>

                                <div class="content mt-5">
                                    <Shimmer :height="100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Blog Section End -->
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import Comment from "./partials/Comment.vue";

export default {
    name: "SidebarContent",
    components: { Shimmer, Comment },
    data() {
        return {
            static_image_url: this.getUrl("frontends/images/"),

            // required
            collapeActive: "categories",
            commentForm: {
                comment: "",
                blog_id: "",
                slug: this.$route.params.slug,
            },
            page: 1,
            category: true,
            recentPost: true,
            loading: false,
            share_dropdown: false,
        };
    },

    mounted() {
        this.$store.dispatch("blogDetails", this.$route.params.slug);
    },

    computed: {
        blogDetails() {
            return this.$store.getters.getBlogDetails;
        },
        categories() {
            return this.$store.getters.getBlogCategories;
        },
        tags() {
            return this.$store.getters.getBlogTags;
        },
        recent_posts() {
            return this.$store.getters.getRecentPosts;
        },
        comments() {
            return this.$store.getters.getBlogComments;
        },
        shimmer() {
            return this.$store.state.module.shimmer;
        },
    },

    watch: {
        $route(to, from) {
            this.$store.dispatch("blogDetails", this.$route.params.slug);
        },
    },

    methods: {
        collapeActiveStatus(data) {
            if (this.collapeActive == data) {
                this.collapeActive = "";
            } else {
                this.collapeActive = data;
            }
        },
        comment() {
            this.loading = true;
            this.commentForm.blog_id = this.blogDetails.id;
            let url = this.getUrl("store/blog-comment");
            this.$progress.start();
            axios
                .post(url, this.commentForm)
                .then((response) => {
                    this.loading = false;

                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        this.commentForm.comment = "";

                        this.$store.dispatch(
                            "blogDetails",
                            this.$route.params.slug
                        );

                        if (response.data.success) {
                            this.$toast.success(
                                response.data.success,
                                this.lang.Success + " !!"
                            );
                        }
                        this.$progress.finish();
                    }
                })
                .catch((error) => {
                    this.loading = false;
                });
        },
        loadCategories() {
            this.page++;
            let url = this.url + "/load/blog-categories?page=" + this.page;
            this.$progress.start();
            axios.get(url).then((response) => {
                if (response.data.error) {
                    this.$toast.error(
                        response.data.error,
                        this.lang.Error + " !!"
                    );
                } else {
                    let categories = response.data.categories.data;

                    if (categories.length > 0) {
                        for (var i in categories) {
                            this.categories.data.push(categories[i]);
                        }
                    }
                    this.$progress.finish();
                    this.categories.next_page_url =
                        response.data.categories.next_page_url;
                }
            });
        },
        shareDropdown() {
            this.share_dropdown = !this.share_dropdown;
            this.share_dropdown &&
                this.$nextTick(() => {
                    document.addEventListener(
                        "click",
                        this.hideLanguageDropdown
                    );
                });
        },
    },

    // end export
};
</script>
