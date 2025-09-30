<template lang="">
    <div class="footer-wrapper">
        <div class="footer-widget">
            <h4 class="widget-title">{{ lang.subscribe_to_our_news_letter }}</h4>
            <p class="desc">
                {{ lang.get_info_events_sales_and_Offers }}
            </p>
            <form @submit.prevent="submit" class="footer-search">
                <input
                    type="email"
                    class="form-control"
                    v-model="form.email" :placeholder="lang.email"
                />
                <button type="submit" class="btn btn-primary">{{ lang.subscribe }}</button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: "subscribe",
    computed: {
        baseUrl() {
            return this.$store.getters.getBaseUrl;
        },
    },
    data() {
        return {
            form: {
                email: "",
            },
        };
    },
    methods: {
        submit() {
            let url = this.getUrl("home/subscribers");
            axios
                .post(url, this.form)
                .then((response) => {
                    if (response.data.success) {
                        this.$toast.success(
                            response.data.success,
                            this.lang.Success + " !!"
                        );
                        this.form.email = "";
                    } else {
                        if (response.data.error) {
                            this.$toast.error(
                                response.data.error,
                                this.lang.Error + " !!"
                            );
                        }
                    }
                })
                .catch((error) => {
                    if (error.response.status == 422) {
                        let errors = Object.keys(error.response.data.errors);
                        for (let i = 0; i <= errors.length; i++) {
                            this.$toast.error(
                                error.response.data.errors[errors[i]][0],
                                this.lang.Error + " !!"
                            );
                        }
                    }
                });
        },
    },
};
</script>
