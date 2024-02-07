<template>
  <div
    class="w-screen h-screen bg-blue-300 flex flex-col items-center justify-center"
  >
    <div class="card bg-white rounded-xl p-10 flex flex-col gap-6">
      <h1 class="text-2xl font-bold">Login</h1>
      <form @submit.prevent="login" class="flex flex-col gap-4">
        <div class="form-group flex flex-col gap-2 min-w-[350px]">
          <label for="email">Email</label>
          <input
            class="rounded-xl focus:outline-none border px-4 py-2 text-lg"
            id="email"
            type="email"
            placeholder="Email"
            v-model="data.email"
            required
          />
        </div>
        <div class="form-group flex flex-col gap-2 min-w-[350px]">
          <label for="password">Password</label>
          <input
            class="rounded-xl focus:outline-none border px-4 py-2 text-lg"
            id="password"
            type="password"
            placeholder="Password"
            v-model="data.password"
            required
          />
        </div>
        <button
          type="submit"
          :disabled="submit"
          class="rounded-xl bg-blue-400 py-2 text-lg hover:bg-opacity-70 duration-300 text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import type { UserTypes } from "@/types/user";
import { useToast } from "vue-toastification";
const toast = useToast();
export default defineComponent({
  setup() {
    const data = reactive<UserTypes>({
      username: "",
      email: "",
      password: "",
      role: "",
    });
    const submit = ref<boolean>(false);
    definePageMeta({
      middleware: ["is-guest"],
    });
    return {
      data,
      submit,
    };
  },

  methods: {
    async login() {
      this.submit = true;
      try {
        await $fetch("/api/user/login", {
          method: "POST",
          body: JSON.stringify(this.data),
        }).then((res) => {
          this.submit = false;
          const role = JSON.parse(res).user;
          this.$cookies.set("role", role.role);
          toast.success("Login success");
          if (role.role == "Admin") {
            this.$router.replace("/dashboard-admin");
          } else {
            this.$router.replace("/dashboard");
          }
        });
      } catch (error) {
        this.submit = false;
      }
    },
  },
});
</script>
