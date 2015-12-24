/**
 * Created by kindmong on 2015-10-27.
 */
$(document).ready(function(){
    loadData();
});
function loadData () {
    $.ajax({
        type:"get",
        url:"http://10.0.1.159/cgi-bin/sensor?cmd=sensinglist",
        //url:"../js/pages/network.xml",
        dataType:"xml",
        success : function(xml) {


            // 통신이 성공적으로 이루어졌을 때 이 함수를 타게 된다.
            // TODO
            $(xml).find("SENSOR").each(function(){
                //console.log($(this), $(this).find("MAC").text());
                var tbody = makePanel($(this).find("MAC").text());
                makeBody(tbody, $(this), $(this).find("MAC").text());
            });
        },
        error : function(xhr, status, error) {
            alert("에러발생");
        }
    });
}

function makePanel(_mac) {

    if (document.getElementById("row_" + _mac)) {
        //console.log("있음");
        return document.getElementById("tbody_" + _mac);
    }

    // 패널을 추가할 row 생성
    var row = document.createElement("div");
    row.setAttribute("id", "row_" + _mac);
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
    thead_tr.appendChild(document.createElement("th")).innerHTML = "Modify";
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    tbody.setAttribute("id", "tbody_" + _mac);
    table.appendChild(tbody);

    row.appendChild(col_lg_12);
    col_lg_12.appendChild(panel);
    panel.appendChild(panel_header);
    panel.appendChild(table);

    document.getElementById("page-wrapper").appendChild(row);

    return tbody;
}

function makeBody(_tbody, _item, _mac) {

    var tbody_tr = document.createElement("tr");
    _tbody.appendChild(tbody_tr);

    tbody_tr.appendChild(document.createElement("th")).innerHTML = _item.find("ID").text();
    tbody_tr.setAttribute("id", "tr_" + _mac.replace(/"/g, "") + "_" + _item.find("ID").text().replace(/"/g, ""));

    tbody_tr.appendChild(document.createElement("td")).innerHTML = _item.find("NAME").text();
    tbody_tr.appendChild(document.createElement("td")).innerHTML = _item.find("TYPE").text();

    var btn_modify = document.createElement("button");
    btn_modify.setAttribute("class", "btn btn-danger btn-xs");
    btn_modify.setAttribute("type", "button");
    btn_modify.setAttribute("id", _item.find("ID").text());
    btn_modify.appendChild(document.createTextNode("Modify"));
    btn_modify.addEventListener("click", function(){
        console.log(this.id);
        document.getElementById("modal_title").innerHTML = _item.find("ID").text();
        document.getElementById("sensor_name").value = _item.find("NAME").text();
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