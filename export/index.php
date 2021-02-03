<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>えくすぽ～と</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
  <div class="wrapper">
    <div class="custom-file">
      <input type="file" class="custom-file-input" id="customFile">
      <label class="custom-file-label" for="customFile">Excelファイルを選択...</label>
    </div>
      <p>上のエリアにExcelファイルをドラッグ&ドロップしてもできます。<br>複数シートからのSQL文生成にも対応しました！！</p>
    <div>
      <h3>結果</h3>
      <div id="result-area">ここにSQL文を出力します</div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.11.19/xlsx.full.min.js"></script>
</body>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="script.js"></script>
</html>
