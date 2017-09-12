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
      <label class="label" v-if="type == 1">端口输出值</label>
      <p class="control has-addons" v-if="type == 1">
        <span class="select">
          <select v-model="out_type">
            <option value="0">输入端口一</option>
            <option value="1">输入端口二</option>
            <option value="1">输入端口三</option>
            <option value="0">缺省校正</option>
            <option value="-1">自适应校正</option>
          </select>
        </span>
        <input class="input is-expanded" type="text" placeholder="请输入公式" v-model="computer" v-if="out_type == 1">
      </p>
      <label class="label">转换设置</label>
      <p class="control has-addons">
        <span class="select">
          <select v-model="out_type">
            <option value="0">使用设备公式</option>
            <option value="1">自定义公式</option>
          </select>
        </span>
        <input class="input is-expanded" type="text" placeholder="请输入公式" v-model="computer" v-if="out_type == 1">
      </p>
       <div class="control r is-horizontal">
        <div class="control is-grouped">
          <label class="checkbox">
            <input type="checkbox" v-model="is_switch">
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
      rate: 60,
      out_type: 0,
      computer: '',
      is_switch: false,
      // data: [300, 50, 100],
      // devicesOut: [],
      // devicesIn: []
    }
  },

  computed: {
  },

  methods: {
    save() {
      this.$http.put("/ports/" + this.pid, {
          pid: this.pid,
          rate: this.rate,
          computer: this.computer,
          out_type: this.out_type,
          device: this.device
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
      // console.log(response.data)
      let port = response.data
      this.rate = port.rate
      this.computer = port.computer
      this.out_type = port.out_type
      // this.devicesIn = response.data
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
