

var comp_product = {
	template: `
	<div>
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
			]
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
		}
	}
}


var vm = new Vue({
	el: '#app',
	data: {
		products: []
	},
	components: {
		'comp-product' : comp_product
	},
	methods: {
		addToCart(product) {
			this.products.push(product)
		}
	}
})