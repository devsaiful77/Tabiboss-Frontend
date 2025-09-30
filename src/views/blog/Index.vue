<template>
    <div>
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
                                <li>{{ lang.blog_news }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Breadcrumb Section End -->

        <!-- Blog Section Start -->
        <section class="blog-section py-30">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <!-- product Filter Title -->
                        <div class="productFilter-title blog-filter">
                            <div class="title-wrap">
                                <h4 class="title">{{ lang.blog_news }}</h4>
                            </div>
                            <div class="filterRight">
                                <div class="filterOption">
                                    <VueSelect
                                        v-model="form.sort"
                                        :options="SortByOptions"
                                        :reduce="(option) => option.value"
                                        label="label"
                                        @update:modelValue="filterBlogs"
                                    />
                                </div>

                                <div class="searchInput input-group">
                                    <form @submit.prevent="filterBlogs">
                                        <input
                                            type="search"
                                            class="form-control"
                                            v-model="form.title"
                                            :placeholder="lang.search_blog"
                                        />
                                        <loading_button
                                            v-if="loading"
                                        ></loading_button>
                                        <button v-else type="submit">
                                            <i class="ri-search-2-line"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" v-if="is_shimmer">
                    <div
                        class="col-lg-4 col-md-6 col-sm-6"
                        v-for="(blog, i) in blogs.data"
                        :key="i"
                    >
                        <!-- Blog Item Start -->
                        <div class="blogPost-item">
                            <div class="blog-figure">
                                <router-link
                                    :to="{
                                        name: 'blog.details',
                                        params: { slug: blog.slug },
                                    }"
                                >
                                    <img
                                        loading="lazy"
                                        :src="blog.thumbnail"
                                        :alt="blog.title"
                                    />
                                </router-link>
                                <div class="post-date">
                                    {{ blog.published_date }}
                                </div>
                            </div>
                            <div class="blog-content">
                                <h4 class="title">
                                    <router-link to="#">{{
                                        blog.title
                                    }}</router-link>
                                </h4>
                                <!-- tags -->
                                <div class="blog-meta" v-if="blog.tags">
                                    <span v-for="(tag, index) in blog.tags.split(',').map(t => t.trim())" :key="index">
                                        <a :href="`/tag/${tag}`">{{ tag }}</a>
                                    </span>
                                </div>

                                <div class="blog-btn">
                                    <router-link
                                        class="btn btn-primary"
                                        :to="{
                                            name: 'blog.details',
                                            params: { slug: blog.slug },
                                        }"
                                        >{{ lang.read_more }}</router-link
                                    >

                                    <a href="#" class="admin"
                                        ><i class="ri-user-line"></i
                                        >{{ blog.created_name }}</a
                                    >
                                </div>
                            </div>
                        </div>
                        <!-- Blog Item End -->
                    </div>
                </div>

                <div class="row" v-else-if="shimmer">
                    <div
                        class="col-md-6 col-lg-3 mb-4"
                        v-for="(blog, i) in 12"
                        :key="i"
                    >
                        <div class="post">
                            <Shimmer :height="260" />
                        </div>
                    </div>
                </div>

                <div class="show-more mt-4" v-if="next_page_url && !loading">
                    <a
                        href="javaScript:void(0)"
                        @click="loadMoreData()"
                        class="btn btn-primary"
                        >{{ lang.show_more }}</a
                    >
                </div>
                <div class="col-md-12 text-center show-more" v-show="loading">
                    <loading_button
                        :class_name="'btn btn-primary'"
                    ></loading_button>
                </div>
            </div>
        </section>
        <!-- Blog Section End -->
    </div>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import GridSVG from "@/svg/GridSVG.vue";
import ListSVG from "@/svg/ListSVG.vue";
import VueSelect from "vue3-select-component";

export default {
    components: {
        Shimmer,
        GridSVG,
        ListSVG,
        VueSelect,
    },
    data() {
        return {
            page: 1,
            activeClass: "",
            form: {
                sort: "newest",
                slug: this.$route.params.slug,
                title: null,
            },
            loading: false,
            is_shimmer: false,
            next_page_url: false,
        };
    },
    mounted() {
        if (this.lengthCounter(this.blogs) == 0) {
            this.allBlogs();
        }
        if (this.lengthCounter(this.blogs) > 0) {
            this.is_shimmer = true;
        }
    },
    computed: {
        SortByOptions() {
            return [
                { label: this.lang.newest, value: "newest" },
                { label: this.lang.oldest, value: "oldest" },
                { label: this.lang.most_viewed, value: "viewed" },
            ];
        },

        blogs() {
            return this.$store.getters.getBlogs;
        },
        shimmer() {
            return this.$store.state.module.shimmer;
        },
    },
    watch: {
        $route(from) {
            if (from.name == "blogs") {
                this.form.slug = null;
            }

            this.$store.dispatch("blogs", this.form);
        },
    },
    methods: {
        loadMoreData() {
            this.loading = true;
            this.$progress.start();
            axios
                .get(this.next_page_url, { params: this.form })
                .then((response) => {
                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        this.loading = false;
                        let blogs = response.data.blogs.data;

                        if (blogs.length > 0) {
                            for (let i = 0; i < blogs.length; i++) {
                                this.blogs.data.push(blogs[i]);
                            }
                        }
                        this.$progress.finish();
                    }
                    this.next_page_url = response.data.blogs.next_page_url;
                });
        },
        filterBlogs() {
            this.page = 1;
            this.allBlogs(this.form);
        },
        allBlogs() {
            this.loading = true;
            let url = this.getUrl("home/blogs?page=1");
            axios
                .get(url, { params: this.form })
                .then((response) => {
                    this.is_shimmer = true;
                    this.loading = false;
                    if (response.data.error) {
                        
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        this.$store.commit("getBlogs", response.data.blogs);
                        this.next_page_url = response.data.blogs.next_page_url;
                        this.page++;
                        this.$progress.finish();
                    }
                })
                .catch((error) => {
                    this.loading = false;
                    this.is_shimmer = true;
                    

                    if (error.response && error.response.status == 422) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    }
                });
        },
    },
};
</script>

<style scoped>
.blog-filter {
    margin-top: 0px !important;
    border-bottom: 0px !important;
}

/* .blog-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
} */
</style>
