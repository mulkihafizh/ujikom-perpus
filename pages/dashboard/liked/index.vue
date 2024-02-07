<template>
  <div></div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    definePageMeta({
      middleware: "is-login",
      layout: "dashboard",
    });
    useSeoMeta({
      title: "Liked",
      description: "Liked page",
    });
  },
});
</script>

<style lang="scss" scoped></style>
