<template>
  <div
    class="min-w-[250px] dark:bg-secondary fixed h-screen p-4 flex flex-col gap-4 duration-300 z-[999]"
    :class="store.isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <header
      :class="store.isOpen ? '-right-10' : '-right-56'"
      class="flex absolute items-center gap-4 top-3 cursor-pointer text-white hover:text-opacity-80 duration-300 transition-all"
    >
      <Icon
        :name="store.isOpen ? 'ri:close-fill' : 'ri:menu-3-line'"
        size="28px"
        @click="closeSidebar"
      />
      <nuxt-link
        to="/dashboard"
        class="flex items-center duration-300 transition-all"
        :class="store.isOpen ? ' hidden' : ''"
      >
        <NuxtImg
          loading="lazy"
          decoding="async"
          placeholder
          :width="50"
          :height="50"
          src="/logo.png"
        />
        <h1 class="text-2xl font-bold text-white">BacaBuku</h1>
      </nuxt-link>
    </header>
    <header>
      <nuxt-link to="/dashboard" class="flex items-center">
        <NuxtImg
          loading="lazy"
          decoding="async"
          :width="50"
          :height="50"
          src="/logo.png"
        />
        <h1 class="text-2xl font-bold text-white">BacaBuku</h1>
      </nuxt-link>
    </header>
    <main class="grow flex flex-col justify-between pb-8">
      <nav class="flex flex-col gap-4">
        <nuxt-link
          active-class="bg-primary bg-red p-2 rounded-md"
          v-for="route in routeData"
          :to="route.path"
          class="flex items-center gap-2 p-2 rounded-md text-white hover:bg-primary hover:text-opacity-90 transition-all"
        >
          <Icon :name="route.icon" size="24px" />
          {{ route.name }}
        </nuxt-link>
      </nav>
      <button
        @click="logout"
        class="flex items-center gap-2 p-2 rounded-md text-white hover:bg-red-600 hover:text-opacity-90 transition-all justify-self-end"
      >
        <Icon name="material-symbols:logout-rounded" size="24px" />
        Logout
      </button>
    </main>
  </div>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();
export default defineComponent({
  setup() {
    const store = useSidebarStore();
    let routeData = [
      {
        name: "Home",
        path: "/dashboard",
        icon: "humbleicons:home",
      },
      {
        name: "Koleksi",
        path: "/dashboard/collection",
        icon: "material-symbols:bookmarks-outline-rounded",
      },
      {
        name: "Disukai",
        path: "/dashboard/liked",
        icon: "material-symbols:favorite-outline-rounded",
      },
    ];

    if (useCookie("role").value == "Admin") {
      routeData = [
        {
          name: "Home",
          path: "/dashboard-admin",
          icon: "humbleicons:home",
        },
        {
          name: "Petugas",
          path: "/dashboard-admin/staff",
          icon: "ic:baseline-people-outline",
        },
        {
          name: "Buku",
          path: "/dashboard-admin/books",
          icon: "ic:outline-book",
        },
      ];
    }

    return {
      routeData,
      store,
    };
  },
  methods: {
    closeSidebar() {
      this.store.toggleSidebar();
    },
    async logout() {
      await $fetch("/api/user/logout", {
        method: "GET",
      }).then(() => {
        this.$router.push("/");
        toast.success("Logout success");
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>
