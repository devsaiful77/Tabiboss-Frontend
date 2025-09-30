<template lang="html">
    <div class="cart-form">
        <div class="cart-header">
            <h4
                class="store-title"
                v-if="totalReward != null && totalReward.rewards > 0"
            >
                {{ lang.my_rewards }}
            </h4>
            <h4 class="store-title" v-else-if="is_shimmer">
                {{ lang.no_my_rewards }}
            </h4>
            <h4 class="store-title" v-else>{{ lang.loading }}</h4>
        </div>




        <!-- counting.... -->
        <div class="walletHistory-wrapper p-4">
            <div class="row" v-if="is_shimmer">
                <div
                    class="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4"
                    v-if="totalReward != null && totalReward.rewards > 0"
                >
                    <a
                        href="javascript:void(0)"
                        data-bs-target="#convert_reward"
                        data-bs-toggle="modal"
                    >
                        <div class="orderBox">
                            <div class="icon"><CubeSVG /></div>
                            <div class="content">
                                <h4 class="title">
                                    {{ lang.convert_reward_to_wallet }}
                                </h4>
                                <span class="count">
                                    {{ priceFormat(authUser.balance) }}
                                </span>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4">
                    <a href="javascript:void(0)">
                        <div class="orderBox">
                            <div class="icon"><CubeSVG /></div>
                            <div class="content">
                                <h4 class="title">{{ lang.total_rewards }}</h4>
                                <span class="count">
                                    {{
                                        totalReward != null
                                            ? totalReward.rewards
                                            : 0
                                    }}
                                </span>
                            </div>
                        </div>
                    </a>
                </div>

                <div
                    class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-4"
                    v-if="totalReward && totalReward.last_conversion"
                >
                    <a href="javascript:void(0)">
                        <div class="orderBox">
                            <div class="icon"><CubeSVG /></div>
                            <div class="content">
                                <h4 class="title">
                                    {{ lang.last_converted_to_wallet }}
                                </h4>
                                <span class="date">
                                    {{ totalReward.last_conversion }}
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div class="row" v-else-if="shimmer">
                <div
                    class="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4"
                    v-for="(num, i) in 3"
                >
                    <shimmer :height="100"></shimmer>
                </div>
            </div>
        </div>
    </div>

    <!-- table -->
    <div v-if="is_shimmer" class="cart-form mt-20">
        <div class="cart-header">
            <h4 class="store-title">{{ lang.reward_history }}</h4>
        </div>
        <div class="table-responsive">
            <table class="table-v2">
                <thead>
                    <tr>
                        <th class="cart-pd-number">#</th>
                        <th class="cart-pd-thumb text-start">
                            {{ lang.product }}
                        </th>
                        <th class="cart-pd-price">{{ lang.quantity }}</th>
                        <th class="cart-pd-method">
                            {{ lang.total_reward }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(reward, index) in rewards" :key="index">
                        <td class="cart-pd-number">{{ ++index }}</td>
                        <td class="cart-pd-thumb">
                            {{ reward.product.product_name }}
                        </td>
                        <td class="cart-pd-price">
                            {{ reward.product_qty }}
                        </td>
                        <td class="cart-pd-thumb">{{ reward.reward }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div
            class="col-md-12 text-center show-more mt-3"
            v-if="next_page_url && !loading"
        >
            <a
                href="javascript:void(0)"
                @click="loadWallets()"
                class="btn btn-primary"
                >{{ lang.show_more }}</a
            >
        </div>
        <div class="col-md-12 text-center show-more mt-3" v-show="loading">
            <a href="javascript:void(0)" class="btn btn-primary"
                ><img
                    width="20"
                    :src="getUrl('images/default/preloader.gif')"
                    alt="preloader"
                />{{ lang.loading }}</a
            >
        </div>
    </div>

    <div class="cart-form mt-20" v-else-if="shimmer">
        <div class="row">
            <div class="col-md-12 mb-3 overflow-y-auto" v-for="(num, i) in 6">
                <shimmer :height="50"></shimmer>
            </div>
        </div>
    </div>


    <!-- Recharge Wallet Modal -->
    <div
      class="modal fade customModal RechargeWalletModal"
      id="convert_reward"
      tabindex="-1"
      aria-labelledby="convert_rewardLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div class="title">{{ lang.convert_reward_to_wallet }}</div>
            <button
              type="button"
              class="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="ri-close-large-fill"></i>
            </button>
          </div>
          <div class="modal-body p-0">
            <p class="title">{{ lang.total_rewards }} {{
                totalReward != null
                    ? totalReward.rewards
                    : 0
            }} </p>
            <p class="title">
                Convert Amount = {{ priceFormat(rewardInUSD) }}
            </p>

            <button @click="convertWallet" class="btn btn-primary" type="button">Convert</button>


          </div>
        </div>
      </div>
    </div>



</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import CubeSVG from "@/svg/CubeSVG.vue";
import { setToast } from "@/utils/toast";

export default {
    components: { Shimmer, CubeSVG },
    data() {
        return {
            current: "reward_history",
            page: 1,
            loading: false,
            next_page_url: false,
            is_shimmer: false,
        };
    },
    created() {
        if (!this.addons.includes("reward")) {
            this.$router.push({ name: "home" });
        }
    },
    mounted() {
        if (this.lengthCounter(this.rewards) == 0) {
            this.loadRewards();
        }
        if (this.lengthCounter(this.rewards) > 0) {
            this.is_shimmer = true;
        }
    },
    computed: {
        rewards() {
            return this.$store.getters.getRewards;
        },
        totalReward() {
            return this.$store.getters.getTotalReward;
        },
        shLength() {
            return this.$store.getters.getCommonData;
        },
        shimmer() {
            return this.$store.state.module.shimmer;
        },

        rewardInUSD() {
            if (!this.totalReward || !this.settings) return 0;
            return this.totalReward.rewards / this.settings.reward_convert_rate;
        }

    },
    methods: {
        loadRewards() {
            let url = this.getUrl("user/reward-history?page=" + this.page);

            if (this.page > 1) {
                this.loading = true;
            }
            this.$progress.start();

            axios
                .get(url)
                .then((response) => {
                    this.loading = false;
                    this.is_shimmer = true;
                    if (response.data.error) {
                        
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        if (response.data.reward_details) {
                            this.$store.commit(
                                "getRewards",
                                response.data.reward_details.data
                            );
                            this.next_page_url =
                                response.data.reward_details.next_page_url;
                        }
                        this.$store.commit(
                            "setTotalReward",
                            response.data.reward
                        );
                        this.$store.commit("commonData", response.data.reward);

                        this.page++;
                        this.$progress.finish();
                    }
                })
                .catch((error) => {
                    
                });
        },

        convertWallet(){
            const payload = {
                reward: this.totalReward.rewards,
                amount: this.rewardInUSD
            };

            let url = this.getUrl("user/convert-reward")

            axios.post(url, payload)
                .then(response => {

                    const modal = bootstrap.Modal.getInstance(document.getElementById('convert_reward'));
                    if (modal) {
                            modal.hide();
                    }

                    setToast("success",'Successfully Login')
                    setTimeout(() => {
                        window.location.reload();
                    },1000)
                })
                .catch(error => {
                    console.error('Error sending reward:', error);
                });


        }

    },
};
</script>

<style scoped>
    span.date {
        color: #333;
        font-size: 13px;
        font-weight: 600;
    }
</style>
