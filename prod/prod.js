'use strict';

//要素取得
const addBtn = document.getElementById('add')

//ローカルストレージからデータの取得
const memo = JSON.parse(localStorage.getItem('memo'))
console.log(memo)

// // メモ帳追加処理を実行 addNewMemo(memo)の処理
if (memo) {
    memo.forEach(memo => addNewMemo(memo))
}

//addボタンをクリックした場合の作成イベント
 addBtn.addEventListener('click', () => addNewMemo())

//関数
function addNewMemo(text = '') {
    // div要素を作成
    const memo = document.createElement('div')
    // memoクラスの追加
    memo.classList.add('memo')

    // 操作要素作成
    const editBtn = memo.querySelector('.edit')
    const deleteBtn = memo.querySelector('.delete')
    const main = memo.querySelector('.main')
    const textArea = memo.querySelector('textarea')

    // メモ帳を追加
    memo.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fa fa-edit "></i></button>
        <button class="delete"><i class="fa fa-trash "></i> </button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `
    // markedは、HTMLに追加したプラグイン
    main.innerHTML = marked(text)

    // 削除のクリックイベントの登録
    deleteBtn.addEventListener('click', () => {
        deleteMemo(memo)
    })

    // 編集ボタンのクリックイベント
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
    const memoText = document.querySelectorAll('textarea')
    const memoList = []
    // 要素を格納
    memoText.forEach(memo => memoList.push(memo.value))
    // ローカルストレージを保存（memo）
    localStorage.setItem('memo', JSON.stringify(memo))
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






// 講義の内容
// //1.Save クリックイベント

// $('#save').on('click', function () {
//     const data = {
//         title: $('#input').val(),
//         text: $('#text_area').val(),
//     };
//     console.log(data);
//     const JsonData = JSON.stringify(data);
//     console.log(JsonData);
//     localStorage.setItem('memo', JsonData);
// });

// //2.clear クリックイベント
// $('#clear').on('click', function () {
//     localStorage.removeItem('memo');
//     $('#text_area').val('');
// });

// //3.ページ読み込み：保存データ取得表示
// if (localStorage.getItem("memo")) {
//     const JsonData = localStorage.getItem("memo");
//     console.log(JsonData);
//     const data = JSON.parse(JsonData);
//         $('#input').val(data.title);
//         $('#text_area').val(data.text);
// }



