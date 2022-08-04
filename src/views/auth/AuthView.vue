<script setup lang="ts"></script>
<template>
  <div class="grid grid-nogutter h-screen">
    <div class="col hidden md:inline-flex min-h-full">
      <div class="bartender h-full w-full"></div>
    </div>
    <div class="col-12 md:col-6">
      <div class="p-7">
        <router-view />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.bartender {
  height: 100%;
  background: url("../../assets/img/bartender.jpg") no-repeat;
  background-size: 100%;
  background-position: top right;
}
</style>
