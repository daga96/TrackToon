import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from time import sleep
import time
import re
import pandas as pd
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pytz
import datetime 
from datetime import datetime



title_list=[]; author_list=[] ; genre_list=[] ; chapters_list=[] ; photos_list=[] ;     title_num=[] ;idk=[]

platform = []



def lezhinScrap():
   
        
    URL_LEZHIN='https://www.lezhin.com/ko/scheduled?day=1'
    html=requests.get(URL_LEZHIN).text
    soup=BeautifulSoup(html,'html.parser')
          
    browser=webdriver.Chrome('chromedriver.exe')
    browser.get(URL_LEZHIN)
    
    
    for i in range(15):

        time.sleep(1)
        
        page=browser.find_elements_by_xpath("//a[@data-ga-event-action='goto_content']")
        page[i].click()
        
        platform.append("레진코믹스")

        time.sleep(0.5)
        
        html = browser.page_source
        soup = BeautifulSoup(html,'html.parser')

        title = soup.find('h2',{"class":"comicInfo__title"}).text
        title_list.append([title])

    
        author = soup.find('a',{"data-ga-event-action":"click_artist"}).text
        author_list.append([author])

        genre=soup.find('a',{"class":"comicInfo__tag"}).text.strip("#")
        genre_list.append([genre])

        chapter=soup.find_all('div',{'class':'episode__name'})[-1].text
        chapters_list.append(chapter)

        photoURL=soup.find('picture',{'class':'comicInfo__cover'}).find('img').get('srcset').strip("2x")
        photos_list.append([photoURL])

        
        time.sleep(0.3)
        
        browser.back()
                
        time.sleep(1)
        

    browser.back()
    time.sleep(0.1)
    page.clear()
  
    time.sleep(0.1)

                       
def naverScrap():
    URL_NAVER='https://comic.naver.com/webtoon/weekday.nhn'
    html=requests.get(URL_NAVER).text
    soup=BeautifulSoup(html,'html.parser')

    title=soup.find_all('a',{'class': 'title'})
    title_num=[]

    for x in range(len(title)):
        t=title[x].text
        if(t in title_list):
            continue
        else:
            title_list.append(t)
            title_num.append(x)

    URL_NAVER='https://comic.naver.com/webtoon/weekday.nhn'
    browser=webdriver.Chrome('chromedriver.exe')
    browser.get(URL_NAVER)

    time.sleep(0.5)

    

    for i in range(15):
        
        
        time.sleep(1)
        
    
        page=browser.find_elements_by_class_name('title')
        page[i].click()
        
        time.sleep(0.5)
        
    
        html = browser.page_source
        soup = BeautifulSoup(html,'html.parser')
        
        platform.append("네이버웹툰")
        
        author = soup.find_all('h2')
        author = author[1].find('span',{'class':'wrt_nm'}).text[8:]
        author_list.append(author)
        
        genre=soup.find('span',{'class':'genre'}).text
        genre_list.append([genre])
        
                
        chapters=soup.find('td',{"class":"title"}).find('a').get("onclick")
        
        chapter=re.findall(r'([0-9]+)',chapters)

        chapters_list.append([chapter[2]])

        photoURL=soup.find('div',{"class":"thumb"}).find('img').get('src')
        photos_list.append([photoURL])


        time.sleep(0.3)
            
        browser.back()
                
        time.sleep(1)
    
        
    browser.back()
        
    time.sleep(0.1)
        
    page.clear()
        
    time.sleep(0.1)



#crawling done 
lezhinScrap()
naverScrap()

cred = credentials.Certificate("tracktoon-a462e-firebase-adminsdk-8baxp-4822ad5c0e.json")
firebase_admin.initialize_app(cred)
database=firestore.client()

tz=pytz.timezone('Asia/Seoul')


def save(collection_id, document_id,data):
    database.collection(collection_id).document(document_id).set(data)

for a in range(30): #range(len(title_list)):
    
    data={
        "title":title_list[a],
        "author":author_list[a],
        "genres":genre_list[a],
        "chapters":chapters_list[a],
        "platform": platform[a],
        "photoURL":photos_list[a]
    } 
    print(data)
    time = datetime.now(tz).strftime('%Y-%m-%d %H:%M:%S:%f')
    
    save(collection_id="webtoons", document_id = f'{time}', data=data)

 