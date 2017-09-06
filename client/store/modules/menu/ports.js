import lazyLoading from './lazyLoading'

export default {
  name: '端口设置',
  path: '/ports',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false,
    link: 'charts/index.vue'
  },
  component: lazyLoading('charts', true),

  children: [
    {
      name: '输入端口',
      path: 'input',
      component: lazyLoading('io/input'),
      meta: {
        link: 'io/input.vue'
      }
    },
    {
      name: '输出端口',
      path: 'output',
      component: lazyLoading('io/output'),
      meta: {
        link: 'io/output.vue'
      }
    },
    {
      name: '功率计设置',
      path: 'powermeter',
      component: lazyLoading('io/powermeter'),
      meta: {
        link: 'io/powermeter.vue'
      }
    },
    {
      name: '设备管理',
      path: 'device',
      component: lazyLoading('io/device'),
      meta: {
        link: 'io/device.vue'
      }
    }
  ]
}
