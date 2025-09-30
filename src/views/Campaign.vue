<template lang="html">
    <!-- Breadcrumb Section Start -->
      <section class="breadcrumb-section bg-color py-10">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="breadcrumb-area">
                <ul class="list">
                  <li @click="globNavigate('/')" class="linked">{{ lang.home }}</li>
                  <li>{{ lang.Campaigns }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Breadcrumb Section End -->

        <!-- Campaign Section Start -->

        <section class="campain-section pt-30" v-if="is_shimmer">
            <div class="container" v-if="campaigns.length > 0">
                <div class="row">
                    <template v-for="(campaign,index) in campaigns" :key="index">
                        <div class="col-md-6">
                            <div class="campain-wrapper">
                                <router-link :to="{ name : 'campaign.details',params : { slug : campaign.slug } }" class="campain-thumb custom-campain-thumb">
                                    <img loading="lazy" :src="campaign.image_375x220" :alt="campaign.title" class="img-fluid">
                                </router-link>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <div class="container" v-else>
                <div class="row">
                    <div class="col-md-12">
                        <h4 class="text-center py-10">{{ lang.no_campaign_founds }}</h4>
                    </div>
                </div>
            </div>

        </section>


        <!-- Campaign Section Start -->
        <section class="campain-section pt-30" v-else-if="shimmer">
            <div class="container">
                <div class="row">
                    <template v-for="(campaign,index) in 6" :key="index">
                        <div class="col-md-6">
                            <div class="campain-wrapper">
                                <a href="javascript:void(0)" class="campain-thumb">
                                    <Shimmer :height="220" />
                                </a>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </section>


        <!-- Campaign Section End -->


</template>

<script>
import Shimmer from "@/components/Shimmer.vue";


export default {
    components: { Shimmer },
    data() {
        return {
            loading: false,
            is_shimmer: false,
        };
    },

    mounted() {
        if (this.lengthCounter(this.campaigns) == 0) {
            this.loadMoreData();
        }
        if (this.lengthCounter(this.campaigns) > 0) {
            this.is_shimmer = true;
        }
    },
    computed: {
        baseUrl() {
            return this.$store.getters.getBaseUrl;
        },
        campaigns() {
            return this.$store.getters.getAllCampaign;
        },
        shimmer() {
            return this.$store.state.module.shimmer;
        },
        paginate() {
            return this.$store.state.module.campaign_paginate_url;
        },
    },
    methods: {
        getColumnClass(index){
            if (index === 0 || index === 5) {
                return 'col-lg-7';
            }
            else if (index === 1 || index === 2 || index === 6 || index === 7) {
                return 'col-lg-5 col-sm-6';
            }
            else if (index === 3 || index === 8) {
                return 'col-lg-4 col-sm-6';
            }
            else if (index === 4 || index === 9) {
                return 'col-lg-3 col-sm-6';
            }
            else if (index === 10 || index === 11) {
                return 'col-lg-6 col-sm-6';
            }
            else {
                return 'col-lg-12';
            }
        },

        loadMoreData() {
            if (this.$store.state.module.campaign_paginate_page != 1) {
                this.loading = true;
            }
            let url =
                this.baseUrl +
                "/home/campaign-lists?page=" +
                this.$store.state.module.campaign_paginate_page;
            this.$progress.start();
            axios
                .get(url)
                .then((response) => {
                    this.is_shimmer = true;
                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        this.loading = false;
                        this.$store.commit(
                            "getAllCampaign",
                            response.data.campaigns
                        );
                        this.$progress.finish();
                    }
                })
                .catch((error) => {
                    this.is_shimmer = true;
                    this.loading = false;
                    
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
