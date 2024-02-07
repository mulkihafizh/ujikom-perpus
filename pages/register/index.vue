<template>
  <div
    class="w-screen h-screen bg-blue-300 flex flex-col items-center justify-center"
  >
    <div class="card bg-white rounded-xl p-10 flex flex-col gap-6">
      <h1 class="text-2xl font-bold">Register</h1>
      <form @submit.prevent="register" class="flex flex-col gap-4">
        <div class="form-group flex flex-col gap-2 min-w-[350px]">
          <label for="username">Username</label>
          <input
            class="rounded-xl focus:outline-none border px-4 py-2 text-lg"
            id="username"
            type="text"
            placeholder="Username"
            v-model="data.username"
            required
          />
        </div>
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
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import type { UserTypes } from "@/types/user";
export default defineComponent({
  setup() {
    const data = ref<UserTypes>({
      username: "",
      email: "",
      password: "",
      role: "",
    });
    const submit = ref(false);
    useSeoMeta({
      title: "Register",
      description: "Register Page",
    });
    return { data, submit };
  },
  methods: {
    async register() {
      this.submit = true;
      const res = await $fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.data),
      })
        .then((res) => {
          console.log(res);
          this.submit = false;
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
          this.submit = false;
        });
    },
  },
});
</script>

<style scoped></style>
