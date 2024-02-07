<template>
  <div class="w-full"></div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    definePageMeta({
      middleware: ["is-login", "is-admin"],
      layout: "dashboard",
    });
    useSeoMeta({
      title: "Dashboard Admin",
      description: "Dashboard Admin page",
    });
  },
});
</script>

<style scoped></style>
