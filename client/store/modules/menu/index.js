import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'
import charts from './charts'
import uifeatures from './uifeatures'
import components from './components'
import tables from './tables'
import ports from './ports'

// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    {
      name: '系统设置',
      path: '/config',
      meta: {
        icon: 'fa-tachometer',
        link: 'config/index.vue'
      },
      component: lazyLoading('config', true)
    },
    ports,
    {
      name: '统计图表',
      path: '/statics',
      meta: {
        icon: 'fa-bar-chart-o',
        link: 'statics/index.vue'
      },
      component: lazyLoading('statics', true)
    },
    {
      name: '导入导出',
      path: '/imports',
      meta: {
        icon: 'fa-tachometer',
        link: 'imports/index.vue'
      },
      component: lazyLoading('imports', true)
    }
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
