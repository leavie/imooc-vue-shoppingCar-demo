var vm = new Vue({
    alert: function(msg) {
        alert(msg)
    }
    , el: '#shoppingCar'
    , data: {
        cartList: []
    }
    , created: function () {
    }
    , mounted: function() {
        this.$nextTick(function(){
            this.loadCart()
        })
    }
    , computed: {
        allChecked: function() {
            if (this.cartList.length) // falsy
                return false
            return this.cartList.filter(elt=>elt.isChecked).length == this.cartList.length
        }
    }
    , methods: {
        loadCart: function() {
            var self = this;
            this.$http.get('data/inventory.json').then(function(response) { // cannot use post in my environment
                self.cartList = response.body
            })
        }
        , getPrice: function (item) {
            return item.price * item.quantity
        }
        , toggleItem: function (item, force/*optional*/) { // 切換當前商品選取狀態，或者強迫(不）選取
            if (typeof item.isChecked == "undefined") {
                this.$set(item, 'isChecked', false)
            }
            if (force == undefined) {
                item.isChecked = !item.isChecked;
            } else {
                item.isChecked = force
            }
        }
        , checkAll: function (isAllChecked) {
            if(this.allChecked == isAllChecked) return;
            this.cartList.forEach(function (item) {
                console.log('checkAll');
                this.toggleItem(item, isAllChecked)
            }, this)
        }
        , deleteItem: function(item) {
            var index = this.cartList.indexOf(item); // using id will be better
            if (index == -1) return;
            this.cartList.splice(index,1); // alternate in place
        }
        , changeQuantity: function (item, way) {
            item.quantity += way;
            var underflow = item.quantity <= 0;
            if (underflow)
                item.quantity = 0;
            this.toggleItem(item, !underflow)
        }
        , totalMoney: function () {
            var total = 0;
            this.cartList.forEach(function(item){
                console.log('totalMoney');
                if (item.isChecked)
                    total += this.getPrice(item);
            }, this); // this is vm
            return total;
        }
        , requestDeletion: function (item) {
            eventHub.$emit('request', this.deleteItem, item)
        }
    }
});
