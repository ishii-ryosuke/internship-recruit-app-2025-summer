# Firebase Web アプリ テンプレート

このテンプレートは、Firebase Hosting と Firebase Emulator を使ってローカル開発ができるシンプルな Web アプリです。HTML/CSS/JavaScript のみで構成されています。

## 📁 フォルダ構成
```
internship-recruit-app/
├── public/
│ ├── index.html
│ ├── style.css
│ ├── app.js
│ └── firebase-config.js ← ※Git 管理対象外
├── firebase.json
├── .firebaserc
├── .gitignore
└── README.md
```

## 🔧 事前準備

1. **Node.js をインストール**
   - [Node.js 公式サイト](https://nodejs.org/ja) からダウンロードしてください。
   - Node.js のバージョンが 22 以上であることを確認してください。
     ```
     node -v
     v22.XX.X
     ```

2. **Firebase CLI のインストール**

    ```bash
    npm install -g firebase-tools
    ```

3. **Firebase にログイン**
    ```bash
    firebase login
    ```

## 🚀ローカルアプリの起動手順

1. このリポジトリをクローン
    ```bash
    git clone git@github.com:ishii-ryosuke/internship-recruit-app.git
    cd internship-recruit-app.git
    ```

2. `firebase-config.js` を作成

    以下のように `public/firebase-config.js` ファイルを作成し、Firebase コンソールから取得した設定情報を記述してください。  
    設定情報はFirebase コンソールの [プロジェクト設定] → [一般] タブから取得できます。

    ```javascript
    export const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "SENDER_ID",
      appId: "APP_ID"
    };
    ```

3. エミュレーターの起動

    ```shell
    firebase emulators:start
    ```
    起動後に以下のURLからローカルアプリにアクセスできます。
    ```
    http://localhost:5000
    ```
    起動したアプリは `Ctrl + C` で停止することができます。

4. アプリのデプロイ
    以下のコマンドで Firebase Hosting にデプロイできます。
    ```shell
    firebase deploy
    ```

5. 注意事項
- `public/firebase-config.js` は Git 管理対象外 です。`.gitignore` によって除外されています。
  - プロジェクトを他の人と共有する場合、個別に `firebase-config.js` を作成してもらうようにしてください。
