<template lang="html">
    <div class="chatBox-main" id="chatBox-main-control">
        <div class="chat-container" v-if="isChatBoxVisible">
            <!-- Chat Header Start -->
            <div class="chat-header">
                <div class="logo">
                    <img
                        :src="settings.dark_logo"
                        alt="logo"
                    />
                </div>
                <form
                    action="#"
                    class="ms-auto"
                    v-if="
                        messages.length > 0 &&
                        authUser &&
                        authUser.user_type == 'customer'
                    "
                >
                    <div class="header-search input-group">
                        <input
                            type="text"
                            class="form-control"
                            name="search_user"
                            id="search_user"
                            v-model="search"
                            @keyup="searchUser"
                            :placeholder="lang.search_user"
                        />
                        <button type="button" @click="searchUser">
                            <i class="ri-search-2-line"></i>
                        </button>
                    </div>
                </form>
                <div
                    class="chat-header-info"
                    v-if="authUser && authUser.user_type == 'customer'"
                >
                    <a href="javascript:void(0)" class="userProfile">
                        <div class="thumb">
                            <!-- <img :src="static_image_url + 'avatar-01.png'" alt="" /> -->
                            <img
                                :src="authUser.user_profile_image"
                                alt="User"
                            />
                        </div>
                        <div class="user-info">
                            <h6 class="user-name">{{ authUser.full_name }}</h6>
                            <span class="designation">{{
                                authUser.user_type
                            }}</span>
                        </div>
                    </a>
                </div>
            </div>
            <!-- Chat Header End -->
            <div class="chat-wrapper">
                <!-- Chat Sidebar Start -->
                <div
                    class="chat-sidebar"
                    v-if="authUser && authUser.user_type == 'customer'"
                >
                    <template
                        v-for="(seller, index) in sellers.data"
                        :key="index"
                        v-observe-visibility="
                            index === sellers.data.length - 1
                                ? loadSellers
                                : false
                        "
                    >
                        <a
                            class="chat-user border-bottom"
                            href="javascript:void(0)"
                            @click="fetchMessages(seller, 1)"
                            :class="{
                                active: selected_user.user_id == seller.user_id,
                            }"
                        >
                            <div class="chat-user-list">
                                <div class="chat-user-thumb">
                                    <img
                                        :src="seller.logo"
                                        :alt="seller.user_name"
                                    />
                                    <div class="dot"></div>
                                </div>
                                <div class="content">
                                    <div class="name">
                                        {{ seller.shop_name }}
                                    </div>
                                    <div
                                        class="message"
                                        v-if="seller.has_message"
                                    >
                                        {{ seller.message.message }}
                                    </div>
                                </div>
                            </div>
                            <!-- <span
                class="status active"
                :class="{ active: seller.status === 'Active' }"
              >
                <div class="dot"></div>
                Active Now
              </span> -->
                        </a>
                    </template>
                </div>

                <!-- Chat Sidebar End -->
                <div class="chat-inner">
                    <div class="chat-window">
                        <!-- Chat Start List -->
                        <div class="chat-scroll">
                            <div
                                class="chatList"
                                v-if="
                                    messages.length > 0 &&
                                    authUser &&
                                    authUser.user_type == 'customer'
                                "
                            >
                                <div
                                    v-for="(message, index) in messages"
                                    :key="index"
                                    class="message"
                                    id="chatbox"
                                >
                                    <p style="text-align: center">
                                        {{ dateConvert(message.created_at) }}
                                    </p>
                                    <!-- Self Message -->
                                    <div
                                        v-if="message.type == 1"
                                        class="message-reply self"
                                    >
                                        <!-- <div class="message-reply-avatar">
                        <img :src="static_image_url + 'avatar-01.png'" alt="Your Avatar">
                    </div> -->
                                        <div class="message-reply-group">
                                            <!-- <div class="reply-text">
                            {{ message.text }}
                        </div> -->

                                            <div
                                                v-if="message.is_file"
                                                class="reply-text"
                                            >
                                                <a
                                                    v-if="message.is_image"
                                                    :href="message.file_url"
                                                    :title="message.message"
                                                    download
                                                >
                                                    <img
                                                        v-if="
                                                            message.file_exist
                                                        "
                                                        :src="message.file_url"
                                                        :alt="message.message"
                                                    />
                                                    <img
                                                        v-else
                                                        :src="
                                                            getUrl(
                                                                'public/images/default/no_image.jpg'
                                                            )
                                                        "
                                                        :alt="message.message"
                                                    />
                                                </a>
                                                <div
                                                    v-else-if="message.is_video"
                                                >
                                                    <!-- <vue-plyr v-if="message.file_exist">
                              <video>
                                <source
                                  :src="message.file_url"
                                  :type="message.file_type"
                                />
                              </video>
                            </vue-plyr>
                            <img
                              v-else
                              :src="getUrl('images/default/default-video-72x72.png')"
                              alt="image"
                            /> -->
                                                    <img
                                                        :src="
                                                            getUrl(
                                                                'images/default/default-video-72x72.png'
                                                            )
                                                        "
                                                        alt="image"
                                                    />
                                                </div>
                                                <a
                                                    v-else
                                                    :href="message.file_url"
                                                    :title="message.message"
                                                    download
                                                >
                                                    <h4
                                                        class="file-preview-title name_clip"
                                                    >
                                                        {{ message.message }}
                                                    </h4>
                                                    <span class="file-size">{{
                                                        message.file_size
                                                    }}</span>
                                                    <div
                                                        class="file-proview-icon"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M16 0h-14v24h20v-18l-6-6zm0 3l3 3h-3v-3zm-12 19v-20h10v6h6v14h-16z"
                                                            />
                                                        </svg>
                                                        <span>{{
                                                            lang.File
                                                        }}</span>
                                                    </div>
                                                </a>
                                            </div>

                                            <div v-else class="reply-text">
                                                <a
                                                    v-if="
                                                        urlCheck(
                                                            message.message
                                                        )
                                                    "
                                                    :href="message.message"
                                                    target="_blank"
                                                    >{{ message.message }}</a
                                                >

                                                <template v-else>{{
                                                    message.message
                                                }}</template>
                                            </div>

                                            <span
                                                class="warning_mgs"
                                                v-if="
                                                    message.is_file &&
                                                    !message.file_exist
                                                "
                                                >{{
                                                    lang.file_not_exist
                                                }}.</span
                                            >
                                        </div>
                                    </div>

                                    <!-- Seller Message -->
                                    <div
                                        class="message-reply seller"
                                        v-if="message.type == 2"
                                    >
                                        <div class="message-reply-group">
                                            <div
                                                v-if="message.is_file"
                                                class="reply-text"
                                            >
                                                <a
                                                    v-if="message.is_image"
                                                    :href="message.file_url"
                                                    :title="message.message"
                                                    download
                                                >
                                                    <img
                                                        v-if="
                                                            message.file_exist
                                                        "
                                                        :src="message.file_url"
                                                        :alt="message.message"
                                                    />
                                                    <img
                                                        v-else
                                                        :src="
                                                            getUrl(
                                                                'public/images/default/no_image.jpg'
                                                            )
                                                        "
                                                        :alt="message.message"
                                                    />
                                                </a>
                                                <div
                                                    v-else-if="message.is_video"
                                                >
                                                    <!-- <vue-plyr v-if="message.file_exist">
                              <video>
                                <source
                                  :src="message.file_url"
                                  :type="message.file_type"
                                />
                              </video>
                            </vue-plyr>
                            <img
                              v-else
                              :src="getUrl('images/default/default-video-72x72.png')"
                              alt="image"
                            /> -->
                                                    <img
                                                        :src="
                                                            getUrl(
                                                                'images/default/default-video-72x72.png'
                                                            )
                                                        "
                                                        alt="image"
                                                    />
                                                </div>
                                                <a
                                                    v-else
                                                    :href="message.file_url"
                                                    :title="message.message"
                                                    download
                                                >
                                                    <h4
                                                        class="file-preview-title name_clip"
                                                    >
                                                        {{ message.message }}
                                                    </h4>
                                                    <span class="file-size">{{
                                                        message.file_size
                                                    }}</span>
                                                    <div
                                                        class="file-proview-icon"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M16 0h-14v24h20v-18l-6-6zm0 3l3 3h-3v-3zm-12 19v-20h10v6h6v14h-16z"
                                                            />
                                                        </svg>
                                                        <span>{{
                                                            lang.File
                                                        }}</span>
                                                    </div>
                                                </a>
                                            </div>

                                            <div v-else class="reply-text">
                                                <a
                                                    v-if="
                                                        urlCheck(
                                                            message.message
                                                        )
                                                    "
                                                    :href="message.message"
                                                    target="_blank"
                                                    >{{ message.message }}</a
                                                >
                                                <template v-else>{{
                                                    message.message
                                                }}</template>
                                            </div>

                                            <span
                                                class="warning_mgs"
                                                v-if="
                                                    message.is_file &&
                                                    !message.file_exist
                                                "
                                                >{{
                                                    lang.file_not_exist
                                                }}.</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="chatList"
                                v-if="
                                    messages.length == 0 &&
                                    authUser &&
                                    authUser.user_type == 'customer'
                                "
                            >
                                <h6 class="text-danger text-center mt-5 pt-5">
                                    {{ lang.no_data_found }}
                                </h6>
                            </div>

                            <div
                                class="chatList"
                                v-if="authUser && authUser.user_type == 'admin'"
                            >
                                <h6 class="text-danger text-center mt-5 pt-5">
                                    {{ lang.login_as_customer }}
                                </h6>
                            </div>

                            <div
                                class="chatList"
                                v-if="
                                    authUser && authUser.user_type == 'seller'
                                "
                            >
                                <h6 class="text-danger text-center mt-5 pt-5">
                                    {{ lang.use_seller_panel }}
                                </h6>
                            </div>

                            <!-- without login -->
                            <div class="chatList" v-if="!authUser">
                                <div class="h-100">
                                    <div class="message-content-login">
                                        <svg
                                            width="34"
                                            height="26"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                        >
                                            <path
                                                d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z"
                                                fill="#999"
                                            ></path>
                                        </svg>
                                        <p>{{ lang.start_conversation_msg }}</p>
                                        <ul class="login-register-box">
                                            <li>
                                                <a href="javascript:void(0)" @click="goToSignInPage('login')"
                                                    >{{
                                                        lang.sign_in
                                                    }}</a
                                                >
                                            </li>

                                            <li> / </li>

                                            <li>
                                                <a href="javascript:void(0)" @click="goToSignInPage('register')"
                                                    >{{
                                                        lang.register
                                                    }}</a
                                                >
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- message send.... -->
                        <div
                            class="chat-send-area"
                            v-if="authUser && authUser.user_type == 'customer'"
                        >
                            <!-- Send Message Input -->

                            <!-- message send -->

                            <form @submit.prevent="handleMsgSend">
                                <div class="message-input">
                                    <div class="input-groups">
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="form.msg"
                                            :placeholder="lang.type_message"
                                        />
                                    </div>
                                    <div class="chat-input">
                                        <ul class="input-list">
                                            <li class="list-item">
                                                <label for="file">
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        class="d-none"
                                                        multiple
                                                        @change="
                                                            previewFile($event)
                                                        "
                                                    />
                                                    <button type="button">
                                                        <img
                                                            :src="
                                                                static_image_url +
                                                                'chat-input/comment.svg'
                                                            "
                                                            alt="pen"
                                                        />
                                                    </button>
                                                </label>
                                            </li>
                                        </ul>
                                        <div class="send-button">
                                            <button type="submit">
                                                <img
                                                    :src="
                                                        static_image_url +
                                                        'chat-input/send-plane.svg'
                                                    "
                                                    alt="pen"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a
            href="javascript:void(0)"
            class="chatBox-bubble"
            @click="divToggler()"
        >
            <img
                :src="static_image_url + 'chat-input/comment-box.svg'"
                alt="comment"
            />
            {{ lang.Message }}
        </a>
    </div>
