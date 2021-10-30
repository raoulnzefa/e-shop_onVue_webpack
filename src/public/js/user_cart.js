export default ({
    data() {
        return {
            errors: [],
            name: null,
            lastName: null,
            email: null,
            country: null,
            city: null,
            address: null,
            showOrderBanner: false
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
        },
        checkForm() {
            this.errors = [];

            if (!this.name) {
                this.errors.push('Укажите имя')
            }
            if (!this.lastName) {
                this.errors.push('Укажите фамилию')
            }
            if (!this.country) {
                this.errors.push('Укажите страну')
            }
            if (!this.city) {
                this.errors.push('Укажите город')
            }
            if (!this.address) {
                this.errors.push('Укажите адресс')
            }
            if (!this.email) {
                this.errors.push('Укажите электронную почту.');
            } else if (!this.validEmail(this.email)) {
                this.errors.push('Укажите корректный адрес электронной почты.');
            }

            if (!this.errors.length) {
                setTimeout(() => {
                    this.showOrderBanner = true
                }, 120)
            }
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    },
    template: `
    <main class='user-cart'>
            <div class="conteiner">
                <div class="leftSide">
                <h3 class="feturedTitle">Корзина</h3>
                <div class="logo-line"></div>
                <div class="user-order" v-if="showOrderBanner">
                    <img src="../img/orderIcon.png" width="50px">
                    <h1>Ваш заказ оформлен</h1>
                    <p class='itemsDescription'>В ближайшее время наши менеджеры свяжутся с Вами для подтверждения заказа !</p>
                </div>
                    <div class="cartBox">
                        <h2 v-if='userCart < 1'>Корзина пуста</h2>
                        <cart-item-user class="cart-item-user"
                        v-for="item of userCart"
                            :key="item.id_product"
                            :item = "item"
                            @remove="remove"
                            @removeItem="removeItem"
                            @addProduct="addProduct">
                        </cart-item-user>
                    </div>

                    <div class="cartButton">
                        <router-link to="/"><button class="continueButton">Каталог</button></router-link>
                    </div>
                </div>

                <div class="rightSide">

                    <form action="#"  class="rightSideForm" novalidate="true" @submit="checkForm">
                    <h3 class="feturedTitle">Контактые данные</h3>
                    <div class="logo-line"></div>

                        <p class="error-cart-box" v-if="errors.length">
                            <ul v-for="error in errors">
                                <li><b>{{ error }}</b></li>
                            </ul>
                        </p>

                        <p class='itemsHeader'>Ваше имя:</p>
                        <input id="name" type="text" placeholder="Александр" v-model="name">
                        <p class='itemsHeader'>Ваша фамилия:</p>
                        <input type="text" placeholder="Иванов" v-model="lastName">
                        <p class='itemsHeader'>E-Mail:</p>
                        <input type="email" placeholder="your email" v-model="email">
                        <p class='itemsHeader'>Адрес доставки:</p>
                        <input type="text" placeholder="Россия" v-model="country">
                        <input type="text" placeholder="Санкт-Петербург" v-model="city">
                        <input type="text" placeholder="пр.Энгельса, дом 13" v-model="address">
                        <input type="text" placeholder="394754">



                        <div class="cartTotal" v-if="userCart.length">
                        <h3>Итого: {{ totalCartCost }}₽</h3>
                        <hr>
                        <button class="totalButton" type="button" @click="checkForm">Оформить заказ</button>
                        </div>

                    </form>

                </div>

            </div>

    </main>
    
    `
});

Vue.component('cart-item-user', {
    props: ['item'],
    template: `
            <div class='cart-item'>
                <img :src='item.product_img' width='150px'>
                <div class='cart-description'>
                    <p class='itemsHeader'>{{item.product_name}}</p>
                    <p>Количество: {{item.quantity}}</p>
                    <p class='itemsPrice'>{{item.price}} ₽</p>
                </div>
                <div class="cart-buttons">
                    <button class="plus-item" @click="$emit('addProduct', item)">+</button>
                    <button class="minus-item" @click="$emit('remove', item)">-</button>
                    <button class="del-btn" @click="$emit('removeItem', item)"><img src="../img/deleteBasket.png" width='20px' alt='deleteItem'></button>
                </div>
            </div>
    `
})