// ═══════════ DATA ═══════════
const SCENARIOS = [
  {
    id: 1,
    label: "REAL",
    isReal: true,
    emoji: "👩‍🏫",
    description: "Teacher lecture. Natural gestures, blinking, and a stable classroom.",
    theme: "Classroom Lecture",
    bg: "#1a3a2a",
    clues: ["Natural blinking pattern", "Consistent lighting", "Background objects stable"],
    clueTypes: ["green","green","green"],
    video: "videos/v1.MOV",
    explanation: "Real. The eyes, lip sync, and background stay consistent.",
    tip: "Real clips usually keep lighting and small facial movements consistent."
  },
  {
    id: 2,
    label: "FAKE",
    isReal: false,
    emoji: "🎙️",
    description: "Celebrity coin trick. Skin looks too smooth and the face blends at the edges.",
    theme: "Celebrity",
    bg: "#2a1a1a",
    clues: ["Face blending artifacts ⚠️", "Too-smooth skin texture", "Subtle facial warping ⚠️"],
    clueTypes: ["red","red","red"],
    video: "videos/v2.MOV",
    explanation: "Fake. Smooth skin and face-edge blending are common AI artifacts.",
    tip: "Watch face edges when the head moves."
  },
  {
    id: 3,
    label: "REAL",
    isReal: true,
    emoji: "📰",
    description: "Live reporter. Hair, background motion, and lip sync all look natural.",
    theme: "News Broadcast",
    bg: "#1a2a3a",
    clues: ["Hair reacts to wind", "Perfect audio sync", "Natural environment motion"],
    clueTypes: ["green","green","green"],
    video: "videos/v3.MOV",
    explanation: "Real. Wind, shadows, and background movement behave naturally.",
    tip: "Check moving details around the person, not only the face."
  },
  {
    id: 4,
    label: "FAKE",
    isReal: false,
    emoji: "🌐",
    description: "Celebrity crypto ad. Face edges blur and shift during head turns.",
    theme: "Celebrity Endorsement",
    bg: "#2a1a2a",
    clues: ["Face-edge warping ⚠️", "Unnatural head rotation ⚠️", "Context seems suspicious"],
    clueTypes: ["red","red","red"],
    video: "videos/v4.MP4",
    explanation: "Fake. The face warps during movement, a strong deepfake clue.",
    tip: "Be extra careful with celebrity endorsements."
  },
  {
    id: 5,
    label: "REAL",
    isReal: true,
    emoji: "👨‍💼",
    description: "CEO statement. Slightly uneven lighting and natural pauses.",
    theme: "Corporate Press Conference",
    bg: "#1a2a1a",
    clues: ["Imperfect natural pauses", "Slightly uneven lighting (real)", "Genuine hesitation"],
    clueTypes: ["green","green","green"],
    video: "videos/v5.MOV",
    explanation: "Real. Human speech is rarely perfectly polished.",
    tip: "Pauses, fillers, and uneven pacing can be signs of real footage."
  },
  {
    id: 6,
    label: "FAKE",
    isReal: false,
    emoji: "📱",
    description: "Tech recall post. Teeth blur and ears blend into the background.",
    theme: "Tech Announcement",
    bg: "#2a2a1a",
    clues: ["Blurry teeth ⚠️", "Ear-background blending ⚠️", "Suspicious claim content"],
    clueTypes: ["red","red","red"],
    video: "videos/v6.MOV",
    explanation: "Fake. Teeth and ear edges are not rendered cleanly.",
    tip: "Teeth are often one of the fastest places to check."
  },
  {
    id: 7,
    label: "FAKE",
    isReal: false,
    emoji: "🔬",
    description: "Health claim video. Background shifts and the voice sounds robotic.",
    theme: "Health Misinformation",
    bg: "#2a1a1a",
    clues: ["Background inconsistency ⚠️", "Robotic voice quality ⚠️", "Extraordinary health claim"],
    clueTypes: ["red","red","red"],
    video: "videos/v7.MOV",
    explanation: "Fake. The voice and background both raise red flags.",
    tip: "Big health claims need trusted medical sources."
  },
  {
    id: 8,
    label: "REAL",
    isReal: true,
    emoji: "🎤",
    description: "Two-person interview. Eye contact, laughter, and shadows look consistent.",
    theme: "Live Interview",
    bg: "#1a1a2a",
    clues: ["Consistent shadow direction", "Spontaneous reactions", "Natural eye contact between speakers"],
    clueTypes: ["green","green","green"],
    video: "videos/v8.MOV",
    explanation: "Real. Reactions and shadows line up across both people.",
    tip: "Multiple people make fake social cues easier to spot."
  }
];

const PHASE_ONE_SCENARIO_IDS = [2, 3, 4];
const PHASE_ONE_SCENARIOS = PHASE_ONE_SCENARIO_IDS
  .map(id => SCENARIOS.find(scenario => scenario.id === id))
  .filter(Boolean);
