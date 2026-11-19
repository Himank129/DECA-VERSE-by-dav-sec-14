module.exports = `
  <!-- 2D HUD UI Overlay -->
  <div id="hud-overlay">
    <!-- Top Navigation Bar -->
    <header class="top-bar hud-interactive">
      <div class="brand-section">
        <div class="brand-logo">
          <span class="pulse-heart">&#x2764;</span>
          <span>CPR-VR</span>
        </div>
        <span class="brand-tag">SIMULATOR</span>
      </div>

      <!-- Training Mode Switcher Tabs -->
      <nav class="mode-tabs">
        <button class="mode-tab-btn active" data-mode="learning" id="tab-learning">
          <span>&#x1F4D6;</span> Learning
        </button>
        <button class="mode-tab-btn" data-mode="practice" id="tab-practice">
          <span>&#x1F3AF;</span> Practice
        </button>
        <button class="mode-tab-btn" data-mode="emergency" id="tab-emergency">
          <span>&#x1F6A8;</span> Emergency Sim
        </button>
        <button class="mode-tab-btn" data-mode="exam" id="tab-exam">
          <span>&#x1F4CB;</span> Exam
        </button>
        <button class="mode-tab-btn" data-mode="instructor" id="tab-instructor">
          <span>&#x1F468;&#x200D;&#x2695;&#xFE0F;</span> Instructor
        </button>
      </nav>

      <!-- Camera Perspective Quick Switcher -->
      <div class="camera-pills-group" title="Quick Camera Viewpoints">
        <button class="camera-pill-btn active" data-cam="bedside" id="cam-bedside">POV</button>
        <button class="camera-pill-btn" data-cam="topdown" id="cam-topdown">Top</button>
        <button class="camera-pill-btn" data-cam="wide" id="cam-wide">Wide</button>
        <button class="camera-pill-btn" data-cam="monitor" id="cam-monitor">ECG</button>
      </div>

      <!-- Controls & Selectors -->
      <div class="top-controls">
        <div class="selector-group" title="Switch 3D Medical Environment">
          <span class="selector-label">Env:</span>
          <select id="select-env" class="custom-select">
            <option value="er">ER Bay</option>
            <option value="icu">ICU</option>
            <option value="ambulance">Ambulance</option>
            <option value="lab">Lab</option>
          </select>
        </div>

        <div class="selector-group" title="Select Patient Age Category">
          <span class="selector-label">Patient:</span>
          <select id="select-patient" class="custom-select">
            <option value="adult">Adult (5-6cm)</option>
            <option value="child">Child (5cm)</option>
            <option value="infant">Infant (4cm)</option>
          </select>
        </div>

        <button class="icon-btn active" id="btn-toggle-metro" title="Toggle CPR Metronome (110 BPM) [M]">&#x23F1;&#xFE0F;</button>
        <button class="icon-btn active" id="btn-toggle-audio" title="Toggle Sound Engine">&#x1F50A;</button>
        <button class="icon-btn" id="btn-open-dashboard" title="Student Analytics & Records [Tab]">&#x1F4CA;</button>
        <button class="icon-btn" id="btn-open-settings" title="Settings">&#x2699;&#xFE0F;</button>
        <button class="icon-btn" id="btn-open-help" title="Controls & Help">&#x2753;</button>

        <div class="badge-pill" id="badge-platform-status">
          <span class="dot"></span>
          <span id="platform-status-text">Desktop Mode</span>
        </div>
      </div>
    </header>

    <!-- Main Viewport Area (Clean & Cinematic with On-Demand Sliding Drawers) -->
    <div class="main-hud-area">
      <!-- Edge Drawer Toggle Buttons -->
      <button class="drawer-toggle-btn left hud-interactive" id="btn-open-left-drawer" title="Toggle Curriculum Drawer">
        <span>&#x1F4D1;</span> Lessons (14)
      </button>

      <button class="drawer-toggle-btn right hud-interactive" id="btn-open-right-drawer" title="Toggle AI Medical Mentor Drawer">
        <span>&#x1FA7A;</span> Dr. Avery, MD
      </button>

      <!-- Top-Center Clinical Subtitle Callout (Non-intrusive) -->
      <div class="top-subtitle-callout" id="top-subtitle-callout">
        <span>&#x1FA7A;</span>
        <span id="top-subtitle-text">Dr. Avery: Maintain 100-120 BPM and allow full chest recoil between compressions.</span>
      </div>

      <!-- Subtle Keyboard Guide (Bottom-Left, out of the way) -->
      <div class="subtle-keys-hint hud-interactive" id="desktop-controls-hint">
        <span><kbd>SPACE / E</kbd> Compress</span>
        <span><kbd>B</kbd> Ventilate</span>
        <span><kbd>WASD</kbd> Walk</span>
        <span><kbd>Mouse</kbd> Look</span>
        <span><kbd>M</kbd> Metronome</span>
        <span><kbd>Tab</kbd> Dashboard</span>
      </div>

      <!-- Left Slide Drawer: Guided Lessons (Collapsed by default!) -->
      <aside class="slide-drawer left hud-interactive" id="left-drawer">
        <div class="drawer-header">
          <div class="drawer-title">
            <span>&#x1F4D1;</span>
            <span>GUIDED CURRICULUM</span>
          </div>
          <button class="icon-btn" style="width:26px; height:26px;" id="btn-close-left-drawer" title="Close Drawer">&times;</button>
        </div>
        <div class="drawer-body">
          <div class="lesson-list" id="curriculum-list">
            <!-- 14 Lessons dynamically rendered here -->
          </div>
        </div>
      </aside>

      <!-- Right Slide Drawer: AI Medical Instructor (Collapsed by default!) -->
      <aside class="slide-drawer right hud-interactive" id="right-drawer">
        <div class="drawer-header">
          <div class="drawer-title">
            <span>&#x1FA7A;</span>
            <span>AI MEDICAL INSTRUCTOR</span>
          </div>
          <button class="icon-btn" style="width:26px; height:26px;" id="btn-close-right-drawer" title="Close Drawer">&times;</button>
        </div>
        <div class="drawer-body">
          <div class="ai-avatar-card">
            <div class="ai-avatar-img">
              &#x1F468;&#x200D;&#x2695;&#xFE0F;
              <span class="ai-status-indicator"></span>
            </div>
            <div class="ai-bio">
              <div class="ai-name">Dr. Avery, MD</div>
              <div class="ai-role">Chief Clinical Resuscitation Mentor</div>
            </div>
          </div>

          <div class="ai-speech-bubble">
            <div id="ai-dialogue-text">
              "Welcome to CPR-VR. Keep your arms straight and lock your elbows. Press down 5 to 6 cm on the center of the chest."
            </div>
          </div>

          <div style="font-size:0.7rem; color:var(--text-muted); font-family:var(--font-tech); margin-top:8px;">
            CLINICAL KNOWLEDGE BASE
          </div>
          <div class="quick-questions-box">
            <button class="quick-q-btn" data-q="What is the target compression depth for an adult?">&#x1F50D; Adult compression depth?</button>
            <button class="quick-q-btn" data-q="Why is complete chest recoil so critical?">&#x1F50D; Why is complete recoil critical?</button>
            <button class="quick-q-btn" data-q="How do I position my hands on the chest?">&#x1F50D; Hand placement landmarks?</button>
            <button class="quick-q-btn" data-q="When should I use the AED?">&#x1F50D; When to apply and shock with AED?</button>
          </div>

          <div class="ask-input-group">
            <input type="text" id="input-ask-doctor" class="ask-input" placeholder="Ask Dr. Avery a medical question..." />
            <button class="ask-btn" id="btn-ask-doctor">Ask</button>
          </div>
        </div>
      </aside>
    </div>

    <!-- Bottom Telemetry & Controls Bar (Clean Clinical Layout) -->
    <footer class="bottom-bar hud-interactive">
      <div class="telemetry-strip">
        <!-- Live ECG Monitor Widget -->
        <div class="ecg-card" id="widget-ecg" title="Dynamic ECG Lead II Telemetry">
          <div class="ecg-header-strip">
            <span class="ecg-rhythm-badge" id="ecg-rhythm-badge">LEAD II - NSR</span>
            <span class="ecg-bpm-val" id="ecg-hr-display">72 BPM</span>
          </div>
          <canvas id="ecg-canvas" width="250" height="42"></canvas>
        </div>

        <!-- Real-Time CPR Gauges -->
        <div class="gauges-container">
          <!-- Compression Depth Gauge -->
          <div class="gauge-block">
            <div class="gauge-header">
              <span>DEPTH</span>
              <span class="gauge-val" id="val-depth">0.0 cm</span>
            </div>
            <div class="gauge-track">
              <div class="gauge-target-zone" id="zone-depth" style="left: 71%; width: 15%;"></div>
              <div class="gauge-fill" id="fill-depth"></div>
            </div>
            <div class="gauge-sub-row">
              <span>0 cm</span>
              <span id="depth-target-text" style="color:var(--accent-green); font-weight:700;">5.0-6.0cm</span>
              <span>7 cm</span>
            </div>
          </div>

          <!-- Compression Rate Gauge -->
          <div class="gauge-block">
            <div class="gauge-header">
              <span>RATE</span>
              <span class="gauge-val" id="val-rate">0 BPM</span>
            </div>
            <div class="gauge-track">
              <div class="gauge-target-zone" id="zone-rate" style="left: 62.5%; width: 12.5%;"></div>
              <div class="gauge-fill" id="fill-rate"></div>
            </div>
            <div class="gauge-sub-row">
              <span>0</span>
              <span style="color:var(--accent-green); font-weight:700;">100-120</span>
              <span>160</span>
            </div>
          </div>

          <!-- Recoil Quality Gauge -->
          <div class="gauge-block">
            <div class="gauge-header">
              <span>RECOIL</span>
              <span class="gauge-val" id="val-recoil">100%</span>
            </div>
            <div class="gauge-track">
              <div class="gauge-fill" id="fill-recoil" style="width:100%; background:var(--accent-green);"></div>
            </div>
            <div class="gauge-sub-row">
              <span>Lean</span>
              <span style="color:var(--accent-green); font-weight:700;">Full</span>
            </div>
          </div>

          <!-- Placement Landmark Accuracy -->
          <div class="gauge-block">
            <div class="gauge-header">
              <span>LANDMARK</span>
              <span class="gauge-val" id="val-placement">Optimal</span>
            </div>
            <div class="gauge-track">
              <div class="gauge-fill" id="fill-placement" style="width:100%; background:var(--accent-green);"></div>
            </div>
            <div class="gauge-sub-row">
              <span>Off</span>
              <span style="color:var(--accent-green); font-weight:700;">Center</span>
            </div>
          </div>
        </div>

        <!-- Live Real-Time Clinical Feedback Banner (Single clear horizontal banner) -->
        <div class="feedback-banner" id="banner-feedback">
          READY FOR COMPRESSIONS
        </div>

        <!-- Interactive Direct Action Buttons -->
        <div class="action-buttons-group">
          <button class="btn-cpr-compress" id="btn-compress" title="Deliver Simulated Chest Compression [SPACE / E]">
            <span>&#x26A1;</span> COMPRESS
          </button>
          <button class="btn-secondary-action" id="btn-ventilate" title="Deliver Rescue Breaths [B]">
            <span>&#x1F4A8;</span> BREATHE
          </button>
          <button class="btn-secondary-action" id="btn-aed-power" title="Operate Automated External Defibrillator">
            <span>&#x26A1;</span> AED
          </button>
        </div>
      </div>

      <!-- Mini Telemetry Counters Strip -->
      <div class="mini-counters-row">
        <div class="counter-item">
          <span>Comp:</span>
          <span class="counter-num" id="stat-total-compressions">0</span>
        </div>
        <div class="counter-item">
          <span>Cycle:</span>
          <span class="counter-num" id="stat-cycle-count">0 / 30</span>
        </div>
        <div class="counter-item">
          <span>CCF:</span>
          <span class="counter-num" id="stat-ccf">100%</span>
        </div>
        <div class="counter-item">
          <span>Time:</span>
          <span class="counter-num" id="stat-session-timer">00:00</span>
        </div>
        <div class="counter-item">
          <span>Guideline:</span>
          <span class="counter-num" id="stat-guideline-badge">AHA 2020-2025</span>
        </div>
      </div>
    </footer>
  </div>

  <!-- ==================== MODALS ==================== -->
  <!-- Modal 1: Analytics & Student Records Dashboard -->
  <div class="modal-overlay" id="modal-dashboard">
    <div class="modal-window">
      <div class="modal-header">
        <div class="modal-title">
          <span>&#x1F4CA;</span>
          <span>STUDENT PERFORMANCE DASHBOARD</span>
        </div>
        <button class="modal-close-btn" data-close="modal-dashboard">&times;</button>
      </div>
      <div class="modal-content">
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-label">Total Training Sessions</span>
            <span class="stat-value" id="dash-total-sessions">0</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Total Compressions</span>
            <span class="stat-value" id="dash-total-compressions">0</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Average CPR Rate</span>
            <span class="stat-value" id="dash-avg-rate">0 BPM</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Target Depth Accuracy</span>
            <span class="stat-value" id="dash-depth-acc">0%</span>
          </div>
        </div>

        <div class="chart-section">
          <div class="chart-header">
            <span class="chart-title">Real-Time CPR Depth & Rhythm Waveform</span>
            <span style="font-size:0.7rem; color:var(--accent-cyan);">AHA Target: 5.0 - 6.0 cm</span>
          </div>
          <div class="chart-canvas-box">
            <canvas id="analytics-chart-canvas" width="760" height="180"></canvas>
          </div>
        </div>

        <div class="session-table-box">
          <div style="font-family:var(--font-tech); font-size:0.8rem; color:var(--accent-cyan); margin-bottom:8px;">
            TRAINING SESSION LOGS
          </div>
          <table class="table-custom">
            <thead>
              <tr>
                <th>Date / Time</th>
                <th>Mode</th>
                <th>Patient</th>
                <th>Count</th>
                <th>Avg Rate</th>
                <th>Avg Depth</th>
                <th>Recoil</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody id="dash-history-tbody"></tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-secondary-action" id="btn-export-csv">&#x1F4BE; Export CSV Report</button>
        <button class="btn-secondary-action" id="btn-clear-history" style="color:var(--accent-red); border-color:var(--accent-red);">&#x1F5D1;&#xFE0F; Reset Records</button>
        <button class="btn-cpr-compress" data-close="modal-dashboard">Close</button>
      </div>
    </div>
  </div>

  <!-- Modal 2: 14 Guided Lessons Curriculum -->
  <div class="modal-overlay" id="modal-lessons">
    <div class="modal-window">
      <div class="modal-header">
        <div class="modal-title">
          <span>&#x1F4D6;</span>
          <span id="lesson-modal-title">LESSON DETAILS</span>
        </div>
        <button class="modal-close-btn" data-close="modal-lessons">&times;</button>
      </div>
      <div class="modal-content">
        <div id="lesson-modal-body"></div>
      </div>
      <div class="modal-footer">
        <button class="btn-secondary-action" id="btn-prev-lesson">&#x25C0; Previous</button>
        <button class="btn-cpr-compress" id="btn-start-lesson-practice">Start Interactive Practice &#x25B6;</button>
        <button class="btn-secondary-action" id="btn-next-lesson">Next &#x25B6;</button>
      </div>
    </div>
  </div>

  <!-- Modal 3: Emergency Scenarios Selector -->
  <div class="modal-overlay" id="modal-scenarios">
    <div class="modal-window">
      <div class="modal-header">
        <div class="modal-title">
          <span>&#x1F6A8;</span>
          <span>SELECT EMERGENCY SIMULATION SCENARIO</span>
        </div>
        <button class="modal-close-btn" data-close="modal-scenarios">&times;</button>
      </div>
      <div class="modal-content">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;" id="scenarios-grid"></div>
      </div>
      <div class="modal-footer">
        <button class="btn-cpr-compress" data-close="modal-scenarios">Close</button>
      </div>
    </div>
  </div>

  <!-- Modal 4: Examination Mode Report & Certificate -->
  <div class="modal-overlay" id="modal-exam">
    <div class="modal-window">
      <div class="modal-header">
        <div class="modal-title">
          <span>&#x1F3C6;</span>
          <span>CPR-VR CLINICAL SKILLS ASSESSMENT REPORT</span>
        </div>
        <button class="modal-close-btn" data-close="modal-exam">&times;</button>
      </div>
      <div class="modal-content">
        <div class="certificate-container" id="printable-certificate">
          <div class="certificate-header">CPR-VR CERTIFICATE OF TRAINING</div>
          <div class="cert-sub">International Resuscitation Simulation Competency Assessment</div>
          <div class="cert-name" id="cert-student-name">Student Trainee</div>
          <p class="cert-body">
            Has successfully completed the comprehensive high-fidelity <strong>Virtual Reality Cardiopulmonary Resuscitation (CPR)</strong> clinical assessment program conforming to 2020-2025 International Consensus on CPR Science and Emergency Cardiovascular Care.
          </p>

          <div class="cert-scores">
            <div class="cert-score-box">
              <div class="label">Overall Score</div>
              <div class="val" id="cert-score-val">96%</div>
            </div>
            <div class="cert-score-box">
              <div class="label">Clinical Grade</div>
              <div class="val" id="cert-grade-val">Grade A</div>
            </div>
            <div class="cert-score-box">
              <div class="label">Rate Accuracy</div>
              <div class="val" id="cert-rate-val">112 BPM</div>
            </div>
            <div class="cert-score-box">
              <div class="label">Depth Accuracy</div>
              <div class="val" id="cert-depth-val">5.4 cm</div>
            </div>
            <div class="cert-score-box">
              <div class="label">CCF %</div>
              <div class="val" id="cert-ccf-val">89%</div>
            </div>
          </div>

          <div class="cert-signatures">
            <div class="cert-sig-line">
              <strong>Dr. Avery, MD</strong><br>
              Chief Clinical Resuscitation Mentor
            </div>
            <div class="cert-sig-line">
              <strong id="cert-date-text">November 2026</strong><br>
              Verification Date & System Record
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <input type="text" id="input-cert-name" class="ask-input" style="max-width:240px;" placeholder="Enter Your Full Name..." value="Medical Trainee" />
        <button class="btn-secondary-action" id="btn-update-cert-name">Update Name</button>
        <button class="btn-cpr-compress" id="btn-print-cert">&#x1F5A8;&#xFE0F; Print / Save PDF Certificate</button>
      </div>
    </div>
  </div>

  <!-- Modal 5: Mode 5 Instructor Control Station -->
  <div class="modal-overlay" id="modal-instructor">
    <div class="modal-window">
      <div class="modal-header">
        <div class="modal-title">
          <span>&#x1F468;&#x200D;&#x2695;&#xFE0F;</span>
          <span>INSTRUCTOR CONTROL STATION & SIMULATION INJECTOR</span>
        </div>
        <button class="modal-close-btn" data-close="modal-instructor">&times;</button>
      </div>
      <div class="modal-content">
        <div class="instructor-grid">
          <div class="instructor-card">
            <div class="instructor-title">&#x26A1; INJECT CARDIAC RHYTHM</div>
            <div class="rhythm-btn-grid">
              <button class="rhythm-btn" data-rhythm="nsr">&#x2764;&#xFE0F; Normal Sinus (NSR)</button>
              <button class="rhythm-btn active" data-rhythm="vf">&#x26A1; Ventricular Fibrillation (VF)</button>
              <button class="rhythm-btn" data-rhythm="vt">&#x26A0;&#xFE0F; Pulseless V-Tach (VT)</button>
              <button class="rhythm-btn" data-rhythm="asystole">&#x2014; Asystole (Flatline)</button>
              <button class="rhythm-btn" data-rhythm="pea">&#x1F4C9; PEA Rhythm</button>
              <button class="rhythm-btn" data-rhythm="rosc">&#x1F31F; Return of Circulation (ROSC)</button>
            </div>
          </div>

          <div class="instructor-card">
            <div class="instructor-title">&#x26A0;&#xFE0F; INJECT COMPLICATION</div>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <button class="rhythm-btn" id="btn-trigger-vomit">&#x1F922; Airway Obstruction / Emesis</button>
              <button class="rhythm-btn" id="btn-trigger-pad-loose">&#x1FA79; AED Pad Detached</button>
              <button class="rhythm-btn" id="btn-trigger-fatigue">&#x1F635; Rescuer Fatigue Prompt</button>
              <button class="rhythm-btn" id="btn-trigger-gasp">&#x1F62E;&#x200D;&#x1F4A8; Agonal Gasping</button>
            </div>
          </div>

          <div class="instructor-card" style="grid-column: 1 / -1;">
            <div class="instructor-title">&#x1F4CA; LIVE STUDENT EVALUATION FEED</div>
            <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:8px;">
              <span>Student Live Telemetry: <strong style="color:var(--accent-green);" id="inst-live-status">Active Compressing</strong></span>
              <span>Procedural Compliance: <strong style="color:var(--accent-cyan);" id="inst-live-compliance">94%</strong></span>
            </div>
            <textarea id="instructor-notes" class="ask-input" style="width:100%; height:60px; resize:none;" placeholder="Enter clinical evaluation notes..."></textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-cpr-compress" data-close="modal-instructor">Return to Simulation</button>
      </div>
    </div>
  </div>

  <!-- Modal 6: Application Settings -->
  <div class="modal-overlay" id="modal-settings">
    <div class="modal-window" style="max-width:600px;">
      <div class="modal-header">
        <div class="modal-title">
          <span>&#x2699;&#xFE0F;</span>
          <span>SIMULATION SETTINGS</span>
        </div>
        <button class="modal-close-btn" data-close="modal-settings">&times;</button>
      </div>
      <div class="modal-content">
        <div style="display:flex; flex-direction:column; gap:14px;">
          <div class="selector-group" style="justify-content:space-between; padding:8px 12px;">
            <span class="selector-label">Resuscitation Guideline:</span>
            <select id="setting-guideline" class="custom-select">
              <option value="aha">AHA 2020-2025 Guidelines</option>
              <option value="erc">ERC 2021-2025 Guidelines</option>
            </select>
          </div>

          <div class="selector-group" style="justify-content:space-between; padding:8px 12px;">
            <span class="selector-label">Metronome Cadence:</span>
            <select id="setting-metro-bpm" class="custom-select">
              <option value="110">110 BPM (Optimal Target)</option>
              <option value="100">100 BPM (Lower Bound)</option>
              <option value="120">120 BPM (Upper Bound)</option>
            </select>
          </div>

          <div style="background:rgba(9,18,32,0.7); border:1px solid var(--border-glass); border-radius:8px; padding:12px;">
            <div style="font-family:var(--font-tech); font-size:0.75rem; color:var(--accent-cyan); margin-bottom:8px;">
              AUDIO ENGINE MIXER
            </div>
            <div style="display:flex; flex-direction:column; gap:8px; font-size:0.75rem;">
              <div style="display:flex; justify-content:space-between;">
                <span>Instructor Voice Volume</span>
                <input type="range" id="vol-voice" min="0" max="100" value="90">
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span>ECG Monitor Beeps</span>
                <input type="range" id="vol-ecg" min="0" max="100" value="70">
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span>AED Prompts & Alarms</span>
                <input type="range" id="vol-aed" min="0" max="100" value="85">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-cpr-compress" data-close="modal-settings">Save & Close</button>
      </div>
    </div>
  </div>

  <!-- Modal 7: Controls & Hardware Guide -->
  <div class="modal-overlay" id="modal-controls">
    <div class="modal-window" style="max-width:680px;">
      <div class="modal-header">
        <div class="modal-title">
          <span>&#x1F3AE;</span>
          <span>HARDWARE & CONTROLS GUIDE</span>
        </div>
        <button class="modal-close-btn" data-close="modal-controls">&times;</button>
      </div>
      <div class="modal-content">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
          <div class="stat-card">
            <div style="font-family:var(--font-tech); font-size:0.82rem; color:var(--accent-cyan); margin-bottom:6px;">
              &#x1F97D; META QUEST 3S VR
            </div>
            <ul style="font-size:0.76rem; line-height:1.6; color:#e2e8f0; padding-left:16px;">
              <li><strong>Trigger:</strong> Squeeze controller over chest to compress (haptic pulse).</li>
              <li><strong>Grip:</strong> Grab and place AED electrode pads.</li>
              <li><strong>Laser:</strong> Point and click menus and buttons.</li>
              <li><strong>Chin:</strong> Click to perform Head-Tilt Chin-Lift.</li>
            </ul>
          </div>

          <div class="stat-card">
            <div style="font-family:var(--font-tech); font-size:0.82rem; color:var(--accent-cyan); margin-bottom:6px;">
              &#x1F5A5;&#xFE0F; WINDOWS DESKTOP
            </div>
            <ul style="font-size:0.76rem; line-height:1.6; color:#e2e8f0; padding-left:16px;">
              <li><kbd>SPACE</kbd> or <kbd>E</kbd>: Deliver chest compression.</li>
              <li><kbd>WASD</kbd>: Walk around the room.</li>
              <li><kbd>Mouse Drag</kbd>: Look around 360°.</li>
              <li><kbd>B</kbd>: Deliver rescue breaths.</li>
              <li><kbd>M</kbd>: Toggle 110 BPM Metronome.</li>
              <li><kbd>Tab</kbd>: Open Analytics Dashboard.</li>
              <li><kbd>1 - 4</kbd>: Switch environments.</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-cpr-compress" data-close="modal-controls">Got It</button>
      </div>
    </div>
  </div>
`;
