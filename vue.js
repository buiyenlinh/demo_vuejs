
var eventBus = new Vue()

Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
		<div class="product">
			<div class="product__inner">
				<div class="product-image">
					<img :src="image" alt="">
				</div>	
				<div class="product-info">
					<h1>{{ title }}</h1>
					<p v-if="inStock">In of stock</p>
					<p v-else>Out of stock</p>

					<p>Shipping: {{shipping}}</p>

					<ul>
						<li v-for="detail in details">{{ detail }}</li>
					</ul>
					<div v-for="(variant, index) in variants" 
						:key="variant.variantId" 
						class="color-box"
						:style="{ backgroundColor: variant.variantColor}"
						@mouseover="updateProduct(index)">
					</div>


					<button @click="addToCart" 
						:disabled="!inStock"
						:class="{ disabledButton: !inStock }">
						Add to cart</button>
				</div>
			</div>
			<product-tabs :reviews="reviews"></product-tabs>
		</div>
		`,
	data(){
		return {
			brand: 'Vue Mastery',
			product: 'Socks',
			details: ["80% cotton", "20% polyester", "Gender-neutral"],
			variants: [
				{
					variantId: 10001,
					variantColor: "green",
					variantImage: 'images/sock-out.png',
					variantQuantity: 4
				},
				{
					variantId: 10002,
					variantColor: "blue",
					variantImage: 'images/sock-in.png',
					variantQuantity: 2
				}
			],
			selectedVariant: 0,
			reviews: []
		}
	},
	methods: {
		addToCart() {	
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
			this.variants[this.selectedVariant].variantQuantity = this.variants[this.selectedVariant].variantQuantity - 1;
		},
		updateProduct(index) {
			this.selectedVariant = index;
		}
	},
	computed: {
		title() {
			return this.brand + ' ' + this.product;
		},
		image() {
			return this.variants[this.selectedVariant].variantImage;
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity;
		},
		shipping() {
			if (this.premium) {
				return 'free';
			}
			return 2.99;
		}
	},
	mounted() {
		eventBus.$on('review-submitted', productReview => {
			this.reviews.push(productReview);
		})
	}
})

Vue.component('product-review', {
	template: `
		<form action="" class="review-form" @submit.prevent="onSubmit">
			<p v-show="errors.length">
			<b>Please correct the following errer(s): </b>
				<ul>
					<li v-for="error in errors"> {{ error }} </li>
				</ul>
			</p>
			<p>
				<label for="name">Name:</label>
				<input id="name" v-model="name">
			</p>
			<p>
				<label for="review">Review:</label>
				<textarea id="review" v-model="review"></textarea>
			</p>
			<p>
				<label for="rating">Rating:</label>
				<select id="rating" v-model.number="rating">
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</select>
			</p>
			<input type="submit" value="Submit">
		</form>
	`,
	data() {
		return {
			name: null,
			review: null,
			rating: null,
			errors: []
		}
	},
	methods: {
		onSubmit() {
			if (this.name && this.review && this.rating) {
				let productReview = {
					name: this.name,
					review: this.review,
					rating: this.rating
				}
				eventBus.$emit('review-submitted', productReview);
				this.name =  null;
				this.review =  null;
				this.rating =  null;
				
			} else {
				if (!this.name) this.errors.push('Name required');
				if (!this.review) this.errors.push('Review required');
				if (!this.rating) this.errors.push('Rating required');
			}
			
		}
	}

})	

Vue.component('product-tabs', {
	props: {
		reviews: {
			type: Array,
			required: true
		}
	},	
	template: `
		<div>
			<span v-for="(tab, index) in tabs" class="tab"
				:key="index"
				:class="{activeTab: selectedTab === tab}"
				@click="selectedTab = tab">{{ tab }}</span>

			<div v-show="selectedTab === 'Reviews' ">
				<p v-if="!reviews.length">There are not review yet</p>
				<ul v-else>
					<li v-for="review in reviews">
						<p>Name: {{ review.name }}</p>
						<p>Review: {{ review.review }}</p>
						<p>Rating: {{ review.rating }}</p>
					</li>
				</ul>
			</div>

			<product-review v-show="selectedTab === 'Make a review' "></product-review>
		</div>
	`,
	data() {
		return {
			tabs: ['Reviews', 'Make a review'],
			selectedTab: 'Reviews'
		}
	}
})

var demo = new Vue({
	el: '#demo',
	data: {
		cart: [],
		premium: true
	},
	methods: {
		updateCart(id) {
			this.cart.push(id);
		}
	}
})


// practice 6/8/2021



// var comp_product =  {
// 	template: `
// 		<ul>
// 			<li class="item-product" 
// 				v-for="(product, index) in products"
// 				@click="selectProduct(product)">
// 				<span>{{ product.name }}</span>
// 			</li>
// 		</ul>
// 	`,
// 	data() {
// 		return {
// 			products: [
// 				{name: 'Product 1'},
// 				{name: 'Product 2'},
// 				{name: 'Product 3'},
// 				{name: 'Product 4'},
// 				{name: 'Product 5'}
// 			],
// 			selected: ''
// 		}
// 	},
// 	methods: {
// 		selectProduct(product) {
// 			this.$emit('add-product', product);
// 		}
// 	}
// }

// Vue.component('anchored-heading', {
// 	render: function (createElement) {
// 	  return createElement(
// 		'h' + this.level,   // tên thẻ
// 		this.$slots.default,
// 		console.log(this.$slots)
// 	  )
// 	},
// 	props: {
// 	  level: {
// 		type: Number,
// 		required: true
// 	  }
// 	}
//   })


// var study = new Vue({
// 	el: '#study',
// 	data: {
// 		title: 'Product list demo',
// 		products: []
// 	}, 
// 	methods: {
// 		addProduct(product) {
// 			this.products.push(product);
// 		}
// 	},
// 	components: {
// 		'product' : comp_product
// 	},
// 	directives: {
// 		red: {
// 			inserted: function (el) {
// 			  el.style.color = 'red'
// 			}
// 		  }
// 	}
// })
