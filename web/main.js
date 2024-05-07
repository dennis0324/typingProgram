
var get_keydown_ok = false;
var testing = 0;
$(document).on("keydown", function (e) {
    enter_active = false;
    space_active = false;
    console.log(typing_actived);
    if(get_keydown_ok)
    {
        console.log(e.which);
        if (e.which == 8 && !able_erase && $(e.target).is("input, textarea"))
            e.preventDefault();
        if(e.which == 8)
            key_press-=3;
        else if(e.which == 16 || e.which == 122|| e.which == 120)
        {
            
        }
        else if(e.which == 27)
        {
            if (pasue == 1)
            {
                pasue = 0;
                showpause();
            }
            else if (pasue == 0)
            {
                pasue = 1;
                showpause();
            }
            console.log("esc pressed");
        }
        else if(e.which == 13)
            enter_active = true;
        else if(e.which == 32)
        {
            console.log(space_active);
            space_active = true;
        }
        else
        {
            if(j < countline)
            {
                typing_actived = true;
                key_press++;
            }
            else
            {
                console.log("not working");
            }
        }
    }
    
    // $(".setting").click( function() {
    //     if(testing == 0)
    //     {
    //         console.log("loginedName" + loginedName + "loginedHash" + String(loginedHash));
    //         console.log("starting... gettasu")
    //         eel.get_tasu_acc_chart(loginedName,loginedHash,'long',language);
    
    //             var newDataset = {
    //                 label: '타수',
    //                 backgroundColor: window.chartColors.blue,
    //                 borderColor: window.chartColors.blue,
    //                 fill: false,
    //                 yAxisID: 'y-axis-1',
    //                 data: data1_list
    //             };
    //         config.data.datasets.push(newDataset)
    //         window.myLine.update();   
    //         testing = 1;
    //     }
  
    // });

});

window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    //eel.get_tasu_acc_chart(loginedName,loginedHash,'long',language);
    window.myLine = new Chart(ctx, config);
};



function showpause()
{
    $("#pause_screen").toggleClass("hidden");
}

function fade_animation(vanish,appear,time)
{
    
    $(vanish).stop().animate({opacity: 0},250,function(){
        $(vanish).css("display","none");
        $(appear).css("display","block");
        $(appear).stop().animate({opacity: 1},time);
    });
}

