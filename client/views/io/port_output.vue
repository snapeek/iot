<template>
  <div class="tile is-parent">
     <article class="tile is-child box">
      <h2 class="title">{{name}}</h2>
      <label class="label">设备选择</label>
      <p class="control">
        <span class="select">
          <select v-model="device">
            <option>请选择设备</option>
            <option v-for="device in devices" :value="device._id.toString()">{{ device.name }}</option>
          </select>
        </span>
      </p>
      <!-- <label class="label">读取间隔</label>
      <p class="control has-addons">
        <span class="select">
          <select v-model="rate">
            <option :value="30">30 秒</option>
            <option :value="60">60 秒</option>
            <option :value="90">90 秒</option>
          </select>
        </span>
        <input class="input is-expanded" type="text" placeholder="自定义" v-model="rate">
      </p> -->
      <label class="label" v-if="type == 1">风速输入</label>
      <p class="control has-addons" v-if="type == 1">
        <span class="select">
          <select v-model="speed_port">
            <option :value="inport.port_id" v-for="inport in inputPorts">{{inport.port_id}}</option>
            <option value="-1">缺省校正</option>
            <option value="-2">自适应校正</option>
          </select>
        </span>
        <!-- <input class="input is-expanded" type="text" placeholder="请输入公式" v-model="computer" v-if="out_type >= 0"> -->
      </p>
      <label class="label">风速转换设置</label>
      <p class="control has-addons">
        <span class="select">
          <select v-model="out_type_speed">
            <option value="0">使用设备公式</option>
            <option value="1">自定义公式</option>
          </select>
        </span>
        <input class="input is-expanded" type="text" placeholder="请输入公式" v-model="speed_computer" v-if="out_type_speed == 1">
      </p>
       <label class="label" v-if="type == 1">风向输入</label>
      <p class="control has-addons" v-if="type == 1">
        <span class="select">
          <select v-model="direct_port">

            <option :value="inport.port_id" v-for="inport in inputPorts">{{inport.port_id}}</option>
            <option value="-1">缺省校正</option>
            <option value="-2">自适应校正</option>
          </select>
        </span>
        <!-- <input class="input is-expanded" type="text" placeholder="请输入公式" v-model="computer" v-if="out_type >= 0"> -->
      </p>
      <label class="label">风向转换设置</label>
      <p class="control has-addons">
        <span class="select">
          <select v-model="out_type_direct">
            <option value="0">使用设备公式</option>
            <option value="1">自定义公式</option>
          </select>
        </span>
        <input class="input is-expanded" type="text" placeholder="请输入公式" v-model="direct_computer" v-if="out_type_direct == 1">
      </p>     
       <div class="control r is-horizontal">
        <div class="control is-grouped">
          <label class="checkbox">
            <input type="checkbox" v-model="is_switch" />
            启用端口
          </label>
          <button class="button is-primary" @click="save">保存</button>
        </div>
      </div> 
    </article> 
  </div>
</template>

<script>

export default {
  components: {
    // port
  },
  props: {
    inputPorts: {
      type: Array,
      default() { return [] }
    },
    devices: {
      type: Array,
      default() { return [] }
    },
    name: String,
    pid: String,
    type: Number
  },
  data () {
    //  let devices = await Device.find({})
    return {
      device: null,
      out_type_speed: 0,
      out_type_direct: 0,
      speed_computer: '',
      direct_computer: '',
      is_switch: false,
      // data: [300, 50, 100],
      direct_port: -1,
      speed_port: -1
    }
  },

  computed: {
  },

  methods: {
    save() {
      this.$http.put("/ports/" + this.pid, {
          pid: this.pid,
          speed_computer: this.speed_computer,
          direct_computer: this.direct_computer,
          out_type_speed: this.out_type_speed,
          out_type_direct: this.out_type_direct,
          is_switch: this.is_switch,
          device: this.device,
          speed_port: this.speed_port,
          direct_port: this.direct_port
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    }
  },

  mounted () {
    this.$http({
      url: "/ports/" + this.pid,
      transformResponse: [(data) => {
        return JSON.parse(data)
      }],
    }).then((response) => {
      let port = response.data
      this.is_switch = port.is_switch
      this.direct_computer = port.direct_computer
      this.speed_computer = port.speed_computer
      this.out_type_speed = port.out_type_speed
      this.out_type_direct = port.out_type_direct
      this.device = port.device
      this.speed_port = port.speed_port
      this.direct_port = port.direct_port
    }).catch((error) => {
      console.log(error)
    })
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
