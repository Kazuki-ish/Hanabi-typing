<script lang="ts" setup>
import { defineComponent } from 'vue'
import { useStatusModel } from '../stores/statusModel'
import Game from '../components/Game.vue'

const status = useStatusModel()
// console.log(status.step)
</script>

<template>
    <section class="c-inner">
        <Game />
    </section>
</template>

<style lang="scss">
.c-inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.c-glass {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 32px;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: (4px);
    border: solid 1px #1b003f;
}

.c-glow-txt {
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.8));
    -webkit-filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.8));
    color: white;
}
</style>
