<script setup lang="ts">
import { useStatusModel } from '../stores/statusModel'
import { onMounted, onUnmounted } from 'vue'
import { keygraph } from '../assets/typing/keygraph.js'

let gameStatus = useStatusModel()

// スペースキーが押されたときに実行する関数
const handleSpacePress = (event) => {
    if (event.code === 'Space' && gameStatus.isReady) {
        // console.log('スペースキーが押されました！')
        gameStatus.gameStart()
        // console.log(gameStatus.step)
    }
}
onMounted(() => {
    window.addEventListener('keydown', handleSpacePress)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleSpacePress)
})
</script>

<template>
    <div class="c-module"></div>
</template>

<style lang="scss" scoped>
.c-module {
    display: none;
    visibility: hidden;
}
</style>
