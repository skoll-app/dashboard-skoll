<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import * as yup from "yup";
import SKInputText from "../../components/ux/SKInputText.vue";
import SKInputPassword from "../../components/ux/SKInputPassword.vue";
import service from "@/http/services";
import type HttpResponse from "@/interfaces/http-response";
import type { Business } from "@/interfaces/business";
import { useRouter } from "vue-router";

const router = useRouter();

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const checked = ref(false);

const initialValues = {
  email: "soyvendedor@gmail.com",
  password: "1121933094",
};

let merchantAssociated: Array<Business> = reactive([]);

onMounted(() => {
  localStorage.removeItem("token");
});

const userLogin = async (values: Record<string, string>) => {
  try {
    const response: HttpResponse = await service.seller.login({
      user: values.email,
      password: values.password,
    });
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    throw new Error("user login error");
  }
};

const getAssociatedBusinesses = async () => {
  try {
    const response: HttpResponse = await service.seller.associatedBusinesses();

    merchantAssociated = response.data.data.merchantAssociated;

    const someActive = merchantAssociated.some((business) => business.status);

    if (merchantAssociated.length === 1 && someActive) {
      await businessLogin(merchantAssociated[0]);
      router.push("/dashboard");
    } else if (merchantAssociated.length > 1 && someActive) {
      router.push("/businesses-list");
      console.log("no va a pasar por ahora");
    } else {
      router.push("/onboarding");
    }
  } catch (error) {
    throw new Error("associated business error");
  }
};

const businessLogin = async (merchantAssociated: Business) => {
  try {
    const response: HttpResponse = await service.business.login(
      merchantAssociated.apiKey,
      merchantAssociated.apiLogin
    );
    localStorage.setItem("token", response.data.data);
  } catch (error) {
    throw new Error("business login error");
  }
};

const onSubmit = async (values: Record<string, string>) => {
  try {
    await userLogin(values);
    await getAssociatedBusinesses();
  } catch (error) {
    console.error(error);
  }
};
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
    :initial-values="initialValues"
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
