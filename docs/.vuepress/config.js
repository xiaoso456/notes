import {defaultTheme, defineUserConfig, viteBundler} from 'vuepress'
import {searchPlugin} from "@vuepress/plugin-search";

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'xiaoso知识文档',
    base: 'notes',
    description: 'xiaoso知识文档',
    plugins: [
        // 搜索插件
        searchPlugin({
            // 配置项
            placeholder: "搜索"
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
        lastUpdated:true,

        // 在 github等版本管理仓库上编辑此页 link
        editLink: true,
        repo: 'xiao-so/notes',
        docsBranch: 'main',
        docsDir: 'docs',


    }),
})