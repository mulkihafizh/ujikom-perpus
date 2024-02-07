<template>
  <div class="dark:bg-bg min-h-screen flex flex-col px-[4%] pt-20">
    <header>
      <h1 class="text-2xl text-white">Form Tambah Buku</h1>
    </header>
    <main class="pt-8">
      <form
        @submit.prevent="storeData"
        class="flex flex-col gap-4"
        enctype="multipart/form-data"
      >
        <div class="input-group grid grid-cols-2 gap-8">
          <div class="flex flex-col gap-4">
            <div class="input-group flex flex-col gap-2">
              <label for="judul" class="text-xl text-white">Judul Buku</label>
              <input
                required
                type="text"
                id="judul"
                v-model="data.judul"
                class="rounded-xl border bg-secondary border-primary text-white px-4 py-2 focus:outline-none"
                placeholder="Judul Buku"
              />
            </div>
            <div class="input-group flex flex-col gap-2">
              <label for="penulis" class="text-xl text-white"
                >Penulis Buku</label
              >
              <input
                required
                type="text"
                id="penulis"
                v-model="data.penulis"
                class="rounded-xl bg-secondary border-primary text-white border bg-bg-dark px-4 py-2 focus:outline-none"
                placeholder="Penulis Buku"
              />
            </div>
            <div class="input-group flex flex-col gap-2">
              <label for="sinopsis" class="text-xl text-white"
                >Sinopsis Buku</label
              >
              <textarea
                required
                id="sinopsis"
                v-model="data.sinopsis"
                class="bg-secondary p-4 text-white focus:outline-none border-primary border rounded-xl"
                rows="9"
                cols=""
              ></textarea>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <div class="input-group flex flex-col gap-2">
              <label for="penerbit" class="text-xl text-white"
                >Penerbit Buku</label
              >
              <input
                required
                type="text"
                id="penerbit"
                v-model="data.penerbit"
                class="rounded-xl bg-secondary border-primary text-white border bg-bg-dark px-4 py-2 focus:outline-none"
                placeholder="Penerbit Buku"
              />
            </div>
            <div class="input-group flex flex-col gap-2">
              <label for="tahun" class="text-xl text-white"
                >Tahun Terbit Buku</label
              >
              <input
                required
                type="number"
                id="tahun"
                v-model="data.tahunTerbit"
                class="rounded-xl border bg-secondary border-primary text-white px-4 py-2 focus:outline-none"
                placeholder="Tahun Terbit Buku"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="input-group flex flex-col gap-2">
                <label for="genre" class="text-xl text-white">Genre Buku</label>
                <select
                  @change="addGenre"
                  name="genre"
                  id="genre"
                  class="rounded-xl border bg-secondary border-primary text-white px-4 py-2 focus:outline-none"
                >
                  <option value="" selected hidden disabled>
                    -- Pilih Genre --
                  </option>
                  <option
                    v-for="(g, index) in genre"
                    :key="index"
                    :value="g.name"
                    class="bg-secondary text-white"
                  >
                    {{ g.name }}
                  </option>
                </select>
                <div class="flex flex-wrap gap-2 text-white">
                  <span
                    v-for="(g, index) in data.genre"
                    :key="index"
                    class="bg-primary p-1 rounded-md text-sm"
                    >{{ g }}
                    <Icon
                      name="ri:close-line"
                      @click="removeGenre(index)"
                      class="cursor-pointer"
                  /></span>
                </div>
              </div>
              <div>
                <div class="input-group flex flex-col gap-2">
                  <label for="cover" class="text-xl text-white"
                    >Cover Buku</label
                  >
                  <input
                    required
                    type="file"
                    id="cover"
                    v-on:change="loadFile"
                    class="rounded-xl hidden border bg-secondary border-primary text-white px-4 py-2 focus:outline-none"
                  />
                </div>
                <div class="preview flex">
                  <div
                    class="add-img relative flex items-center"
                    @click="triggerClick"
                  >
                    <img
                      width="150"
                      height="200"
                      src="https://via.placeholder.com/150x200"
                      alt="cover"
                      id="output"
                      class="rounded-xl max-w-[150px] max-h-[200px] object-cover"
                    />
                    <div
                      class="absolute add-btn top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 rounded-xl text-white cursor-pointer flex flex-col p-5 text-center items-center justify-center"
                    >
                      <Icon name="ic:round-add" size="48px" />
                      <p class="text-xs font-bold">Tambah Gambar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex">
          <button
            type="submit"
            class="rounded-xl bg-primary text-white py-2 px-4 hover:bg-opacity-70 transition-all duration-300"
          >
            Tambah Buku
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
  async setup() {
    const data = ref<BookTypes>({
      judul: "",
      penulis: "",
      penerbit: "",
      tahunTerbit: 0,
      sinopsis: "",
      cover: "",
      genre: [],
    });
    const genre = await $fetch("/api/books/genre").then((res) => {
      return JSON.parse(res);
    });

    const toast = useToast();
    return {
      data,
      toast,
      genre,
    };
  },
  methods: {
    addGenre(event: any) {
      this.data.genre.push(event.target.value);
      this.genre = this.genre.filter((g: any) => g.name !== event.target.value);
      event.target.value = "";
      console.log(this.data.genre);
    },
    removeGenre(index: number) {
      this.genre.push({ name: this.data.genre[index] });
      this.data.genre.splice(index, 1);
    },
    triggerClick() {
      const input = document.getElementById("cover");
      input?.click();
    },
    loadFile(event: any) {
      let image = document.getElementById("output");
      this.data.cover = event.target.files[event.target.files.length - 1];
      document.getElementsByClassName("add-btn")[0].classList.add("hidden");
      (image as HTMLImageElement).src = URL.createObjectURL(
        event.target.files[event.target.files.length - 1]
      );
    },
    async storeData() {
      const formData = new FormData();
      formData.append("judul", this.data.judul);
      formData.append("penulis", this.data.penulis);
      formData.append("penerbit", this.data.penerbit);
      formData.append("tahun_terbit", this.data.tahunTerbit.toString());
      formData.append("sinopsis", this.data.sinopsis);
      formData.append("cover", this.data.cover);
      formData.append("genre", this.data.genre.join(","));
      try {
        $fetch("/api/admin/books", {
          method: "POST",
          body: formData,
        }).then((res) => {
          this.toast.success("Buku berhasil ditambahkan");
          this.$router.replace("/dashboard-admin/books");
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style scoped></style>
