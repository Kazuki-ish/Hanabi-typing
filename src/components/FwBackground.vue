<script setup lang="ts">
import { useFireworks } from '../stores/fireworksModel'
import { onMounted, ref } from 'vue'

const fw = useFireworks()
const fireworksCanvas = ref(null)

onMounted(() => {
    if (fireworksCanvas.value) {
        fireworksCanvas.value.addEventListener('click', () => fw.FireworkSketch(-1, -1), false)
    }
})
</script>

<template>
    <div class="game__bg" ref="fireworksCanvas" id="canvas-container"></div>
</template>

<style lang="scss">
.game__bg {
    position: absolute;
    background: linear-gradient(#1b003f, black);
    width: 100%;
    height: 100%;
}
</style>
