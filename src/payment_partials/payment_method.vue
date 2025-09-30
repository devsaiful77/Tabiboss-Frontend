<template>
  
  <!-- <a 
    href="#" 
    class="paymentItem" 
    :class="{ active: isActive }" 
    @click.prevent="selectPayment">
    <img :src="image" :alt="value" class="img-fluid">
    

    <input type="radio" :value="value" @change="$parent.razorPayRemove"
     v-model="$parent.payment_form.payment_type"
     :id="value" name="radio">




  </a> -->


  <div class="paymentItem">
    <input type="radio" :value="value" @change="$parent.razorPayRemove"
           v-model="$parent.payment_form.payment_type"
           :id="value" name="radio">
    <label :for="value">
      <img :src="image" :alt="value"
           class="img-fluid">
      <!-- {{ label }} -->
    </label>
  </div>
</template>

<script>
export default {
  name: "PaymentMethodComponent",
  props: [
    'value',
    'label',
    'image',
  ],
  data() {
    return {};
  },
  computed: {
    isActive() {
      // Replace this with your logic for active state if needed
      return false;
    }
  },
  methods: {
    selectPayment() {
      this.$emit('update:paymentType', this.value);
    },
  },
};
</script>

<style scoped>
/* .payment-wrapper {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
.paymentItem {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.paymentItem.active {
  border-color: #3490dc;
  background-color: #f0f9ff;
}
.paymentItem img {
  width: 40px;
  margin-bottom: 5px;
}
.paymentItem span {
  display: block;
  text-align: center;
  font-weight: 500;
  color: #333;
} */
</style>
