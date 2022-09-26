<template>
    <div>
        <nav class="navCheckout">
            <router-link to="/"><img src=".././assets/infinity.png" alt="logo" class="logo" /></router-link>
            <div class="caixa"><span class="pipe">| </span>Caixa</div>
        </nav>
        <v-simple-table>
            <thead>
                <tr>

                    <th scope="col" class="card-subtitle mb-2 text-muted">Produtos Pedidos</th>
                    <th scope="col"></th>
                    <th scope="col" class="card-subtitle mb-2 text-muted m-6">Preço unitário</th>
                    <th scope="col" class="card-subtitle mb-2 text-muted">Quantia</th>
                    <th scope="col" class="card-subtitle mb-2 text-muted" id="subTotal">Subtotal de items</th>
                </tr>
            </thead>
            <tbody v-for="product in  this.$store.state.cart" :key="product.id">
                <tr>
                    <td><img class="title" :src="product.url" style="width: 4rem" />{{product.title}}</td>
                    <td class="card-subtitle mb-2 text-muted">Categoria: {{product.category}}</td>
                    <td>{{product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</td>
                    <td>{{product.qty}}</td>
                    <td>{{product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</td>
                </tr>
                <tr>
                </tr>
            </tbody>
        </v-simple-table>
        <div class="envio">
            <div>Mensagem: <input type="text" placeholder="(Opcional) Deixe uma mensagem para o vendendor..."></div>
            <div class="opcaoDeEnvio">Opção de envio:</div>
            <div>Entrega Padrão <div class="card-subtitle mb-2 text-muted">Receba entre {{firstDayFomated()}} de  {{firstMonthFomated()}} a {{lastDayFomated()}} de  {{lastMonthFomated()}}
                </div>
            </div>
            <div>
                <p class="fretes">R${{this.frete}}</p>
            </div>
        </div>
        <div class="totalItems">
            <p class="card-subtitle mb-2 text-muted">Total do pedido ({{$store.state.cart.length}} item){{totalProduct}}
            </p>
        </div>
        <div>
            <h4>Método de pagamento <v-btn  outlined color="error">Boleto Bancário</v-btn>
                <v-btn color="error" outlined disabled>Cartão de Crédito</v-btn>
                <v-btn outlined color="error">Pix</v-btn>
            </h4>
        </div>
        <hr>
        <p class="moedasEcommerce">Moedas Ecommerce Infinity a serem ganhas <i class="moedas">{{moedas}} Moedas</i></p>
        <hr>
        <div class="subtotal">
            <p class="one">Subtotal dos Produtos: <span class="four">{{totalSubtotal}}</span></p>
            <p class="two">Total de envio: <span class="five">R${{frete}}</span></p>
            <p class="tree">Pagamento Total: <span class="six">{{totalProduct}} </span></p>
        </div>
        <v-container style="height: 100px;">
            <v-snackbar v-model="snackbar" :vertical="vertical" fixed center color="success">
                <span>Pedido realizado com sucesso!</span>
                <v-icon dark>
                    mdi-checkbox-marked-circle
                </v-icon>
            </v-snackbar>
        </v-container>
        <button id="fazerPedido" class="btn btn-danger" @click="makeWish">Fazer Pedido</button>
        <Footer />
    </div>

</template>
<script>
import Footer from '@/components/Footer.vue';
export default {
    name: "checkout",
    data() {
        return {
            snackbar: false,
            vertical: true,
            totalProduct: [],
            frete: 22.89,
            moedas: 60,
            totalSubtotal: []
        };
    },
    mounted() {
        this.total();
        this.subtotal();
    },
    methods: {
        firstDayFomated(){
            let dateDay = new Date()
            let otherDay = new Date();
            otherDay.setDate(dateDay.getDate() + 9); //
            let local = otherDay.getDate()
            return local;
        },
        lastDayFomated(){
            let dateDay = new Date()
            let otherDay = new Date();
            otherDay.setDate(dateDay.getDate() + 15); // Adiciona  dias ao mês
            let local = otherDay.getDate()
            return local;
        },
        firstMonthFomated(){
            let dateMonth = new Date().toLocaleString('pt-br', {month: 'long'});
            if(this.firstDayFomated() > 0 ){
            let time = new Date();
            let outraData = new Date();
            outraData.setDate(time.getDate() + 31); // Adiciona 30 dias ao mês
            let local = outraData.toLocaleString('pt-br', {month: 'long'});
            console.log(local)
            return local;
            } else {
                console.log(dateMonth)
                return dateMonth
            }

        },
        lastMonthFomated(){

            let dateMonth = new Date().toLocaleString('pt-br', {month: 'long'});
            if(this.firstDayFomated() >  0 ){
            let time = new Date();
            let outraData = new Date();
            outraData.setDate(time.getDate() + 44); // Adiciona 30 dias ao mês
            let local = outraData.toLocaleString('pt-br', {month: 'long'});
            console.log(local)
            return local;
            } else {
                console.log(dateMonth)
                return dateMonth
            }

            // let time = new Date();
            // let outraData = new Date();
            // outraData.setDate(time.getDate() + 31); // Adiciona 30 dias ao mês
            // let local = outraData.toLocaleString('pt-br', {month: 'long'});
            // return local;

        },
        total() {
            const value = this.$store.state.cart;
            const totalProducts = value.map(cart => cart.price * cart.qty + this.frete);
            const total = totalProducts.reduce((acc, p) => acc + p);
            this.totalProduct = total.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
        },
        subtotal() {
            let values = this.$store.state.cart;
            let totalSub = values.map(cart => cart.price * cart.qty);
            let totalValue = totalSub.reduce((acc, p) => acc + p);
            this.totalSubtotal = totalValue.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
        },
        makeWish() {
            this.snackbar = true;
        }
    },
    components: { Footer }
}
</script>
<style lang="scss" scoped>
.logo {
    display: flex;
    width: 120px;
    height: 80px;
    margin: 10px;
}

.navCheckout {
    justify-content: start;
    background-color: white;
    margin-top: 2px;
}

.caixa {
    margin-top: 10px;
}

.pipe {
    font-size: 40px;
}

.opcaoDeEnvio {
    display: flex;
    border-left-width: 1px;
    border-left-style: solid;
    border-left-color: gray;
    padding: 10px;
    color: rgb(255, 60, 0);

}

.envio {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid gray;
}

.totalItems {
    text-align: right;
    padding: 20px;
}

th {
    text-align: left;
}

.title {
    justify-content: left;
    display: flex;
}

h4 {
    margin-left: 10px;
}

#subTotal {
    text-align: right;
}

input {
    width: 400px;
}

.moedas {
    color: #f6a700;
    ;
}

.moedasEcommerce {
    text-align: right;
    padding-right: 20px;
}

.subtotal {
    text-align: right;
    padding-right: 20px;
}

.one {
    margin-right: 5px;
    padding: 10px;
}

.two {
    margin-right: 32px;
}

.tree {
    margin-right: 5px;
}

.four {
    margin-left: 100px;
}

.five {
    margin-left: 160px;
}

.six {
    margin-left: 60px;
    font-size: 30px;
    color: firebrick;
}

#fazerPedido {
    display: flex;
    margin-left: 800px;
    padding-left: 40px;
    padding-right: 40px;
    font-size: 20px;
    margin-bottom: 20px;
}
</style>