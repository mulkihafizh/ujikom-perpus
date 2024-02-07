import { defineStore } from "pinia";

export const useSidebarStore = defineStore({
  id: "sidebar",
  state: () => ({
    isOpen: true,
  }),
  actions: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
  },
});
