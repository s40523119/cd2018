---
title: 利用Brython.js在瀏覽器執行Python程式
date: 2018-03-07 20:37:32
tags:
- Python
- Brython
---
<script type="text/javascript" src="https://cdn.rawgit.com/brython-dev/brython/3.4.0/www/src/brython.js"></script>

將[前一篇文章](/cd2018/2018/03/06/w1/)程式以 `Brython.js` 在瀏覽器中執行，並改寫部分程式碼，得以與瀏覽器互動。

[Brython](https://brython.info/) 是實現運行Python in web的 Javascript 程式庫，並提供HTML5環境（提供了DOM對象和事件接口）。

<!---more--->

Tutorial
===

- Step 1 引入Javascript檔案

    在自己的網頁靜態檔案中加入[Brython.js](https://github.com/brython-dev/brython/releases/tag/3.4.0)，或是引入線上CDN服務器內的[CDN Brython](https://github.com/brython-dev/brython/releases/tag/3.4.0)。
    我採取引用線上檔案的方式，引入需要使用到Brython的文章內，加入下列程式碼:


    ```html
    <script type="text/javascript" src="https://cdn.rawgit.com/brython-dev/brython/3.4.0/www/src/brython.js"></script>

    ```


- Step 2 建立Brython區塊

    為了要在網頁中運行 `Pyhton` 腳本，必須引用函數 `brython()` 。
    所以我們在這裡建立一個html body，並賦予它 `onload=brython()`，再建立一個div區塊，則裡面內容則放入想要運行的Python腳本。

<div class='tip'>
因為使用 `hexo` 來進行渲染md檔，所以我們的Python程式碼會被渲染，跳行的部分會被填入 `<br>` 所以我們得在程式碼頭尾部分加入，HEXO的標籤  % raw % % endraw % ，到時HEXO就會讓標籤內的文字以原始形式呈現。
</div>    


    ```html
    <body onload="brython()">
        <div>
            <script type="text/python">{% raw %}

            ### Python code ###

            {% endraw %}</script>
        </div>
    </body>        

    ```

- Step 3 編寫程式

    我想透過按鈕來執行我的程式碼，所以得將按鈕綁定到特定的 `document` 。利用python的裝飾器來加入以下程式碼:

    ```python
    @document["mybutton"].bind("click")
    def func():
        #Your code
    ```

    參照Brython官方文件，讀取檔案時，hexo會在文件名後面加入當下時間，所以我們得先建立偽裝的時間代碼:

    ```python
    fake_qs = '?foo=%s' %time.time()
    ```

    所以開啟文件時，在檔案名後方加入 ` fake_qs ` ，就可以讀去到文件，範例如下:

    ```python
    with open('./../../../../data/2a.txt'+fake_qs) as fh:
    ```

    最後，在為我的程式配上一顆按鈕，並為它綁定ID到mybutton，按下去瀏覽器就會執行我的代碼:
    ```html
    <button id="mybutton" class="next">執行</button>
    ```


以上教程是適用於解決課程中問題，其他詳盡寫法請參照官方文件內容。

- 完整程式碼:

```python
<body onload="brython()">
    <div class="paginator" >
        <script type="text/python">{% raw %}

            from browser import document,html
            import re, time

            # 按下按鈕執行以下程式

            @document["mybutton"].bind("click")
            def echo(ev):
                fake_qs = '?foo=%s' %time.time()

                with open('./../../../../data/2a.txt'+fake_qs) as fh:
                    data = [(re.findall('405\d\d\d\d\d', data[int(i)])) for i in range(len(data))]
                num = 0
                for i in range(len(data)):
                    team = data[i]
                    for g in range(len(team)):
                        if g%3 == 0:
                            num += 1
                            document['zone'] <= ('第' + str(num) +'組:' + str(team[g:g+3]) + html.BR())


            @document["mybutton2"].bind("click")
            def delete(ev):
                for row in document['zone']:
                    row.remove()
        {% endraw %}</script>            
        <button id="mybutton" class="next">執行</button><button id="mybutton2" class="next">清除</button>
    </div>
</body>
```

<body onload="brython()">
    <div class="paginator" >
        <script type="text/python">{% raw %}
        from browser import document,html
        import re, time

        # 按下按鈕執行以下程式
        @document["mybutton"].bind("click")
        def echo(ev):
            fake_qs = '?foo=%s' %time.time()

            with open('./../../../../data/2a.txt'+fake_qs) as fh:
                data = fh.readlines() #逐行讀入
                data = [(re.findall('405\d\d\d\d\d', data[int(i)])) for i in range(len(data))]
            num = 0
            for i in range(len(data)):
                team = data[i]
                for g in range(len(team)):
                    if g%3 == 0:
                        num += 1
                        document['zone'] <= ('第' + str(num) +'組:' + str(team[g:g+3]) + html.BR())


        @document["mybutton2"].bind("click")
        def delete(ev):
            for row in document['zone']:
                row.remove()


        {% endraw %}</script>

    <button id="mybutton" class="next">執行</button><button id="mybutton2" class="next">清除</button>
    </div>
</body>

- 輸出:

<div id="zone">

</div>


- Reference:
    - [Brython Document](https://brython.info/static_doc/en/intro.html?lang=en])
    - [Read the content of a file in Brython](https://brython.info/static_doc/en/cookbook/read_file.html)
    - [Brython CDN](https://cdnjs.com/libraries/brython)
