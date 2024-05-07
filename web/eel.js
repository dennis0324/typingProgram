$(document).ready(function(){
    $(".long_active").click(function(){
        console.log("active_long_term_practice");
        eel.long_active_sel();
    });
    $(".short_active").click(function(){
        console.log("execute short prac");
        eel.short_active_sel();
    });
    $(".word_active").click(function(){
        console.log("execute word prac display: line 137 - py");
        eel.word_active_sel();
    });
    $(".programming_active").click(function(){
        console.log("execute programming prac display: line 141 - py");
        eel.program_active_sel();
    });
    $(".setting").click(function(){
        console.log("execute setting display: line 145 - py");
        eel.setting_active_sel();
    });
});


eel.expose(tell_hash);
function tell_hash(a)
{
    $(".hashtag_tell").text("your HashTag is " + a + "\nPlease Remember!");
    setTimeout(function(){
        $("register-form").stop().animate({opacity: 0},250,function(){
            $("register-form").css("display","none");
            $("hashtag_teller").css("display","block");
            $("hashtag_teller").stop().animate({opacity: 1},250);
        });
    });

}
eel.expose(my_javascript_function);
function my_javascript_function(a,number,lang){
    console.log(a);
    var testing1 = a;
    var text_value;
    var long_term_line = $("<longterm_shell></longterm_shell>").addClass(number + " " + lang);
    $("long_word").append(long_term_line);
    for(var n = 0; n < testing1.length; n++)
    {
        var long_term_line = $("<longterm></longterm>").addClass(n+"lines line");
        $("longterm_shell." + number).append(long_term_line);
        for(var i = 0; i < testing1[n].length; i++)
        {
            if(testing1[n][i] == " ")
            text_value = "SAPCE";
            else
            text_value = testing1[n][i];
            var txt2 = $("<span></span>").text(testing1[n][i]).addClass(text_value + " init");  // Create text with jQuery
            $("." + n + "lines").append( txt2);   // Append new elements       
        }
    }
}
eel.expose(login_success);
function login_success(){
    $("title_div, login-form").stop().animate({opacity: 0},250,function(){
        $("title_div, login_form").css("display","none");
        $("#select_menu").css("display","block");
        $("#select_menu").stop().animate({opacity: 1},250);
    });
}

eel.expose(login_error);
function login_error(a){
    $(".reguirement_loginF_login").text(a);
    $(".reguirement_loginF_login").stop().animate({opacity:1},200,function(){
        setTimeout(function(){
            $('.reguirement_loginF_login').stop().animate({opacity:0},200);
        }, 2000);
    });

}
/* 실행 긴글 연습 */
eel.expose(display_long_term);
function display_long_term(list_title)
{
    console.log(list_title.length);
    var long_term_line = $("<long-menu-select></long-menu-select>");
    $(".long_active > ol").append(long_term_line);

    for(var i = 0; i < list_title.length; i++)
    {
        var title = $("<label></label>").text(list_title[i]).addClass(String(i));
        $(".long_active > ol").append(title)
    }
    $("select_menu").stop().animate({opacity: 0},250,function(){
        $("select_menu").css("display","none");
        $("long_word_select").css("display","block");
        $("long_word_select").stop().animate({opacity: 1},250);

    });
}
/*실행 짧은 글 연습 */
eel.expose(display_short_term);
function display_short_term(list_title)
{
    console.log(list_title.length);
    for(var i = 0; i < list_title.length; i++)
    {
        var title = $("<label></label>").text(list_title[i]).addClass(String(i));
        $("short_word_select > div").append(title)
    }
    $("select_menu").stop().animate({opacity: 0},250,function(){
        $("select_menu").css("display","none");
        $("short_word_select").css("display","block");
        $("short_word_select").stop().animate({opacity: 1},250);
    });
}
/*실행 낱말 연습 */
eel.expose(display_word);
function display_word(list_title)
{
    console.log(list_title.length);
    for(var i = 0; i < list_title.length; i++)
    {
        var title = $("<label></label>").text(list_title[i]).addClass(String(i));
        $("word_select > div").append(title)
    }
    $("select_menu").stop().animate({opacity: 0},250,function(){
        $("select_menu").css("display","none");
        $("word_select").css("display","block");
        $("word_select").stop().animate({opacity: 1},250);
    });
}
/*실행 프로그래밍 연습 */
eel.expose(display_program);
function display_program(list_title)
{
    console.log(list_title.length);
    for(var i = 0; i < list_title.length; i++)
    {
        var title = $("<label></label>").text(list_title[i]).addClass(String(i));
        $("program_select > div").append(title)
    }
    $("select_menu").stop().animate({opacity: 0},250,function(){
        $("select_menu").css("display","none");
        $("program_select").css("display","block");
        $("program_select").stop().animate({opacity: 1},250);
    });
}
/*실행 프로그래밍 연습 */

eel.expose(display_setting);
function display_setting(list_title)
{
    console.log(list_title.length);
    for(var i = 0; i < list_title.length; i++)
    {
        var title = $("<label></label>").text(list_title[i]).addClass(String(i));
        $("long_word_select > div").append(title)
    }
    $("select_menu").stop().animate({opacity: 0},250,function(){
        $("select_menu").css("display","none");
        $("setting_select").css("display","block");
        $("setting_select").stop().animate({opacity: 1},250);
    });
}


