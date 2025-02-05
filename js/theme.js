let campData = [];  // localStorage data
let themeData = []; // for making more than 10 of theme camp list
let areaArr = [];   // location data
let markers = [];   // marker data
let themeTitle = "" // for saving theme title
let pageCounter = 1;

/***** get data from index.html *****/
if(localStorage.getItem("themeName") != null){
    let getThemeName = localStorage.getItem("themeName");
    themeTitle = JSON.parse(getThemeName);
    localStorage.rem(oveItem("themeName");
    switch(themeTitle){
        case "pat":
            $(".tm-dropbtn").text("댕댕이와");  
            break;      
        case "trail":
            $(".tm-dropbtn").text("산책로");  
            break;      
        case "fishing":
            $(".tm-dropbtn").text("낚시");  
            break;      
        case "wifi":
            $(".tm-dropbtn").text("무선인터넷");  
            break;      
    }
}

/***** get data from GOCAMP API *****/
function getData(){
    let api_key = "D7xN8zqJPXKCBRxg3z1aE1lTVR5xQS%2FM43iNgCCo%2BweFVFgviBFz%2FjMngcV4FZ8dnmkmkXWs5sVQ7GPXm9JcWA%3D%3D";
            
    // JSON
    const requestURL = `http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${api_key}&numOfRows=10&pageNo=${pageCounter}&MobileOS=ETC&MobileApp=AppTest&_type=json`;

    let request = new XMLHttpRequest();
    request.open('GET', requestURL);

    request.responseType = 'json';
    request.send();

    request.onload = function() {
        let data = request.response;
        let tmItem = data.response.body.items.item;
        if(themeTitle == ""){
            pageCounter++;
            createList(tmItem);
        } else {
            pageCounter++;
            createThemeList(tmItem);
        }
    }
}
// call function at first time on page loading
getData();

function createThemeList(tmItem){
    switch(themeTitle){
        case "pat":
            for(e of tmItem){
                if((e.animalCmgCl).indexOf("불가능") === -1){
                    themeData.push(e);
                }
            }
            break;
        case "trail":
            for(e of tmItem){
                if((e.sbrsCl).indexOf("산책로") > -1 || (e.posblFcltyCl).indexOf("산책로") > -1){
                    themeData.push(e);
                }
            }
            break;
        case "fishing":
            for(e of tmItem){
                if((e.sbrsCl).indexOf("낚시") > -1 || (e.posblFcltyCl).indexOf("낚시") > -1){
                    themeData.push(e);
                }
            }
            break;
        case "wifi":
            for(e of tmItem){
                if((e.sbrsCl).indexOf("무선인터넷") > -1 || (e.glampInnerFclty).indexOf("무선인터넷") > -1){
                    themeData.push(e);
                }
            }
            break;
    }

    if(themeData.length < 10){
        getData();
    } else {
        createList(themeData);
        themeData.splice(0);    /* reset themeData */
    }
}

function createList(tmItem){
    let tmCampList = document.querySelector(".tm-camp-list");

    for(let i = 0; i < tmItem.length; i++){
        /*** camp data save ***/
        campData.push(tmItem[i]);

        /*** create list ***/
        let tmLi = document.createElement("li");
        let wrapImage = document.createElement("div");
        let firstImageUrl = document.createElement("img");
        let tagSpan = document.createElement("span");
        let facltNm = document.createElement("h3");
        let tagA = document.createElement("a");
        let addr1 = document.createElement("p");
        let tel = document.createElement("p");
        let lineIntro = document.createElement("p");

        firstImageUrl.setAttribute("src", `${tmItem[i].firstImageUrl}`);
        tagSpan.setAttribute("class", "link-campInfo")
        tagA.setAttribute("href", "campInfo.html");
        tagA.setAttribute("target", "_blank")
        tagA.textContent = tmItem[i].facltNm;
        addr1.textContent = tmItem[i].addr1;
        tel.textContent = tmItem[i].tel;
        lineIntro.textContent = tmItem[i].lineIntro;
        
        facltNm.appendChild(tagA);
        tagSpan.appendChild(facltNm);
        wrapImage.appendChild(firstImageUrl);
        
        tmLi.setAttribute("class", "tm-li");
        tmLi.appendChild(wrapImage);
        tmLi.appendChild(tagA);
        tmLi.appendChild(addr1);
        tmLi.appendChild(tel);
        tmLi.appendChild(lineIntro);

        tmCampList.appendChild(tmLi);

        /*** push Marker data ***/
        let locationObj = [];
        locationObj.push(tmItem[i].facltNm);
        locationObj.push(tmItem[i].mapY);
        locationObj.push(tmItem[i].mapX);
        locationObj.push(tmItem[i].addr1);
        locationObj.push(tmItem[i].tel);
        areaArr.push(locationObj);
    }
    initMap(0, 0);
}


/***** NAVER map *****/
var map = null;

function initMap(mapX, mapY){
    /*** load map ***/
    if(mapX === 0 && mapY === 0){
        map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(36.38, 127.51),
            zoom: 7,
            minZoom: 7,
            zoomControl : true, //줌 컨트롤의 표시 여부
			zoomControlOptions : { //줌 컨트롤의 옵션
            position : naver.maps.Position.TOP_LEFT
			}
        });
    } else {   // click action : camp list
        map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(mapX, mapY),
            zoom: 14,
            minZoom: 7,
            scaleControl : true,
            zoomControl : true, //줌 컨트롤의 표시 여부
			zoomControlOptions : { //줌 컨트롤의 옵션
            position : naver.maps.Position.TOP_LEFT
			}
        });
    }

    /*** create marker ***/
    for(let i = 0; i < areaArr.length; i++){
        /*** create marker ***/ 
        let marker = new naver.maps.Marker({
            map: map,
            // title: areaArr[i][0],
            position: new naver.maps.LatLng(areaArr[i][1], areaArr[i][2])
        });

        /*** create infowindow ***/
        var contentString = [
            '<div class="camp-info-map">',
                `<h3>${areaArr[i][0]}</h3>`,
                `<p>${areaArr[i][3]}</p>`,
                `<p>${areaArr[i][4]}</p>`,
                // `<button type="button"><a href="campInfo.html" target="_blank">상세보기</a></button>`,
            '</div>'
        ].join('');

        let infowindow = new naver.maps.InfoWindow({
            content: contentString,
            maxWidth: 250,
            borderColor: "#00d3ed",
            anchorSize: new naver.maps.Size(15, 8),
        });

        /* marker toggle event */
        naver.maps.Event.addListener(marker, "click", function(e) {
			if (infowindow.getMap()) {
				infowindow.close();
			} else {
				infowindow.open(map, marker);
			}
		});
        markers.push(marker);
    }
}


