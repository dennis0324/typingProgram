var language = 0; //0 eng 1 kor
var time_left = 10;//5분 타이머 시연을 위해 10초로 설정
var line_left = 2;//30개 시연을 위해 5개로 설정
var typing_mode = 0;
var max = 0,j = 0,able_erase = 1;
var n = 0;
var typing_actived = false;
var key_press = 0;
var time_take = 0;
var backspace = 0;
var display_content_file;
var currentVal;
var total_char = 0,total_char_1 = 1;
var start_page = 0, end_page = 10, total_page;
var mode_type;
var pasue = 0;
var position_span; //span의 위치
var timer;
var tasu_1 
var accur;
var long_time_left = time_left; 
var short_line_left = line_left
var space_active, enter_active;
var complete_sen;
var tasu_total = 0, accur_total= 0;
var init_remove = 0;
var countline;
var loginedName ='', loginedHash = 0;
var label_list = [];
var data1_list = [];
var data2_list = [];
var char_length = 0;
window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};
function setlang()
{
    if($("#lang").is(":checked"))
    {
        console.log("KOR");
        language = 1;
    }
    else
    {
        console.log("ENG");
        language = 0;
    }
    
}
function startimer()
{
     timer = setInterval(function() { //실행할 스크립트 }, 1000);
    if (!pasue)
    {
        time_take++;
        long_time_left--;
        console.log(long_time_left + " " + typing_mode);
        if(long_time_left == 0 && typing_mode == 0)
        {
                        
            pasue = 0;
            setlang();
            get_keydown_ok = false;
            exit_confrim = 0;
            long_time_left = time_left;
            typing_actived = false;
            init_remove = 0;
            eel.load_menu_sel(language);
            eel.update_info_pre("long",language, tasu_1,accur)
            $("terms").remove();
            $("#tasu").addClass("hidden");
            $("#accurary").addClass("hidden");
            $("#pageleft").addClass("hidden");
            $("#select_menu").toggleClass("hidden");
            $("#current_cursor_pos").addClass("hidden");
            $("#nav").removeClass("hidden");
            $(".hidden-text").val("");
            n = 0,
            clearInterval(timer);
            $("#current_cursor_pos").addClass("hidden");
        }
        console.log(time_take + "sec");
    }
    },1000)
}

setInterval(function() { 
if(!pasue)
{
    tasu();
    if(total_char_1 == 0)
    total_char_1 = 1;
    accuracy();
    if (mode_type == 0)
        pageleft();
}
},100)

eel.expose(get_term_file);
function get_term_file(content_file,number_typing)
{
    display_content_file =  content_file;
    mode_type = number_typing;
    console.log(display_content_file);
    $.getScript("typing_term.js", function(){
        executing_typing_mode(number_typing,display_content_file)
    });

}

function executing_typing_mode(mode,content_txt)
{
    switch (mode) {
        case 0:
            $("#tasu").removeClass("hidden");
            $("#accurary").removeClass("hidden");
            $("#pageleft").removeClass("hidden");
            startimer();
            long_term_add_line(content_txt);
            $(".hidden-text").focus();
            typing_mode = 0;
            break;
        case 1:
            $("#tasu").removeClass("hidden");
            $("#accurary").removeClass("hidden");
            $("#pageleft").removeClass("hidden");
            startimer();
            short_term_add_line(content_txt);
            $(".hidden-text").focus();
            typing_mode = 1;
            break;    
        case 2:
            
            break;
        case 3:
            $("#tasu").removeClass("hidden");
            $("#accurary").removeClass("hidden");
            startimer();
            programming_term_add_line(content_txt);
            $(".hidden-text").focus();
            typing_mode = 3;
            break;
        case 4:

            break;
        default:
            break;
    }
}

