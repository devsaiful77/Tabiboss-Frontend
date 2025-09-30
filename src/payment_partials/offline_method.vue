<template lang="html">
  <div>
    <a
      href="javascript:void(0)"
      class="btn btn-primary w-100"
      data-bs-toggle="modal"
      data-bs-target="#offline"
      v-if="offline_method.name"
      >{{ lang.pay_now }}</a
    >


    <div
      class="modal fade LogoutModal"
      tabindex="-1"
      aria-labelledby="offline_modal"
      aria-hidden="true"
      id="offline"
    >
      <div
        class="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ lang.pay_with }} {{ offline_method.name }}
            </h5>
            <!-- <button
              type="button"
              class="close modal_close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button> -->
            <button
              type="button"
              class="close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="offline_payment_close"
            >
              <i class="ri-close-large-fill"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-12">
                <div class="form-group">
                  <label>{{ lang.upload_file }}</label>
                  <input
                    type="file"
                    id="upload"
                    @change="imageUpload($event)"
                    multiple
                    class="form-control"
                  />
                <p class="mt-2 text-secondary" v-if="fileName">{{ fileName }}</p>
                </div>
              </div>

              <div class="col-lg-12 mt-2" v-if="offline_method.instructions">
                <label>{{ lang.instructions }}</label>
                <div
                  class="instruction"
                  v-html="offline_method.instructions"
                ></div>
              </div>
              <div class="col-lg-12 text-center mt-3">
                <button
                  @click="submit"
                  class="btn btn-primary"
                  v-show="!loading"
                >
                  {{ lang.proceed }}
                </button>
                <loading_button
                  v-show="loading"
                  :class_name="'btn btn-primary'"
                ></loading_button>
              </div>
            </div>
          </div>
          <!-- /.modal-body -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "offline_method",
  props: ["trx_id", "code", "amount", "offline_method", "loading"],
  data(){
    return{
        fileName: '',
    }
  },
  methods: {
    submit() {
      this.$parent.payment();
    },
    imageUpload(event) {
      let file = event.target.files[0];
      this.$parent.offline_method_file = file;
      this.fileName = file?.name || '';
    },
  },
};
</script>

<style scoped>
.instruction {
  border: 1px solid #ddd;
  padding: 10px 15px;
  margin: 10px 0px;
}

.modal-header .close {
  background: transparent;
  border: none;
  outline: none;
  color: #ff3b30;
  font-size: 22px;
  z-index: 9;
  position: relative;
  width: 22px;
  height: 22px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
}
</style>
