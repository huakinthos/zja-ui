const path = require('path')
module.exports = {
  title: 'ZJA UI',
  port: 7777,
  description: '一套简单实用的ui组件',
  head: [
    ['link', { rel: 'icon', href: './public/favicon.ico' }]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: 'home', link: '/' },
      { text: 'github', link: 'https://github.com/ruaya/ruaya.github.io' }
    ],
    /**
     * 一级菜单 sidebar中的 { title }
     * 二级菜单 { children md文件中的 title } 将md文件作为一个页面 
     * 三级菜单 { children md文件中的 ##标题 } 作为二级菜单页面的子页面
     * 
     * 指定的文件若是为文件夹，则会自动找到这个文件夹中的md文件作为页面。
     */
    sidebar: [
      {
        title: '开发指南',
        collapsable: true,
        children: [
          'views/guide/start.md',
          'views/guide/install.md'
        ]
      },
      {
        title: '组件',
        collapsable: true,
        children: [
          'views/components/basic/',
          'views/components/notice/',
          'views/components/practical/',
        ]
      }
    ]
  },
  scss: {
    sassOptions: {
      indentWidth: 4,
      includePaths: [path.join(__dirname, '../../style')]
    }
  }
}
