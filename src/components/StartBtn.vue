<script setup lang="ts">
import { computed } from 'vue'
import { useStatusHandler } from '../stores/statusHandler'

const gameStatus = useStatusHandler()

function gameStart() {
    gameStatus.incrementStep()
    gameStatus.gameStart()
    console.log(gameStatus.step)
}
</script>

<template>
    <button class="start c-glass" @click="gameStart">
        <h2 class="c-glow-txt">Start Hanabi Typing!</h2>
    </button>
</template>

<style lang="scss" scoped>
.start {
    position: relative;
    padding: 24px 32px;
    border: solid 1px black;
    font-size: 24px;

    h2 {
        line-height: 1;
    }
}
</style>
