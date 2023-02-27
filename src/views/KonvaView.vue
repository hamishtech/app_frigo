<template>
  <div>
    <!-- <img
      src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Sample_Floorplan.jpg"
    /> -->
    <KonvaCanvas></KonvaCanvas>
  </div>
</template>

<script>
import KonvaCanvas from "@/components/KonvaCanvas.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "KonvaView",
  components: { KonvaCanvas },
  mounted() {},
  computed: {},
};
</script>
