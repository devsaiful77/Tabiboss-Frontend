<template>
    <Header />
    <router-view></router-view>
    <Footer />

    <ChatBot v-if="addons.includes('chat_system')" />

    <LogoutPopup />
    <ProductPopup />
    <RewardWalletPopup />
    <!-- <RechargeWalletPopup :payment="payment" :index="index" /> -->
    <BackTop />
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ChatBot from "@/components/ChatBot.vue";
import LogoutPopup from "@/components/LogoutPopup.vue";
import ProductPopup from "@/components/ProductPopup.vue";
import RewardWalletPopup from "@/components/RewardWalletPopup.vue";
// import RechargeWalletPopup from "@/components/RechargeWalletPopup.vue";
import BackTop from "@/components/BackTop.vue";

export default {
    data() {
        return {
            index: 0,
            payment: {
                method: "card",
                amount: 100,
            },
        };
    },

    components: {
        Header,
        Footer,
        ChatBot,
        LogoutPopup,
        ProductPopup,
        RewardWalletPopup,
        // RechargeWalletPopup,
        BackTop,
    },
};
</script>
