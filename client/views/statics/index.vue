<template>
  <div>

    <div class="tile is-ancestor" v-if="this.ports.length > 0">
      <div class="tile is-parent is-10">
        <article class="tile is-child box">
          <h4 class="title">输入</h4>
          <chart :type="'line'" :data="seriesData" :options="options"></chart>
        </article>
      </div>

    </div>

     <div class="tile is-ancestor">
      <div class="tile is-parent is-10">
        <article class="tile is-child box">
          <h4 class="title">输出</h4>
          <chart :type="'line'" :data="seriesDataOut" :options="options"></chart>
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

export default {
  components: {
    Chart
  },

  data () {
    return {
      ports: [1],
      options: {}
    }
  },

  computed: {
    seriesData () {

    },
    seriesDataOut () {

    },
    seriesDataFix () {

    }        
  },

  mounted () {
    
  }
}
</script>

<style scoped>
</style>
