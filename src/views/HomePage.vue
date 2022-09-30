<template>
  <div class="home">
    <v-card class="overflow-hidden">
      <v-app-bar fixed color="white">

        <v-toolbar-title>
          <router-link to="/"><img src=".././assets/infinity.png" alt="logo" class="logo" /></router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-text-field placeholder="Buscar" v-model="search"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
          <router-link to="/cart">
            <v-icon>mdi-cart</v-icon>
          </router-link>
          <div id="qtyProduct" v-if="this.$store.state.cart.length != 0">{{this.$store.state.cart.length}}</div>
        </v-btn>
      </v-app-bar>

      <v-container style="height: 100px;">
        <v-snackbar v-model="snackbar" fixed top right color="success">
          <span>Produto adicionado ao carrinho!</span>
          <v-icon dark>
            mdi-checkbox-marked-circle
          </v-icon>
        </v-snackbar>
      </v-container>
    </v-card>
    <v-item-group>
      <v-container>
        <v-row>
          <v-col v-for="product in itemsFiltered" :key="product.id" md="4">
            <v-item-group>
              <v-card>
                <v-img height="250" width="250" :src="product.url"></v-img>

                <v-card-title>{{ product.title }}</v-card-title>

                <v-card-text>
                  <v-row class="mx-0">
                    <v-rating :value="5" color="amber" dense half-increments readonly size="14"></v-rating>

                    <div class="grey--text">
                      {{ product.category }}
                    </div>
                  </v-row>

                  <div class="my-4 text-subtitle-1">
                    {{ product.price.toLocaleString('pt-br',{style: 'currency',
                    currency: 'BRL'}) }}
                  </div>
                </v-card-text>
                <router-link to="/cart">
                  <v-btn type="button" color="success" @click="addToCart(product)">
                    comprar
                  </v-btn>
                </router-link>
                <v-btn color="primary" @click="addToCart(product)">
                  Adicionar ao carrinho
                </v-btn>

                <v-divider class="mx-4"></v-divider>
              </v-card>
            </v-item-group>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
