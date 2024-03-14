<script setup lang="ts">
import { computed } from 'vue'
import { useStatus } from '../stores/status'

const gameStatus = useStatus()

function gameStart() {
    gameStatus.incrementStep()
    gameStatus.gameStart()
    console.log(gameStatus.step)
}
</script>

<template>
    <button class="start text-white" @click="gameStart"><h2>Start Hanabi Typing!</h2></button>
</template>

<style lang="scss" scoped>
.start {
    position: relative;
    padding: 24px 32px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    border: solid 1px black;
    backdrop-filter: blur(12px);
    font-size: 24px;

    h2 {
        line-height: 1;
    }
}
</style>
