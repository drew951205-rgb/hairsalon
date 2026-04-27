# 在其他電腦上接手 VOV Hair Salon

## 1. 抓專案

```bash
git clone https://github.com/drew951205-rgb/hairsalon.git
cd hairsalon
```

如果該電腦本來就有專案：

```bash
git pull origin main
```

## 2. 安裝依賴

前端網站：

```bash
npm install
```

Sanity Studio：

```bash
cd vov-hair-salon
npm install
cd ..
```

## 3. 環境變數

先建立本機設定檔：

```bash
cp .env.example .env.local
```

### 重要

Sanity 設定現在是集中管理，不需要在 `.env.local` 再手動填：

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION`

唯一有效來源是：

- [`sanity.shared.js`](./sanity.shared.js)

本機通常只需要補這些非 Sanity 的變數：

```env
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
CONTACT_EMAIL_RECIPIENT=your-email@example.com
```

## 4. 啟動開發

前端：

```bash
npm run dev
```

網站網址通常是：

- `http://localhost:5173`

如果要測聯絡表單 API：

```bash
npm run server
```

如果要開 Sanity Studio：

```bash
cd vov-hair-salon
npm run dev
```

Studio 網址通常是：

- `http://localhost:3333`

## 5. 日常工作流程

開始修改前：

```bash
git pull origin main
```

提交前檢查：

```bash
npm run lint
npm run build
```

修改完成後：

```bash
git add .
git commit -m "feat: describe your change"
git push origin main
```

## 6. 改照片時

如果只是換圖片：

```bash
git add public/assets/your-image.webp
git commit -m "Update photo asset"
git push origin main
```

## 7. 關於 Sanity 的唯一正確位置

這個 repo 只有一個有效的 Sanity Studio：

- [`vov-hair-salon/`](./vov-hair-salon)

Sanity 共享設定在：

- [`sanity.shared.js`](./sanity.shared.js)

前端讀資料在：

- [`src/lib/sanity.js`](./src/lib/sanity.js)

如果看到舊文件提到其他 Sanity 目錄或其他 `projectId`，都以這三個位置為準。
