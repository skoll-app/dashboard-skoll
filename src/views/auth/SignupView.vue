<script setup lang="ts">
import * as yup from "yup";
import SKInputText from "../../components/ux/SKInputText.vue";
import SKInputMask from "../../components/ux/SKInputMask.vue";
// import SKInputPassword from "../../components/ux/SKInputPassword.vue";

const schema = yup.object({
  name: yup.string().onlyLetters().required(),
  lastname: yup.string().onlyLetters().required(),
  email: yup.string().email().required(),
  phone: yup.string().required().min(10),
});

const onSubmit = (values: Record<string, unknown>) => {
  console.log(values);
};
</script>

<template>
  <VeeForm
    :validation-schema="schema"
    @submit="onSubmit"
    v-slot="{ meta: { valid } }"
  >
    <div class="w-full w-11 md:w-10 mx-auto">
      <div class="grid">
        <div class="col-12 md:col">
          <SKInputText
            name="name"
            :label="$t('form.name')"
            labelClasses="block mb-2"
            :placeholder="$t('form.name')"
            inputClasses="w-full"
          />
        </div>
        <div class="col-12 md:col">
          <SKInputText
            name="lastname"
            :label="$t('form.lastname')"
            labelClasses="block mb-2"
            :placeholder="$t('form.lastname')"
            inputClasses="w-full"
          />
        </div>
      </div>
      <div class="grid">
        <div class="col-12 md:col">
          <SKInputText
            name="email"
            :label="$t('form.email')"
            labelClasses="block mb-2"
            :placeholder="$t('form.email')"
            inputClasses="w-full"
          />
        </div>
        <div class="col-12 md:col">
          <SKInputMask
            name="phone"
            :label="$t('form.phone')"
            labelClasses="block mb-2"
            inputClasses="w-full"
            mask="(999) 999 9999"
            placeholder="(999) 999 9999"
          />
        </div>
      </div>

      <Button
        type="submit"
        :disabled="!valid"
        :label="$t('form.buttons.login')"
        class="w-full p-3 text-xl"
      ></Button>
    </div>
  </VeeForm>
</template>

<style scoped></style>
