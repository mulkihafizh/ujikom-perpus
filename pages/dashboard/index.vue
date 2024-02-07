<template>
  <div class="min-h-screen overflow-x-hidden pb-16">
    <DashboardHeader :books="books" />
    <DashboardContent :books="books" />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const booksStore = useBooksStore();
    const books = booksStore.books;
    definePageMeta({
      middleware: ["is-login", "is-user"],
      layout: "dashboard",
    });
    useSeoMeta({
      title: "Dashboard",
      description: "Dashboard page",
    });
    return {
      books,
    };
  },
});
</script>

<style scoped></style>
