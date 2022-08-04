<script setup lang="ts">
import SKInputText from "@/components/ux/SKInputText.vue";
import * as Yup from "yup";
import { reactive } from "vue";

const schema = Yup.object().shape({
  name: Yup.string().required().email(),
});

const formValues = reactive({
  name: "",
});

function onSubmit(values: Record<string, unknown>) {
  alert(JSON.stringify(values, null, 2));
}
</script>

<template>
  <div class="grid">
    <div class="col-10 col-offset-1">
      <div class="card p-fluid">
        <VeeForm
          v-slot="{ meta: { valid } }"
          @submit="onSubmit"
          :validation-schema="schema"
          :initial-values="formValues"
        >
          <SKInputText
            name="name"
            placeholder="Escribe tu nombre"
            label="Nombre"
          />
          <Button :disabled="!valid" type="submit" :label="$t('login')" />
        </VeeForm>
      </div>
    </div>
  </div>
</template>
