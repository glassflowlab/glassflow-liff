# 玻璃小店 LIFF 部署 SOP
# 執行者：小龍蝦
# 預估時間：30 分鐘

---

## 步驟一：建立 GitHub Repository 並推上去

```bash
# 在 Mac mini 上執行
cd ~/.openclaw/workspace

# 建立資料夾
mkdir -p glassflow-liff
cp ~/liff/index.html glassflow-liff/
cp ~/liff/apps-script.js glassflow-liff/

cd glassflow-liff
git init
git add .
git commit -m "feat: 玻璃小店 LIFF 初版"

# 到 GitHub 建立 repo（名稱：glassflow-liff）
# 然後：
git remote add origin https://github.com/glassflowlab/glassflow-liff.git
git branch -M main
git push -u origin main
```

---

## 步驟二：啟用 GitHub Pages

1. 開啟瀏覽器到 `https://github.com/glassflowlab/glassflow-liff`
2. 點 **Settings** → 左側 **Pages**
3. Source 選 **Deploy from a branch**
4. Branch 選 `main`，資料夾選 `/ (root)`
5. 點 **Save**
6. 等 1-2 分鐘，網址會是：
   `https://glassflowlab.github.io/glassflow-liff/`
7. 確認網頁可以開啟（會顯示「載入商品中...」然後報錯，這是正常的，因為還沒設定 Apps Script）

---

## 步驟三：設定 Google Apps Script

1. 開啟 Google Sheets：
   `https://docs.google.com/spreadsheets/d/1zKbfdIdFD3QV0N_RFvrwuIyZ3QKOzBkA/edit`

2. 點選上方選單 **擴充功能** → **Apps Script**

3. 把 `apps-script.js` 的內容貼進去（替換預設的 `myFunction`）

4. 點上方 **部署** → **新增部署作業**
   - 類型：**網頁應用程式**
   - 說明：玻璃小店 LIFF API
   - 執行身分：**我**
   - 誰可以存取：**所有人（含匿名）**
   - 點 **部署**

5. 授權 Google 帳號存取（按提示操作）

6. 複製「網頁應用程式網址」，格式類似：
   `https://script.google.com/macros/s/AKfy.../exec`

---

## 步驟四：填入設定值到 index.html

修改 `index.html` 裡的設定區：

```javascript
// 把這兩行改掉：
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
const LIFF_ID = 'YOUR_LIFF_ID_HERE';

// 改成：
const APPS_SCRIPT_URL = '（貼上步驟三的網址）';
const LIFF_ID = '（貼上步驟五的 LIFF ID）';
```

---

## 步驟五：建立 LIFF App

1. 開啟 LINE Developers Console：
   `https://developers.line.biz/console/`

2. 選擇玻璃小店的 Provider → **玻璃小店 LINE OA** Channel

3. 點 **LIFF** 標籤 → **新增**

4. 填寫：
   - LIFF app 名稱：`玻璃小店商品型錄`
   - 大小：**Full**（全螢幕）
   - Endpoint URL：`https://glassflowlab.github.io/glassflow-liff/`
   - Scope：`profile` 勾選
   - Bot link feature：**On (Aggressive)**

5. 點 **新增**，複製 LIFF ID（格式：`1234567890-xxxxxxxx`）

---

## 步驟六：更新並推上 GitHub

```bash
# 修改 index.html 填入 APPS_SCRIPT_URL 和 LIFF_ID 後
cd ~/.openclaw/workspace/glassflow-liff
git add index.html
git commit -m "config: 填入 Apps Script URL 和 LIFF ID"
git push
```

等 1-2 分鐘讓 GitHub Pages 更新。

---

## 步驟七：測試

1. 在 LINE 對話中貼上 LIFF 連結：
   `https://liff.line.me/（你的LIFF ID）`

2. 確認：
   - ✅ 商品可以載入
   - ✅ 分類 Tab 可以切換
   - ✅ 點商品會跳到開店幫手

---

## 步驟八：加入 Rich Menu

在 LINE OA Manager → 圖文選單 → 找到「商品型錄」按鈕
把連結改成：`https://liff.line.me/（你的LIFF ID）`

---

## 日後更新商品

只需要在 Google Sheets 的「商品資料」表更新即可，LIFF 自動反映，不需要動程式碼。

- 新增商品：加一列，`active` 填 `TRUE`
- 下架：把 `active` 改成 `FALSE`
- 改價格：直接改 `單價` 欄
- 補圖片：把圖片上傳到 Imgur，複製直連網址貼到 `商品圖片網址` 欄

---

## 完成後回報

請在 Discord 或 Workboard 回報：
- ✅ GitHub Pages URL
- ✅ Apps Script URL（不要公開）
- ✅ LIFF ID
- ✅ 測試截圖
