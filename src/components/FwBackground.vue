<script setup lang="ts">
import { useFireworks } from '../stores/fireworksHandler'
import { onMounted, ref } from 'vue'

const fw = useFireworks()

onMounted(() => {
    fw.FireworkSketch(1, 1)
})
</script>
<template>
    <div class="game__bg" id="canvas-container" ref="fireworksCanvas"></div>
</template>

<style lang="scss">
.game__bg {
    position: absolute;
    background: linear-gradient(#1b003f, black);
    width: 100%;
    height: 100%;
}
</style>
