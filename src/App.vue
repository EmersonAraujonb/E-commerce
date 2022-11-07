<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  // mounted(){
  //   this.$firebase.auth().onAuthStateChanged(user => {
  //     window.uid = user ? user.uid : null

  //     this.$router.push({
  //       name: window.uid ? '' : 'login'
  //     }).catch(()=>{});
  //   })
  // }
};
</script>
