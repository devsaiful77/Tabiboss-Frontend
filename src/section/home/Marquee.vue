<template>
    <section
        class="marquee-section bg-primary overflow-hidden"
        v-if="marquessList.length > 0"
    >
        <div class="marquee-wrapper">
            <div
                class="marquee-item"
                v-for="(item, index) in marquessList"
                :key="index"
            >
                <a :href="item.link" class="title">
                    {{ item.title }}
                </a>
            </div>
        </div>
    </section>

    <section class="products-section py-30" v-else-if="show_shimmer">
        <Shimmer :height="50" />
    </section>
</template>

<script>
import Shimmer from "@/components/Shimmer.vue";

export default {
    components: { Shimmer },
    props: ["marquee_section"],

    data() {
        return {
            show_shimmer: true,
        };
    },

    computed: {
        marquessList() {
            if (this.marquee_section && this.marquee_section.length > 0) {
                return this.marquee_section;
            } else {
                return [];
            }
        },
    },

    methods: {
        checkHomeComponent(component_name) {
            let component = this.homeResponse.find(
                (data) => data == component_name
            );

            if (component) {
                return (this.show_shimmer = false);
            }
        },
    },

    watch: {
        homeResponse() {
            this.checkHomeComponent("marquee_section");
        },
    },

    mounted() {
        this.checkHomeComponent("marquee_section");
    },
};
</script>
