<template>
  <aside class="editor-sidebar">
    <div class="h-16 border-b dark:border-gray-700 flex items-center">
      <div class="px-4 text-sm font-medium">
        {{ icon ? icon.name.replace(/([A-Z])/g, " $1") : "Preview" }}
      </div>
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
      pngDefaults: {
        svg: null,
        mimetype: "image/png",
        width: 500,
        height: 500,
        quality: 1,
        outputFormat: "base64",
      },
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
          svgToImage(this.pngDefaults)
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
  mounted() {
    this.pngDefaults.svg = this.$refs.icon.$el;
  },
};
</script>