$(".hidden-text").on("propertychange change keyup paste input", function() {
    //if(typing_mode == 0) //0 long 1 short 2 word 3 programming
    switch (typing_mode) {
        case 0:
            if(get_keydown_ok == true)
            long_tpying_layout();
            break;
        case 1:
            short_tpying_layout();
            break;    
        case 2:
            break;
        case 3:
            programming_tpying_layout();
            break;
        case 4:
            break;
        default:
            break;
    }
});

//긴글 연습
var init = 0;
function long_tpying_layout()
{
    
    if(typing_mode != 0)
        return 0;
    $("#current_cursor_pos").removeClass("hidden");

    var check_miss = 1;
    if(init == 0)
    {
        countline = $(".lines" +n).children().text().length;
        line_fold = $(".lines" +n).children().text();
        init = 1;
    }
    currentVal = $(".hidden-text").val();
    count_tpye = $(".hidden-text").val().length;
    total_char_1 = total_char + count_tpye;
    $(".lines"+ n + "-label").text(currentVal);
    j = currentVal.length - 1;
    if(j < countline)
    {
        if(max > j)
        {
            check_miss = 0;
            $("#current_cursor_pos > div > span").text(currentVal[j]);
            $(".lines" + n + " span:eq(" + (j + 1) +")").css("color","#000000");
            position_span = $(".lines" + n + " span:eq(" + j +")").position();
            $("#current_cursor_pos").css({"left" : position_span.left ,"top" : (position_span.top + $(".lines" + n + " span:eq(" + j +")").height()) +"px"});
            $("#current_cursor_pos > div > span").text(currentVal[j]);
            $(".lines" + n + " span:eq(" + (j + 1) +")").removeClass("wrong");
            $(".lines" + n + " span:eq(" + (j + 1) +")").removeClass("right");
        }
        if (j == -1)
        {
            j  = 0;
            check_miss = 0;
            $("#current_cursor_pos").addClass("hidden");
        }
        if(currentVal[0] == " ")
            $(".lines" +n+"-label").addClass("intend_spacing");
        else
            $(".lines" +n+"-label").removeClass("intend_spacing");
        if(currentVal[j] == line_fold[j] && check_miss)
        {
            $(".lines" + n + " span:eq(" + j +")").removeClass("wrong");
            position_span = $(".lines" + n + " span:eq(" + j +")").position();
            $("#current_cursor_pos").css({"left" : position_span.left ,"top" : (position_span.top + $(".lines" + n + " span:eq(" + j +")").height()) +"px"});
            $("#current_cursor_pos > div > span").text(currentVal[j]);
            $(".lines" + n + " span:eq(" + j +")").removeClass("init");
            $(".lines" + n + " span:eq(" + j +")").addClass("right");
            max = j;
        }
        else if(check_miss)
        {
            $(".lines" + n + " span:eq(" + j +")").addClass("wrong");
            position_span = $(".lines" + n + " span:eq(" + j +")").position();
            $("#current_cursor_pos").css({"left" : position_span.left ,"top" : (position_span.top + $(".lines" + n + " span:eq(" + j +")").height()) +"px"});
            $("#current_cursor_pos > div > span").text(currentVal[j]);
            max = j;
        }
        check_miss = 1;
        if(max > j)
            max--;

    }

    if(j >= countline - 1)
    {
        if(space_active == true|| enter_active)
        {
            console.log("finish");
            n++;
            max = 0;
            init = 0;
            total_char += countline; 
            $(".hidden-text").val("");
            j = 0;
            if(end_page == n)
            {   
                
                $(".hidden-text").val("");
                if(total_page - (total_page % 10) == end_page) { end_page = total_page % 10; }
                else { end_page += 10; start_page += 10; }
                console.log(display_content_file);
                executing_typing_mode(0,display_content_file);
                typing_actived = false;
            }
        }
    }
}

