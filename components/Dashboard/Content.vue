<template>
  <div class="px-[4%] w-full text-white">
    <div class="flex flex-col gap-4">
      <h1 class="text-2xl">Untuk Anda</h1>
      <main>
        <Swiper
          :modules="[SwiperPagination, SwiperAutoplay, SwiperMousewheel]"
          :centered-slides="false"
          :slides-per-view="4.5"
          :space-between="20"
          :mousewheel="{
            invert: false,
          }"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :pagination="{
            clickable: true,
            el: '.swiper-pagination',
          }"
        >
          <SwiperSlide v-for="(book, index) in books" class="py-8">
            <div class="book-card">
              <NuxtImg
                loading="lazy"
                placeholder
                :src="`/cover/${book.cover}`"
                width="200"
                alt="book-cover"
                class="rounded-md w-64 h-96 object-cover"
              />
              <div class="book-info">
                <h1 class="text-sm">{{ book.judul }}</h1>
              </div>
            </div>
          </SwiperSlide>
          <div class="swiper-pagination *:!bg-primary"></div>
        </Swiper>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import type { BookTypes } from "~/types/book";
export default defineComponent({
  props: {
    books: {
      type: Array as PropType<BookTypes[]>,
      required: true,
    },
  },
  async setup(props) {
    let books = [...props.books];
    const shuffle = (array: any) => {
      let currentIndex = array.length,
        randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    };
    books = await shuffle(books);
    return {
      books,
    };
  },
});
</script>

<style scoped></style>
