<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  labelClasses: {
    type: String,
  },
  options: {
    type: Array<unknown>,
    default: () => ({}),
  },
  placeholder: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  selectClasses: {
    type: String,
    default: "",
  },
  filter: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
});

const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>
<template>
  <div>
    <label :class="labelClasses">{{ label }}</label>
    <div class="field">
      <Dropdown
        :model-value="inputValue"
        @update:model-value="handleChange"
        @blur="handleBlur"
        :options="options"
        optionLabel="name"
        optionValue="code"
        :placeholder="placeholder"
        :class="selectClasses"
        :filter="filter"
        :disabled="disabled"
      />
      <p class="p-error" v-show="errorMessage">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
