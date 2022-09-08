let getCampName = localStorage.getItem("campName");
let getCampData = localStorage.getItem("campData");
let campName = JSON.parse(getCampName);
let campInfo = JSON.parse(getCampData);
localStorage.removeItem("campName");
localStorage.removeItem("campInfo");


/***** fill in table *****/
for(e of campInfo){
    if(e.facltNm == campName){
        /*** 주요정보 ***/
        $("#firstImageUrl").attr("src", e.firstImageUrl);   // 대표이미지
        $("#facltNm").text(e.facltNm);  // 캠핑장명
        $("#tel").text(e.tel);  // 문의처
        $("#addr1").text(e.addr1);  // 주소
        $("#lctCl").text(e.lctCl + "/" + e.facltDivNm); // 캠핑장 환경
        $("#induty").text(e.induty);    // 캠핑장 유형
        $("#operPdCl").text(e.operPdCl);    // 운영기간
        $("#operDeCl").text(e.operDeCl);    // 운영일
        $("#homepage").attr("href", e.homepage); // 홈페이지
        $("#homepage").text(e.homepage); // 홈페이지
        $("#resveCl").text(e.resveCl);  // 예약방법
        $("#posblFcltyCl").text(e.posblFcltyCl + e.posblFcltyEtc);  // 주변이용가능시설
        $("#sbrsCl").text(e.sbrsCl + e.sbrsEtc);    // 부대시설

        /*** 캠핑장 소개 ***/
        $("#intro").text(e.intro);  // 캠핑장 소개

        /*** 캠핑장 정보 ***/
        $("#animalCmgCl").text(e.animalCmgCl);  // 반려동물 동반여부
        $("#brazierCl").text(e.brazierCl);  // 화로대 사용여부
        $("#gnrlSiteCo").text(`일반야영장(${e.gnrlSiteCo}) 자동차야영장(${e.autoSiteCo}) 글램핑(${e.glampSiteCo}) 카라반(${e.caravSiteCo}) 개인야영장(${e.indvdlCaravSiteCo})`);  // 주요시설
        $("#toiletCo").text(`화장실(${e.toiletCo}) 샤워실(${e.swrmCo}) 개수대(${e.wtrplCo})`);  // 편의시설
        $("#siteMg1Co").text(`사이트1(${e.siteMg1Co}) 사이트2(${e.siteMg2Co}) 사이트3(${e.siteMg3Co})`);    // 사이트규격별 수량
        $("#siteBottomCl1").text(`잔디(${e.siteBottomCl1}) 파쇄석(${e.siteBottomCl2}) 테크(${e.siteBottomCl3}) 자갈(${e.siteBottomCl4}) 맨흙(${e.siteBottomCl5})`); // 사이트바닥별 수량
        $("#extshrCo").text(`소화기(${e.extshrCo}) 방화수(${e.frprvtWrppCo}) 방화사(${e.frprvtSandCo}) 화재감지기(${e.fireSensorCo})`);

        if(e.trlerAcmpnyAt === "Y"){    // 개인트레일러 동반여부
            $("#trlerAcmpnyAt").text("가능");  
        } else {
            $("#trlerAcmpnyAt").text("불가능");
        }

        if(e.caravAcmpnyAt === "Y"){    // 개인카라반 동반여부
            $("#caravAcmpnyAt").text("가능");
        } else {
            $("#caravAcmpnyAt").text("불가능");
        }
    }
}
