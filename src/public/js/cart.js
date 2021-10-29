const cart = {
    data() {
        return {
            isCartVisible: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.userCart.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.userCart.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.userCart.splice(this.userCart.indexOf(item), 1);
                        }
                    });
            }
        },
        removeItem(item) {
            this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                .then(data => {
                    if (data.result === 1) {
                        this.userCart.splice(this.userCart.indexOf(item), 1)
                    }
                })
        }
    },
    computed: {
        userCart() {
            return this.$store.getters.getUserCart
        },
        totalCartCost() {
            let result = []
            if (this.userCart.length) {
                for (let item of this.userCart) {
                    result.push(item.price * item.quantity)
                }
                result = result.reduce(function (sum, el) {
                    return sum + el;
                })
                return result;
            } else {
                return 0;
            }

        }
    },
    mounted() {
        this.$root.getJson('/api/cart')
            .then(data => this.$store.commit('FETCH_CART', data.contents));
    },
    template: `
    <div class="cart">
        <div class="conteiner">
            <div class="cart_box" v-show='isCartVisible'>
                    <div class='cart-header'> 
                        <div class="menuLable">Корзина</div>
                        <button class='closeCart' @click='isCartVisible = false'><img src="../img/closeIcon.png" alt="close cart" width="20px"></button>
                    </div>
                    <h4 v-if='!userCart.length'>Товары отсутствуют</h4>
                    <cart-item class='cart-item'
                    v-for='item of userCart'
                        :key='item.id_product'
                        :item = 'item'
                        @remove="remove"
                        @removeItem="removeItem"
                        @addProduct="addProduct">
                    </cart-item>
                    <div class='cart-hr'></div>
                    <h3 v-if='totalCartCost !== 0'>Итого {{totalCartCost}}</h3>
                    <router-link class='cart-open-link' :to="{name:'user_cart'}">
                            <button class='cart-open-btn' v-on:click='isCartVisible = false'>Открыть корзину
                            </button>
                    </router-link>
            </div>
        </div>
    </div>

    
    `
};
Vue.component('cart-item', {
    props: ['item'],
    template: `
            <div class='cart-item'>
                <img :src='item.product_img' width='150px'>
                <p class='itemsHeader'>{{item.product_name}}</p>
                <p>Количество: {{item.quantity}}</p>
                <p class='itemsPrice'>{{item.price}} ₽</p>
                <div class="cart-buttons">
                    <button class="plus-item" @click="$emit('addProduct', item)">+</button>
                    <button class="minus-item" @click="$emit('remove', item)">-</button>
                    <button class="del-btn" @click="$emit('removeItem', item)"><img src="../img/deleteBasket.png" width='20px' alt='deleteItem'></button>
                </div>
            </div>
    `
});

export default cart;