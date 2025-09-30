<template lang="html">
  <div
    class="cart-header border d-flex align-items-center justify-content-between"
  >
    <h4 class="store-title">{{ lang.addresses }}</h4>
    <h2 class="accordion-header">
      <button
        class="accordion-button bg-transparent"
        :class="{ collapsed: !address_area }"
        type="button"
        data-bs-toggle="collapse"
        @click="address_area = !address_area"
        data-bs-target="#shipping_accordion"
        aria-expanded="false"
        aria-controls="collapse1"
      >
        {{ address_area_title }}
      </button>
    </h2>
  </div>
  <div class="addressWrapper">
    <div class="col-12">
      <div class="accordion" id="shipping-accordion">
        <div
          id="shipping_accordion"
          class="accordion-collapse collapse"
          :class="{ show: address_area }"
          aria-labelledby="address1"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <form class="addressForm" @submit.prevent="saveAddress()">
              <div class="grid-2">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    :class="{ error_border: errors.name }"
                    :placeholder="lang.name"
                    v-model="form.name"
                  />
                  <div>
                    <span class="validation_error" v-if="errors.name">{{
                      errors.name[0]
                    }}</span>
                  </div>
                </div>

                <div class="input-group">
                  <input
                    type="email"
                    class="form-control"
                    :placeholder="lang.email"
                    :class="{ error_border: errors.email }"
                    v-model="form.email"
                  />
                  <div>
                    <span class="validation_error" v-if="errors.email">{{
                      errors.email[0]
                    }}</span>
                  </div>
                </div>

                <div class="input-group">
                  <Telephone
                    @phone_no="getNumber"
                    :phone_error="errors.phone_no ? errors.phone_no[0] : null"
                  />
                  <div>
                    <span class="validation_error" v-if="errors.phone_no">{{
                      errors.phone_no[0]
                    }}</span>
                  </div>
                </div>



                <div class="input-group">
                    <VueSelect
                        v-model="form.country_id"
                        :options="countries"
                        :reduce="(option) => option.value"
                        label="label"
                        @update:modelValue="getStates"
                        placeholder="Select Your Country"
                    />

                    <div>
                        <span
                            class="validation_error"
                            v-if="errors.country_id"
                            >{{ errors.country_id[0] }}</span
                        >
                    </div>
                </div>

                <div class="input-group">
                    <VueSelect
                        v-model="form.state_id"
                        :options="states"
                        :reduce="(option) => option.value"
                        label="label"
                        @update:modelValue="getCities"
                        placeholder="Select Your State"
                    />

                    <div>
                        <span class="validation_error" v-if="errors.state_id">{{
                            errors.state_id[0]
                        }}</span>
                    </div>
                </div>

                <div class="input-group">
                    <VueSelect
                        v-model="form.city_id"
                        :options="cities"
                        :reduce="(option) => option.value"
                        label="label"
                        placeholder="Select Your City"
                    />
                    <div>
                        <span class="validation_error" v-if="errors.city_id">{{
                            errors.city_id[0]
                        }}</span>
                    </div>
                </div>

                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    :class="{ error_border: errors.postal_code }"
                    :placeholder="lang.postal_code"
                    v-model="form.postal_code"
                  />
                  <div>
                    <span class="validation_error" v-if="errors.postal_code">{{
                      errors.postal_code[0]
                    }}</span>
                  </div>
                </div>

                <div class="input-group">
                  <textarea
                    v-model="form.address"
                    class="form-control"
                    :class="{ error_border: errors.address }"
                    :placeholder="lang.street_address"
                  ></textarea>
                  <div>
                    <span class="validation_error" v-if="errors.address">{{
                      errors.address[0]
                    }}</span>
                  </div>
                </div>
              </div>

              <loading_button
                v-if="loading"
                :class_name="'btn btn-primary'"
              ></loading_button>
              <button type="submit" v-else class="btn btn-primary">
                {{ address_submit_button }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Telephone from "@/components/Telephone.vue";
import VueSelect from "vue3-select-component";


export default {
  components: { Telephone, VueSelect },

  data() {
    return {
      address_area: false,
      address_area_title: "",
      form: {
        name: "",
        email: "",
        phone_no: "",
        address: "",
        country_id: "",
        state_id: "",
        city_id: "",
        postal_code: "",
        id: "",
      },
      states: [],
      cities: [],
      address_submit_button: "",
      loading: false,
    };
  },
  mounted() {
    this.address_area_title = this.lang.address_area_title;
    this.address_submit_button = this.lang.address_submit_button;
  },
  watch: {
    lang() {
      this.address_area_title = this.lang.address_area_title;
      this.address_submit_button = this.lang.address_submit_button;
    },
  },
  computed: {
    countries() {
        return this.$store.getters.getCountryList.map((country) => {
            return {
                label: country.name,
                value: country.id,
            };
        });
    },
  },
  methods: {
    saveAddress() {
      this.loading = true;
      let url = this.getUrl("store/user-address");

      axios
        .post(url, this.form)
        .then((response) => {
          this.loading = false;
          if (response.data.error) {
            this.$toast.error(response.data.error, this.lang.Error + " !!");
          } else {
            this.$toast.success(
              response.data.success,
              this.lang.Success + " !!"
            );
            this.errors = [];
            this.$parent.getAddress();
            this.address_area = false;
            this.form.id = "";
            this.form.name = "";
            this.form.email = "";
            this.form.phone_no = "";
            this.form.address = "";
            this.form.country_id = "";
            this.form.state_id = "";
            this.form.city_id = "";
            this.form.postal_code = "";
            this.address_area_title = this.lang.address_area_title;
            this.address_submit_button = this.lang.address_submit_button;
            this.$store.commit("setMobileNo", "");
          }
        })
        .catch((error) => {
          this.loading = false;
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
    getNumber(number) {
      this.form.phone_no = number;
    },


    getStates(address) {
        let country_id = this.form.country_id;

        let url = this.getUrl("state/by-country/" + country_id);
        axios.get(url).then((response) => {
            if (response.data.error) {
                this.$toast.error(
                    response.data.error,
                    this.lang.Error + " !!"
                );
            } else {
                this.states = response.data.states.map((state) => {
                    return{
                        label: state.name,
                        value: state.id,
                    }
                });
                if (address && address.address_ids) {
                    this.form.state_id = parseInt(
                        address.address_ids.state_id
                    );
                    this.getCities(address);
                }
            }
        });
    },
    getCities(address) {
        let state_id = this.form.state_id;

        let url = this.getUrl("city/by-state/" + state_id);
        axios.get(url).then((response) => {
            if (response.data.error) {
                this.$toast.error(
                    response.data.error,
                    this.lang.Error + " !!"
                );
            } else {
                this.cities = response.data.cities.map((city) => {
                    return{
                        label : city.name,
                        value : city.id,
                    }
                });
                if (address && address.address_ids) {
                    this.form.city_id = parseInt(
                        address.address_ids.city_id
                    );
                }
            }
        });
    },



    // getStates(address) {
    //   let country_id = this.form.country_id;

    //   let url = this.getUrl("state/by-country/" + country_id);
    //   axios.get(url).then((response) => {
    //     if (response.data.error) {
    //       this.$toast.error(response.data.error, this.lang.Error + " !!");
    //     } else {
    //       this.states = response.data.states;
    //       if (address && address.address_ids) {
    //         this.form.state_id = parseInt(address.address_ids.state_id);
    //         this.getCities(address);
    //       }
    //     }
    //   });
    // },
    // getCities(address) {
    //   let state_id = this.form.state_id;

    //   let url = this.getUrl("city/by-state/" + state_id);
    //   axios.get(url).then((response) => {
    //     if (response.data.error) {
    //       this.$toast.error(response.data.error, this.lang.Error + " !!");
    //     } else {
    //       this.cities = response.data.cities;
    //       if (address && address.address_ids) {
    //         this.form.city_id = parseInt(address.address_ids.city_id);
    //       }
    //     }
    //   });
    // },


    edit(address) {
      this.errors = [];
      this.address_area = true;
      this.address_area_title = this.lang.update_address;
      this.address_submit_button = this.lang.update;

      this.form.name = address.name;
      this.form.email = address.email;
      this.form.phone_no = address.phone_no;
      this.form.address = address.address;
      this.form.country_id = parseInt(
        address.address_ids ? address.address_ids.country_id : ""
      );
      this.form.postal_code = address.postal_code;
      this.form.id = address.id;
      this.getStates(address);
      this.$store.commit("setMobileNo", this.form.phone_no);

      const el = this.$refs.update;

      if (el) {
        // Use el.scrollIntoView() to instantly scroll to the element
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    deleteAddress(id) {
      let url = this.getUrl("delete/user-address/" + id);
      axios.get(url).then((response) => {
        if (response.data.error) {
          this.$toast.error(response.data.error, this.lang.Error + " !!");
        } else {
          this.$toast.success(response.data.success, this.lang.Success + " !!");
          this.$parent.getAddress();
        }
      });
    },
  },
};
</script>
