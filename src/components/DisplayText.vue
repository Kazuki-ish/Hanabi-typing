<script setup lang="ts">
import { onMounted } from 'vue'
import { useText } from '../stores/textHandler'

const displayText = useText.displayText

onMounted(() => {
    const ref = document.getElementById('textref')
    // console.log(useText)
    // useText.addTextRef(ref)
})
</script>
<template>
    <div>
        <p class="display-text" id="textref">{{ displayText }}</p>
    </div>
</template>

<style lang="scss">
.display-text {
}
</style>
