<template>
  <div id="app">
    <IForm>
      <IFormItem>
        <IFormItem>
          <IInput></IInput>
        </IFormItem>
      </IFormItem>
    </IForm>
    <ITree v-for="(item, index) in treeData" :key="index" :nodeData="item"></ITree>
    <div>stringifyTreeData: {{ stringifyTreeData }}</div>
    <div>
      <AuthingGuard :appId="appId" @login="onLogin" :config="authingConfig" />
    </div>
  </div>
</template>

<script>
import IForm from './components/i-form.vue'
import IFormItem from './components//i-form-item.vue'
import IInput from './components//i-input.vue'
import ITree from './components/i-tree.vue'
// import { AuthingGuard } from '@authing/vue-ui-components'
import { AuthingGuard } from './components/authing-ui.esm.js'
import '@authing/vue-ui-components/lib/index.min.css'

var cityList = [
  { name: '北京市', id: 1, pid: 0, level: 0 },
  { name: '朝阳区', id: 2, pid: 1, level: 1 },
  { name: '将台', id: 3, pid: 2, level: 2 },
  { name: '望京', id: 4, pid: 2, level: 2 },
  { name: '山西省', id: 5, pid: 0, level: 0 },
  { name: '太原市', id: 6, pid: 5, level: 1 }
]

export default {
  name: 'App',
  components: {
    IForm,
    IFormItem,
    IInput,
    ITree,
    AuthingGuard
  },
  data () {
    return {
      treeData: [],
      appId: '61ada53ae69e78d80e31d3e4',
      authingConfig: {
        apiHost: 'https://lb68p7-demo.authing.cn'
      }
    }
  },
  computed: {
    stringifyTreeData () {
      return JSON.stringify(this.treeData)
    }
  },
  created () {
    this.treeData = this.formatCityList(cityList)
  },
  mounted () {
    console.log('------: ', this._self._c('div', {
      style: {
        background: 'red'
      }
    }, 'hello render'))
  },
  methods: {
    formatCityList (cityList, pid = 0) {
      const res = []
      cityList.forEach(city => {
        if (city.pid === pid) {
          city.children = this.formatCityList(cityList, city.id)
          res.push(city)
        }
      })
      return res
    },
    onLogin (userInfo) {
      console.log('authing onLogin: ', userInfo)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