$(document).ready(function(){
    $("#tasu").addClass("hidden");
    $("#accurary").addClass("hidden");
    $("#pageleft").addClass("hidden");
    $(window).on('beforeunload', function(){ alert ('Bye now')});


    var doit;
    $(window).resize(function() {
        clearTimeout(doit);
        doit = setTimeout(resize_setting_panel, 100);
        
    });
    function resize_setting_panel()
    {
        var width = $(this).width();
        var numofpan = (width - 100) % 170;
        console.log(numofpan);
        var left = ((numofpan / 2) + 50) + "px";
        console.log("transform: " + left);
        $("setting_select").css({"left":left});
    }

    $( ".login-btn" ).click( function() {
        eel.getting_ID($('.animate_input').val());
    } );
    $( ".register-btn" ).click( function() {
        $(".val_name").val("");
        $(".val_id").val("");
        $("input[id='mail']").val("");
        $("login-form, title_div").animate({
            opacity:0
        },500,function(){

            $("login-form, title_div").css("display","none");
            $("register-form").css("display","block");

            $("register-form").stop().animate({opacity:1},500,function(){

            });
        });
    } );
    $(".cancel-btn").click(function(){
        $("login-form, title_div").css("display","block");
        $("register-form").stop().animate({opacity:0},500,function(){
            $(this).css("display","none");
            $("login-form, title_div").animate({
                opacity:1
                },250,function(){

            });
        });
    });
    //입력 감지
    $("#hashtag_OK").click(function(){
        $("hashtag_teller").stop().animate({opacity: 0},250,function(){
            $("hashtag_teller").css("display","none");
            $("title_div, login-form").css("display","block");
            $("title_div, login-form").stop().animate({opacity: 1},250);
        });
    });

    $(".register-btn-set").click(function(){
        var allow_to_register = 1;
        var name_data = $(".val_name").val();
        var id_data = $(".val_id").val();
        var email_data = $.trim($("input[id='mail']").val())
        if(name_data == '')
        {
            console.log("name");
            $('.requirement_name').stop().animate({opacity:1},200,function(){
                setTimeout(function(){
                    $('.requirement_name').stop().animate({opacity:0},200);
                }, 2000);
            });
            allow_to_register = 0;
        }
        if(id_data == '')
        {
            console.log("id");
            $('.requirement_ID').stop().animate({opacity:1},200,function(){
                setTimeout(function(){
                    $('.requirement_ID').stop().animate({opacity:0},200,function(){
                
                    });
                }, 2000);

            });
            allow_to_register = 0;

        }
        if($.trim(email_data) == ''){
            console.log("email");
            $('.requirement_email').stop().animate({opacity:1},200,function(){
                setTimeout(function(){
                    $('.requirement_email').stop().animate({opacity:0},200,function(){
                
                    });
                }, 2000);
            });
            allow_to_register = 0;
        }else{
            var emailExp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if(!emailExp.test(email_data)){
                    console.log("email");
                    $('#email').focus();
                    $('.requirement_email').stop().animate({opacity:1},200,function(){
                        setTimeout(function(){
                            $('.requirement_email').stop().animate({opacity:0},200,function(){
                
                            }); 
                        }, 2000);
                    });
                    allow_to_register = 0;
                }
        }
        if(allow_to_register == 1)
        {
            eel.register_id(name_data,id_data,email_data);
            var allow_to_register = 1;
            var name_data = $(".val_name").val();
            var id_data = $(".val_id").val();

        }
        console.log("register" + name_data + id_data + email_data);
    });

    //긴글 연습 이벤트 핸들러
    $("#select_list").on('click',"li",function(){
        setlang();
        var getclassname = $(this).attr('class');
        $("#select_menu").addClass("hidden");
        get_keydown_ok = true;
        $("#nav").addClass("hidden");
        console.log(Number(getclassname[0]));
        $("select_menu").addClass("hidden");
        console.log("get_keydown_ok: " + get_keydown_ok);
        eel.get_term_file(Number(getclassname[0]),0,language);
    });
    var i = 1;

    $("#nav").on('click',"li",function(){
        var getname = $(this).attr('class');
        var type = Number(getname[0]);
        if(type == 0)
        {
            
            $("#setting").addClass("hidden");
            $("#select_menu").removeClass("hidden");
            eel.load_menu_sel(language);
        }
        else if(type == 1)
        {
            get_keydown_ok = true;
            $("#setting").addClass("hidden");
            $("#select_menu").addClass("hidden");
            $("#nav").addClass("hidden");
            eel.get_term_file(0,1,language);
        }
        else if(type == 3)
        {
            get_keydown_ok = true;
            $("#setting").addClass("hidden");
            $("#select_menu").addClass("hidden");
            $("#nav").addClass("hidden");
            console.log("3 clicked");
            eel.get_term_file(0,3,language);
            
        }
        else if(type == 4)
        {

            $("#select_menu").addClass("hidden");
            $("#setting").removeClass("hidden");
        }
    });
    var exit_confrim = 0;
    $(".btn-exit").click(function(){
        clearInterval(timer)
        if(exit_confrim == 0)
        {
            $(".caution_msg").text("정말로 나가시겠습니까? 나가시려면 한번더 exit을 눌러주십시오.");
            exit_confrim = 1;
        }
        else if(exit_confrim == 1)
        {
            exit_confrim = 2;
        }
        if(exit_confrim == 2)
        {
            setlang();
            eel.load_menu_sel(language);
            $("terms").remove();
            $("#tasu").addClass("hidden");
            $("#accurary").addClass("hidden");
            $("#pageleft").addClass("hidden");
            $("#pause_screen").toggleClass("hidden");
            $("#select_menu").toggleClass("hidden");
            $("#current_cursor_pos").addClass("hidden");
            $("#nav").removeClass("hidden");

            $(".hidden-text").val("");
            n = 0,max = 0,j = 0;
            typing_actived = false;
            pasue = 0;
            get_keydown_ok = false;
            exit_confrim = 0;
            long_time_left = time_left;
            $(".caution_msg").text("");
        }
    });
    
    $(".btn-resume").click(function(){
        console.log("resume clicked");
        $("#pause_screen").toggleClass("hidden");
        $(".hidden-text").focus();
        exit_confrim = 0;
        pasue = 0;
    });
    $("#lang").click(function(){
        if($("#lang").is(":checked")){
            console.log("checked");
            language = 1;

        }
        else
        {
            console.log("unchecked");
            language = 0;

        }
    });

    $(".logout").click(function(){
        $("#setting").addClass("hidden");
        $("title_div, login-form").css("display","block");
        $("title_div, login-form").stop().animate({opacity: 1},250);
        $("nav").toggleClass("navhidden");
        $("#id_input").val("");
    });
});
var a;

