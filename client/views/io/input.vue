<template>
  <div>
     <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <port :devices='devicesIn' pid="port_in_0" name="端口一"></port>
      </div>
      <div class="tile is-parent is-6">
        <port :devices='devicesIn' pid="port_in_1" name="端口二"></port>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <port :devices='devicesIn' pid="port_in_2" name="端口三"></port>
      </div>
      <div class="tile is-parent is-6">
        <port :devices='devicesIn' pid="port_in_3" name="端口四"></port>
      </div>
    </div>       
    </div>
</template>

<script>
import port from './port_input'
// import Device from '@/../models/device'

export default {
  components: {
    port
  },

  data () {
    //  let devices = await Device.find({})
    return {
      // devices: [],
      // data: [300, 50, 100],
      // devicesOut: [],
      devicesIn: []
    }
  },

  computed: {
  },

  mounted () {
    this.$http({
      url: "/devices?type=0",
      transformResponse: [(data) => {
        return JSON.parse(data)
      }],
    }).then((response) => {
      console.log(response.data)
      this.devicesIn = response.data
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
