<template>
  <div class="customDropdown" ref="dropdownRef">
    <p class="title">{{ title }}</p>
    <div class="dropdownItem">
      <a href="#" class="selected" @click.prevent="toggleDropdown">
        {{ title }}
      </a>
      <ul class="filterList checkbox" v-show="isDropdownVisible">
        <li
          v-for="(item, index) in dropdownItems"
          :key="index"
          :class="{ active: selectedIds.includes(item.id) }"
        >
          <label>
            <input
              type="checkbox"
              class="d-none"
              :value="item.id"
              v-model="selectedIds"
            />
            {{ item.name }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomDropdown",
  props: {
    title: {
      type: String,
      default: "Filter by item",
    },
    dropdownItems: {
      type: Array,
      required: true,
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isDropdownVisible: false,
      selectedIds: [...this.selected],
    };
  },
  watch: {
    selectedIds(newVal) {
      this.$emit("update:selected", newVal);
    },
    selected(newVal) {
      this.selectedIds = [...newVal];
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    handleClickOutside(event) {
      if (!this.$refs.dropdownRef.contains(event.target)) {
        this.isDropdownVisible = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
/* Your styles */
.customDropdown {
  position: relative;
}
.filterList {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10;
}
.filterList li {
  padding: 5px 10px;
}
.filterList li.active {
  background-color: #f0f0f0;
}
</style>
