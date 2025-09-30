<template lang="html">
    <div>
        <section class="categories-section py-30" v-if="video_shopping.length > 0">
            <div class="container" :class="{ 'title-bg': addons.includes('ishopet') }">
                <!-- Section Title Start -->
                <div class="row">
                    <div class="col-12">
                        <div class="section-title">
                            <div class="wrap">
                                <h2 class="title">
                                    {{ lang.video_shopping }}
                                </h2>
                            </div>
                            <div class="section-btn">
                                <router-link class="solid-btn" :to="{ name: 'video.shopping' }">{{ lang.browse_all_videos }}</router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Section Title End -->

                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-6" v-for="(video, index) in video_shopping" :key="index">
                        <VideoItem :video="video" />
                    </div>
                </div>

            </div>
        </section>

        <section class="categories-section py-30" v-else-if="show_shimmer">
            <div class="container">
                <div class="video-content">
                    <div class="row">
                        <div
                            class="col-lg-3 col-md-4 col-sm-6"
                            v-for="(video, index) in 4"
                            :key="index"
                        >
                            <div class="video--thumb">
                                <div class="video-play--thumb">
                                    <a href="#">
                                        <Shimmer :height="344"></Shimmer>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import VideoItem from "@/components/VideoItem.vue";

export default {
    components: { Shimmer, VideoItem },

    props: ["video_shopping"],

    mounted() {
        this.checkHomeComponent("video_shopping");
    },
    watch: {
        homeResponse() {
            this.checkHomeComponent("video_shopping");
        },
    },
    data: () => ({
        show_shimmer: true,
    }),
    computed: {},
    methods: {
        checkHomeComponent(component_name) {
            let component = this.homeResponse.find(
                (data) => data == component_name
            );

            if (component) {
                return (this.show_shimmer = false);
            }
        },
    },
};
</script>
