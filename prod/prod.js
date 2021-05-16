'use strict';


    //1.Save クリックイベント
    $('#save').on('click', function () {
        const data = {
            title: $('#input').val(),
            text: $('#text_area').val(),
        };
        console.log(data);
        const JsonData = JSON.stringify(data);
        console.log(JsonData);
        localStorage.setItem('memo', JsonData);
    });

    //2.clear クリックイベント
    $('#clear').on('click', function () {
        localStorage.removeItem('memo');
        $('#text_area').val('');
        });

    //3.ページ読み込み：保存データ取得表示
    if (localStorage.getItem("memo")) {
        const JsonData = localStorage.getItem("memo");
        console.log(JsonData);
        const data = JSON.parse(JsonData);
        $('#input').val(data.title);
        $('#text_area').val(data.text);
    }
