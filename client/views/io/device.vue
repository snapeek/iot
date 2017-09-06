<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="columns">
            <div class="column control has-addons mg_check">
              <p class="control">
                <a v-bind:class="['button', activeTab(null)]" @click="changePage(null)">
                  <span class="icon is-small">
                    <i class="fa fa-circle"></i>
                  </span>
                  <span>全部</span>
                </a>
              </p>
              <!-- <p class="control">
                <a v-bind:class="['button', activeTab(2)]" @click="changePage(2)">
                  <span class="icon is-small">
                    <i class="fa fa-flash"></i>
                  </span>
                  <span>功率计</span>
                </a>
              </p> -->
              <p class="control">
                <a v-bind:class="['button', activeTab(0)]" @click="changePage(0)">
                  <span class="icon is-small">
                    <i class="fa fa-sign-in"></i>
                  </span>
                  <span>输入</span>
                </a>
              </p>
              <p class="control">
                <a v-bind:class="['button', activeTab(1)]" @click="changePage(1)">
                  <span class="icon is-small">
                    <i class="fa fa-sign-out"></i>
                  </span>
                  <span>输出</span>
                </a>
              </p>              
            </div>
            <div class="column">
              <button class="button is-primary r" @click="open">添加设备</button>
            </div>
          </div>
          <table class="table is-striped">
            <thead>
              <tr>
                <th>设备 ID</th>
                <th>设备型号</th>
                <th>协议</th>
                <th>连接</th>
                <th colspan="3"></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>设备 ID</th>
                <th>设备型号</th>
                <th>协议</th>
                <th>连接</th>
                <th colspan="3"></th>
              </tr>
            </tfoot>
            <tbody>
              <tr v-for="(device, index) in devices">
                <td>{{index + 1}}</td>
                <td>{{device.name}}</td>

                <td>{{device.mb_protocol}}</td>
                
                <td v-if="device.mb_protocol == 'tcp'">{{`${device.ip}:${device.port}`}}</td>
                <td v-else-if="device.mb_protocol == 'rtu'">{{`${device.baud}:${device.baud_parity}/${device.data}:${device.data_parity}`}}</td>
                <td v-else></td>

                <td class="is-icon">
                  <a href="javascript:void(0);" @click="open(device, index)">
                    <i class="fa fa-pencil"></i>
                  </a>
                </td>
                <td class="is-icon">
                  <a href="javascript:void(0);" @click="destroy(device, index)">
                    <i class="fa fa-trash"></i>
                  </a>
                </td>
                <td class="is-icon">
                </td>
              </tr>          
            </tbody>
          </table>
        </article>
      </div>
    </div>

    <div>
      <card-modal 
        :visible="visible" 
        :title="title" 
        :closable="true" 
        @close="close"
        @ok="ok"
        @cancel="cancel">
        <article class="tile is-child">
          <h1 class="title">添加设备</h1>
          <div class="block">
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">设备名称</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="如：功率计-1" v-model="currentDevice.name">
                </p>
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">设备 ID</label>
              </div>
              <div class="control">
                <input class="input is-expanded" type="text" placeholder="" >
              </div>
            </div>            
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">设备类型</label>
              </div>
              <div class="control">
                <div class="select is-fullwidth">
                  <select 
                    v-bind:value="currentDevice.type" 
                    v-on:input="oninput('type', $event.target.value)" >
                    <option value="1">输入</option>
                    <option value="2">输出</option>
                    <!-- <option value="3">功率计</option> -->
                  </select>
                </div>
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">计算公式</label>
              </div>
              <div class="control">
                <textarea class="textarea" placeholder="例如: $input * 10" v-model="currentDevice.computer">></textarea>
              </div>
            </div>
          </div>
        </article>
        
      </card-modal>
    </div>
  </div>
</template>

<script>
import { CardModal } from 'vue-bulma-modal'

export default {
  components: {
    CardModal
  },

  data () {
    return {
      data: [300, 50, 100],
      src: require('assets/logo.svg'),
      visible: false,
      title: '添加设备',
      currentDevice: {
        name: '',
        type: '',
        mb_protocol: '',
        baud_parity: null,
        ip: '',
        port: '',
        baud: null,
        data: 0,
        data_parity: 0
      },
      devices: [],
      type: null
    }
  },

  computed: {
    chartData () {
      return {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          data: this.data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
      }
    }
  },

  methods: {
    open (device, index) {
      // this.$emit('open')
      if(index != null) {
        this.currentDevice = device
        this.currentIndex = index
      } else {
        this.currentDevice = {}
        this.currentIndex = null
      }
      this.visible = true
    },

    close () {
      // console.log(this)
      this.visible = false
      // this.$emit('close')
    },

    cancel() {
      this.visible = false
    },

    ok() {
      if(this.currentIndex) {
        this.update()
      } else {
        this.create()
      }
      this.close()
    },

    create() {
      let device = new Device(this.currentDevice)
      this.devices.push(device)
      return device.save() 
    },

    update() {
      try {
        let device = this.currentDevice.save()
        window.dev = this.currentDevice
      } catch(e) {
        console.log(e)
      }
    },

    destroy(device, index) {
      if(confirm('确定删除吗?')) {
        try {
          device.remove()
          this.devices.splice(index, 1)
        } catch(e) {
          console.log(e)
        }
      }
    },

    page(type) {
      this.$http({
        url: "/devices?type=" + (type == null ? '' : type),
        transformResponse: [(data) => {
          return JSON.parse(data)
        }],
      }).then((response) => {
        let devices = response.data
        console.log(devices)
        this.devices = devices
      })
    },

    changePage(type) {
      this.type = type
      this.page(type)
    },

    activeTab(type) {
      return this.type == type ? 'is-disabled' : ''
    },

    oninput(key, val) {
      this.$set(this.currentDevice, key, val)
    }
  },

  mounted () {
    this.changePage(null)
  }
}
</script>

<style lang="scss" scoped>
.l{
	float: left;
}
.r{
	float: right;
}
</style>
