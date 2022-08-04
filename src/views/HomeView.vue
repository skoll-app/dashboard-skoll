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
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
