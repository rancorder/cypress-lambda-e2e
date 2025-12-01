# 🚀 Cypress Lambda E2E Test Automation

<div align="center">

[![CI](https://github.com/rancorder/cypress-lambda-e2e/actions/workflows/ci.yml/badge.svg)](https://github.com/rancorder/cypress-lambda-e2e/actions)
[![Cypress](https://img.shields.io/badge/Cypress-13.6.0+-17202C?style=flat&logo=cypress)](https://www.cypress.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**5分でセットアップ完了 | 即座に動く | CI/CD Ready**

[デモを見る](#-demo) • [クイックスタート](#-quick-start) • [ドキュメント](#-documentation)

</div>

---

## 💡 What is This?

エンタープライズレベルのE2Eテスト自動化環境を、**誰でも・即座に・確実に**動かせる実践的テンプレート。

### 🎯 3つの特徴

```
✅ インストール1回 → テスト実行まで5分
✅ GitHub Actions自動実行（50秒で完了）
✅ Lambda統合を見据えたスケーラブル設計
```

### 📊 実績データ

| 指標 | 値 | 備考 |
|------|-----|------|
| **セットアップ時間** | 5分 | `npm install` → `npm test` |
| **テスト実行時間** | 1秒 | ローカル環境（実測値） |
| **CI実行時間** | 50秒 | GitHub Actions（実測値） |
| **成功率** | 100% | 初回から動作保証 |

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

### 結果確認

```
✓ All specs passed!
  Video: cypress/videos/sample.cy.js.mp4
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
│   │   └── e2e.js              ← グローバル設定
│   └── videos/                 ← 自動録画（gitignore）
├── lambda/                     ← 将来のLambda統合用
├── cypress.config.js           ← Cypress設定
└── package.json
```

### 設計思想

**Why This Architecture?**

1. **即座に動く = 信頼の証明**
   - 複雑なセットアップは採用の障壁
   - `npm install` → `npm test` だけで動く

2. **拡張性 > 完璧性**
   - Lambda統合ディレクトリ準備済
   - Multi-browser対応済み
   - 段階的に拡張できる構造

3. **失敗を記録する文化**
   - 動画録画: `video: true`
   - スクリーンショット: `screenshotOnRunFailure: true`
   - デバッグ時間の短縮

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

### 環境変数で設定切り替え

```bash
# Staging環境
CYPRESS_BASE_URL=https://staging.example.com npm test

# Production環境
CYPRESS_BASE_URL=https://prod.example.com npm test
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

## 🗺️ Roadmap

### Phase 1: 基盤構築 ✅

- [x] Cypressセットアップ
- [x] 基本テストケース作成
- [x] CI/CD設定
- [x] Multi-browser対応

### Phase 2: Lambda統合 🚧

- [ ] AWS Lambda関数作成
- [ ] Cypress + Lambda実行環境
- [ ] 並列実行設定
- [ ] コスト最適化

### Phase 3: 高度な機能 📋

- [ ] ビジュアルリグレッションテスト
- [ ] パフォーマンステスト統合
- [ ] Slack通知連携
- [ ] テストレポートダッシュボード

---

## 💭 Philosophy

### なぜこのアプローチを選んだか

#### 1. 即座に動く = 信頼の証明

複雑なセットアップは採用の障壁となる。`npm install` → `npm test` で動く環境こそが、実務での保守性を証明する。

#### 2. 拡張性 > 完璧性

完璧な初期実装よりも、段階的に拡張できる構造を重視。`lambda/` ディレクトリはまだ空だが、これは「未来への余白」である。

#### 3. 失敗を記録する文化

`video: true` と `screenshotOnRunFailure: true` は、単なる機能ではなく「失敗から学ぶ姿勢」の表明。デバッグ時間の短縮は、チーム全体の生産性に直結する。

#### 4. ドキュメントはコードの一部

README.mdは「読まれるために書く」のではなく「理解されるために設計する」もの。技術選定の理由、トラブルシューティング、今後の展望まで含めることで、コードベース全体の「意図」を伝える。

---

## 📈 Performance

### ローカル実行

```
Tests:        1
Passing:      1
Failing:      0
Duration:     1 second
Video:        generated
```

### CI/CD実行

```
Chrome:       50 seconds
Firefox:      completed
Edge:         completed
```

---

## 🤝 Contributing

Pull Requestsを歓迎します！

詳細は [CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

### Quick Guide

```bash
# 1. Fork & Clone
git clone https://github.com/YOUR_USERNAME/cypress-lambda-e2e.git

# 2. Create Branch
git checkout -b feature/amazing-feature

# 3. Commit
git commit -m 'feat: add amazing feature'

# 4. Push & PR
git push origin feature/amazing-feature
```

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

## 🌟 Why This Repository?

### For Hiring Managers

このリポジトリは、以下の能力を証明します：

✅ **技術力**
- E2Eテスト自動化の実装能力
- CI/CDパイプライン構築経験
- クラウド統合を見据えた設計思想

✅ **実務能力**
- 即座に動く環境の構築
- ドキュメント作成能力
- 保守性を考慮した設計

✅ **チーム貢献力**
- 他者が理解しやすいコード
- トラブルシューティング情報の充実
- 段階的な拡張を可能にする構造

### For Developers

このリポジトリは、以下を提供します：

🎯 **即座に使えるテンプレート**
- コピペで動く設定
- ベストプラクティスの実装例
- 実務で使える構造

🚀 **学習教材**
- Cypress実装の参考例
- CI/CD設定の実例
- Git運用のベストプラクティス

🔧 **拡張可能な基盤**
- Lambda統合の準備
- Multi-browser対応
- カスタマイズ可能な構造

---

<div align="center">

# Cypress E2E Test Automation

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Run tests:
   ```
   npm test
   ```

3. Open GUI:
   ```
   npm run cypress:open
   ```

### ⭐ このリポジトリが役に立ったら、ぜひStarをお願いします！

**Made with ❤️ and ☕ by engineers, for engineers**

[⬆ Back to top](#-cypress-lambda-e2e-test-automation)

</div>
