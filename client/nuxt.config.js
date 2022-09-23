export default {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    ssr: false,
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'static',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
     server: {
		host: "0.0.0.0",
		port: 3000,
	},
    head: {
        titleTemplate: '%s - CavePvP',
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'The official website of the CavePvP Network.',
            },
        ],
        script: [
            {
                src: 'https://cdn.jsdelivr.net/npm/uikit@3.5.7/dist/js/uikit.min.js'
            },
            {
                src: 'https://cdn.jsdelivr.net/npm/uikit@3.5.7/dist/js/uikit-icons.min.js'
            },
            {
                src: 'https://kit.fontawesome.com/1250b98b47.js'
            },
            {
                src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit'
            },
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {
                rel: 'stylesheet',
                type: 'text/css',
                href: 'https://cdn.jsdelivr.net/npm/uikit@3.5.7/dist/css/uikit.min.css'
            },
        ],
    },
    /*
     ** Global CSS
     */
    css: [
        {
            src: '~assets/styles/client.css'
        }
    ],
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        '~/plugins/inject',
        '~/plugins/json-viewer',
        '~/plugins/timeago',
        '~/plugins/vuelidate',
        '~/plugins/clipboard',
    ],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        // '@nuxtjs/eslint-module',
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/markdownit',
    ],
    googleAnalytics: {
        id: 'G-ZDVDCB4XSB'
    },
    // [optional] markdownit options
    // See https://github.com/markdown-it/markdown-it
    markdownit: {
        xhtmlOut: false,
        linkify: true,
        breaks: false,
        use: [
            'markdown-it-div',
            'markdown-it-imsize',
            // 'markdown-it-attrs'
        ],
        injected: true
    },
    /*
       ** Axios module configuration
       ** See https://axios.nuxtjs.org/options
       */
    axios: {
        baseURL: 'http://123.456.789.1:8000/api',
        // baseURL: 'http://evilblock.net/api',
        progress: true
        // https: true TODO: needs to be enabled for production
    },
    /*
     ** Auth module configuration
     ** See https://auth.nuxtjs.org/guide
     */
    auth: {
        strategies: {
            local: {
                scheme: 'refresh',
                token: {
                    property: 'access',
                    maxAge: 60,
                },
                refreshToken: {
                    property: 'refresh',
                    data: 'refresh',
                    maxAge: 60 * 60 * 24,
                    required: true
                },
                user: {
                    property: 'user'
                },
                endpoints: {
                    login: {
                        url: '/token/',
                        method: 'post',
                        propertyName: 'access'
                    },
                    refresh: {
                        url: '/token/refresh/',
                        method: 'post',
                        propertyName: 'refresh',
                    },
                    user: {
                        url: '/token/user/',
                        method: 'get',
                        propertyName: 'user'
                    },
                    logout: {
                        url: '/token/logout/',
                        method: 'post'
                    },
                    home: false
                },
            }
        },
    },
    router: {
        extendRoutes(routes, resolve) {
            routes.push(
                {
                    name: "store-crypto-transaction-id",
                    path: "/transaction/:slug?",
                    component: resolve(__dirname, 'pages/transaction/_id.vue')
                }
            )
        }
    },
    /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            config.node = {
                fs: 'empty'
            };
            config.devServer = {
                clientLogLevel: "silent",
            };

        },
        hotMiddleware: {
            client: {
                overlay: false
            }
        }
    }
}
