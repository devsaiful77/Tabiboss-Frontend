<template>
    <div class="quantity">
        <button type="button" class="decressQnt" @click="decreaseQuantity">
            <i class="ri-subtract-line"></i>
        </button>
        <input class="qnttinput" type="number" :value="quantity" disabled />
        <button type="button" class="incressQnt" @click="increaseQuantity">
            <i class="ri-add-line"></i>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            quantity: 1, // Start quantity at minimum (1)
        };
    },
    methods: {
        increaseQuantity() {
            if (this.quantity < 100) {
                this.quantity++;
            }
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
    },
};
</script>
