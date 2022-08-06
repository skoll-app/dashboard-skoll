<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

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
  labelClasses: {
    type: String,
  },
  inputStyle: {
    type: String,
  },
  inputClasses: {
    type: String,
  },
  passwordClasses: {
    type: String,
  },
  toggleType: {
    type: Boolean,
    default: true,
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
  <label :class="labelClasses">{{ label }}</label>
  <div class="field">
    <Password
      :name="name"
      :placeholder="placeholder || label"
      :toggleMask="toggleType"
      :feedback="false"
      :class="[{ 'p-invalid': errorMessage }, inputClasses, passwordClasses]"
      :inputClass="inputClasses"
      :inputStyle="inputStyle"
      @input="handleChange"
      @blur="handleBlur"
      :value="inputValue"
    ></Password>
    <p class="p-error" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>
