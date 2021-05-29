'use strict';

//要素取得
const addBtn = document.getElementById('add')
let count = 0;

//メモの数のカウントアップ
function counter() {
//クリックされた回数をカウント
    count++;
    console.log(count);
    document.getElementById("countmemo").innerHTML = count;
}

// 日付の操作
let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let day = date.getDate();

document.getElementById("today").innerHTML = year + "年" + month + "月" + day + "日のメモ : " + "&nbsp";


// マウスタッチ
// let memoDrop = document.getElementById("memoDrop");

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
}

// メモ帳編集
function editMemo(main, textArea) {
  // hiddenがついているものは消し、ついてないものは付与する
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
}

// クリアボタン メモ全体がクリアになる予定
clear.addEventListener('click', () => {
    localStorage.clear();
    document.location.reload();
    })
