---
title: Pelican vs Hexo(1)
date: 2018-03-13 16:23:34
tags: [Pelican, Python, Hexo, Javascript, static site]
---

分享兩款 Static Site Generator 的比較與簡單分析，若有勘誤之處煩請留言回報。

<!---more--->
![Hexo vs Pelican](./../../../../data/Hexo_vs_Pelican.jpg)

|               |    Pelican |  HEXO    |
| ------------- | :------------:| :-------------: |
| Language      |  Python       | Javascript      |
| Markup Languages |  reStructuredText, Markdown, AsciiDoc | HTML, Markdown, AsciiDoc, Org-Mode |
| Template Engine |	Jinja2 |	Jinja2, Swig, EJS, Haml, Pug, etc… |
| Since |	2010	| 2012 |
| Github Star |	7,761 ★ |	21,111 ★★★|
|Plugin|	119|	248|
|Open Sourse|	✔	|✔|
|Set-up	| Just few seconds	|less than 5 mins|
|Size |	10kb	|30mb|
|Config Type |	Python	|YAML|
|Setting	|Easy|	So Easy|


## Why Do We Use Static Site Generator ?

想想當年，我是生在90年代(1990-1999)的孩子，時下年輕人都用著雅虎旗下的 無名小站，那時可以說是台灣部落格界的霸主，與其他部落格系統相較之下，無名小站給了不少地方供使用者自行外加功能，深受大眾喜愛。好比說，其他部落格系統只提供數種基本主題使用，無法自行創建主題;無名小站開放自定義模板，所以網路上就充滿著各式各樣的好看、酷炫主題，找個喜歡的主題，將程式代碼貼上無名小站提供的編輯器當中，新的主題就設定好了;更吸引人的是，還可以新增 Javascript的插件，無名必用的 音樂撥放器!!所以，那時候逛網誌的樂趣之一就是，聽聽每個朋友放什麼主題曲在自己的部落格首頁，有些人故意將插件隱藏，好聽的歌都得在他的文章下留言請教才能知道，既神秘又有趣。無名小站對我來說實在是很棒的回憶。

後來不幸的是， 無名小站 終止服務了…就真的好一陣子不再寫部落格了。在此之後，因系上老師有要求同學使用部落格的教學方式，又再度踏入部落格(Pelican)，但也是新的境界。現在大多人所使用的部落格是由他人寫好的服務系統，統整包含了伺服端、靜態檔案…等等，你只需要註冊服務帳號，透過網路上的文章編輯器，制式的管理系統，來經營你的部落格。好處是什麼呢?你不用擔心你的伺服器流量，也不需要任何能力門檻，你就只要乖乖打文章就可以了。但壞處呢?你必須接受你的網站有很多無用煩人的廣告;無法自定義樣式的困擾，受到系統上的許多限制;也得接受突如其來的網站終止服務..等等。言簡意賅地說就是，當你沒有擁有相當的控制權，你的一切就得被限制、牽制住。當然，若你只是一般的使用者，市面上的網誌服務系統卻是已經足夠，自建部落格可作為考慮選項。

自建部落格這件事，還是有很多的方法可循。通常，一般使用者升級為自建部落格時，會選用像是 Wordpress 這種服務，前端樣式由你來自定義，但是編輯文章或是管理更深層的文檔，還是有點綁手綁腳的。想要擁有完整的控制權，就是前端後端自己來，完整的全端!像是一下網際內容管理的課程，使用 Python 的 Flask，將主機設置在系上工作站裡的Ubuntu小主機，利用 Flask微型的網站伺服器套建來自建網站。但一般人沒有主機，就得付費託管雲端主機，更費心的是申請固定IP，放置主機在自己家裡，花的費用也是不可小覷。

幸運的是，GitHub 提供了免費的靜態網站託管，內建靜態網站產生器是Jekyll，是使用Ruby程式語言。GitHub官方網站也提供了簡單的流程，透過 Jekyll來快速建立網站。不過只要設定妥當，單純上傳正常網頁靜態檔案(html)上去，也是能夠正常運作。在我尚未相識 Hexo 這樣類型的工具之前，我不使用 Pelican，而是傻傻的把自己當做前端工程師一樣，開始手刻html、css、js，我還在學校的圖書館借了好幾本有關前端應用的相關書籍(HTML5、CSS3)，找別人公開分享的HTML5模板，拿來自己改，改成自己的需求，透過修改慢慢學習。但是，發現實在是很不方便!當時，新增一篇文章，就是我得自己新建一個html檔，寫著滿滿的標籤語言，時不時還得修改css來達到我理想的視覺，更討厭的是，靜態網頁做一點的變更，其他地方的各個小細節我得再一一自己修改，常常忘記修改部分連結，網誌就會鬧了笑話。這時才發現， Pelican的好，只不過後來又發現了其他框架，才知道網誌系統這樣的豐富多姿。

所以呢，透過Static Site Generator來管理、產生文章，可以專心一意又優雅的撰寫文章，無需去煩惱樣式，生成文章的惱人手續，還有多樣式的插件來達到複雜的表達，最後再部屬到 Github上，這就是善用工具的魅力。

以上表格是將部分重要性質來做比較，下一篇文有更深入的個人見解。