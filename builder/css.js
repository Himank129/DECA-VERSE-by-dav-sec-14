module.exports = `
:root {
  --bg-primary: #040810;
  --bg-secondary: #091220;
  --bg-card: rgba(10, 20, 38, 0.88);
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
  padding: 8px 18px;
  background: linear-gradient(180deg, rgba(4, 8, 16, 0.95) 0%, rgba(4, 8, 16, 0.75) 80%, transparent 100%);
  border-bottom: 1px solid var(--border-glass);
  backdrop-filter: blur(8px);
  gap: 12px;
}

.brand-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-tech);
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #fff;
  text-shadow: 0 0 10px var(--accent-cyan);
}

.brand-logo .pulse-heart {
  color: var(--accent-red);
  font-size: 1.4rem;
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
  font-size: 0.65rem;
  background: rgba(0, 240, 255, 0.12);
  border: 1px solid var(--accent-cyan);
  color: var(--accent-cyan);
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: var(--font-tech);
}

/* Mode Switcher Tabs */
.mode-tabs {
  display: flex;
  background: rgba(9, 18, 32, 0.85);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  padding: 3px;
  gap: 3px;
}

.mode-tab-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-family: var(--font-main);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;
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

/* Selectors and Controls */
.top-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.selector-group {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(9, 18, 32, 0.85);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  padding: 3px 8px;
}

.selector-label {
  font-size: 0.68rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: var(--font-tech);
}

.custom-select {
  background: transparent;
  border: none;
  color: var(--accent-cyan);
  font-family: var(--font-main);
  font-size: 0.78rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
}

.custom-select option {
  background: var(--bg-secondary);
  color: #fff;
}

.icon-btn {
  background: rgba(9, 18, 32, 0.85);
  border: 1px solid var(--border-glass);
  color: var(--text-main);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
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

/* Camera Perspective Switcher Buttons */
.camera-pills-group {
  display: flex;
  background: rgba(9, 18, 32, 0.85);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  padding: 2px;
  gap: 2px;
}

.camera-pill-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-family: var(--font-tech);
  font-size: 0.68rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.camera-pill-btn:hover {
  color: #fff;
}

.camera-pill-btn.active {
  background: rgba(0, 240, 255, 0.25);
  color: var(--accent-cyan);
}

.badge-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid var(--accent-green);
  color: var(--accent-green);
  font-size: 0.68rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 20px;
}

.badge-pill .dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent-green);
  box-shadow: 0 0 6px var(--accent-green);
  animation: blinkDot 1.5s infinite;
}

@keyframes blinkDot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* ==================== CLEAN VIEWPORT & FLOATING TABS ==================== */
.main-hud-area {
  flex: 1;
  position: relative;
  overflow: hidden;
  pointer-events: none;
}

/* Floating Edge Drawer Toggle Buttons */
.drawer-toggle-btn {
  position: absolute;
  top: 18px;
  background: rgba(9, 18, 32, 0.9);
  border: 1px solid var(--border-glass);
  color: #fff;
  border-radius: 6px;
  padding: 8px 12px;
  font-family: var(--font-tech);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.5);
  transition: all 0.2s ease;
  pointer-events: auto;
  z-index: 20;
}

.drawer-toggle-btn:hover {
  border-color: var(--accent-cyan);
  background: rgba(0, 240, 255, 0.15);
  box-shadow: var(--shadow-neon);
}

.drawer-toggle-btn.left {
  left: 18px;
}

.drawer-toggle-btn.right {
  right: 18px;
}

/* Sliding Drawer Panels (Collapsed by default!) */
.slide-drawer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 320px;
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  backdrop-filter: blur(16px);
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: auto;
  z-index: 30;
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
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-glass);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(4, 8, 16, 0.6);
}

.drawer-title {
  font-family: var(--font-tech);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--accent-cyan);
  display: flex;
  align-items: center;
  gap: 8px;
}

.drawer-body {
  padding: 12px;
  overflow-y: auto;
  flex: 1;
}

.drawer-body::-webkit-scrollbar {
  width: 4px;
}
.drawer-body::-webkit-scrollbar-thumb {
  background: var(--border-glass);
  border-radius: 4px;
}

/* Lessons List inside Left Drawer */
.lesson-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.lesson-item {
  background: rgba(9, 18, 32, 0.7);
  border: 1px solid rgba(0, 240, 255, 0.1);
  border-radius: 6px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lesson-item:hover {
  background: rgba(0, 240, 255, 0.12);
  border-color: var(--accent-cyan);
  transform: translateX(3px);
}

.lesson-item.active {
  background: rgba(0, 119, 255, 0.28);
  border-color: var(--accent-cyan);
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
}

.lesson-number {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(0, 240, 255, 0.15);
  color: var(--accent-cyan);
  font-family: var(--font-tech);
  font-size: 0.7rem;
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
}

.lesson-title-text {
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lesson-meta {
  font-size: 0.68rem;
  color: var(--text-muted);
  display: flex;
  gap: 8px;
}

/* Right Drawer: AI Medical Instructor (Dr. Avery) */
.ai-avatar-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 119, 255, 0.12);
  border: 1px solid rgba(0, 240, 255, 0.25);
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 10px;
}

.ai-avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--accent-cyan);
  box-shadow: var(--shadow-neon);
  background: #0d1e38;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  position: relative;
}

.ai-status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--accent-green);
  border: 2px solid var(--bg-secondary);
}

.ai-bio {
  flex: 1;
}

.ai-name {
  font-family: var(--font-tech);
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--accent-cyan);
}

.ai-role {
  font-size: 0.68rem;
  color: var(--text-muted);
}

.ai-speech-bubble {
  background: rgba(9, 18, 32, 0.95);
  border: 1px solid var(--accent-cyan);
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 10px;
  font-size: 0.8rem;
  line-height: 1.4;
  position: relative;
}

.quick-questions-box {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 8px;
}

.quick-q-btn {
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 6px;
  color: var(--text-muted);
  font-size: 0.72rem;
  padding: 6px 8px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-q-btn:hover {
  background: rgba(0, 240, 255, 0.2);
  color: #fff;
  border-color: var(--accent-cyan);
}

.ask-input-group {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}

.ask-input {
  flex: 1;
  background: rgba(9, 18, 32, 0.85);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 0.75rem;
  color: #fff;
  outline: none;
}

.ask-btn {
  background: var(--accent-blue);
  border: none;
  border-radius: 6px;
  color: #fff;
  padding: 0 12px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: background 0.2s;
}

/* Subtle Top-Center Clinical Subtitle Callout */
.top-subtitle-callout {
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(4, 8, 16, 0.88);
  border: 1px solid var(--border-glass);
  border-radius: 20px;
  padding: 6px 18px;
  font-size: 0.8rem;
  color: var(--accent-cyan);
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(8px);
  pointer-events: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  max-width: 650px;
  text-align: center;
  transition: opacity 0.3s ease;
}

/* Subtle Keyboard Hint at Top-Right of Main Area */
.subtle-keys-hint {
  position: absolute;
  bottom: 12px;
  left: 18px;
  background: rgba(4, 8, 16, 0.75);
  border: 1px solid var(--border-glass);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.68rem;
  color: var(--text-muted);
  display: flex;
  gap: 10px;
  pointer-events: auto;
  backdrop-filter: blur(6px);
}

.subtle-keys-hint kbd {
  background: rgba(0, 240, 255, 0.15);
  border: 1px solid var(--accent-cyan);
  color: var(--accent-cyan);
  padding: 1px 4px;
  border-radius: 3px;
  font-family: var(--font-tech);
}

/* ==================== BOTTOM CLINICAL TELEMETRY BAR ==================== */
.bottom-bar {
  background: linear-gradient(0deg, rgba(4, 8, 16, 0.98) 0%, rgba(4, 8, 16, 0.9) 80%, transparent 100%);
  border-top: 1px solid var(--border-glass);
  padding: 10px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  backdrop-filter: blur(12px);
}

.telemetry-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

/* ECG Monitor Box (Clean Layout, No Text Overlap!) */
.ecg-card {
  width: 250px;
  height: 60px;
  background: #02060c;
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 10px rgba(0, 240, 255, 0.1);
}

.ecg-header-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 6px;
  background: rgba(0, 240, 255, 0.05);
  border-bottom: 1px solid rgba(0, 240, 255, 0.1);
  font-family: var(--font-tech);
  font-size: 0.65rem;
  font-weight: 700;
}

.ecg-rhythm-badge {
  color: var(--accent-green);
}

.ecg-bpm-val {
  color: var(--accent-green);
}

#ecg-canvas {
  width: 100%;
  height: 42px;
}

/* Gauges Container */
.gauges-container {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: center;
}

.gauge-block {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 130px;
}

.gauge-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: var(--text-muted);
}

.gauge-val {
  font-family: var(--font-tech);
  font-weight: 700;
  font-size: 0.82rem;
  color: #fff;
}

.gauge-track {
  width: 100%;
  height: 8px;
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

/* Feedback Status Banner (Single-line, prominent, clear) */
.feedback-banner {
  flex: 1.1;
  height: 52px;
  background: rgba(9, 18, 32, 0.9);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  text-align: center;
  font-family: var(--font-tech);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--accent-cyan);
  transition: all 0.2s ease;
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
  gap: 8px;
}

.btn-cpr-compress {
  background: linear-gradient(135deg, #0077ff 0%, #00f0ff 100%);
  color: #040810;
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  font-family: var(--font-tech);
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.35);
  transition: all 0.15s ease;
}

.btn-cpr-compress:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.6);
}

.btn-cpr-compress:active {
  transform: scale(0.96);
}

.btn-cpr-compress.cooldown {
  opacity: 0.6;
  filter: grayscale(0.4);
  transform: scale(0.97);
  box-shadow: 0 0 5px rgba(0, 240, 255, 0.15);
  pointer-events: none;
}

.btn-secondary-action {
  background: rgba(9, 18, 32, 0.85);
  border: 1px solid var(--border-glass);
  color: #fff;
  border-radius: 6px;
  padding: 9px 12px;
  font-family: var(--font-main);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
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
  font-size: 0.7rem;
  color: var(--text-muted);
  border-top: 1px solid rgba(0, 240, 255, 0.1);
  padding-top: 4px;
}

.counter-item {
  display: flex;
  align-items: center;
  gap: 5px;
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
  width: 820px;
  max-width: 95vw;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8), var(--shadow-neon);
  overflow: hidden;
  animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalPop {
  0% { transform: scale(0.94); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.modal-header {
  padding: 14px 20px;
  border-bottom: 1px solid var(--border-glass);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(4, 8, 16, 0.6);
}

.modal-title {
  font-family: var(--font-tech);
  font-size: 1.05rem;
  color: var(--accent-cyan);
  display: flex;
  align-items: center;
  gap: 8px;
}

.modal-close-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 1.4rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;
}
.modal-close-btn:hover {
  color: #fff;
  background: rgba(255, 51, 102, 0.25);
}

.modal-content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: 12px 20px;
  border-top: 1px solid var(--border-glass);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  background: rgba(4, 8, 16, 0.6);
}

/* Stat Cards & Tables inside Modals */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 18px;
}

.stat-card {
  background: rgba(9, 18, 32, 0.75);
  border: 1px solid var(--border-glass);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-family: var(--font-tech);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--accent-cyan);
}

.chart-section {
  background: rgba(9, 18, 32, 0.75);
  border: 1px solid var(--border-glass);
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 18px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.chart-title {
  font-family: var(--font-tech);
  font-size: 0.82rem;
  color: #fff;
}

.chart-canvas-box {
  width: 100%;
  height: 180px;
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
  padding: 14px;
  max-height: 240px;
  overflow-y: auto;
}

.table-custom {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;
}

.table-custom th {
  text-align: left;
  padding: 8px 10px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-glass);
  font-family: var(--font-tech);
  font-size: 0.68rem;
}

.table-custom td {
  padding: 8px 10px;
  border-bottom: 1px solid rgba(0, 240, 255, 0.08);
  color: #fff;
}

/* Printable Certificate Styles */
.certificate-container {
  background: #ffffff;
  color: #1a202c;
  border: 10px double #0c182b;
  padding: 35px;
  border-radius: 8px;
  text-align: center;
  position: relative;
  box-shadow: 0 0 30px rgba(0,0,0,0.5);
  font-family: 'Times New Roman', serif;
}

.certificate-header {
  font-size: 1.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #0c182b;
  margin-bottom: 8px;
}

.cert-sub {
  font-size: 0.95rem;
  font-style: italic;
  color: #4a5568;
  margin-bottom: 20px;
}

.cert-name {
  font-size: 1.7rem;
  font-weight: 700;
  color: #0056b3;
  border-bottom: 2px solid #0056b3;
  display: inline-block;
  padding: 0 35px 5px;
  margin-bottom: 16px;
  font-family: var(--font-main);
}

.cert-body {
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 580px;
  margin: 0 auto 22px;
  color: #2d3748;
}

.cert-scores {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 22px;
  font-family: var(--font-main);
}

.cert-score-box {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 6px 14px;
}

.cert-score-box .label {
  font-size: 0.7rem;
  color: #718096;
}

.cert-score-box .val {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2b6cb0;
}

.cert-signatures {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  padding: 0 30px;
  font-family: var(--font-main);
}

.cert-sig-line {
  border-top: 1px solid #718096;
  width: 160px;
  padding-top: 6px;
  font-size: 0.78rem;
  color: #4a5568;
}

/* Mode 5 Instructor Control Station */
.instructor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.instructor-card {
  background: rgba(9, 18, 32, 0.75);
  border: 1px solid var(--border-glass);
  border-radius: 8px;
  padding: 14px;
}

.instructor-title {
  font-family: var(--font-tech);
  font-size: 0.82rem;
  color: var(--accent-cyan);
  margin-bottom: 10px;
}

.rhythm-btn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.rhythm-btn {
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid var(--border-glass);
  color: #fff;
  border-radius: 6px;
  padding: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
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
  .telemetry-strip {
    flex-wrap: wrap;
  }
}
`;
