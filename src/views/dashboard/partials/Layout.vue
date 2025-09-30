<template lang="html">
  <!-- Dashboard Section Start -->
  <div class="dashboard-section pt-30 pb-100">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="dashboard-head" ref="userDropdownRef">
            <div class="header-toggle" @click.prevent="toggleUserDropdown">
              <div class="toggle-bar"></div>
            </div>
            <div class="dashboard-banner">
              <img
                loading="lazy"
                :src="settings.user_dashboard_banner"
                alt="profile-banner"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="dashboard-wrapper">
            <!-- Dashboard Sidebar -->
            <div class="dashboard-sidebar" :class="{ active: userDropdown }">
              <Sidebar />
            </div>

            <div class="dashboard-content">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Dashboard Section End -->
</template>
<script>
import Sidebar from "./Sidebar.vue";
export default {
  components: { Sidebar },
  data() {
    return {
      static_image_url: this.getUrl("frontends/images/"),
      userDropdown: false,
      userDropdownRef: null,
    };
  },

  methods: {
    toggleUserDropdown() {
      this.userDropdown = !this.userDropdown;
    },
  },
};
</script>
