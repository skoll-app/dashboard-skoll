<script setup lang="ts">
import { ref } from "vue";
// Components
import SKInputText from "../../components/ux/SKInputText.vue";
import SKInputMask from "../../components/ux/SKInputMask.vue";
import SKSelect from "../../components/ux/SKSelect.vue";
import SKInputPassword from "../../components/ux/SKInputPassword.vue";
// Utils
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().onlyLetters().required(),
  lastname: yup.string().onlyLetters().required(),
  email: yup.string().email().required(),
  phone: yup.string().required().min(10),
  country: yup.string().required(),
  city: yup.string().required(),
  password: yup.string().required().password(),
});

const countries = ref([{ name: "Colombia", code: "CO" }]);

const cities = ref([
  { name: "Bogotá", code: "BOG" },
  { name: "Medellín", code: "MDE" },
]);

const onSubmit = (values: Record<string, unknown>) => {
  console.log(values);
};
</script>

<template>
  <div class="w-full w-11 md:w-10 mx-auto">
    <div class="text-center mb-5">
      <div class="text-900 text-3xl font-medium mb-3">
        {{ $t("signup.title") }}
      </div>
      <span v-html="$t('signup.subtitle')" class="text-600 font-medium"></span>
    </div>
    <VeeForm
      :validation-schema="schema"
      :initial-values="{ country: 'CO' }"
      @submit="onSubmit"
      v-slot="{ meta: { valid } }"
    >
      <div>
        <div class="grid">
          <div class="col-12 md:col">
            <SKInputText
              name="name"
              :label="$t('form.name')"
              labelClasses="block mb-2"
              :placeholder="$t('form.name')"
              inputClasses="w-full"
              inputStyle="padding: 1rem"
            />
          </div>
          <div class="col-12 md:col">
            <SKInputText
              name="lastname"
              :label="$t('form.lastname')"
              labelClasses="block mb-2"
              :placeholder="$t('form.lastname')"
              inputClasses="w-full"
              inputStyle="padding: 1rem"
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
              inputStyle="padding: 1rem"
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
              inputStyle="padding: 1rem"
            />
          </div>
        </div>
        <div class="grid">
          <div class="col-12 md:col">
            <SKSelect
              name="country"
              placeholder="Seleccione"
              select-classes="w-full p-2"
              :options="countries"
              :label="$t('form.country')"
              labelClasses="block mb-2"
              disabled
            />
          </div>
          <div class="col-12 md:col">
            <SKSelect
              name="city"
              placeholder="Seleccione"
              select-classes="w-full p-2"
              :options="cities"
              :label="$t('form.city')"
              labelClasses="block mb-2"
              filter
            />
          </div>
        </div>

        <div class="grid">
          <div class="col-12">
            <SKInputPassword
              name="password"
              :label="$t('form.password')"
              labelClasses="block text-900 text-lg font-medium mb-2"
              inputStyle="padding:1rem"
              passwordClasses="w-full"
              inputClasses="w-full"
              feedback
            />
          </div>
        </div>

        <Button
          type="submit"
          :disabled="!valid"
          :label="$t('form.buttons.signup')"
          class="w-full p-3 text-xl"
        ></Button>
      </div>
    </VeeForm>
  </div>
</template>

<style scoped></style>