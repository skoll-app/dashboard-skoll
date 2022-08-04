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
    await this.$apiAuth.post("/formx");
  },
});
</script>

<style scoped></style>
