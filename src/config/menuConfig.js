const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的path
        icon: 'MailOutlined', // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: '商品',
        key: '/products',
        icon: 'AppstoreOutlined',
        children: [ // 子菜单列表
            {
                title: '品类管理',
                key: '/category',
                icon: 'MenuUnfoldOutlined'
            },
            {
                title: '商品管理',
                key: '/product',
                icon: 'MenuFoldOutlined'
            },
        ]
    },

    {
        title: '用户管理',
        key: '/user',
        icon: 'MailOutlined'
    },
    {
        title: '角色管理',
        key: '/role',
        icon: 'MailOutlined',
    },

    {
        title: '图形图表',
        key: '/charts',
        icon: 'DesktopOutlined',
        children: [
            {
                title: '柱形图',
                key: '/charts/bar',
                icon: 'ContainerOutlined'
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: 'DesktopOutlined'
            },
            {
                title: '饼图',
                key: '/charts/pie',
                icon: 'PieChartOutlined'
            },
        ]
    },

    {
        title: '订单管理',
        key: '/order',
        icon: 'MailOutlined',
    },
]

export default menuList