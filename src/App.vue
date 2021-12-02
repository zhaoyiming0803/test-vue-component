<template>
  <div id="app">
    <IForm>
      <IFormItem>
        <IFormItem>
          <IInput></IInput>
        </IFormItem>
      </IFormItem>
    </IForm>
  </div>
</template>

<script>
import IForm from './components/i-form.vue'
import IFormItem from './components//i-form-item.vue'
import IInput from './components//i-input.vue'

export default {
  name: 'App',
  components: {
    IForm,
    IFormItem,
    IInput
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
