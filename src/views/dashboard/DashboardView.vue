<script setup lang="ts">
import { onMounted } from "vue";
import service from "@/http/services";
import { useRouter } from "vue-router";
const router = useRouter();

const getDetail = async () => {
  try {
    const response = await service.business.detail();
    console.log(response);
  } catch (error) {
    router.push("/");
    console.error(error);
  }
};

onMounted(() => {
  getDetail();
});
</script>
<template>
  <div>Dashboard</div>
</template>
