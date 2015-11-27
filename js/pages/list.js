/**
 * Created by kindmong on 2015-10-27.
 */
$(document).ready(function(){
    loadData();
});
function loadData () {
    $.getJSON("../../sensornodedata.json", function (data) {
        var tbody = makePanel("00405c8e6838");

        $.each(data, function (index, item) {
            console.log(index, item);
            makeBody(tbody, index, item);
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

    var panel_close_div = document.createElement("div");
    panel_close_div.setAttribute("class", "pull-right");
    var panel_close_btn = document.createElement("button");
    panel_close_btn.setAttribute("class", "btn btn-danger btn-xs");
    panel_close_btn.setAttribute("type", "button");
    panel_close_btn.appendChild(document.createTextNode("X"));
    panel_close_btn.addEventListener("click", function(){
        var parent_row = row.parentNode;
        parent_row.removeChild(row);
        row = null;
        removeSensorNode();
    });

    panel_close_div.appendChild(panel_close_btn);
    panel_header.appendChild(panel_close_div);

    //패널 안에 센서 리스트들 테이블로 구성
    var table = document.createElement("table");
    table.setAttribute("class", "table table-bordered");

    var thead = document.createElement("thead");
    var thead_tr = document.createElement("tr");
    thead.appendChild(thead_tr);

    thead_tr.appendChild(document.createElement("th")).innerHTML = "ID";
    thead_tr.appendChild(document.createElement("th")).innerHTML = "Name";
    thead_tr.appendChild(document.createElement("th")).innerHTML = "Type";
    thead_tr.appendChild(document.createElement("th")).innerHTML = "Value";
    thead_tr.appendChild(document.createElement("th")).innerHTML = "Time";
    thead_tr.appendChild(document.createElement("th")).innerHTML = "Status";
    thead_tr.appendChild(document.createElement("th")).innerHTML = "Modify";
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    tbody.setAttribute("id", "tbody");
    table.appendChild(tbody);

    row.appendChild(col_lg_12);
    col_lg_12.appendChild(panel);
    panel.appendChild(panel_header);
    panel.appendChild(table);

    document.getElementById("page-wrapper").appendChild(row);

    return tbody;
}

function makeBody(_tbody, _index, _item) {

    var tbody_tr = document.createElement("tr");
    tbody_tr.setAttribute("id", "tr_" + _item.id);
    _tbody.appendChild(tbody_tr);

    tbody_tr.appendChild(document.createElement("th")).innerHTML = _item.id;
    var name_td = document.createElement("td");
    name_td.setAttribute("id", "name");
    tbody_tr.appendChild(name_td).innerHTML = _item.name;
    tbody_tr.appendChild(document.createElement("td")).innerHTML = _item.type;
    tbody_tr.appendChild(document.createElement("td")).innerHTML = _item.value;
    tbody_tr.appendChild(document.createElement("td")).innerHTML = _item.time;
    tbody_tr.appendChild(document.createElement("td")).innerHTML = _item.status;

    var btn_modify = document.createElement("button");
    btn_modify.setAttribute("class", "btn btn-danger btn-xs");
    btn_modify.setAttribute("type", "button");
    btn_modify.setAttribute("id", _item.id);
    btn_modify.appendChild(document.createTextNode("Modify"));
    btn_modify.addEventListener("click", function(){
        console.log(this.id);
        document.getElementById("modal_title").innerHTML = _item.id;
        document.getElementById("sensor_name").value = _item.name;
        $("#myModal").modal();
    });
    tbody_tr.appendChild(document.createElement("th")).appendChild(btn_modify);
}

$("#modal_btn_delete").click(function(){
    removeSensor();
    $("#myModal").modal("hide");
});

$("#modal_btn_modify").click(function(){
    modifySensor();
    $("#myModal").modal("hide");
});

function modifySensor() {
    // db 수정

    // 리스트에서 수정
    var id = document.getElementById("modal_title").innerHTML;
    var tr = document.getElementById("tr_" + id);
    console.log(tr);
    var td = tr.childNodes.item(1);
    console.log(td);
    td.innerHTML = document.getElementById("sensor_name").value;
}

function removeSensor() {
    // db에서 삭제

    // 리스트에서 삭제
    var id = document.getElementById("modal_title").innerHTML;
    var tr = document.getElementById("tr_" + id);
    console.log(tr);
    var tr_parent = tr.parentNode;
    tr_parent.removeChild(tr);
    tr = null;
}

function removeSensorNode() {
    // db에서 삭제
}