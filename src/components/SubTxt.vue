<script setup lang="ts">
import { useStatusHandler } from '../stores/statusHandler'
import { computed } from 'vue'

const gameStatus = useStatusHandler()

const subTxt = computed(() => {
    return gameStatus.step === 1 ? 'スペースキーでゲームスタート！' : 'Escキーでホームに戻る'
})
</script>

<template>
    <div class="sub-txt c-glow-txt">{{ subTxt }}</div>
</template>

<style lang="scss">
.sub-txt {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}
</style>

<script lang="ts"></script>