const QUESTION_TIME_LIMIT = 10;
const PHASE_TWO_TIME_LIMIT = 30;
const PHASE_TWO_VARIANTS = [
  {
    id: 'canteen',
    school: 'Media Club Canteen',
    image: 'original.jpg',
    alt: 'Student at a canteen with hidden AI edits',
    note: 'Tap the 6 edited spots.',
    targets: [
      { id: 't1', left: 43.2, top: 13.3, w: 7.6, h: 8, title: 'Hairline', reason: 'Hair blends into the wall instead of keeping a clean edge.' },
      { id: 't2', left: 44.3, top: 22.3, w: 2.9, h: 9, title: 'Right eye', reason: 'The eye highlight and eyelid shape do not line up cleanly.' },
      { id: 't3', left: 42.4, top: 32.1, w: 4, h: 6.7, title: 'Mouth and teeth', reason: 'The teeth collapse into a soft, uneven block.' },
      { id: 't4', left: 45.6, top: 91, w: 7, h: 19.6, title: 'Hand', reason: 'Finger lengths and joints look inconsistent.' },
      { id: 't5', left: 64.1, top: 88.4, w: 7.8, h: 25.7, title: 'Cat face', reason: 'The fur texture smears together around the face.' },
      { id: 't6', left: 46.7, top: 27.5, w: 2.3, h: 10.8, title: 'Cheek edge', reason: 'The face boundary melts into the background.' }
    ],
    reviewTargets: [
      { id: 't1', left: 39.7, top: 12.1, w: 7.6, h: 8, title: 'Hairline', reason: 'Hair blends into the wall instead of keeping a clean edge.' },
      { id: 't2', left: 42.7, top: 21.8, w: 4.3, h: 9, title: 'Right eye', reason: 'The eye highlight and eyelid shape do not line up cleanly.' },
      { id: 't3', left: 39.7, top: 31.4, w: 5.4, h: 6.7, title: 'Mouth and teeth', reason: 'The teeth collapse into a soft, uneven block.' },
      { id: 't4', left: 44, top: 91, w: 7, h: 19.6, title: 'Hand', reason: 'Finger lengths and joints look inconsistent.' },
      { id: 't5', left: 70.4, top: 87.7, w: 10.3, h: 23.2, title: 'Cat face', reason: 'The fur texture smears together around the face.' },
      { id: 't6', left: 44.9, top: 26.3, w: 2.3, h: 10.8, title: 'Cheek edge', reason: 'The face boundary melts into the background.' }
    ]
  },
  {
    id: 'lab',
    school: 'Science Lab',
    image: 'phase2-science-lab.svg',
    alt: 'Science student in a lab with hidden AI edits',
    note: 'Different school, same mission: find 6 edits.',
    targets: [
      { id: 't1', left: 41, top: 10, w: 10, h: 9, title: 'Hair outline', reason: 'The hair edge looks fuzzy and uneven.' },
      { id: 't2', left: 49, top: 24, w: 8, h: 7, title: 'Glasses', reason: 'The glasses shape breaks across the eye.' },
      { id: 't3', left: 49, top: 34, w: 7, h: 6, title: 'Mouth', reason: 'The smile has a flat, pasted-on block of teeth.' },
      { id: 't4', left: 27, top: 69, w: 12, h: 14, title: 'Hand', reason: 'There are too many fingers and the joints are uneven.' },
      { id: 't5', left: 58, top: 61, w: 10, h: 13, title: 'ID badge', reason: 'The badge text bends and blurs.' },
      { id: 't6', left: 74, top: 13, w: 14, h: 16, title: 'Wall poster', reason: 'The poster letters and diagram do not align.' }
    ]
  },
  {
    id: 'sports',
    school: 'Sports Hall',
    image: 'phase2-sports-hall.svg',
    alt: 'Sports student in a hall with hidden AI edits',
    note: 'New school photo. Spot all 6 edits.',
    targets: [
      { id: 't1', left: 45, top: 20, w: 7, h: 9, title: 'Ear edge', reason: 'The ear blends into the cheek and hair.' },
      { id: 't2', left: 51, top: 20, w: 8, h: 7, title: 'Eyes', reason: 'The eyes do not match in size or direction.' },
      { id: 't3', left: 47, top: 42, w: 12, h: 12, title: 'Jersey number', reason: 'The number bends like melted text.' },
      { id: 't4', left: 32, top: 54, w: 11, h: 13, title: 'Hand', reason: 'The fingers are crowded and uneven.' },
      { id: 't5', left: 51, top: 82, w: 13, h: 9, title: 'Shoes', reason: 'The shoe shapes merge into the floor.' },
      { id: 't6', left: 75, top: 12, w: 13, h: 14, title: 'Scoreboard', reason: 'The numbers and lines are distorted.' }
    ]
  }
];
let phaseTwoVariantIndex = 0;
let PHASE_TWO_TARGETS = PHASE_TWO_VARIANTS[phaseTwoVariantIndex].targets;
let PHASE_TWO_REVIEW_TARGETS = PHASE_TWO_VARIANTS[phaseTwoVariantIndex].reviewTargets || PHASE_TWO_TARGETS;
let currentQ = 0;
let score = 0;
let answers = [];
let timerId = null;
let timeRemaining = QUESTION_TIME_LIMIT;
let questionResolved = false;
let phaseTwoTimerId = null;
let phaseTwoTimeRemaining = PHASE_TWO_TIME_LIMIT;
let phaseTwoFoundIds = [];
let phaseTwoMisses = 0;
let phaseTwoComplete = false;
let phaseTwoTransitionId = null;
let phaseTwoReviewMode = false;
let phaseTwoReviewTimedOut = false;
let phaseTwoSelectedTargetId = PHASE_TWO_TARGETS[0].id;
let phaseTwoHasSelectedVariant = false;
let phaseTwoAudioContext = null;
let phaseTwoMasterGain = null;

// ─── MUSIC STATE ───
let musicNodes = [];
let musicBassInterval = null;
let musicMelodyInterval = null;
let musicPulseInterval = null;
let musicMusicGain = null;

// ═══════════ LOBBY & RESULTS AUDIO ═══════════

let _uiAudioCtx = null;
let _lobbyNodes = [];
let _lobbyGain  = null;
let _lobbyIntervals = [];

function getUIAudioCtx() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!_uiAudioCtx) _uiAudioCtx = new AC();
  if (_uiAudioCtx.state === 'suspended') _uiAudioCtx.resume().catch(() => {});
  return _uiAudioCtx;
}

// ── Stop lobby music ──
function stopLobbyMusic() {
  _lobbyIntervals.forEach(id => clearInterval(id));
  _lobbyIntervals = [];
  if (_lobbyGain) {
    const ctx = _uiAudioCtx;
    if (ctx) {
      const now = ctx.currentTime;
      _lobbyGain.gain.cancelScheduledValues(now);
      _lobbyGain.gain.setValueAtTime(_lobbyGain.gain.value, now);
      _lobbyGain.gain.linearRampToValueAtTime(0, now + 0.5);
    }
    const ref = _lobbyGain;
    setTimeout(() => { try { ref.disconnect(); } catch(e){} }, 700);
    _lobbyGain = null;
  }
  _lobbyNodes.forEach(n => { try { n.stop(); } catch(e){} });
  _lobbyNodes = [];
}

// ── Lobby music: warm, inviting, looping chill arcade vibe ──
function startLobbyMusic() {
  const ctx = getUIAudioCtx();
  if (!ctx) return;
  if (ctx.state !== 'running') return;
  stopLobbyMusic();

  _lobbyGain = ctx.createGain();
  _lobbyGain.gain.setValueAtTime(0.2, ctx.currentTime);
  _lobbyGain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.08);
  _lobbyGain.connect(ctx.destination);

  const BPM  = 112;
  const BEAT = 60 / BPM;
  const S8   = BEAT / 2;
  const S16  = BEAT / 4;

  function uiNote(freq, when, dur, vol, type = 'triangle') {
    if (!_lobbyGain) return;
    const osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = type; osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(vol, when + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur * 0.85);
    osc.connect(g); g.connect(_lobbyGain);
    osc.start(when); osc.stop(when + dur + 0.04);
    _lobbyNodes.push(osc);
  }

  function uiKick(when) {
    if (!_lobbyGain) return;
    const osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, when);
    osc.frequency.exponentialRampToValueAtTime(40, when + 0.08);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(0.45, when + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.14);
    osc.connect(g); g.connect(_lobbyGain);
    osc.start(when); osc.stop(when + 0.18);
    _lobbyNodes.push(osc);
  }

  function uiHat(when, vol = 0.08) {
    if (!_lobbyGain) return;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.025), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(), g = ctx.createGain(), fil = ctx.createBiquadFilter();
    fil.type = 'highpass'; fil.frequency.value = 7000;
    g.gain.setValueAtTime(vol, when);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.022);
    src.buffer = buf; src.connect(fil); fil.connect(g); g.connect(_lobbyGain);
    src.start(when); src.stop(when + 0.04);
  }

  // C major pentatonic melody — cheerful and looping
  // C4=261.6 D4=293.7 E4=329.6 G4=392 A4=440 C5=523.3 E5=659.3 G5=784
  const melodyA = [
    [523.3, 0,    0.5, 0.16], [659.3, 0.5, 0.5, 0.15],
    [784,   1,    0.75,0.17], [659.3, 1.75,0.25,0.13],
    [523.3, 2,    0.5, 0.15], [440,   2.5, 0.5, 0.13],
    [392,   3,    1.0, 0.15],
  ];
  const melodyB = [
    [440,   0,    0.5, 0.14], [523.3, 0.5, 0.5, 0.15],
    [659.3, 1,    0.5, 0.16], [523.3, 1.5, 0.5, 0.14],
    [392,   2,    0.5, 0.13], [329.6, 2.5, 0.5, 0.12],
    [261.6, 3,    1.0, 0.15],
  ];
  // Bass: C2 G2 F2 G2
  const bassSeq = [65.4, 65.4, 98, 65.4, 87.3, 65.4, 98, 87.3];
  // Arp: C5 E5 G5 E5
  const arpSeq  = [523.3, 659.3, 784, 659.3, 523.3, 440, 392, 440];

  const BARS = 4;
  const LOOP_S = BARS * 4 * BEAT;

  function scheduleLoop(t0) {
    if (!_lobbyGain) return;
    for (let bar = 0; bar < BARS; bar++) {
      const bt = t0 + bar * 4 * BEAT;
      for (let b = 0; b < 4; b++) {
        const qt = bt + b * BEAT;
        uiKick(qt);
        for (let s = 0; s < 4; s++) uiHat(qt + s * S16, s % 2 === 0 ? 0.09 : 0.05);
      }
      for (let i = 0; i < 8; i++) {
        uiNote(bassSeq[i % bassSeq.length], bt + i * S8, S8 * 0.6, 0.18, 'sawtooth');
      }
      for (let i = 0; i < 16; i++) {
        uiNote(arpSeq[i % arpSeq.length], bt + i * S16, S16 * 0.55, 0.07);
      }
      const phrase = bar % 2 === 0 ? melodyA : melodyB;
      phrase.forEach(([freq, sb, dur, vol]) => {
        uiNote(freq, bt + sb * BEAT, dur * BEAT * 0.88, vol, 'square');
      });
    }
  }

  const t0 = ctx.currentTime + 0.01;
  scheduleLoop(t0);
  let nextLoop = t0 + LOOP_S;
  const loopId = setInterval(() => {
    if (!_lobbyGain) return;
    scheduleLoop(nextLoop);
    nextLoop += LOOP_S;
  }, (LOOP_S - 0.3) * 1000);
  _lobbyIntervals.push(loopId);
}

