<template>
    <!-- Modal -->
    <div
        class="modal fade customModal RechargeWalletModal"
        id="RechargeWalletPopup"
        tabindex="-1"
        aria-labelledby="RechargeWalletPopupLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="title">Enter the Amount to Top Up</div>
                    <button
                        type="button"
                        class="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    >
                        <i class="ri-close-large-fill"></i>
                    </button>
                </div>
                <div class="modal-body p-0">
                    <div class="wallet-wrapper text-center">
                        <div class="amount-wrapper">
                            <!-- Display the selected amount in the input field -->
                            <input
                                type="text"
                                name="text"
                                class="form-control"
                                placeholder="You Have No Rewards"
                                :value="
                                    selectedAmount ? '$' + selectedAmount : ''
                                "
                                readonly
                            />

                            <ul class="amount-select">
                                <!-- Loop through the amount data -->
                                <li
                                    v-for="(amount, index) in AmountData[0]
                                        .amount"
                                    :key="index"
                                >
                                    <label
                                        :class="{
                                            selected: selectedAmount === amount,
                                        }"
                                    >
                                        <input
                                            type="radio"
                                            :name="'amountRadio'"
                                            class="d-none"
                                            :id="'amount_' + index"
                                            v-model="selectedAmount"
                                            :value="amount"
                                        />
                                        ${{ amount }}
                                    </label>
                                </li>
                            </ul>

                            <ul class="payment-select">
                                <!-- Loop through the payment data -->
                                <li
                                    v-for="(payment, index) in PaymentData[0]
                                        .payment"
                                    :key="index"
                                >
                                    <label
                                        :class="{
                                            selected:
                                                selectedPayment === payment,
                                        }"
                                    >
                                        <input
                                            type="radio"
                                            :name="'paymentRadio'"
                                            class="d-none"
                                            :id="'payment_' + index"
                                            v-model="selectedPayment"
                                            :value="payment"
                                        />
                                        <img
                                            :src="static_image_url + payment"
                                            alt="icon"
                                        />
                                    </label>
                                </li>

                                <li class="w-100">
                                    <label
                                        :class="{
                                            selected:
                                                selectedPayment === 'offline',
                                        }"
                                    >
                                        <input
                                            type="radio"
                                            name="paymentRadio"
                                            class="d-none"
                                            id="payment_offline"
                                            v-model="selectedPayment"
                                            value="offline"
                                        />
                                        <div class="btn btn-gray w-100">
                                            Offline - Bank Deposit
                                        </div>
                                    </label>
                                </li>
                            </ul>
                        </div>

                        <div class="convertBtn">
                            <button type="button" class="btn btn-primary w-100">
                                Pay now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RechargeWalletPopup",
    props: {
        payment: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            static_image_url: this.getUrl("frontends/images/"),
            AmountData: [
                {
                    amount: [
                        10, 20, 50, 60, 100, 200, 500, 600, 1000, 2000, 5000,
                        6000,
                    ],
                },
            ],
            PaymentData: [
                {
                    payment: [
                        "payment-icon/payment-icon-01.svg",
                        "payment-icon/payment-icon-02.svg",
                        "payment-icon/payment-icon-03.svg",
                        "payment-icon/payment-icon-04.svg",
                        "payment-icon/payment-icon-05.svg",
                        "payment-icon/payment-icon-06.svg",
                        "payment-icon/payment-icon-07.svg",
                        "payment-icon/payment-icon-08.svg",
                        "payment-icon/payment-icon-09.svg",
                        "payment-icon/payment-icon-10.svg",
                    ],
                },
            ],
            selectedAmount: 50,
            selectedPayment: null,
        };
    },
};
</script>
