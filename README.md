# 🚀 Cypress Lambda E2E Test Automation

<div align="center">

[![CI](https://github.com/rancorder/cypress-lambda-e2e/actions/workflows/ci.yml/badge.svg)](https://github.com/rancorder/cypress-lambda-e2e/actions)
[![Cypress](https://img.shields.io/badge/Cypress-13.6.0+-17202C?style=flat&logo=cypress)](https://www.cypress.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**5分でセットアップ完了 | 即座に動く | CI/CD Ready**

[デモを見る](#-demo) • [クイックスタート](#-quick-start) • [テストについて](#-what-we-test) • [ドキュメント](#-documentation)

</div>

---

## 💡 What is This?

エンタープライズレベルの**E2Eテスト自動化環境**を、誰でも・即座に・確実に動かせる実践的テンプレート。

### 🎯 E2Eテストとは？

**End-to-End Testing** = ユーザーの実際の操作をシミュレートして、アプリケーション全体が正しく動作するかを検証するテスト手法。

```
従来の手動テスト:
👤 人間が毎回クリック → 時間がかかる・ミスが起きる

E2Eテスト自動化:
🤖 ロボットが自動で操作 → 1秒で完了・100%再現可能
```

### 📊 このリポジトリの特徴

| 指標 | 値 | 備考 |
|------|-----|------|
| **セットアップ時間** | 5分 | `npm install` → `npm test` |
| **テスト実行時間** | 1秒 | ローカル環境（実測値） |
| **CI実行時間** | 50秒 | GitHub Actions（実測値） |
| **成功率** | 100% | 初回から動作保証 |

---

## 🧪 What We Test

### **現在実装されているテスト**

#### `sample.cy.js` - 基本的な画面表示テスト

```javascript
describe('Sample Test', () => {
  it('should visit homepage', () => {
    cy.visit('/');                      // ← サイトにアクセス
    cy.get('h1').should('be.visible');  // ← h1タグが表示されるか確認
  });
});
```

**このテストの目的:**
- ✅ Cypressが正常に動作するか確認
- ✅ 基本的な画面レンダリングの検証
- ✅ CI/CDパイプラインの動作確認

**テスト対象:**
- URL: `https://example.cypress.io` (Cypressの公式サンプルサイト)
- 検証内容: ホームページのh1タグが表示されること

---

### **実装可能なテストケース集**

<details>
<summary>🔐 <strong>1. 認証・ログインテスト</strong></summary>

```javascript
describe('User Authentication', () => {
  it('正しい認証情報でログイン成功', () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type('user@example.com');
    cy.get('[data-testid="password"]').type('password123');
    cy.get('[data-testid="submit"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="welcome"]').should('be.visible');
  });

  it('間違った認証情報でエラー表示', () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type('wrong@example.com');
    cy.get('[data-testid="password"]').type('wrong');
    cy.get('[data-testid="submit"]').click();
    
    cy.get('[data-testid="error"]').should('contain', 'Invalid credentials');
  });
});
```

**検証内容:**
- ログインフォームの表示
- 正常ログイン→ダッシュボード遷移
- 不正な認証情報でのエラー表示
- パスワードリセット機能
- セッション維持の確認

</details>

<details>
<summary>📝 <strong>2. フォーム入力テスト</strong></summary>

```javascript
describe('Contact Form', () => {
  it('全項目入力で送信成功', () => {
    cy.visit('/contact');
    cy.get('[name="name"]').type('山田太郎');
    cy.get('[name="email"]').type('yamada@example.com');
    cy.get('[name="message"]').type('お問い合わせ内容');
    cy.get('button[type="submit"]').click();
    
    cy.get('.success').should('contain', '送信完了');
  });

  it('必須項目未入力でエラー表示', () => {
    cy.visit('/contact');
    cy.get('button[type="submit"]').click();
    
    cy.get('.error-name').should('be.visible');
    cy.get('.error-email').should('be.visible');
  });
});
```

**検証内容:**
- フォームのバリデーション
- 必須項目チェック
- メールアドレス形式チェック
- 文字数制限
- 送信成功時の挙動

</details>

<details>
<summary>🛒 <strong>3. E2E購入フロー</strong></summary>

```javascript
describe('EC購入フロー', () => {
  it('商品閲覧→カート追加→購入完了', () => {
    // 1. 商品ページ
    cy.visit('/products/1');
    cy.get('[data-testid="add-to-cart"]').click();
    
    // 2. カート確認
    cy.get('[data-testid="cart-icon"]').click();
    cy.get('.cart-item').should('have.length', 1);
    
    // 3. 購入手続き
    cy.get('[data-testid="checkout"]').click();
    cy.get('[name="name"]').type('山田太郎');
    cy.get('[name="address"]').type('東京都渋谷区1-1-1');
    
    // 4. 注文確定
    cy.get('[data-testid="confirm"]').click();
    cy.url().should('include', '/complete');
  });
});
```

**検証内容:**
- 商品詳細ページの表示
- カート追加・削除
- 数量変更
- 配送先入力
- 支払い方法選択
- 注文確定→完了画面

</details>

<details>
<summary>🌐 <strong>4. APIテスト（インターセプト）</strong></summary>

```javascript
describe('Product API', () => {
  it('商品一覧の取得', () => {
    cy.intercept('GET', '/api/products', {
      statusCode: 200,
      body: [
        { id: 1, name: '商品A', price: 1000 },
        { id: 2, name: '商品B', price: 2000 }
      ]
    }).as('getProducts');

    cy.visit('/products');
    cy.wait('@getProducts');
    
    cy.get('.product-item').should('have.length', 2);
  });
});
```

**検証内容:**
- APIレスポンスのモック
- エラーハンドリング
- ローディング状態
- タイムアウト処理
- リトライ機能

</details>

<details>
<summary>📱 <strong>5. レスポンシブテスト</strong></summary>

```javascript
describe('Mobile Responsive', () => {
  it('iPhone - ハンバーガーメニュー表示', () => {
    cy.viewport('iphone-6');
    cy.visit('/');
    
    cy.get('.hamburger').should('be.visible');
    cy.get('.hamburger').click();
    cy.get('.nav-menu').should('be.visible');
  });

  it('Desktop - 通常メニュー表示', () => {
    cy.viewport(1440, 900);
    cy.visit('/');
    
    cy.get('.nav-menu').should('be.visible');
    cy.get('.hamburger').should('not.exist');
  });
});
```

**検証内容:**
- iPhone/iPad/Desktop対応
- ハンバーガーメニュー
- タッチ操作
- 画面回転対応

</details>

<details>
<summary>⚡ <strong>6. パフォーマンステスト</strong></summary>

```javascript
describe('Performance', () => {
  it('ページ読み込みが3秒以内', () => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.performance.mark('start');
      }
    });

    cy.window().then((win) => {
      win.performance.mark('end');
      win.performance.measure('load', 'start', 'end');
      const measure = win.performance.getEntriesByName('load')[0];
      expect(measure.duration).to.be.lessThan(3000);
    });
  });
});
```

**検証内容:**
- ページ読み込み時間
- Time to Interactive
- First Contentful Paint
- リソースサイズ

</details>

<details>
<summary>♿ <strong>7. アクセシビリティテスト</strong></summary>

```javascript
describe('Accessibility', () => {
  it('キーボードナビゲーション', () => {
    cy.visit('/');
    cy.get('body').tab();
    cy.focused().should('have.attr', 'href');
  });

  it('スクリーンリーダー用ラベル', () => {
    cy.visit('/contact');
    cy.get('[name="email"]')
      .should('have.attr', 'aria-label');
  });
});
```

**検証内容:**
- キーボード操作
- aria-label属性
- コントラスト比
- フォーカス順序

</details>

---

## 🌍 Test Environments

### **テスト実行環境の使い分け**

```
開発環境（localhost）
├─ 目的: 機能開発中の動作確認
├─ URL: http://localhost:3000
├─ 実行: npm run cypress:open
└─ 特徴: リアルタイムで変更を確認

ステージング環境（推奨）
├─ 目的: 本番リリース前の最終確認
├─ URL: https://staging.example.com
├─ 実行: CYPRESS_BASE_URL=https://staging.example.com npm test
└─ 特徴: 本番と同じ構成でテスト

本番環境（監視のみ）
├─ 目的: サービスの死活監視
├─ URL: https://example.com
├─ 方法: Datadog/New Relic等の専用ツール
└─ 注意: データ汚染・負荷・課金のリスクあり
```

### ⚠️ **本番環境での実行はNG**

```
❌ やってはいけないこと:
- 本番環境でテストユーザー作成
- 本番データベースへの書き込み
- 実際の決済処理のテスト
- 大量のAPIリクエスト送信

✅ 正しいアプローチ:
- ステージング環境で本番同様のテスト
- 本番は監視ツールで死活確認のみ
- テスト専用アカウント・サンドボックス利用
```

---

## ⚡ Quick Start

### 前提条件

- Node.js 18.x以上
- npm 9.x以上

### 3ステップで起動

```bash
# 1. Clone
git clone https://github.com/rancorder/cypress-lambda-e2e.git
cd cypress-lambda-e2e

# 2. Install（3分）
npm install

# 3. Run（1秒）
npm test
```

### 環境変数で実行先を変更

```bash
# ステージング環境でテスト
CYPRESS_BASE_URL=https://staging.example.com npm test

# 本番環境でテスト（非推奨）
CYPRESS_BASE_URL=https://example.com npm test
```

---

## 🎬 Demo

### ローカル実行

```bash
npm test
```

**実行結果（実測値）:**

```
✓ should visit homepage (1173ms)

1 passing (1s)
```

### CI/CD自動実行

![GitHub Actions](https://github.com/rancorder/cypress-lambda-e2e/actions/workflows/ci.yml/badge.svg)

**最新の実行結果:** [Actions](https://github.com/rancorder/cypress-lambda-e2e/actions)

```
✅ Chrome: 50秒で完了
✅ Firefox: 完了
✅ Edge: 完了
```

---

## 🏗️ Architecture

```
cypress-lambda-e2e/
├── .github/
│   └── workflows/
│       └── ci.yml              ← 自動テスト（Chrome/Firefox/Edge）
├── cypress/
│   ├── e2e/
│   │   └── auth/
│   │       └── sample.cy.js    ← テストケース
│   ├── support/
│   │   ├── e2e.js              ← グローバル設定
│   │   └── commands.js         ← カスタムコマンド
│   └── videos/                 ← 自動録画（gitignore）
├── lambda/                     ← 将来のLambda統合用
├── cypress.config.js           ← Cypress設定
└── package.json
```

---

## 🛠️ Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **E2E Framework** | Cypress | 13.6.0+ | テスト自動化 |
| **Runtime** | Node.js | 18.x+ | 実行環境 |
| **Browser** | Electron | 118 | Headless実行 |
| **CI/CD** | GitHub Actions | - | 自動テスト |
| **Future** | AWS Lambda | - | スケーラブル実行 |

---

## 📋 Available Scripts

```bash
# Headlessモードでテスト実行
npm test

# Cypress GUIを開く
npm run cypress:open

# 特定のspecファイルを実行
npx cypress run --spec "cypress/e2e/auth/sample.cy.js"

# ブラウザ指定実行
npx cypress run --browser chrome
npx cypress run --browser firefox

# ステージング環境でテスト
CYPRESS_BASE_URL=https://staging.example.com npm test
```

---

## 🔧 Configuration

### `cypress.config.js`

```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://example.cypress.io',
    video: true,                    // 動画録画ON
    screenshotOnRunFailure: true,   // 失敗時スクリーンショット
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000
  }
});
```

### カスタムコマンド追加

```javascript
// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[data-testid="submit"]').click();
});

// 使用例
cy.login('user@example.com', 'password123');
```

---

## 🚦 CI/CD Integration

### GitHub Actions

`.github/workflows/ci.yml` で自動実行：

```yaml
name: E2E Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - uses: cypress-io/github-action@v6
```

### 実行結果

**最新の実行:** [Actions](https://github.com/rancorder/cypress-lambda-e2e/actions)

- ✅ Chrome: 50秒
- ✅ Firefox: 完了
- ✅ Edge: 完了

---

## 🗺️ Roadmap

### Phase 1: 基盤構築 ✅

- [x] Cypressセットアップ
- [x] 基本テストケース作成
- [x] CI/CD設定
- [x] Multi-browser対応

### Phase 2: テストケース拡充 🚧

- [ ] 認証テスト（ログイン/サインアップ）
- [ ] フォーム入力テスト
- [ ] APIテスト（インターセプト）
- [ ] レスポンシブテスト
- [ ] E2E購入フロー

### Phase 3: Lambda統合 📋

- [ ] AWS Lambda関数作成
- [ ] Cypress + Lambda実行環境
- [ ] 並列実行設定
- [ ] コスト最適化

### Phase 4: 高度な機能 💡

- [ ] ビジュアルリグレッションテスト
- [ ] パフォーマンステスト統合
- [ ] Slack通知連携
- [ ] テストレポートダッシュボード

---

## 💭 Philosophy

### なぜE2Eテスト自動化が重要か

#### 1. 時間の節約

```
手動テスト: 30分 × 10回 = 300分（5時間）
自動テスト: 1分 × 10回 = 10分

→ 290分（4時間50分）の節約
```

#### 2. 人的ミスの排除

- ✅ 同じ操作を100%再現
- ✅ 見落としがない
- ✅ 疲労による影響なし

#### 3. 継続的な品質保証

- ✅ PRごとに自動実行
- ✅ リグレッション（既存機能の劣化）を即座に検知
- ✅ 安心してリファクタリング可能

---

## 🐛 Troubleshooting

### よくある3つの問題

#### 1. `Cypress verification timed out`

**原因:** ファイアウォールまたはウイルス対策ソフト

**解決策:**
```bash
npx cypress cache clear
npm install cypress --force
```

#### 2. `Error: ENOENT: no such file or directory`

**原因:** cypressフォルダ構造が不完全

**解決策:**
```bash
npx cypress open  # 一度開くと自動生成
```

#### 3. Node.jsバージョン不一致

**原因:** Node.js 18未満

**解決策:**
```bash
node --version  # 確認
# 18以上をインストール: https://nodejs.org/
```

---

## 🤝 Contributing

Pull Requestsを歓迎します！

詳細は [CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

---

## 📄 License

MIT License - 詳細は [LICENSE](LICENSE) を参照

---

## 📬 Contact

**Project Maintainer:** rancorder

- GitHub: [@rancorder](https://github.com/rancorder)
- Repository: [cypress-lambda-e2e](https://github.com/rancorder/cypress-lambda-e2e)

**質問・提案・バグ報告:**
- [Issues](https://github.com/rancorder/cypress-lambda-e2e/issues)
- [Discussions](https://github.com/rancorder/cypress-lambda-e2e/discussions)

---

<div align="center">

### ⭐ このリポジトリが役に立ったら、ぜひStarをお願いします！

**Made with ❤️ and ☕ by engineers, for engineers**

[⬆ Back to top](#-cypress-lambda-e2e-test-automation)

</div>
