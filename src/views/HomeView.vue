<template>
  <div>
    <!-- <img
      src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Sample_Floorplan.jpg"
    /> -->
    <router-view></router-view>
    <test-counter v-if="false"></test-counter>
  </div>
</template>

<script>
import TestCounter from "../components/TestCounter.vue";
export default {
  components: { TestCounter },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "HomeView",
  mounted() {},
  computed: {},
};
</script>
