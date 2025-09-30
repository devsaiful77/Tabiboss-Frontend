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
                            <li>{{ lang.video_shopping }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Breadcrumb Section End -->

    <section class="brands-section py-40" v-if="is_shimmer">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <!-- Section Title Start -->
                    <div class="section-title">
                        <div class="wrap">
                            <h2 class="title">{{ lang.video_shopping }}</h2>
                        </div>
                    </div>
                    <!-- Section Title End -->

                    <!-- {{ videoShops[0] }} -->

                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-6 mb-3" v-for="(video,index) in videoShops" :key="index">
                            <VideoItem :video="video" />
                        </div>
                    </div>

                    <div class="show-more text-center mt-4">
                        <a href="javascript:void(0)" v-if="next_page_url && !loading" @click="getVideos"
                           class="btn">{{ lang.show_more }}</a>
                        <loading_button :class_name="'btn btn-primary'" v-if="loading"></loading_button>
                    </div>


                </div>
            </div>
        </div>
    </section>


    <section class="brands-section py-40" v-else-if="shimmer">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <!-- Section Title Start -->
                    <Shimmer :height="50" class="mb-4" />
                    <!-- Section Title End -->

                    <!-- {{ videoShops[0] }} -->

                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-6 mb-3" v-for="(video,index) in 8" :key="index">
                            <Shimmer :height="400" />
                        </div>
                    </div>




                </div>
            </div>
        </div>
    </section>



</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import VideoItem from "@/components/VideoItem.vue"

export default {
    data() {
        return {
            page: 1,
            loading: false,
            next_page_url: false,
            is_shimmer: false,
        };
    },
    components: {
        Shimmer,
        VideoItem
    },
    computed: {
        videoShops() {
            return this.$store.getters.getVideoShops;
        },
    },
    mounted() {
        if (this.videoShops.length == 0) {
            this.getVideos();
        } else {
            this.is_shimmer = true;
        }
    },
    methods: {
        getVideos() {
            if (this.page > 1) {
                this.loading = true;
            } else {
                this.$progress.start();
            }

            let url = this.getUrl("get/video-shops?page=" + this.page);
            axios
                .get(url)
                .then((response) => {
                    this.is_shimmer = true;
                    if (this.page > 1) {
                        this.loading = false;
                    }
                    if (response.data.error) {
                        if (this.page == 1) {
                            
                        }
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        if (this.page == 1) {
                            this.$progress.finish();
                        }
                        this.$store.commit(
                            "setVideoShops",
                            response.data.videos.data
                        );
                        this.next_page_url = response.data.videos.next_page_url;
                        this.page++;
                    }
                })
                .catch((error) => {
                    this.is_shimmer = true;
                    if (this.page > 1) {
                        this.loading = false;
                    }
                    if (error.response) {
                        this.$toast.error(
                            error.response.statusText,
                            this.lang.Error + " !!"
                        );
                    } else {
                        this.$toast.error(
                            "Something Went Wrong",
                            this.lang.Error + " !!"
                        );
                    }
                });
        },
    },
};
</script>
