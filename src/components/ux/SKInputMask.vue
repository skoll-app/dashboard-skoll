<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "",
  },
  mask: {
    type: String,
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
  labelClasses: {
    type: String,
  },
  inputStyle: {
    type: String,
  },
  inputClasses: {
    type: String,
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
      <InputMask
        :name="name"
        class="p-inputtext-lg"
        :class="[{ 'p-invalid': errorMessage }, inputClasses]"
        :placeholder="placeholder || label"
        :disabled="disabled"
        :modelValue="inputValue"
        @update:modelValue="handleChange"
        @blur="handleBlur"
        :style="inputStyle"
        :mask="mask"
        type="text"
        unmask
      />
      <p class="p-error" v-show="errorMessage">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
