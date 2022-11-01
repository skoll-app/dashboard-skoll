<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

defineProps({
  showName: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const userOptionsItems = ref([
  {
    label: "Cerrar sesión",
    command: () => {
      location.href = "/";
    },
  },
]);
</script>

<template>
  <Toolbar class="sticky top-0 bg-white z-5">
    <template #start>
      <h4 v-if="showName" class="m-0">{{ route.name }}</h4>
      <template v-else>
        <img class="mr-2" height="30" src="@/assets/img/logo.png" alt="logo" />
        SKOLL
      </template>
    </template>

    <template #end>
      <SplitButton
        icon="pi pi-user"
        class="p-button-secondary"
        :model="userOptionsItems"
      ></SplitButton>
    </template>
  </Toolbar>
</template>

<style scoped></style>
