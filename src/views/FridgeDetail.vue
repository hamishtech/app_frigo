<template>
  <v-container v-if="fridge">
    <!-- Fridge name row -->
    <v-row>
      <v-col>
        <v-breadcrumbs :items="breadcrumbItems" divider="/"></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-left">
        <h1>{{ fridge.name }}</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn
          @click="
            $router.push({ name: 'fridgeEdit', params: { id: fridge.id } })
          "
        >
          Modifier
          <v-icon right dark>mdi-pencil</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Fridge image and additional information row -->
    <v-row align="start">
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <v-img :src="fridgeImageSrc" aspect-ratio="1"></v-img>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <div>
          <div class="font-weight-bold ma-2">
            {{ fridgeAdditionalInfoTitle }}
          </div>
          <div
            v-for="(info, index) in fridgeAdditionalInfo"
            :key="index"
            class="ma-2"
          >
            <div class="font-weight-bold">{{ info.title }}</div>
            <div>{{ info.value }}</div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Fridge technical details row -->
    <v-row>
      <v-col>
        <h2>Temperatures de meubles</h2>
        <v-row align="start">
          <v-col cols="3">
            <p class="">Conso actuelle</p>
            <p>
              <span class="font-weight-bold">{{ fridge.consumption }}</span>
            </p>
          </v-col>
          <v-col cols="3">
            <p class="">Température soufflage</p>
            <p>
              <span class="font-weight-bold">{{ fridge.soufflage }}°</span>
            </p>
          </v-col>
          <v-col cols="3">
            <p class="">Température produit</p>
            <p>
              <span class="font-weight-bold">{{ fridge.temperature }}°</span>
            </p>
          </v-col>
          <v-col cols="3">
            <p class="">Température Ambiance</p>
            <p>
              <span class="font-weight-bold">{{ fridge.ambience }}°</span>
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <div v-else>
    <h1>Chargement...</h1>
  </div>
</template>

<script>
export default {
  name: "FridgeDetailPage",
  data() {
    return {
      fridgeName: "Fridge Name",
      fridgeImageSrc:
        "https://www.display.de/wp-content/uploads/2022/02/LAD_Epta.jpg",
      fridgeAdditionalInfo: [
        {
          title: "Porte A",
          value: "28 portes",
        },
        {
          title: "Porte B",
          value: "12 portes",
        },
        {
          title: "Porte C",
          value: "20 portes",
        },
      ],
      fridge: null,
    };
  },
  computed: {
    breadcrumbItems() {
      return [
        { text: "Home", href: "/home" },
        { text: this.fridge.name, disabled: true },
      ];
    },
  },
  methods: {
    getFridge() {
      // Retrieve the mockData from localStorage
      const mockData = JSON.parse(localStorage.getItem("mockData"));

      // Filter the mockData to get the item with the same id as the page
      const fridgeId = this.$route.params.id;
      const fridge = mockData.find((item) => item.id === parseInt(fridgeId));
      // Update the component's data with the retrieved fridge data
      this.fridge = fridge;
    },
  },
  mounted() {
    this.getFridge();
  },
};
</script>
