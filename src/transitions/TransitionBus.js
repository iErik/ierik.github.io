import Vue from 'vue';

export const bus = new Vue();
bus.$data.hasPendingLeave = false;

export default {
  on: {
    beforeEnter (el, done) {
      el.style.display = 'none';
    },
    enter (el, done) {
      let functionWrapper = () => {
        return this.$options.methods.pendingEnter(el, done);
      }

      if (bus.$data.hasPendingLeave) {
        bus.$once('next', functionWrapper);
      } else {
        functionWrapper();
      }
    },
    enterCacelled() {
      bus.$off('next', this.$options.methods.pendingenter);
    },
    leave (el, done) {
      bus.$data.hasPendingLeave = true;
      this.$options.methods.pendingLeave(el, done, () => {
        bus.$emit('next');
        bus.$data.hasPendingLeave = false;
      })
    }
  }
}
