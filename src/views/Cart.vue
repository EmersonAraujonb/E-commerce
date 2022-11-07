<template>
  <div class="cart">
    <v-card class="overflow-hidden">
      <v-app-bar fixed color="white">
        <v-toolbar-title>
          <a href="/"><img src=".././assets/infinity.png" alt="logo" class="logo" /></a>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon x-small class="d-flex mr-7" v-bind="attrs" v-on="on">
              <v-icon>mdi-account</v-icon>
              <p>{{user}}</p>
            </v-btn>
          </template>
          <v-list>
            <v-btn x-small @click="logout()" v-if="this.localStorageValue != null">Sair
              <v-icon>mdi-logout</v-icon>
            </v-btn>
            <router-link to="login">
            <v-btn x-small v-if="this.localStorageValue == null">Login
              <v-icon>mdi-account-plus</v-icon>
            </v-btn>
          </router-link>
            
          </v-list>
        </v-menu>
        <v-btn icon title="Carrinho">
          <router-link to="/cart">
            <v-icon>mdi-cart</v-icon>
          </router-link>
        </v-btn>
      </v-app-bar>

      <v-container style="height: 100px"> </v-container>

      <v-list-item-title class="text-h3 mb-10 m-8">
        Carrinho de Compras
      </v-list-item-title>

      <div id="deleteCart" v-if="$store.state.cart != 0" style="text-align: right">
        <v-btn color="error" @click="deleteCart"> Apagar carrinho </v-btn>
      </div>

      <v-spacer></v-spacer>

      <div v-if="$store.state.cart == 0" id="cartVazio" class="m-10">
        <img src="./../assets/carrinhoVazio.png" style="width: 300px" alt="carrinho de compras vazio" />
        <p>Seu carrinho de compras está vazio</p>
        <a href="/" color="error">Ir Às Compras Agora</a>
      </div>
      <v-container style="height: 100px">
        <v-snackbar v-model="snackbar" fixed top right color="success">
          <span>Produto removido!</span>
          <v-icon dark> mdi-checkbox-marked-circle </v-icon>
        </v-snackbar>
      </v-container>
    </v-card>
    <p v-if="$store.state.cart != 0" class="phraseShipping">
      Compras com Cartão de Crédito e Cupons de Frete Grátis só no app.
    </p>
    <v-card class="mx-auto" max-width="944" outlined>
      <v-list-item three-line v-for="(car, idx) in $store.state.cart" :key="car.id">
        <input class="form-check-input" type="checkbox" name="checkbox" :checked="car.checked"
          @click="updateCheckedCar(idx)" />
        <img :src="car.url" style="margin-right: 10px; width: 150px; margin-bottom: 80px" />

        <v-list-item-content>
          <div id="items">
            <v-btn color="secondary">+</v-btn>
            <input class="form-control" id="qtd" type="text" v-model="car.qty" />
            <v-btn color="secondary">-</v-btn>
          </div>

          <v-list-item-title class="text-h5 mb-1">
            {{ car.title }}
          </v-list-item-title>
          <v-list-item-subtitle class="pt-4">
            {{ car.category }}</v-list-item-subtitle>
          <strong>
            <v-list-item-subtitle class="pt-4">
              {{
              car.price.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              })
              }}</v-list-item-subtitle>
          </strong>

          <div id="apagarItem">
            <v-btn color="error" @click="deleteItem(cart)">Apagar</v-btn>
          </div>
          <hr />
          <div class="card-footer">
            <img class="img-truck" src="../../static/icons8-truck-32.png" alt="img carrinho de frete" />
            <small>Frete grátis em até R$40,00 para pedidos acima de R$400,00
              <a href="#" class="saibaMais">Saiba mais</a></small>
          </div>

          <hr />
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <div v-if="$store.state.cart != 0" id="prices">
      <div class="form-check" id="selectTotal">
        <v-btn color="primary" id="select" @click="checkboxTotal('result')">Clique</v-btn>
        <label class="form-check-label" for="" id="select">
          Selecionar Tudo (<strong>{{ $store.state.cart.length }}</strong>)</label>
        <p id="select2">
          Total<span id="qtyItens"><strong>({{ $store.state.cart.length }} item )</strong></span>
          <span id="result"><strong>{{ this.totalProduct }}</strong></span>
        </p>
        <router-link to="/Checkout" class="btnContinuar">
          <v-btn id="continuar" color="success">Continuar</v-btn>
        </router-link>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import { getAuth, signOut } from "firebase/auth";
