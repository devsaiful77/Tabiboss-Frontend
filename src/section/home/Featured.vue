<template>
    <!-- Core Feature Start -->
    <section
        class="core-feature pt-40 pb-30"
        v-if="lengthCounter(services) > 0"
    >
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="featureWrapper">
                        <div
                            class="featureItem"
                            v-for="(service, index) in services"
                            :key="index"
                        >

                                <!-- {{service}} -->

                            <div class="icon">


                                <img
                                    :src="service.service_image"
                                    :alt="service.title"
                                    class="img-fluid"
                                />
                            </div>

                            <div class="content">
                                <h5 class="title">{{ service.title }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Core Feature End -->
</template>

<script>
export default {
    computed: {
        services() {
            return this.$store.getters.getServices;
        },
    },
};
</script>
