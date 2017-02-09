// global component and new Vue instance mount on DOM
Vue.component('modal-dialogue', {
    template: '#modal-dialogue',
    name: 'modal-dialogue',
    props: ['title', 'message', 'yes', 'no'],
    // components: { RoundedButton },
    created: function () {
        eventHub.$on('request-deletion', this.toggleModal)
    },
    data() {
        return {
            msg: 'msg',
            isShow: false
        }
    },
    methods: {
        toggleModal() {
            this.isShow = !this.isShow
        },
        confirmDeletion() {
            eventHub.$emit('confirm-deletion')
            this.toggleModal();
        }
    }
});
var md = new Vue({
    el: "#md-wrapper"
});