function getchart(select_num)
{
    if( select_num == 0)
    {
        if(language = 0)
        {
            eel.get_tasu_acc_chart(loginedName,loginedHash,'long',language)
        }
        else
        {
            eel.get_tasu_acc_chart(loginedName,loginedHash,'long',language)
        }
    }
    else if (select_num == 1)
    {
        if(language = 0)
        {
            eel.get_tasu_acc_chart(loginedName,loginedHash,'short',language)
        }
        else
        {
            eel.get_tasu_acc_chart(loginedName,loginedHash,'short',language)
        }
    }
    else if (select_num == 2)
    {
        if(language = 0)
        {
            eel.get_tasu_acc_chart(loginedName,loginedHash,'programming',language)
        }
        else
        {
            eel.get_tasu_acc_chart(loginedName,loginedHash,'programming',language)
        }
    }
}
eel.expose(tell_hash);
function tell_hash(a)
{
    $(".hashtag_tell").text("your HashTag is " + a + "Please Remember!");
    setTimeout(function(){
        $("register-form").stop().animate({opacity: 0},250,function(){
            $("register-form").css("display","none");
            $("hashtag_teller").css("display","block");
            $("hashtag_teller").stop().animate({opacity: 1},250);
        });
    });

}
eel.expose(login_success);
function login_success(){
    console.log("active login_success");
    eel.load_menu_sel(language);
    fade_animation("title_div, login-form","#select_menu",250);
    eel.getidandhash();
    $("#select_menu").removeClass("hidden");
    $("nav").toggleClass("navhidden");
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
function display_long_term(list_title,language)
{
    console.log(list_title.length);
    $("#select_list > li").remove();
    for(var i = 0; i < list_title.length; i++)
    {
        var title = $("<li></li>").text(list_title[i]).addClass(String(i)+" list_num" + String(i) + " listnum");
        $("#select_list").append(title)
    }
    $("select_menu").toggleClass("hidden");
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
    fade_animation("select_menu","short_wor_select",250);
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
    fade_animation("select_menu","word_select",250)
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


eel.expose(getidandhash);
function getidandhash(name,hash)
{
    loginedName = name;
    loginedHash = hash;
    console.log(loginedName,loginedHash);
    //eel.get_tasu_acc_chart(loginedName,loginedHash,'long',language);
    var str = "" + hash
    var pad = "0000"
    var ans = pad.substring(0, pad.length - str.length) + str
    $("#user-name > span").text(name + "#"+ans);
}

eel.expose(get_tasu_acc_chart);
function get_tasu_acc_chart(list_data)
{
    data1_list = list_data[0];
    data2_list = list_data[1];
    label_list = [1,2,3,4,5];
    console.log(data2_list);
}

