import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import p5 from 'p5'

export const useFireworks = defineStore('useFireworks', {
    getters: {},
    actions: {
        FireworkSketch(scaleNum: number, stepNum: number) {
            const sketch = (p) => {
                const colors: string[] = ['#FF91F3', '#86DEFF', '#FFDDA7']
                let dots: string[] = []

                p.setup = () => {
                    p.createCanvas(1280, 720)
                    p.rectMode(p.CENTER)
                    p.noStroke()

                    let numOfDots = p.windowWidth < 768 ? 6 : 16
                    for (let i = 0; i < numOfDots; i++) {
                        dots.push(new Dot(p.random(p.width), p.random(p.height)))
                    }
                }

                p.draw = () => {
                    p.clear()

                    // Draw and update dots
                    for (let dot of dots) {
                        dot.update()
                        dot.display()
                    }
                }

                class Dot {
                    constructor(x, y) {
                        this.pos = p.createVector(x, y)
                        this.vel = p.createVector(p.random(-2, 2), p.random(-2, 2))
                        this.size = 30
                        this.color = colors[p.floor(p.random(colors.length))]
                    }

                    update() {
                        this.pos.add(this.vel)
                        if (this.pos.x > p.width) this.pos.x = 0
                        if (this.pos.x < 0) this.pos.x = p.width
                        if (this.pos.y > p.height) this.pos.y = 0
                        if (this.pos.y < 0) this.pos.y = p.height
                    }

                    display() {
                        p.fill(this.color)
                        for (let i = this.size; i > 0; i -= 2) {
                            p.ellipse(this.pos.x, this.pos.y, i, i)
                        }
                    }
                }
            }
            new p5(sketch, 'canvas-container')
        }
    }
})
