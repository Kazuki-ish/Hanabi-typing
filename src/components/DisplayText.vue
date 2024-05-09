<script setup lang="ts">
import { onMounted } from 'vue'
import { useText } from '../stores/textModel'
import sound from '../assets/typing/sound.js'
import keygraph from '../assets/typing/keygraph.js'
import { useFireworks } from '../stores/fireworksModel'

const fw = useFireworks()

const displayText = useText.displayText

onMounted(() => {
    const ref = document.getElementById('textref')
    // console.log(useText)
    // useText.addTextRef(ref)

    // sound.jsの初期化
    sound.init()

    // タイプする文章
    let dataset = [
        { disp: '梅雨の季節', str: 'つゆのきせつ' },
        { disp: '雨が多い', str: 'あめがおおい' },
        { disp: 'カビが生えやすい', str: 'かびがはえやすい' },
        { disp: 'ジメジメする', str: 'じめじめする' },
        { disp: '傘を忘れずに', str: 'かさをわすれずに' }
        // { disp: '梅雨明けはいつ', str: 'つゆあけはいつ' },
        // { disp: '洗濯物が乾かない', str: 'せんたくものがかわかない' },
        // { disp: '湿度が高い', str: 'しつどがたかい' },
        // { disp: '雨音を聞く', str: 'あまおとをきく' },
        // { disp: '梅雨入り宣言', str: 'つゆいりせんげん' },
        // { disp: '長靴を履く', str: 'ながぐつをはく' },
        // { disp: '水たまり', str: 'みずたまり' },
        // { disp: 'スコール', str: 'すこーる' },
        // { disp: '雷が鳴る', str: 'かみなりがなる' },
        // { disp: '雨の日が続く', str: 'あめのひがつづく' },
        // { disp: 'アジサイの花', str: 'あじさいのはな' },
        // { disp: '蒸し暑い', str: 'むしあつい' },
        // { disp: '土砂降り', str: 'どしゃぶり' },
        // { disp: '嵐の前の静けさ', str: 'あらしのまえのしずけさ' },
        // { disp: '梅雨寒', str: 'つゆびえ' }
    ]

    // プログラムをタイプするときに、スペース4つをauto completeで対応するための auto complete設定を入れる配列
    const keygraph_autocompletes = []
    // url引数でタイプする文字が指定されているときに、それをdatasetにする。
    if (location.search.length > 0) {
        dataset = JSON.parse(decodeURIComponent(location.search.match(/^\??(.*)/)[1])).map((e) => ({
            disp: e[1],
            str: e[0]
        }))

        // プログラムをタイプするときの画面変更処理
        if (dataset[0].disp === undefined) {
            // 漢字表記、ひらがな表記の表示部分を消去
            document.getElementById('seq').style.display = 'none'
            // 文字中央寄せ→左寄せ
            document.getElementById('panel').style.textAlign = 'left'

            // スペース4つはauto completeで自動で先に進める
            keygraph_autocompletes.push({
                seq_pattern: /^    /,
                fired: (key, next) => {
                    next(' ')
                    next(' ')
                    next(' ')
                    next(' ')
                }
            })
        }
    }

    // タイプする文章の管理
    const dataset_mgr = {
        _cur_index: -1,
        _is_finished: false,
        reset: function () {
            this._cur_index = -1
            this._is_finished = false
        },
        next_string: function () {
            this._cur_index += 1
            this._is_finished = this._cur_index === dataset.length
            if (this._is_finished) {
                return undefined
            }
            keygraph.build(dataset[this._cur_index].str)
            return dataset[this._cur_index].disp ?? ''
        }
    }

    // 残り時間を管理する lm の値を変更すると、初期の残り時間を変更できる。
    let tm = {
        // setIntervalのid
        _id: undefined,
        // タイピングの開始時間
        _st: undefined,

        // 経過時間の取得
        tm: function () {
            const t = Date.now()
            return t - (this._st ?? t)
        },
        // 時間の文字変換
        fm: function (t) {
            return (Number(t) / 1000).toFixed(1)
        },
        // 時間管理の初期化
        clear: function () {
            clearInterval(this._id)
            this._id = undefined
        },
        // 時間管理の開始
        start: function (cb) {
            this._st = Date.now()
            this._id = setInterval(() => {
                cb(this)
            }, 100)
        },
        // 時間管理がスタートしている場合に true が返る。
        is_started: function () {
            return this._id !== undefined
        }
    }

    // 時間を表示
    document.getElementById('time').innerText = tm.fm(tm.tm())
    // 打ち終わった文字、これから打つ文字の例を表示する。
    const disp = (seq) => {
        document.getElementById('disp').innerText = seq ?? document.getElementById('disp').innerText
        document.getElementById('key_done').innerText = keygraph.key_done() ?? ''
        document.getElementById('key_candidate').innerText = keygraph.key_candidate() ?? ''
        document.getElementById('seq_done').innerText = keygraph.seq_done() ?? ''
        document.getElementById('seq_candidates').innerText = keygraph.seq_candidates() ?? ''
    }

    // キーが押されたときの処理
    const keydown = (e) => {
        // タブキーの場合は、入力要素が他に移動しないようにデフォルト処理を抑制する。
        if (e.key === 'Tab') {
            e.preventDefault()
        }
        // 入力がタイピングするキーと一致している場合、
        if (keygraph.next(e.key)) {
            // タイプ音を鳴らす。
            sound.play()
            fw.FireworkSketch(-1, -1)

            // 現在のタイピング文字を表示する。
            disp()
        }
        // すべての文字をタイプし終わったとき、
        if (keygraph.is_finished()) {
            const seq = dataset_mgr.next_string()
            seq === undefined
                ? reset_game('すばらしい！ スペースキーで再スタートします')
                : disp(seq)
        }
    }
    document.body.addEventListener('keydown', (e) => {
        if (tm.is_started() === false) {
            if (e.key === ' ') {
                tm.start((tm) => {
                    document.getElementById('time').innerText = tm.fm(tm.tm())
                })
                disp(dataset_mgr.next_string())
            }
        } else {
            keydown(e)
        }
    })

    // ゲームの初期化、msgは初期化後に画面に表示する文字
    const reset_game = (msg) => {
        document.getElementById('time').innerText = tm.fm(tm.tm())
        keygraph.reset()
        keygraph_autocompletes.forEach((a) => keygraph.register_autocomplete(a))
        disp(msg)
        tm.clear()
        dataset_mgr.reset()
    }
    reset_game('スペースキーでゲームスタート！')
})
</script>

