import Vue from 'vue'

//  Capitalize
//  ---------
//  Capitalizes the first character of a given String.
//  ---------

Vue.filter('capitalize', function(value) {
  let words = value.trim().split(' ');
  words = words.map((word) => word[0].toUpperCase() + word.slice(1));

  return words.join(' ');
})

Vue.filter('dashToSpace', function(value) {
  return value.trim().replace(/-/g, ' ');
});
