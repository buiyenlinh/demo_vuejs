
var CompReview = {
	template: `
	<div class="product__review">
		<div class="product__review__form">
			<form action="" >
				<p>
					<label for="name">Name: </label><br>
					<input type="text" id="name" v-model="name">
				</p>
				<p>
					<label for="review">Review: </label><br>
					<textarea name="" id="review" v-model="review"></textarea>
				</p>
				<p>
					<label for="rating">Rating: </label><br>
					<select v-model="rating" id="rating">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
					</select>
				</p>

				<button type="button" @click="addReview">Submit</button>
			</form>
		</div>
	</div>
	`,
	data() {
		return {
			name: '',
			review: '',
			rating: ''
		}
	},
	computed: {},
	methods: {
		addReview() {
			let review = {
				name : this.name,
				review: this.review,
				rating: this.rating
			}
			console.log(review)
			this.$emit('add-to-review', review);
			this.name =  '',
			this.review = '',
			this.rating = ''
		}
	}
}



var CompProduct = {
	template: `
	<div class="product">
		<div class="product__inner">
			<div class="product__image">
				<img :src="getImage" alt="">
			</div>
			<div class="product__info">
				<h1>{{ title }}</h1>
				<p v-if="inStock > 0">In of stock</p>
				<p v-else>out of stock</p>
				<p class="color-box"
					v-for="variant in variants"
					:key="variant.id"
					:style="{background: variant.variantColor}"
					@mouseover="productUpdate(variant.variantId)">
				</p>

				<button 
					class="add-to-cart"
					@click="addToCart()"
					:disabled="!inStock"
					:class="{disabledClass: !inStock}">
					Add to cart
				</button>
			</div>
		</div>
		<b class="tab" 
			v-for="(tab, index) in tabs"
			:key="index"
			@click="updateTab(index)"
			:class="{activeTab: tab === currentTab}">
			{{ tab }}
		</b>
		<div class="mt-1" v-show="currentTab === 'Reviews'">
			<b v-if="!reviews.length">There are not reviews yet</b>
			<ul v-else>
				<li v-for="(review, index) in reviews"
					:key="index">
					<p>Name: {{ review.name}} </p>
					<p>Review: {{ review.review}} </p>
					<p>Rating: {{ review.rating}} </p>
				</li>
			</ul>
		</div>
		<comp-review 
			v-show="currentTab === 'Add review'"
			@add-to-review="addReview">
		</comp-review>
	</div>
	`,
	data() {
		return {
			brand: 'Vue',
			name: 'Sock',
			selected: 0,
			variants: [
				{
					variantId: 0,
					variantImage: 'images/sock-out.png',
					variantNumber: 2,
					variantColor: 'green'
				},
				{
					variantId: 1,
					variantImage: 'images/sock-in.png',
					variantNumber: 0,
					variantColor: '#353589'
				}
			],
			tabs: ['Reviews', 'Add review'],
			isTab: 0,
			reviews: []
		}
	},
	computed: {
		getImage() {
			return this.variants[this.selected].variantImage;
		},
		title() {
			return this.brand + ' ' + this.name
		},
		inStock() {
			return this.variants[this.selected].variantNumber;
		},
		currentTab() {
			return this.tabs[this.isTab]
		}
	},
	methods: {
		productUpdate(index) {
			console.log(index)
			this.selected = index
		},
		addToCart() {
			this.$emit('add-to-cart', this.variants[this.selected].variantId);
			this.variants[this.selected].variantNumber -= 1;
		},
		updateTab(index) {
			this.isTab = index
		},
		addReview(review) {
			this.reviews.push(review)
		}
	},
	components: {
		'comp-review' : CompReview
	}
}


var vm = new Vue({
	el: '#app',
	data: {
		products: [],
		reviews: []
	},
	components: {
		'comp-product' : CompProduct
	},
	methods: {
		addToCart(product) {
			this.products.push(product)
		}
	}
})