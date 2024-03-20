<script lang="ts" setup>
import { computed } from 'vue'
import { useStatusHandler } from '../stores/statusHandler'
import StartBtn from './StartBtn.vue'
import SubTxt from '../components/SubTxt.vue'
import KeyboardM from '../components/KeyboardModule.vue'
import DisplayLayout from '../components/DisplayLayout.vue'
import FwBackGround from '../components/FwBackground.vue'
const gameStatus = useStatusHandler()
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
        <KeyboardM />
        <FwBackGround />
        <div class="game__inner" :class="classObj">
            <StartBtn v-if="gameStatus.isReady" />
            <DisplayLayout />
            <SubTxt />
        </div>
    </div>
</template>

<style lang="scss">
.game {
    position: relative;
    width: 1280px;
    height: 720px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.game__inner {
    position: relative;
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
