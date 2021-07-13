<template>
  <div class="view login">
    <form class="login-form" @submit.prevent="Login">
      <div class="form-inner">
        <h1>Login em FireChat</h1>
        <input
          type="text"
          v-model="inputEmail"
          placeholder="Email"
        />
        <input type="password" v-model="inputPassword" placeholder="Senha" />
        <input type="submit" value="Login" />
        <br/>
        <button @click="GoogleSignIn">Logar com o Gmail</button>
      </div>
    </form>
  </div>

</template>

<script>
import { reactive, ref } from "vue";
import firebase from "firebase";

export default {
  setup() {
    const inputEmail = ref("");
    const inputPassword = ref("");

    const state = reactive({
      user: {
        name: "",
        email: "",
      },
      password: "",
    });

    const GoogleSignIn = () => {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          state.user.name = result.user.displayName;
          state.user.email = result.user.email;
        })
        .catch((error) => {
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    };

    const Login = () => {
      if (inputEmail.value != "" || inputEmail.value != null) {
        state.user.email = inputEmail.value;
        state.password = inputPassword.value;
        inputEmail.value = "";
        inputPassword.value = "";
      }
    };

   
    return {
      inputEmail,
      inputPassword,
      GoogleSignIn,
      Login
    };
  },
};
</script>

