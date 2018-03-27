---
title: 將Node.js與npm納入隨身系統
date: 2018-03-10 17:13:22
tags:
- node.js
- portable
---

為讓工作效率提升，想要將 `Node.js` 納入課程隨身系統當中，新版的node內都有內建套件安裝系統 `npm`，無須另外下載，系統裝置好後再進行安裝 `hexo` 網誌框架系統。

<!---more--->

- Step 1 下載 Node.js binary

    前往 [Node binary](https://nodejs.org/download/release/v9.8.0/) 下載最新的Node。

- Step 2 解壓縮至隨身系統內，並將資料夾更名為 `nodejs` 。
- Step 3 並在 `start.bat`內新增路徑置系統內:
    ```cmd
    set path5=%Disk%:\nodejs;%Disk%:\nodejs\node_modules\npm\bin;
    ```

    並在 `path` 填上 `path5`:
    ```cmd
    path=%path1%;%path2%;%path3%;%path4%;%path5%
    ```
- Step 4 啟動隨身系統，更新npm套件版本
    ```cmd
    npm i -g npm-upgrade
    ```
- Step 5 再安裝 `hexo` 網誌框架系統。
    ```cmd
    npm install hexo-cli -g
    ```

以上完成 `Node.js Portable`以及安裝 `hexo` 網誌框架系統。
