<script lang="ts" setup>
import { computed } from 'vue'
import { useStatus } from '../stores/status'
import StartBtn from './StartBtn.vue'
const gameStatus = useStatus()
const classObj = computed(() => {
    return {
        [`step-${gameStatus.step}`]: gameStatus.step !== null,
        '-ready': gameStatus.isReady,
        '-gaming': gameStatus.isGaming,
        '-game-over': gameStatus.gameOver
    }
})
</script>

<template>
    <div class="game">
        <!-- {{ gameStatus.step }} -->
        <div class="game__inner" :class="classObj">
            <div class="game__bg"></div>
            <StartBtn v-if="gameStatus.isReady" />
        </div>
    </div>
</template>

<style lang="scss">
.game__inner {
    position: relative;
    width: 1280px;
    height: 720px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.game__bg {
    position: absolute;
    background: linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c);
    width: 100%;
    height: 100%;
}
</style>
