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
              <span class="r">
              <button class="button is-primary" @click="open">导出数据</button>
              <button class="button is-primary" @click="open">导入数据</button>
              </span>
            </div>
          </div>
          <table class="table is-striped">
            <thead>
              <tr>
                <th>记录开始时间</th>
                <th>记录停止时间</th>
                <th>输入端口 1</th>
                <th>功率计</th>
                <th>输出端口 1</th>
                <th>输出端口 3</th>
                <th colspan="3"></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>记录开始时间</th>
                <th>记录停止时间</th>
                <th>输入端口 1</th>
                <th>功率计</th>
                <th>输出端口 1</th>
                <th>输出端口 3</th>
                <th colspan="3"></th>
              </tr>
            </tfoot>
            <tbody>
              <tr v-for="(device, index) in devices">
                <td>{{index + 1}}</td>
              </tr>          
            </tbody>
          </table>
        </article>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      devices:[]
    }
  },

  computed: {
   
  },

  methods: {
    changePage(){

    },
    activeTab(type) {
      return this.type == type ? 'is-disabled' : ''
    },
    open() {

    }
  },

  mounted () {
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
