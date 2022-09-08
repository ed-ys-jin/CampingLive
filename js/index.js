$(".con02").find("li").click(function(){
    let themeName = $(this).find("h3").attr("name");
    const setThemeName = JSON.stringify(themeName);
    localStorage.setItem("themeName", setThemeName);
});