<template>
    <div>
        <p class="display-text" id="textref">{{ displayText }}</p>
        <div id="header" class="inner">
            <span id="time_panel">経過時間: <span id="time"></span></span>
        </div>
        <div id="panel" class="inner">
            <div id="disp" class="instructions"></div>
            <div id="seq" class="instructions">
                <span id="seq_done" class="done"></span><span id="seq_candidates"></span>
            </div>
            <pre
                id="keys"
                class="keys"
            ><span id="key_done" class="done"></span><span id="key_candidate"></span></pre>
        </div>
        <div id="footer" class="inner">
            <span
                >自分でタイピングゲームの文字を作れます<a href="simple_typing_game_maker.html"
                    >⇒</a
                ></span
            >
        </div>
    </div>
</template>

<style lang="scss">
.display-text {
    color: white;
}
/* 画面上のトップレベル要素 */
.inner {
    text-align: center;
    color: white;
}

/* テキストエリアの設定 */
.keys {
    tab-size: 4;
    color: white;
}

/* 要素の消去 */
.none {
    display: none;
}

/* タイピングする文字の全体（これから打つもの、打ったもの） */
#panel {
    font-size: large;
    margin: 40px;
}

/* 打ち終わった文字 */
.done {
    background-color: grey;
}

/* 記録などを表示するヘッダー部分 */
#header {
    font-size: small;
    margin: 10px;
}

/* 付加情報を与えるフッター部分 */
#footer {
    margin: 40px;
    font-size: x-small;
    display: none;
}

/* 時間表示部分 */
#time {
    font-size: large;
}
</style>
