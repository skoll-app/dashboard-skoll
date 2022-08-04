<template>
  <div>
    <Button label="Enviar" />
    {{ $t("login") }}
    {{ $t("form.email") }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  async mounted() {
    console.log(import.meta.env.VITE_APP_TITLE2);
  },
});
</script>

<style scoped></style>