function long_term_add_line(content){
    setlang();
    $("typing_shell").remove();
    var testing1 = content;
    var text_value;
    total_page = testing1.length;
    var long_term_line = $("<typing_shell></typing_shell>");
    $("terms_module > div").append(long_term_line);
    for(var n = start_page; n < end_page; n++)
    {
        var long_term_line = $("<terms></terms>").addClass("lines"+ n +" line ");
        var long_term_label = $("<label></label>").addClass("lines"+n+"-label label-input");
        $("typing_shell").append(long_term_line);
        for(var i = 0; i < testing1[n].length; i++)
        {
            if(testing1[n][i] == " ")
                text_value = "SPACE";
            else
                text_value = testing1[n][i];
            var txt2 = $("<span></span>").text(testing1[n][i]).addClass(text_value + " init");
            $(".lines" +n).append( txt2);   // Append new elements       
        }
    }
    if (language == 1 && init_remove == 0)
    {
        console.log("executed!")
        $(".lines0 > span").first().addClass("remove");
        $(".remove").remove();
        init_remove = 1;
    }

}


//짧은 글 연습
function short_tpying_layout()
{

    if(typing_mode != 1)
        return 0;
    console.log("lang: " + String(language));
    if (typing_actived)
    $("#current_cursor_pos").removeClass("hidden");
    var check_miss = 1;
    if(init == 0)
    {
        countline = $(".lines" +n).children().text().length;
        line_fold = $(".lines" +n).children().text();
        init = 1;
    }
    currentVal = $(".hidden-text").val();
    count_tpye = $(".hidden-text").val().length;
    $(".lines"+ n + "-label").text(currentVal);
    j = currentVal.length - 1;
    total_char_1 = currentVal.length;
    $("#current_cursor_pos > div > span").text(currentVal[j]);
    if(j < countline)
    {
        if(max > j)
        {
            check_miss = 0;
            $(".lines" + n + " span:eq(" + (j + 1) +")").css("color","#000000");
            position_span = $(".lines" + n + " span:eq(" + j +")").position();
            $("#current_cursor_pos").css({"left" : position_span.left ,"top" : (position_span.top + $(".lines" + n + " span:eq(" + j +")").height()) +"px"});
            $(".lines" + n + " span:eq(" + (j + 1) +")").removeClass("wrong");
            $(".lines" + n + " span:eq(" + (j + 1) +")").removeClass("right");
        }
        if (j == -1)
        {
            j  = 0;
            check_miss = 0;
            $("#current_cursor_pos").addClass("hidden");
        }
        console.log("currentVal[j]: " + String(currentVal[j]) + " line_fold[j]: " + line_fold[j]);
        if(currentVal[j] == line_fold[j] && check_miss)
        {
            $(".lines" + n + " span:eq(" + j +")").removeClass("wrong");
            position_span = $(".lines" + n + " span:eq(" + j +")").position();
            $("#current_cursor_pos").css({"left" : position_span.left ,"top" : (position_span.top + $(".lines" + n + " span:eq(" + j +")").height()) +"px"});
            $(".lines" + n + " span:eq(" + j +")").removeClass("init");
            $(".lines" + n + " span:eq(" + j +")").addClass("right");
            max = j;
        }
        else if(check_miss)
        {
            $(".lines" + n + " span:eq(" + j +")").addClass("wrong");
            position_span = $(".lines" + n + " span:eq(" + j +")").position();
            $("#current_cursor_pos").css({"left" : position_span.left ,"top" : (position_span.top + $(".lines" + n + " span:eq(" + j +")").height()) +"px"});
            max = j;
        }
        check_miss = 1;
        if(max > j)
            max--;
    }
    if(j >= countline - 1)
    {
        if(space_active == true|| enter_active)
        {
            $(".hidden-text").val("");
            console.log("lang: " + String(language));

            tasu_total += parseInt(tasu_1, 10);
            accur_total += accur;
            time_take = 0;
            console.log("tasu_total " + tasu_total + "accur_total "+accur_total)
            $(".hidden-text").val("");
            n++;
            max = 0;
            init = 0;
            short_line_left--;
            console.log("short_line_left : " + short_line_left);
            console.log("lang: " + String(language));
            $("#current_cursor_pos").addClass("hidden");
            short_term_add_line(display_content_file)
            typing_actived = false;
            if(short_line_left == 0)
            {
                setlang();
                ave_accur = accur_total / line_left;
                ave_tasu = tasu_total / line_left;
                eel.update_info_pre("short",language, tasu_1,accur);
                console.log("평균 타수: " + ave_tasu);
                //save_value_long(tasu_1,accur)
                $("terms").remove();
                $("#tasu").addClass("hidden");
                $("#accurary").addClass("hidden");
                $("#pageleft").addClass("hidden");
                $("#nav").removeClass("hidden");
                $("#select_menu").removeClass("hidden");
                $("#current_cursor_pos").addClass("hidden");
                $(".hidden-text").val("");
                eel.load_menu_sel(language);
                clearInterval(timer);
                n = 0,max = 0,j = 0;
                
                typing_actived = false;
                pasue = 0;
                get_keydown_ok = false;
                exit_confrim = 0;
                long_time_left = time_left;
                accur_total = 0;
                tasu_1 = 0;
                return 0;
            }
        }

    }
}

