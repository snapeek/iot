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
            <label class="label">协议类型</label>
            <p class="control">
              <div class="select is-fullwidth">
                <select>
                  <option value="tcp">modbusTCP</option>
                  <option value="rtu">modbusRTU</option>
                </select>
              </div>
            </p>
            <p class="control"></p>
            <label class="label">连接设置</label>
            <p class="control is-horizontal">
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="IP">
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="端口号">
                </p>
              </div>
            </p>
            <p class="control is-horizontal">
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="波特率" >
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="校验位">
                </p>
              </div>
            </p> 
            <p class="control is-horizontal">
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="数据位">
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="校验位">
                </p>
              </div>
            </p>
            <label class="label">计算公式</label>
            <p class="control has-icon has-icon-right">
              <textarea class="textarea" placeholder="例如: $input * 10"></textarea>

              <!-- <span class="icon is-small">
                 <i class="fa fa-check"></i> 
              </span> -->
              <!-- <span class="help is-success">This username is available</span> -->
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
      mask: '',
      host: ''
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