function primeLobbyMusic() {
  const ctx = getUIAudioCtx();
  if (!ctx) return;

  if (ctx.state === 'running') {
    if (!_lobbyGain) startLobbyMusic();
    return;
  }

  ctx.resume()
    .then(() => {
      if (!_lobbyGain && ctx.state === 'running') startLobbyMusic();
    })
    .catch(() => {});
}

function armInitialLobbyMusic() {
  const tryStart = () => {
    primeLobbyMusic();
    if (_uiAudioCtx && _uiAudioCtx.state === 'running' && _lobbyGain) {
      window.removeEventListener('pointerdown', tryStart);
      window.removeEventListener('touchstart', tryStart);
      window.removeEventListener('keydown', tryStart);
      window.removeEventListener('mousemove', tryStart);
    }
  };

  tryStart();
  if (_lobbyGain) return;

  window.addEventListener('pointerdown', tryStart, { once: true });
  window.addEventListener('touchstart', tryStart, { once: true });
  window.addEventListener('keydown', tryStart, { once: true });
  window.addEventListener('mousemove', tryStart, { once: true });
}

// ── Results sounds ──
function playResultsWinSound() {
  const ctx = getUIAudioCtx();
  if (!ctx) return;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.3);
  g.connect(ctx.destination);

  const now = ctx.currentTime;
  // Big triumphant fanfare
  const fanfare = [
    [392, 0.0, 0.18, 0.5],  [523.3, 0.14, 0.18, 0.5],
    [659.3, 0.28, 0.18, 0.5],[784, 0.42, 0.28, 0.55],
    [1046.5,0.58, 0.50, 0.5],[784, 0.72, 0.18, 0.4],
    [1046.5,0.88, 0.70, 0.55],
  ];
  fanfare.forEach(([freq, when, dur, vol]) => {
    const osc = ctx.createOscillator(), og = ctx.createGain();
    osc.type = 'triangle'; osc.frequency.value = freq;
    og.gain.setValueAtTime(0.0001, now + when);
    og.gain.linearRampToValueAtTime(vol, now + when + 0.01);
    og.gain.exponentialRampToValueAtTime(0.0001, now + when + dur);
    osc.connect(og); og.connect(g);
    osc.start(now + when); osc.stop(now + when + dur + 0.05);
  });
  // Sparkle layer
  [[1046.5,0,0.12,0.22],[1318.5,0.14,0.1,0.18],[1568,0.28,0.14,0.16],[2093,0.58,0.2,0.14]].forEach(([freq,when,dur,vol]) => {
    const osc = ctx.createOscillator(), og = ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = freq;
    og.gain.setValueAtTime(0.0001, now + when);
    og.gain.linearRampToValueAtTime(vol, now + when + 0.005);
    og.gain.exponentialRampToValueAtTime(0.0001, now + when + dur);
    osc.connect(og); og.connect(g);
    osc.start(now + when); osc.stop(now + when + dur + 0.03);
  });
  setTimeout(() => { try { g.disconnect(); } catch(e){} }, 2000);
}

function playResultsLoseSound() {
  const ctx = getUIAudioCtx();
  if (!ctx) return;
  const g = ctx.createGain();
  g.gain.value = 0.28;
  g.connect(ctx.destination);
  const now = ctx.currentTime;
  // Sad descending trombone
  [[392, 0.00, 0.22, 0.5], [349.2, 0.20, 0.22, 0.5],
   [311.1,0.40, 0.22, 0.5], [261.6, 0.60, 0.55, 0.55]].forEach(([freq,when,dur,vol]) => {
    const osc = ctx.createOscillator(), og = ctx.createGain();
    osc.type = 'sawtooth'; osc.frequency.value = freq;
    og.gain.setValueAtTime(0.0001, now + when);
    og.gain.linearRampToValueAtTime(vol, now + when + 0.015);
    og.gain.exponentialRampToValueAtTime(0.0001, now + when + dur);
    osc.connect(og); og.connect(g);
    osc.start(now + when); osc.stop(now + when + dur + 0.05);
  });
  setTimeout(() => { try { g.disconnect(); } catch(e){} }, 1500);
}

