/***** header : click event *****/
$(function(){
    /* index - side bar menu open & close */
    $('.s-menu-openBtn').click(function(){
        $('.s-menu').addClass('on');
        $('html, body').addClass('hidden');
    });
    $('.s-menu-closeBtn').click(function(){
        $('.s-menu').removeClass('on');
        $('html, body').removeClass('hidden');
    });

    /* alert : no service */
    $('.no-service').click(function(){
        alert("서비스 준비중입니다.");
    });
    $('.member-only').click(function(){
        alert("로그인이 필요합니다.");
    });
});