var vm = new Vue({
    el: '#shoppingCar'
	, data: {
        cartList: []
	}
	, mounted: {

	}
	, created: function() {
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
	}
})
