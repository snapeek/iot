<template>
  <div>
     <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <port :devices='devicesIn' pid="port_0"></port>
      </div>
      <div class="tile is-parent is-6">
        <port :devices='devicesIn' pid="port_1"></port>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <port :devices='devicesIn' pid="port_2"></port>
      </div>
      <div class="tile is-parent is-6">
        <port :devices='devicesIn' pid="port_3"></port>
      </div>
    </div>       
    </div>
</template>

<script>
import port from './port'
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
