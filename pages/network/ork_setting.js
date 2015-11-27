/**
 * Created by kindmong on 2015-11-05.
 */
$(document).ready(function(){
    $('input:radio[name="inlineRadioOptions"]').change(function() {
        console.log("Ataeta");
    });
    // LTE 모델일때 비활성
    loadNetworkData();
});

function loadNetworkData() {
    $.ajax({
        type:"get",
        url:"/cgi-bin/network?cmd=status",
        dataType:"xml",
        success : function(xml) {
            // 통신이 성공적으로 이루어졌을 때 이 함수를 타게 된다.
            // TODO
            $(xml).find("ETH").each(function(){
                console.log($(this).find("INDEX").text());
                console.log($(this).find("IFNAME").text());
                console.log($(this).find("IPADDR").text());
                console.log($(this).find("NETMASK").text());
                console.log($(this).find("MACADDR").text());

                if($(this).find("IFNAME").text() == "br-lan") {
                    insertLanData($(this));
                }
                if($(this).find("IFNAME").text() == "eth0") {
                    insertWanData($(this));
                }
            });
            // Gateway IP
            $(xml).find("DNS").each(function() {
                if($(this).find("INDEX").text() == "1") {
                    document.getElementById("inputgate").value = $(this).find("IPADDR").text();
                }
            });
        },
        error : function(xhr, status, error) {
            alert("에러발생");
        }
    });
}

// LAN 속성을 input에 넣어준다.
function insertLanData(xml) {
    document.getElementById("inputmac2").value = xml.find("MACADDR").text();
    document.getElementById("inputip2").value = xml.find("IPADDR").text();
    document.getElementById("inputsubnet2").value = xml.find("NETMASK").text();
}

// WAN 속성을 input에 넣어준다.
function insertWanData(xml) {
    document.getElementById("inputmac").value = xml.find("MACADDR").text();
    document.getElementById("inputip").value = xml.find("IPADDR").text();
    document.getElementById("inputsubnet").value = xml.find("NETMASK").text();
}