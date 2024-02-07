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
      title: "Collection",
      description: "Collection page",
    });
  },
});
</script>

<style lang="scss" scoped></style>
