# 元祖ハルピン 冷凍餃子ECサイト

バンキシー×アメコミ風デザインの餃子ECサイトです。

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`をコピーして`.env`を作成し、実際のStripeキーを設定してください：

```bash
cp .env.example .env
```

### 3. Stripeダッシュボードでの設定

1. [Stripe Dashboard](https://dashboard.stripe.com)にログイン
2. 商品と価格を作成：
   - エビ餃子（¥2,980）
   - 巨大小籠包（¥3,480）
   - 真相究明セット（¥5,980）
3. 作成した価格IDを`.env`ファイルに記入
4. Webhookエンドポイントを設定（`/api/webhook`）

### 4. サーバーの起動

開発環境：
```bash
npm run dev
```

本番環境：
```bash
npm start
```

## 機能

- 🥟 バンキシー風アメコミデザイン
- 🛒 カート機能（ローカルストレージ対応）
- 💳 Stripe決済統合（カード、コンビニ決済、Apple Pay、Google Pay対応）
- 🚚 クール宅急便配送
- 📅 配送日時指定機能
- 📱 レスポンシブデザイン
- ✨ スムーズなアニメーション（オープニングアニメーション付き）

## ディレクトリ構成

```
├── index.html          # メインページ
├── checkout.html       # 決済ページ
├── success.html        # 注文完了ページ
├── css/               # スタイルシート
│   ├── main.css       # メインスタイル
│   ├── responsive.css # レスポンシブ対応
│   ├── opening.css    # オープニングアニメーション
│   ├── checkout.css   # 決済ページスタイル
│   └── success.css    # 完了ページスタイル
├── js/                # JavaScript
│   ├── cart.js        # カート機能
│   ├── animations.js  # アニメーション
│   ├── opening.js     # オープニング制御
│   └── checkout.js    # 決済処理
├── server.js          # Expressサーバー
├── package.json       # 依存関係
└── .env.example       # 環境変数テンプレート
```

## テスト用カード番号

Stripeテスト環境で使用できるカード番号：
- 成功: `4242 4242 4242 4242`
- 失敗: `4000 0000 0000 0002`

## デプロイ

### Vercel
```bash
vercel
```

### Heroku
```bash
git push heroku main
```

## ライセンス

ISC