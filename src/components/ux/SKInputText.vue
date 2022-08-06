<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

// eslint-disable-next-line no-undef
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
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
  <div class="field">
    <label>{{ label }}</label>
    <InputText
      :type="type"
      class="p-inputtext-lg"
      :class="{ 'p-invalid': errorMessage }"
      :placeholder="placeholder || label"
      :disabled="disabled"
      :value="inputValue"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p class="p-error" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>
