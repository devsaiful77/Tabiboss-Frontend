<template lang="html">
    <ul class="rating">
        <li v-for="i in 5" :key="i"><i :class="getStarClass(i)"></i></li>
    </ul>
</template>
<script setup>
const props = defineProps({
    rating: {
        type: Number,
        required: true,
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
