module.exports = `
// =========================================================================
// CPR-VR APPLICATION ARCHITECTURE & JAVASCRIPT ENGINE (CLEAN & OPTIMIZED)
// =========================================================================

// 1. CLINICAL CONFIGURATION & GUIDELINES
const CPRConfig = {
  guideline: 'aha', // 'aha' or 'erc'
  patientType: 'adult',
  patients: {
    adult: {
      name: 'Adult Resuscitation',
      depthMin: 5.0,
      depthMax: 6.0,
      rateMin: 100,
      rateMax: 120,
      targetRate: 110,
      ratio: '30:2',
      scale: { x: 1.0, y: 1.0, z: 1.0 }
    },
    child: {
      name: 'Child Resuscitation',
      depthMin: 4.8,
      depthMax: 5.2,
      rateMin: 100,
      rateMax: 120,
      targetRate: 110,
      ratio: '30:2 (or 15:2)',
      scale: { x: 0.75, y: 0.75, z: 0.75 }
    },
    infant: {
      name: 'Infant Resuscitation',
      depthMin: 3.8,
      depthMax: 4.2,
      rateMin: 100,
      rateMax: 120,
      targetRate: 110,
      ratio: '30:2 (or 15:2)',
      scale: { x: 0.45, y: 0.45, z: 0.45 }
    }
  },
  audio: {
    voiceVol: 0.9,
    ecgVol: 0.7,
    aedVol: 0.85,
    metroVol: 0.8
  }
};

// 2. PROCEDURAL WEB AUDIO SYNTHESIS ENGINE
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isAudioEnabled = true;
    this.isMetronomeActive = true;
    this.metroTimer = null;
    this.flatlineOsc = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, duration, type = 'sine', volume = 0.5) {
    if (!this.ctx || !this.isAudioEnabled) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playECGBeep(type = 'normal') {
    if (!this.isAudioEnabled) return;
    const vol = CPRConfig.audio.ecgVol * 0.4;
    if (type === 'normal') this.playTone(880, 0.08, 'sine', vol);
    else if (type === 'alarm') this.playTone(1200, 0.06, 'triangle', vol * 1.2);
    else if (type === 'vf') this.playTone(720 + Math.random() * 200, 0.05, 'sawtooth', vol * 0.7);
  }

  setFlatline(active) {
    if (!this.ctx || !this.isAudioEnabled) return;
    if (active && !this.flatlineOsc) {
      try {
        this.flatlineOsc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        this.flatlineOsc.type = 'sine';
        this.flatlineOsc.frequency.setValueAtTime(440, this.ctx.currentTime);
        gain.gain.setValueAtTime(CPRConfig.audio.ecgVol * 0.3, this.ctx.currentTime);
        this.flatlineOsc.connect(gain);
        gain.connect(this.ctx.destination);
        this.flatlineOsc.start();
      } catch (e) {}
    } else if (!active && this.flatlineOsc) {
      try {
        this.flatlineOsc.stop();
        this.flatlineOsc.disconnect();
      } catch (e) {}
      this.flatlineOsc = null;
    }
  }

  playAEDCharge() {
    if (!this.ctx || !this.isAudioEnabled) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 3.0);
      gain.gain.setValueAtTime(CPRConfig.audio.aedVol * 0.5, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 3.1);
    } catch (e) {}
  }

  playAEDShock() {
    if (!this.ctx || !this.isAudioEnabled) return;
    try {
      // Noise burst
      const bufferSize = this.ctx.sampleRate * 0.2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(CPRConfig.audio.aedVol * 0.8, this.ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      whiteNoise.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      whiteNoise.start();

      // Deep resonant body thud
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(65, this.ctx.currentTime);
      bassOsc.frequency.exponentialRampToValueAtTime(25, this.ctx.currentTime + 0.35);
      bassGain.gain.setValueAtTime(CPRConfig.audio.aedVol * 0.85, this.ctx.currentTime);
      bassGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
      bassOsc.connect(bassGain);
      bassGain.connect(this.ctx.destination);
      bassOsc.start();
      bassOsc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {}
  }

  playMetronomeClick() {
    if (!this.isAudioEnabled || !this.isMetronomeActive) return;
    this.playTone(1600, 0.025, 'sine', CPRConfig.audio.metroVol * 0.5);
  }

  startMetronome(bpm = 110) {
    this.stopMetronome();
    this.isMetronomeActive = true;
    const intervalMs = (60 / bpm) * 1000;
    this.metroTimer = setInterval(() => {
      this.playMetronomeClick();
    }, intervalMs);
  }

  stopMetronome() {
    if (this.metroTimer) {
      clearInterval(this.metroTimer);
      this.metroTimer = null;
    }
  }

  toggleMetronome(bpm = 110) {
    if (this.isMetronomeActive && this.metroTimer) {
      this.stopMetronome();
      this.isMetronomeActive = false;
      return false;
    } else {
      this.startMetronome(bpm);
      return true;
    }
  }

  playSuccessFanfare() {
    if (!this.isAudioEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.25, 'triangle', 0.5);
      }, idx * 110);
    });
  }
}

// 3. SPEECH SYNTHESIS ENGINE (DR. AVERY'S VOICE & SUBTITLES)
class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
  }

  speak(text) {
    // Update top subtitle callout and drawer text
    const subtitleText = document.getElementById('top-subtitle-text');
    const dialogueEl = document.getElementById('ai-dialogue-text');
    const vrSpeechEl = document.getElementById('vr-speech-text');

    if (subtitleText) subtitleText.textContent = \`Dr. Avery: \${text}\`;
    if (dialogueEl) dialogueEl.textContent = \`"\${text}"\`;
    if (vrSpeechEl) vrSpeechEl.setAttribute('value', \`Dr. Avery: \${text.substring(0, 65)}...\`);

    if (!this.synth || CPRConfig.audio.voiceVol <= 0) return;

    try {
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = CPRConfig.audio.voiceVol;
      this.synth.speak(utterance);
    } catch (e) {}
  }
}

// 4. PLATFORM DETECTION & HAPTIC FEEDBACK
class PlatformDetection {
  constructor() {
    this.isWebXRSupported = false;
    this.isVRModeActive = false;
    this.isQuest = false;
  }

  async detect() {
    const badgeText = document.getElementById('platform-status-text');
    if (navigator.xr) {
      try {
        this.isWebXRSupported = await navigator.xr.isSessionSupported('immersive-vr');
      } catch (e) {
        this.isWebXRSupported = false;
      }
    }

    const ua = navigator.userAgent.toLowerCase();
    this.isQuest = ua.includes('quest') || ua.includes('oculus');

    if (this.isQuest && this.isWebXRSupported) {
      if (badgeText) badgeText.textContent = "Meta Quest 3S VR Ready";
    } else if (this.isWebXRSupported) {
      if (badgeText) badgeText.textContent = "WebXR Ready";
    } else {
      if (badgeText) badgeText.textContent = "Desktop Mode";
    }

    const scene = document.querySelector('a-scene');
    if (scene) {
      scene.addEventListener('enter-vr', () => {
        this.isVRModeActive = true;
        if (badgeText) badgeText.textContent = "Immersive VR Active";
        const vrMenu = document.getElementById('vr-floating-menu');
        if (vrMenu) vrMenu.setAttribute('visible', 'true');
      });
      scene.addEventListener('exit-vr', () => {
        this.isVRModeActive = false;
        if (badgeText) badgeText.textContent = this.isQuest ? "Quest Desktop" : "Desktop Mode";
      });
    }
  }

  triggerHaptic(intensity = 0.85, duration = 65) {
    if (!navigator.getGamepads) return;
    const gamepads = navigator.getGamepads();
    for (let gp of gamepads) {
      if (gp && gp.hapticActuators && gp.hapticActuators.length > 0) {
        gp.hapticActuators[0].pulse(intensity, duration);
      }
    }
  }
}

// 5. LOCAL DATA STORAGE
class DataStorage {
  constructor() {
    this.STORAGE_KEY = 'cpr_vr_records_v2';
    this.PROGRESS_KEY = 'cpr_vr_progress_v2';
  }

  getRecords() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveRecord(record) {
    try {
      const records = this.getRecords();
      records.unshift(record);
      if (records.length > 50) records.pop();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
    } catch (e) {}
  }

  clearRecords() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getProgress() {
    try {
      const data = localStorage.getItem(this.PROGRESS_KEY);
      return data ? JSON.parse(data) : { completedLessons: [] };
    } catch (e) {
      return { completedLessons: [] };
    }
  }

  markLessonComplete(lessonId) {
    try {
      const prog = this.getProgress();
      if (!prog.completedLessons.includes(lessonId)) {
        prog.completedLessons.push(lessonId);
        localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(prog));
      }
    } catch (e) {}
  }

  exportCSV() {
    const records = this.getRecords();
    if (records.length === 0) {
      alert("No training sessions recorded yet. Complete an exam or practice session first!");
      return;
    }

    let csv = "data:text/csv;charset=utf-8,";
    csv += "Date,Mode,Patient,Total_Compressions,Avg_Rate_BPM,Avg_Depth_CM,Recoil_Score_Percent,Grade\\n";
    records.forEach(r => {
      csv += \`"\${r.date}","\${r.mode}","\${r.patient}",\${r.compressions},\${r.avgRate},\${r.avgDepth},\${r.recoilScore},"\${r.grade}"\\n\`;
    });

    const encodedUri = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", \`CPR_Training_Report_\${Date.now()}.csv\`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// 6. CLINICAL CPR PHYSICS & TELEMETRY ENGINE
class CPREngine {
  constructor(audioEngine, platform) {
    this.audio = audioEngine;
    this.platform = platform;

    this.totalCompressions = 0;
    this.cycleCompressions = 0;
    this.lastCompressionTime = 0;
    this.compressionIntervals = [];
    this.depthHistory = [];
    this.recoilHistory = [];
    this.placementOffsets = [];

    this.currentDepth = 0;
    this.currentRate = 0;
    this.currentRecoil = 100;
    this.currentPlacement = 'Optimal';

    this.sessionStartTime = Date.now();
    this.activeCompressionTimeMs = 0;
    this.isAirwayOpen = false;

    this.benchmarks = {
      depthMin: 5.0,
      depthMax: 6.0,
      rateMin: 100,
      rateMax: 120
    };
  }

  setPatient(type) {
    const pat = CPRConfig.patients[type] || CPRConfig.patients.adult;
    this.benchmarks.depthMin = pat.depthMin;
    this.benchmarks.depthMax = pat.depthMax;
    this.benchmarks.rateMin = pat.rateMin;
    this.benchmarks.rateMax = pat.rateMax;

    const targetLabel = document.getElementById('depth-target-text');
    if (targetLabel) targetLabel.textContent = \`Target: \${pat.depthMin.toFixed(1)} - \${pat.depthMax.toFixed(1)} cm\`;

    const rig = document.getElementById('mannequin-rig');
    if (rig) rig.setAttribute('scale', \`\${pat.scale.x} \${pat.scale.y} \${pat.scale.z}\`);
  }

  deliverCompression(simulatedForce = 1.0, offsetMm = 0) {
    const now = Date.now();

    // Enforce 0.2 second cooldown between every compression
    if (this.lastCompressionTime > 0 && (now - this.lastCompressionTime < 200)) {
      return false; // Still in 0.2s cooldown
    }

    this.totalCompressions++;
    this.cycleCompressions++;

    // Calculate Rate (BPM) based on interval
    if (this.lastCompressionTime > 0) {
      const intervalMs = now - this.lastCompressionTime;
      const instantBPM = Math.round(60000 / intervalMs);
      this.compressionIntervals.push(instantBPM);
      if (this.compressionIntervals.length > 5) this.compressionIntervals.shift();
      const avgBpm = Math.round(this.compressionIntervals.reduce((a, b) => a + b, 0) / this.compressionIntervals.length);
      this.currentRate = Math.min(180, Math.max(30, avgBpm));
    } else {
      this.currentRate = 120;
    }
    this.lastCompressionTime = now;
    this.activeCompressionTimeMs += 100;

    // Visual button cooldown state (0.2s)
    const btnCompress = document.getElementById('btn-compress');
    if (btnCompress) {
      btnCompress.classList.add('cooldown');
      setTimeout(() => {
        if (btnCompress) btnCompress.classList.remove('cooldown');
      }, 200);
    }

    // Audio thump on chest compression
    this.audio.playTone(160, 0.08, 'sine', 0.45);

    // Simulated Depth
    const pat = CPRConfig.patients[CPRConfig.patientType];
    const optimalCenter = (pat.depthMin + pat.depthMax) / 2;
    const depthVariation = (Math.random() * 0.9 - 0.4) * simulatedForce;
    const measuredDepth = parseFloat((optimalCenter + depthVariation).toFixed(1));
    this.currentDepth = Math.max(1.5, Math.min(7.0, measuredDepth));
    this.depthHistory.push(this.currentDepth);

    // Recoil
    const recoilScore = Math.random() > 0.08 ? 100 : Math.round(85 + Math.random() * 12);
    this.currentRecoil = recoilScore;
    this.recoilHistory.push(recoilScore);

    // Placement
    this.placementOffsets.push(offsetMm);
    this.currentPlacement = offsetMm < 8 ? 'Optimal' : offsetMm < 18 ? 'Slightly Off' : 'Off-Center';

    // 3D Physical Displacement of Sternal Plate (Fast 90ms push & recoil for 0.2s cadence)
    const chestPlate = document.getElementById('chest-plate');
    if (chestPlate) {
      const displacementY = -0.01 * (this.currentDepth * 0.7);
      chestPlate.setAttribute('position', \`0 \${displacementY} 0\`);
      setTimeout(() => {
        chestPlate.setAttribute('position', '0 0 0');
      }, 90);
    }

    // VR Haptic pulse
    this.platform.triggerHaptic(0.9, 70);

    // Update HUD gauges and status
    this.updateHUD();

    // Trigger AI evaluation
    window.app.instructor.evaluateCompression(this.currentRate, this.currentDepth, this.currentRecoil);

    // Cycle prompt (30:2)
    const currentInCycle = (this.cycleCompressions % 30) || (this.cycleCompressions > 0 ? 30 : 0);
    if (currentInCycle === 30) {
      window.app.speech.speak("30 compressions completed! Give 2 rescue breaths now.");
      const feedback = document.getElementById('banner-feedback');
      if (feedback) {
        feedback.textContent = "30 COMPRESSIONS COMPLETED • DELIVER 2 RESCUE BREATHS";
        feedback.className = "feedback-banner warning";
      }
    }
  }

  deliverVentilation() {
    this.cycleCompressions = 0; // reset cycle counter
    const chestPlate = document.getElementById('chest-plate');
    if (chestPlate) {
      chestPlate.setAttribute('position', '0 0.018 0');
      setTimeout(() => {
        chestPlate.setAttribute('position', '0 0 0');
      }, 800);
    }
    this.audio.playTone(340, 0.35, 'sine', 0.25);
    const feedback = document.getElementById('banner-feedback');
    if (feedback) {
      feedback.textContent = "RESCUE BREATH DELIVERED • CHEST RISE OBSERVED";
      feedback.className = "feedback-banner perfect";
    }
    this.updateHUD();
  }

  toggleAirwayTilt() {
    const headPivot = document.getElementById('head-pivot');
    const indicator = document.getElementById('airway-indicator');
    this.isAirwayOpen = !this.isAirwayOpen;

    if (headPivot && indicator) {
      if (this.isAirwayOpen) {
        headPivot.setAttribute('rotation', '-24 0 0');
        indicator.setAttribute('color', '#00ff88');
        window.app.speech.speak("Head-tilt chin-lift executed. Airway is now open.");
      } else {
        headPivot.setAttribute('rotation', '0 0 0');
        indicator.setAttribute('color', '#ff3366');
      }
    }
  }

  updateHUD() {
    // 1. Depth
    const valDepth = document.getElementById('val-depth');
    const fillDepth = document.getElementById('fill-depth');
    if (valDepth && fillDepth) {
      valDepth.textContent = \`\${this.currentDepth.toFixed(1)} cm\`;
      const pct = Math.min(100, Math.max(0, (this.currentDepth / 7.0) * 100));
      fillDepth.style.width = \`\${pct}%\`;
      fillDepth.style.backgroundColor = (this.currentDepth >= this.benchmarks.depthMin && this.currentDepth <= this.benchmarks.depthMax)
        ? "var(--accent-green)" : (this.currentDepth < this.benchmarks.depthMin ? "var(--accent-amber)" : "var(--accent-red)");
    }

    // 2. Rate
    const valRate = document.getElementById('val-rate');
    const fillRate = document.getElementById('fill-rate');
    if (valRate && fillRate) {
      valRate.textContent = \`\${this.currentRate} BPM\`;
      const pctRate = Math.min(100, Math.max(0, (this.currentRate / 160) * 100));
      fillRate.style.width = \`\${pctRate}%\`;
      fillRate.style.backgroundColor = (this.currentRate >= this.benchmarks.rateMin && this.currentRate <= this.benchmarks.rateMax)
        ? "var(--accent-green)" : (this.currentRate < this.benchmarks.rateMin ? "var(--accent-amber)" : "var(--accent-red)");
    }

    // 3. Recoil
    const valRecoil = document.getElementById('val-recoil');
    const fillRecoil = document.getElementById('fill-recoil');
    if (valRecoil && fillRecoil) {
      valRecoil.textContent = \`\${this.currentRecoil}%\`;
      fillRecoil.style.width = \`\${this.currentRecoil}%\`;
      fillRecoil.style.backgroundColor = this.currentRecoil >= 95 ? "var(--accent-green)" : "var(--accent-amber)";
    }

    // 4. Placement
    const valPlacement = document.getElementById('val-placement');
    if (valPlacement) {
      valPlacement.textContent = this.currentPlacement;
      valPlacement.style.color = this.currentPlacement === 'Optimal' ? "var(--accent-green)" : "var(--accent-amber)";
    }

    // 5. Mini Counters
    const totalCompEl = document.getElementById('stat-total-compressions');
    const cycleCompEl = document.getElementById('stat-cycle-count');
    const ccfEl = document.getElementById('stat-ccf');
    if (totalCompEl) totalCompEl.textContent = this.totalCompressions;

    // Properly modulo 30 for cycles
    const currentInCycle = (this.cycleCompressions % 30) || (this.cycleCompressions > 0 ? 30 : 0);
    if (cycleCompEl) cycleCompEl.textContent = \`\${currentInCycle} / 30\`;

    const elapsedTotalMs = Math.max(1000, Date.now() - this.sessionStartTime);
    const ccf = Math.min(100, Math.round((this.activeCompressionTimeMs / elapsedTotalMs) * 100));
    if (ccfEl) ccfEl.textContent = \`\${Math.max(65, ccf)}%\`;
  }

  getMetricsSummary() {
    const avgRate = this.compressionIntervals.length > 0
      ? Math.round(this.compressionIntervals.reduce((a, b) => a + b, 0) / this.compressionIntervals.length)
      : 110;
    const avgDepth = this.depthHistory.length > 0
      ? (this.depthHistory.reduce((a, b) => a + b, 0) / this.depthHistory.length).toFixed(1)
      : 5.4;
    const recoilScore = this.recoilHistory.length > 0
      ? Math.round(this.recoilHistory.reduce((a, b) => a + b, 0) / this.recoilHistory.length)
      : 98;
    const elapsedTotalMs = Math.max(1000, Date.now() - this.sessionStartTime);
    const ccf = Math.min(100, Math.round((this.activeCompressionTimeMs / elapsedTotalMs) * 100));

    return {
      total: this.totalCompressions,
      avgRate: avgRate,
      avgDepth: avgDepth,
      recoilScore: recoilScore,
      landmarkScore: 96,
      ccf: Math.max(70, ccf)
    };
  }
}

// 7. AED DEFIBRILLATOR SYSTEM
class AEDSystem {
  constructor(audioEngine, speechEngine) {
    this.audio = audioEngine;
    this.speech = speechEngine;
    this.state = 'OFF';
    this.padsAttached = { pad1: false, pad2: false };
  }

  togglePower() {
    if (this.state === 'OFF') {
      this.state = 'ON';
      const screen = document.getElementById('aed-screen-text');
      if (screen) screen.setAttribute('value', 'APPLY PADS');
      this.speech.speak("Unit active. Apply electrode pads to patient's bare chest.");
      const banner = document.getElementById('banner-feedback');
      if (banner) {
        banner.textContent = "AED ACTIVE: ATTACH ELECTRODE PADS TO PATIENT";
        banner.className = "feedback-banner warning";
      }
    } else {
      this.state = 'OFF';
      const screen = document.getElementById('aed-screen-text');
      if (screen) screen.setAttribute('value', 'AED OFF');
      this.speech.speak("Defibrillator powered down.");
    }
  }

  attachPad(padIndex) {
    if (padIndex === 1) this.padsAttached.pad1 = true;
    if (padIndex === 2) this.padsAttached.pad2 = true;

    const padEl = document.getElementById(\`aed-pad-\${padIndex}-3d\`);
    if (padEl) {
      if (padIndex === 1) {
        padEl.setAttribute('position', '-0.1 0.12 -0.24');
      } else {
        padEl.setAttribute('position', '0.12 0.12 -0.1');
      }
    }

    if (this.padsAttached.pad1 && this.padsAttached.pad2) {
      this.state = 'PADS_ATTACHED';
      this.speech.speak("Pads attached! Analyzing heart rhythm... Stand clear! Do not touch the patient!");
      const screen = document.getElementById('aed-screen-text');
      if (screen) screen.setAttribute('value', 'ANALYZING...');
      setTimeout(() => {
        this.triggerShockAdvisory();
      }, 3500);
    } else {
      this.speech.speak(\`Pad \${padIndex} attached. Attach second pad.\`);
    }
  }

  triggerShockAdvisory() {
    this.state = 'SHOCK_ADVISED';
    this.speech.speak("Shock advised! Charging. Stand clear of patient!");
    this.audio.playAEDCharge();
    const screen = document.getElementById('aed-screen-text');
    if (screen) screen.setAttribute('value', 'CHARGING...');

    setTimeout(() => {
      this.state = 'READY_SHOCK';
      this.speech.speak("Press the flashing orange shock button now!");
      const shockBtn = document.getElementById('aed-shock-btn-3d');
      if (shockBtn) {
        shockBtn.setAttribute('color', '#ff3366');
        shockBtn.setAttribute('material', 'emissive: #ff3366; emissiveIntensity: 1.0;');
      }
      const banner = document.getElementById('banner-feedback');
      if (banner) {
        banner.textContent = "PRESS FLASHING SHOCK BUTTON ON DEFIBRILLATOR NOW!";
        banner.className = "feedback-banner error";
      }
    }, 3200);
  }

  deliverShock() {
    if (this.state !== 'READY_SHOCK') {
      this.speech.speak("Defibrillator not charged or shock not advised.");
      return;
    }
    this.state = 'POST_SHOCK';
    this.audio.playAEDShock();

    const shockBtn = document.getElementById('aed-shock-btn-3d');
    if (shockBtn) {
      shockBtn.setAttribute('color', '#ffb700');
      shockBtn.setAttribute('material', 'emissive: #ffb700; emissiveIntensity: 0.4;');
    }

    const screen = document.getElementById('aed-screen-text');
    if (screen) screen.setAttribute('value', 'SHOCK DELIVERED');

    this.speech.speak("Shock delivered! Immediately resume chest compressions for 2 minutes.");
    const banner = document.getElementById('banner-feedback');
    if (banner) {
      banner.textContent = "SHOCK DELIVERED • RESUME CHEST COMPRESSIONS IMMEDIATELY";
      banner.className = "feedback-banner perfect";
    }

    if (window.app.scenarios) {
      window.app.scenarios.onDefibrillation();
    }
  }
}

// 8. DYNAMIC CANVAS LEAD II ECG MONITOR
class ECGMonitor {
  constructor(canvasId, audioEngine) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.audio = audioEngine;
    this.rhythm = 'nsr';
    this.sweepX = 0;
    this.hr = 72;
    this.lastBeepTime = 0;
  }

  setRhythm(rhythmName) {
    this.rhythm = rhythmName;
    const badge = document.getElementById('ecg-rhythm-badge');
    const hrDisplay = document.getElementById('ecg-hr-display');

    if (rhythmName === 'nsr') {
      this.hr = 72;
      if (badge) badge.textContent = "LEAD II - NSR";
      this.audio.setFlatline(false);
    } else if (rhythmName === 'vf') {
      this.hr = 0;
      if (badge) badge.textContent = "CRITICAL: V-FIB";
      this.audio.setFlatline(false);
    } else if (rhythmName === 'vt') {
      this.hr = 190;
      if (badge) badge.textContent = "CRITICAL: V-TACH";
      this.audio.setFlatline(false);
    } else if (rhythmName === 'asystole') {
      this.hr = 0;
      if (badge) badge.textContent = "CRITICAL: ASYSTOLE";
      this.audio.setFlatline(true);
    } else if (rhythmName === 'rosc') {
      this.hr = 88;
      if (badge) badge.textContent = "ROSC: SINUS TACH";
      this.audio.setFlatline(false);
    }
    if (hrDisplay) hrDisplay.textContent = this.hr > 0 ? \`\${this.hr} BPM\` : \`-- BPM\`;
  }

  start() {
    if (!this.ctx) return;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const midY = height / 2;

    const render = () => {
      this.ctx.fillStyle = "rgba(2, 6, 12, 0.28)";
      this.ctx.fillRect(this.sweepX, 0, 8, height);

      let yOffset = 0;
      const t = (this.sweepX % 110);

      if (this.rhythm === 'nsr' || this.rhythm === 'rosc') {
        if (t > 15 && t < 25) yOffset = -Math.sin((t - 15) * 0.314) * 4;
        else if (t >= 35 && t < 38) yOffset = 3;
        else if (t >= 38 && t < 43) {
          yOffset = -18;
          const now = Date.now();
          if (now - this.lastBeepTime > 550) {
            this.audio.playECGBeep('normal');
            this.lastBeepTime = now;
          }
        }
        else if (t >= 43 && t < 47) yOffset = 4;
        else if (t > 56 && t < 72) yOffset = -Math.sin((t - 56) * 0.196) * 5;
      } else if (this.rhythm === 'vf') {
        yOffset = (Math.sin(this.sweepX * 0.3) * 10) + (Math.sin(this.sweepX * 0.8) * 6) + (Math.random() * 4 - 2);
        if (Math.random() > 0.95) this.audio.playECGBeep('vf');
      } else if (this.rhythm === 'vt') {
        yOffset = Math.sin(this.sweepX * 0.45) * 16;
        if (t % 28 === 0) this.audio.playECGBeep('alarm');
      } else if (this.rhythm === 'asystole') {
        yOffset = (Math.random() * 2 - 1);
      }

      const drawY = midY + yOffset;
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.rhythm === 'asystole' ? "#ff3366" : this.rhythm === 'vf' ? "#ffb700" : "#00ff88";
      this.ctx.lineWidth = 1.8;
      this.ctx.moveTo(this.sweepX - 2, drawY);
      this.ctx.lineTo(this.sweepX, drawY);
      this.ctx.stroke();

      this.sweepX = (this.sweepX + 2) % width;
      requestAnimationFrame(render);
    };

    render();
  }
}

// 9. VIRTUAL MEDICAL INSTRUCTOR (DR. AVERY)
class AIInstructor {
  constructor(speechEngine) {
    this.speech = speechEngine;
    this.lastAdviceTime = 0;
    this.knowledgeBase = {
      depth: "According to 2020-2025 AHA guidelines, adult chest compressions must be 5.0 to 6.0 cm (2.0 to 2.4 inches). For children, compress ~5 cm, and for infants compress 4 cm.",
      rate: "Target rate is 100 to 120 compressions per minute. Optimal is 110 BPM. Rates under 100 reduce perfusion, while rates over 120 prevent ventricular filling.",
      recoil: "Complete chest recoil drops intrathoracic pressure, allowing blood to refill the heart chambers between pumps. Leaning on the chest significantly impairs survival.",
      hand: "Place the heel of one hand on the lower half of the sternum along the nipple line. Interlock your other hand on top with elbows locked straight.",
      aed: "Turn on the AED immediately. Place pads below the right collarbone and on the lower left ribcage. Clear the patient during analysis and shock delivery."
    };
  }

  evaluateCompression(rate, depth, recoil) {
    const now = Date.now();
    if (now - this.lastAdviceTime < 3500) return;

    const banner = document.getElementById('banner-feedback');

    if (depth < CPRConfig.patients[CPRConfig.patientType].depthMin) {
      if (banner) {
        banner.textContent = "PUSH HARDER • DEPTH IS TOO SHALLOW (<5 CM)";
        banner.className = "feedback-banner warning";
      }
      this.speech.speak("Push harder! Compressions are too shallow. Aim for 5 to 6 cm depth.");
      this.lastAdviceTime = now;
      return;
    }

    if (recoil < 90) {
      if (banner) {
        banner.textContent = "INCOMPLETE RECOIL • ALLOW FULL CHEST EXPANSION";
        banner.className = "feedback-banner error";
      }
      this.speech.speak("Allow full chest recoil. Take your weight completely off between compressions.");
      this.lastAdviceTime = now;
      return;
    }

    if (banner) {
      banner.textContent = "COMPRESSION REGISTERED • 0.2s CADENCE";
      banner.className = "feedback-banner perfect";
    }
    this.speech.speak("Good compression depth and recoil.");
    this.lastAdviceTime = now;
  }

  askQuestion(query) {
    const q = query.toLowerCase();
    let ans = "Focus on maintaining 100-120 BPM and full chest decompression.";
    if (q.includes("depth") || q.includes("deep") || q.includes("cm")) ans = this.knowledgeBase.depth;
    else if (q.includes("rate") || q.includes("bpm") || q.includes("fast") || q.includes("speed")) ans = this.knowledgeBase.rate;
    else if (q.includes("recoil") || q.includes("lean") || q.includes("release")) ans = this.knowledgeBase.recoil;
    else if (q.includes("hand") || q.includes("position") || q.includes("sternum")) ans = this.knowledgeBase.hand;
    else if (q.includes("aed") || q.includes("shock") || q.includes("pad")) ans = this.knowledgeBase.aed;
    this.speech.speak(ans);
  }
}

// 10. GUIDED LESSONS CURRICULUM
class LessonManager {
  constructor(storage, speech) {
    this.storage = storage;
    this.speech = speech;
    this.currentLessonIndex = 0;
    this.lessons = [
      { id: 1, title: "Recognizing Sudden Cardiac Arrest", objective: "Identify hallmarks of sudden cardiac arrest versus respiratory distress.", instruction: "Patient collapses suddenly. Verify unresponsiveness and absence of normal breathing.", actionRequired: "Observe patient vitals and identify absence of spontaneous circulation.", quiz: { q: "What defines agonal gasps during sudden cardiac arrest?", options: ["Normal breathing", "Abnormal, irregular gasps that do not provide ventilation", "A sign of recovery"], correct: 1, explanation: "Agonal gasps occur in up to 40% of victims in the first minutes and must not be confused with normal breathing." } },
      { id: 2, title: "Assessing Scene Safety", objective: "Ensure environment is safe before approaching.", instruction: "Inspect for traffic, exposed wires, or biohazards.", actionRequired: "Confirm scene safety.", quiz: { q: "What is your primary action upon approaching any collapse?", options: ["Apply AED", "Check scene safety for rescuer and victim", "Begin compressions"], correct: 1, explanation: "Scene safety is always the first priority." } },
      { id: 3, title: "Checking Responsiveness", objective: "Perform Tap and Shout assessment.", instruction: "Tap both shoulders and shout 'Are you OK?' Check breathing for <10 seconds.", actionRequired: "Click patient's head or chest.", quiz: { q: "How long should responsiveness assessment take?", options: ["30 seconds", "No more than 10 seconds", "2 minutes"], correct: 1, explanation: "Limit assessment to under 10 seconds to minimize delays in compressions." } },
      { id: 4, title: "Calling Emergency Services", objective: "Trigger EMS dispatch and request AED.", instruction: "Call 911/112 on speakerphone and send someone for an AED.", actionRequired: "Confirm EMS notification.", quiz: { q: "What instruction should you give when sending someone for an AED?", options: ["'Look for first aid.'", "'You in the blue shirt: Call 911 and bring an AED!'", "'Wait here.'"], correct: 1, explanation: "Direct, specific communication assigns clear responsibility." } },
      { id: 5, title: "Obtaining and Positioning the AED", objective: "Prepare the Automated External Defibrillator.", instruction: "Place AED unit next to patient's shoulder opposite rescuer.", actionRequired: "Click the 3D AED Unit to power it on.", quiz: { q: "Where should the AED be placed?", options: ["Between feet", "Beside the patient near shoulder opposite rescuer", "Inside ambulance"], correct: 1, explanation: "Placing the AED near the shoulder gives clear access to chest electrodes." } },
      { id: 6, title: "CPR Physiology & Perfusion", objective: "Understand coronary perfusion pressure (CPP).", instruction: "Compressions provide only 20-30% of normal cardiac output.", actionRequired: "Maintain continuous perfusion pressure.", quiz: { q: "How many compressions does it take to restore coronary pressure after a pause?", options: ["1 compression", "5 to 10 consecutive compressions", "None"], correct: 1, explanation: "It takes several compressions to build adequate coronary pressure; any pause causes it to plummet." } },
      { id: 7, title: "Landmarks & Hand Placement", objective: "Locate lower half of sternum.", instruction: "Place heel of hand on lower half of sternum. Avoid xiphoid process.", actionRequired: "Click cyan landmark ring on chest.", quiz: { q: "Compressing too low over the xiphoid process risks what complication?", options: ["Liver or spleen laceration", "Headache", "Shoulder strain"], correct: 0, explanation: "The xiphoid process can fracture and lacerate the underlying liver." } },
      { id: 8, title: "Rescuer Posture & Mechanics", objective: "Utilize body weight to minimize fatigue.", instruction: "Lock elbows straight, hinge from hips.", actionRequired: "Align posture for downward force.", quiz: { q: "What arm posture ensures effective downward compression force?", options: ["Bent elbows", "Straight locked elbows with shoulders over hands", "One hand"], correct: 1, explanation: "Straight elbows transfer upper body weight efficiently." } },
      { id: 9, title: "Compression Rate and Depth", objective: "Master 100-120 BPM rate and 5-6 cm depth.", instruction: "Deliver compressions matching the 110 BPM metronome.", actionRequired: "Deliver 10 compressions in green target zone.", quiz: { q: "What is recommended adult compression depth?", options: ["3 to 4 cm", "5 to 6 cm (2 to 2.4 in)", "7 to 9 cm"], correct: 1, explanation: "5 to 6 cm achieves peak cardiac output." } },
      { id: 10, title: "Complete Chest Recoil", objective: "Avoid residual leaning on chest.", instruction: "Release downward pressure completely between compressions.", actionRequired: "Reach 100% full recoil.", quiz: { q: "Why is residual leaning harmful?", options: ["It prevents ventricular refill", "Damages bed", "Makes CPR too fast"], correct: 0, explanation: "Incomplete recoil drastically reduces blood return to the heart." } },
      { id: 11, title: "Minimizing Interruptions & CCF", objective: "Target Chest Compression Fraction (CCF) > 80%.", instruction: "Limit all pauses to less than 10 seconds.", actionRequired: "Keep pauses strictly under 10 seconds.", quiz: { q: "What CCF is recommended?", options: ["At least 40%", "At least 60-80%", "100% always"], correct: 1, explanation: "Targeting CCF >80% significantly increases survival." } },
      { id: 12, title: "Ventilation & Airway Opening", objective: "Perform Head-Tilt Chin-Lift and deliver 2 breaths.", instruction: "Tilt head back, lift chin, deliver 2 gentle breaths over 1 second.", actionRequired: "Click chin, then click Ventilate [B].", quiz: { q: "How long should each breath be delivered?", options: ["Over 1 second", "5 seconds", "A quick puff"], correct: 0, explanation: "Breaths delivered over 1 second prevent gastric inflation." } },
      { id: 13, title: "AED Operation & Shock Safety", objective: "Execute safe defibrillation sequence.", instruction: "Apply pads, clear patient, deliver shock.", actionRequired: "Deliver simulated AED shock.", quiz: { q: "What should you do immediately after an AED shock?", options: ["Check pulse for 2 minutes", "Immediately resume CPR compressions", "Remove pads"], correct: 1, explanation: "Always resume chest compressions immediately after a shock." } },
      { id: 14, title: "Complete BLS Sequence", objective: "Execute full end-to-end resuscitation scenario.", instruction: "Combine safety, responsiveness, EMS call, 30:2 CPR, and AED.", actionRequired: "Complete a full 2-minute cycle.", quiz: { q: "What is the primary link in the adult Chain of Survival?", options: ["Early recognition and EMS activation", "Taking photos", "Waiting"], correct: 0, explanation: "Immediate recognition activates the entire resuscitation continuum." } }
    ];
  }

  renderCurriculumList() {
    const listEl = document.getElementById('curriculum-list');
    if (!listEl) return;
    listEl.innerHTML = '';
    const progress = this.storage.getProgress();

    this.lessons.forEach((l, idx) => {
      const isCompleted = progress.completedLessons.includes(l.id);
      const item = document.createElement('div');
      item.className = \`lesson-item \${idx === this.currentLessonIndex ? 'active' : ''} \${isCompleted ? 'completed' : ''}\`;
      item.innerHTML = \`
        <div class="lesson-number">\${isCompleted ? '&#x2714;' : l.id}</div>
        <div class="lesson-info">
          <div class="lesson-title-text">\${l.title}</div>
          <div class="lesson-meta"><span>Lesson \${l.id}/14</span><span>\${isCompleted ? 'Done' : 'Pending'}</span></div>
        </div>
      \`;
      item.addEventListener('click', () => this.openLessonModal(idx));
      listEl.appendChild(item);
    });
  }

  openLessonModal(index) {
    this.currentLessonIndex = index;
    const l = this.lessons[index];
    const modal = document.getElementById('modal-lessons');
    const titleEl = document.getElementById('lesson-modal-title');
    const bodyEl = document.getElementById('lesson-modal-body');

    if (titleEl) titleEl.textContent = \`LESSON \${l.id}: \${l.title.toUpperCase()}\`;
    if (bodyEl) {
      bodyEl.innerHTML = \`
        <div style="display:flex; flex-direction:column; gap:14px;">
          <div class="stat-card">
            <span class="stat-label">OBJECTIVE</span>
            <p style="font-size:0.82rem; color:#fff;">\${l.objective}</p>
          </div>
          <div class="stat-card">
            <span class="stat-label">PROCEDURAL INSTRUCTION</span>
            <p style="font-size:0.82rem; color:#e2e8f0;">\${l.instruction}</p>
          </div>
          <div style="background:rgba(0,240,255,0.08); border:1px solid var(--accent-cyan); border-radius:6px; padding:10px;">
            <div style="font-family:var(--font-tech); font-size:0.75rem; color:var(--accent-cyan); margin-bottom:4px;">&#x26A1; REQUIRED SIMULATION ACTION</div>
            <p style="font-size:0.8rem; color:#fff;">\${l.actionRequired}</p>
          </div>
          <div style="background:rgba(9,18,32,0.85); border:1px solid var(--border-glass); border-radius:6px; padding:12px;">
            <div style="font-family:var(--font-tech); font-size:0.75rem; color:var(--accent-green); margin-bottom:8px;">&#x1F9E0; KNOWLEDGE CHECK</div>
            <p style="font-size:0.82rem; color:#fff; font-weight:600; margin-bottom:10px;">\${l.quiz.q}</p>
            <div style="display:flex; flex-direction:column; gap:6px;">
              \${l.quiz.options.map((opt, oIdx) => \`
                <button class="quick-q-btn" style="text-align:left; font-size:0.78rem;" onclick="window.app.lessons.checkAnswer(\${index}, \${oIdx})">
                  \${String.fromCharCode(65 + oIdx)}. \${opt}
                </button>
              \`).join('')}
            </div>
            <div id="quiz-feedback-box" style="margin-top:10px; font-size:0.78rem; display:none;"></div>
          </div>
        </div>
      \`;
    }
    if (modal) modal.classList.add('active');
    this.speech.speak(\`Lesson \${l.id}: \${l.title}.\`);
  }

  checkAnswer(lessonIdx, selectedOption) {
    const l = this.lessons[lessonIdx];
    const feedbackBox = document.getElementById('quiz-feedback-box');
    if (!feedbackBox) return;
    feedbackBox.style.display = 'block';

    if (selectedOption === l.quiz.correct) {
      feedbackBox.innerHTML = \`<span style="color:var(--accent-green); font-weight:700;">&#x2714; Correct!</span> \${l.quiz.explanation}\`;
      this.storage.markLessonComplete(l.id);
      this.renderCurriculumList();
      window.app.audio.playTone(660, 0.2, 'triangle', 0.5);
    } else {
      feedbackBox.innerHTML = \`<span style="color:var(--accent-red); font-weight:700;">&#x2718; Incorrect.</span> \${l.quiz.explanation}\`;
      window.app.audio.playTone(220, 0.3, 'sawtooth', 0.4);
    }
  }
}

// 11. EMERGENCY SIMULATION SCENARIO MANAGER
class ScenarioManager {
  constructor(audioEngine, speechEngine, ecgMonitor) {
    this.audio = audioEngine;
    this.speech = speechEngine;
    this.ecg = ecgMonitor;
    this.activeScenario = null;
    this.scenarioTimer = null;
    this.timeLeftSeconds = 120;
  }

  getScenariosList() {
    return [
      { id: 'er_arrest', title: "Emergency Room Witnessed Cardiac Arrest", patient: "Adult (55M, sudden collapse in ER)", initialRhythm: 'vf', description: "55-year-old male with sudden collapse. ECG shows Ventricular Fibrillation. Immediate CPR and AED shock required.", timeLimit: 120 },
      { id: 'icu_asystole', title: "ICU Post-Op Respiratory Arrest", patient: "Child (8yo post-surgical hypoxia)", initialRhythm: 'asystole', description: "Pediatric patient experiences respiratory arrest progressing to Asystole. Focus on airway and pediatric compressions.", timeLimit: 120 },
      { id: 'ambulance_arrest', title: "Ambulance Transport Cardiac Arrest", patient: "Infant (6-month acute bradycardia)", initialRhythm: 'vt', description: "Infant cardiac arrest in transit. Apply 2-finger compressions with a 15:2 ratio.", timeLimit: 120 }
    ];
  }

  startScenario(scenarioId) {
    const s = this.getScenariosList().find(item => item.id === scenarioId) || this.getScenariosList()[0];
    this.activeScenario = s;
    this.timeLeftSeconds = s.timeLimit;
    this.ecg.setRhythm(s.initialRhythm);

    if (scenarioId === 'icu_asystole') window.app.setPatientType('child');
    else if (scenarioId === 'ambulance_arrest') window.app.setPatientType('infant');
    else window.app.setPatientType('adult');

    this.speech.speak(\`Emergency Scenario Started: \${s.title}. Patient is unresponsive. Begin immediate CPR!\`);
    const banner = document.getElementById('banner-feedback');
    if (banner) {
      banner.textContent = \`EMERGENCY: \${s.title.toUpperCase()} • BEGIN CPR NOW\`;
      banner.className = "feedback-banner error";
    }

    if (this.scenarioTimer) clearInterval(this.scenarioTimer);
    this.scenarioTimer = setInterval(() => {
      this.timeLeftSeconds--;
      if (this.timeLeftSeconds <= 0) {
        clearInterval(this.scenarioTimer);
        window.app.openDashboardModal();
      }
    }, 1000);
  }

  onDefibrillation() {
    if (!this.activeScenario) return;
    setTimeout(() => {
      this.ecg.setRhythm('rosc');
      this.speech.speak("Return of Spontaneous Circulation achieved! Patient has a palpable carotid pulse. Outstanding resuscitation team!");
      if (window.confetti) window.confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
    }, 2000);
  }
}

// 12. EXAMINATION & CERTIFICATE MANAGER
class ExamManager {
  constructor(cprEngine, storage, speech) {
    this.cpr = cprEngine;
    this.storage = storage;
    this.speech = speech;
    this.isExamActive = false;
    this.examSecondsLeft = 120;
    this.examTimer = null;
  }

  startExam() {
    this.isExamActive = true;
    this.examSecondsLeft = 120;
    this.cpr.totalCompressions = 0;
    this.cpr.cycleCompressions = 0;

    window.app.audio.stopMetronome();
    const metroBtn = document.getElementById('btn-toggle-metro');
    if (metroBtn) metroBtn.classList.remove('active');

    const ghostHands = document.getElementById('ghost-hands');
    if (ghostHands) ghostHands.setAttribute('visible', 'false');

    this.speech.speak("CPR-VR Clinical Skills Exam Started. 2-minute timed assessment with no metronome or hints. Begin compressions.");
    const banner = document.getElementById('banner-feedback');
    if (banner) {
      banner.textContent = "EXAMINATION IN PROGRESS • 2:00 REMAINING (NO HINTS)";
      banner.className = "feedback-banner warning";
    }

    if (this.examTimer) clearInterval(this.examTimer);
    this.examTimer = setInterval(() => {
      this.examSecondsLeft--;
      const min = String(Math.floor(this.examSecondsLeft / 60)).padStart(2, '0');
      const sec = String(this.examSecondsLeft % 60).padStart(2, '0');
      if (banner) banner.textContent = \`EXAMINATION IN PROGRESS • \${min}:\${sec} REMAINING\`;

      if (this.examSecondsLeft <= 0) {
        clearInterval(this.examTimer);
        this.finishExam();
      }
    }, 1000);
  }

  finishExam() {
    this.isExamActive = false;
    const metrics = this.cpr.getMetricsSummary();

    let score = 0;
    if (metrics.avgRate >= 100 && metrics.avgRate <= 120) score += 25;
    else if (metrics.avgRate >= 90 && metrics.avgRate <= 130) score += 18;
    else score += 10;

    const pat = CPRConfig.patients[CPRConfig.patientType];
    if (metrics.avgDepth >= pat.depthMin && metrics.avgDepth <= pat.depthMax) score += 25;
    else score += 15;

    if (metrics.recoilScore >= 95) score += 25;
    else score += 15;

    if (metrics.ccf >= 75) score += 25;
    else score += 15;

    let grade = "Grade A (Honors)";
    if (score < 70) grade = "Remedial Training Required";
    else if (score < 80) grade = "Grade C (Pass)";
    else if (score < 90) grade = "Grade B (Proficient)";

    const scoreVal = document.getElementById('cert-score-val');
    const gradeVal = document.getElementById('cert-grade-val');
    const rateVal = document.getElementById('cert-rate-val');
    const depthVal = document.getElementById('cert-depth-val');
    const ccfVal = document.getElementById('cert-ccf-val');
    const dateText = document.getElementById('cert-date-text');

    if (scoreVal) scoreVal.textContent = \`\${score}%\`;
    if (gradeVal) gradeVal.textContent = grade;
    if (rateVal) rateVal.textContent = \`\${metrics.avgRate} BPM\`;
    if (depthVal) depthVal.textContent = \`\${metrics.avgDepth} cm\`;
    if (ccfVal) ccfVal.textContent = \`\${metrics.ccf}%\`;
    if (dateText) dateText.textContent = new Date().toLocaleDateString();

    this.storage.saveRecord({
      date: new Date().toLocaleString(),
      mode: 'Examination',
      patient: CPRConfig.patients[CPRConfig.patientType].name,
      compressions: metrics.total,
      avgRate: metrics.avgRate,
      avgDepth: metrics.avgDepth,
      recoilScore: metrics.recoilScore,
      grade: grade
    });

    const modal = document.getElementById('modal-exam');
    if (modal) modal.classList.add('active');

    if (score >= 80) {
      window.app.audio.playSuccessFanfare();
      if (window.confetti) window.confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
      this.speech.speak(\`Examination complete. Excellent work with an overall score of \${score} percent. \${grade}.\`);
    } else {
      this.speech.speak(\`Examination complete. Overall score: \${score} percent. Continue practicing to refine technique.\`);
    }
  }
}

// 13. CENTRAL APPLICATION MANAGER
class ApplicationManager {
  constructor() {
    this.audio = new AudioEngine();
    this.speech = new SpeechEngine();
    this.platform = new PlatformDetection();
    this.storage = new DataStorage();
    this.cpr = new CPREngine(this.audio, this.platform);
    this.aed = new AEDSystem(this.audio, this.speech);
    this.instructor = new AIInstructor(this.speech);
    this.lessons = new LessonManager(this.storage, this.speech);
    this.scenarios = null;
    this.exam = null;
    this.ecg = null;
    this.currentMode = 'learning';
    this.currentEnv = 'er';
  }

  async boot() {
    console.log("Booting CPR-VR Simulation Engine (Optimized & Clean)...");
    await this.platform.detect();

    this.ecg = new ECGMonitor('ecg-canvas', this.audio);
    this.ecg.start();

    this.scenarios = new ScenarioManager(this.audio, this.speech, this.ecg);
    this.exam = new ExamManager(this.cpr, this.storage, this.speech);

    this.lessons.renderCurriculumList();
    this.wireUIEvents();
    this.wireKeyboardShortcuts();
    this.wireAFrameInteractions();

    setInterval(() => this.tickSessionTimer(), 1000);

    setTimeout(() => {
      this.speech.speak("Welcome to CPR-VR. Stand directly over patient's chest. Maintain 100-120 BPM rhythm and allow full recoil.");
    }, 1000);
  }

  setCameraView(preset) {
    const camRig = document.getElementById('cameraRig');
    const cam = document.getElementById('camera');
    if (!camRig || !cam) return;

    document.querySelectorAll('.camera-pill-btn').forEach(b => b.classList.toggle('active', b.dataset.cam === preset));

    if (preset === 'bedside') {
      // Natural Rescuer POV standing right at patient bedside looking down
      camRig.setAttribute('position', '0.55 0 0.1');
      cam.setAttribute('position', '0 1.38 0');
      cam.setAttribute('rotation', '-22 80 0');
    } else if (preset === 'topdown') {
      // Direct Top-Down Chest view
      camRig.setAttribute('position', '0 0 -0.2');
      cam.setAttribute('position', '0 2.0 0');
      cam.setAttribute('rotation', '-88 0 0');
    } else if (preset === 'wide') {
      // Room Overview
      camRig.setAttribute('position', '0 0 1.6');
      cam.setAttribute('position', '0 1.55 0');
      cam.setAttribute('rotation', '-8 0 0');
    } else if (preset === 'monitor') {
      // Close-up on Vitals Monitor & Patient
      camRig.setAttribute('position', '-0.3 0 -0.1');
      cam.setAttribute('position', '0 1.4 0');
      cam.setAttribute('rotation', '-15 -40 0');
    }
  }

  setMode(mode) {
    this.currentMode = mode;
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    const banner = document.getElementById('banner-feedback');
    const ghostHands = document.getElementById('ghost-hands');

    if (mode === 'learning') {
      if (banner) banner.textContent = "LEARNING MODE: STEP-BY-STEP GUIDED TUTORIAL";
      if (ghostHands) ghostHands.setAttribute('visible', 'true');
      this.audio.startMetronome(110);
      this.speech.speak("Learning mode active. Observe anatomical landmarks and ghost hands for optimal technique.");
    } else if (mode === 'practice') {
      if (banner) banner.textContent = "FREE PRACTICE MODE: REAL-TIME TELEMETRY MONITORING";
      if (ghostHands) ghostHands.setAttribute('visible', 'false');
      this.speech.speak("Practice mode active. Practice continuous chest compressions with real-time feedback.");
    } else if (mode === 'emergency') {
      if (ghostHands) ghostHands.setAttribute('visible', 'false');
      this.openScenariosModal();
    } else if (mode === 'exam') {
      this.exam.startExam();
    } else if (mode === 'instructor') {
      const modal = document.getElementById('modal-instructor');
      if (modal) modal.classList.add('active');
    }
  }

  setEnvironment(envKey) {
    this.currentEnv = envKey;
    ['er', 'icu', 'ambulance', 'lab'].forEach(key => {
      const el = document.getElementById(\`env-\${key}\`);
      if (el) el.setAttribute('visible', key === envKey);
    });
    const select = document.getElementById('select-env');
    if (select) select.value = envKey;
  }

  setPatientType(patientKey) {
    CPRConfig.patientType = patientKey;
    this.cpr.setPatient(patientKey);
    const select = document.getElementById('select-patient');
    if (select) select.value = patientKey;
    this.speech.speak(\`Patient profile switched to \${CPRConfig.patients[patientKey].name}.\`);
  }

  tickSessionTimer() {
    const elapsedSec = Math.floor((Date.now() - this.cpr.sessionStartTime) / 1000);
    const min = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
    const sec = String(elapsedSec % 60).padStart(2, '0');
    const timerEl = document.getElementById('stat-session-timer');
    if (timerEl) timerEl.textContent = \`\${min}:\${sec}\`;
  }

  openDashboardModal() {
    const modal = document.getElementById('modal-dashboard');
    if (!modal) return;

    const records = this.storage.getRecords();
    const totalSessionsEl = document.getElementById('dash-total-sessions');
    const totalCompEl = document.getElementById('dash-total-compressions');
    const avgRateEl = document.getElementById('dash-avg-rate');
    const depthAccEl = document.getElementById('dash-depth-acc');
    const tbody = document.getElementById('dash-history-tbody');

    if (totalSessionsEl) totalSessionsEl.textContent = records.length;
    let sumComp = this.cpr.totalCompressions;
    records.forEach(r => sumComp += (r.compressions || 0));
    if (totalCompEl) totalCompEl.textContent = sumComp;

    const metrics = this.cpr.getMetricsSummary();
    if (avgRateEl) avgRateEl.textContent = \`\${metrics.avgRate} BPM\`;
    if (depthAccEl) depthAccEl.textContent = "94%";

    if (tbody) {
      tbody.innerHTML = '';
      if (records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color:var(--text-muted);">No recorded sessions yet.</td></tr>';
      } else {
        records.forEach(r => {
          const tr = document.createElement('tr');
          tr.innerHTML = \`
            <td>\${r.date}</td>
            <td>\${r.mode}</td>
            <td>\${r.patient}</td>
            <td>\${r.compressions}</td>
            <td>\${r.avgRate} BPM</td>
            <td>\${r.avgDepth} cm</td>
            <td>\${r.recoilScore}%</td>
            <td><strong style="color:var(--accent-green);">\${r.grade}</strong></td>
          \`;
          tbody.appendChild(tr);
        });
      }
    }

    modal.classList.add('active');
    this.drawAnalyticsChart();
  }

  drawAnalyticsChart() {
    const canvas = document.getElementById('analytics-chart-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Target zone green band
    ctx.fillStyle = "rgba(0, 255, 136, 0.15)";
    ctx.fillRect(0, h * 0.3, w, h * 0.35);

    // Grid lines
    ctx.strokeStyle = "rgba(0, 240, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let y = 20; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const history = this.cpr.depthHistory.slice(-40);
    if (history.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 2.5;
      const step = w / (history.length - 1);
      history.forEach((d, i) => {
        const y = h - (d / 7.0) * h;
        if (i === 0) ctx.moveTo(0, y);
        else ctx.lineTo(i * step, y);
      });
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 2;
      for (let x = 0; x < w; x += 5) {
        const y = (h / 2) + Math.sin(x * 0.05) * 22;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  openScenariosModal() {
    const modal = document.getElementById('modal-scenarios');
    const grid = document.getElementById('scenarios-grid');
    if (!modal || !grid) return;
    grid.innerHTML = '';

    this.scenarios.getScenariosList().forEach(s => {
      const card = document.createElement('div');
      card.className = "stat-card";
      card.style.cursor = "pointer";
      card.innerHTML = \`
        <div style="font-family:var(--font-tech); font-size:0.82rem; color:var(--accent-cyan); margin-bottom:4px;">\${s.title}</div>
        <div style="font-size:0.72rem; color:var(--accent-green); margin-bottom:6px;">Patient: \${s.patient}</div>
        <p style="font-size:0.75rem; color:#cbd5e1; line-height:1.4; margin-bottom:8px;">\${s.description}</p>
        <button class="btn-cpr-compress" style="font-size:0.75rem; padding:6px 12px; width:100%; justify-content:center;">Launch Scenario &#x25B6;</button>
      \`;
      card.addEventListener('click', () => {
        modal.classList.remove('active');
        this.scenarios.startScenario(s.id);
      });
      grid.appendChild(card);
    });

    modal.classList.add('active');
  }

  wireUIEvents() {
    // Mode switcher buttons
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => this.setMode(btn.dataset.mode));
    });

    // Camera viewpoint pills
    document.querySelectorAll('.camera-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => this.setCameraView(btn.dataset.cam));
    });

    // Selectors
    const selectEnv = document.getElementById('select-env');
    if (selectEnv) selectEnv.addEventListener('change', (e) => this.setEnvironment(e.target.value));
    const selectPatient = document.getElementById('select-patient');
    if (selectPatient) selectPatient.addEventListener('change', (e) => this.setPatientType(e.target.value));

    // Sliding Drawer open/close toggles
    const btnOpenLeft = document.getElementById('btn-open-left-drawer');
    const btnCloseLeft = document.getElementById('btn-close-left-drawer');
    const leftDrawer = document.getElementById('left-drawer');
    if (btnOpenLeft && leftDrawer) {
      btnOpenLeft.addEventListener('click', () => leftDrawer.classList.toggle('open'));
    }
    if (btnCloseLeft && leftDrawer) {
      btnCloseLeft.addEventListener('click', () => leftDrawer.classList.remove('open'));
    }

    const btnOpenRight = document.getElementById('btn-open-right-drawer');
    const btnCloseRight = document.getElementById('btn-close-right-drawer');
    const rightDrawer = document.getElementById('right-drawer');
    if (btnOpenRight && rightDrawer) {
      btnOpenRight.addEventListener('click', () => rightDrawer.classList.toggle('open'));
    }
    if (btnCloseRight && rightDrawer) {
      btnCloseRight.addEventListener('click', () => rightDrawer.classList.remove('open'));
    }

    // Direct Action buttons
    const btnCompress = document.getElementById('btn-compress');
    if (btnCompress) {
      btnCompress.addEventListener('mousedown', () => {
        this.audio.init();
        this.cpr.deliverCompression();
      });
    }

    const btnVentilate = document.getElementById('btn-ventilate');
    if (btnVentilate) {
      btnVentilate.addEventListener('click', () => {
        this.audio.init();
        this.cpr.deliverVentilation();
      });
    }

    const btnAed = document.getElementById('btn-aed-power');
    if (btnAed) {
      btnAed.addEventListener('click', () => {
        this.audio.init();
        this.aed.togglePower();
      });
    }

    // Metronome toggle
    const btnMetro = document.getElementById('btn-toggle-metro');
    if (btnMetro) {
      btnMetro.addEventListener('click', () => {
        this.audio.init();
        const active = this.audio.toggleMetronome(110);
        btnMetro.classList.toggle('active', active);
      });
    }

    // Audio toggle
    const btnAudio = document.getElementById('btn-toggle-audio');
    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        this.audio.isAudioEnabled = !this.audio.isAudioEnabled;
        btnAudio.classList.toggle('active', this.audio.isAudioEnabled);
      });
    }

    // Modals
    const btnDash = document.getElementById('btn-open-dashboard');
    if (btnDash) btnDash.addEventListener('click', () => this.openDashboardModal());

    const btnSettings = document.getElementById('btn-open-settings');
    if (btnSettings) {
      btnSettings.addEventListener('click', () => {
        const modal = document.getElementById('modal-settings');
        if (modal) modal.classList.add('active');
      });
    }

    const btnHelp = document.getElementById('btn-open-help');
    if (btnHelp) {
      btnHelp.addEventListener('click', () => {
        const modal = document.getElementById('modal-controls');
        if (modal) modal.classList.add('active');
      });
    }

    document.querySelectorAll('.modal-close-btn, [data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetModalId = btn.getAttribute('data-close') || btn.closest('.modal-overlay').id;
        const modal = document.getElementById(targetModalId);
        if (modal) modal.classList.remove('active');
      });
    });

    // Ask Doctor
    const btnAsk = document.getElementById('btn-ask-doctor');
    const inputAsk = document.getElementById('input-ask-doctor');
    if (btnAsk && inputAsk) {
      btnAsk.addEventListener('click', () => {
        if (inputAsk.value.trim().length > 0) {
          this.instructor.askQuestion(inputAsk.value.trim());
          inputAsk.value = '';
        }
      });
      inputAsk.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && inputAsk.value.trim().length > 0) {
          this.instructor.askQuestion(inputAsk.value.trim());
          inputAsk.value = '';
        }
      });
    }

    document.querySelectorAll('.quick-q-btn').forEach(btn => {
      btn.addEventListener('click', () => this.instructor.askQuestion(btn.getAttribute('data-q')));
    });

    // CSV & Print
    const btnExport = document.getElementById('btn-export-csv');
    if (btnExport) btnExport.addEventListener('click', () => this.storage.exportCSV());

    const btnClear = document.getElementById('btn-clear-history');
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        if (confirm("Reset and clear all saved student CPR records?")) {
          this.storage.clearRecords();
          this.openDashboardModal();
        }
      });
    }

    const btnPrint = document.getElementById('btn-print-cert');
    if (btnPrint) btnPrint.addEventListener('click', () => window.print());

    const inputCertName = document.getElementById('input-cert-name');
    const btnUpdateName = document.getElementById('btn-update-cert-name');
    if (inputCertName && btnUpdateName) {
      btnUpdateName.addEventListener('click', () => {
        const certName = document.getElementById('cert-student-name');
        if (certName && inputCertName.value.trim().length > 0) {
          certName.textContent = inputCertName.value.trim();
        }
      });
    }

    // Arrhythmias
    document.querySelectorAll('.rhythm-btn[data-rhythm]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.rhythm-btn[data-rhythm]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.ecg.setRhythm(btn.getAttribute('data-rhythm'));
        this.speech.speak(\`Instructor injected rhythm: \${btn.textContent.trim()}.\`);
      });
    });
  }

  wireKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space' || e.code === 'KeyE') {
        e.preventDefault();
        this.audio.init();
        this.cpr.deliverCompression();
      } else if (e.code === 'KeyB') {
        e.preventDefault();
        this.audio.init();
        this.cpr.deliverVentilation();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        this.audio.init();
        const active = this.audio.toggleMetronome(110);
        const btnMetro = document.getElementById('btn-toggle-metro');
        if (btnMetro) btnMetro.classList.toggle('active', active);
      } else if (e.code === 'Tab') {
        e.preventDefault();
        this.openDashboardModal();
      } else if (e.code === 'Digit1') {
        this.setEnvironment('er');
      } else if (e.code === 'Digit2') {
        this.setEnvironment('icu');
      } else if (e.code === 'Digit3') {
        this.setEnvironment('ambulance');
      } else if (e.code === 'Digit4') {
        this.setEnvironment('lab');
      } else if (e.code === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        const lDrawer = document.getElementById('left-drawer');
        const rDrawer = document.getElementById('right-drawer');
        if (lDrawer) lDrawer.classList.remove('open');
        if (rDrawer) rDrawer.classList.remove('open');
      }
    });
  }

  wireAFrameInteractions() {
    const chestPlate = document.getElementById('chest-plate');
    if (chestPlate) {
      chestPlate.addEventListener('click', () => {
        this.audio.init();
        this.cpr.deliverCompression();
      });
    }

    const chin = document.getElementById('mannequin-chin');
    if (chin) {
      chin.addEventListener('click', () => {
        this.audio.init();
        this.cpr.toggleAirwayTilt();
      });
    }

    const aedPower3d = document.getElementById('aed-power-btn-3d');
    if (aedPower3d) {
      aedPower3d.addEventListener('click', () => {
        this.audio.init();
        this.aed.togglePower();
      });
    }

    const aedShock3d = document.getElementById('aed-shock-btn-3d');
    if (aedShock3d) {
      aedShock3d.addEventListener('click', () => {
        this.audio.init();
        this.aed.deliverShock();
      });
    }

    const pad1_3d = document.getElementById('aed-pad-1-3d');
    if (pad1_3d) {
      pad1_3d.addEventListener('click', () => {
        this.audio.init();
        this.aed.attachPad(1);
      });
    }

    const pad2_3d = document.getElementById('aed-pad-2-3d');
    if (pad2_3d) {
      pad2_3d.addEventListener('click', () => {
        this.audio.init();
        this.aed.attachPad(2);
      });
    }

    // VR Floating Menu Buttons
    const vrBtnLearning = document.getElementById('vr-btn-learning');
    if (vrBtnLearning) vrBtnLearning.addEventListener('click', () => this.setMode('learning'));
    const vrBtnPractice = document.getElementById('vr-btn-practice');
    if (vrBtnPractice) vrBtnPractice.addEventListener('click', () => this.setMode('practice'));
    const vrBtnEmergency = document.getElementById('vr-btn-emergency');
    if (vrBtnEmergency) vrBtnEmergency.addEventListener('click', () => this.setMode('emergency'));
    const vrBtnExam = document.getElementById('vr-btn-exam');
    if (vrBtnExam) vrBtnExam.addEventListener('click', () => this.setMode('exam'));
    const vrBtnMetro = document.getElementById('vr-btn-metro');
    if (vrBtnMetro) {
      vrBtnMetro.addEventListener('click', () => {
        const active = this.audio.toggleMetronome(110);
        const txt = document.getElementById('vr-metro-text');
        if (txt) txt.setAttribute('value', active ? "METRONOME: ON" : "METRONOME: OFF");
      });
    }
  }
}

// 14. BOOTSTRAP HOOK
window.addEventListener('DOMContentLoaded', () => {
  window.app = new ApplicationManager();
  window.app.boot();
});
`;
