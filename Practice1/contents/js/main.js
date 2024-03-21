let actionCheckFlg = false;
let inputData = "";

// サブミット用関数
function submitAction(url) {
  if (actionCheckFlg) {
    return;
  } else {
    actionCheckFlg = true;
  }

  // エラーメッセージを非表示
  $("#alert").hide();
  // スピナー表示
  $("#spinner").removeClass("invisible");

  const csvData = csvToArray();

  const id = $('input[name="id"]').val();
  const pass = $('input[name="pass"]').val();
  let errFlg = true;

  for (let i = 0; i < csvData.length; i++) {
    if (
      csvData[i][0].trim() == id.trim() &&
      csvData[i][1].trim() == pass.trim()
    ) {
      errFlg = false;
    }
  }

  // 遅らせて実行
  setTimeout(function () {
    actionCheckFlg = false;

    if (errFlg) {
      $("#alert").show();
      // $('input[name="pass"]').val("");
      // スピナー非表示
      $("#spinner").addClass("invisible");
    } else {
      // 以下ブラウザバッグ時に残らないように消去
      $("#form")[0].reset();
      $("#table-data").val("");
      $("#spinner").addClass("invisible");
      window.location.href = url;
    }
  }, 1000);
}

/**
 * 埋め込みスクリプト
 */
$(function () {
  $(".setting-btn").click(function () {
    $(this).toggleClass("active");
  });

  // メッセージ非表示
  $("#alert").hide();
  // エンターキー押下イベント
  $(".enter").keypress(function (e) {
    if (e.which == 13) {
      var data = $(this).attr("data");
      $("#" + data).click();
      return false;
    }
  });
  // html5のパターンチェックのエラーメッセージ設定スクリプト
  $("input").each(function (index, elem) {
    if (elem.validity.valueMissing) {
      if (elem.getAttribute("valuemissing")) {
        elem.setCustomValidity(elem.getAttribute("valuemissing"));
      }
    }
    elem.addEventListener("keyup", function (event) {
      if (elem.validity.valueMissing) {
        if (elem.getAttribute("valuemissing")) {
          elem.setCustomValidity(elem.getAttribute("valuemissing"));
        }
      } else if (elem.validity.typeMismatch) {
        if (elem.getAttribute("typeMismatch")) {
          elem.setCustomValidity(elem.getAttribute("typeMismatch"));
        }
      } else if (elem.validity.patternMismatch) {
        if (elem.getAttribute("patternMismatch")) {
          elem.setCustomValidity(elem.getAttribute("patternMismatch"));
        }
      } else {
        elem.setCustomValidity("");
      }
    });
  });

  $("#table-data").on("input", function () {
    inputData = $(this).val();
    if (inputData) {
      $(".setting-btn").removeClass("first");
    } else {
      $(".setting-btn").addClass("first");
    }
  });
});

/**
 * チェック check
 * @param id フォームId
 * @return boolean チェック結果
 */
const check = (id) => {
  // 表示状態をリセット
  $("#" + id)[0].reportValidity();

  if ($("#" + id)[0].checkValidity()) {
    return true;
  } else {
    $("#" + id)[0].reportValidity();
    return false;
  }
};

const csvToArray = () => {
  const lf = String.fromCharCode(10);
  const csvData = inputData.split(lf).map((line) => line.split(","));
  return csvData;
};
