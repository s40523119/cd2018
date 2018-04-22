---
title: 利用Flask建立一個簡單的網站
date: 2018-04-22 16:45:33
tags: [Python, Flask, Heroku]
---

> 參照FLASK官方文件教學

<!---more--->
## What's Flask?

`Flask`是Python輕量級網站開發框架，比起包山包海的[Django](https://www.djangoproject.com/)定位就有所不同，適合輕度、簡易、快速的網站建立。
它依賴兩個外部模組，分別是[Jinja2](http://jinja.pocoo.org/)和[Werkzeug](http://werkzeug.pocoo.org/)，負責網站模板開發和處理WSGI。
快速、簡易、微小，就是Flask！ 以下為一個最簡單的Flask網站
```python
from  flask  import  Flask
app  =  Flask ( __name__ )

@app.route ( '/' )
def  hello_world ():
    return  'Hello World!'

if  __name__  ==  '__main__' :
    app . run ()
```

## 製作一個簡單Flask網站

### STEP 1

- 建立工作目錄

首先，在自己的工作目錄下，為我們的Flask建立以下樹狀結構，以便之後的工作。

```
/flaskr
    /flaskr
        /static
        /templates
```

為外層定義為Flask(../)主目錄，內層為Flask其中一個應用程式命名為flaskr，再下層兩個目錄static、templates，負責放置靜態檔以及網站模板。

### STEP 2

- 建立數據庫的組態描述

<div class='tip'>
Flask只支援`SQLite`
</div>    


在`flaskr/flaskr`下建立`schema.sql`，並新增以下代碼到檔案內:

```sql
drop table if exists entries; --創建列表確保能夠初始化
create table entries ( --建立一個名為entries的表格
  id integer primary key autoincrement, --ID，整數型態、獨立、自動遞增
  title text not null, --TITLE，文字型態，標題
  'text' text not null -- TEXT，文字型態，存放文章內容
);
```

### STEP 3

- 設置應用程式代碼

在`flaskr/flaskr`下，新增`flaskr.py`，加入以下代碼:

```Python
# 導入模組
import os
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

##應用程式定義

app = Flask(__name__) # 建立app
app.config.from_object(__name__) # 從此檔案讀取設定, flaskr.py

# 設定參數
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'flaskr.db'),
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default'
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)

##數據庫

def connect_db(): ##連接數據庫
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv
```

### STEP 4

- 以模組的型態安裝我們所建立的app(flaskr)

在根目錄`flaskr/`創建兩個檔案，分別是`setup.py`、`MANIFEST.in`

在`setup.py`裡新增：

```Python
from setuptools import setup

setup(
    name='flaskr',
    packages=['flaskr'],
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)
```

在`MANIFEST.in`裡新增:
```sql
graft flaskr/templates
graft flaskr/static
include flaskr/schema.sql
```

在目錄`flaskr/flaskr`下創建`__init__.py`並新增:

```Python
from .flaskr import app
```

開啟cmd，並移動到flaskr工作目錄，分別執行以下代碼:

```
pip install --editable .
```

```
set FLASK_APP=flaskr
set FLASK_DEBUG=true
flask run
```
你將會看到flaskr建立在本地端Port5000的位置!


### STEP 5

- 在`flaskr.py`加入連結資料庫的程式代碼:

```Python
def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()
```

### STEP 6

- 透過先前製作的資料庫組態描述建立資料庫

- 在`flaskr.py`加入連結資料庫的程式代碼:

```Python
def init_db():
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()

@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    init_db()
    print('Initialized the database.')
```

並在cmd執行`flask init`，你將看到`Initialized the database.`。

### STEP 7

- 建立處理視圖部份的代碼:

```Python
##################
# FUNC SETTINGS #
##################

@app.route('/')
def show_entries():
    db = get_db()
    cur = db.execute('select id, title, text from entries order by id desc')
    entries = cur.fetchall()
    return render_template('show_entries.html', entries=entries)

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != app.config['USERNAME']:
            error = 'Invalid username'
        elif request.form['password'] != app.config['PASSWORD']:
            error = 'Invalid password'
        else:
            session['logged_in'] = True
            flash('登入成功！')
            return redirect(url_for('show_entries'))
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('登出成功！')
    return redirect(url_for('show_entries'))


@app.route('/add', methods=['POST'])
def add_entry():
    if not session.get('logged_in'):
        abort(401)
    db = get_db()
    db.execute('insert into entries (title, text) values (?, ?)',
                 [request.form['title'], request.form['text']])
    db.commit()
    flash('新文章發布成功！')
    return redirect(url_for('show_entries'))
```


### STEP 8

- 為我們的網站新增模板

在`flaskr/flaskr/templates`新增三個模板:

`layout.html`:

```html
<!doctype html>
<title>Flaskr</title>
<link rel=stylesheet type=text/css href="{{ url_for('static', filename='style.css') }}">
<div class=page>
  <h1>Flaskr</h1>
  <div class=metanav>
  {% if not session.logged_in %}
    <a href="{{ url_for('login') }}">log in</a>
  {% else %}
    <a href="{{ url_for('logout') }}">log out</a>
  {% endif %}
  </div>
  {% for message in get_flashed_messages() %}
    <div class=flash>{{ message }}</div>
  {% endfor %}
  {% block body %}{% endblock %}
</div>
```

`show_entries.html`:

```html
{% extends "layout.html" %}
{% block body %}
  {% if session.logged_in %}
    <form action="{{ url_for('add_entry') }}" method=post class=add-entry>
      <dl>
        <dt>Title:
        <dd><input type=text size=30 name=title>
        <dt>Text:
        <dd><textarea name=text rows=5 cols=40></textarea>
        <dd><input type=submit value=Share>
      </dl>
    </form>
  {% endif %}
  <ul class=entries>
  {% for entry in entries %}
    <li><h2>{{ entry.title }}</h2>{{ entry.text|safe }}
  {% else %}
    <li><em>Unbelievable.  No entries here so far</em>
  {% endfor %}
  </ul>
{% endblock %}
```

`login.html`:

```html
{% extends "layout.html" %}
{% block body %}
  <h2>Login</h2>
  {% if error %}<p class=error><strong>Error:</strong> {{ error }}{% endif %}
  <form action="{{ url_for('login') }}" method=post>
    <dl>
      <dt>Username:
      <dd><input type=text name=username>
      <dt>Password:
      <dd><input type=password name=password>
      <dd><input type=submit value=Login>
    </dl>
  </form>
{% endblock %}
```

### STEP 9

- 建立CSS樣式檔

- 在`flaskr/flaskr/static`下新增

`style.css`:

```css
body            { font-family: sans-serif; background: #eee; }
a, h1, h2       { color: #377ba8; }
h1, h2          { font-family: 'Georgia', serif; margin: 0; }
h1              { border-bottom: 2px solid #eee; }
h2              { font-size: 1.2em; }

.page           { margin: 2em auto; width: 35em; border: 5px solid #ccc;
                  padding: 0.8em; background: white; }
.entries        { list-style: none; margin: 0; padding: 0; }
.entries li     { margin: 0.8em 1.2em; }
.entries li h2  { margin-left: -1em; }
.add-entry      { font-size: 0.9em; border-bottom: 1px solid #ccc; }
.add-entry dl   { font-weight: bold; }
.metanav        { text-align: right; font-size: 0.8em; padding: 0.3em;
                  margin-bottom: 1em; background: #fafafa; }
.flash          { background: #cee5F5; padding: 0.5em;
                  border: 1px solid #aacbe2; }
.error          { background: #f0d6d6; padding: 0.5em; }
```

### STEP 10

並在cmd執行，`flask run`，看看是不是成功了呢?

![](http://flask.pocoo.org/docs/0.12/_images/flaskr.png)
