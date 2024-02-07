<template>
  <div class="dark:bg-bg min-h-screen flex flex-col px-[4%] pt-20">
    <header>
      <h1 class="text-2xl text-white">Form Tambah Petugas</h1>
    </header>
    <main class="pt-8">
      <form class="flex flex-col gap-4" enctype="multipart/form-data">
        <div class="input-group grid grid-cols-2 gap-8">
          <div class="flex flex-col gap-4">
            <div class="input-group flex flex-col gap-2">
              <label for="username" class="text-xl text-white"
                >Username Petugas</label
              >
              <input
                required
                type="text"
                id="username"
                class="rounded-xl border bg-secondary border-primary text-white px-4 py-2 focus:outline-none"
                placeholder="Username Petugas"
              />
            </div>
            <div class="input-group flex flex-col gap-2">
              <label for="email" class="text-xl text-white"
                >Email Petugas</label
              >
              <input
                required
                type="text"
                id="email"
                class="rounded-xl bg-secondary border-primary text-white border bg-bg-dark px-4 py-2 focus:outline-none"
                placeholder="Email Petugas"
              />
            </div>
            <div class="input-group flex flex-col gap-2">
              <label for="password" class="text-xl text-white"
                >Password Petugas</label
              >
              <input
                required
                type="text"
                id="password"
                class="rounded-xl bg-secondary border-primary text-white border bg-bg-dark px-4 py-2 focus:outline-none"
                placeholder="Password Petugas"
              />
            </div>
          </div>
        </div>
        <div class="flex">
          <button
            type="submit"
            class="rounded-xl bg-primary text-white py-2 px-4 hover:bg-opacity-70 transition-all duration-300"
          >
            Tambah Petugas
          </button>
        </div>
      </form>
    </main>
  </div>
  <div class="absolute top-5 left-5">
    <nuxt-link
      href="/dashboard-admin/books"
      class="text-xl flex items-center gap-2 bg-primary p-2 rounded-xl text-white hover:bg-opacity-70 transition-all duration-300"
    >
      <Icon name="ri:arrow-left-line" size="24px" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import type { BookTypes } from "@/types/book";
import { useToast } from "vue-toastification";
export default defineComponent({
  async setup() {},
  methods: {
    // async storeData() {
    //   try {
    //     $fetch("/api/admin/books", {
    //       method: "POST",
    //       body: formData,
    //     }).then((res) => {
    //       this.toast.success("Buku berhasil ditambahkan");
    //       this.$router.replace("/dashboard-admin/books");
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
});
</script>

<style scoped></style>
