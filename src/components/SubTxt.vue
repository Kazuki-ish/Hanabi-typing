<script setup lang="ts">
import { useStatusModel } from '../stores/statusModel'
import { computed } from 'vue'

const gameStatus = useStatusModel()

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
