import Vue from 'vue'

//  Capitalize
//  ---------
//  Capitalizes the first character of a given String.
//  ---------

Vue.filter('capitalize', function(value) {
  return value[0].toUpperCase() + value.slice(1)
})