import { mapState } from 'vuex';
import Footer from '@/components/Footer.vue';
export default {
  data() {
    return {
      snackbar: false,
      totalProduct: [],
      user: '',
      localStorageValue: '',
    };
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart,
    }),
  },
  mounted() {
    this.user = localStorage.getItem('user')
    this.localStorageValue = localStorage.getItem( 'token');
    this.total();
    
  },
  methods: {
    updateCheckedCar(idx) {
      const carts = [...this.$store.state.cart];
      carts[idx].checked = !carts[idx].checked;

      this.$store.dispatch('updateProductChecked', carts);

      this.total();
    },

    total() {
      const value = this.$store.state.cart;
      const totalProducts = value.map((cart) => {
        if (cart.checked) {
          return cart.price * cart.qty;
        }
        return 0;
      });
      const total = totalProducts.reduce((acc, p) => acc + p);
      this.totalProduct = total.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
      // let result = document.querySelector('#result');
      // result.style.display = 'none';
      // qtyItens.innerHTML = '<strong>:(0 item)</strong>';
    },

    checkboxLength() {
      let checked = document.querySelectorAll(
        'input[type="checkbox"]:checked'
      ).length;
      if (checked == 1) {
        console.log('1');
        this.$store.state.cart.checked = true;
        console.log(this.$store.state.cart.checked);
      } else {
        console.log('0');
      }
    },

    reloading() {
      return document.location.reload();
    },

    deleteCart() {
      sessionStorage.removeItem('vuex')
      this.reloading();
    },
    deleteItem(cart) {
      // this.$store.dispatch("removeItem", cart);
      // this.total();
      this.snackbar = true;
    },
    checkboxTotal(el) {
      let checks = document.querySelectorAll('input[type="checkbox"]');
      for (let checkbox of checks) {
        checkbox.checked = !checkbox.checked;
      }
      let checked = document.querySelectorAll(
        'input[type="checkbox"]:checked'
      ).length;
      if (checked) {
        document.getElementById(el).style.display = 'block';
        qtyItens.style.display = 'block';
        qtyItens.innerHTML = `<strong>:(${this.$store.state.cart.length} itens):</strong>`;
        console.log('1-item')
      } else {
        document.getElementById(el).style.display = 'none';
        qtyItens.innerHTML = '<strong>:(0 item)</strong>';
        qtyItens.style.display = 'block';
        console.log('2-item')
      }
      this.checkboxLength();
    },
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        this.$router.push({ name: 'login' }).catch(() => { })
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        sessionStorage.removeItem('vuex')
      }).catch((error) => {
        // An error happened.
        alert(error)
      });
    }
  },
  components: { Footer },
};
</script>
<style lang="scss" scoped>
.logo {
  display: flex;
  width: 60px;
  height: 40px;
}

#cartVazio {
  display: grid;
  justify-items: center;
  align-items: center;
  margin-top: 50px;
}

.phraseShipping {
  text-align: center;
}

.text-h3 {
  text-align: center;
}

#items {
  margin-left: 0;
  display: flex;
  flex-direction: row-reverse;
}

.form-control {
  display: flex;
  width: 6%;
}

#apagarItem {
  margin-left: 0;
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 10px;
}

.card-footer {
  padding: 4px;
}

hr {
  width: 100%;
  margin: 2px;
}

#checkboxTotal {
  margin-left: 20px;
  margin-right: 9px;
}

#checkboxItem {
  margin-top: 12%;
  margin-left: 2%;
}

.form-check-label {
  position: relative;
  display: flex;
  margin-left: 8%;
}

.form-check {
  position: absolute;
  display: block;
}

#select {
  position: absolute;
  padding: 5px;
  display: flex;
  cursor: pointer;
}

#selectTotal {
  padding: 20px;
  height: 120px;
  width: 100%;
}

#result {
  display: flex;
  width: auto;
}

#select2 {
  margin-left: 750px;
  margin-right: 0;
  display: flex;
}

#deleteCart {
  margin: 30px;
}

.form-check {
  position: relative;
}

#prices {
  display: flex;
  margin: 10px;
  margin-top: 10px;
}

.btnContinuar {
  display: flex;
  flex-direction: row-reverse;
  padding: 0;
  position: relative;
  margin-left: 852px;
}
</style>
