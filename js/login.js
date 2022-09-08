/***** log-in pattern check *****/
$(function(){
    $(".li-submit").click(function(){
        let $form = $("form");
        let $userName = $("[name='username']");
        let $psw = $("[name='password']");

        const userNamePat = /^[a-z]+[a-z0-9]{5,19}$/g;
        const pswPat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

        if(!userNamePat.test($userName.val().trim())){
            alert("Username 형식이 올바르지 않습니다.");
            $userName.focus();
            return false;
        } else if(!pswPat.test($psw.val().trim())){
            alert("Password 형식이 올바르지 않습니다.");
            $psw.focus();
            return false;
        } else {
            $form.submit();
        }
    });
});