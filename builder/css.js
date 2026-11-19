module.exports = `
:root {
  --bg-primary: #040810;
  --bg-secondary: #091220;
  --bg-card: rgba(10, 20, 38, 0.92);
  --bg-card-solid: #0d1a30;
  --accent-cyan: #00f0ff;
  --accent-blue: #0077ff;
  --accent-green: #00ff88;
  --accent-amber: #ffb700;
  --accent-red: #ff3366;
  --text-main: #ffffff;
  --text-muted: #8ea2c0;
  --border-glass: rgba(0, 240, 255, 0.2);
  --border-glass-bright: rgba(0, 240, 255, 0.6);
  --shadow-neon: 0 0 15px rgba(0, 240, 255, 0.25);
  --shadow-neon-green: 0 0 15px rgba(0, 255, 136, 0.35);
  --shadow-neon-red: 0 0 15px rgba(255, 51, 102, 0.35);
  --font-main: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-tech: 'Orbitron', 'JetBrains Mono', monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  user-select: none;
  -webkit-user-select: none;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--bg-primary);
  font-family: var(--font-main);
  color: var(--text-main);
}

/* 3D Scene Layer */
#aframe-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* 2D HUD UI Layer */
#hud-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hud-interactive {
  pointer-events: auto;
}

/* Sleek Top Navigation Bar */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 14px;
  background: linear-gradient(180deg, rgba(4, 8, 16, 0.96) 0%, rgba(4, 8, 16, 0.8) 80%, transparent 100%);
  border-bottom: 1px solid var(--border-glass);
  backdrop-filter: blur(8px);
  gap: 8px;
  flex-wrap: nowrap;
  overflow: hidden;
  min-height: 44px;
}

.brand-section {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-tech);
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 1.2px;
  color: #fff;
  text-shadow: 0 0 10px var(--accent-cyan);
  white-space: nowrap;
}

.brand-logo .pulse-heart {
  color: var(--accent-red);
  font-size: 1.3rem;
  animation: heartPulse 1.2s infinite ease-in-out;
}

@keyframes heartPulse {
  0% { transform: scale(1); }
  15% { transform: scale(1.25); }
  30% { transform: scale(1); }
  45% { transform: scale(1.15); }
  60% { transform: scale(1); }
  100% { transform: scale(1); }
}

.brand-tag {
  font-size: 0.62rem;
  background: rgba(0, 240, 255, 0.12);
  border: 1px solid var(--accent-cyan);
  color: var(--accent-cyan);
  padding: 2px 5px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-family: var(--font-tech);
  white-space: nowrap;
}

/* Mode Switcher Tabs */
.mode-tabs {
  display: flex;
  background: rgba(9, 18, 32, 0.85);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  padding: 2px;
  gap: 2px;
  flex-shrink: 0;
}

.mode-tab-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-family: var(--font-main);
  font-size: 0.74rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

.mode-tab-btn:hover {
  color: #fff;
  background: rgba(0, 240, 255, 0.1);
}

.mode-tab-btn.active {
  color: #fff;
  background: linear-gradient(135deg, rgba(0, 119, 255, 0.85) 0%, rgba(0, 240, 255, 0.9) 100%);
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
}

/* Camera Quick Pills */
.camera-pills-group {
  display: flex;
  background: rgba(9, 18, 32, 0.85);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  padding: 2px;
  gap: 2px;
  flex-shrink: 0;
}

.camera-pill-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-family: var(--font-tech);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 3px 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.camera-pill-btn:hover {
  color: #fff;
}

.camera-pill-btn.active {
  background: rgba(0, 240, 255, 0.25);
  color: var(--accent-cyan);
}

/* Selectors and Controls */
.top-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.selector-group {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(9, 18, 32, 0.85);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  padding: 2px 6px;
  white-space: nowrap;
  flex-shrink: 0;
}

.selector-label {
  font-size: 0.65rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: var(--font-tech);
  white-space: nowrap;
}

.custom-select {
  background: transparent;
  border: none;
  color: var(--accent-cyan);
  font-family: var(--font-main);
  font-size: 0.74rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  max-width: 125px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-select option {
  background: var(--bg-secondary);
  color: #fff;
}

.icon-btn {
  background: rgba(9, 18, 32, 0.85);
  border: 1px solid var(--border-glass);
  color: var(--text-main);
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.icon-btn:hover {
  border-color: var(--accent-cyan);
  box-shadow: var(--shadow-neon);
  transform: translateY(-1px);
}

.icon-btn.active {
  background: rgba(0, 240, 255, 0.2);
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
  box-shadow: var(--shadow-neon);
}

.badge-pill {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid var(--accent-green);
  color: var(--accent-green);
  font-size: 0.65rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;
}

.badge-pill .dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent-green);
  box-shadow: 0 0 5px var(--accent-green);
  animation: blinkDot 1.5s infinite;
}

@keyframes blinkDot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* ==================== VIEWPORT HUD ==================== */
.main-hud-area {
  flex: 1;
  position: relative;
  overflow: hidden;
  pointer-events: none;
}

/* Edge Drawer Toggle Buttons */
.drawer-toggle-btn {
  position: absolute;
  top: 14px;
  background: rgba(9, 18, 32, 0.92);
  border: 1px solid var(--border-glass);
  color: #fff;
  border-radius: 6px;
  padding: 6px 10px;
  font-family: var(--font-tech);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.5);
  transition: all 0.2s ease;
  pointer-events: auto;
  z-index: 20;
  white-space: nowrap;
}

.drawer-toggle-btn:hover {
  border-color: var(--accent-cyan);
  background: rgba(0, 240, 255, 0.15);
  box-shadow: var(--shadow-neon);
}

.drawer-toggle-btn.left {
  left: 14px;
}

.drawer-toggle-btn.right {
  right: 14px;
}

/* Sliding Drawer Panels (Collapsed by default) */
.slide-drawer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 310px;
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  backdrop-filter: blur(16px);
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: auto;
  z-index: 30;
  overflow: hidden;
}

.slide-drawer.left {
  left: 0;
  border-left: none;
  border-radius: 0 12px 12px 0;
  transform: translateX(-105%);
}

.slide-drawer.right {
  right: 0;
  border-right: none;
  border-radius: 12px 0 0 12px;
  transform: translateX(105%);
}

.slide-drawer.open {
  transform: translateX(0);
}

.drawer-header {
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-glass);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(4, 8, 16, 0.6);
  flex-shrink: 0;
}

.drawer-title {
  font-family: var(--font-tech);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: var(--accent-cyan);
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.drawer-body {
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
}

.drawer-body::-webkit-scrollbar {
  width: 4px;
}
.drawer-body::-webkit-scrollbar-thumb {
  background: var(--border-glass);
  border-radius: 4px;
}

/* Lessons List */
.lesson-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.lesson-item {
  background: rgba(9, 18, 32, 0.7);
  border: 1px solid rgba(0, 240, 255, 0.1);
  border-radius: 6px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
}

.lesson-item:hover {
  background: rgba(0, 240, 255, 0.12);
  border-color: var(--accent-cyan);
  transform: translateX(2px);
}

.lesson-item.active {
  background: rgba(0, 119, 255, 0.28);
  border-color: var(--accent-cyan);
  box-shadow: 0 0 8px rgba(0, 240, 255, 0.2);
}

.lesson-number {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 240, 255, 0.15);
  color: var(--accent-cyan);
  font-family: var(--font-tech);
  font-size: 0.68rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.lesson-item.completed .lesson-number {
  background: rgba(0, 255, 136, 0.2);
  color: var(--accent-green);
  border: 1px solid var(--accent-green);
}

.lesson-info {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.lesson-title-text {
  font-size: 0.76rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lesson-meta {
  font-size: 0.65rem;
  color: var(--text-muted);
  display: flex;
  gap: 6px;
  white-space: nowrap;
}

/* Right Drawer AI Mentor */
.ai-avatar-card {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 119, 255, 0.12);
  border: 1px solid rgba(0, 240, 255, 0.25);
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  overflow: hidden;
}

.ai-avatar-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--accent-cyan);
  box-shadow: var(--shadow-neon);
  background: #0d1e38;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  position: relative;
  flex-shrink: 0;
}

.ai-status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-green);
  border: 2px solid var(--bg-secondary);
}

.ai-bio {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.ai-name {
  font-family: var(--font-tech);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent-cyan);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ai-role {
  font-size: 0.65rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ai-speech-bubble {
  background: rgba(9, 18, 32, 0.95);
  border: 1px solid var(--accent-cyan);
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 8px;
  font-size: 0.76rem;
  line-height: 1.4;
  position: relative;
  word-break: break-word;
  overflow-wrap: break-word;
  overflow: hidden;
}

.quick-questions-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
}

.quick-q-btn {
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 6px;
  color: var(--text-muted);
  font-size: 0.7rem;
  padding: 5px 6px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quick-q-btn:hover {
  background: rgba(0, 240, 255, 0.2);
  color: #fff;
  border-color: var(--accent-cyan);
}

.ask-input-group {
  display: flex;
  gap: 4px;
  margin-top: 6px;
}

.ask-input {
  flex: 1;
  background: rgba(9, 18, 32, 0.85);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  padding: 5px 7px;
  font-size: 0.72rem;
  color: #fff;
  outline: none;
  min-width: 0;
}

.ask-btn {
  background: var(--accent-blue);
  border: none;
  border-radius: 6px;
  color: #fff;
  padding: 0 10px;
  cursor: pointer;
  font-size: 0.72rem;
  font-weight: 600;
  transition: background 0.2s;
  flex-shrink: 0;
  white-space: nowrap;
}

/* Top-Center Subtitle Callout */
.top-subtitle-callout {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(4, 8, 16, 0.9);
  border: 1px solid var(--border-glass);
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 0.76rem;
  color: var(--accent-cyan);
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(8px);
  pointer-events: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  max-width: 65%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  z-index: 15;
}

.top-subtitle-callout span#top-subtitle-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Subtle Keyboard Hint at Bottom-Left */
.subtle-keys-hint {
  position: absolute;
  bottom: 8px;
  left: 14px;
  background: rgba(4, 8, 16, 0.75);
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  padding: 3px 10px;
  font-size: 0.65rem;
  color: var(--text-muted);
  display: flex;
  gap: 8px;
  pointer-events: auto;
  backdrop-filter: blur(6px);
  white-space: nowrap;
}

.subtle-keys-hint kbd {
  background: rgba(0, 240, 255, 0.15);
  border: 1px solid var(--accent-cyan);
  color: var(--accent-cyan);
  padding: 1px 3px;
  border-radius: 3px;
  font-family: var(--font-tech);
}

/* ==================== BOTTOM CLINICAL TELEMETRY BAR ==================== */
.bottom-bar {
  background: linear-gradient(0deg, rgba(4, 8, 16, 0.98) 0%, rgba(4, 8, 16, 0.92) 80%, transparent 100%);
  border-top: 1px solid var(--border-glass);
  padding: 6px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  backdrop-filter: blur(12px);
  width: 100%;
  overflow: hidden;
}

.telemetry-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  flex-wrap: nowrap;
  overflow: hidden;
}

/* ECG Card */
.ecg-card {
  width: 200px;
  height: 52px;
  background: #02060c;
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-shadow: inset 0 0 10px rgba(0, 240, 255, 0.1);
}

.ecg-header-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1px 5px;
  background: rgba(0, 240, 255, 0.05);
  border-bottom: 1px solid rgba(0, 240, 255, 0.1);
  font-family: var(--font-tech);
  font-size: 0.6rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
}

.ecg-rhythm-badge {
  color: var(--accent-green);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ecg-bpm-val {
  color: var(--accent-green);
  white-space: nowrap;
  flex-shrink: 0;
}

#ecg-canvas {
  width: 100%;
  height: 36px;
}

/* Gauges Container */
.gauges-container {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
}

.gauge-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 95px;
  max-width: 130px;
  flex: 1;
  overflow: hidden;
}

.gauge-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.65rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
}

.gauge-header span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gauge-val {
  font-family: var(--font-tech);
  font-weight: 700;
  font-size: 0.78rem;
  color: #fff;
  flex-shrink: 0;
}

.gauge-track {
  width: 100%;
  height: 7px;
  background: rgba(9, 18, 32, 0.9);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.gauge-fill {
  height: 100%;
  width: 0%;
  border-radius: 3px;
  transition: width 0.12s cubic-bezier(0.1, 0.9, 0.2, 1), background-color 0.2s;
  background: var(--accent-cyan);
}

.gauge-target-zone {
  position: absolute;
  top: 0;
  height: 100%;
  background: rgba(0, 255, 136, 0.25);
  border-left: 1px dashed var(--accent-green);
  border-right: 1px dashed var(--accent-green);
  pointer-events: none;
}

.gauge-sub-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.55rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
}

.gauge-sub-row span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Feedback Status Banner (Fits perfectly in box!) */
.feedback-banner {
  flex: 1.2;
  height: 48px;
  background: rgba(9, 18, 32, 0.9);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  text-align: center;
  font-family: var(--font-tech);
  font-size: clamp(0.68rem, 0.85vw, 0.78rem);
  font-weight: 700;
  letter-spacing: 0.3px;
  color: var(--accent-cyan);
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.25;
  transition: all 0.2s ease;
  min-width: 160px;
  max-width: 320px;
}

.feedback-banner.perfect {
  color: var(--accent-green);
  border-color: var(--accent-green);
  box-shadow: var(--shadow-neon-green);
}

.feedback-banner.warning {
  color: var(--accent-amber);
  border-color: var(--accent-amber);
}

.feedback-banner.error {
  color: var(--accent-red);
  border-color: var(--accent-red);
  box-shadow: var(--shadow-neon-red);
}

/* Action Buttons Group */
.action-buttons-group {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}

.btn-cpr-compress {
  background: linear-gradient(135deg, #0077ff 0%, #00f0ff 100%);
  color: #040810;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  font-family: var(--font-tech);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.35);
  transition: all 0.12s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-cpr-compress:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 18px rgba(0, 240, 255, 0.6);
}

.btn-cpr-compress:active {
  transform: scale(0.96);
}

.btn-cpr-compress.cooldown {
  opacity: 0.65;
  filter: grayscale(0.35);
  transform: scale(0.97);
  box-shadow: 0 0 5px rgba(0, 240, 255, 0.15);
  pointer-events: none;
}

.btn-secondary-action {
  background: rgba(9, 18, 32, 0.85);
  border: 1px solid var(--border-glass);
  color: #fff;
  border-radius: 6px;
  padding: 8px 10px;
  font-family: var(--font-main);
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-secondary-action:hover {
  border-color: var(--accent-cyan);
  background: rgba(0, 240, 255, 0.15);
}

/* Telemetry Mini Counters Row */
.mini-counters-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.65rem;
  color: var(--text-muted);
  border-top: 1px solid rgba(0, 240, 255, 0.1);
  padding-top: 3px;
  gap: 8px;
  overflow: hidden;
  white-space: nowrap;
}

.counter-item {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.counter-num {
  font-family: var(--font-tech);
  color: var(--accent-cyan);
  font-weight: 700;
}

/* ==================== MODALS ==================== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(2, 5, 10, 0.88);
  backdrop-filter: blur(12px);
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-overlay.active {
  display: flex;
}

.modal-window {
  background: var(--bg-secondary);
  border: 1px solid var(--border-glass-bright);
  border-radius: 12px;
  width: 780px;
  max-width: 95vw;
  max-height: 86vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8), var(--shadow-neon);
  overflow: hidden;
  animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalPop {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.modal-header {
  padding: 12px 18px;
  border-bottom: 1px solid var(--border-glass);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(4, 8, 16, 0.6);
  flex-shrink: 0;
}

.modal-title {
  font-family: var(--font-tech);
  font-size: 1.0rem;
  color: var(--accent-cyan);
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.modal-close-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 1.3rem;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;
  flex-shrink: 0;
}
.modal-close-btn:hover {
  color: #fff;
  background: rgba(255, 51, 102, 0.25);
}

.modal-content {
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
}

.modal-footer {
  padding: 10px 18px;
  border-top: 1px solid var(--border-glass);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  background: rgba(4, 8, 16, 0.6);
  flex-shrink: 0;
}

/* Stat Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}

.stat-card {
  background: rgba(9, 18, 32, 0.75);
  border: 1px solid var(--border-glass);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow: hidden;
}

.stat-label {
  font-size: 0.68rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-value {
  font-family: var(--font-tech);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent-cyan);
  white-space: nowrap;
}

.chart-section {
  background: rgba(9, 18, 32, 0.75);
  border: 1px solid var(--border-glass);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 14px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  white-space: nowrap;
}

.chart-title {
  font-family: var(--font-tech);
  font-size: 0.8rem;
  color: #fff;
}

.chart-canvas-box {
  width: 100%;
  height: 160px;
  background: rgba(2, 6, 12, 0.85);
  border-radius: 6px;
  position: relative;
}

#analytics-chart-canvas {
  width: 100%;
  height: 100%;
}

.session-table-box {
  background: rgba(9, 18, 32, 0.75);
  border: 1px solid var(--border-glass);
  border-radius: 8px;
  padding: 12px;
  max-height: 200px;
  overflow-y: auto;
}

.table-custom {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.72rem;
}

.table-custom th {
  text-align: left;
  padding: 6px 8px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-glass);
  font-family: var(--font-tech);
  font-size: 0.65rem;
  white-space: nowrap;
}

.table-custom td {
  padding: 6px 8px;
  border-bottom: 1px solid rgba(0, 240, 255, 0.08);
  color: #fff;
  white-space: nowrap;
}

/* Printable Certificate */
.certificate-container {
  background: #ffffff;
  color: #1a202c;
  border: 10px double #0c182b;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  position: relative;
  box-shadow: 0 0 30px rgba(0,0,0,0.5);
  font-family: 'Times New Roman', serif;
}

.certificate-header {
  font-size: 1.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #0c182b;
  margin-bottom: 6px;
}

.cert-sub {
  font-size: 0.9rem;
  font-style: italic;
  color: #4a5568;
  margin-bottom: 18px;
}

.cert-name {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0056b3;
  border-bottom: 2px solid #0056b3;
  display: inline-block;
  padding: 0 30px 4px;
  margin-bottom: 14px;
  font-family: var(--font-main);
}

.cert-body {
  font-size: 0.92rem;
  line-height: 1.5;
  max-width: 560px;
  margin: 0 auto 18px;
  color: #2d3748;
}

.cert-scores {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
  font-family: var(--font-main);
  flex-wrap: wrap;
}

.cert-score-box {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 6px 12px;
}

.cert-score-box .label {
  font-size: 0.68rem;
  color: #718096;
}

.cert-score-box .val {
  font-size: 1.05rem;
  font-weight: 700;
  color: #2b6cb0;
}

.cert-signatures {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 25px;
  font-family: var(--font-main);
}

.cert-sig-line {
  border-top: 1px solid #718096;
  width: 150px;
  padding-top: 5px;
  font-size: 0.75rem;
  color: #4a5568;
}

/* Instructor Grid */
.instructor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.instructor-card {
  background: rgba(9, 18, 32, 0.75);
  border: 1px solid var(--border-glass);
  border-radius: 8px;
  padding: 12px;
  overflow: hidden;
}

.instructor-title {
  font-family: var(--font-tech);
  font-size: 0.78rem;
  color: var(--accent-cyan);
  margin-bottom: 8px;
  white-space: nowrap;
}

.rhythm-btn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.rhythm-btn {
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid var(--border-glass);
  color: #fff;
  border-radius: 6px;
  padding: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rhythm-btn:hover {
  background: rgba(0, 240, 255, 0.2);
  border-color: var(--accent-cyan);
}

.rhythm-btn.active {
  background: var(--accent-red);
  border-color: var(--accent-red);
  box-shadow: var(--shadow-neon-red);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
`;
