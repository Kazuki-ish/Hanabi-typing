<script setup lang="ts">
import { useFireworks } from '../stores/fireworksModel'
import { onMounted, ref, watchEffect } from 'vue'

const fw = useFireworks()

onMounted(() => {
    // fw.FireworkSketch(-1, -1)
    // if (fireworksCanvas.value) {
    //     fireworksCanvas.value.addEventListener('click', () => fw.triggerFirework(), false)
    // }
    watchEffect(() => {
        fw.setTrigger(false)
    })
    trigger()
    // setInterval(trigger, Math.random() * (2000 - 3000) + 3000)
})

function trigger() {
    fw.FireworkSketch(-1, -1)
    // console.log(fw)
}
</script>

<template>
    <div class="game__bg">
        <img src="/bg-front.svg" alt="" />
        <div
            class="game__bg__fw"
            ref="fireworksCanvas"
            id="canvas-container"
            @click="trigger"
        ></div>
    </div>
</template>

<style lang="scss">
.game__bg {
    position: absolute;
    background: linear-gradient(#1b003f, black);
    width: 100%;
    height: 100%;

    img {
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 0;
        opacity: 0.4;
    }
}
.game__bg__fw {
    position: absolute;
    width: 100%;
    height: 100%;

    canvas {
        position: absolute;
    }
}
</style>
