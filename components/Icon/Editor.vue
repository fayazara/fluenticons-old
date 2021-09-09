<template>
  <aside
    class="
      h-screen
      sticky
      top-0
      border-l
      w-72
      bg-gray-50
      dark:bg-gray-800
      dark:border-gray-700
    "
  >
    <div class="h-16 border-b dark:border-gray-700 flex items-center">
      <div class="px-4 text-sm font-medium">
        {{ icon ? icon.name.replace(/([A-Z])/g, " $1") : "Preview" }}
      </div>
    </div>
    <div class="h-64">
      <div
        class="
          m-4
          h-full
          rounded-lg
          border
          dark:border-gray-700
          bg-white
          dark:bg-gray-800
          flex
          items-center
          justify-center
          flex-col
          dots-pattern-background
        "
      >
        <component
          :is="icon.componentName"
          class="h-32 w-32"
          :style="{ color }"
        />
      </div>
    </div>
    <ul class="divide-y divide-gray-300 dark:divide-gray-700">
      <li>
        <div class="px-4 py-3 flex-between">
          <p class="text-sm font-semibold">Color</p>
          <v-swatches
            v-model="color"
            show-fallback
            fallback-input-type="color"
            popover-x="left"
            :trigger-style="{ width: '30px', height: '30px' }"
          ></v-swatches>
        </div>
      </li>
      <li>
        <div class="px-4 py-3 flex-between text-sm">
          <p class="font-semibold">Copy Snippet</p>
          <div class="inline-flex rounded overflow-hidden">
            <button
              @click="copy('vue')"
              class="
                bg-gray-300
                hover:bg-gray-400
                dark:bg-gray-500
                dark:hover:bg-gray-600
                text-gray-800
                dark:text-gray-300
                py-1
                px-2
              "
            >
              Vue
            </button>
            <button
              @click="copy('react')"
              class="
                bg-gray-300
                hover:bg-gray-400
                dark:bg-gray-500
                dark:hover:bg-gray-600
                text-gray-800
                dark:text-gray-300
                py-1
                px-2
              "
            >
              React
            </button>
            <button
              @click="copy('svg')"
              class="
                bg-gray-300
                hover:bg-gray-400
                dark:bg-gray-500
                dark:hover:bg-gray-600
                text-gray-800
                dark:text-gray-300
                py-1
                px-2
              "
            >
              Svg
            </button>
          </div>
        </div>
      </li>
      <li>
        <div class="px-4 py-3 flex-between text-sm">
          <p class="font-semibold">Download</p>
          <div class="inline-flex">
            <button
              @click="copy('vue')"
              class="
                bg-gray-300
                hover:bg-gray-400
                dark:bg-gray-500
                dark:hover:bg-gray-600
                text-gray-800
                dark:text-gray-300
                py-1
                px-2
                rounded-l
              "
            >
              Svg
            </button>
            <button
              class="
                bg-gray-300
                hover:bg-gray-400
                dark:bg-gray-500
                dark:hover:bg-gray-600
                text-gray-800
                dark:text-gray-300
                py-1
                px-2
                rounded-r
              "
            >
              Png
            </button>
          </div>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script>
import { getIconSnippet } from "../../utils/icon";
export default {
  props: {
    icon: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      color: "#212121",
    };
  },
  methods: {
    async copy(type) {
      try {
        let snippet = await getIconSnippet(
          type,
          this.icon.svgFileName,
          this.color
        );
        await this.$copyText(snippet);
        this.$toast.success(`Copied to clipboard`);
      } catch (err) {
        this.$toast.error(err.message);
      }
    },
  },
};
</script>