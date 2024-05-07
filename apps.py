import eel
from random import *
from operator import *
import glob,os
import fileinput

list_k = []
list_e = []
short_file_e = []
short_file_k = []
programming_file_e = []
programming_file_k = []
web_location = 'web'
web_path = os.path.dirname(os.path.realpath(__file__)) + '/' + web_location
eel.init(web_path)
logined_id =''
logined_hash = 0



############                    
# 타수 정확도 추가
# 플레이어 정보
# 나가기
# 타자 확인


class playerinfoWrite:
    def __init__(self):
        pass
    def update_info(user_name, hashtag, types,lang, accur, tasu):
        print(user_name, hashtag, str(types),lang)
        for line in fileinput.FileInput("players_score.txt",inplace = 1):
            line = line.rstrip()
            if (user_name + ";" + str(hashtag)+ ";"+ str(types) + str(lang)) in line:
                line = line.rstrip()
                line = line.replace(line,line + " " + str(accur) +":"+str(tasu))
            print(line)
        fileinput.close()

    def get_tasu_acc_score(ids,hashs,types,lang_num):
        arr1 = []
        arr = []
        data1 = []
        data2 = []
        data_total = []
        f = open("players_score.txt", 'r')
        while True:
            line = f.readline()
            if not line: break
            line = line.split()
            arr.append(line)
        if lang_num  == 0: lang_str = 'eng'
        else : lang_str = 'kor'
        f.close()
        for i in range(0,len(arr)):
            complete_line = str(ids)+";"+str(hashs)+";"+str(types)+str(lang_str)
            if(arr[i][0] == complete_line):
                for j in range(1,len(arr[i])):
                    print(arr[i][j])
                    arr1 = arr[i][j].split(":")
                    data1.append(arr1[0])
                    data2.append(arr1[1])
                    data_total.append(data1)
                    data_total.append(data2)
        print(data1)
        print(data2)
        return data_total

    def file_len(self,fname):
        with open(fname) as f:
            for i, l in enumerate(f):
                pass
        return i + 1

def isEnglishOrKorean(input_s):
    k_count = 0
    e_count = 0
    for c in input_s:
        if ord('가') <= ord(c) <= ord('힣'):
            k_count+=1
        elif ord('a') <= ord(c.lower()) <= ord('z'):
            e_count+=1
    return "k" if k_count>1 else "e"


def getting_long():
    path = os.path.dirname(os.path.abspath(__file__))
    # path = os.path.join(path,"all_txt")
    folders = [f for f in glob.glob(path + "/**.txt", recursive=True)]
    print(folders)
    return folders

def make_long_file(listOftxt):
    global list_e, list_k
    for f in listOftxt:
        i = 0
        print("getfile from.... " + f)

        fp = open(f)
        text = myfile.getfile(f)
        lang = isEnglishOrKorean(fp.t)
        print(lang)
        if(lang == 'e'):
            list_e.append(text.splitlines())
            print("add english")
        elif(lang == 'k'):
            list_k.append(text.splitlines())
            print("add korean")
        i += 1

def make_short_file():
    global short_file_e, short_file_k
    path = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(path,"short_text")
    folders = [f for f in glob.glob(path + "\\**.txt", recursive=True)]
    for f in folders:
        short_term = myfile.getfile(f)
        lang = isEnglishOrKorean(myfile.getTitle(f))
        if(lang == 'e'):
            short_file_e.append(short_term.splitlines())
        elif(lang == 'k'):
            short_file_k.append(short_term.splitlines())


def make_programming_file():
    global programming_file_e
    path = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(path,"programming")
    folders = [f for f in glob.glob(path + "\\**.txt", recursive=True)]
    for f in folders:
        programming_1 = myfile.getfile(f)
        programming_file_e.append(programming_1.splitlines())
    