export default {
  name: 'Home',
  data() {
    return {
      snackbar: false,
      search: '',
      products: [
        {
          id: 0,
          title: "Tênis Nike Air Force 1 ' 07 Masculino",
          price: 799.99,
          category: "Casual",
          url: require("../../static/nike-air-force-1 '07-masculino.jpg"),
          checked: false
        },
        {
          id: 1,
          title: "Tênis Nike React Infinity Run Flyknit 2 Masculino",
          price: 799.99,
          category: "Casual",
          url: require("../../static/nike-react-infinity-run-flyknit-2-masculino.jpg"),
          checked: false
        },
        {
          id: 2,
          title: "Tênis Nike Air Force 1 Mid '07 Masculino",
          price: 899.99,
          category: "Casual",
          url: require("../../static/nike-air-force-1-mid '07-masculino.jpg"),
          checked: false
        },
        {
          id: 3,
          title: "Tênis Nike Air Force 1 PLT.AF.ORM Feminino",
          price: 799.99,
          category: "Casual",
          url: require("../../static/nike-air-force-1-PLT.AF.ORM-feminino.jpg"),
          checked: false
        },
        {
          id: 4,
          title: " Chuteira Nike Mercurial Club Infantil Campo",
          price: 209.99,
          category: "Pré-Adolescentes / Campo",
          url: require("../../static/chuteira-nike-mercurial-superfly-8-club-km-infantil-campo.jpg"),
          checked: false
        },
        {
          id: 5,
          title: "Tênis Nike Sportswear Air Force 1/1 Infantil",
          price: 599.99,
          category: "Pré-Adolescentes / Casual",
          url: require("../../static/tenis-nike-sportswear-air-force-1-1-infantil.jpg"),
          checked: false
        },
        {
          id: 6,
          title: "Tênis Nike Metcon 8 FlyEase Masculino",
          price: 1119.99,
          category: "Treino & Academia",
          url: require("../../static/Tênis-Nike-Metcon-8-FlyEase-Masculino.jpg"),
          checked: false
        },
        {
          id: 7,
          title: "Camisa Nike Barcelona 21/22 Torcedor Masculina",
          price: 129.99,
          category: "Futebol",
          url: require("../../static/camisa-nike-Barcelona-I-2021-22-torcedor-pro-masculina.jpg"),
          checked: false
        },
        {
          id: 8,
          title: "Camiseta Nike Liverpool 21/22 Jogador Masculina",
          price: 399.99,
          category: "Futebol",
          url: require("../../static/camisa-nike-Liverpool-II-2021-22-jogador-masculina.jpg"),
          checked: false
        },
        {
          id: 9,
          title: " Camisa Nike PSG I 2022/23 Torcedor Masculina",
          price: 399.99,
          category: "Futebol",
          url: require("../../static/camisa-nike-PSG-2022-23-torcedor- pro-masculina.jpg"),
          checked: false
        },
        {
          id: 10,
          title: "Camisa Nike Tottenham 22/23 Torcedor Masculina",
          price: 399.99,
          category: "Futebol",
          url: require("../../static/camisa-nike-Tottenham-2022-23-torcedor- pro-masculina.jpg"),
          checked: false
        },
        {
          id: 11,
          title: "Camiseta Nike Brooklyn Nets Logo Masculina",
          price: 139.99,
          category: "Basquete / Casual",
          url: require("../../static/camiseta-nike-brooklyn-nets-logo-masculina.jpg"),
          checked: false
        },
        {
          id: 12,
          title: "Camiseta Nike Barcelona 21/22 Torcedor Masculina",
          price: 209.99,
          category: "Futebol",
          url: require("../../static/camisa-nike-Barcelona-2021-22-torcedor-masculina.jpg"),
          checked: false
        },
        {
          id: 13,
          title: "Camiseta Chicago Bulls Logo Masculina",
          price: 159.99,
          category: "Basquete / Casual",
          url: require("../../static/camiseta-nike-chicago-bulls-logo-masculina.jpg"),
          checked: false
        },
        {
          id: 14,
          title: "Plus Size - Shorts Icon Clash Feminino",
          price: 109.99,
          category: "Corrida",
          url: require("../../static/plus-size-shorts-nike-icon-clash-feminino.jpg"),
          checked: false
        },
        {
          id: 15,
          title: "Regata Nike Dri-FIT Feminina",
          price: 79.90,
          category: "Treino & Academia",
          url: require("../../static/regata-nike-dri-fit-feminina.jpg"),
          checked: false
        },
        {
          id: 16,
          title: "Regata Nike Tankini Feminina",
          price: 109.99,
          category: "Natação & Praia",
          url: require("../../static/regata-nike-tankini-azul-feminina.jpg"),
          checked: false
        },
        {
          id: 17,
          title: "Camiseta UV Hydroguard Feminina",
          price: 99.90,
          category: "Casual & Praia",
          url: require("../../static/camiseta-nike-UV-hydroguard-feminina.jpg"),
          checked: false
        },
        {
          id: 18,
          title: "Regata Nike Tankini Feminina",
          price: 79.90,
          category: "Academia & Praia",
          url: require("../../static/regata-nike-tankini-feminina.jpg"),
          checked: false
        },
        {
          id: 19,
          title: "SHORTS M NK DF EPIC KNIT 8IN SHORT",
          price: 109.99,
          category: "Corrida",
          url: require("../../static/shorts-m-nk-df-epic-knit-8in-short.jpg"),
          checked: false
        },
        {
          id: 20,
          title: "Shorts Dri-FIT Academy Feminino",
          price: 49.90,
          category: "Futebol",
          url: require("../../static/shorts-nike-dri-fit-academy-feminino.jpg"),
          checked: false
        },
        {
          id: 21,
          title: "Shorts Nike SB Sunday Unissex",
          price: 149.99,
          category: "Skateboarding / Casual",
          url: require("../../static/shorts-nike-sb-sunday-unissex.jpg"),
          checked: false
        },
        {
          id: 22,
          title: "Shorts Sportswear Flow Masculino",
          price: 179.99,
          category: "Casual",
          url: require("../../static/shorts-nike-sportswear-flow-masculino.jpg"),
          checked: false
        }
      ]
    }
  
  },
  components: {
    Footer
  },
  computed: {
    itemsFiltered() {
      let values = [];
      values = this.products.filter((product) => {
        return (
          product.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          product.category.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
      return values;
    }
  },
  methods: {
    addToCart(product) {
      this.$store.commit('addProduct', product);
      this.snackbar = true
    },

  }

}
</script>
<style lang="scss" scoped>
#pesquisa {
  background: url("../assets/lupa-de-pesquisa.png") no-repeat left;
  background-repeat: no-repeat;
  padding-left: 2.5em;
}

.logo {
  display: flex;
  width: 60px;
  height: 40px;
}

#qtyProduct {
  display: flex;
  background-color: #000;
  border-radius: 50%;
  color: #FFF;
  margin-bottom: 25px;
  margin-right: 20px;
}

.v-btn.v-size--default {
  font-size: 0.675rem;
  margin-right: 13px;
  margin-left: 13px;
  padding: 2px;
}
</style>
