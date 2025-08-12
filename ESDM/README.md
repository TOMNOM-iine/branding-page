# ESDM評価システム

早期支援のための発達評価ツール（Early Start Denver Model）

## 🚀 簡単デプロイ方法

### オプション1: Vercel（推奨）
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TOMNOM-iine/branding-page&project-name=esdm-assessment&root-directory=ESDM)

1. 上のボタンをクリック
2. GitHubアカウントでログイン
3. 「Create」をクリックするだけ！

### オプション2: Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/TOMNOM-iine/branding-page)

1. 上のボタンをクリック
2. GitHubアカウントでログイン
3. サイト名を設定して「Save & Deploy」

### オプション3: ローカルで即座に開く
```bash
# リポジトリをクローン
git clone https://github.com/TOMNOM-iine/branding-page.git
cd branding-page/ESDM

# ブラウザで開く（Mac）
open index.html

# ブラウザで開く（Windows）
start index.html

# または Python サーバーで起動
python3 -m http.server 8000
# http://localhost:8000 にアクセス
```

## 📊 データベース設定（オプション）

Neon DBを使用してデータを永続化する場合：

### 1. Neon アカウント作成
1. [Neon](https://neon.tech) にアクセス
2. 無料アカウントを作成
3. 新しいプロジェクトを作成

### 2. データベーススキーマ
```sql
-- assessments テーブル
CREATE TABLE assessments (
  id SERIAL PRIMARY KEY,
  child_name VARCHAR(255),
  birth_date DATE,
  assessment_date DATE,
  attendees TEXT,
  language VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- priorities テーブル
CREATE TABLE priorities (
  id SERIAL PRIMARY KEY,
  assessment_id INTEGER REFERENCES assessments(id),
  priority_level INTEGER,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- daily_routines テーブル
CREATE TABLE daily_routines (
  id SERIAL PRIMARY KEY,
  assessment_id INTEGER REFERENCES assessments(id),
  category VARCHAR(50),
  item_key VARCHAR(100),
  value BOOLEAN,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- skills テーブル
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  assessment_id INTEGER REFERENCES assessments(id),
  category VARCHAR(50),
  skill_name VARCHAR(100),
  score INTEGER CHECK (score IN (0, 1, 2)),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- support_plans テーブル
CREATE TABLE support_plans (
  id SERIAL PRIMARY KEY,
  assessment_id INTEGER REFERENCES assessments(id),
  goals JSONB,
  practice_times JSONB,
  support_formats JSONB,
  next_assessment DATE,
  additional_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. 環境変数設定

`.env.local`ファイルを作成：
```env
DATABASE_URL=postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname
```

## 🌟 機能

- ✅ 包括的な発達評価フォーム
- ✅ 自動保存機能（ローカルストレージ）
- ✅ Markdownエクスポート
- ✅ Notion風のシンプルなデザイン
- ✅ モバイル対応レスポンシブデザイン
- ✅ オフライン動作可能

## 📱 使い方

1. **基本情報の入力** - お子さんの情報と評価日を記入
2. **優先事項の設定** - ご家族が重視する3つの目標を設定
3. **日常生活の評価** - 食事、睡眠、着替えなどの様子を記録
4. **発達スキルの評価** - 6つの主要領域を3段階で評価
5. **支援計画の作成** - 12週間の目標と実施形式を決定
6. **MDファイルで保存** - 評価結果をダウンロード

## 🔧 技術スタック

- **フロントエンド**: HTML, CSS, JavaScript（Vanilla）
- **データ保存**: LocalStorage / Neon DB（オプション）
- **デプロイ**: Vercel / Netlify
- **エクスポート**: Markdown形式

## 📄 ライセンス

MIT License

## 🤝 貢献

Issue や Pull Request は歓迎です！

## 📞 サポート

問題が発生した場合は、[Issues](https://github.com/TOMNOM-iine/branding-page/issues) で報告してください。