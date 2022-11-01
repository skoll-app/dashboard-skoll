<script setup lang="ts">
// Vue
import { useRoute } from "vue-router";
// Components
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Header from "@/components/headers/Header.vue";
// Interface
import type Menu from "@/interfaces/menu";

const route = useRoute();
const menu = route.meta.menu as Menu[];
</script>

<template>
  <div class="w-full">
    <div class="flex">
      <Sidebar show-logo :menu="menu" />
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
