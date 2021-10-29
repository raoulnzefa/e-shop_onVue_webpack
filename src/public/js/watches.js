export default ({
    data() {
        return {
            watches: [],
        }
    },
    mounted() {
        this.$parent.getJson('/api/watches')
            .then(data => {
                for (let el of data) {
                    this.watches.push(el);
                }
            })
    },
    template: `
    <div class="fetured_items conteiner">
                    <h2 class="feturedTitle">Apple Watch</h2>
                    <div class="logo-line"></div>
                    <div class="products">
                        <product v-for="item of watches" :key="item.id_product" :product="item"></product>
                    </div>
    </div>
    
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `
        <div class="product-item">
                    <div class="desc">
                        <img :src="product.product_img" width='280px'>
                        <h3 class='itemsHeader'>{{product.product_name}}</h3>
                        <p>{{product.product_description}}</p>
                        <p class='itemsPrice'>{{product.price}}₽</p>
                        <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                        
                        <router-link 
                            :to="{name:'product_page', params:{id:product.id_product,product:product, img:product.product_img, title:product.product_name, description:product.product_description, price:product.price}}">
                                <button class="btn-preview">Подробнее</button>
                        </router-link>
                    </div>
                </div>
        `
})