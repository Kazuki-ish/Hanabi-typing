<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Home from './components/Layout.vue'
</script>

<template>
    <header>
        <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
    </header>
    <main>
        <Home />
    </main>

    <!-- <RouterView /> -->
</template>

<style lang="scss" scoped>
main {
    max-height: 100vh;
    max-height: 100svh;
    max-width: 100vw;
    max-width: 100svw;
    height: 100vh;
    height: 100svh;
    width: 100vw;
    width: 100svw;
}
</style>
