<template>
  <div>
     <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <port :inputPorts='portsIn' :devices="devices" pid="port_out_0" name="端口一" :type="1"></port>
      </div>
      <div class="tile is-parent is-6">
        <port :inputPorts='portsIn' :devices="devices" pid="port_out_1" name="端口二" :type="1"></port>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <port :inputPorts='portsIn' :devices="devices" pid="port_out_2" name="端口三" :type="1"></port>
      </div>
      <div class="tile is-parent is-6">
        <port :inputPorts='portsIn' :devices="devices" pid="port_out_3" name="端口四" :type="1"></port>
      </div>
    </div>       
    </div>
</template>

<script>
import port from './port_output'
// import Device from '@/../models/device'

export default {
  components: {
    port
  },

  data () {
    //  let devices = await Device.find({})
    return {
      devices: [],
      // data: [300, 50, 100],
      // devicesOut: [],
      portsIn: []
    }
  },

  computed: {
  },

  mounted () {
    this.$http({
      url: "/ports?type=in&is_switch=true",
      transformResponse: [(data) => {
        return JSON.parse(data)
      }],
    }).then((response) => {
      console.log(response.data)
      this.portsIn = response.data
    }).catch((error) => {
      console.log(error)
    })
    this.$http({
      url: "/devices?type=1",
      transformResponse: [(data) => {
        return JSON.parse(data)
      }],
    }).then((response) => {
      console.log(response.data)
      this.devices = response.data
    }).catch((error) => {
      console.log(error)
    })    
    // this.devicesIn = await Device.find({type: {$in: [1, 3]}})
    // this.devicesOut = await Device.find({type: 2})
  }
}
</script>

<style lang="scss" scoped>
</style>
