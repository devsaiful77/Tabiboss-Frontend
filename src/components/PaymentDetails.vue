<template lang="html">
  <ul class="cart-subtotal">
    <li>
      <span class="label">{{ lang.subtotal }}</span>
      <span class="value">{{ priceFormat(sub_total) }}</span>
    </li>

    <li
      v-if="
        settings.tax_type == 'before_tax' ||
        settings.vat_and_tax_type == 'product_base'
      "
    >
      <span class="label">{{ lang.tax }}</span>
      <span class="value">{{ priceFormat(tax) }}</span>
    </li>

    <li>
      <span class="label">{{ lang.discount }}</span>
      <span class="value">{{ priceFormat(discount_offer) }}</span>
    </li>

    <li v-if="settings.shipping_cost != 'area_base' || $route.name != 'cart'">
      <span class="label">{{ lang.shipping_cost }}</span>
      <span class="value">{{ priceFormat(shipping_tax) }}</span>
    </li>

    <li v-if="settings.coupon_system == 1">
      <span class="label">{{ lang.coupon_discount }}</span>
      <span class="value">{{ priceFormat(coupon_discount) }}</span>
    </li>

    <template
      v-if="
        settings.tax_type == 'after_tax' &&
        settings.vat_and_tax_type == 'order_base'
      "
    >
      <li class="cart-total">
        <span class="label">{{ lang.total }}</span>
        <div class="total">{{ priceFormat(total - tax) }}</div>
      </li>

      <li class="cart-total">
        <span class="label">{{ lang.tax }}</span>
        <div class="total">{{ priceFormat(tax) }}</div>
      </li>

      <li class="cart-total">
        <span class="label">{{ lang.grand_total }}</span>
        <div class="total">{{ priceFormat(total) }}</div>
      </li>
    </template>

    <template v-else>
      <li class="cart-total">
        <span class="label">{{ lang.total }}</span>
        <div class="total">{{ priceFormat(total) }}</div>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: [
    "sub_total",
    "tax",
    "discount_offer",
    "shipping_tax",
    "coupon_discount",
    "total",
  ],
};
</script>
