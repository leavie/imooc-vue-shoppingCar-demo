var vm = new Vue({
    alert: function(msg) {
        alert(msg)
    }
    , el: '#shoppingCar'
    , data: {
        cartList: []
        , allChecked: false
    }
    , created: function () {
        this.$on('onselect', this.alert); // not be applied yet
    }
    , mounted: function() {
        this.$nextTick(function(){
            this.loadCart()
        })
    }
    , computed: {

    }
    , methods: {
        loadCart: function() {
            var self = this;
            this.$http.post('data/inventory.json').then(function(response) {
                // console.log(response)
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
            // FIXME: allChecked status need be changed with every item check
            // if(this.allChecked == isAllChecked) return
            this.allChecked = isAllChecked;
            this.cartList.forEach(function (item) {
                console.log('checkAll');
                this.toggleItem(item, isAllChecked)
            }, this)
        }
        , deleteItem: function(item) {
            var index = this.cartList.indexOf(item); // using id will be better
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
    }
});
