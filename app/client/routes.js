module.exports = function (router) {
  router.map({
    '/': {
      name: 'home',
      component: require('./home.vue')
    },
    '/a': {
      name: 'a',
      component: require('./a.vue')
    },
    '/b': {
      name: 'b',
      component: require('./b.vue')
    },
    '/c': {
      name: 'c',
      component: require('./c.vue')
    },
    '*': {
      component: require('./home.vue')
    }
  })
}
