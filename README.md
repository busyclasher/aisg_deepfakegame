# aisg_deepfakegame

## How to run the game

This game is a **single-page web app** (`deepfake-decoder.html`) that loads local assets from `videos/` and `original.jpg`.

### Option A (recommended): run a local web server

From this folder (`C:\Users\tanyi\Downloads\aisg_deepfakegame-2`), run **one** of the following:

- **Python**:

```bash
python -m http.server 8000
```

- **Node.js**:

```bash
npx http-server . -p 8000
```

Then open:

- `http://localhost:8000/deepfake-decoder.html`

### Option B: open the HTML file directly

Double-click `deepfake-decoder.html` to open it in your browser.

If the videos don’t play (some browsers restrict media loading from `file://`), use Option A instead.