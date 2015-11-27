/**
 * Created by kindmong on 2015-10-27.
 */
$(document).ready(function(){

    // 검색 버튼
    $("#btn_search").click(function(){
        loadData();
    });
});
function loadData () {
    $.getJSON("../sensornodedata.json", function (data) {
        var tbody = makePanel("00405c8e6838");

        $.each(data, function (index, item) {
            console.log(index, item);
            makeBody(tbody, index, item, "00405c8e6838");
        });
    });
}

function makePanel(_mac) {

    // 패널을 추가할 row 생성
    var row = document.createElement("div");
    row.setAttribute("class", "row");

    var col_lg_12 = document.createElement("div");
    col_lg_12.setAttribute("class", "col-lg-12");

    // 패널 생성
    var panel = document.createElement("div");
    panel.setAttribute("class", "panel panel-green");

    // 패널 헤더
    var panel_header = document.createElement("div");
    panel_header.setAttribute("class", "panel-heading");
    panel_header.innerHTML = _mac;

    //패널 푸터
    var panel_footer = document.createElement("div");
    panel_footer.setAttribute("class", "panel-footer");

    //패널 등록 버튼
    var btn_success = document.createElement("button");
    btn_success.setAttribute("class", "btn btn-success");
    btn_success.setAttribute("type", "button");
    btn_success.appendChild(document.createTextNode("Register"));

    //패널 닫기 버튼
    var btn_close = document.createElement("button");
    btn_close.setAttribute("class", "btn btn-danger");
    btn_close.setAttribute("type", "button");
    btn_close.appendChild(document.createTextNode("Close"));

    //패널 안에 센서 리스트들 테이블로 구성
    var table = document.createElement("table");
    table.setAttribute("class", "table table-bordered");

    var thead = document.createElement("thead");
    var thead_tr = document.createElement("tr");
    thead.appendChild(thead_tr);

    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.value = "";
    thead_tr.appendChild(document.createElement("th")).appendChild(input);
    thead_tr.appendChild(document.createElement("th")).innerHTML = "ID";
    thead_tr.appendChild(document.createElement("th")).innerHTML = "Name";
    thead_tr.appendChild(document.createElement("th")).innerHTML = "Type";
    thead_tr.appendChild(document.createElement("th")).innerHTML = "Value";
    thead_tr.appendChild(document.createElement("th")).innerHTML = "Time";
    thead_tr.appendChild(document.createElement("th")).innerHTML = "Status";
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    tbody.setAttribute("id", "tbody");
    table.appendChild(tbody);

    panel_footer.appendChild(btn_success);
    panel_footer.appendChild(btn_close);
    row.appendChild(col_lg_12);
    col_lg_12.appendChild(panel);
    panel.appendChild(panel_header);
    panel.appendChild(table);
    panel.appendChild(panel_footer);

    document.getElementById("page-wrapper").appendChild(row);

    return tbody;
}

function makeBody(_tbody, _index, _item, _mac) {

    var tbody_tr = document.createElement("tr");
    _tbody.appendChild(tbody_tr);

    var input = document.createElement("input");
    input.type = "checkbox";
    input.value = "";
    tbody_tr.appendChild(document.createElement("th")).appendChild(input);
    tbody_tr.appendChild(document.createElement("th")).innerHTML = _item.id;
    var input = document.createElement("input");
    input.setAttribute("class", "form-control");
    input.setAttribute("type", "text");
    input.setAttribute("id", "input_" + _mac + "_" + _item.id + "_" + _index);
    input.value = _item.name;
    console.log(input.id);
    tbody_tr.appendChild(document.createElement("td").appendChild(input));
    tbody_tr.appendChild(document.createElement("td")).innerHTML = _item.type;
    tbody_tr.appendChild(document.createElement("td")).innerHTML = _item.value;
    tbody_tr.appendChild(document.createElement("td")).innerHTML = _item.time;
    tbody_tr.appendChild(document.createElement("td")).innerHTML = _item.status;
}