// ═══════════ STARS ═══════════
(function createStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      top:${Math.random()*100}%;
      left:${Math.random()*100}%;
      --d:${Math.random()*4+2}s;
      --delay:-${Math.random()*5}s;
    `;
    container.appendChild(s);
  }
})();

// ═══════════ NAVIGATION ═══════════
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('hud').style.display = 'none';
  window.scrollTo(0, 0);

  // Lobby music: play on welcome + learn screens, stop elsewhere
  if (id === 'screen-welcome' || id === 'screen-learn') {
    primeLobbyMusic();
  } else {
    stopLobbyMusic();
  }
}

function goHome() {
  if (confirm('Return to home? Your progress will be lost.')) {
    resetToHomeState();
  }
}

function resetToHomeState() {
  clearQuestionTimer();
  setDangerOverlayActive(false);
  clearPhaseTwoTimer();
  clearPhaseTwoTransition();
  stopPhaseTwoMusic();
  stopScenarioVideo();
  currentQ = 0;
  score = 0;
  answers = [];
  questionResolved = false;
  resetPhaseTwoState();
  setVerdictButtonsDisabled(false);
  document.getElementById('feedback-overlay').classList.remove('show');
  showScreen('screen-welcome');
}

// ═══════════ GAME FLOW ═══════════
function startGame() {
  clearQuestionTimer();
  setDangerOverlayActive(false);
  clearPhaseTwoTimer();
  clearPhaseTwoTransition();
  stopScenarioVideo();
  currentQ = 0; score = 0; answers = [];
  questionResolved = false;
  resetPhaseTwoState();
  setVerdictButtonsDisabled(false);
  document.getElementById('feedback-overlay').classList.remove('show');
  updateHUD();
  loadQuestion();
  showScreen('screen-game');
}

function restartGame() {
  startGame();
}

function loadQuestion() {
  const q = PHASE_ONE_SCENARIOS[currentQ];
  const total = PHASE_ONE_SCENARIOS.length;

  if (!q) {
    showPhaseOneResults();
    return;
  }

  questionResolved = false;
  setVerdictButtonsDisabled(false);

  // Progress bar
  document.getElementById('progress-fill').style.width = `${(currentQ / total) * 100}%`;

  // Video frame content
  document.getElementById('video-content').innerHTML = `
    <video class="scenario-video" loop playsinline id="scenario-video">
      <source src="${q.video}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div style="font-size:0.8rem; color:#607090; margin-top:10px">[ Video Clip ${String(currentQ+1).padStart(2,'0')}/${String(total).padStart(2,'0')} ]</div>
  `;
  
  const video = document.getElementById("scenario-video");
  if (video) {
    video.play().catch(() => {});
  }

  // Scenario text
  document.getElementById('scenario-text').textContent = q.description;

  // Clue tags
  const clueHTML = q.clues.map((c, i) => `<span class="clue-tag ${q.clueTypes[i]}">${c}</span>`).join('');
  document.getElementById('clue-tags').innerHTML = clueHTML;

  updateHUD();
  startQuestionTimer();
}

function updateHUD() {
  const legacyScore = document.getElementById('hud-score-val');
  const legacyQ = document.getElementById('hud-q');
  const legacyTotal = document.getElementById('hud-total');
  const phaseOneScore = document.getElementById('phase-one-score-val');
  const phaseOneQ = document.getElementById('phase-one-q');
  const phaseOneTotal = document.getElementById('phase-one-total');

  if (legacyScore) legacyScore.textContent = score;
  if (legacyQ) legacyQ.textContent = currentQ + 1;
  if (legacyTotal) legacyTotal.textContent = PHASE_ONE_SCENARIOS.length;
  if (phaseOneScore) phaseOneScore.textContent = score;
  if (phaseOneQ) phaseOneQ.textContent = currentQ + 1;
  if (phaseOneTotal) phaseOneTotal.textContent = PHASE_ONE_SCENARIOS.length;
}

function stopScenarioVideo() {
  const video = document.getElementById('scenario-video');
  if (!video) return;

  video.pause();
  video.currentTime = 0;
  video.muted = true;
}

function setDangerOverlayActive(active) {
  return;
}

function clearQuestionTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function updateTimerUI() {
  const timer = document.getElementById('timer-pill');
  timer.textContent = `Time: ${timeRemaining}s`;
  timer.classList.toggle('danger', timeRemaining <= 3);

  if (timeRemaining <= 3 && timeRemaining > 0) {
    playDangerTick(timeRemaining);
  }
}

function playDangerTick(secondsLeft) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  if (!window._dangerCtx) window._dangerCtx = new AudioContextClass();
  const ctx = window._dangerCtx;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});

  const now = ctx.currentTime;
  const volume = secondsLeft === 3 ? 0.55 : secondsLeft === 2 ? 0.7 : 0.9;

  [[0, 180, 45, volume], [0.1, 140, 38, volume * 0.65]].forEach(([offset, startFreq, endFreq, gain]) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, now + offset);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + offset + 0.09);
    g.gain.setValueAtTime(0.0001, now + offset);
    g.gain.linearRampToValueAtTime(gain, now + offset + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.15);

    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now + offset);
    osc.stop(now + offset + 0.2);
  });

  const beep = ctx.createOscillator();
  const bg = ctx.createGain();
  beep.type = 'square';
  beep.frequency.value = secondsLeft === 1 ? 1400 : 1100;
  bg.gain.setValueAtTime(0.0001, now);
  bg.gain.linearRampToValueAtTime(volume * 0.45, now + 0.005);
  bg.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
  beep.connect(bg);
  bg.connect(ctx.destination);
  beep.start(now);
  beep.stop(now + 0.1);
}

function startQuestionTimer() {
  clearQuestionTimer();
  timeRemaining = QUESTION_TIME_LIMIT;
  updateTimerUI();

  timerId = setInterval(() => {
    timeRemaining -= 1;
    updateTimerUI();

    if (timeRemaining <= 0) {
      clearQuestionTimer();
      submitAnswer(null, { timedOut: true });
    }
  }, 1000);
}

function setVerdictButtonsDisabled(disabled) {
  document.querySelectorAll('.verdict-btn').forEach(btn => {
    btn.disabled = disabled;
    btn.style.opacity = disabled ? '0.55' : '1';
    btn.style.pointerEvents = disabled ? 'none' : 'auto';
  });
}

function submitAnswer(answer, options = {}) {
  if (questionResolved) return;

  const q = PHASE_ONE_SCENARIOS[currentQ];
  const timedOut = options.timedOut === true;
  if (!q) return;

  questionResolved = true;
  clearQuestionTimer();
  setDangerOverlayActive(false);
  stopScenarioVideo();
  setVerdictButtonsDisabled(true);

  const userSaysReal = answer === 'real';
  const correct = !timedOut && userSaysReal === q.isReal;

  if (correct) score++;
  answers.push({
    q: currentQ,
    correct,
    userAnswer: timedOut ? 'timeout' : answer,
    actual: q.isReal ? 'real' : 'fake'
  });

  showFeedback(correct, q, { timedOut });
}

function showFeedback(correct, q, options = {}) {
  const timedOut = options.timedOut === true;
  const card = document.getElementById('feedback-card');
  card.className = 'feedback-card ' + (correct ? 'correct' : 'wrong');

  document.getElementById('fb-emoji').textContent = timedOut ? 'TIME' : (correct ? 'OK' : 'CLUE');
  document.getElementById('fb-title').textContent = timedOut
    ? `TIME'S UP! IT WAS ${q.label}`
    : (correct ? 'CORRECT!' : `IT WAS ${q.label}`);
  document.getElementById('fb-explanation').textContent = q.explanation;

  const tipHTML = `<div style="background:#ffffff08; border-radius:8px; padding:10px 12px; font-size:0.82rem; color:#a0c0e0; text-align:left">
    <strong style="color:var(--gold)">Tip:</strong> ${q.tip}
  </div>`;
  document.getElementById('fb-clues').innerHTML = tipHTML;

  const isLast = currentQ >= PHASE_ONE_SCENARIOS.length - 1;
  document.getElementById('fb-next-btn').textContent = isLast ? 'SEE RESULTS ->' : 'NEXT ROUND ->';

  document.getElementById('feedback-overlay').classList.add('show');
  updateHUD();
}

function nextQuestion() {
  stopScenarioVideo();
  document.getElementById('feedback-overlay').classList.remove('show');
  setDangerOverlayActive(false);
  currentQ++;
  if (currentQ >= PHASE_ONE_SCENARIOS.length) {
    showPhaseOneResults();
  } else {
    loadQuestion();
  }
}

function openSurePopup() {
  primeLobbyMusic();
  document.getElementById('sure-popup').classList.add('show');
}

function closeSurePopup() {
  document.getElementById('sure-popup').classList.remove('show');
}

function startGameFromPopup() {
  primeLobbyMusic();
  closeSurePopup();
  startGame();
}

function goToLearnFromPopup() {
  primeLobbyMusic();
  closeSurePopup();
  showScreen('screen-learn');
}

function clearPhaseTwoTimer() {
  if (phaseTwoTimerId) {
    clearInterval(phaseTwoTimerId);
    phaseTwoTimerId = null;
  }
}

function clearPhaseTwoTransition() {
  if (phaseTwoTransitionId) {
    clearTimeout(phaseTwoTransitionId);
    phaseTwoTransitionId = null;
  }
}

function ensurePhaseTwoAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!phaseTwoAudioContext) {
    phaseTwoAudioContext = new AudioContextClass();
    phaseTwoMasterGain = phaseTwoAudioContext.createGain();
    phaseTwoMasterGain.gain.value = 0.6;
    phaseTwoMasterGain.connect(phaseTwoAudioContext.destination);
  }

  if (phaseTwoAudioContext.state === 'suspended') {
    phaseTwoAudioContext.resume().catch(() => {});
  }

  return phaseTwoAudioContext;
}

