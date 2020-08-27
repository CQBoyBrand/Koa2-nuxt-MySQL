import React from "react";

const Dashborad = React.lazy(() => import("../views/Dashborad/Dashborad"))
const ArticleList = React.lazy(() => import("../views/Article/ArticleList"))
const ArticlePublish = React.lazy(() => import("../views/Article/ArticlePublish"))
const Tag = React.lazy(() => import("../views/Tag/Tag"))
const Category = React.lazy(() => import("../views/Category/Category"))
const Friend = React.lazy(() => import("../views/Friend/Friend"))
const Setting = React.lazy(() => import("../views/Setting/Setting"))
const LayoutIndex = React.lazy(() => import("../views/Layout"))
const Article = React.lazy(() => import("../views/Article/Article"))
const Comment = React.lazy(() => import("../views/Comment/Comment"))

interface IMetaInfo {
    title: string,
    icon?: string
}
export interface IRouterConfig {
    path: string,
    name?: string,
    meta: IMetaInfo,
    redirect?: string,
    component?: any,
    auth?: boolean,
    children?: IRouterConfig[]
}
const routerConfigs: IRouterConfig[] = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: '后台系统'
        },
        component: LayoutIndex,
        auth: true,
        children: [
            {
                path: '/index',
                name: 'index',
                meta: {
                    title: '首页',
                    icon: 'HomeOutlined'
                },
                component: Dashborad,
                auth: true
            },
            {
                path: '/article',
                name: 'article',
                meta: {
                    title: '文章管理',
                    icon: 'CoffeeOutlined'
                },
                component:Article,
                redirect: '/article/list',
                auth: true,
                children: [
                    {
                        path: '/article/list',
                        name: 'articleList',
                        meta: {
                            title: '文章列表',
                            icon: 'OrderedListOutlined'
                        },
                        component: ArticleList,
                        auth: true
                    },{
                        path: '/article/publish',
                        name: 'articlePublish',
                        meta: {
                            title: '发布文章',
                            icon: 'EditOutlined'
                        },
                        component: ArticlePublish,
                        auth: true
                    },
                ]
            },
            {
                path: '/comment',
                name: 'comment',
                meta: {
                    title: '评论管理',
                    icon: 'MessageOutlined'
                },
                component: Comment,
                auth: true
            },
            {
                path: '/tags',
                name: 'tag',
                meta: {
                    title: '标签管理',
                    icon: 'TagOutlined'
                },
                component: Tag,
                auth: true
            },
            {
                path: '/category',
                name: 'category',
                meta: {
                    title: '分类管理',
                    icon: 'AppstoreAddOutlined'
                },
                component: Category,
                auth: true
            },
            {
                path: '/friends',
                name: 'friends',
                meta: {
                    title: '友情链接',
                    icon: 'LinkOutlined'
                },
                component: Friend,
                auth: true
            },
            {
                path: '/setting',
                name: 'setting',
                meta: {
                    title: '设置',
                    icon: 'SettingOutlined'
                },
                component: Setting,
                auth: true
            },
        ]
    },
]

export default routerConfigs