<script lang="ts" setup>
import { defineComponent } from 'vue'
import { useStatus } from '../stores/status'
import Game from '../components/Game.vue'

const status = useStatus()
// console.log(status.step)
</script>

<template>
    <section class="c-inner">
        <Game />
    </section>
</template>

<style lang="scss" scoped>
.c-inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
