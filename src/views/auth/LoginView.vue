<script setup lang="ts">
import { ref } from "vue";
import * as yup from "yup";
import SKInputText from "../../components/ux/SKInputText.vue";
import SKInputPassword from "../../components/ux/SKInputPassword.vue";

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const checked = ref(false);

function onSubmit(values: Record<string, unknown>) {
  console.log(values);
}
</script>

<template>
  <div class="text-center mb-5">
    <div class="text-900 text-3xl font-medium mb-3">
      {{ $t("login.welcome") }}
    </div>
    <span v-html="$t('login.continue')" class="text-600 font-medium"></span>
  </div>
  <VeeForm
    :validation-schema="schema"
    v-slot="{ meta: { valid } }"
    @submit="onSubmit"
  >
    <div class="w-full w-11 md:w-10 lg:w-8 mx-auto">
      <SKInputText
        name="email"
        :label="$t('form.email')"
        labelClasses="block text-900 text-lg font-medium mb-2"
        :placeholder="$t('form.email')"
        inputStyle="padding: 1rem"
        inputClasses="w-full"
      />

      <SKInputPassword
        name="password"
        :label="$t('form.password')"
        labelClasses="block text-900 text-lg font-medium mb-2"
        inputStyle="padding:1rem"
        passwordClasses="w-full"
        inputClasses="w-full"
      />

      <div class="flex align-items-center justify-content-between mb-5">
        <div class="flex align-items-center">
          <Checkbox
            id="rememberme1"
            v-model="checked"
            :binary="true"
            class="mr-2"
          ></Checkbox>
          <label for="rememberme1">{{ $t("form.rememberMe") }}</label>
        </div>
        <a class="font-medium no-underline ml-2 text-right cursor-pointer">{{
          $t("form.forgotPassword")
        }}</a>
      </div>
      <Button
        type="submit"
        :disabled="!valid"
        :label="$t('form.buttons.login')"
        class="w-full p-3 text-xl"
      ></Button>

      <div class="flex flex-column">
        <router-link to="/sign-up" custom v-slot="{ navigate }">
          <Button
            @click="navigate"
            role="link"
            :label="$t('form.buttons.createBusiness')"
            icon="pi pi-building"
            iconPos="right"
            class="mt-7 p-button-secondary p-button-outlined font-medium text-lG align-self-end uppercase text-900 bg-white"
          />
        </router-link>
      </div>
    </div>
  </VeeForm>
</template>