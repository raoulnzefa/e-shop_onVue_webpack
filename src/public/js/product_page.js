export default ({
    data() {
        return {
            product: this.$route.params['product'],
            id: this.$route.params['id'],
            product_image: this.$route.params['img'],
            product_name: this.$route.params['title'],
            product_description: this.$route.params['description'],
            price: this.$route.params['price'],
        }
    },
    template: `
        <div class='product-page'>
            <div class='conteiner'>
            <div class='item-review'>
                <img class="preview-image" :src='product_image'>
                <div class='product-description'>
                    <h2 class="itemsHeader">{{ product_name }}</h2>
                    <p class="itemsDescription">{{ product_description }}</p>
                    <p class="itemsPrice">{{ price }}</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>
            </div>
        </div>
    `
})