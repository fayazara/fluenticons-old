<template>
  <div
    class="
      h-16
      border-t border-b
      sticky
      top-0
      z-50
      bg-white bg-opacity-50
      dark:bg-gray-900 dark:bg-opacity-50
      dark:border-gray-700
      backdrop-filter backdrop-blur
      flex-between
      px-8
    "
  >
    <p>
      <span class="text-lg font-medium">Filled Icons</span>
      <span class="text-gray-600">(Solid Filled Style)</span>
    </p>
    <div class="flex-space-x-4">
      <div
        class="
          relative
          flex
          items-center
          overflow-hidden
          rounded-full
          bg-gray-50
          dark:bg-gray-700
        "
      >
        <input
          type="text"
          class="
            focus:outline-none
            bg-transparent
            z-10
            h-full
            rounded-l-full
            px-6
          "
          placeholder="Press / to focus"
          ref="search"
          @input="search"
        />
        <button
          class="
            h-10
            w-10
            flex-center
            bg-gray-100
            dark:bg-gray-800
            hover:bg-gray-200
            z-20
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="text-gray-500 h-5 w-5"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7c-3.868 0-7 3.132-7 7c0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
      <nuxt-link
        :to="altIcons.path"
        class="
          h-10
          w-10
          rounded-full
          flex-center
          bg-gray-100
          dark:bg-gray-800
          hover:bg-gray-200
        "
        v-tooltip="`Switch to ${altIcons.name} Icons`"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="text-gray-500 h-5 w-5"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              d="M16.5 6.5h-5.75a4.25 4.25 0 0 0-4.25 4.25v5.75H5.25A3.25 3.25 0 0 1 2 13.25v-8A3.25 3.25 0 0 1 5.25 2h8a3.25 3.25 0 0 1 3.25 3.25V6.5z"
              fill="currentColor"
            ></path>
            <path
              d="M22 18.75A3.25 3.25 0 0 1 18.75 22h-8a3.25 3.25 0 0 1-3.25-3.25v-8a3.25 3.25 0 0 1 3.25-3.25h8A3.25 3.25 0 0 1 22 10.75v8zm-3.25 1.75a1.75 1.75 0 0 0 1.75-1.75v-8A1.75 1.75 0 0 0 18.75 9h-8A1.75 1.75 0 0 0 9 10.75v8c0 .966.784 1.75 1.75 1.75h8z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      </nuxt-link>
      <button
        @click="toggleDarkMode"
        class="
          h-10
          w-10
          rounded-full
          flex-center
          bg-gray-100
          dark:bg-gray-800
          hover:bg-gray-200
        "
        v-tooltip="'Dark Mode'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="text-gray-500 h-5 w-5"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661a9.964 9.964 0 0 1-3.234-2.983a.75.75 0 0 1 .365-1.131c3.767-1.348 5.785-2.911 6.956-5.146c1.232-2.353 1.551-4.93.689-8.464a.75.75 0 0 1 .769-.926a9.961 9.961 0 0 1 4.457 1.327C21.149 6.1 22.788 12.217 20.025 17zm-8.248-4.903c-1.25 2.388-3.31 4.099-6.817 5.499a8.492 8.492 0 0 0 2.152 1.766a8.501 8.501 0 1 0 8.502-14.725a8.485 8.485 0 0 0-2.792-1.016c.647 3.384.23 6.044-1.045 8.476z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      </button>
    </div>
    <base-search-focus @keyup="focusSearch" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: null,
      debounce: null,
    };
  },
  computed: {
    isDarkMode() {
      return this.$colorMode.preference === "dark" ? true : false;
    },
    altIcons() {
      if (this.$route.path === "/outlined") {
        return {
          name: "Filled",
          path: "/",
        };
      } else {
        return {
          name: "Outlined",
          path: "/outlined",
        };
      }
    },
  },
  methods: {
    search(e) {
      this.query = null;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$emit("input", e.target.value);
      }, 600);
    },
    focusSearch(e) {
      if (e.key === "/") {
        this.$refs.search.focus();
      }
    },
    toggleDarkMode() {
      this.$colorMode.preference =
        this.$colorMode.value == "light" ? "dark" : "light";
    },
  },
};
</script>