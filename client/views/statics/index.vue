<template>
  <div>

    <div class="tile is-ancestor" v-if="this.ports.length > 0">
      <div class="tile is-parent is-10">
        <article class="tile is-child box">
          <h4 class="title">输入</h4>
          <chart :type="'line'" :data="seriesData" :options="options" v-if="showIn"></chart>
        </article>
      </div>

    </div>

     <div class="tile is-ancestor">
      <div class="tile is-parent is-10">
        <article class="tile is-child box">
          <h4 class="title">输出</h4>
          <chart :type="'line'" :data="seriesDataOut" :options="options" v-if="showOut"></chart>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-10">
        <article class="tile is-child box">
          <h4 class="title">修正值</h4>
          <chart :type="'line'" :data="seriesDataFix" :options="options"></chart>
        </article>
      </div>
    </div> 

  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'
import Vue from "vue"
export default {
  components: {
    Chart
  },

  data () {
    return {
      ports: [1],
      options: {},
      dataIn: [],
      dataOut: [],
      dataFixed: [],
      seriesIn: [],
      labelsIn: [],
      seriesOut: [],
      labelsOut: [],      
      showOut: false,
      showIn: false,
      backgroundColor: [
        'rgba(31, 200, 219, 1)',
        'rgba(151, 205, 118, 1)'
      ],
      change: false
    }
  },

  computed: {
    seriesData () {
      let data = {
        labels: this.labelsIn
      }
      data.datasets = this.seriesIn.map((e, i) => {
        return {
          data: this.dataIn[i],
          label: this.seriesIn[i],
          borderColor: this.backgroundColor[i].replace(/1\)$/, '.5)'),
          pointBackgroundColor: this.backgroundColor[i],
          backgroundColor: this.backgroundColor[i].replace(/1\)$/, '.5)')
        }
      })
      return data
    },
    seriesDataOut () {
      let data = {
        labels: this.labelsOut
      }
      data.datasets = this.seriesOut.map((e, i) => {
        return {
          data: this.dataOut[i],
          label: this.seriesOut[i],
          borderColor: this.backgroundColor[i].replace(/1\)$/, '.5)'),
          pointBackgroundColor: this.backgroundColor[i],
          backgroundColor: this.backgroundColor[i].replace(/1\)$/, '.5)')
        }
      })
      return data
    },
    seriesDataFix () {

    }        
  },

  mounted () {

      // this.dataIn.splice(1,0, [65, 59, 90, 81, 56, 5, 40])
      // this.change = !this.change
      // console.log(this.dataIn)
      // this.$refs.chartIn.chart.update()
    this.$http.get("/statics/in").then((response) => {
      console.log(response.data)
      // let data = []
      this.labelsIn = response.data.labels
      let data = response.data.data
      for(let k in data) {
        this.seriesIn.push(k)
        this.dataIn.push(data[k].map((f)=> f * Math.ceil(Math.random() * 5)))
      }

      this.showIn = true
    }).catch((error) => {
      console.log(error)
    }) 

    this.$http.get("/statics/out").then((response) => {
      console.log(response.data)
      // let data = []
      this.labelsOut = response.data.labels
      let data = response.data.data
      for(let k in data) {
        this.seriesOut.push(k)
        this.dataOut.push(data[k].map((f)=> f * Math.ceil(Math.random() * 5)))
      }
      
      this.showOut = true
    }).catch((error) => {
      console.log(error)
    })


  }
}
</script>

<style scoped>
</style>
