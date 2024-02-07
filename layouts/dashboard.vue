<template>
  <div class="dark:bg-bg w-full min-h-screen">
    <Sidebar />
    <div
      class="relative duration-500 transition-all overflow-x-hidden overflow-y-auto"
      :class="
        store.isOpen
          ? ' translate-x-[250px] w-[calc(100vw-255px)]'
          : 'w-full translate-x-0'
      "
    >
      <slot class="overflow-x-hidden" />
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  async setup() {
    const store = useSidebarStore();
    const booksStore = useBooksStore();
    await $fetch("/api/books/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      booksStore.setBooks(JSON.parse(res));
    });

    return {
      store,
    };
  },
});
</script>
