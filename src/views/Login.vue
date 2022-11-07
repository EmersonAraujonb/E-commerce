<template>
  <div class="login">
    <a href="/">
      <v-icon color="primary" large>mdi-home</v-icon>
    </a>
    <v-img src="../assets/infinity.png" alt="logo" class="logo"></v-img>
    <div class="navigation">
      <v-btn color="success" class="btnLogin" @click="doLogin()">Login</v-btn>
    </div>
  </div>
</template>
<script>
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
export default {
  name: 'login',
  data() {
    return {
      show: false,
    }
  },
  created() {
  },
  methods: {
    async doLogin() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // The signed-in user info.
          const user = result.user.displayName
          const accessToken = credential.accessToken;
          const photoURL = result.user.photoURL;
          localStorage.setItem("token", accessToken);
          localStorage.setItem('user', user)
          localStorage.setItem('img', photoURL)
          this.$router.push({ name: 'home' }).catch(() => { });
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  height: 10em;
  position: relative;
  align-items: center;

  .v-input {
    width: 700px;
    margin-bottom: 20px;

  }
}

.login form {
  margin: 0;
  position: absolute;
  top: 200%;
  left: 64%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}

.v-card-title {
  display: flex;
  margin-left: 260px;
}

.btnLogin {
  margin: 0;
  position: absolute;
  top: 300%;
  left: 49%;
  margin-right: -50%;
  transform: translate(-50%, -50%);


}

p {
  display: flex;
  position: absolute;
  left: 36%;
  top: 320%;
}

.logo {
  display: flex;
  width: 300px;
  align-items: center;
  margin-left: 35%;
}

.v-progress-linear {
  position: absolute;
}
</style>