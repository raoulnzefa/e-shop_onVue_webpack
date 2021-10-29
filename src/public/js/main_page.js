export default {
    data() {
        return {
            top_products: [],
        }
    },
    mounted() {
        this.$parent.getJson('/api/top_products')
            .then(data => {
                for (let el of data) {
                    this.top_products.push(el);
                }
            })
    },
    template: ` 
    <div class='main-page'>

            <div class="brand">
                        <div class="brandInside">
                            <div class="left_brand">
                                <img src="img/macbook_logo_or.jpg" alt="">
                            </div>
                            <div class="right_brand">
                                <div class="brandText">
                                    <div>APPLE</div>
                                    <div>official retailer<span> Apple </span></div>
                            </div>
                        </div>
                    </div>
            </div>

            <div class="fetured_items conteiner">
                <h2 class="feturedTitle">Топ продаж</h2>
                <div class="logo-line"></div>
                <div class="products">
                    <product-main v-for="item of top_products" :key="item.id_product" :product="item"></product-main>
                </div>

                <a name="contacts"></a>

                <div class="info-box">
                <h2 class="feturedTitle">Контакты</h2>
                <div class="logo-line"></div>
                <div class="contacts-info">
                    <div class="left-contacts-info">
                        <p class='itemsHeader'>Наш адрес: г.Санкт-петербург, Торфяная дор., 2 корпус 1, ТК "Старая Деревня"</p>
                        <img src='https://p0.zoon.ru/preview/czhCJwOhDBmLJryXgf9qVA/800x530x85/1/3/1/original_52b024c440c0888d378b4e1e_5f63290e44256.jpg' width='270px'>
                        <img src='http://retail-loyalty.org/upload/iblock/00c/2d7be4f9c556fe8799c119f3cc30185c.jpg' width='270px'>
                    </div>
                    <div class='contacts-info-map'>
                        <iframe class='contacts-map' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7983.032692133516!2d30.261327272906954!3d59.98592060598695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1635189568748!5m2!1sru!2sru" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                    </div>
                </div>

                <a name="delivery"></a>

                <div class="info-box">
                <h2 class="feturedTitle">Оплата и доставка</h2>
                <div class="logo-line"></div>
                <h3 class='itemsHeader'>Доставка</h3>
                <p class='itemsDescription'>
                По Санкт-Петербургу мы доставляем Вам товары в день заказа, либо на следующий день! Также вы можете забрать свою покупку самостоятельно в магазине.
                <ul>
                    <li>ДОСТАВКА ПО САНКТ-ПЕТЕРБУРГУ СТАНДАРТНАЯ 300 РУБ.</li>
                    <li>ЭКСПРЕСС ДОСТАВКА ПО САНКТ-ПЕТЕРБУРГУ В ТЕЧЕНИЕ 3-Х ЧАСОВ 1000 РУБ.</li>
                    <li>САМОВЫВОЗ ИЗ МАГАЗИНА БЕСПЛАТНО</li>
                    <li>ДОСТАВКА ИЗ САНКТ-ПЕТЕРБУРГА В ДРУГИЕ ГОРОДА РФ СЛУЖБОЙ СДЭК (100% предоплата)</li>
                    <li>В БЛИЖАЙШИЕ ПРИГОРОДЫ СПБ</li>
                </ul>
                <h3>Оплата</h3>
                    <h3>Оплата наличными</h3>
                    <h3>Оплата банковской картой при получении</h3>
                    <h3>Оформите кредит от наших партнеров</h3>
                    <h3>Оплата онлайн</h3>
                </p>
                </div>

                <a name="guarantee"></a>

                <div class="info-box">
                <h2 class="feturedTitle">Гарантия</h2>
                <div class="logo-line"></div>
                <h3 class="feturedTitle">На любой товар в нашем Салоне предоставляется гарантия.</h3>
                <h3 class="feturedTitle">Условия гарантийного обслуживания компании</h3>
                <p class="itemsDescription">
                    1. Срок гарантийного обслуживания определяется продавцом для каждого товара индивидуально и указывается в табличной части товарной накладной.<br>
                    2. Гарантийный срок начинается с момента приобретения товара.<br>
                    3. Согласно «Закону о защите прав потребителей», при обнаружении неисправности, гарантийный ремонт осуществляется в течение установленного гарантийного срока.
                </p>
                <h3 class="feturedTitle">Гарантийные условия</h3>
                <p class="itemsDescription">
                    Товары могут иметь различную спецификацию (Российскую, Европейскую, Британскую, США и др.).
                    Гарантийное обслуживание осуществляется в официальном или уполномоченном сервисном центре в зависимости от производителя и сертификации. Адрес и телефон сервисного центра указан в гарантийном талоне или на сайте производителя.
                </p>
                <h3 class="feturedTitle">Гарантийные условия</h3>
                <p class="itemsDescription">
                1. При обращении по гарантийному случаю, Вам необходимо обратиться в официальный или уполномоченный сервисный центр и подать заявление с указанием претензий к качеству товара.
                Максимальный срок пред-ремонтного тестирования устройства занимает 21 рабочий день.<br>
                
                2. После проведения тестирования, ремонт осуществляется в срок до 45 суток с момента подачи заявления с указанием претензий к качеству товара. (Закон о правах потребителя, ст.20, п.1.)<br>
                
                3. Гарантийный срок продлевается на время нахождения товара в гарантийном ремонте.<br>
                </p>

                <h3 class="feturedTitle">Обратите внимание</h3>
                <p class="itemsDescription">
                    Для всех устройств компании Apple действует новая политика безопасности и гарантийного обслуживания! При приеме товара клиент ОБЯЗАН отключить функцию «Найти устройство» в настройках iCloud, а также стереть ВСЕ персональные данные.
                    Если клиент воспользуется другим устройством Apple во время ремонта и активирует сервис iCloud, он ОБЯЗАН отключить функцию «Найти устройство»! Если клиент не выполнит данные условия, компания Apple имеет право отказать в гарантийном обслуживании.
                </p>
                </div>
            </div class="fetured_items conteiner">

    </div>
        
    `
}

Vue.component('product-main', {
    props: ['product', 'img'],
    template: `
    <div class="product-item">
                    <img :src="product.product_img" width='280px' height='280px'>
                    <h3 class='itemsHeader'>{{product.product_name}}</h3>
                    <p class='itemsPrice'>{{product.price}}₽</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                    <router-link 
                        :to="{name:'product_page', params:{id:product.id_product,product:product, img:product.product_img, title:product.product_name, description:product.product_description, price:product.price}}">
                            <button class="btn-preview">Подробнее</button>
                    </router-link>
            </div>
    `
})