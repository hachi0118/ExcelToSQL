var X = XLSX;

// ファイル選択時のメイン処理
function handleFile(e) {

    var files = e.target.files;
    var f = files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        var wb;
        var arr = fixdata(data);
        wb = X.read(btoa(arr), {
            type: 'base64',
            cellDates: true,
        });

        var output = "";
        output = to_json(wb);


        var EXPORT = '';
        for (var sheet in output) {
            var INSERT = '<button class="copy-btn">次のSQL文をコピー</button><div class="result">INSERT INTO `テーブル名` (';
            var VALUES = '';
            var lastrow = Object.keys(output[sheet]).pop();
            for (var row in output[sheet]) {
                var lastcolumn = Object.keys(output[sheet][row]).pop();
                VALUES = VALUES + '(';
                for (var column in output[sheet][row]) {
                    if (row == 0) {
                        INSERT = INSERT + '`' + column + '`' + (column !== lastcolumn ? ',' : ') VALUES<br>');
                    }
                    var dataExcel = output[sheet][row][column];
                    if (typeof dataExcel === 'number') {
                        VALUES = VALUES + dataExcel + (column !== lastcolumn ? ',' : ')');
                    } else if (typeof dataExcel === 'object') {
                        var y = dataExcel.getFullYear();
                        var m = ("00" + (dataExcel.getMonth()+1)).slice(-2);
                        var d = ("00" + dataExcel.getDate()).slice(-2);
                        var date = y + '-' + m + '-' + d;
                        VALUES = VALUES + "'" + date + "'" + (column !== lastcolumn ? ',' : ')');
                    } else {
                        VALUES = VALUES + "'" + dataExcel + "'" + (column !== lastcolumn ? ',' : ')');
                    }
                }
                if (row == lastrow) {
                    VALUES += ';</div>';
                } else {
                    VALUES += ',<br>';
                }
            }
        var EXPORT = EXPORT + INSERT + VALUES;
        }
        $("div#result-area").html(EXPORT);

    };

    reader.readAsArrayBuffer(f);
}

// ファイルの読み込み
function fixdata(data) {
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w,
        l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}

// ワークブックのデータをjsonに変換
function to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function (sheetName) {
        var roa = X.utils.sheet_to_json(
            workbook.Sheets[sheetName],
            {
                raw: true,
            });
        if (roa.length > 0) {
            result[sheetName] = roa;
        }
    });
    return result;
}

// 画面初期化
$(document).ready(function () {

    // ファイル選択欄 選択イベント
    // http://cccabinet.jpn.org/bootstrap4/javascript/forms/file-browser
    $('.custom-file-input').on('change', function (e) {
        handleFile(e);
        $(this).next('.custom-file-label').html($(this)[0].files[0].name);
    })
});



$(document).on('click', '.copy-btn', function(){
    // コピーする文章の取得
    let text = $(this).next().text();
    // テキストエリアの作成
    let $textarea = $('<textarea></textarea>');
    // テキストエリアに文章を挿入
    $textarea.text(text);
    // テキストエリアを挿入
    $(this).append($textarea);
    // テキストエリアを選択
    $textarea.select();
    // コピー
    document.execCommand('copy');
    // テキストエリアの削除
    $textarea.remove();
    // アラート文の表示
    alert('コピーできました！');
});


