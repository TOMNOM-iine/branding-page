// Netlify環境変数をクライアントサイドで利用できるようにするスクリプト
const fs = require('fs');

// 環境変数を含むJavaScriptを生成
const envContent = `window.ENV_SUPABASE_URL = "${process.env.SUPABASE_URL || ''}";
window.ENV_SUPABASE_ANON_KEY = "${process.env.SUPABASE_ANON_KEY || ''}";
console.log("環境変数がロードされました");`;

// env.jsファイルを作成
fs.writeFileSync('./env.js', envContent);

console.log('ブラウザ用の環境変数ファイルが作成されました: env.js');
