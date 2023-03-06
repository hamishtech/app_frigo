<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" class="d-none d-md-block">
        <div class="login-image"></div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column align-self-center justify-center"
      >
        <div class="d-flex justify-center align-center">
          <v-img
            class="logo"
            src="data:image/jpeg;base64,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"
            contain
          ></v-img>
        </div>
        <div class="pa-8">
          <h2 class="mb-6 text-center text-heading-6">Connexion</h2>
          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              prepend-icon="mdi-account"
              required
              :error-messages="emailErrors"
            ></v-text-field>
            <v-text-field
              v-model="password"
              outlined
              label="Mot de passe"
              prepend-icon="mdi-lock"
              :type="passwordVisible ? 'text' : 'password'"
              required
              :append-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="() => (passwordVisible = !passwordVisible)"
              :error-messages="passwordErrors"
            ></v-text-field>
            <v-btn color="primary" type="submit" class="mt-6" block>
              Se connecter
            </v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      password: "",
      email: "",
      emailErrors: [],
      passwordErrors: [],
      passwordVisible: false,
    };
  },
  methods: {
    handleLogin() {
      if (!this.email) {
        this.emailErrors.push("L'adresse e-mail est requise");
        return;
      } else if (!/.+@.+\..+/.test(this.email)) {
        this.emailErrors.push("L'adresse e-mail doit être valide");
        return;
      } else {
        this.emailErrors = [];
      }

      if (!this.password) {
        this.passwordErrors.push("Le mot de passe est requis");
        return;
      } else {
        this.passwordErrors = [];
      }

      if (this.email && this.password) {
        this.$router.push("/home");
        // Call login API
      }
    },
  },
};
</script>

<style>
.login-image {
  height: 100vh;
  padding: 0;
  margin: 0;
  background-image: url("https://previews.123rf.com/images/niloo138/niloo1381410/niloo138141000006/32402432-eier-und-milchprodukte-in-den-regalen-in-den-k%C3%BChlschrank-in-einem-supermarkt.jpg");
  background-size: cover;
  background-position: center;
}

.logo {
  max-width: 200px;
  margin-bottom: 48px;
  display: flex;
}
</style>
