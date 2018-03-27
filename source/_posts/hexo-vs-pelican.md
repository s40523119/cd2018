---
title: Pelican vs Hexo(2)
date: 2018-03-18 16:23:34
tags: [Pelican, Python, Hexo, Javascript, static site]
---

## How About Pelican?

![](https://avatars2.githubusercontent.com/u/2043492?s=200&v=4)

它是確實是我第一個接觸的Static Site Generator，不過並無深入了解它，再加上不懂 Leo editor的節點特性，當時總覺得是無字天書，只會記住幾個死步驟來做事情。而且那時候是利用老師為我們處理好的檔案，只要知道如何新增文章跟產生靜態就好，從新建到部屬的流程都不清楚。但現在要做的比較呢，我不把 Leo editor列入 Pelican評鑑的條件之一，因為老師整理得實在是很方便，純粹分析框架系統特色。

依照 Pelican的官網指示，需在本機先安裝 Python，再透過套件管理系統來安裝 Pelican，再利用指令 pelican-quickstart來初始化部落格，不過接受下會詢問多道問題，部分題目可空白，部分則一定得輸入。這一點，我倒不是很喜歡，應該一個指令直接為我生成能夠運行的範例網站即可，某些複雜深入的設定，再後續繼進行設定就好。

不過，值得讚許的是，Pelican只利用數個檔案，總容量大小約10KB，就能夠為我們工作，輕量、快速!但站在未曾學習過 Pyhton的人來說，裡面網站的設定檔pelicanconf.py，要很快地看懂它，也需要一些時間，因為會牽扯到 Python語法的問題，縮排或是括號…等等，都會讓文檔在運作時產生例外。

在新增文章的方面，官方說明是得自己新增一個md檔，這太不便了吧…雖說擅長使用cmd的工程師來說不算什麼，不過一般使用者得自己建檔就是多少感到麻煩，前面標頭的標題和其他標籤也得自己填上，實在有點不便。

## How About Hexo?

![](https://3.bp.blogspot.com/-7AP9jD8pW_I/V9oILsTPNmI/AAAAAAAAedo/ckA9hiA7xBEEMjmh10RiEnIGIf5AwPxOACLcB/s1600/Hexo.png)

後來使用了它作為網誌系統，它主要是使用Javascript裡的程式庫 Node.js，這是近幾年時下火熱的程式庫。安裝完Node，只要五行指令，活生生的部落個就在眼前。比起Pelican來說，輕鬆很多不必先行回答許多設定，範例當中已經為我們新建一篇範例文章。但是，很大的缺點是，初始化建立部落格時，會自動連上npm套件管系統，為我們下載需多的套件，初始化完成依照網路時間與硬碟運作速度而定，我大概等了245秒左右，比起Pelican來說，實在慢了太多。

Hexo最吸引我的是，它擁有許多華麗的主題可以選擇，而且插件多樣性與功能支援性非常廣泛、強大，設定檔的部分使用 YAML語法，非常的清楚明瞭又好懂，不用括號抑或是冒號，整體的可視度好非常多。新增文章也可透過指令執行，HEXO會自動生成相對應的MD檔已經為我們填上當下建立的時間以及給予一個空的標籤欄位，供我們使用。方便性也大Pelican需手動設置的手續。HEXO還有一項優點是，它在網上擁有許多使用者，大多遇到的BUG提出來，很快的大火們都能為你解決。

更多詳細資訊請參考以下連結。

- Reference:
  - [PELICAN設計內容](http://www.pyslvs.com/blog/scrum_design-design_methods-and-mechanical-design.html)
  - [Pelican](https://blog.getpelican.com/)
  - [Hexo](https://hexo.io/)
  - [YAML](https://en.wikipedia.org/wiki/YAML)
  - [reStructuredText](https://en.wikipedia.org/wiki/ReStructuredText)
  - [Markdown](https://en.wikipedia.org/wiki/Markdown)
  - [Static web page](https://en.wikipedia.org/wiki/Static_web_page)
  - [Front and back ends](https://en.wikipedia.org/wiki/Front_and_back_ends)
  - [GitHub Pages](https://pages.github.com/)
  - [Ruby](https://zh.wikipedia.org/wiki/Ruby)