function short_term_add_line(content)
{
    console.log("lang: " + String(language));

    $("typing_shell").remove();
    var testing1 = content;
    var rand_line = Math.floor( Math.random()*(testing1[0].length) );
    console.log(rand_line + "line found...");
    var text_value;
    var term_line = $("<typing_shell></typing_shell>");
    $("terms_module > div").append(term_line);

    var term_line = $("<terms></terms>").addClass("lines"+ n +" line ");
    $("typing_shell").append(term_line);
    for(var i = 0; i < testing1[0][rand_line].length; i++)
    {
        if(testing1[0][rand_line][i] == " ")
        text_value = "SPACE";
        else
        text_value = testing1[0][rand_line][i];
        var txt2 = $("<span></span>").text(testing1[0][rand_line][i]).addClass(text_value + " init");
        $(".lines" +n).append( txt2);   // Append new elements       
    }
    total_char_1 = 1;
    typing_actived = false;
}

//프로그래밍 연습
var offset = 0;
function programming_tpying_layout()
{
    if(typing_mode != 3)
        return 0;
    $(".remove").remove();
    if($(".lines" + n).hasClass("empty"))
    {
        console.log("can't find line" + n);
        n++;
    }
    console.log("3 exe");
    $("#current_cursor_pos").removeClass("hidden");
    check_miss = 1;
    typing_actived = true;
    if(init == 0)
    {
        console.log("init complete");
        countline = $(".lines" +n).children().text().length;
        line_fold = $(".lines" +n).children().text();
        init = 1;
    }
    currentVal = $(".hidden-text").val();
    count_tpye = $(".hidden-text").val().length;
    total_char_1 = total_char + count_tpye;
    $(".lines"+ n + "-label").text(currentVal);
    j = currentVal.length - 1;
    if(j < countline)
    {
        if(max > j)
        {
            check_miss = 0;
            $(".lines" + n + " span:eq(" + (j + 1) +")").css("color","#000000");
            position_span = $(".lines" + n + " span:eq(" + j +")").position();
            $("#current_cursor_pos").css({"left" : position_span.left ,"top" : (position_span.top + $(".lines" + n + " span:eq(" + j +")").height()) +"px"});
            $("#current_cursor_pos > div > span").text(currentVal[j]);
            $(".lines" + n + " span:eq(" + (j + 1) +")").removeClass("wrong");
            $(".lines" + n + " span:eq(" + (j + 1) +")").removeClass("right");
        }
        if (j == -1)
        {
            j  = 0;
            $("#current_cursor_pos").addClass("hidden");
            check_miss = 0;
        }
        if(line_fold[j] == "\t")
        {
            console.log("tab press");
            $(".hidden-text").val($(".hidden-text").val() + " ");
            programming_tpying_layout();
        }
        console.log("currentVal[j]" + currentVal[j] + "line_fold[j]" + line_fold[j]);
        if(currentVal[j] == line_fold[j] && check_miss)
        {
            console.log("right");
            $(".lines" + n + " span:eq(" + j +")").removeClass("wrong");
            position_span = $(".lines" + n + " span:eq(" + j +")").position();
            $("#current_cursor_pos").css({"left" : position_span.left ,"top" : (position_span.top + $(".lines" + n + " span:eq(" + j +")").height()) +"px"});
            $("#current_cursor_pos > div > span").text(currentVal[j]);
            $(".lines" + n + " span:eq(" + j +")").removeClass("init");
            $(".lines" + n + " span:eq(" + j +")").addClass("right");
            max = j;
        }
        else if(check_miss)
        {
            $(".lines" + n + " span:eq(" + j +")").addClass("wrong");
            position_span = $(".lines" + n + " span:eq(" + j +")").position();
            $("#current_cursor_pos").css({"left" : position_span.left ,"top" : (position_span.top + $(".lines" + n + " span:eq(" + j +")").height()) +"px"});
            $("#current_cursor_pos > div > span").text(currentVal[j]);
            max = j;
        }
        check_miss = 1;
        if(max > j)
            max--;
    }
    if(j >= countline - 1)
    {
        if(space_active == true|| enter_active)
        {
            console.log("finish");
            n++;
            max = 0;
            init = 0;
            total_char += countline; 
            $(".hidden-text").val("");
            $(".lines" + n + ":empty").addClass("empty");
            j = 0;
        }
    }
    $(".remove").remove();
}

