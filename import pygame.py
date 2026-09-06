mkdir horror-campus && cd horror-campus
npm init -y
npm install three vite
"scripts": { "dev": "vite" }
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Campus Horror</title>
  <style>
    body { margin: 0; overflow: hidden; background: #000; }
    #hud {
      position: absolute; bottom: 20px; left: 20px;
      color: #ddd; font-family: monospace; font-size: 14px;
      z-index: 10; text-shadow: 1px 1px 2px black;
    }
  </style>
</head>
<body>
  <div id="hud">Battery: <span id="battery">100</span>%</div>
  <script type="module" src="/main.js"></script>
</body>
</html>