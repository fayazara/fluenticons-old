<template>
  <aside class="editor-sidebar">
    <div class="h-16 border-b dark:border-gray-700 flex-between px-4">
      <div class="text-sm font-medium">
        {{ icon ? icon.name.replace(/([A-Z])/g, " $1") : "Preview" }}
      </div>
      <button
        class="
          focus:outline-none
          p-2
          rounded-full
          focus:bg-gray-100
          hover:bg-gray-100
          dark:focus:bg-gray-700
          dark:hover:bg-gray-700
        "
        @click="favoriteToggle"
      >
        <FluentIconFilledHeart
          class="text-gray-500 h-5 w-5"
          v-if="isAFavorite"
        />
        <FluentIconOutlinedHeart class="text-gray-500 h-5 w-5" v-else />
      </button>
    </div>
    <div class="h-64">
      <div class="icon-editor-panel dots-pattern-background">
        <component
          :is="icon.componentName"
          class="h-32 w-32"
          :style="{ color }"
          ref="icon"
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
            @input="colorHasChanged = true"
          ></v-swatches>
        </div>
      </li>
      <li>
        <div class="px-4 py-3 flex-between text-sm">
          <p class="font-semibold">Copy Snippet</p>
          <div class="inline-flex rounded overflow-hidden">
            <button @click="copy('vue')" class="btn-copy">Vue</button>
            <button @click="copy('react')" class="btn-copy">React</button>
            <button @click="copy('svg')" class="btn-copy">Svg</button>
          </div>
        </div>
      </li>
      <li>
        <div class="px-4 py-3 flex-between text-sm">
          <p class="font-semibold">Download</p>
          <div class="inline-flex rounded overflow-hidden">
            <button @click="downloadIcon('svg')" class="btn-copy">Svg</button>
            <button @click="downloadIcon('png')" class="btn-copy">Png</button>
          </div>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script>
import { getIconSnippet, svgToImage } from "../../utils/icon";
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
      colorHasChanged: false,
    };
  },
  watch: {
    "$colorMode.preference": function (val) {
      if (!this.colorHasChanged) {
        if (val === "dark") this.color = "#fff";
        else this.color = "#212121";
      }
    },
  },
  methods: {
    favoriteToggle() {
      if (this.isAFavorite) {
        this.$store.commit("unFavoriteIcon", this.icon);
        this.showToast("Removed from favorites");
      } else {
        this.$store.commit("favoriteIcon", this.icon);
        this.showToast("Added to favorites");
      }
    },
    async copy(type) {
      try {
        let snippet = await getIconSnippet(
          type,
          this.icon.svgFileName,
          this.color
        );
        this.showToast("Copied to clipboard");
        await this.$copyText(snippet);
      } catch (err) {
        this.$toast.error(err.message);
      }
    },
    showToast(message) {
      this.$toast.show(`
            <div class="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="h-5 w-5 flex-shrink-0 text-green-500"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 16 16"
              >
                <g fill="none">
                  <path
                    d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm2.12 4.164L7.25 9.042L5.854 7.646a.5.5 0 1 0-.708.708l1.75 1.75a.5.5 0 0 0 .708 0l3.224-3.234a.5.5 0 0 0-.708-.706z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
              <p class="flex-1">${message}</p>
            </div>
        `);
    },
    downloadIcon(type) {
      if (!type) return;
      switch (type) {
        case "svg":
          this.downloadFile(
            `/icons/${this.icon.svgFileName}`,
            this.icon.svgFileName
          );
          break;
        case "png":
          let self = this;
          let pngDefaults = {
            svg: this.$refs.icon.$el,
            mimetype: "image/png",
            width: 500,
            height: 500,
            quality: 1,
            outputFormat: "base64",
          };
          svgToImage(pngDefaults)
            .then(function (outputData) {
              self.downloadFile(
                outputData,
                `${self.icon.svgFileName.replace(".svg", "")}.png`
              );
            })
            .catch(function (err) {
              console.log(err);
            });
          break;
      }
    },
    downloadFile(url, filename) {
      let link = document.createElement("a");
      link.style.opacity = "0";
      link.download = filename;
      link.href = url;
      link.click();
      link.remove();
    },
  },
  computed: {
    isAFavorite() {
      return this.$store.getters.isAFavorite(this.icon.componentName);
    },
  },
};
</script>