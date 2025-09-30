<template lang="html">
    <div class="rating" v-if="rating_type">
        <div class="d-flex">
            <i v-for="i in 5" :key="i" :class="getStarClass(i)" class="active"></i>
        </div>
    </div>

    <div class="rating" v-else>
        <i v-for="i in 5" :key="i" :class="getStarClass(i)" class="star"></i>
    </div>
</template>

<script setup>
const props = defineProps({
    rating: {
        type: Number,
        required: true,
    },

    rating_type: {
        type: String,
        required: false,
    },
});

const getStarClass = (index) => {
    if (props.rating >= index) {
        return "ri-star-fill";
    } else if (props.rating >= index - 0.5) {
        return "ri-star-half-line";
    } else {
        return "ri-star-line";
    }
};
</script>

<style scoped>
.star {
    font-size: 14px;
    color: gold;
    margin-right: 2px;
}
</style>
