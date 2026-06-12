// ════════════════════════════════════════════
// 玻璃小店 LIFF - Google Apps Script
// 部署為 Web App，回傳商品 JSON
// ════════════════════════════════════════════

const SHEET_ID = '16nnX2nu_uJ7FToXdtrQJN16-PiavKA66KsJNRNplakU'; // 你的 Google Sheets ID（已從 .xlsx 轉成 Google Sheets 原生格式）
const SHEET_NAME = '商品資料';

// 欄位對應（對應試算表欄位順序）
const FIELDS = [
  'id',           // A: 商品ID(開店幫手)
  'sku',          // B: 賣家代碼
  'name',         // C: 商品名稱
  'category',     // D: 分類
  'image_url',    // E: 商品圖片網址
  'spec',         // F: 規格說明
  'unit_price',   // G: 單價
  'stock_qty',    // H: 庫存數
  'stock_status', // I: 庫存狀態
  'shop_url',     // J: 開店幫手商品連結
  'active',       // K: 是否顯示
  'note',         // L: 備註（系列分類）
];

function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();

    // 跳過第一行（header）
    const products = data.slice(1).map(row => {
      const obj = {};
      FIELDS.forEach((field, i) => {
        obj[field] = row[i] !== undefined ? String(row[i]).trim() : '';
      });
      return obj;
    }).filter(p => p.name); // 過濾空行

    const output = ContentService
      .createTextOutput(JSON.stringify(products))
      .setMimeType(ContentService.MimeType.JSON);

    // 允許 CORS（LIFF 需要）
    return output;

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
