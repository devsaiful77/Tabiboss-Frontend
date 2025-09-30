<template>
    <!-- Campaign Section Start -->
    <section
        class="campain-section pt-30"
        v-if="lengthCounter(countCampaigns) > 0"
    >
        <div class="container">
            <!-- Section Title Start -->
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <div class="wrap">
                            <h2 class="title">{{ lang.campaign }}</h2>
                        </div>
                        <div class="section-btn">
                            <a
                                :href="getUrl('campaigns')"
                                @click.prevent="
                                    routerNavigator('campaigns', null)
                                "
                                class="solid-btn"
                                >{{ lang.more_campaign }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Section Title End -->
            <div class="row">
                <div
                    v-for="(campaign, index) in campaigns"
                    :key="index"
                    class="col-md-6"
                >

                <!-- {{ campaign }} -->
                    <div class="campain-wrapper">
                        <a
                            :href="getUrl('campaign/' + campaign.slug)"
                            @click.prevent="
                                routerNavigator(
                                    'campaign.details',
                                    campaign.slug
                                )
                            "
                            class="campain-thumb custom-campain-thumb"
                        >
                            <img
                                :src="campaign.image_375x220"
                                :alt="campaign.title"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>





    <section class="campain-section pt-30" v-else-if="show_shimmer">
        <div class="container">
            <!-- Section Title Start -->
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <Shimmer :height="50" />
                    </div>
                </div>
            </div>
            <!-- Section Title End -->
            <div class="row">
                <div
                    v-for="(campaign, index) in 4"
                    :key="index"
                    class="col-md-6"
                >
                    <div class="campain-wrapper">
                        <a href="javascript:void(0)" class="campain-thumb">
                            <Shimmer class="mb-3" :height="220" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <!-- Campaign Section End -->
</template>

<script>
import Shimmer from '@/components/Shimmer.vue';
export default {
    components: {Shimmer},
    props: ["campaigns"],
    data() {
        return {
            show_shimmer: true,
        };
    },

    computed: {
        displayedCampaigns() {
            const route = this.$route;

            if (route.name === "home") {
                return this.CampainData.slice(0, 5);
            } else {
                return this.CampainData;
            }
        },

        countCampaigns() {
            if (this.campaigns && this.campaigns.length > 0) {
                return this.campaigns;
            } else {
                return [];
            }
        },
    },

    methods: {
        getColumnClass(index) {
            if (index === 0 || index === 5) {
                return "col-lg-7";
            } else if ([1, 2, 6, 7].includes(index)) {
                return "col-lg-5 col-sm-6";
            } else if ([3, 8].includes(index)) {
                return "col-lg-4 col-sm-6";
            } else if ([4, 9].includes(index)) {
                return "col-lg-3 col-sm-6";
            } else if ([10, 11].includes(index)) {
                return "col-lg-6 col-sm-6";
            } else {
                return "col-lg-12";
            }
        },

        checkHomeComponent(component_name) {
            let component = this.homeResponse.find(
                (data) => data == component_name
            );

            if (component) {
                return (this.show_shimmer = false);
            }
        },
    },

    watch: {
        homeResponse() {
            this.checkHomeComponent("campaign");
        },
    },

    mounted() {
        this.checkHomeComponent("campaign");
    },
};
</script>
