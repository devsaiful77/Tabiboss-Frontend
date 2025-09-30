<template>
    <div class="skeleton w-100" v-bind:style="[height ? style : null]">
       
    </div>
</template>

<script>
export default {
    props: ["height"],
    data() {
        return {
            style: {
                height: this.height + "px",
            },
        };
    },
};
</script>