</template>

<script>

export default {
    data() {
        return {
            isChatBoxVisible: false,
            static_image_url: this.getUrl("frontends/images/"),

            sellers: [
                {
                    name: "XYZ Shop",
                    status: "Active",
                    lastMessage: "Your order is on process",
                },
                {
                    name: "Apple Gadget",
                    status: "Offline",
                    lastMessage: "How can I assist?",
                },
            ],

            currentChat: {
                seller: "XYZ Shop",
                messages: [
                    { sender: "You", text: "Where is my order?" },
                    { sender: "XYZ Shop", text: "Your order is on process." },
                ],
            },

            newMessage: "",

            // required
            page: 1,
            last_page: 1,
            msg_page: 1,
            msg_last_page: 1,
            lastScrollTop: 0,
            refresh_no: 1,
            sellers: {
                data: [],
            },
            selected_user: "",
            messages: [],
            files: [],
            form: {
                msg: "",
                chat_room_id: "",
            },
            chat_active: false,
            scroll_continue: true,
            first_page_msgs: [],
            search: "",
            customer_id: "",
            current_seller_id: "",
            last_page_msg: "",
        };
    },

    methods: {
        dateConvert(dateTime) {
            const dateObj = new Date(dateTime);
            const now = new Date();
            const options = { hour: "2-digit", minute: "2-digit" };

            if (dateObj.toDateString() === now.toDateString()) {
                // Display only time for today's date
                return dateObj.toLocaleTimeString([], options);
            } else {
                // Display date and time for previous date
                options.year = "numeric";
                options.month = "short";
                options.day = "numeric";
                return dateObj.toLocaleDateString([], options);
            }
        },

        divToggler() {
            this.isChatBoxVisible = !this.isChatBoxVisible;
            this.fetchUser(this.selected_user);
        },

        goToSignInPage(page_name){
            this.isChatBoxVisible = false;
            this.$router.push({ name: page_name });
        },


        loadSellers(isVisible) {
            if (!isVisible) {
                return true;
            }

            if (this.page >= this.last_page) {
                return true;
            }
            this.page++;
            this.fetchUser();
        },
        fetchUser(seller, scroll) {
            if (this.authUser) {
                let config = {
                    params: {
                        search: this.search,
                        customer_id: this.authUser.id,
                        current_seller_id: this.currentSellerId,
                        page: this.page,
                    },
                };

                let url = this.getUrl("home/chat-sellers");

                axios
                    .get(url, config)
                    .then((response) => {
                        if (response.data.error) {
                            this.$toast.error(
                                response.data.error,
                                this.lang.Error + " !!"
                            );
                        } else {
                            let sellers = response.data.sellers.data;
                            this.last_page = response.data.sellers.last_page;

                            if (!seller) {
                                if (sellers.length > 0) {
                                    for (var i in sellers) {
                                        this.sellers.data.push(sellers[i]);
                                    }
                                    this.selected_user = this.sellers.data[0];
                                }
                            } else {
                                this.chat_active = true;
                                this.sellers.data = sellers;
                            }

                            if (this.refresh_no == 1) {
                                scroll = true;
                            }
                            this.refreshMessages(this.selected_user, scroll);
                        }
                    })
                    .catch((error) => {
                        this.$toast.error(
                            error.response.data.message,
                            this.lang.Error + " !!"
                        );
                    });
            }
        },
        fetchMessages(seller, scroll) {
            let that = this;
            that.form.chat_room_id = seller.chat_room_id;
            if (that.selected_user.user_id != seller.user_id) {
                that.selected_user = seller;
                that.messages = [];
                that.first_page_msgs = [];
                that.msg_page = 1;
                that.msg_last_page = 1;
                that.scroll_continue = true;
            }
            that.selected_user = seller;
            that.scroll_continue = false;
            let params = {
                user_id: seller.user_id,
                page: that.msg_page,
                chat_room_id: that.selected_user.chat_room_id,
            };

            let url = that.getUrl("frontend/messages");

            axios
                .get(url, { params: params })
                .then((response) => {
                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            that.lang.Error + " !!"
                        );
                    } else {
                        let messages =
                            response.data.user_messages.data.reverse();

                        for (let i = 0; i < messages.length; i++) {
                            let message = messages[i];
                            let find = that.messages.find(
                                (m) => m.id == message.id
                            );
                            if (!find) {
                                that.messages.unshift(message);
                                let element =
                                    document.getElementById("chatbox");
                                element.scrollTop =
                                    element.scrollHeight -
                                    (element.scrollHeight - 500);
                            }
                        }
                        that.scroll_continue = true;
                        that.msg_last_page =
                            response.data.user_messages.last_page;
                        if (response.data.user_messages.next_page_url) {
                            that.msg_page++;
                        } else {
                            that.scroll_continue = false;
                        }
                        if (scroll) {
                            setTimeout(function () {
                                that.scrollToBottom();
                            }, 500);
                        }

                        if (that.msg_page == that.msg_last_page) {
                            this.last_page_msg = true;
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                    // this.$toast.error(
                    //   error.response.data.message,
                    //   that.lang.Error + " !!"
                    // );
                });
        },
        refreshMessages(seller, scroll) {
            let that = this;
            if (seller) {
                that.form.chat_room_id = seller.chat_room_id;
                that.selected_user = seller;

                let form = {
                    user_id: seller.user_id,
                    page: 1,
                    chat_room_id: that.selected_user.chat_room_id,
                };

                let url = that.getUrl("frontend/messages");

                axios
                    .get(url, { params: form })
                    .then((response) => {
                        if (response.data.error) {
                            this.$toast.error(
                                response.data.error,
                                that.lang.Error + " !!"
                            );
                        } else {
                            let messages = response.data.user_messages.data;

                            for (let i = 0; i < messages.length; i++) {
                                if (
                                    !that.first_page_msgs.includes(
                                        messages[i].id
                                    )
                                ) {
                                    that.messages.push(messages[i]);
                                    that.first_page_msgs.push(messages[i].id);
                                }
                            }
                            if (that.refresh_no == 1) {
                                that.msg_last_page =
                                    response.data.user_messages.last_page;
                            }
                            if (scroll && that.refresh_no == 1) {
                                setTimeout(function () {
                                    that.scrollToBottom();
                                }, 500);
                                that.msg_page = 2;
                            }
                            that.refresh_no++;
                            this.page = 1;
                            this.scroll_continue = true;
                        }
                    })
                    .catch((error) => {
                        this.$toast.error(
                            error.response.data.message,
                            that.lang.Error + " !!"
                        );
                    });
            }
        },
        handleMsgSend() {
            let length = this.files.length;
            if (length > 0) {
                for (let i = 0; i < length; i++) {
                    this.sendMessage(this.files[i], i);
                }
            }
            if (this.form.msg) {
                this.sendMessage();
            }
        },
        sendMessage(file, index) {
            let msg = this.form.msg;
            if (!msg && !file) {
                return false;
            }

            if (file) {
                msg = file.name;
            }

            let chat_room = this.selected_user.chat_room_id;

            let formData = new FormData();
            formData.append("msg", msg);
            formData.append("chat_room_id", chat_room);
            formData.append("receiver_id", this.selected_user.user_id);

            if (file) {
                formData.append("file_type", file.type);
                formData.append("file", file);
            }

            axios
                .post(this.getUrl("chat/send-message"), formData)
                .then((response) => {
                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        this.page = 1;
                        this.refresh_no = 1;
                        this.msg_page = this.msg_last_page + 1;
                        if (!file) {
                            this.form.msg = "";
                        }
                        if (index > -1) {
                            this.files.splice(index, 1);
                        }
                        this.selected_user.chat_room_id =
                            response.data.chat_room_id;

                        this.fetchUser(this.selected_user, 1);
                    }
                })
                .catch((error) => {
                    this.$toast.error(
                        error.response.data.message,
                        this.lang.Error + " !!"
                    );
                });
        },

        scrollToBottom() {
            const element = document.getElementById("chatbox");
            if (element) element.scrollTop = element.scrollHeight;
        },

        handleScroll() {
            let that = this;

            that.lastScrollTop = 0;

            let element = document.getElementById("chatbox");
            // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
            element.addEventListener(
                "scroll",
                function () {
                    // or window.addEventListener("scroll"....
                    var st =
                        window.pageYOffset ||
                        document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
                    if (st > that.lastScrollTop) {
                    } else {
                        if (element.scrollTop === 0 && that.scroll_continue) {
                            that.fetchMessages(that.selected_user);
                        }
                    }
                    that.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
                },
                false
            );
        },
        previewFile(event) {
            let inputted_files = event.target.files;

            for (let i = 0; i < inputted_files.length; i++) {
                let file = inputted_files[i];
                this.files.push(file);
            }
            document.getElementById("file").value = "";
        },
        removeFile(index) {
            return this.files.splice(index, 1);
        },
        imagePreview(file) {
            if (file.type.split("/")[0] == "image") {
                return URL.createObjectURL(file);
            } else {
                return this.getUrl(
                    "public/images/default/default-document-40x40.png"
                );
            }
        },
        searchUser() {
            this.page = 1;
            let config = {
                params: {
                    seller_name: this.search,
                    page: this.page,
                },
            };
            let url = this.getUrl("home/chat-sellers");

            axios
                .get(url, config)
                .then((response) => {
                    if (response.data.error) {
                        this.$toast.error(
                            response.data.error,
                            this.lang.Error + " !!"
                        );
                    } else {
                        let sellers = response.data.sellers.data;
                        this.last_page = response.data.sellers.last_page;
                        this.sellers.data = sellers;
                    }
                })
                .catch((error) => {
                    this.$toast.error(
                        error.response.data.message,
                        this.lang.Error + " !!"
                    );
                });
        },
    },

    watch: {
        messages() {
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },
    },
    computed: {
        currentSellerId() {
            return this.$store.getters.getCurrentSellerId;
        },
    },

    mounted() {
        let element = document.getElementById("chatbox");
        if (element) {
            element.addEventListener("scroll", this.handleScroll);
        }

        this.intervalId = setInterval(() => {
            if (this.isChatBoxVisible && this.authUser) {
                this.fetchUser(this.selected_user);
            }
        }, 5000);

        // setInterval(() => {
        //   if (!$(".title-right").hasClass("chatbox-hide") && this.authUser) {
        //     this.fetchUser(this.selected_user);
        //   }
        // }, 5000);
    },
};
</script>

<style scoped>

.login-register-box {
    list-style-type: none;
    display: flex;
    gap: 5px;
}

.login-register-box a{
    color: #80868B;
}

</style>



