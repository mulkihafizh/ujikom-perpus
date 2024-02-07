<template>
  <div class="w-full px-[4%] pt-16 text-white flex flex-col gap-8">
    <header>
      <h1 class="text-2xl font-bold">Data Akun Petugas</h1>
    </header>
    <div class="add flex justify-end">
      <nuxt-link
        to="/dashboard-admin/staff/create"
        class="bg-primary p-2 rounded-xl text-white flex items-center gap-2 hover:bg-opacity-70 transition-all duration-300"
      >
        <Icon name="ic:round-add" size="24px" />
        Tambah Petugas
      </nuxt-link>
    </div>
    <main class="grow">
      <table
        class="w-full bg-secondary text-center rounded-xl overflow-hidden border-separate text-white border-spacing-0"
      >
        <thead class="bg-primary rounded-xl border-none *:py-3 *:px-1">
          <th>No</th>
          <th>Nama User</th>
          <th>Email</th>
          <th>Aksi</th>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const booksStore = useBooksStore();
    const books = booksStore.books;
    definePageMeta({
      middleware: ["is-login", "is-admin"],
      layout: "dashboard",
    });
    useSeoMeta({
      title: "Dashboard Admin",
      description: "Dashboard Admin page",
    });
    return {
      books,
    };
  },
});
</script>

<style scoped></style>
