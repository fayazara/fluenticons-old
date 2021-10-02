<template>
  <div class="border-t border-gray-300 dark:border-gray-700">
    <div>
      <div
        class="
          overflow-hidden
          grid grid-cols-2
          border-b border-gray-300
          dark:border-gray-700
        "
      >
        <input
          type="text"
          class="bg-transparent focus:outline-none px-4 py-2"
          placeholder="PNG Size"
          v-model="size"
        />
        <button
          class="
            flex-between
            px-4
            py-2
            bg-gray-100
            dark:bg-[#070d19]
            border-l border-gray-300
            dark:border-gray-700
          "
          @click="downloadCustomSize()"
        >
          <p>PNG</p>
          <FluentIconOutlinedArrowDownload class="text-gray-500 h-4 w-4" />
        </button>
      </div>
      <p class="text-center text-gray-500 text-xs my-4">
        WIP, Contribute if interested.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: null,
    };
  },
  methods: {
    downloadCustomSize() {
      if (this.size >= 12) {
        this.$emit("downloadCustomSize", this.size);
      }
    },
  },
};
</script>