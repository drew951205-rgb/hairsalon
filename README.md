# VOV Hair Salon

VOV Hair Salon 的網站與內容管理專案，包含：

- `src/`：React + Vite 前端網站
- `api/`、`server.js`：聯絡表單 API
- `vov-hair-salon/`：唯一有效的 Sanity Studio

## Sanity 架構

這個 repo 現在只有一套有效的 Sanity 設定。

- 單一設定來源：[`sanity.shared.js`](./sanity.shared.js)
- 前端資料存取：[`src/lib/sanity.js`](./src/lib/sanity.js)
- Sanity Studio：[`vov-hair-salon/sanity.config.ts`](./vov-hair-salon/sanity.config.ts)
- Sanity CLI：[`vov-hair-salon/sanity.cli.ts`](./vov-hair-salon/sanity.cli.ts)

目前統一使用：

- `projectId`: `txggw5j4`
- `dataset`: `production`
- `apiVersion`: `2025-01-01`

如果本機還保留舊的 `VITE_SANITY_*` 環境變數，值只要和共享設定不一致，前端會直接報錯，避免誤連到錯的 Sanity 專案。

## 開發指令

```bash
npm install
npm run dev
npm run lint
npm run build
```

Sanity Studio：

```bash
cd vov-hair-salon
npm install
npm run dev
```

## 環境變數

Sanity 不再需要在 `.env.local` 另外配置 `VITE_SANITY_*`。

仍然可能需要的本機變數：

```env
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
CONTACT_EMAIL_RECIPIENT=your-email@example.com
```

範例可參考 [`.env.example`](./.env.example)。
