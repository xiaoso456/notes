import {defaultTheme, defineUserConfig, viteBundler} from 'vuepress'
import {searchPlugin} from "@vuepress/plugin-search";
import {googleAnalyticsPlugin} from "@vuepress/plugin-google-analytics";
import {copyCodePlugin} from "vuepress-plugin-copy-code2";

const base = "/notes"
export default defineUserConfig({
    lang: 'zh-CN',
    title: 'xiaoso知识文档',
    base: base + "/",
    head:[
        [
            // logo
            'link', { rel: 'icon', href: base +'/img/logo.svg' }
        ],
    ],
    description: 'xiaoso知识文档',
    plugins: [
        // 搜索插件
        searchPlugin({
            // 搜索框显示文字
            placeholder: '搜索'
        }),
        googleAnalyticsPlugin({
            id: 'G-C2XKVMR51B'
        }),
        copyCodePlugin({
            // 插件选项
        }),
    ],
    // 打包配置
    bundler: viteBundler({
        viteOptions: {},
        vuePluginOptions: {},
    }),
    markdown:{

        headers:{

            level: [2,3,4],
        }
    },
    theme: defaultTheme({
        colorMode: 'auto',
        navbar: [
            {
                text: '首页',
                link: '/',
            },
            {
                text: 'CI&CD',
                children: [
                    {
                        text: 'GitHub Actions',
                        link: '/CI&CD/github-actions.md'
                    }
                ]
            },
            {
                text: '容器云',
                children: [
                    {
                        text: 'Docker',
                        link: '/云/docker.md',
                    }
                ]
            },
            {
                text: '网络',
                children: [
                    {
                        text: '证书和HTTPS',
                        link: '/网络/证书.md',
                    }
                ]
            },
            {
                text: 'Spring',
                children: [
                    {
                        text: 'SpEL表达式',
                        link: '/Java/Spring/SpEL.md',
                    }
                ]
            },
            {
                text: '常用工具',
                children: [
                    {
                        text: '中英文排版工具',
                        link: 'https://cyc2018.github.io/Text-Typesetting/',
                    },
                    {
                        text: '编程常用工具箱 ctool',
                        link: 'https://ctool.dev/'
                    }
                ]
            }
        ],
        // 侧边栏最大深度，到h4标题
        sidebarDepth: 3,
        subSidebar: 'auto',

        // 底边栏
        lastUpdated: true,
        lastUpdatedText: '最后更新',
        contributors: true,
        contributorsText: '贡献者',
        editLink: true,
        editLinkText: '编辑此页',

        // 容器默认标题
        tip: '提示',
        warning: '注意',
        danger: '警告',

        repo: 'xiaoso456/notes',
        docsBranch: 'main',
        docsDir: 'docs',


    }),
})