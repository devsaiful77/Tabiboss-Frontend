<template>
    <!-- Meta Description Start -->
    <section class="metaDesc-section pt-30 pb-60">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="metaDesc-wrapper">
                        <div v-html="settings.article"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Meta Description End -->
</template>

<script>
export default {
    computed: {
        categories() {
            return this.$store.getters.getCategories;
        },
    },
};
</script>
