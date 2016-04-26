/*var hw = document.getElementById('hw');
hw.addEventListener('click', function(){
    alert('Hello world');
})
*/
var sumName = "";

function summonerLookUp() {
    var SUMMONER_NAME = "";
    SUMMONER_NAME = $("#userName").val();

    var API_KEY = "2c8415cb-53b2-488d-85f2-b1b9d97be2b2";

    if (SUMMONER_NAME !== "") {

        $.ajax({
			url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/hello?api_key=2c8415cb-53b2-488d-85f2-b1b9d97be2b2',
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {
                //var SUMMONER_NAME_NOSPACES = SUMMONER_NAME.replace(" ", "");

                //SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();

                //summonerLevel = json[SUMMONER_NAME_NOSPACES].summonerLevel;
                //summonerID = json[SUMMONER_NAME_NOSPACES].id;

                //document.getElementById("summoner_Name").innerHTML = summonerLevel;
                //document.getElementById("sID").innerHTML = summonerID;
                
                //sumName = json[SUMMONER_NAME_NOSPACES].name;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.API_KEY);
            }
        });
    } else {}
}

function Name() {
    alert(sumName);
}



