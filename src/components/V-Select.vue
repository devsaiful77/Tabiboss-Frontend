<template>
  <div class="custom-select-wrapper">
    <!-- Selected Value -->
    <div class="selected-box" @click="toggleDropdown">
      {{ selectedLabel || placeholder }}
    </div>

    <!-- Dropdown -->
    <div v-if="show" class="dropdown">
      <!-- Search Input -->
      <input
        type="text"
        v-model="search"
        placeholder="Search..."
        class="search-box"
      />

      <!-- Options -->
      <div
        v-for="option in filteredOptions"
        :key="option.id"
        @click="selectOption(option)"
        class="dropdown-option"
      >
        {{ option.name }}
      </div>

      <!-- No Result -->
      <div v-if="filteredOptions.length === 0" class="no-options">
        No options found
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
  props: {
    modelValue: [String, Number],
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Select an option",
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      show: false,
      search: "",
    };
  },
  computed: {
    filteredOptions() {
      return this.options.filter((opt) =>
        opt.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    selectedLabel() {
      const found = this.options.find((opt) => opt.id == this.modelValue);
      return found ? found.name : "";
    },
  },
  methods: {
    toggleDropdown() {
      this.show = !this.show;
    },
    selectOption(option) {
      this.$emit("update:modelValue", option.id);
      this.show = false;
      this.search = "";
    },
  },
};
</script>
