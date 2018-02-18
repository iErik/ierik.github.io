import Vue from 'vue'

//  Capitalize
//  ----------
//  Capitalizes the first character of a given String.
//  ----------

Vue.filter('capitalize', function(value) {
  let words = value.trim().split(' ');
  words = words.map((word) => word[0].toUpperCase() + word.slice(1));

  return words.join(' ');
});

//  Dash To Space
//  -------------
//  Turns a dash-delimited string into space delimited
//  -------------

Vue.filter('dashToSpace', function(value) {
  return value.trim().replace(/-/g, ' ');
});

//  Camel To Space
//  --------------
//  Takes a camelCase string and turns it into space delimited
//  --------------

Vue.filter('camelToSpace', function(value) {
  return value.trim().replace(/([A-Z])/g, " $1");
});
