'use strict';

//要素取得
const addBtn = document.getElementById('add')
//console.log(addBtn);

//ローカルストレージからデータの取得
const memos = JSON.parse(localStorage.getItem('memos'))

// // メモ帳追加処理を実行 addNewMemo(memo)の処理
if (memos) {
    memos.forEach(memo => addNewMemo(memo))
}

//addボタンをクリックした場合の作成イベント
addBtn.addEventListener('click', () => addNewMemo())

//関数
function addNewMemo(text = '') {
    // div要素を作成
    const memo = document.createElement('div')
    // memoクラスの追加
    memo.classList.add('memo')

    // メモ帳を追加
    memo.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fa fa-edit "></i></button>
        <button class="delete"><i class="fa fa-trash "></i> </button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    // 操作要素作成
    //編集
    const editBtn = memo.querySelector('.edit')
    //削除
    const deleteBtn = memo.querySelector('.delete')
    //メイン
    const main = memo.querySelector('.main')
    //テキストエリア
    const textArea = memo.querySelector('textarea')

    // テキストエリアに引数で渡したテキストを代入（新規/編集）
    textArea.value = text
    // markedは、HTMLに追加したプラグイン
    main.innerHTML = marked(text)

    // 削除クリックイベント
    deleteBtn.addEventListener('click', () => {
        deleteMemo(memo)
    })

    // // 編集ボタンのクリックイベント
    editBtn.addEventListener('click', () => {
        editMemo(main, textArea)
    })

    // テキストエリアのイベント
    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)

        // ローカルストレージの更新
        updateLS()

    })

    // bodyの子要素として追加
    document.body.appendChild(memo)
}

// ローカルストレージにメモ帳を保存
function updateLS() {

    // 要素を取得
    const memosText = document.querySelectorAll('textarea')

    const memos = []

    // 要素を格納
    memosText.forEach(memo => memos.push(memo.value))

    // ローカルストレージを保存（memo）
    localStorage.setItem('memos', JSON.stringify(memos))

}

// メモ帳削除
function deleteMemo(memo) {

    // 削除
    memo.remove()

    // ローカルストレージの更新
    updateLS()

}

// メモ帳編集
function editMemo(main, textArea) {
  // hiddenがついているものは消し、ついてないものは付与する
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
}