<template>
    <!-- Modal -->
    <div
        class="modal fade LogoutModal"
        id="logoutPopup"
        tabindex="-1"
        aria-labelledby="logoutPopupLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- <div class="modal-header">
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><i class="ri-close-large-fill"></i></button>
                </div> -->
                <div class="modal-body p-0">
                    <div class="logout-content text-center">
                        <div class="thumb">
                            <img
                                :src="static_image_url + 'logut-avatar.svg'"
                                alt="logout"
                            />
                        </div>
                        <h2 class="title">Are you sure you want to Logout?</h2>
                        <div class="btn-groups">
                            <a href="javascript:void(0)" @click="logout" class="btn btn-primary">{{ lang.logout }}</a>
                            <a
                                href="#"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                                >Cancel</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            static_image_url: this.getUrl("frontends/images/"),
        }
    }
}
</script>