/***** scroll event *****/
$(".tm-con01").scroll(function() {
	let scroll=$(this).scrollTop() + $(this).innerHeight(); 
	let height=$(this)[0].scrollHeight; 

	if(scroll >= height){
        getData();
	} 
});


/***** click events *****/
/*** click theme list ***/
$(".dropdown-btn").click(function(){
    themeTitle = $(this).attr("name");
    $(".tm-dropbtn").text($(this).text());

    /* reset saved data */
    $(".tm-camp-list").children().remove();;
    campData.splice(0);
    themeData.splice(0);
    areaArr.splice(0);
    markers.splice(0);
    pageCounter = 1;
    getData();
});

/*** click camp list : close up location of camp clicked ***/
$(".tm-camp-list").on("click", ".tm-li", function(){
    let windowWidth = $(window).width();
    if(windowWidth > 650){
        let tmFacltNm = $(this).find("a").text();
        for(e of areaArr){
            if(e[0] == tmFacltNm){
                    initMap(e[1], e[2]);
            }
        }
    }
});

/*** link to campInfo.html ***/
$(".tm-camp-list").on("click", "a", function(){
    let campName = $(this).text();
    let setCampName = JSON.stringify(campName);
    let setCampInfo = JSON.stringify(campData);
    localStorage.setItem("campName", setCampName);
    localStorage.setItem("campData", setCampInfo);
});