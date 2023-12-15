# Text Rendering Difference Solution Demo Project

## 簡介 / Introduction
這個專案展示了如何解決在不同設備上伺服端跟客戶端文字渲染的差異。雖然這不是一個完美的解決方案，因為它無法處理字母間距或文字傾斜等問題，但它提供了一個基本的想法和實作方向。
This project demonstrates how to resolve text rendering differences between server and client across different devices. While it is not a perfect solution as it does not address issues like letter spacing or text skewing, it offers a basic approach and idea.

### 核心思路 / Basic Idea
本專案的核心思路是在客戶端和伺服器端都渲染一個英文字母 “A”，然後比較這個 “A” 的最高點來找出偏移量。
The basic idea of this project is to render the English letter "A" on both the client and server side, and then compare the top point of the "A" to find the offset.

## 專案結構 / Project Structure
- `app/canvas.tsx`：前端的 Canvas 實作。/ Front-end Canvas implementation.
- `app/node-canvas.tsx`：後端的 Canvas 實作。/ Back-end Canvas implementation.
- `app/canvas-util.ts`：前後端共用的 Canvas 邏輯和設定。/ Common Canvas logic and settings for both front-end and back-end.

## 如何使用 / How to Use

```bash
# 使用專案配置的 Node 版本 / Use the Node version specified by the project
nvm use
```

```bash
# 安裝依賴 / Install dependencies
npm i
```

```bash
# 啟動開發模式 / Start development mode
npm run dev
```
