<template>
  <div class="i-input-container">
    i-input.vue
  </div>
</template>

<script>
import EventEmitter from '../mixins//EventEmitter.js'
import searchComponent from '../mixins//searchComponent.js'

export default {
  mixins: [EventEmitter, searchComponent],
  name: 'i-input',
  mounted () {
    this.$on('on-form-message', message => {
      console.log('message: ', message)
    })

    console.log('findComponentUpward: ', this.findComponentUpward('i-form'))
    console.log('findComponentsUpward: ', this.findComponentsUpward('i-form'))
    console.log('findBrothersComponents: ', this.findBrothersComponents('i-input'))
  }
}
</script>
