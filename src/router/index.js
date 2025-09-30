import { createRouter, createWebHistory } from "vue-router";
import filterProducts from "@/views/product/Index.vue"

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const routes = [
    {
        path: "/",
        redirect: "/",
        component: () => import("@/layouts/Master.vue"),
        children: [
            {
                path: "/",
                name: "home",
                component: () => import("@/views/Home.vue"),
                meta: {
                    title: document.title,
                }
            },

            {
                path: '/page/:slug',
                name: 'about',
                component: () => import("@/views/page/Index.vue"),
            },


            {
                path: '/contact',
                name: 'contact',
                component: () => import("@/views/Contact.vue"),
                meta: {
                    title: 'Contact'
                }
            },


            {
                path: '/track-order',
                name: 'track.order',
                component: () => import("@/views/TrackOrder.vue"),
                meta: {
                    title: 'Track Order'
                }
            },

            {
                path: "/cart",
                name: "cart",
                component: () => import("@/views/Cart.vue"),
                meta: {
                    title: 'Carts',
                }
            },

            {
                path: '/checkout',
                name: 'checkout',
                component: () => import("@/views/Checkout.vue"),
                meta: {
                    title: 'Checkout',
                    auth: true,
                }
            },

            {
                path: '/payment/:code?',
                name: 'payment',
                component: () => import("@/views/Payment.vue"),
                meta: {
                    title: 'Payment',
                    auth: true
                }
            },

            {
                path: '/invoice/:trx_id',
                name: 'invoice.list',
                component: () => import("@/views/Invoice.vue"),
                meta: {
                    title: 'Invoice'
                }
            },

            {
                path: "/login",
                name: "login",
                component: () => import("@/views/auth/Login.vue"),
                meta: {
                    title: 'Login',
                }
            },

            {
                path: '/reset-password',
                name: 'reset.password',
                component: () => import("@/views/auth/ForgetPassword.vue"),
                meta: {
                    title: 'Reset Password'
                }
            },


            {
                path: '/reset/:email/:code',
                name: 'set.new.password',
                component: () => import("@/views/auth/ForgetPassword.vue"),
            },

            {
                path: "/register",
                name: "register",
                component: () => import("@/views/auth/Register.vue"),
                meta: {
                    title: 'Register',
                }
            },


            {
                path: '/register/:type',
                name: 'seller-register',
                component: () => import("@/views/auth/seller/Register.vue"),
                meta: {
                    title: 'Seller SingUp'
                }
            },



            // Categories router
            {
                path: "/categories",
                name: "categories",
                component: () => import("@/views/categories/Index.vue"),
                meta: {
                    title: 'Categories'
                }
            },

            {
                path: "/sub-categories/:slug",
                name: "sub.categories",
                component: () => import("@/views/categories/SubCategory.vue"),
                meta: {
                    title: 'Sub Categories'
                }
            },


            {
                path: '/flash-sale',
                name: 'flash.sale',
                component: () => import("@/views/product/FlashSale.vue"),
                meta: {
                    title: 'All Flash Sale'
                }
            },

            {
                path: '/category/:slug',
                name: 'product.by.category',
                component: filterProducts,
                meta: {
                    title: 'Category Products'
                }
            },

            // brand router
            {
                path: '/brand/:slug',
                name: 'product.by.brand',
                component: filterProducts,
                meta: {
                    title: 'Brand Products'
                }
            },




            // product router
            {
                path: '/daily-deals',
                name: 'daily.deals',
                component: () => import("@/views/product/Deals.vue"),
                meta: {
                    title: 'Daily Deals'
                }
            },

            {
                path: "/products",
                name: "all.products",
                component: filterProducts,
                meta: {
                    title: 'All Products',
                    transition: 'fade'
                }
            },


            {
                path: '/offer/products',
                name: 'product.by.offer',
                component: filterProducts,
                meta: {
                    title: 'Offer Products'
                }
            },

            {
                path: '/best-selling/products',
                name: 'product.by.selling',
                component: filterProducts,
                meta: {
                    title: 'Best Selling Products'
                }
            },

            {
                path: '/gadget-products/:slug',
                name: 'product.by.gadget',
                component: filterProducts,
                meta: {
                    title: 'Gadget Products'
                }
            },


            {
                path: '/products',
                props(route) {
                    return route.query || {}
                },
                name: 'search.product',
                component: filterProducts
            },

            {
                path: '/product/:slug',
                name: 'product.details',
                component: () => import("@/views/product/Single.vue"),
                meta: {
                    title: 'Product Details'
                }
            },

            {
                path: '/compare-list',
                name: 'compare.list',
                component: () => import("@/views/product/Compare.vue"),
                meta: {
                    title: 'Compare List'
                }
            },

            {
                path: "/wishlist",
                name: "wishlist",
                component: () => import("@/views/product/Wishlist.vue"),
                meta: {
                    title: 'Wishlist'
                }
            },

            {
                path: "/campaigns",
                name: "campaigns",
                component: () => import("@/views/Campaign.vue"),
                meta: {
                    title: 'Campaigns'
                }
            },

            {
                path: '/campaign/:slug',
                name: 'campaign.details',
                component: () => import("@/views/CampaignDetails.vue"),
                meta: {
                    title: 'Campaign Details'
                }
            },



            // blogs
            {
                path: '/blogs',
                name: 'blogs',
                component: () => import("@/views/blog/Index.vue"),
                meta: {
                    title: 'All Blog'
                }
            },

            {
                path: '/blog/:slug',
                name: 'blog.details',
                component: () => import("@/views/blog/Single.vue"),
                meta: {
                    title: 'Blog Details'
                }
            },

            {
                path: '/category-blogs/:slug',
                name: 'category.blogs',
                component: () => import("@/views/blog/Index.vue"),
                meta: {
                    title: 'All Blog'
                }
            },

            {
                path: '/brands',
                name: 'brands',
                component: () => import("@/views/Brand.vue"),
                meta: {
                    title: 'All Brands'
                }
            },

            // seller page
            {
                path: '/sellers',
                name: 'sellers',
                component: () => import("@/views/seller/Index.vue"),
                meta: {
                    title: 'All Sellers'
                }
            },

            {
                path: '/shop/:slug',
                name: 'shop',
                component: () => import("@/views/seller/Details.vue"),
                meta: {
                    title: 'Shop'
                }
            },

            {
                path: '/get-invoice/:orderCode',
                name: 'get.invoice',
                component: () => import("@/views/invoice/Invoice1.vue"),
                props: true,
                meta: {
                    title: 'Get Invoice'
                }
            },

            {
                path: '/video-shopping',
                name: 'video.shopping',
                component: () => import("@/views/video/Index.vue"),
                meta: {
                    title: 'Video Shopping'
                }
            },

            {
                path: '/video-shopping/:slug',
                name: 'video.shopping.details',
                component: () => import("@/views/video/Single.vue"),
                meta: {
                    title: 'Video Shopping'
                }
            },


            // protected router
            {
                path: "/user/dashboard",
                redirect: "/user/dashboard",
                component: () => import("@/views/dashboard/partials/Layout.vue"),
                children: [
                    {
                        path: "/user/dashboard",
                        name: "dashboard",
                        component: () => import("@/views/dashboard/Index.vue"),
                        meta: {
                            title: 'User Dashboard',
                        }
                    },

                    {
                        path: '/user/edit-profile',
                        name: 'edit.profile',
                        component: () => import("@/views/dashboard/EditProfile.vue"),
                        meta: {
                            title: 'Edit Profile'
                        }
                    },

                    {
                        path: '/user/user-to-seller',
                        name: 'migrate.seller',
                        component: () => import("@/views/dashboard/MigrateSeller.vue"),
                        meta: {
                            title: 'Migrate Seller'
                        }
                    },


                    {
                        path: '/user/notification',
                        name: 'notification',
                        component: () => import("@/views/dashboard/Notifications.vue"),
                        meta: {
                            title: 'Notification'
                        }
                    },


                    {
                        path: '/user/change-password',
                        name: 'change.password',
                        component: () => import("@/views/dashboard/ChangePassword.vue"),
                        meta: {
                            title: 'Password Change'
                        }
                    },

                    {
                        path: '/user/order-history',
                        name: 'order.history',
                        component: () => import("@/views/dashboard/OrderHistory.vue"),
                        props: true,
                        meta: {
                            title: 'Order History'
                        }

                    },

                    {
                        path: '/user/addresses',
                        name: 'addresses',
                        component: () => import("@/views/dashboard/Address.vue"),
                        meta: {
                            title: 'Addresses'
                        }
                    },

                    {
                        path: '/user/gift-voucher',
                        name: 'gift.voucher',
                        component: () => import("@/views/dashboard/GiftVoucher.vue"),
                        meta: {
                            title: 'Gift Voucher'
                        }
                    },


                    {
                        path: '/user/my-wallet',
                        name: 'wallet.history',
                        component: () => import("@/views/dashboard/WalletHistory.vue"),
                        meta: {
                            title: 'Wallet'
                        }
                    },
                    {
                        path: '/user/my-rewards',
                        name: 'reward.history',
                        component: () => import("@/views/dashboard/RewardHistory.vue"),
                        meta: {
                            title: 'Reward'
                        }
                    },

                    {
                        path: '/user/followed-shop',
                        name: 'shop.followed',
                        component: () => import("@/views/dashboard/FollowedShop.vue"),
                        meta: {
                            title: 'Followed Shop'
                        }
                    },


                ]
            },

            {
                path: '/:pathMatch(.*)*',
                name: '404',
                component: () => import("@/views/Error.vue"),
            },

        ],
    },
];


let base_url = document.getElementById('app_path').value;

// console.log(base_url);


const router = createRouter({
    // history: createWebHistory(),
    history: createWebHistory( base_url),
    routes,

    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },

});



router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = 'SGMart'; // fallback title
    }
    next();
});

router.afterEach(() => {
  const toastData = sessionStorage.getItem("toast");
  if (toastData) {
    try {
      const { type, message } = JSON.parse(toastData);
      if (type && message && typeof toast[type] === "function") {
        toast[type](message, {
          autoClose: 3000,
          hideProgressBar: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.success(message); // fallback
      }
    } catch (e) {
      toast.success(toastData); // fallback if parsing fails
    }
    sessionStorage.removeItem("toast");
  }
});


export default router;
