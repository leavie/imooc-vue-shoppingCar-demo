var vm = new Vue({
    el: '#shoppingCar'
	, data: {
        cartList: []
	}
	, created: function () {

	}
	, mounted: function() {
		this.$nextTick(function(){
			this.loadView()
		})
	}
	, computed: {

	}
	, methods: {
		loadView: function() {
            var self = this;
			this.$http.post('data/inventory.json').then(function(response) {
				// console.log(response)
                self.cartList = response.body
			})
		}
		, checkItem: function (item) {
			if (typeof item.isChecked == "undefined") {
				this.$set(item, 'isChecked', true)
			} else {
				item.isChecked = !item.isChecked;
			 }
		}
	}
});
