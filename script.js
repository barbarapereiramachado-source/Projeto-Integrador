// ===== MODO CLARO/ESCURO =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Verifica preferência salva ou do sistema
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  body.classList.add('dark-mode');
  themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ===== LEITURA EM VOZ ALTA (Text-to-Speech) =====
const readToggle = document.getElementById('read-aloud-toggle');
const readIcon = document.getElementById('read-icon');
let isReading = false;
let utterance = null;

function getPageText() {
  // Ajuste o seletor para pegar o conteúdo principal do seu site
  const main = document.querySelector('main') || document.body;
  return main.innerText;
}

function toggleReadAloud() {
  const synth = window.speechSynthesis;

  if (isReading) {
    synth.cancel();
    isReading = false;
    readIcon.textContent = '🔊';
    readToggle.classList.remove('active');
    return;
  }

  const text = getPageText();
  if (!text.trim()) return;

  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onend = () => {
    isReading = false;
    readIcon.textContent = '🔊';
    readToggle.classList.remove('active');
  };

  synth.speak(utterance);
  isReading = true;
  readIcon.textContent = '⏹️';
  readToggle.classList.add('active');
}

readToggle.addEventListener('click', toggleReadAloud);