function playPhaseTwoTone({
  frequency = 440,
  duration = 0.12,
  type = 'triangle',
  volume = 0.12,
  when = 0,
  endFrequency = null
} = {}) {
  const ctx = ensurePhaseTwoAudio();
  if (!ctx || !phaseTwoMasterGain) return;

  const startAt = ctx.currentTime + when;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  if (endFrequency !== null) {
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(endFrequency, 1), startAt + duration);
  }

  gainNode.gain.setValueAtTime(0.0001, startAt);
  gainNode.gain.exponentialRampToValueAtTime(volume, startAt + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

  oscillator.connect(gainNode);
  gainNode.connect(phaseTwoMasterGain);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.03);
}

function playPhaseTwoStartSound() {
  playPhaseTwoTone({ frequency: 220, duration: 0.18, type: 'triangle', volume: 0.08 });
  playPhaseTwoTone({ frequency: 330, duration: 0.1, when: 0.05, type: 'triangle', volume: 0.08 });
  playPhaseTwoTone({ frequency: 494, duration: 0.16, when: 0.12, type: 'sawtooth', volume: 0.07, endFrequency: 622 });
}

function playPhaseTwoHitSound() {
  playPhaseTwoTone({ frequency: 392, duration: 0.1, type: 'triangle', volume: 0.5 });
  playPhaseTwoTone({ frequency: 523.25, duration: 0.1, when: 0.08, type: 'triangle', volume: 0.5 });
  playPhaseTwoTone({ frequency: 659.25, duration: 0.18, when: 0.16, type: 'triangle', volume: 0.45 });
}

function playPhaseTwoMissSound() {
  playPhaseTwoTone({ frequency: 210, duration: 0.15, type: 'sawtooth', volume: 0.45, endFrequency: 150 });
  playPhaseTwoTone({ frequency: 160, duration: 0.12, when: 0.05, type: 'square', volume: 0.35, endFrequency: 110 });
}

function playPhaseTwoTickSound() {
  playPhaseTwoTone({ frequency: 880, duration: 0.05, type: 'sine', volume: 0.05 });
}

function playPhaseTwoWinSound() {
  playPhaseTwoTone({ frequency: 392, duration: 0.12, type: 'triangle', volume: 0.09 });
  playPhaseTwoTone({ frequency: 523.25, duration: 0.12, when: 0.08, type: 'triangle', volume: 0.09 });
  playPhaseTwoTone({ frequency: 659.25, duration: 0.18, when: 0.16, type: 'triangle', volume: 0.08 });
  playPhaseTwoTone({ frequency: 784, duration: 0.24, when: 0.26, type: 'triangle', volume: 0.08 });
}

function playPhaseTwoLoseSound() {
  playPhaseTwoTone({ frequency: 392, duration: 0.12, type: 'sawtooth', volume: 0.07, endFrequency: 240 });
  playPhaseTwoTone({ frequency: 261.63, duration: 0.16, when: 0.08, type: 'triangle', volume: 0.06, endFrequency: 180 });
}

// ═══════════ TENSE BACKGROUND MUSIC ═══════════

function startPhaseTwoMusic() {
  const ctx = ensurePhaseTwoAudio();
  if (!ctx) return;
  stopPhaseTwoMusic();

  musicMusicGain = ctx.createGain();
  musicMusicGain.gain.setValueAtTime(0, ctx.currentTime);
  musicMusicGain.gain.linearRampToValueAtTime(0.30, ctx.currentTime + 0.25);
  musicMusicGain.connect(ctx.destination);

  const BPM  = 138;
  const BEAT = 60 / BPM;   // ~0.435s
  const S8   = BEAT / 2;   // 8th note
  const S16  = BEAT / 4;   // 16th note

  // ── helpers ──
  function tone(freq, when, dur, vol, type = 'square', detune = 0) {
    if (!musicMusicGain) return;
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.type = type; osc.frequency.value = freq; osc.detune.value = detune;
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(vol, when + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur * 0.82);
    osc.connect(g); g.connect(musicMusicGain);
    osc.start(when); osc.stop(when + dur + 0.03);
  }

  function kick(when) {
    const osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, when);
    osc.frequency.exponentialRampToValueAtTime(38, when + 0.07);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(0.65, when + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.14);
    osc.connect(g); g.connect(musicMusicGain);
    osc.start(when); osc.stop(when + 0.18);
  }

  function snare(when) {
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.10, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(), g = ctx.createGain(), fil = ctx.createBiquadFilter();
    fil.type = 'bandpass'; fil.frequency.value = 2200; fil.Q.value = 0.8;
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(0.32, when + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.08);
    src.buffer = buf;
    src.connect(fil); fil.connect(g); g.connect(musicMusicGain);
    src.start(when); src.stop(when + 0.12);
  }

  function hat(when, vol) {
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.03), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(), g = ctx.createGain(), fil = ctx.createBiquadFilter();
    fil.type = 'highpass'; fil.frequency.value = 8000;
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(vol, when + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.025);
    src.buffer = buf;
    src.connect(fil); fil.connect(g); g.connect(musicMusicGain);
    src.start(when); src.stop(when + 0.04);
  }

  // ── 4-bar loop scheduler ──
  // Key: F major.  Melody is punchy, syncopated, very "game show countdown"
  // F4=349.2  G4=392  A4=440  Bb4=466.2  C5=523.3  D5=587.3  F5=698.5

  const melPhraseA = [
    // [freq, startBeat, durBeats, vol]
    [523.3, 0,    0.5,  0.22],  // C5
    [587.3, 0.5,  0.5,  0.20],  // D5
    [698.5, 1,    0.75, 0.24],  // F5  (hold)
    [587.3, 1.75, 0.25, 0.18],  // D5
    [523.3, 2,    0.5,  0.20],  // C5
    [466.2, 2.5,  0.5,  0.18],  // Bb4
    [440,   3,    0.5,  0.18],  // A4
    [466.2, 3.5,  0.5,  0.20],  // Bb4
  ];
  const melPhraseB = [
    [523.3, 0,    0.5,  0.22],  // C5
    [440,   0.5,  0.5,  0.18],  // A4
    [392,   1,    0.5,  0.18],  // G4
    [440,   1.5,  0.5,  0.20],  // A4
    [523.3, 2,    1.0,  0.24],  // C5 (hold)
    [587.3, 3,    0.5,  0.20],  // D5
    [698.5, 3.5,  0.5,  0.22],  // F5
  ];

  // Bass: pumping 8ths  F2 C3 Bb2 C3  (F=87.3, C=130.8, Bb=116.5)
  const bassLine = [87.3, 87.3, 130.8, 87.3, 116.5, 87.3, 130.8, 116.5];

  // Counter-melody: bright synth arp on 16ths
  const arp = [349.2, 523.3, 698.5, 523.3,  440, 659.3, 880, 659.3];

  const BARS = 4;
  const LOOP_SECS = BARS * 4 * BEAT;

  function scheduleLoop(t0) {
    for (let bar = 0; bar < BARS; bar++) {
      const bt = t0 + bar * 4 * BEAT; // bar start time

      // Drums
      for (let b = 0; b < 4; b++) {
        const qt = bt + b * BEAT;
        kick(qt);
        if (b === 1 || b === 3) snare(qt + 0.002);
        for (let s = 0; s < 4; s++) hat(qt + s * S16, s % 2 === 0 ? 0.13 : 0.07);
      }

      // Extra off-beat kick on 8th-note position 3 for extra bounce
      kick(bt + BEAT * 2 + S8);

      // Bassline (8ths × 8 per bar)
      for (let i = 0; i < 8; i++) {
        const f = bassLine[i % bassLine.length];
        tone(f, bt + i * S8, S8 * 0.65, 0.24, 'sawtooth');
        // sub-octave layer
        tone(f / 2, bt + i * S8, S8 * 0.5, 0.10, 'sine');
      }

      // Arp (16ths)
      for (let i = 0; i < 16; i++) {
        tone(arp[i % arp.length], bt + i * S16, S16 * 0.55, 0.09, 'triangle');
      }

      // Melody: phrase A on bars 0,2 — phrase B on bars 1,3
      const phrase = (bar % 2 === 0) ? melPhraseA : melPhraseB;
      phrase.forEach(([freq, startBeat, durBeats, vol]) => {
        const wh = bt + startBeat * BEAT;
        tone(freq, wh, durBeats * BEAT * 0.88, vol, 'square');
        // harmony a perfect 4th up for that bright game-show chord
        tone(freq * 1.335, wh, durBeats * BEAT * 0.80, vol * 0.35, 'triangle', -5);
      });
    }
  }

  const t0 = ctx.currentTime + 0.05;
  scheduleLoop(t0);
  let nextLoop = t0 + LOOP_SECS;
  musicBassInterval = setInterval(() => {
    if (!musicMusicGain) return;
    scheduleLoop(nextLoop);
    nextLoop += LOOP_SECS;
  }, (LOOP_SECS - 0.3) * 1000);
}

