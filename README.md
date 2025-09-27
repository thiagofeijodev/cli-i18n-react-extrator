# typescript-find-translate

**Automate translation extraction and management for TypeScript/JavaScript projects!**

## 🚀 Overview

`typescript-find-translate` is a CLI tool and library that scans your codebase for translation keys, extracts them, and automates translation using Google Cloud Translate. It’s designed for projects using gettext `.po` files and supports batch translation, caching, and multi-language workflows.

## ✨ Features

- **Automatic Extraction:** Finds translation keys in your source files using customizable markers.
- **Batch Translation:** Translates terms in bulk via Google Cloud Translate.
- **Gettext Integration:** Reads and writes `.po` files for seamless localization.
- **Multi-language Support:** Easily add and manage multiple languages.
- **Caching:** Speeds up repeated runs by caching extracted terms.
- **Extensible:** Built with TypeScript for easy customization.

## 🛠️ Requirements

- Node.js
- Google Cloud Translate API credentials
- Gettext `.po` files for your languages

## 📦 Installation

```bash
git clone https://github.com/thiagofeijodev/typescript-find-translate.git
cd typescript-find-translate
npm install
```

## ⚡ Usage

1. **Configure your Google Cloud credentials:**
   - Set `GOOGLE_API_KEY` and `PROJECT` in your environment.

2. **Run the extractor and translator:**

```bash
npm run build
node bin/index.js
```

3. **Customize languages and markers in `src/index.ts` and `src/lib/extrator.ts`.**

## 🧩 How it Works

- Scans your codebase for translation keys (default marker: `translate`).
- Extracts terms and checks for new/untranslated keys.
- Translates missing terms using Google Cloud Translate.
- Updates your `.po` files with new translations.

## 📁 Project Structure

- `src/lib/` — Core logic for extraction, translation, and file management.
- `bin/` — Compiled CLI entry point.
- `locales/` — Your `.po` files for each language.

## 📝 Example

```typescript
const Languages = new LanguagesIterator([Lang.EnUs, Lang.Es], Extrator());
Languages
  .translate()
  .then(() => Languages.save())
  .then(data => console.log(data));
```

## 🧑‍💻 Contributing

PRs and issues welcome! See [LICENSE](LICENSE) for details.