typing_lang = 0
@eel.expose
def load_menu_sel(lang):
    print("load ", lang)
    global list_e, list_k
    title = []
    titles = []
    if lang == 0: titles = list_e
    else : titles = list_k

    print(titles[0][0])
    for t in range(0,len(titles)):
        title.append(titles[t][0])
    eel.display_long_term(title,lang)


def loading_data(): #파일을 불러와서 리스트에 정리한다
    make_long_file(getting_long())

#login_check
@eel.expose
def getting_ID(a):
    global logined_hash, logined_id
    ok_2_login = True
    print(a)
    if(a == ""):
        eel.login_error("Input Value Here")
        return 0
    result = a.split("#")
    if(len(result) == 1):
        eel.login_error("Input HashTag")
        return 0
    if len(result[1]) == 4:
        print(result)
        f = open("player_data.txt", 'r')
        while True:
            line = f.readline()
            if not line: break
            line = line.split(" ")
            print(line[2],str(result[0]))
            print(int(line[1]),int(result[1]))
            if eq(line[2],str(result[0])) and int(line[1]) == int(result[1]):
                ok_2_login = True
                break
            else:
                ok_2_login = False
                if int(result[1]) == 0:
                    eel.login_error("#0000 Not Allowed")
                    return 0
                #eel.login_error("Incorrect HashTag or ID")
        print("ok_2_login: " + str(ok_2_login))
    else:
        eel.login_error("Input 4digit HashTag")
        return 0
    if ok_2_login:
        logined_id = result[0]
        logined_hash = int(result[1])
        print(logined_id,logined_hash)
        eel.login_success()

@eel.expose
def gettasuaccur():
    pass
@eel.expose
def register_id(name,id_e,email):
    print(name,id_e,email)
    f = open("player_data.txt", 'a')
    g = open("players_score.txt",'a')
    hash = randrange(1,9999)
    print(hash)
    if not myfile.checkhesh(hash):
        print("registered!")
        eel.tell_hash(str(hash).zfill(4))
        f.write(name + " "+ str(hash) + " " +id_e+ " " +email+"\n")
        g.write(id_e +";" + str(hash) + ";longkor\n")
        g.write(id_e +";" + str(hash) + ";shortkor\n")
        g.write(id_e +";" + str(hash) + ";longeng\n")
        g.write(id_e +";" + str(hash) + ";shorteng\n")
    f.close()
    g.close()

@eel.expose
def update_info_pre(types,lang, accur, tasu):
    print(accur,tasu,lang)

    if lang == 1:
        lang_str = "kor"
    else : lang_str = "eng"
    playerinfoWrite.update_info(logined_id,logined_hash,types,lang_str,accur,tasu)


#active_long
'''
func use to open UI menus
'''
@eel.expose
def get_term_file(number,typing_mode,language):
    if typing_mode == 0 and language == 0:
        eel.get_term_file(list_e[number],typing_mode)
    elif typing_mode == 0 and language == 1:
        eel.get_term_file(list_k[number],typing_mode)
    if typing_mode == 1 and language == 0:
        eel.get_term_file(short_file_e,typing_mode)
    elif typing_mode == 1 and language == 1:
        eel.get_term_file(short_file_k,typing_mode)
    if typing_mode == 3 and language == 0:
        eel.get_term_file(programming_file_e,typing_mode)


@eel.expose
def getidandhash():
    eel.getidandhash(logined_id,logined_hash)

@eel.expose
def get_tasu_acc_chart(ids,hashs,types,langs):
    list_data = playerinfoWrite.get_tasu_acc_score(ids,hashs,types,langs)
    eel.get_tasu_acc_chart(list_data)
    
##starting app
loading_data()
make_short_file()
make_programming_file()
my_options = {
    'mode': "chrome", #or "chrome-app",
    'host': 'localhost',
    'port': 8080,
    'chromeFlags': ["--start-fullscreen", "--browser-startup-dialog"]
}
eel.start('main.html', size=(650, 700), options={'port': 1234},suppress_error=True)

while True:
    eel.sleep(10)