function stopPhaseTwoMusic() {
  if (musicBassInterval)   { clearInterval(musicBassInterval);   musicBassInterval = null; }
  if (musicMelodyInterval) { clearInterval(musicMelodyInterval); musicMelodyInterval = null; }
  if (musicPulseInterval)  { clearInterval(musicPulseInterval);  musicPulseInterval = null; }
  musicNodes.forEach(n => {
    if (n && n._isInterval) clearInterval(n._id);
    else { try { n.stop(); } catch(e) {} }
  });
  musicNodes = [];
  if (musicMusicGain) {
    const ctx = phaseTwoAudioContext;
    if (ctx) {
      const now = ctx.currentTime;
      musicMusicGain.gain.cancelScheduledValues(now);
      musicMusicGain.gain.setValueAtTime(musicMusicGain.gain.value, now);
      musicMusicGain.gain.linearRampToValueAtTime(0, now + 0.35);
    }
    const ref = musicMusicGain;
    setTimeout(() => { try { ref.disconnect(); } catch(e) {} }, 500);
    musicMusicGain = null;
  }
}

function urgeMusicUp() {
  // Last 8s: boost volume + fire excited ascending fills every beat
  if (!musicMusicGain || !phaseTwoAudioContext) return;
  const ctx = phaseTwoAudioContext;
  musicMusicGain.gain.cancelScheduledValues(ctx.currentTime);
  musicMusicGain.gain.setValueAtTime(musicMusicGain.gain.value, ctx.currentTime);
  musicMusicGain.gain.linearRampToValueAtTime(0.44, ctx.currentTime + 0.3);

  // Rapid staccato fills — fast ascending blips on every 8th note
  const fillNotes = [523.3, 587.3, 659.3, 698.5, 784, 880, 987.8, 1046.5];
  let fi = 0;
  function urgFill() {
    if (!phaseTwoAudioContext || !musicMusicGain) return;
    const freq = fillNotes[fi % fillNotes.length];
    fi++;
    const now = phaseTwoAudioContext.currentTime;
    const osc = phaseTwoAudioContext.createOscillator();
    const g   = phaseTwoAudioContext.createGain();
    osc.type = 'square'; osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(0.16, now + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
    osc.connect(g); g.connect(musicMusicGain);
    osc.start(now); osc.stop(now + 0.1);
  }
  urgFill();
  if (musicMelodyInterval) clearInterval(musicMelodyInterval);
  musicMelodyInterval = setInterval(urgFill, 220);
}

function getPhaseTwoVariant() {
  return PHASE_TWO_VARIANTS[phaseTwoVariantIndex] || PHASE_TWO_VARIANTS[0];
}

function setPhaseTwoVariant(index) {
  phaseTwoVariantIndex = (index + PHASE_TWO_VARIANTS.length) % PHASE_TWO_VARIANTS.length;
  const variant = getPhaseTwoVariant();
  PHASE_TWO_TARGETS = variant.targets;
  PHASE_TWO_REVIEW_TARGETS = variant.reviewTargets || variant.targets;
  phaseTwoSelectedTargetId = PHASE_TWO_TARGETS[0].id;
  updatePhaseTwoChallengeCopy();
}

function choosePhaseTwoVariant(cycle = false) {
  if (PHASE_TWO_VARIANTS.length <= 1) {
    setPhaseTwoVariant(0);
    return;
  }

  if (cycle || phaseTwoHasSelectedVariant) {
    setPhaseTwoVariant(phaseTwoVariantIndex + 1);
  } else {
    setPhaseTwoVariant(Math.floor(Math.random() * PHASE_TWO_VARIANTS.length));
    phaseTwoHasSelectedVariant = true;
  }
}

function updatePhaseTwoChallengeCopy() {
  const variant = getPhaseTwoVariant();
  const image = document.getElementById('phase-two-image');
  const school = document.getElementById('phase-two-school');
  const note = document.getElementById('phase-two-reference-note');

  if (image) {
    image.src = variant.image;
    image.alt = variant.alt;
  }
  if (school) school.textContent = variant.school;
  if (note) note.textContent = variant.note;
}

function resetPhaseTwoState() {
  clearPhaseTwoTransition();
  phaseTwoTimeRemaining = PHASE_TWO_TIME_LIMIT;
  phaseTwoFoundIds = [];
  phaseTwoMisses = 0;
  phaseTwoComplete = false;
  phaseTwoReviewMode = false;
  phaseTwoReviewTimedOut = false;
  phaseTwoSelectedTargetId = PHASE_TWO_TARGETS[0].id;
  updatePhaseTwoChallengeCopy();
  renderPhaseTwoHotspots();
  updatePhaseTwoUI();
  updatePhaseTwoReviewPanel();
  document.getElementById('phase-two-status').textContent = 'Tap only the edited areas.';
}

function renderPhaseTwoHotspots(revealAll = false) {
  const hotspotLayer = document.getElementById('phase-two-hotspots');
  const shouldRevealAll = revealAll || phaseTwoReviewMode;
  // Use review-mode coords when showing the answer review, game coords during play
  const targets = phaseTwoReviewMode ? PHASE_TWO_REVIEW_TARGETS : PHASE_TWO_TARGETS;
  hotspotLayer.innerHTML = targets.map((target, index) => {
    const isFound = phaseTwoFoundIds.includes(target.id);
    const classes = [
      'phase-two-hotspot',
      isFound ? 'found' : '',
      shouldRevealAll && !isFound ? 'revealed' : '',
      phaseTwoReviewMode ? 'review-visible' : '',
      phaseTwoReviewMode && phaseTwoSelectedTargetId === target.id ? 'selected' : '',
      (target.id === 't4' || target.id === 't5') ? 'label-top' : ''
    ].filter(Boolean).join(' ');

    return `
      <button
        type="button"
        class="${classes}"
        style="left:${target.left}%; top:${target.top}%; width:${target.w || target.size}%; height:${target.h || target.size}%; transform:translate(-50%,-50%);"
        data-label="${index + 1}"
        onclick="handlePhaseTwoTargetClick('${target.id}', event)"
        aria-label="Deepfake hotspot ${index + 1}: ${target.title}">
      </button>
    `;
  }).join('');
}

function updatePhaseTwoUI() {
  document.getElementById('phase-two-found').textContent = `${phaseTwoFoundIds.length} / ${PHASE_TWO_TARGETS.length}`;
  document.getElementById('phase-two-timer').textContent = `${phaseTwoTimeRemaining}s`;
  document.getElementById('phase-two-misses').textContent = phaseTwoMisses;
  document.getElementById('phase-two-timer-card').classList.toggle('danger', phaseTwoTimeRemaining <= 8);
}

function updatePhaseTwoReviewPanel() {
  const panel = document.getElementById('phase-two-review-panel');
  const shell = document.querySelector('.phase-two-shell');
  const hint = document.getElementById('phase-two-review-hint');
  const kicker = document.getElementById('phase-two-review-kicker');
  const title = document.getElementById('phase-two-review-title');
  const reason = document.getElementById('phase-two-review-reason');

  panel.hidden = !phaseTwoReviewMode;
  if (shell) shell.classList.toggle('review-mode', phaseTwoReviewMode);
  if (!phaseTwoReviewMode) return;

  const selectedTarget = PHASE_TWO_REVIEW_TARGETS.find(target => target.id === phaseTwoSelectedTargetId) || PHASE_TWO_REVIEW_TARGETS[0];
  const markerNumber = PHASE_TWO_REVIEW_TARGETS.findIndex(target => target.id === selectedTarget.id) + 1;
  const wasFound = phaseTwoFoundIds.includes(selectedTarget.id);

  hint.textContent = phaseTwoReviewTimedOut
    ? 'Time is up. Tap a marker for the clue.'
    : 'Challenge cleared. Tap a marker to review.';
  kicker.textContent = `Marker ${markerNumber} - ${wasFound ? 'Found during play' : 'Revealed at end'}`;
  title.textContent = selectedTarget.title;
  reason.textContent = selectedTarget.reason;
}

function enterPhaseTwoReview(timedOut) {
  clearPhaseTwoTimer();
  clearPhaseTwoTransition();
  stopPhaseTwoMusic();
  phaseTwoComplete = true;
  phaseTwoReviewMode = true;
  phaseTwoReviewTimedOut = timedOut;
  phaseTwoSelectedTargetId = (PHASE_TWO_REVIEW_TARGETS.find(target => !phaseTwoFoundIds.includes(target.id)) || PHASE_TWO_REVIEW_TARGETS[0]).id;
  renderPhaseTwoHotspots(true);
  updatePhaseTwoUI();
  updatePhaseTwoReviewPanel();
  document.getElementById('phase-two-reference-note').textContent = 'Answer shown. Green = found.';
  document.getElementById('phase-two-status').textContent = timedOut
    ? 'Review the edits, then tap Done.'
    : `All ${PHASE_TWO_TARGETS.length} edits found.`;
}

function startPhaseTwoTimer() {
  clearPhaseTwoTimer();
  phaseTwoTimeRemaining = PHASE_TWO_TIME_LIMIT;
  updatePhaseTwoUI();

  phaseTwoTimerId = setInterval(() => {
    phaseTwoTimeRemaining -= 1;
    updatePhaseTwoUI();

    if (phaseTwoTimeRemaining > 0 && phaseTwoTimeRemaining <= 8) {
      playPhaseTwoTickSound();
      if (phaseTwoTimeRemaining === 8) urgeMusicUp();
    }

    if (phaseTwoTimeRemaining <= 0) {
      phaseTwoTimeRemaining = 0;
      clearPhaseTwoTimer();
      playPhaseTwoLoseSound();
      enterPhaseTwoReview(true);
    }
  }, 1000);
}

function startPhaseTwo() {
  clearQuestionTimer();
  setDangerOverlayActive(false);
  clearPhaseTwoTimer();
  clearPhaseTwoTransition();
  stopScenarioVideo();
  document.getElementById('feedback-overlay').classList.remove('show');
  choosePhaseTwoVariant();
  resetPhaseTwoState();
  ensurePhaseTwoAudio();
  playPhaseTwoStartSound();
  showScreen('screen-phase-two');
  startPhaseTwoTimer();
  startPhaseTwoMusic();
}

function showBoardDelta(seconds, clientX, clientY) {
  const board = document.getElementById('phase-two-board');
  if (!board) return;

  board.querySelectorAll('.board-delta, .board-flash').forEach(el => el.remove());

  const flash = document.createElement('div');
  flash.className = `board-flash ${seconds > 0 ? 'green' : 'red'}`;
  board.appendChild(flash);
  setTimeout(() => flash.remove(), 550);

  const delta = document.createElement('div');
  delta.className = `board-delta ${seconds > 0 ? 'plus' : 'minus'}`;
  delta.textContent = seconds > 0 ? `+${seconds}s` : `${seconds}s`;

  const rect = board.getBoundingClientRect();
  const pctX = clientX !== undefined
    ? Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 15), 85)
    : 50;
  const pctY = clientY !== undefined
    ? Math.min(Math.max(((clientY - rect.top) / rect.height) * 100, 15), 75)
    : 45;

  delta.style.left = `${pctX}%`;
  delta.style.top = `${pctY}%`;
  delta.style.transform = 'translate(-50%, -50%)';
  board.appendChild(delta);
  setTimeout(() => delta.remove(), 1200);
}

