import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useText = defineStore('textHandler', () => {
    let displayText = ref('')
    let textRef = ref({})
    let displayRomaji = ''
    let romajiRef = {}

    const changeDisplayTxt = (text: string) => {
        displayText = text
    }
    const addTextRef = (ref: string) => {
        textRef = ref
    }
    return {
        displayText,
        textRef,
        displayRomaji,
        romajiRef,
        changeDisplayTxt,
        addTextRef
    }
})
