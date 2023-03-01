<template>
  <v-card color="light">
    <v-card-title>{{ selectedShape.name }}</v-card-title>
    <v-card-text>
      <div>Consumption: {{ selectedShape.consumption }}</div>
      <div>Temperature: {{ selectedShape.temperature }}°C</div>
      <div>Ambience: {{ selectedShape.ambience }}</div>
      <div>Soufflage: {{ selectedShape.soufflage }}</div>
      <div>Type: {{ selectedShape.type }}</div>
      <v-progress-linear
        :value="selectedShape.doors"
        color="green"
        height="5"
      ></v-progress-linear>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "MapInfoPopup",
  props: {
    selectedShape: {
      type: Object,
      required: true,
    },
  },
};
</script>
