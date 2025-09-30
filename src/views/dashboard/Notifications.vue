<template lang="html">
  <div class="orderBox-wrapper">
    <!-- heading -->
    <div class="title justify-content-between">
      <h1 v-if="notifications.total > 0">
        {{ notifications.total }} Notifications found
      </h1>
      <h1 v-else-if="is_shimmer">{{ lang.notification_found }}</h1>
      <h1 v-else>{{ lang.loading }}</h1>
      <a
        v-if="notifications.total > 0"
        href="javascript:void(0)"
        @click="seenAll"
        >{{ this.lang.seen_all }}</a
      >
    </div>
    <!-- heading -->

    <div class="cart-form mt-20">
      <div class="table-responsive">
        <table v-if="is_shimmer" class="table-v2">
          <thead>
            <tr>
              <td>#</td>
              <td>{{ lang.Title }}</td>
              <td>{{ lang.time }}</td>
              <td>{{ lang.action }}</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(notification, i) in notifications.data" :key="i">
              <th scope="row">{{ ++i }}</th>
              <td scope="row" v-if="notification.status == 'unseen'">
                <div class="product">
                  <a :href="getUrl(notification.url)">
                    <div class="text">
                      <p>{{ notification.title }}</p>
                    </div>
                  </a>
                </div>
                <!-- /.product -->
              </td>
              <td v-else>{{ notification.title }}</td>
              <td>{{ notification.date }} | {{ notification.time }}</td>
              <td>
                <div class="add-to-cart mb-2 mt-2">
                  <a
                    v-if="notification.status == 'unseen'"
                    href="javascript:void(0)"
                    @click="seen(notification.id, i - 1)"
                    class="btn"
                    >{{ lang.seen }}</a
                  >
                  <a
                    href="javascript:void(0)"
                    @click="remove(notification.id, i - 1)"
                    class="btn"
                    >{{ lang.remove }}</a
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="table-v2" v-else-if="shimmer">
          <shimmer
            class="mb-3"
            v-for="(num, i) in 8"
            :key="i"
            :height="70"
          ></shimmer>
        </table>
        <div
          class="show-more-button"
          v-if="notifications.next_page_url && !loading"
        >
          <a href="javascript:void(0)" class="btn btn-primary">{{
            lang.show_more
          }}</a>
        </div>
        <div class="show-more-button" v-if="loading">
          <loading_button :class_name="'btn btn-primary'"></loading_button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Shimmer from "@/components/Shimmer.vue";
export default {
  data() {
    return {
      current: "notification",
      loading: false,
      is_shimmer: false,
    };
  },
  components: {
    Shimmer,
  },
  mounted() {
    if (this.lengthCounter(this.notification.data) == 0) {
      this.notification();
    }
    if (this.lengthCounter(this.notification.data) > 0) {
      this.is_shimmer = true;
    }
  },
  computed: {
    notifications() {
      return this.$store.getters.getNotifications;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
  },
  methods: {
    notification() {
      let url = this.getUrl("user-notification/all");
      this.$progress.start();
      axios
        .get(url)
        .then((response) => {
          this.is_shimmer = true;
          this.$store.commit("setShimmer", 0);
          this.$progress.finish();
          this.$store.commit("setNotifications", response.data.notifications);
        })
        .catch((error) => {
          
        });
    },
    seenAll() {
      let url = this.getUrl("user-notification/seen-all");
      axios
        .get(url)
        .then((response) => {
          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            for (let i = 0; i < this.notifications.data.length; i++) {
              this.fetchedNotifications[i].status = "seen";
            }
          }
        })
        .catch((error) => {
          
        });
    },
    seen(id, i, redirect_url) {
      let url = this.getUrl("notification/seen/" + id);

      axios.get(url).then((response) => {
        if (response.data.error) {
          this.$toast.error(response.data.error, this.lang.Error + " !!");
        } else {
          this.notifications.data[i].status = "seen";
          if (redirect_url == "url") {
            let split_data = this.notifications.data[i].url.split("/");
            this.$router.push({
              name: "get.invoice",
              params: { orderCode: split_data[split_data.length - 1] },
            });
          }
        }
      });
    },
    remove(id, i) {
      let url = this.getUrl("notification/remove/" + id);

      axios.get(url).then((response) => {
        if (response.data.error) {
          this.$toast.error(response.data.error, this.lang.Error + " !!");
        } else {
          this.notifications.data.splice(i, 1);
          this.notifications.total -= 1;
        }
      });
    },
  },
};
</script>
