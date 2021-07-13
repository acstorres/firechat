<template>
  <div class="view chat">
    <header>
      <button class="logout" @click="Logout">Sair</button>
      <h1>Bem-vindo, {{ state.user.name }}</h1>
    </header>
    <section class="chat-box">
      <div
        v-for="message in state.messages"
        :key="message.key"
        :class="
          message.user.email === state.user.email
            ? 'message current-user'
            : 'message'
        "
      >
        <div class="message-inner">
          <div class="email">{{ message.user.name }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>
    <footer>
      <form @submit.prevent="SendMessage">
        <input
          type="text"
          placeholder="Escreva uma mensagem..."
          v-model="inputMessage"
        />
        <input type="submit" value="Send" />
      </form>
    </footer>
  </div>
</template>

<script>
import { ref, onBeforeMount, reactive, onMounted } from "vue";
import firebase from "firebase";

export default {
  setup() {
    const inputMessage = ref("");

    const state = reactive({
      user: {
        name: "",
        email: "",
      },
      password: "",
      messages: [],
    });

    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        state.user.name = user.displayName;
        state.user.email = user.email
      }
    });

    const SendMessage = () => {
      const messagesRef = firebase.database().ref("messages");

      if (inputMessage.value === "" || inputMessage.value === null) {
        return;
      }

      const message = {
        user: state.user,
        content: inputMessage.value,
      };

      messagesRef.push(message);
      inputMessage.value = "";
    };

    onMounted(() => {
      const messagesRef = firebase.database().ref("messages");

      messagesRef.on("value", (snapshot) => {
        const data = snapshot.val();
        let messages = [];

        Object.keys(data).forEach((key) => {
          messages.push({
            id: key,
            user: data[key].user,
            content: data[key].content,
          });
        });

        state.messages = messages;
      });
    });

    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("Signed out"))
        .catch((err) => alert(err.message));
        state.user.email = ''
        state.user.name = ''
    };

    return {
      state,
      Logout,
      inputMessage,
      SendMessage,
    };
  },
};
</script>
