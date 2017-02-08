// global component and new Vue instance mount on DOM
Vue.component('modal-dialogue', {
    template: '#modal-dialogue',
    name: 'modal-dialogue',
    props: ['title', 'message', 'yes', 'no'],
    // components: { RoundedButton },
    data() {
      return {
        msg: 'msg',
        isShow: true
      }
    },
    methods: {
      toggleModal() {
        this.isShow = !this.isShow
      }
    }
});
var md = new Vue({
    el: "#md-wrapper"
});
