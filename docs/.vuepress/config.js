import {defaultTheme, defineUserConfig, viteBundler} from 'vuepress'
import {searchPlugin} from "@vuepress/plugin-search";
import { ref } from 'vue'
import {googleAnalyticsPlugin} from "@vuepress/plugin-google-analytics";

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
    ],
    // 打包配置
    bundler: viteBundler({
        viteOptions: {},
        vuePluginOptions: {},
    }),
    theme: defaultTheme({
        colorMode: 'auto',
        navbar: [
            {
                text: '首页',
                link: '/',
            },
            {
                text: 'CI&CD',
                children: ['/CI&CD/github-actions.md']
            }
        ],
        // 侧边栏最大深度，到h3标题
        sidebarDepth: 2,
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

        repo: 'xiao-so/notes',
        docsBranch: 'main',
        docsDir: 'docs',


    }),
})