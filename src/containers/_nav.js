export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-1'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Товары',
        to: '/products',
        icon: 'cil-puzzle',
        items: [
          {
            name: 'Создать Товар',
            to: '/products/create'
          },
          {
            name: 'Список всех товаров',
            to: '/products'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Посты',
        to: '/posts',
        icon: 'cil-puzzle',
        items: [
          {
            name: 'Создать Пост',
            to: '/posts/create'
          },
          {
            name: 'Список постов',
            to: '/posts'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Страницы',
        route: '/pages',
        icon: 'cil-star',
        items: [
          {
            name: 'Методы оптаты',
            to: '/pages/payment'
          },
          {
            name: 'Методы доставки / Возрат',
            to: '/pages/shipping'
          },
          {
            name: 'Private Police',
            to: '/pages/private'
          },
          {
            name: 'Условия пользования',
            to: '/pages/terms'
          }
        ]
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-1'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Фильтра',
        to: '/filters',
        icon: 'cil-cursor',
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-1'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Магазины',
        to: '/stores',
        icon: 'cil-cursor',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'FAQ',
        to: '/faqs',
        icon: 'cil-cursor',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Купоны',
        to: '/coupons',
        icon: 'cil-cursor',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Components']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Base',
        route: '/base',
        icon: 'cil-puzzle',
        items: [
          {
            name: 'Cards',
            to: '/base/cards'
          },
          {
            name: 'Carousels',
            to: '/base/carousels'
          },
          {
            name: 'Collapses',
            to: '/base/collapses'
          },
          {
            name: 'Forms',
            to: '/base/forms'
          },
          {
            name: 'List Groups',
            to: '/base/list-groups'
          },
          {
            name: 'Navs',
            to: '/base/navs'
          },
          {
            name: 'Paginations',
            to: '/base/paginations'
          },
          {
            name: 'Progress Bars',
            to: '/base/progress-bars'
          },
          {
            name: 'Switches',
            to: '/base/switches'
          },
          {
            name: 'Tables',
            to: '/base/tables'
          },
          {
            name: 'Tabs',
            to: '/base/tabs'
          },
          {
            name: 'Tooltips',
            to: '/base/tooltips'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Buttons',
        route: '/buttons',
        icon: 'cil-cursor',
        items: [
          {
            name: 'Buttons',
            to: '/buttons/standard-buttons'
          },
          {
            name: 'Button Dropdowns',
            to: '/buttons/dropdowns'
          },
          {
            name: 'Button Groups',
            to: '/buttons/button-groups'
          },
          {
            name: 'Brand Buttons',
            to: '/buttons/brand-buttons'
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Charts',
        to: '/charts',
        icon: 'cil-chart-pie'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Icons',
        route: '/icons',
        icon: 'cil-star',
        items: [
          {
            name: 'CoreUI Icons',
            to: '/icons/coreui-icons',
            badge: {
              color: 'info',
              text: 'NEW'
            }
          },
          {
            name: 'Brands',
            to: '/icons/brands'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Notifications',
        route: '/notifications',
        icon: 'cil-bell',
        items: [
          {
            name: 'Alerts',
            to: '/notifications/alerts'
          },
          {
            name: 'Badges',
            to: '/notifications/badges'
          },
          {
            name: 'Modals',
            to: '/notifications/modals'
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Widgets',
        to: '/widgets',
        icon: 'cil-calculator',
        badge: {
          color: 'primary',
          text: 'NEW',
          shape: 'pill'
        }
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-2'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Extras']
      }
    ]
  }
]
