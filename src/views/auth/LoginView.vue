<script setup lang="ts">
import { computed, ref } from "vue";

const checked = ref(false);
const email = ref("");
const password = ref("");

const isValid = computed(() => email.value !== "" && password.value !== "");
</script>

<template>
  <div class="col-12">
    <div class="h-full w-full m-0 py-7 px-4">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">
          {{ $t("login.welcome") }}
        </div>
        <span class="text-600 font-medium">{{ $t("login.continue") }}</span>
      </div>

      <div class="w-full md:w-10 mx-auto">
        <label for="email1" class="block text-900 text-xl font-medium mb-2">{{
          $t("form.email")
        }}</label>
        <InputText
          id="email1"
          v-model="email"
          type="text"
          class="w-full mb-3"
          :placeholder="$t('form.email')"
          style="padding: 1rem"
        />

        <label
          for="password1"
          class="block text-900 font-medium text-xl mb-2"
          >{{ $t("form.password") }}</label
        >
        <Password
          id="password1"
          v-model="password"
          :placeholder="$t('form.password')"
          toggleMask
          :feedback="false"
          class="w-full mb-3"
          inputClass="w-full"
          inputStyle="padding:1rem"
        ></Password>

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
          :disabled="!isValid"
          :label="$t('form.buttons.login')"
          class="w-full p-3 text-xl"
        ></Button>
      </div>
    </div>
  </div>
</template>
