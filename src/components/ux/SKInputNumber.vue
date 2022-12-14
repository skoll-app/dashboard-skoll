<script setup lang="ts">
import { computed, toRef, type PropType } from "vue";
import { useField } from "vee-validate";

type InputNumberModeType = "decimal" | "currency" | undefined;

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  inputId: {
    type: String,
    default: "",
  },
  mode: {
    type: String as PropType<InputNumberModeType>,
    default: () => "decimal",
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
    type: Number,
    default: 0,
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
  showButtons: {
    type: Boolean,
    default: false,
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  currency: {
    type: String,
  },
  step: {
    type: Number,
    default: 1,
  },
  allowEmpty: {
    type: Boolean,
    default: false,
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

const inputClasses = computed(() => {
  let classes = "p-inputtext-lg";
  if (errorMessage.value) {
    classes += " p-invalid";
  }
  return classes;
});
</script>

<template>
  <div>
    <label :for="inputId" :class="labelClasses">{{ label }}</label>
    <div class="field">
      <InputNumber
        class="w-full"
        :inputId="inputId"
        :name="name"
        :inputClass="inputClasses"
        :placeholder="placeholder || label"
        :disabled="disabled"
        :model-value="inputValue"
        :style="inputStyle"
        :mode="mode"
        :min="min"
        :max="max"
        :showButtons="showButtons"
        :currency="currency"
        :minFractionDigits="0"
        :step="step"
        :allow-empty="allowEmpty"
        @blur="(e) => handleBlur(e.originalEvent)"
        @update:model-value="handleChange"
      />
      <p class="p-error" v-show="errorMessage">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
