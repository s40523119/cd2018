---
title: Run Lua In Web
date: 2018-03-20 16:23:34
tags: [Javascript,ace editor,lua]
---

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>

<link rel="stylesheet" href="./../../../../data/style.css">

<script src="./../../../../data/ace/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="./../../../../data/ace/mode-lua.js"></script>
<script src="./../../../../data/fengari-web.js"></script>
<script src="./../../../../data/editor.lua" type="application/lua" async></script>
<script src="./../../../../data/editor.js"></script>

<div class="repl-container">
  <div class="editor-container">
    <div class="editor">{% raw %}
    print("Hello World")
    {% endraw %}
    </div>
  </div>
  <div>
    <button type="button" class="btn btn-primary btn-execute" style="margin:15px">執行</button>
  </div>
  <div class="output"></div>
</div>

<canvas id="myCanvas" width="200" height="300"></canvas>
