# sci

Small Node.js sample app plus a **Snyk open-source license violation demo** for training and scans.

## Main app

```bash
npm install
cp .env.example .env   # optional: Postgres settings
npm start
```

## Snyk license demo

See [demos/snyk-license-violation-demo/README.md](demos/snyk-license-violation-demo/README.md).

```bash
cd demos/snyk-license-violation-demo/nodejs && npm install
npm run snyk:license-demo   # from repo root, after snyk auth
```

Intentionally depends on GPL-licensed packages for policy scanning demos only.
