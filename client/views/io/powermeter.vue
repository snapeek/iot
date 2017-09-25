<template>
  <div>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-3">
      </div>
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h1 class="title">功率计设置</h1>
          <div class="block">
            <label class="label">设备选择</label>
            <p class="control">
              <span class="select">
                <select v-model="device_id">
                  <option>请选择设备</option>
                  <option v-for="device in devices" :value="device._id.toString()">{{ device.name }}</option>
                </select>
              </span>
            </p>
            <label class="label">设备 ID</label>
            <p class="control">
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="寄存器地址" v-model="power_id">
              </p>
            </p>
            <label class="label">协议类型</label>
            <p class="control">
              <div class="select is-fullwidth">
                <select v-model="protocol">
                  <option value="tcp">modbusTCP</option>
                  <option value="rtu">modbusRTU</option>
                </select>
              </div>
            </p>
            <p class="control"></p>
            <label class="label">连接设置</label>
            <p class="control is-horizontal" v-if="protocol == 'tcp'">
              <div class="control is-grouped" v-if="protocol == 'tcp'">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="IP" v-model="ip"/>
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="端口号" v-model="port"/>
                </p>
              </div>
            </p>
            <p class="control is-horizontal" v-show="protocol == 'rtu'">
              <div class="control is-grouped" v-show="protocol == 'rtu'">
                <p class="control is-expanded">
                  <input class="input" type="text" v-model="com" placeholder="串口号" >
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" v-model="path" placeholder="设备位置">
                </p>
              </div>
            </p> 
            
            <p class="control" v-show="protocol == 'rtu'">
              <div class="control is-grouped" v-show="protocol == 'rtu'">
                <p class="control is-expanded">
                <label class="label"  v-show="protocol == 'rtu'">波特率</label>
                <span class="select">
                  <select v-model="baud">
                    <option value="115200">115200</option>
                    <option value="57600">57600</option>
                    <option value="38400">38400</option>
                    <option value="19200">19200</option>
                    <option value="14400">14400</option>
                    <option value="9600">9600</option>
                    <option value="4800">4800</option>
                    <option value="2400">2400</option>
                  </select>
                </span>
                </p>
                <p class="control is-expanded">
                <label class="label"  v-show="protocol == 'rtu'">数据位</label>
                <span class="select">
                  <select v-model="digit">
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </span>
                </p>
              </div>
            </p>
            <p class="control" v-show="protocol == 'rtu'">
              <div class="control is-grouped" v-show="protocol == 'rtu'">
                <p class="control is-expanded">
                <label class="label"  v-show="protocol == 'rtu'">奇偶校验</label>
                <span class="select">
                  <select v-model="checksum">
                    <option value="0">无</option>
                    <option value="1">奇校验</option>
                    <option value="2">偶校验</option>
                  </select>
                </span>
                </p>
                <p class="control is-expanded">
                <label class="label"  v-show="protocol == 'rtu'">停止位</label>
                <span class="select">
                  <select v-model="stop">
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                  </select>
                </span>
                </p>
              </div>
            </p>
            <label class="label">寄存器地址</label>
            <span class="select is-fullwidth">
                <select v-model="register">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </span>
            <label class="label">数据类型</label>
            <span class="select is-fullwidth">
                <select v-model="digitype">
                  <option value="0">long</option>
                  <option value="1">float</option>
                </select>
              </span>
            <label class="label">转换设置</label>
            <p class="control has-addons">
              <span class="select is-fullwidth">
                <select v-model="out_type">
                  <option value="0">使用设备公式</option>
                  <option value="1">自定义公式</option>
                </select>
              </span>
              <input class="input is-expanded" type="text" placeholder="请输入公式" v-model="computer" v-if="out_type == 1">
            </p>            
            <p class="control">
              <button class="button is-primary" @click="submit">保存</button>
              <button class="button is-link">取消</button>
            </p>                     
          </div>
        </article>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Notification from 'vue-bulma-notification'

const NotificationComponent = Vue.extend(Notification)

const openNotification = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 4500,
  container: '.notifications'
}) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  components: {
    Notification
  },

  data () {
    //  let devices = await Device.find({})
    return {
      name: '',
      device_id: '',
      power_id: '',
      protocol: 'tcp',
      ip: '',
      port: '',
      com: '',
      path: '',
      baud: '',
      digit: 0,
      checksum: '',
      stop: false,
      register: 0,
      digitype: 0,
      out_type: 0,
      devices: []
    }
  },

  mounted () {
      this.$http.get("/powermeter/").then((response) => {
        let power = response.data
        this.name = power.name
        this.device_id = power.device_id
        this.power_id = power.power_id
        this.protocol = power.protocol || "tcp"
        this.ip = power.ip || "127.0.0.1"
        this.port = power.port
        this.com = power.com
        this.path = power.path
        this.baud = power.baud
        this.digit = power.digit
        this.checksum = power.checksum
        this.stop = power.stop
        this.register = power.register || 0
        this.digitype = power.digitype || 0
        this.out_type = power.out_type || 0
      }).catch((error) => {
        console.log(error)
      })   
  
  },

  methods: {
    submit () {
      this.$http.put("/powermeter/" + this.name, {
        device_id: this.device_id,
        power_id: this.power_id,
        protocol: this.protocol,
        ip: this.ip,
        com: this.com,
        path: this.path,
        baud: this.baud,
        digit: this.digit,
        checksum: this.checksum,
        port: this.port,
        stop: this.stop,
        register: this.register,
        digitype: this.digitype,
        out_type: this.out_type
      }).then((response) => {
        console.log(response)
        openNotification({
          message: '保存成功！',
          type: 'success',
          duration: 2000
        })
      }).catch((error) => {
        openNotification({
          message: '保存失败' + error,
          type: 'error',
          duration: 200
        })
      })      

    }
  }

}
</script>

<style lang="scss" scoped>
.styles-box .notification {
  margin-bottom: 20px;
}

.button {
  margin: 5px 0 0;
}
</style>
