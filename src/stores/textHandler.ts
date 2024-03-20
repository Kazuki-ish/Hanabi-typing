import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// ストアの状態に対するインターフェースを定義します。
interface KeyboardState {
    displayText: string
    textRef: object
    displayRomaji: string
    romajiRef: object
}

export const useText = defineStore('textHandler', {
    state: (): KeyboardState => ({
        displayText: '',
        textRef: {},
        displayRomaji: '',
        romajiRef: {}
    }),
    getters: {
        // ここにゲッターを定義できます。例:
    },
    // アクションを定義します。アクションは状態を変更するメソッドです。
    actions: {
        changedisplayTxt(text) {
            this.displayText = text
        },
        addTextRef(ref) {
            this.textRef = ref
        }
    }
})
