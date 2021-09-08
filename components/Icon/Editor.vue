<template>
  <aside class="h-screen sticky top-0 border-l w-72 bg-gray-50">
    <div class="h-16 border-b flex items-center">
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
          bg-white
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
    <ul class="divide-y">
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
              @click="getVueSnippet()"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2"
            >
              Vue
            </button>
            <button
              @click="getReactSnippet()"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2"
            >
              React
            </button>
            <button
              @click="getSvgSnippet"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2"
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
              class="
                bg-gray-300
                hover:bg-gray-400
                text-gray-800
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
                text-gray-800
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
import {
  getVueSnippet,
  getSvgSnippet,
  getReactSnippet,
} from "../../utils/icon";
export default {
  props: {
    icon: {
      type: Object,
      default: function () {
        return { name: "hello" };
      },
    },
  },
  data() {
    return {
      color: "#212121",
    };
  },
  methods: {
    async getVueSnippet() {
      const snippet = await getVueSnippet(this.icon.svgFileName);
      try {
        await this.$copyText(snippet);
        this.$toast.show("Copied to clipboard");
      } catch (e) {
        console.error(e);
      }
    },
    async getReactSnippet() {
      const snippet = await getReactSnippet(this.icon.svgFileName);
      try {
        await this.$copyText(snippet);
        this.$toast.show("Copied to clipboard");
      } catch (e) {
        console.error(e);
      }
    },
    async getSvgSnippet() {
      const snippet = await getSvgSnippet(this.icon.svgFileName);
      try {
        await this.$copyText(snippet);
        this.$toast.show("Copied to clipboard");
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>