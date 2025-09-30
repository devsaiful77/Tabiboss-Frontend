<template>
  <!-- Sidebar Start -->
  <div class="sideBar" v-if="authUser">
    <div class="userProfile">
      <router-link :to="{ name: 'edit.profile' }" class="action-list">
        <div class="thumb">
          <img
            :src="authUser.profile_image"
            :alt="authUser.full_name"
            class="img-fluid"
          />
        </div>
        <div class="content">
          {{ authUser.full_name }}<span>{{ authUser.email }}</span>
        </div>
      </router-link>

      <router-link
        class="be_seller base"
        :to="{name: 'migrate.seller'}"
        v-if="!addons.includes('ramdhani') && settings.seller_system == 1"
      >
        {{ lang.be_a_seller }}
        <span class="mdi mdi-name mdi-store-outline"></span>
      </router-link>


    </div>
    <div class="sideBar-menu border-top mt-15">
      <ul class="menu-item">
        <li>
          <router-link :to="{ name: 'dashboard' }">
            <div class="icon">
              <img
                :src="static_image_url + 'dashboard-icon/grid.svg'"
                alt="icon"
              />
            </div>
            <span>{{ lang.dashboard }}</span>
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'order.history' }">
            <div class="icon">
              <img
                :src="static_image_url + 'dashboard-icon/order.svg'"
                alt="icon"
              />
            </div>
            <span>{{ lang.order_history }}</span>
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'addresses' }">
            <div class="icon">
              <img
                :src="static_image_url + 'dashboard-icon/address.svg'"
                alt="icon"
              />
            </div>
            <span>{{ lang.addresses }}</span>
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'notification' }">
            <div class="icon">
              <img
                :src="static_image_url + 'dashboard-icon/notification.svg'"
                alt="icon"
              />
            </div>
            <span>{{ lang.notification }}</span>
          </router-link>
        </li>

        <li v-if="download_url">
          <router-link :to="{ name: 'orders.digital.product' }">
            <div class="icon">
              <img
                :src="static_image_url + 'dashboard-icon/product.svg'"
                alt="icon"
              />
            </div>
            <span>{{ lang.digital_product_order }}</span>
          </router-link>
        </li>

        <li v-if="settings.coupon_system == 1">
          <router-link :to="{ name: 'gift.voucher' }">
            <div class="icon">
              <img
                :src="static_image_url + 'dashboard-icon/gift.svg'"
                alt="icon"
              />
            </div>
            <span>{{ lang.gift_voucher }}</span>
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'change.password' }">
            <div class="icon">
              <img
                :src="static_image_url + 'dashboard-icon/lock.svg'"
                alt="icon"
              />
            </div>
            <span>{{ lang.change_password }}</span>
          </router-link>
        </li>

        <li v-if="settings.wallet_system == 1">
          <router-link :to="{ name: 'wallet.history' }">
            <div class="icon">
              <img
                :src="static_image_url + 'dashboard-icon/wallet.svg'"
                alt="icon"
              />
            </div>
            <span>{{ lang.my_wallet }}</span>
          </router-link>
        </li>

        <li v-if="addons.includes('reward')">
          <router-link :to="{ name: 'reward.history' }">
            <div class="icon">
              <img
                :src="static_image_url + 'dashboard-icon/reward.svg'"
                alt="icon"
              />
            </div>
            <span>{{ lang.my_rewards }}</span>
          </router-link>
        </li>

        <li v-if="addons.includes('affiliate') && authUser.referral_code">
          <router-link :to="{ name: 'affiliate.system' }">
            <div class="icon">
              <img
                :src="static_image_url + 'dashboard-icon/shop.svg'"
                alt="icon"
              />
            </div>
            <span>Affiliate System</span>
          </router-link>
        </li>

        <li v-if="settings.seller_system == 1">
          <router-link :to="{ name: 'shop.followed' }">
            <div class="icon">
              <img
                :src="static_image_url + 'dashboard-icon/wishlist.svg'"
                alt="icon"
              />
            </div>
            <span>{{ lang.shop }}</span>
          </router-link>
        </li>

        <li>
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#logoutPopup"
            class="logoutBtn"
          >
            <div class="icon">
              <img
                :src="static_image_url + 'dashboard-icon/logout.svg'"
                alt="icon"
              />
            </div>
            <span>Log out</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <!-- Sidebar End -->
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";

export default {
  components: { Shimmer },
  props: ["current", "addresses"],
  data() {
    return {
      static_image_url: this.getUrl("frontends/images/"),
      loading: false,
      download_url: false,
      show_menu: "",
    };
  },

  mounted() {
    this.checkAuth();
  },

  computed: {
    totalReward() {
      return this.$store.getters.getTotalReward;
    },
    modalType() {
      return this.$store.getters.getModalType;
    },
  },

  methods: {
    checkAuth() {
      let url = this.getUrl("home/check-auth");
      axios.get(url).then((response) => {
        this.$store.dispatch("user", response.data.user);
        this.$store.commit("getOrderUrl", response.data.order_urls);
        if (!this.authUser) {
          this.$router.push({ name: "login" });
        } else if (this.authUser.user_type == "admin") {
          this.$router.push({ name: "home" });
        }
        if (response.data.reward) {
          this.$store.commit("setTotalReward", response.data.reward);
        }
        if (response.data.download_urls) {
          this.download_url = true;
        }
      });
    },
    convertReward() {
      let url = this.getUrl("user/convert-reward");

      let form = {
        amount: this.converted_reward / this.settings.reward_convert_rate,
        reward: this.converted_reward,
      };

      if (
        form.amount > 0 &&
        this.totalReward.rewards >= this.converted_reward &&
        confirm("Are You Sure! You want to Convert ?")
      ) {
        this.loading = true;
        axios
          .post(url, form)
          .then((response) => {
            this.loading = false;
            if (response.data.error) {
              this.$toast.error(response.data.error, this.lang.Error + " !!");
            } else {
              this.$toast.success(
                response.data.success,
                this.lang.Success + "!!"
              );
              $("#convert_reward").modal("hide");
              this.converted_reward = "";
              this.$store.dispatch("user", response.data.user);
              this.$store.commit("setTotalReward", response.data.reward);
            }
          })
          .catch((error) => {
            this.loading = false;
          });
      }
    },
    showMenu() {
      if (this.show_menu == "displayMenu") {
        this.show_menu = "";
      } else {
        this.show_menu = "displayMenu";
      }
    },
  },
};
</script>

<style scoped>
a.be_seller.base {
  text-align: center;
  display: block;
  margin-top: 10px;
  color: var(--primary);
  text-decoration: underline;
}
</style>