function handlePhaseTwoTargetClick(targetId, event) {
  event.stopPropagation();
  if (phaseTwoReviewMode) {
    phaseTwoSelectedTargetId = targetId;
    renderPhaseTwoHotspots(true);
    updatePhaseTwoReviewPanel();
    return;
  }

  if (phaseTwoComplete || phaseTwoFoundIds.includes(targetId)) return;

  phaseTwoFoundIds.push(targetId);
  playPhaseTwoHitSound();

  phaseTwoTimeRemaining = Math.min(phaseTwoTimeRemaining + 2, 99);
  showBoardDelta(2, event.clientX, event.clientY);
  renderPhaseTwoHotspots();
  updatePhaseTwoUI();
  document.getElementById('phase-two-status').textContent = `+2s. ${phaseTwoFoundIds.length}/${PHASE_TWO_TARGETS.length} found.`;

  if (phaseTwoFoundIds.length >= PHASE_TWO_TARGETS.length) {
    playPhaseTwoWinSound();
    enterPhaseTwoReview(false);
  }
}

function handlePhaseTwoBoardMiss() {
  if (phaseTwoComplete) return;

  phaseTwoMisses++;
  playPhaseTwoMissSound();

  phaseTwoTimeRemaining = Math.max(phaseTwoTimeRemaining - 3, 0);
  showBoardDelta(-3);
  updatePhaseTwoUI();
  document.getElementById('phase-two-status').textContent = '-3s. Try another spot.';

  const board = document.getElementById('phase-two-board');
  board.classList.remove('miss');
  void board.offsetWidth;
  board.classList.add('miss');
  setTimeout(() => board.classList.remove('miss'), 400);

  if (phaseTwoTimeRemaining <= 0) {
    playPhaseTwoLoseSound();
    enterPhaseTwoReview(true);
  }
}

function finishPhaseTwoReview() {
  if (!phaseTwoReviewMode) return;
  showFinalResults(phaseTwoReviewTimedOut);
}

function replayPhaseTwo() {
  clearQuestionTimer();
  setDangerOverlayActive(false);
  clearPhaseTwoTimer();
  clearPhaseTwoTransition();
  stopScenarioVideo();
  document.getElementById('feedback-overlay').classList.remove('show');
  choosePhaseTwoVariant(true);
  resetPhaseTwoState();
  showScreen('screen-phase-two');
  ensurePhaseTwoAudio();
  playPhaseTwoStartSound();
  startPhaseTwoTimer();
  startPhaseTwoMusic();
}

