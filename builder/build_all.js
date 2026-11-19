const fs = require('fs');
const path = require('path');

const cssContent = require('./css');
const htmlHudContent = require('./html_hud');
const scene3DContent = require('./scene_3d');
const jsModulesContent = require('./js_modules');

console.log("Assembling CPR-VR.html self-contained single-file application...");

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>CPR-VR — Virtual Reality CPR Medical Training Simulator</title>
  <meta name="description" content="Immersive WebXR Medical Simulation for Cardiopulmonary Resuscitation (CPR) Training on Meta Quest 3S and Windows Desktop" />

  <!-- Google Fonts: Inter & Orbitron -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Orbitron:wght@500;700;800;900&display=swap" rel="stylesheet">

  <!-- A-Frame 1.6.0 3D & WebXR Framework -->
  <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>

  <!-- Canvas Confetti Celebration Library -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>

  <!-- Embedded CSS Styles -->
  <style>
${cssContent}
  </style>
</head>
<body>
${htmlHudContent}
${scene3DContent}

  <!-- Embedded JavaScript Application Engine -->
  <script>
${jsModulesContent}
  </script>
</body>
</html>
`;

const outputPath = path.join(__dirname, '..', 'CPR-VR.html');
const indexPath = path.join(__dirname, '..', 'index.html');

fs.writeFileSync(outputPath, fullHtml, 'utf8');
console.log(`Successfully generated: ${outputPath} (${(fullHtml.length / 1024).toFixed(1)} KB)`);

fs.writeFileSync(indexPath, fullHtml, 'utf8');
console.log(`Successfully updated: ${indexPath} (identical copy for direct web server access)`);
