<template lang="html">
  <div class="col-12">
    <!-- Shipping method Data -->
    <div class="cart-form border-none payment-accordion">
      <AddressForm ref="address_form" />

      <div class="addressWrapper" v-if="lengthCounter(addresses) > 0">
        <!-- Address Item Start -->
        <div
          class="col-md-6 addressItem"
          v-for="(address, index) in addresses"
          :key="index"
        >

        <!-- {{ address }} -->
          <div class="customCheckbox">
            <div class="dropdown defaultDropdown">
              <button
                class="dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ lang.Actions }}
              </button>
              <ul class="dropdown-menu custom_dropdown">
                <li>
                  <a
                    class="dropdown-item"
                    href="javascript:void(0)"
                    @click="$refs.address_form.edit(address)"
                    >{{ lang.edit }}</a
                  >
                </li>

                <li>
                  <a
                    class="dropdown-item"
                    href="javascript:void(0)"
                    v-if="!address.default_shipping"
                    @click="makeDefault(address.id, 'shipping')"
                    >{{ lang.make_default_shipping }}</a
                  >
                </li>

                <li>
                  <a
                    class="dropdown-item"
                    href="javascript:void(0)"
                    v-if="!address.default_billing"
                    @click="makeDefault(address.id, 'billing')"
                    >{{ lang.make_default_billing }}</a
                  >
                </li>

                <li>
                  <a
                    class="dropdown-item"
                    href="javascript:void(0)"
                    v-if="!address.default_shipping && !address.default_billing"
                    @click="$refs.address_form.deleteAddress(address.id)"
                    >{{ lang.delete }}</a
                  >
                </li>
              </ul>
            </div>

            <ul class="addressList">
              <li>{{ lang.name }}: {{ address.name ?? 'Unknown' }}</li>
              <li>{{ lang.email }}: {{ address.email ?? 'Unknown' }}</li>
              <li>{{ lang.phone }}: {{ address.phone_no ?? 'Unknown' }}</li>
              <li>{{ lang.country }}: {{ address.country ?? 'Unknown' }}</li>
              <li>{{ lang.State }}: {{ address.state ?? 'Unknown' }}</li>
              <li>{{ lang.city }}: {{ address.city ?? 'Unknown' }}</li>
              <li>{{ lang.address }}: {{ address.address ?? 'Unknown' }}</li>
            </ul>
          </div>

          <div class="d-flex mt-5">
              <div class="default-batch"
                   v-if="address.default_shipping && address.default_billing">
                {{ lang.default_shipping_billing }}
              </div>
              <div class="default-batch" v-else-if="address.default_shipping">
                {{ lang.default_shipping }}
              </div>
              <div class="default-batch" v-else-if="address.default_billing">
                {{ lang.default_billing }}
              </div>
            </div>
        </div>
      </div>

      <div class="addressWrapper" v-else-if="shimmer">
        <div
          class="col-lg-6 mb-3"
          v-for="(address, index) in 4"
          :key="'address' + index"
        >
          <shimmer :height="200"></shimmer>
        </div>
      </div>
    </div>
    <!-- Shipping Details -->
  </div>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";
import AddressForm from "@/components/AddressForm.vue";
export default {
  components: { Shimmer, AddressForm },

  data() {
    return {
      current: "addresses",
      default_shipping: this.$store.getters.getUser.billing_address,
      default_billing: this.$store.getters.getUser.shipping_address,
      is_edit: false,
    };
  },
  mounted() {
    if (this.lengthCounter(this.addresses) == 0) {
      this.getAddress();
    }
  },

  computed: {
    addresses() {
      return this.$store.getters.getUserAddresses;
    },
    shimmer() {
      return this.$store.state.module.shimmer;
    },
    flags() {
      return this.$store.getters.getFlags;
    },
  },
  methods: {
    getAddress() {
      let url = this.getUrl("user/address");
      this.$progress.start();
      axios
        .get(url)
        .then((response) => {
          if (response.data.error) {
            
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            this.$store.commit("getUserAddresses", response.data.addresses);
            this.$store.commit("setShimmer", false);
            if (this.addresses.length == 0) {
              this.address_area = true;
            }
            this.$progress.finish();
          }
        })
        .catch((error) => {
          
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
    },

    makeDefault(id, type) {
      let url = this.getUrl("default/user-address/" + type + "/" + id);
      axios.post(url).then((response) => {
        if (response.data.error) {
          this.$toast.error(response.data.error, this.lang.Error + " !!");
        } else {
          this.$toast.success(response.data.success, this.lang.Success + " !!");
          this.$store.dispatch("user", response.data.user);
          this.default_shipping = response.data.user.shipping_address;
          this.default_billing = response.data.user.billing_address;
          this.getAddress();
        }
      });
    },
  },
};
</script>

<style scoped>
.custom_dropdown {
  top: 0px !important;
  min-height: 0px !important;
  padding: 10px !important;
}

.custom_dropdown li a {
  /* line-height: 0px !important; */
  text-align: left !important;
}

.dropdown.defaultDropdown {
    margin-top: 10px;
    text-align: right;
}
</style>
