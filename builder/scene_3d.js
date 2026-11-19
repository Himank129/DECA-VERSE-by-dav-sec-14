module.exports = `
  <!-- A-Frame 3D WebXR Scene Container -->
  <div id="aframe-container">
    <a-scene
      renderer="antialias: true; colorManagement: true; physicallyCorrectLights: true; alpha: false;"
      webxr="requiredFeatures: local-floor; optionalFeatures: hand-tracking, hit-test;"
      vr-mode-ui="enabled: true"
      embedded
      style="width: 100%; height: 100%;"
    >
      <!-- Optimized Realistic Medical Lighting -->
      <a-light type="ambient" color="#b0bec5" intensity="0.65"></a-light>
      <a-light type="directional" color="#ffffff" intensity="0.85" position="1.5 4 1.5" castShadow="false"></a-light>
      <a-light type="point" color="#e0f7fa" intensity="0.4" position="0 2.8 -0.2"></a-light>

      <!-- Rescuer Camera Rig (Positioned naturally at patient bedside) -->
      <a-entity id="cameraRig" position="0.55 0 0.1" rotation="0 0 0">
        <!-- Desktop Camera & Cursor -->
        <a-entity id="camera" camera position="0 1.38 0" rotation="-22 80 0" look-controls="pointerLockEnabled: false" wasd-controls="acceleration: 15">
          <a-cursor
            id="desktop-cursor"
            color="#00f0ff"
            opacity="0.85"
            fuse="false"
            raycaster="objects: .clickable; far: 20"
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.012; radiusOuter: 0.02"
          ></a-cursor>
        </a-entity>

        <!-- Meta Quest 3S VR Motion Controllers -->
        <a-entity
          id="leftHand"
          laser-controls="hand: left"
          oculus-touch-controls="hand: left"
          raycaster="objects: .clickable; far: 12"
          line="color: #00f0ff; opacity: 0.75"
        ></a-entity>

        <a-entity
          id="rightHand"
          laser-controls="hand: right"
          oculus-touch-controls="hand: right"
          raycaster="objects: .clickable; far: 12"
          line="color: #ff3366; opacity: 0.75"
        ></a-entity>

        <!-- In-VR Floating Quick Menu (for Quest 3S Controllers) -->
        <a-entity id="vr-floating-menu" position="-0.75 1.35 -0.6" rotation="0 40 0">
          <a-plane width="0.7" height="0.8" color="#091220" opacity="0.94" material="shader: flat;">
            <a-text value="CPR-VR MENU" align="center" color="#00f0ff" position="0 0.32 0.01" width="1.6" font="roboto"></a-text>

            <a-plane class="clickable vr-btn" id="vr-btn-learning" position="0 0.2 0.02" width="0.6" height="0.075" color="#0077ff">
              <a-text value="LEARNING MODE" align="center" color="#ffffff" position="0 0 0.01" width="1.4"></a-text>
            </a-plane>
            <a-plane class="clickable vr-btn" id="vr-btn-practice" position="0 0.1 0.02" width="0.6" height="0.075" color="#162a4b">
              <a-text value="FREE PRACTICE" align="center" color="#ffffff" position="0 0 0.01" width="1.4"></a-text>
            </a-plane>
            <a-plane class="clickable vr-btn" id="vr-btn-emergency" position="0 0.0 0.02" width="0.6" height="0.075" color="#162a4b">
              <a-text value="EMERGENCY SIM" align="center" color="#ffffff" position="0 0 0.01" width="1.4"></a-text>
            </a-plane>
            <a-plane class="clickable vr-btn" id="vr-btn-exam" position="0 -0.1 0.02" width="0.6" height="0.075" color="#162a4b">
              <a-text value="EXAMINATION" align="center" color="#ffffff" position="0 0 0.01" width="1.4"></a-text>
            </a-plane>
            <a-plane class="clickable vr-btn" id="vr-btn-metro" position="0 -0.2 0.02" width="0.6" height="0.075" color="#00ff88">
              <a-text value="METRONOME: ON" id="vr-metro-text" align="center" color="#040810" position="0 0 0.01" width="1.4"></a-text>
            </a-plane>
            <a-plane class="clickable vr-btn" id="vr-btn-reset" position="0 -0.3 0.02" width="0.6" height="0.065" color="#ff3366">
              <a-text value="RESET SCENARIO" align="center" color="#ffffff" position="0 0 0.01" width="1.3"></a-text>
            </a-plane>
          </a-plane>
        </a-entity>
      </a-entity>

      <!-- ==================== 4 SWITCHABLE 3D ENVIRONMENTS ==================== -->
      <a-entity id="env-root">
        <!-- 1. HOSPITAL EMERGENCY ROOM (High Realism) -->
        <a-entity id="env-er" visible="true">
          <!-- Medical floor with demarcated trauma zone -->
          <a-plane position="0 0 0" rotation="-90 0 0" width="18" height="18" color="#cfd8dc" roughness="0.35"></a-plane>
          <a-plane position="0 0.005 -0.2" rotation="-90 0 0" width="3.4" height="2.8" color="#b0bec5" opacity="0.6"></a-plane>

          <!-- Clean Hospital Walls -->
          <a-plane position="0 2.4 -4.5" width="18" height="4.8" color="#eceff1"></a-plane>
          <a-plane position="-6 2.4 0" rotation="0 90 0" width="18" height="4.8" color="#e0e0e0"></a-plane>
          <a-plane position="6 2.4 0" rotation="0 -90 0" width="18" height="4.8" color="#e0e0e0"></a-plane>

          <!-- Overhead Surgical/Exam Lighting -->
          <a-box position="0 3.8 -0.2" width="1.6" height="0.06" depth="1.0" color="#ffffff" material="emissive: #ffffff; emissiveIntensity: 0.9;"></a-box>
          <a-cylinder position="0 4.1 -0.2" radius="0.04" height="0.6" color="#90a4ae"></a-cylinder>

          <!-- Architectural Medical Gas Wall Unit -->
          <a-entity position="0 1.9 -4.46">
            <a-box width="2.0" height="0.38" depth="0.06" color="#ffffff" roughness="0.5"></a-box>
            <!-- O2 Green -->
            <a-cylinder position="-0.55 0 0.04" rotation="90 0 0" radius="0.06" height="0.04" color="#2e7d32"></a-cylinder>
            <a-text value="O2" position="-0.55 -0.12 0.05" align="center" color="#2e7d32" width="1.2"></a-text>
            <!-- Air Yellow -->
            <a-cylinder position="0 0 0.04" rotation="90 0 0" radius="0.06" height="0.04" color="#fbc02d"></a-cylinder>
            <a-text value="AIR" position="0 -0.12 0.05" align="center" color="#fbc02d" width="1.2"></a-text>
            <!-- Vac Blue -->
            <a-cylinder position="0.55 0 0.04" rotation="90 0 0" radius="0.06" height="0.04" color="#1976d2"></a-cylinder>
            <a-text value="VAC" position="0.55 -0.12 0.05" align="center" color="#1976d2" width="1.2"></a-text>
          </a-entity>

          <!-- Emergency Crash Cart (Lifepak / Red Emergency Trolley) -->
          <a-entity id="crash-cart" position="-1.4 0 -1.0" rotation="0 45 0">
            <a-box position="0 0.52 0" width="0.65" height="1.04" depth="0.55" color="#c62828" roughness="0.4"></a-box>
            <a-box position="0 1.05 0" width="0.7" height="0.03" depth="0.6" color="#eceff1" metalness="0.5"></a-box>
            <!-- Drawer details -->
            <a-box position="0 0.85 0.28" width="0.56" height="0.14" depth="0.02" color="#b71c1c"></a-box>
            <a-box position="0 0.65 0.28" width="0.56" height="0.14" depth="0.02" color="#b71c1c"></a-box>
            <a-box position="0 0.45 0.28" width="0.56" height="0.14" depth="0.02" color="#b71c1c"></a-box>
            <!-- Sharps disposal bin -->
            <a-box position="0.22 1.18 0.1" width="0.16" height="0.22" depth="0.16" color="#fbc02d"></a-box>
            <!-- Low-profile castor wheels under cart -->
            <a-cylinder position="-0.26 0.05 0.2" radius="0.04" height="0.04" color="#37474f"></a-cylinder>
            <a-cylinder position="0.26 0.05 0.2" radius="0.04" height="0.04" color="#37474f"></a-cylinder>
            <a-cylinder position="-0.26 0.05 -0.2" radius="0.04" height="0.04" color="#37474f"></a-cylinder>
            <a-cylinder position="0.26 0.05 -0.2" radius="0.04" height="0.04" color="#37474f"></a-cylinder>
          </a-entity>

          <!-- Chrome Telescoping IV Pole with Saline Bag -->
          <a-entity position="-1.1 0 0.6">
            <a-cylinder position="0 1.05 0" radius="0.015" height="2.1" color="#cfd8dc" metalness="0.85"></a-cylinder>
            <a-cylinder position="0 0.04 0" radius="0.25" height="0.03" color="#455a64"></a-cylinder>
            <a-box position="0 2.1 0" width="0.35" height="0.02" depth="0.02" color="#cfd8dc"></a-box>
            <!-- Saline IV Drip Bag -->
            <a-box position="-0.12 1.95 0" width="0.12" height="0.22" depth="0.03" color="#e1f5fe" opacity="0.85"></a-box>
            <a-cylinder position="-0.12 1.5 0" radius="0.004" height="0.7" color="#ffffff" opacity="0.6"></a-cylinder>
          </a-entity>

          <!-- Bedside Multi-Parameter Monitor (Mindray/Philips style) -->
          <a-entity position="-0.85 0 -0.8" rotation="0 35 0">
            <a-cylinder position="0 0.6 0" radius="0.035" height="1.2" color="#546e7a"></a-cylinder>
            <a-cylinder position="0 0.03 0" radius="0.28" height="0.04" color="#37474f"></a-cylinder>
            <!-- Monitor Box -->
            <a-box position="0 1.35 0" width="0.55" height="0.4" depth="0.09" color="#263238" roughness="0.5"></a-box>
            <!-- Glowing Display Screen -->
            <a-plane position="0 1.35 0.048" width="0.5" height="0.34" color="#020813" material="emissive: #00f0ff; emissiveIntensity: 0.18;">
              <a-text value="HR: 72 BPM | SpO2: 98%" position="0 0.11 0.01" align="center" color="#00ff88" width="1.1"></a-text>
              <a-text value="BP: 120/80 (93) | ART" position="0 -0.11 0.01" align="center" color="#00f0ff" width="1.1"></a-text>
            </a-plane>
          </a-entity>
        </a-entity>

        <!-- 2. INTENSIVE CARE UNIT (ICU) -->
        <a-entity id="env-icu" visible="false">
          <a-plane position="0 0 0" rotation="-90 0 0" width="18" height="18" color="#162232"></a-plane>
          <a-plane position="0 2.4 -4.5" width="18" height="4.8" color="#0c1626"></a-plane>
          <a-plane position="-5.5 2.4 0" rotation="0 90 0" width="18" height="4.8" color="#111f33" opacity="0.9"></a-plane>
          <a-plane position="5.5 2.4 0" rotation="0 -90 0" width="18" height="4.8" color="#111f33" opacity="0.9"></a-plane>

          <!-- Mechanical ICU Ventilator -->
          <a-entity position="-1.2 0 -0.6" rotation="0 35 0">
            <a-box position="0 0.65 0" width="0.45" height="1.3" depth="0.45" color="#37474f"></a-box>
            <a-plane position="0 1.15 0.23" width="0.36" height="0.26" color="#001122" material="emissive: #00f0ff; emissiveIntensity: 0.4;">
              <a-text value="VENTILATOR ON\\nVT: 450 mL | PEEP: 5" align="center" color="#00ff88" width="1.1"></a-text>
            </a-plane>
          </a-entity>
        </a-entity>

        <!-- 3. MOBILE AMBULANCE UNIT -->
        <a-entity id="env-ambulance" visible="false">
          <a-plane position="0 0 0" rotation="-90 0 0" width="4.0" height="6.5" color="#455a64"></a-plane>
          <a-plane position="0 1.4 -3.0" width="4.0" height="2.8" color="#cfd8dc"></a-plane>
          <a-plane position="-2.0 1.4 0" rotation="0 90 0" width="6.5" height="2.8" color="#eceff1"></a-plane>
          <a-plane position="2.0 1.4 0" rotation="0 -90 0" width="6.5" height="2.8" color="#eceff1"></a-plane>
          <a-plane position="0 2.7 0" rotation="90 0 0" width="4.0" height="6.5" color="#ffffff"></a-plane>
          <a-cylinder position="0 2.55 0" rotation="90 0 0" radius="0.02" height="5.0" color="#fbc02d"></a-cylinder>
        </a-entity>

        <!-- 4. CPR TRAINING SIMULATION LAB -->
        <a-entity id="env-lab" visible="false">
          <a-plane position="0 0 0" rotation="-90 0 0" width="18" height="18" color="#bcaaa4"></a-plane>
          <a-plane position="0 2.4 -4.5" width="18" height="4.8" color="#f5f5f5"></a-plane>
          <a-box position="2.2 0.5 -2.0" width="0.7" height="1.0" depth="0.5" color="#5d4037"></a-box>
        </a-entity>
      </a-entity>

      <!-- ==================== REALISTIC HOSPITAL STRETCHER / GURNEY ==================== -->
      <a-entity id="patient-bed" position="0 0 -0.2">
        <!-- Low-profile undercarriage frame (Never blocks rescuer view) -->
        <a-box position="0 0.35 0" width="0.75" height="0.08" depth="1.85" color="#37474f"></a-box>
        <!-- Hydraulic Lift Column -->
        <a-cylinder position="0 0.22 0" radius="0.08" height="0.25" color="#263238"></a-cylinder>
        <!-- Four low industrial castor wheels tucked underneath -->
        <a-cylinder position="-0.32 0.06 0.75" radius="0.05" height="0.04" color="#212121"></a-cylinder>
        <a-cylinder position="0.32 0.06 0.75" radius="0.05" height="0.04" color="#212121"></a-cylinder>
        <a-cylinder position="-0.32 0.06 -0.75" radius="0.05" height="0.04" color="#212121"></a-cylinder>
        <a-cylinder position="0.32 0.06 -0.75" radius="0.05" height="0.04" color="#212121"></a-cylinder>

        <!-- Crisp Contoured Medical Mattress -->
        <a-box position="0 0.52 0" width="0.82" height="0.14" depth="1.95" color="#f0f4f8" roughness="0.65"></a-box>
        <!-- Hospital Patient Head Pillow -->
        <a-box position="0 0.63 -0.75" width="0.55" height="0.08" depth="0.3" color="#ffffff" roughness="0.5"></a-box>

        <!-- Collapsible Stainless Side Rails (Folded Down for Full Unobstructed Rescuer Access) -->
        <a-cylinder position="-0.42 0.48 0" rotation="90 0 0" radius="0.015" height="1.2" color="#b0bec5" metalness="0.8"></a-cylinder>
        <a-cylinder position="0.42 0.48 0" rotation="90 0 0" radius="0.015" height="1.2" color="#b0bec5" metalness="0.8"></a-cylinder>
      </a-entity>

      <!-- ==================== REALISTIC ANATOMICAL PATIENT MANIKIN ==================== -->
      <!-- Styled like a high-end Laerdal Resusci Anne / SimMan clinical training mannequin -->
      <a-entity id="mannequin-rig" position="0 0.62 -0.2">
        <!-- Head & Airway Tilt Assembly -->
        <a-entity id="head-pivot" position="0 0.08 -0.75" rotation="0 0 0">
          <!-- Anatomical Head (Sculpted Medical Silicone) -->
          <a-sphere position="0 0.06 0" radius="0.11" color="#e0b288" roughness="0.6" class="clickable" id="mannequin-head"></a-sphere>
          <!-- Nose Bridge & Closed Eyelids -->
          <a-box position="0 0.07 0.11" width="0.03" height="0.06" depth="0.04" color="#d49e72"></a-box>
          <!-- Defined Mandible & Chin (Clickable for Head-Tilt Chin-Lift Airway Maneuver) -->
          <a-box
            id="mannequin-chin"
            class="clickable"
            position="0 -0.02 0.1"
            width="0.07"
            height="0.05"
            depth="0.07"
            color="#c99266"
            title="Click Chin to Perform Head-Tilt Chin-Lift Airway Maneuver"
          ></a-box>
          <!-- Airway Open Status Visual Marker -->
          <a-sphere id="airway-indicator" position="0 0.18 0.02" radius="0.025" color="#ff3366"></a-sphere>
        </a-entity>

        <!-- Anatomical Neck with Carotid Pulse Zone -->
        <a-cylinder position="0 0.04 -0.6" radius="0.055" height="0.1" color="#e0b288"></a-cylinder>

        <!-- Upper Torso / Ribcage Cavity -->
        <a-box position="0 0.02 -0.2" width="0.46" height="0.18" depth="0.68" color="#d49e72"></a-box>

        <!-- Open Hospital Training Jersey / Gown exposing the chest -->
        <a-box position="-0.22 0.02 -0.2" width="0.04" height="0.19" depth="0.69" color="#0288d1"></a-box>
        <a-box position="0.22 0.02 -0.2" width="0.04" height="0.19" depth="0.69" color="#0288d1"></a-box>

        <!-- Moveable Animated Sternum Plate (Direct CPR Compression Target) -->
        <a-entity id="chest-compression-assembly" position="0 0.11 -0.2">
          <a-box
            id="chest-plate"
            class="clickable"
            position="0 0 0"
            width="0.36"
            height="0.06"
            depth="0.44"
            color="#e0b288"
            roughness="0.5"
          >
            <!-- Glowing Anatomical Landmark Target Ring (Lower Half of Sternum) -->
            <a-ring
              id="sternum-target-ring"
              position="0 0.032 0.02"
              rotation="-90 0 0"
              radius-inner="0.045"
              radius-outer="0.065"
              color="#00f0ff"
              material="emissive: #00f0ff; emissiveIntensity: 0.9;"
            ></a-ring>

            <!-- Anatomical Inter-Mammary Landmark Reference Line -->
            <a-plane
              position="0 0.032 -0.05"
              rotation="-90 0 0"
              width="0.3"
              height="0.012"
              color="#ffffff"
              opacity="0.6"
            ></a-plane>

            <!-- Xiphoid Process Caution Notch (Too low danger zone) -->
            <a-triangle
              position="0 0.032 0.14"
              rotation="-90 0 0"
              vertex-a="0 0.025 0"
              vertex-b="-0.025 -0.025 0"
              vertex-c="0.025 -0.025 0"
              color="#ff3366"
              opacity="0.85"
            ></a-triangle>

            <!-- Ghost Hands Demonstration Overlay (Active in Learning Mode) -->
            <a-entity id="ghost-hands" position="0 0.045 0.02" visible="true">
              <a-box position="0 0 0" width="0.1" height="0.025" depth="0.09" color="#00f0ff" opacity="0.45"></a-box>
              <a-box position="0 0.025 0.015" rotation="0 15 0" width="0.1" height="0.025" depth="0.09" color="#00ff88" opacity="0.45"></a-box>
            </a-entity>
          </a-box>
        </a-entity>

        <!-- Arms Resting in Natural Supine Posture beside torso -->
        <a-cylinder position="-0.28 0.0 -0.2" radius="0.045" height="0.64" color="#e0b288"></a-cylinder>
        <a-cylinder position="0.28 0.0 -0.2" radius="0.045" height="0.64" color="#e0b288"></a-cylinder>

        <!-- Lower Body in Hospital Drape / Scrubs -->
        <a-box position="0 -0.01 0.25" width="0.42" height="0.16" depth="0.32" color="#0288d1"></a-box>
        <a-cylinder position="-0.13 -0.02 0.72" radius="0.065" height="0.75" color="#0288d1"></a-cylinder>
        <a-cylinder position="0.13 -0.02 0.72" radius="0.065" height="0.75" color="#0288d1"></a-cylinder>
      </a-entity>

      <!-- ==================== MODERN AED DEFIBRILLATOR ON MAYO STAND ==================== -->
      <a-entity id="aed-stand-assembly" position="0.52 0 -0.65" rotation="0 -35 0">
        <!-- Sleek Hospital Mobile Tray Stand -->
        <a-cylinder position="0 0.45 0" radius="0.02" height="0.9" color="#b0bec5" metalness="0.7"></a-cylinder>
        <a-cylinder position="0 0.02 0" radius="0.22" height="0.03" color="#37474f"></a-cylinder>
        <a-box position="0 0.9 0" width="0.4" height="0.03" depth="0.4" color="#eceff1" metalness="0.4"></a-box>

        <!-- Detailed AED Unit (Zoll / Philips HeartStart style) -->
        <a-entity id="aed-unit-3d" position="0 0.94 0">
          <!-- AED Box -->
          <a-box position="0 0.04 0" width="0.28" height="0.08" depth="0.26" color="#d32f2f" roughness="0.4"></a-box>
          <!-- Top Control Plate -->
          <a-box position="0 0.082 0" width="0.26" height="0.008" depth="0.24" color="#ffffff"></a-box>

          <!-- Illuminated Green Power Button -->
          <a-cylinder
            id="aed-power-btn-3d"
            class="clickable"
            position="-0.07 0.092 0.06"
            radius="0.02"
            height="0.015"
            color="#2e7d32"
            material="emissive: #2e7d32; emissiveIntensity: 0.7;"
          ></a-cylinder>
          <a-text value="ON" position="-0.07 0.092 0.09" align="center" color="#ffffff" width="0.5" rotation="-90 0 0"></a-text>

          <!-- Flashing Shock Button (Amber/Red) -->
          <a-cylinder
            id="aed-shock-btn-3d"
            class="clickable"
            position="0.06 0.092 0.06"
            radius="0.025"
            height="0.015"
            color="#ffb700"
            material="emissive: #ffb700; emissiveIntensity: 0.4;"
          ></a-cylinder>
          <a-text value="SHOCK" position="0.06 0.092 0.095" align="center" color="#ffffff" width="0.5" rotation="-90 0 0"></a-text>

          <!-- Backlit LCD Instruction Screen -->
          <a-plane position="0 0.088 -0.04" rotation="-90 0 0" width="0.18" height="0.08" color="#020813">
            <a-text id="aed-screen-text" value="AED READY" align="center" color="#00ff88" width="0.75" position="0 0 0.01"></a-text>
          </a-plane>

          <!-- Defibrillator Electrode Pad 1 (Right Clavicle) -->
          <a-box
            id="aed-pad-1-3d"
            class="clickable"
            position="-0.06 0.094 -0.08"
            width="0.07"
            height="0.008"
            depth="0.055"
            color="#ffffff"
            title="Electrode Pad 1 (Upper Right Chest)"
          >
            <a-cylinder position="0 0.006 0" radius="0.015" height="0.006" color="#0077ff"></a-cylinder>
          </a-box>

          <!-- Defibrillator Electrode Pad 2 (Left Lower Ribs) -->
          <a-box
            id="aed-pad-2-3d"
            class="clickable"
            position="0.06 0.094 -0.08"
            width="0.07"
            height="0.008"
            depth="0.055"
            color="#ffffff"
            title="Electrode Pad 2 (Lower Left Ribcage)"
          >
            <a-cylinder position="0 0.006 0" radius="0.015" height="0.006" color="#0077ff"></a-cylinder>
          </a-box>
        </a-entity>
      </a-entity>

      <!-- ==================== VIRTUAL MEDICAL INSTRUCTOR (DR. AVERY, MD) ==================== -->
      <!-- Standing respectfully across the bed from the rescuer -->
      <a-entity id="avatar-instructor" position="-0.78 0 -0.2" rotation="0 85 0">
        <!-- Physician Uniform / Body -->
        <a-cylinder position="0 0.8 0" radius="0.17" height="0.9" color="#ffffff" roughness="0.7"></a-cylinder>
        <a-cylinder position="0 1.15 0" radius="0.14" height="0.35" color="#ffffff"></a-cylinder>
        <!-- Blue scrubs collar -->
        <a-cylinder position="0 1.25 0" radius="0.11" height="0.08" color="#0288d1"></a-cylinder>
        <!-- Clinician Stethoscope draped neatly -->
        <a-torus position="0 1.22 0.04" rotation="50 0 0" radius="0.09" radius-tubular="0.01" color="#37474f"></a-torus>

        <!-- Realistic Anatomical Head -->
        <a-sphere position="0 1.48 0" radius="0.095" color="#e0ac69"></a-sphere>
        <a-cylinder position="0 1.55 0" radius="0.1" height="0.05" color="#37474f"></a-cylinder>

        <!-- ID Badge & Clipboard -->
        <a-box position="0.06 1.16 0.15" width="0.05" height="0.07" depth="0.008" color="#00f0ff"></a-box>
        <a-box position="-0.14 0.95 0.17" rotation="20 -15 0" width="0.18" height="0.25" depth="0.015" color="#5d4037">
          <a-plane position="0 0 0.01" width="0.15" height="0.22" color="#ffffff">
            <a-text value="CLINICAL EVAL\\n110 BPM TARGET\\n5-6 CM DEPTH" color="#040810" width="0.55" position="0 0.04 0.01" align="center"></a-text>
          </a-plane>
        </a-box>

        <!-- 3D Floating Speech Subtitle Bubble for VR Users -->
        <a-entity id="vr-speech-bubble" position="0 1.85 0" rotation="0 0 0">
          <a-plane width="1.1" height="0.3" color="#091220" opacity="0.92" material="shader: flat;">
            <a-text
              id="vr-speech-text"
              value="Dr. Avery: Maintain 100-120 BPM\\nand full chest recoil."
              align="center"
              color="#00f0ff"
              width="1.6"
              position="0 0 0.01"
            ></a-text>
          </a-plane>
        </a-entity>
      </a-entity>

    </a-scene>
  </div>
`;
