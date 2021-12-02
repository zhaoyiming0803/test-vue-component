function findComponentUpward (componentName) {
  let parent = this.$parent || this.$root
  let name = parent.$options.name

  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent
    if (parent) {
      name = parent.$options.name
    }
  }

  return parent
}

function findComponentsUpward (componentName) {
  let parents = []
  const parent = this.$parent

  if (parent) {
    if (parent.$options.name === componentName) {
      parents.push(parent)
    }
    parents = parents.concat(findComponentsUpward.call(parent, componentName))
  }

  return parents
}

function findComponentDownWard (componentName) {
  const children = this.$children
  let child = null

  for (let i = 0; i < children.length; i++) {
    if (children[i].$options.name === componentName) {
      child = children[i]
      break
    } else {
      child = findComponentDownWard.call(children[i], componentName)
      if (child) {
        break
      }
    }
  }

  return child
}

function findComponentsDownWard (componentName) {
  let childs = []

  this.$children.forEach(child => {
    if (child.$options.name === componentName) {
      childs.push(child)
    }
    childs = childs.concat(findComponentsDownWard.call(child, componentName))
  })

  return childs
}

function findBrothersComponents (componentName) {
  return this.$parent.$children.filter(child => child.$options.name === componentName)
}

export default {
  methods: {
    findComponentUpward (componentName) {
      return findComponentUpward.call(this, componentName)
    },
    findComponentsUpward (componentName) {
      return findComponentsUpward.call(this, componentName)
    },
    findComponentDownWard (componentName) {
      return findComponentDownWard.call(this, componentName)
    },
    findComponentsDownWard (componentName) {
      return findComponentsDownWard.call(this, componentName)
    },
    findBrothersComponents (componentName) {
      return findBrothersComponents.call(this, componentName)
    }
  }
}
