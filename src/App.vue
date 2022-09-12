<script setup lang="ts">
// Vue
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
// Utils
import setGlobalLocale from "./utils/yup-i18n.js";
// Axios
import { api, apiAuth } from "./http/axios";

const isLoading = ref(false);

function enableInterceptor() {
  api.interceptors.request.use(
    (config) => {
      isLoading.value = true;
      return config;
    },
    (error) => {
      isLoading.value = false;
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      isLoading.value = false;
      return response;
    },
    function (error) {
      isLoading.value = false;
      return Promise.reject(error);
    }
  );
}

function enableAuthInterceptor() {
  apiAuth.interceptors.request.use(
    (config) => {
      isLoading.value = true;
      return config;
    },
    (error) => {
      isLoading.value = false;
      return Promise.reject(error);
    }
  );

  apiAuth.interceptors.response.use(
    (response) => {
      isLoading.value = false;
      return response;
    },
    function (error) {
      isLoading.value = false;
      return Promise.reject(error);
    }
  );
}

onMounted(() => {
  setGlobalLocale();
  enableInterceptor();
  enableAuthInterceptor();
});
</script>

<template>
  <!-- <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <Loading v-model:active="isLoading" :can-cancel="false" is-full-page />
  <Toast position="bottom-right" />
  <ConfirmDialog></ConfirmDialog>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
