import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// ストアの状態に対するインターフェースを定義します。
interface StatusState {
    step: number
    gameOver: boolean
    isGaming: boolean
    isReady: boolean
}

export const useStatusHandler = defineStore('statusHandler', {
    state: (): StatusState => ({
        step: 1,
        gameOver: false,
        isGaming: false,
        isReady: true
    }),
    getters: {
        // ここにゲッターを定義できます。例:
        doubleStep: (state) => state.step++
    },
    // アクションを定義します。アクションは状態を変更するメソッドです。
    actions: {
        incrementStep() {
            this.step++
        },
        gameStart() {
            this.isReady = false
            this.step++
            // console.log(this.step)
        }
    }
})