function setResultsActions(primaryLabel, primaryHandler, secondaryLabel, secondaryHandler) {
  const primaryBtn = document.getElementById('results-primary-btn');
  const secondaryBtn = document.getElementById('results-secondary-btn');

  primaryBtn.textContent = primaryLabel;
  primaryBtn.onclick = primaryHandler;
  secondaryBtn.textContent = secondaryLabel;
  secondaryBtn.onclick = secondaryHandler;
}

function renderTips(tips) {
  document.getElementById('takeaways-list').innerHTML = tips.map((tip, index) => `
    <div class="tip-item">
      <span class="tip-num">${index + 1}</span>
      <div>${tip}</div>
    </div>
  `).join('');
}

// ═══════════ RESULTS ═══════════
function showPhaseOneResults() {
  clearQuestionTimer();
  stopScenarioVideo();
  showScreen('screen-results');
  document.getElementById('hud').style.display = 'none';
  // Play results sound based on score
  const pct2 = Math.round((score / PHASE_ONE_SCENARIOS.length) * 100);
  setTimeout(() => pct2 >= 50 ? playResultsWinSound() : playResultsLoseSound(), 400);

  const total = PHASE_ONE_SCENARIOS.length;
  const pct = Math.round((score / total) * 100);
  const ring = document.querySelector('.score-ring');
  ring.style.background = `conic-gradient(var(--cyan) ${pct}%, var(--purple) ${pct}% 100%, #1a2550 100%)`;

  document.getElementById('results-section-label').textContent = 'Phase One Complete';
  document.getElementById('results-title').textContent = 'READY FOR PHASE TWO';
  document.getElementById('results-message-label').textContent = 'Next Mission';
  document.getElementById('result-score').textContent = `${score}/${total}`;

  let grade = 'KEEP PRACTISING';
  let gradeColor = '#ff2d78';
  if (pct === 100) { grade = 'EXPERT DECODER'; gradeColor = '#ffd700'; }
  else if (pct >= 67) { grade = 'SKILLED ANALYST'; gradeColor = '#00f5ff'; }
  else if (pct >= 34) { grade = 'LEARNING FAST'; gradeColor = '#a855f7'; }

  document.getElementById('result-grade').style.color = gradeColor;
  document.getElementById('result-grade').textContent = grade;

  const correct = answers.filter(a => a.correct).length;
  const fakesCaught = answers.filter(a => a.correct && a.actual === 'fake').length;
  const realVerified = answers.filter(a => a.correct && a.actual === 'real').length;

  document.getElementById('detective-badge').innerHTML = `
    <div style="font-family:'Orbitron',monospace; font-size:1.1rem; color:var(--gold); margin-bottom:6px;">
      Phase Two Briefing
    </div>
    <div style="font-size:0.98rem; color:#c0d8f0; line-height:1.6; max-width:640px; margin:0 auto;">
      Next: find 6 AI edits in one school photo.
    </div>
  `;

  document.getElementById('badge-row').innerHTML = `
    <div class="badge">
      <div class="badge-val" style="color:var(--green)">${correct}</div>
      <div class="badge-label">Correct</div>
    </div>
    <div class="badge">
      <div class="badge-val" style="color:var(--pink)">${fakesCaught}</div>
      <div class="badge-label">Fakes Caught</div>
    </div>
    <div class="badge">
      <div class="badge-val" style="color:var(--cyan)">${realVerified}</div>
      <div class="badge-label">Real Verified</div>
    </div>
  `;

  renderTips([
    'Check movement, lighting, and background.',
    'Look for warped edges, blur, and lip-sync issues.',
    'Use S.U.R.E. before sharing.'
  ]);

  document.getElementById('closing-message').innerHTML = `
    Same skills. New photo. Tap the edits.
  `;

  setResultsActions('START PHASE TWO', startPhaseTwo, 'REPLAY PHASE ONE', restartGame);
}

function showFinalResults(timedOut) {
  clearPhaseTwoTimer();
  clearPhaseTwoTransition();
  stopScenarioVideo();
  showScreen('screen-results');
  document.getElementById('hud').style.display = 'none';
  // Win = found all targets and not timed out
  setTimeout(() => (!timedOut && phaseTwoFoundIds.length >= PHASE_TWO_TARGETS.length)
    ? playResultsWinSound() : playResultsLoseSound(), 400);

  const total = PHASE_ONE_SCENARIOS.length + PHASE_TWO_TARGETS.length;
  const totalScore = score + phaseTwoFoundIds.length;
  const pct = Math.round((totalScore / total) * 100);
  const ring = document.querySelector('.score-ring');
  ring.style.background = `conic-gradient(var(--cyan) ${pct}%, var(--purple) ${pct}% 100%, #1a2550 100%)`;

  document.getElementById('results-section-label').textContent = 'Mission Complete';
  document.getElementById('results-title').textContent = 'FINAL RESULTS';
  document.getElementById('results-message-label').textContent = 'Final Message';
  document.getElementById('result-score').textContent = `${totalScore}/${total}`;

  let grade = 'KEEP PRACTISING';
  let gradeColor = '#ff2d78';
  if (pct >= 88) { grade = 'EXPERT DECODER'; gradeColor = '#ffd700'; }
  else if (pct >= 63) { grade = 'SKILLED ANALYST'; gradeColor = '#00f5ff'; }
  else if (pct >= 38) { grade = 'LEARNING FAST'; gradeColor = '#a855f7'; }

  document.getElementById('result-grade').style.color = gradeColor;
  document.getElementById('result-grade').textContent = grade;

  let badgeTitle = '"The Glitch"';
  let badgeDesc = 'Keep training your eye.';
  if (totalScore === total) {
    badgeTitle = '"The Deepfake Architect"';
    badgeDesc = 'Perfect clear.';
  } else if (totalScore >= total - 2) {
    badgeTitle = '"S.U.R.E. Specialist"';
    badgeDesc = 'Strong video and image instincts.';
  } else if (totalScore >= total / 2) {
    badgeTitle = '"Skeptical Scout"';
    badgeDesc = 'You caught several red flags.';
  }

  document.getElementById('detective-badge').innerHTML = `
    <div style="font-family:'Orbitron',monospace; font-size:1.1rem; color:var(--gold); margin-bottom:6px;">
      Detective Badge: ${badgeTitle}
    </div>
    <div style="font-size:0.98rem; color:#c0d8f0; line-height:1.6; max-width:640px; margin:0 auto;">
      ${badgeDesc}
    </div>
  `;

  document.getElementById('badge-row').innerHTML = `
    <div class="badge">
      <div class="badge-val" style="color:var(--cyan)">${score}/${PHASE_ONE_SCENARIOS.length}</div>
      <div class="badge-label">Phase One</div>
    </div>
    <div class="badge">
      <div class="badge-val" style="color:var(--green)">${phaseTwoFoundIds.length}/${PHASE_TWO_TARGETS.length}</div>
      <div class="badge-label">Phase Two</div>
    </div>
    <div class="badge">
      <div class="badge-val" style="color:var(--gold)">${phaseTwoTimeRemaining}s</div>
      <div class="badge-label">Time Left</div>
    </div>
  `;

  renderTips([
    'Deepfakes often show shifted edges, blur, or texture mismatch.',
    'Compare face, audio, lighting, and context.',
    'Check the source before sharing.'
  ]);

  document.getElementById('closing-message').innerHTML = timedOut
    ? `Good practice. Look for clues before trusting or sharing.`
    : `You cleared both phases. Spot clues, compare context, check the source.`;

  setResultsActions('REPLAY PHASE TWO', replayPhaseTwo, 'RETURN HOME', resetToHomeState);
}

updateHUD();
updateTimerUI();
resetPhaseTwoState();
armInitialLobbyMusic();
