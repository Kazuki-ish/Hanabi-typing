import { ref } from 'vue'
import { defineStore } from 'pinia'
import p5 from 'p5'

// ネオンカラーパレット
const colors = [
    '#FFDB4E',
    '#00FE9B',
    '#2DD9FE',
    '#9461FD',
    '#FF5ECD',
    '#FF5161',
    '#FF7F00',
    '#007FFF',
    '#EDEDED'
]

export const useFireworks = defineStore('useFireworks', () => {
    var trigger = ref(false)

    const setTrigger = (bool) => {
        trigger = bool
    }

    const FireworkSketch = (scaleNum, stepNum) => {
        const sketch = (p) => {
            let isFinished = false
            let particles = []
            let color = colors[p.floor(p.random(colors.length))]
            let filteredColors = colors.filter((c) => c !== color) // color を除外
            let color2 = filteredColors[p.floor(p.random(filteredColors.length))]

            // console.log(this.isFinished)
            // 引数計算
            let scale = scaleNum === -1 ? p.random(3, 4) : p.random(3 * scaleNum)
            let step =
                stepNum === -1 ? p.floor(p.random(120, 100)) : p.floor(p.random(240, 120 * stepNum))
            // console.log()

            p.setup = () => {
                p.createCanvas(1280, 720)
                p.noStroke()

                // console.log(scaleNum)
                // 余白計算 Canvasの9割以内
                const minX = p.width * 0.1
                const maxX = p.width * 0.9
                const minY = p.height * 0.1
                const maxY = p.height * 0.8

                // console.log(minX, maxX)
                // console.log(minY, maxY)

                const x = p.random(minX, maxX)
                const y = p.random(minY, maxY)
                // const z = p.random(-5, 5)

                // 消えるタイミング
                const timing = Math.random() * (40 - 60) + 60
                // console.log(x, y, z)

                // 初期位置を固定したインスタンスを繰り返し作成
                for (let i = 0; i < step; i++) {
                    let size = scale * (Math.random() * (1.2 - 0.6) + 0.6) // scale に 0.8 から 0.6 のランダムな係数を掛ける
                    particles.push(
                        new Particle(
                            x, // x に -5 から 10 のランダムな値を加える
                            y, // y に -5 から 10 のランダムな値を加える
                            color,
                            size,
                            scale * (Math.random() * (1 - 0.99) + 0.99),
                            timing
                        )
                    )
                    particles.push(
                        new Particle(
                            x - (Math.random() * (30 - -10) + -10), // x から -20 から 20 のランダムな値を減算
                            y - (Math.random() * (10 - -10) + -10), // y から -20 から 20 のランダムな値を減算
                            color2,
                            size,
                            scale * (Math.random() * (0.95 - 0.8) + 0.8),
                            timing
                        )
                    )
                    // particles.push(
                    //     new Particle(
                    //         x - (Math.random() * (5 - -5) + -5), // x から -20 から 20 のランダムな値を減算
                    //         y - (Math.random() * (5 - -5) + -5), // y から -20 から 20 のランダムな値を減算
                    //         color,
                    //         size,
                    //         scale * 0.6,
                    //         timing
                    //     )
                    // )

                    // console.log(color)
                }
            }

            p.draw = () => {
                p.clear()

                // console.log('Firework triggered!', this.fireworkTriggered)
                if (!isFinished) {
                    // パーティクルの更新と表示
                    particles.forEach((particle) => {
                        particle.update()
                        particle.display()
                    })

                    // 非アクティブなパーティクルを配列から削除
                    particles = particles.filter((particle) => particle.active)

                    if (particles.length <= 0) {
                        isFinished = true
                    }
                } else {
                    // すべてのパーティクルの描画が終了したらDOMとp5を削除
                    p.remove()
                }
            }

            class Particle {
                constructor(x, y, color, size, scale, timing) {
                    this.pos = p.createVector(x, y)
                    // ランダムな角度をラジアンで生成
                    let angle = Math.random() * (2 * Math.PI) // 0 から 2π の範囲でランダムな数値を生成
                    // 角度からベクターを生成
                    this.vec = p.createVector(
                        Math.cos(angle) * scale, // X軸成分
                        Math.sin(angle) * scale // Y軸成分
                    )
                    this.timing = Math.random() * (1 - 2) + 2
                    this.vel = scale
                    this.gravity = 0
                    this.color = p.color(color)
                    this.color.setAlpha(255)
                    this.size = size * 2
                    this.active = true
                }
                update() {
                    if (!this.active) return // アクティブでない場合は処理をスキップ
                    this.pos.add(
                        this.vec.x * this.vel,
                        this.vec.y * this.vel
                        // this.vec.z * this.vel
                    )

                    if (p.frameCount >= this.timing) {
                        if (this.vel >= 0.2) {
                            this.vel = this.vel - 0.2
                            // console.log(this.vel)
                        }
                        // 特定のタイミングで
                        this.color.setAlpha(this.color.levels[3] - 2)
                        this.pos.y = this.pos.y + 0.4
                        // 重力を加算して徐々に透明に
                        // console.log(this.color.levels[3])
                    }

                    // console.log(this.vel)

                    if (this.color.levels[3] <= 0) {
                        // 透明度が0になったらインスタンスを削除
                        // console.log(this.color.levels[3])
                        this.active = false
                    }
                }
                display() {
                    if (!this.active || this.color.levels[3] <= 0) return // 透明度が低い場合は描画をスキップ
                    // p.drawingContext.shadowBlur = 8
                    // p.drawingContext.shadowColor = this.color
                    // p.drawingContext.filter = 'blur(2px)'
                    p.fill(this.color)
                    // console.log(this.color)
                    p.ellipse(this.pos.x, this.pos.y, this.size, this.size)
                    // p.rect(this.pos.x, this.pos.y, this.size, this.size)
                }
            }
        }
        // スケッチを実行
        new p5(sketch, 'canvas-container')
    }
    return {
        trigger,
        setTrigger,
        FireworkSketch
    }
})
