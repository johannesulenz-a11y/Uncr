# UNCR – Uncountable Recipes

Private Rezeptverwaltung als installierbare PWA (Progressive Web App).

## Inhalt

```
index.html          ← komplette App (~32 MB, alle Rezeptbilder eingebettet)
manifest.json       ← PWA-Manifest
sw.js               ← Service Worker (Offline-Cache)
icon-192.png
icon-512.png
icon-apple-touch.png
icon-maskable.png
.nojekyll           ← verhindert Jekyll-Verarbeitung durch GitHub Pages
```

## GitHub Pages aktivieren

1. Repository → **Settings** → **Pages**
2. Source: **Deploy from a branch** → Branch `main` → `/` (root) → **Save**
3. Nach 2–3 Minuten erreichbar unter:
   `https://<dein-username>.github.io/<repo-name>/`

## App auf Android installieren

1. URL in Chrome öffnen
2. Chrome-Menü (⋮) → **„App installieren"** oder **„Zum Startbildschirm"**
3. Beim ersten Start: **💾 Tippen** → Speicherort für `uncr_daten.json` wählen
4. Ab dann: alle Änderungen werden automatisch in die JSON-Datei geschrieben

## Datenspeicherung

- **Primär:** File System Access API → `uncr_daten.json` auf dem Gerät
- **Fallback:** IndexedDB + localStorage
- Die Datei überlebt Cache-Clears und App-Neuinstallationen
- GitHub sieht **keine** deiner Daten — nur der App-Code liegt auf GitHub

## Update einspielen

Neue `index.html` (und ggf. `sw.js`) in das Repository hochladen und bestehende Dateien ersetzen. GitHub Pages veröffentlicht die neue Version automatisch nach 1–2 Minuten.

## Version

v37
