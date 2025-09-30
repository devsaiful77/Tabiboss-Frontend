<template lang="html">
    <div>
        <button
            @click="payWithRazorpay"
            type="button"
            class="btn btn-primary w-100"
            :disabled="is_disable"
        >
            {{ lang.pay_now }}</button
        >
    </div>
</template>

<script>
export default {
    props: ['trx_id', 'code'],

    data(){
        return {
            is_disable: false,
        }
    },


    methods: {
        async payWithRazorpay() {
            if(this.is_disable == true){
                return;
            }


            this.is_disable = true;
            try {
                const { data } = await axios.get(
                    this.getUrl("razorpay/redirect"),
                    {
                        params: {
                            trx_id: this.trx_id,
                            code: this.code,
                        },
                    }
                );

                if (data.error) {
                    this.$toast.error(data.error);
                    this.is_disable = false;
                    return;
                }

                const options = {
                    key: data.razorpay_key,
                    amount: data.amount,
                    currency: data.currency,
                    name: data.name,
                    description: data.description,
                    order_id: data.order_id,
                    handler: (response) => {
                        axios
                            .post(
                                this.getUrl("razorpay/payment-verify"),
                                response
                            )
                            .then(() => {
                                if (this.code) {
                                  this.$router.push({name: 'get.invoice', params: {orderCode: this.code}});
                                } else {
                                  this.$router.push({name: 'invoice.list', params: {trx_id: this.trx_id}});
                                }
                            })
                            .catch(() => {
                                this.$toast.error(
                                    "Payment verification failed!"
                                );
                                this.is_disable = false;
                            });
                    },
                    theme: { color: "#3399cc" },
                };

                const rzp = new Razorpay(options);
                rzp.open();
                this.is_disable = false;
            } catch (error) {
                this.$toast.error("Failed to initiate Razorpay!");
                this.is_disable = false;
            }
        },
    },
};
</script>

