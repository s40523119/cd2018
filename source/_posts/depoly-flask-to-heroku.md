---
title: 部屬Flask到Heroku
date: 2018-04-22 20:21:26
tags: [Python, Flask, Heroku]
---

參照上一篇文章所製作好的網站，將它部屬到Heroku雲端伺服服務。
<!---more--->

### STEP 1

- 設定Heroku環境

為你的電腦安裝[Heroku Cli](https://devcenter.heroku.com/articles/heroku-cli)

### STEP 2

- 建立一個heroku 應用

```
heroku login
```

登入heroku

```
heroku create your_app
```

建立你的應用程式

### STEP 3

- 設定部屬參數檔案

新增三個檔案至根目錄:

`Procfile`:

```
web: gunicorn flaskr:app
```

`requirements.txt`:

```
flask
gunicorn
Flask-Heroku
Jinja2
```

`runtime.txt`:

```
python-3.6.4
```

### STEP 4

- 將應用綁定至一個Git倉儲

```
git init
```

```
heroku git:remote -a your_app
```

```
git add .
git commit -am "make it better"
git push heroku master
```

部屬結束!

前往: https://your_app.herokuapp.com/ 看看是不是成功了呢!!
