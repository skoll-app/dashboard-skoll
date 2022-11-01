<script setup lang="ts">
// Components
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Header from "@/components/headers/Header.vue";
</script>

<template>
  <div class="w-full">
    <div class="flex">
      <Sidebar show-logo />
      <div class="w-full">
        <Header show-name />
        <div class="p-2 md:p-4 w-full">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
