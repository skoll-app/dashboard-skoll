<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";
import { useI18n } from "vue-i18n";

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
  feedback: {
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

const { t } = useI18n();
</script>

<template>
  <label :class="labelClasses">{{ label }}</label>
  <div class="field">
    <Password
      :name="name"
      :placeholder="placeholder || label"
      :toggleMask="toggleType"
      :feedback="feedback"
      :class="[{ 'p-invalid': errorMessage }, inputClasses, passwordClasses]"
      :inputClass="inputClasses"
      :inputStyle="inputStyle"
      @input="handleChange"
      @blur="handleBlur"
      :value="inputValue"
      :weakLabel="t('form.helpers.password.weak')"
      :mediumLabel="t('form.helpers.password.medium')"
      :strongLabel="t('form.helpers.password.strong')"
      :promptLabel="t('form.helpers.password.type')"
      strongRegex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?./¿])[A-Za-z\d#$@!%&*?./¿]{8,30}$"
    >
      <template #footer>
        <Divider />
        <ul class="pl-2 ml-2" style="line-height: 1.5">
          <li>{{ t("form.helpers.password.lowercase") }}</li>
          <li>{{ t("form.helpers.password.uppercase") }}</li>
          <li>{{ t("form.helpers.password.number") }}</li>
          <li>{{ t("form.helpers.password.specialChar") }} #$@!%&*?./¿</li>
          <li>{{ t("form.helpers.password.minimum") }}</li>
        </ul>
      </template>
    </Password>
    <p class="p-error" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>
