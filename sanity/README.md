# Sanity 最新消息 Schema

這個資料夾放的是 Sanity Studio 的內容模型範本。

目前前台 `/news` 會讀取 Sanity 裡 `_type == "news"` 且 `isPublished == true` 的資料。

前台 `/portfolio` 會讀取 Sanity 裡 `_type == "portfolio"` 且 `isPublished == true` 的資料，並依照 `category` 自動分組。

需要在 Vercel 和本機 `.env.local` 設定：

```env
VITE_SANITY_PROJECT_ID=你的 Sanity projectId
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2025-01-01
```

如果 Sanity 尚未設定，網站會自動顯示 `news.jsx` 內的備用最新消息。

作品集欄位：

```text
title 作品名稱
category 作品分類
subtitle 作品說明
stylist 設計師
note 備註
image 作品圖片
image.alt 圖片替代文字
order 排序，數字越小越前面
isPublished 是否上架
```