function programming_term_add_line(content)
{
    console.log(content);
    var testing1 = content[0];
    var text_value;
    var long_term_line = $("<typing_shell></typing_shell>");
    $("terms_module > div").append(long_term_line);
    for(var n = 0; n < testing1.length; n++)
    {
        var long_term_line = $("<terms></terms>").addClass("lines"+ n +" line ").css("display","flex");
        $("typing_shell").append(long_term_line);
        console.log("line lengh: " + testing1[n].length);
        for(var i = 0; i < testing1[n].length; i++)
        {
            if(testing1[n][i] == " ")
            {
                text_value = "SPACE";          
            }
            else if(testing1[n][i] == "\t")
            {
                text_value = "tab";
                for(var z = 0;z < 3; z++)
                {
                    var txt2 = $("<span></span>").text(" ").addClass(text_value + " init");
                    $(".lines" +n).append( txt2);
                }            
            }
            else
                text_value = testing1[n][i];
            var txt2 = $("<span></span>").text(testing1[n][i]).addClass(text_value + " init");
            $(".lines" +n).append( txt2);   // Append new elements       
        }
        $(".lines0 > span").first().addClass("remove");

    }
}
function tasu()
{
    if(typing_actived == true)
    {
        tasu_1 = (key_press) / (time_take) * 60;
        if(tasu_1 < 0)
        {
            tasu_1 = 0;
            key_press = 0;
            backspace = 0;
        }
        $("#tasu").text(parseInt(tasu_1, 10) + "타");
    }
    else { 
        $("#tasu").text("0타"); 
        tasu_1 = 0;
        backspace = 0;
        time_take = 1;
        key_press = 0
    }
    //console.log((key_press) + "번 누름");
}

function accuracy()
{
    var right = $(".right").length;
    var wrong = $(".wrong").length;
    accur = parseInt((right / total_char_1) * 100,10);
    $("#accurary").text("정확도: " + accur + "%");
}

function totalpagecount()
{
    
    var pages = parseInt(total_page / 10,10);
    if(total_page % 10 > 0 )
        pages++;
    return pages;
}

function pageleft()
{
    var totalpages = totalpagecount();
    var currentpages = start_page / 10 + 1;
    $("#pageleft").text(currentpages+" / " + totalpages)
}

