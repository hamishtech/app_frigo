<template>
  <div>
    <v-tooltip bottom color="transparent">
      <template #activator="{ on, attrs }">
        <span class="text-body-2 font-weight-light mr-1">Légende</span>
        <v-icon v-bind="attrs" v-on="on">mdi-information-outline</v-icon>
      </template>
      <v-card>
        <v-card-text>
          <MapLegendItem
            v-for="(item, index) in legendItems"
            :key="index"
            :color="item.color"
            :label="item.label"
          />
        </v-card-text>
      </v-card>
    </v-tooltip>
  </div>
</template>
<script>
import MapLegendItem from "./MapLegendItem.vue";

export default {
  data() {
    return {
      legendItems: [
        { color: "green", label: "Meuble OK" },
        { color: "yellow", label: "Événement, alerte Mineure" },
        { color: "red", label: "Défaut, alerte Majeure" },
        { color: "grey", label: "Meuble non connecté" },
      ],
    };
  },
  components: { MapLegendItem },
};
</script>
