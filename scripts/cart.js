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
                //console.log('totalMoney');
                if (item.isChecked)
                    total += this.getPrice(item);
            }, this); // this is vm
            return total;
        }
    }
    , methods: {
        loadCart: function() {
            console.log('a')
            var self = this;
            this.$http.get('data/inventory.json').then(function(response) { // cannot use post in my environment
                self.cartList =
                Array.isArray(response.body)
                    ? response.body
                    : JSON.parse(response.body)
                console.log('b')
            }).catch(function(){
                console.log('catch error')
            })
            console.log('c')
        }
        , getPrice: function (item) {
            return item.price * item.quantity
        }
        , checkItem: function (item, force) { // 強迫(不）選取
            if (item.isChecked == force) return;
            if (typeof item.isChecked == "undefined") {
                this.$set(item, 'isChecked', false)
            }
                item.isChecked = force;
        }
        , toggleItem: function (item) { // 切換當前商品的選取狀態
            this.checkItem(item, !item.isChecked);
        }
        , checkAllItems: function (force) {
            if(this.isAllChecked == force) return;
            this.cartList.forEach(function (item) {
                //console.log('checkAllItems');
                this.checkItem(item, force);
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
        , changeQuantity: function (item, way) {
            var temp = item.quantity + way;
            var reset = temp <= 0;
            if (reset) {
                item.quantity = 0;
            } else {
                item.quantity = temp;
            }
            this.checkItem(item, !reset);
        }
        , requestDeletion: function (item) {
            eventHub.$emit('request', this.deleteItem, item)
        }
    }
});
