export default ({
    data() {
        return {
            allProducts: [],
        }
    },
    computed: {
        keyword() {
            return this.$store.getters.getUserSearch
        },
        filteredList() {
            return this.allProducts.filter((keyword) => {
                return keyword.product_name.toLowerCase().includes(this.keyword.toLowerCase())
            })
        }
    },
    mounted() {
        this.$parent.getJson('/api/allProducts')
            .then(data => {
                for (let el of data) {
                    this.allProducts.push(el)
                }
            })
    },
    template: `
        <div class='conteiner'>
            <h2 class="feturedTitle">Результаты поиска по запросу {{ keyword }}:</h2>
                <div class="logo-line"></div>
            <div class="products">
            <product v-for="item of  filteredList" :key="item.id_product" :product="item"></product>
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