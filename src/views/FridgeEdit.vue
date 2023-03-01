<template>
  <v-container v-if="fridge">
    <v-breadcrumbs :items="breadcrumbItems"></v-breadcrumbs>
    <v-card>
      <v-card-title>
        <h2>Modifier</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="fridge.name" label="Nom"></v-text-field>
          <v-select
            v-model="fridge.type"
            :items="types"
            label="Type"
          ></v-select>
          <v-btn type="submit" color="primary">Enregistrer</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      fridge: {
        name: "",
        type: "",
      },
      types: ["fridge", "freezer"],
    };
  },
  computed: {
    breadcrumbItems() {
      return [
        {
          text: "Home",
          disabled: false,
          href: "/home",
        },
        { text: this.fridge.name, href: "/home/" + this.fridge.id },
        { text: "Modifier", disabled: true },
      ];
    },
  },
  methods: {
    getFridge() {
      // Retrieve the mockData from localStorage
      const mockData = JSON.parse(localStorage.getItem("mockData"));

      // Filter the mockData to get the item with the same id as the page
      const fridgeId = this.$route.params.id;
      const fridge = mockData.find((item) => item.id == fridgeId);

      // Update the component's data with the retrieved fridge data
      this.fridge = fridge;
      // Update the breadcrumbs item for fridge name
      this.items[1].text = this.fridge.name;
    },
    submitForm() {
      // Do something with the form data
      let fridges = JSON.parse(localStorage.getItem("mockData"));
      fridges = fridges.map((fridge) => {
        if (fridge.id == this.fridge.id) {
          return this.fridge;
        }
        return fridge;
      });
      localStorage.setItem("mockData", JSON.stringify(fridges));
      // go back to home
      this.$router.push("/home");
    },
  },
  mounted() {
    this.getFridge();
  },
};
</script>
