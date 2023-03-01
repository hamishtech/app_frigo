<template>
  <div class="d-flex align-items-center">
    <div
      :style="{ backgroundColor: color, width: '16px', height: '16px' }"
      class="mr-2"
    ></div>
    <div class="text-body-2">{{ label }}</div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
