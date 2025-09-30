<template lang="">
    <div v-if="agreements.length > 0">
        <div class="flex-input">
            <div class="default-checkbox flex-start px-10">
                <input
                    type="checkbox"
                    class="form-check-input"
                    id="tnc"
                    value="2"
                    v-model="agreement"
                />
                <label class="form-check-label" for="tnc">
                    <div>

                        {{ lang.agreement }}

                        <span class="agreement" v-for="(agreement,index) in agreements" :key="index">
                            <a v-if="urlCheck(agreement.link)" :href="agreement.link">{{ agreement.title }}</a>
                            <router-link v-else :to="'page/'+agreement.link">{{ agreement.title }}</router-link>
                            <a href="javascript:void(0)" class="separator"
                               v-if="index+2 < agreements.length">,</a>
                            <a href="javascript:void(0)" class="separator"
                               v-else-if="index+1 < agreements.length">&</a>
                          </span>

                    </div>


                </label>
            </div>
            <!-- <a href="forget-password.html" class="forget">Forgot password?</a> -->
        </div>
    </div>
</template>
<script>
export default {
    props: ["agreements"],
    data() {
        return {
            agreement: "",
        };
    },
    methods: {
        checkAgreements() {
            return !(this.agreements.length > 0 && !this.agreement);
        },
    },
};
</script>
