<template>
  <div>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-3">
      </div>
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h1 class="title">系统设置</h1>
          <div class="block">
            <!-- <label class="label">mongodb 连接字符串</label>
            <p class="control">
              <input class="input" type="text" placeholder="mongodb://username:password@ip:port/db" v-model="mongoUrl">
            </p> -->
            <label class="label">IP 地址</label>
            <p class="control has-icon has-icon-right">
              <input class="input" type="text" placeholder="127.0.0.1" v-model="host">
              <!-- <span class="icon is-small">
                 <i class="fa fa-check"></i> 
              </span> -->
              <!-- <span class="help is-success">This username is available</span> -->
            </p>
            <label class="label">子网掩码</label>
            <p class="control has-icon has-icon-right">
              <input class="input" type="text" placeholder="255.255.255.0" v-model="mask">
              <!-- <span class="icon is-small">
                <i class="fa fa-check"></i>
              </span> -->
              <!-- <span class="help is-success">This username is available</span> -->
            </p>
             <!-- <label class="label">校正状态</label>
            <p class="control has-icon has-icon-right">
              <span class="select">
                <select v-model="rate">
                  <option :value="1">缺省校正</option>
                  <option :value="2">自适应校正</option>
                </select>
              </span>  
            </p>  -->
            <label class="label">系统状态</label>
            <div class="control">
            <label class="radio">
              <input type="radio" name="status" :value="true" v-model="status">
              启动中
            </label>
            <label class="radio">
              <input type="radio" name="status" :value="false" v-model="status">
              暂停
            </label>
          </div>
            <label class="label">读取间隔</label>
            <p class="control has-addons">
              <span class="select">
                <select v-model="rate">
                  <option :value="30">30 秒</option>
                  <option :value="60">60 秒</option>
                  <option :value="90">90 秒</option>
                </select>
              </span>
              <input class="input is-expanded" type="text" placeholder="自定义" v-model="rate">
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
      mongoUrl: '',
      mask: '255.255.255.0',
      host: '127.0.0.1',
      rate: 30,
      status: false
    }
  },

  mounted () {
  },

  methods: {
    submit () {
      openNotification({
        message: '保存成功！',
        type: 'success',
        duration: 0
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
