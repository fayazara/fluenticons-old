<template>
  <main class="flex">
    <section class="flex-grow">
      <div
        class="
          h-16
          border-b
          sticky
          top-0
          z-50
          bg-white bg-opacity-50
          backdrop-filter backdrop-blur
          flex
          items-center
          px-8
        "
      >
        <div class="">
          <p class="text-lg font-semibold">Fluent Icons</p>
        </div>
      </div>
      <div class="container mx-auto p-8">
        <div class="grid grid-cols-6 gap-6">
          <IconCard
            v-for="(icon, i) in filledIcons.slice(0, elementsToShow)"
            :key="i"
            :icon="icon"
            @setIcon="
              (payload) => {
                selectedIcon = payload;
              }
            "
          />
        </div>
        <div class="my-8">
          <button
            class="
              block
              border
              rounded-lg
              mx-auto
              px-6
              py-3
              hover:bg-gray-100
              transition-colors
              text-sm
            "
            @click="showMore"
          >
            Show More Icons
          </button>
        </div>
      </div>
    </section>

    <IconEditor :icon="selectedIcon" />
  </main>
</template>

<script>
import filledIcons from "~/assets/filled.json";
export default {
  data() {
    return {
      filledIcons,
      elementsToShow: 48,
      selectedIcon: {
        name: "Preview",
        componentName: "FluentIconFilledSticker",
      },
    };
  },
  methods: {
    showMore() {
      this.elementsToShow += 48;
    },
  },
};
</script>
