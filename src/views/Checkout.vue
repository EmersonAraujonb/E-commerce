<template>
    <div>
        <nav class="navCheckout">
            <a href="/"><img src=".././assets/infinity.png" alt="logo" class="logo" /></a>
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
            <div class="opcaoDeEnvio">
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
        >
          Prazo de Entrega
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Prazo de Entrega
        </v-card-title>

        <v-card-text>
            ENTREGA REGULAR: <br>

Confira o prazo médio de entrega por localidade*: <br>

- Região Nordeste: até 3 dias úteis (capitais) e 5 dias úteis (demais cidades)<br>
- Região Norte:até 3 dias úteis (capitais) e 5 dias úteis (demais cidades) <br>
- Região Centro-Oeste: até 3 dias úteis (capitais) e 5 dias úteis (demais cidades) <br>
- Região Sudeste:  até 6 dias úteis (capitais) e 7 dias úteis (demais cidades) <br>
- Região Sul: até 6 dias úteis (capitais) e 7 dias úteis (demais cidades)<br>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
          FECHAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</div>
            <div class="opcaoDeEnvio2 text-muted">Frete gratuito em todo território nacional</div>
            <!-- <div class="opcaoDeEnvio">Opção de Envio:</div>
            <div>Entrega Padrão <div class="card-subtitle mb-2 text-muted">Receba entre {{firstDayFomated()}} de
                    {{firstMonthFomated()}} a {{lastDayFomated()}} de {{lastMonthFomated()}}
                </div>
            </div> -->
            <div>
                <p class="fretes">{{this.shipping.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}}</p>
            </div>
        </div>
        <div class="totalItems">
            <p class="card-subtitle mb-2 text-muted">Total do pedido ({{$store.state.cart.length}} item){{totalProduct}}
            </p>
        </div>
        <div class="paymentMethod">
            <h4>Método de pagamento</h4>
            <v-card-text>
                <v-chip-group v-model="selection" active-class="error" column>
                    <v-chip class="payment" :loading="loading" @click="remove"> Boleto Bancário</v-chip>

                    <v-chip disabled class="payment">Cartão de Crédito</v-chip>

                    <v-chip class="payment" :loading="loading" @click="remove">Pix</v-chip>
                </v-chip-group>
            </v-card-text>

        </div>
        <hr>
        <p class="moedasEcommerce">Moedas Ecommerce Infinity a serem ganhas <i class="moedas">{{coins}} Moedas</i></p>
        <hr>
        <div class="subtotal">
            <p class="one">Subtotal dos Produtos: <span class="four">{{totalSubtotal}}</span></p>
            <p class="two">Total de envio: <span class="five">{{shipping.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}}</span></p>
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
        <v-btn id="fazerPedido" color="error" @click="makeWish">Fazer Pedido</v-btn>
        <Footer />
    </div>
</template>
<script>
import Footer from '@/components/Footer.vue';
export default {
    name: "checkout",
    data() {
        return {
            dialog: false,
            selection: 0,
            loading: false,
            snackbar: false,
            vertical: true,
            totalProduct: [],
            shipping: 0,
            coins: 60,
            totalSubtotal: []
        };
    },
    mounted() {
        this.total();
        this.subtotal();

    },
    methods: {
        async remove() {
            this.loading = true

            await new Promise(resolve => setTimeout(resolve, 3000))

            this.loading = false
        },
        total() {
            const value = this.$store.state.cart;
            const totalProducts = value.map(cart => cart.price * cart.qty)
            const place = totalProducts.reduce((acc, p) => acc + p);
            this.totalProduct = place.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
        },
        subtotal() {
            let values = this.$store.state.cart;
            let totalSub = values.map(cart => cart.price * cart.qty);
            let totalValue = totalSub.reduce((acc, p) => acc + p);
            this.totalSubtotal = totalValue.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
        },
        snackbarMessage() {
            this.snackbar = true
        },
        pushHome() {
            this.$router.push("/");
        },
        makeWish() {
            setTimeout(this.snackbarMessage, 3000)
            setTimeout(this.pushHome, 8000)
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
    display: flex;
}

.caixa {
    margin-top: 10px;
}

.pipe {
    font-size: 40px;
}

.opcaoDeEnvio {
    display: flex;
    border-left-width: 2px;
    border-left-style: solid;
    border-left-color: gray;
    padding: 8px;
    color: rgb(0, 0, 0);

}
.opcaoDeEnvio2 {
    display: flex;
    padding: 10px;
    font-size: 10pt;

}

.envio {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid gray;
    border-top: 1px solid gray;

}

.totalItems {
    text-align: right;
    padding: 20px;
    border-bottom: 1px solid gray;
}

td:nth-last-child(1) {
    text-align: right;
}

td:nth-last-child(2n) {
    text-align: center;
}

th {
    text-align: left;
}

.paymentMethod {
    display: flex;
    align-items: center;
    text-align: center;
    white-space: nowrap;
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
    color: darkgreen;
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
    margin-right: 24px;
}

.tree {
    margin-right: 28px;
}

.four {
    margin-left: 100px;
}

.five {
    margin-left: 160px;
}

.six {
    margin-left: 60px;
    padding-left: 15px;
    margin-right: -13px;
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