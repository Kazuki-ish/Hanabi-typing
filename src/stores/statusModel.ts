import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStatusModel = defineStore('statusModel', () => {
    let step = ref(0)
    let gameOver = ref(false)
    let isGaming = ref(false)
    let isReady = ref(true)

    // アクションを定義します。アクションは状態を変更するメソッドです。
    const increaseStep = () => {
        step++
    }
    const gameStart = () => {
        isReady.value = false
        step.value++
        console.log(step)
    }
    return {
        step,
        gameOver,
        isGaming,
        isReady,
        increaseStep,
        gameStart
    }
})
