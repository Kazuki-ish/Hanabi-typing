<script setup lang="ts">
import { useFireworks } from '../stores/fireworksModel'
import { onMounted, ref } from 'vue'

const fw = useFireworks()
let fws = []
// const fireworksCanvas = ref(null)

onMounted(() => {
    // fw.FireworkSketch(-1, -1)
    // if (fireworksCanvas.value) {
    //     fireworksCanvas.value.addEventListener('click', () => fw.triggerFirework(), false)
    // }
})

function trigger() {
    // fw.triggerFirework()

    // fws.push(fw.FireworkSketch(-1, -1))
    fw.FireworkSketch(-1, -1)
    // console.log(fw)
}
</script>

<template>
    <div class="game__bg" ref="fireworksCanvas" id="canvas-container" @click="trigger"></div>
</template>

<style lang="scss">
.game__bg {
    position: absolute;
    background: linear-gradient(#1b003f, black);
    width: 100%;
    height: 100%;

    canvas {
        position: absolute;
    }
}
</style>
