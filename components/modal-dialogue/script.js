// global component and new Vue instance mount on DOM
Vue.component('modal-dialogue', {
    template: '#modal-dialogue',
    name: 'modal-dialogue',
    props: ['title', 'message', 'yesText', 'noText'],
    // components: { RoundedButton },
    created() {
        eventHub.$on('request', this.prepare)
    },
    data() {
        return {
            isShow: false,
            task: undefined,
            target: undefined
        }
    },
    methods: {
        prepare(fn, item) {
            this.task = fn;
            this.target = item;
            this.toggleModal()
        },
        toggleModal() {
            this.isShow = !this.isShow
        },
        confirm() {
            this.task(this.target);
            this.toggleModal()
        }
    }
});
var md = new Vue({
    el: "#md-wrapper"
});
