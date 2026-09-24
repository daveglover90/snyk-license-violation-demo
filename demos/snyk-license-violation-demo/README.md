# Snyk open-source license violation demo

Intentionally pulls **GPL-licensed** dependencies into apps that declare a **proprietary / closed-source** license. Use this only in a sandbox org or demo project to show how Snyk flags license policy violations.

## What triggers Snyk

1. **Dependencies** declare strong copyleft licenses (GPL-2.0, GPL-3.0, etc.).
2. Your **Snyk organization license policy** marks those licenses as disallowed (typical for commercial products).
3. Optional: the app manifest uses `UNLICENSED` / proprietary wording so the narrative is “we ship closed source but depend on copyleft.”

Snyk reports **license issues** on the dependency graph; it does not prove legal infringement by itself—that is what your policy is meant to surface for review.

## Prerequisites

- [Snyk CLI](https://docs.snyk.io/developer-tools/snyk-cli) authenticated (`snyk auth`)
- In **Snyk → Settings → Policies → License policies**, deny at least:
  - `GPL-2.0` / `GPL-2.0-or-later`
  - `GPL-3.0` / `GPL-3.0-or-later`
  - (Optional) `AGPL-3.0` variants for stricter demos

## Node.js demo

```bash
cd nodejs
npm install
snyk test --file=package.json
# or monitor in the UI:
snyk monitor --file=package.json --project-name="demo-gpl-node"
```

Expected GPL-related packages:

| Package         | Declared license   |
|-----------------|--------------------|
| `ffmpeg-static` | GPL-3.0-or-later   |
| `ccnetviz`      | GPL-3.0            |

## Python demo

```bash
cd python
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
snyk test --file=requirements.txt --command=python3
```

Expected: `mysqlclient` → **GPL-2.0-or-later**.

## Demo talking points

- Show the **Licenses** tab / license issues in the project snapshot.
- Contrast **direct** vs **transitive** GPL (Node tree may include additional GPL entries under `ffmpeg-static`).
- Remediation story: remove dependency, swap library, isolate in separate process, or pursue legal exception—not “ignore and ship.”

## Nothing shows up for licenses?

Most demos fail for one of these reasons:

### 1. Scanning the wrong manifest (most common)

The main **`sci`** app at the repo root only uses permissive licenses (MIT). GPL deps live under **`demos/snyk-license-violation-demo/nodejs/`**, not in the root `package.json`.

From the repo root:

```bash
cd demos/snyk-license-violation-demo/nodejs && npm install
snyk test --file=package.json
```

Or use the helper script:

```bash
./demos/snyk-license-violation-demo/scan.sh
```

CLI output must include a **`License issues:`** block (two GPL-3.0 entries). If you only see “no vulnerable paths” and no license block, you are on the **root** `sci` project, not the demo.

### 2. Snyk UI shows the imported `sci` project only

Git/CI imports often create **one** Open Source project for the root lockfile. That project will have **zero license issues** until you import or monitor the demo manifest:

```bash
snyk monitor \
  --file=demos/snyk-license-violation-demo/nodejs/package.json \
  --project-name="demo-gpl-licenses"
```

In the UI, open **`demo-gpl-licenses`**, not **`sci`**. On the issues list, set type/filter to **License** (not only Security/Vulnerabilities).

### 3. Organization license policy severity is `None`

Snyk only reports licenses your **license policy** treats as Low/Medium/High. If GPL-3.0 is set to **None**, it will **not** appear in `snyk test` results (even if the dependency is GPL).

Check **Organization settings → Licenses / License policies** and set **GPL-3.0** and **GPL-2.0** to at least **High** (Snyk defaults usually do this already).

Confirm CLI footer says **`Licenses: enabled`**. If it says disabled, license compliance is off for that org.

### 4. Expecting a full license inventory

License **policy issues** (violations) are not the same as browsing every dependency license. For violations, use the steps above. For a full dependency license list, open the monitored project → **Dependencies** (license column) or your org **Reports** after a successful import/monitor.

### 5. Python demo without installed packages

`snyk test` on `requirements.txt` needs packages installed in the active environment:

```bash
cd python && python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
snyk test --file=requirements.txt --command=python3
```

## Cleanup

These projects are for training only. Do not reuse this pattern in production services without a deliberate compliance review.
