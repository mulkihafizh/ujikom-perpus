<template>
  <div class="relative text-white">
    <h1 class="text-2xl absolute z-10 px-[4%] pt-16">Latest Release</h1>
    <Swiper
      :slidesPerView="1"
      :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
      :loop="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :navigation="{
        enabled: true,
        nextEl: '.next-slide',
        prevEl: '.prev-slide',
      }"
      :onActiveIndexChange="onSlideChange"
    >
      <SwiperSlide v-for="(i, index) in books">
        <div
          :style="{
            background: `  linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.2) 0%,
            #191a1c 100%
          ),
          url('/cover/${i.cover}')`,
            backgroundSize: 'cover',
          }"
          class="h-[60vh] w-full px-[4%] py-16 flex flex-col gap-4"
        >
          <main class="flex gap-4 pt-12">
            <NuxtImg
              placeholder
              decoding="async"
              loading="lazy"
              :src="`/cover/${i.cover}`"
              :width="200"
              class="rounded-md min-w-[200px] min-h-[250px] max-w-[200px] max-h-[250px] object-cover"
            />
            <div class="flex flex-col gap-2">
              <h1 class="text-4xl text-white font-bold">
                {{ i.judul }}
                <span>
                  <Icon
                    class="bg-primary p-1 rounded-lg cursor-pointer hover:bg-opacity-90 transition-all duration-300"
                    name="material-symbols:bookmark-add"
                    size="28px"
                  />
                </span>
              </h1>
              <div class="genres flex gap-2">
                <span
                  v-for="(genre, index) in i.genre"
                  :key="index"
                  class="bg-primary p-1 rounded-md text-xs"
                  >{{ genre }}</span
                >
              </div>
              <p>
                {{ i.sinopsis }}
              </p>
            </div>
          </main>
        </div>
      </SwiperSlide>
      <div class="absolute bottom-10 right-10 z-10 flex gap-4">
        <div class="prev-slide cursor-pointer">
          <Icon size="24px" :name="'material-symbols:arrow-back-ios-rounded'" />
        </div>
        <div class="active-index min-w-4 text-center">
          <span>{{ activeIndex + 1 }}</span>
        </div>
        <div class="next-slide cursor-pointer">
          <Icon
            size="24px"
            :name="'material-symbols:arrow-forward-ios-rounded'"
          />
        </div>
      </div>
    </Swiper>
  </div>
</template>

<script lang="ts">
import type { BookTypes } from "~/types/book";
export default defineComponent({
  name: "Header",
  props: {
    books: {
      type: Array as PropType<BookTypes[]>,
      required: true,
    },
  },
  data: () => ({
    activeIndex: 0,
  }),
  setup(props) {
    let books = [...props.books];
    books = books.slice(0, 3);

    return {
      books,
    };
  },
  methods: {
    onSlideChange(event: any) {
      this.activeIndex = event.realIndex;
    },
  },
});
</script>

<style scoped>
.backgrounds {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, #191a1c 100%);
  background-size: cover;
}
</style>
