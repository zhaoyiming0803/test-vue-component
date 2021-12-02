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
  </div>
</template>

<script>
import IForm from './components/i-form.vue'
import IFormItem from './components//i-form-item.vue'
import IInput from './components//i-input.vue'
import ITree from './components/i-tree.vue'

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
    ITree
  },
  data () {
    return {
      treeData: []
    }
  },
  created () {
    this.treeData = this.formatCityList(cityList)
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
