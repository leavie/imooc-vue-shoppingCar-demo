var vm = new Vue({
    el: '#shoppingCar'
    , data: {
        cartList: []
    }
    , created: function () {
    }
    , mounted: function() {
        this.$nextTick(this.loadCart)
    }
    , computed: {
        isAllChecked: function() {
            if (!this.cartList.length) // 清單為空時，並不是全選狀態
                return false;
            return this.cartList.every(elt=>elt.isChecked);
        }
        , totalMoney: function () {
            var total = 0;
            this.cartList.forEach(function(item){
                if (item.isChecked)
                    total += this.getPrice(item);
            }, this); // this is vm
            return total;
        }
    }
    , methods: {
        loadCart: function() {
            var self = this;
            this.$http.get('data/inventory.json').then(function(response) { // cannot use post in my environment
                self.cartList =
                Array.isArray(response.body)
                    ? response.body
                    : JSON.parse(response.body)
            }).catch(function(){
                console.log('catch error')
                console.log('load sample mock data')
                self.cartList = [
                {
                    name: "error",
                    price: 100,
                    quantity: 10,
                    parts:[]
                },
                {
                    name: "error",
                    price: 100,
                    quantity: 10,
                    parts:[]
                }
                ]
            })
        }
        , getPrice: function (item) {
            return item.price * item.quantity
        }
        , checkItem: function (item, checkOrNot) {
            if (item.isChecked == checkOrNot) return;
            if (typeof item.isChecked == "undefined") {
                this.$set(item, 'isChecked', checkOrNot)
            } else {
                item.isChecked = checkOrNot;
            }
        }
        , toggleItem: function (item) { // 切換當前商品的選取狀態
            this.checkItem(item, !item.isChecked);
        }
        , checkAllItems: function (checkOrNot) {
            this.cartList.forEach(function (item) {
                this.checkItem(item, checkOrNot);
            }, this)
        }
        ,
        toggleAllItems: function() {
            this.checkAllItems(!this.isAllChecked);
        }
        , deleteItem: function(item) {
            var index = this.cartList.indexOf(item); // using id will be better
            if (index == -1) return;
            this.cartList.splice(index,1); // alternate in place
        }
        , changeQuantity: function (item, increment) {
            var newValue = item.quantity + increment;
            var checkOrNot = newValue > 0;
            var resetOrNot = !checkOrNot
            if (resetOrNot) {
                item.quantity = 0;
            } else {
                item.quantity = newValue;
            }
            this.checkItem(item, checkOrNot);
        }
        , requestDeletion: function (item) {
            eventHub.$emit('request', this.deleteItem, item)
        }
    }
});
