// ── Sound data (from cdn.jsdelivr.net/gh/genizy/soundboard@main) ──
const CDN = 'https://cdn.jsdelivr.net/gh/genizy/soundboard@main';

const sounds = [
  { name: 'FAHHHHHHHHHHHHH',          icon: '😱', mp3: '/media/sounds/fahhhhhhhhhhhhhh.mp3' },
  { name: 'VINE BOOM SOUND',           icon: '💥', mp3: '/media/sounds/vine-boom.mp3' },
  { name: 'FAAAH',                     icon: '😩', mp3: '/media/sounds/faaah.mp3' },
  { name: 'Fart',                      icon: '💨', mp3: '/media/sounds/dry-fart.mp3' },
  { name: 'Fahhh',                     icon: '😮', mp3: '/media/sounds/fahhh_KcgAXfs.mp3' },
  { name: 'Rizz sound effect',         icon: '😎', mp3: '/media/sounds/rizz-sound-effect.mp3' },
  { name: 'Among Us role reveal',      icon: '🔴', mp3: '/media/sounds/among-us-role-reveal-sound.mp3' },
  { name: 'Chicken on tree screaming', icon: '🐔', mp3: '/media/sounds/chicken-on-tree-screaming.mp3' },
  { name: 'Anime Wow',                 icon: '✨', mp3: '/media/sounds/anime-wow.mp3' },
  { name: 'Bruh',                      icon: '😑', mp3: '/media/sounds/bruh.mp3' },
  { name: 'GigaChad',                  icon: '💪', mp3: '/media/sounds/gigachad.mp3' },
  { name: 'MLG Air Horn',              icon: '📯', mp3: '/media/sounds/mlg-airhorn.mp3' },
  { name: 'Oof',                       icon: '😵', mp3: '/media/sounds/oof.mp3' },
  { name: 'Sad Violin',                icon: '🎻', mp3: '/media/sounds/sad-violin.mp3' },
  { name: 'Siren',                     icon: '🚨', mp3: '/media/sounds/siren.mp3' },
  { name: 'Crickets',                  icon: '🦗', mp3: '/media/sounds/cricket-sound.mp3' },
  { name: 'Windows Error',             icon: '🖥️', mp3: '/media/sounds/windows-error.mp3' },
  { name: 'Windows XP Startup',        icon: '🪟', mp3: '/media/sounds/windows-xp-startup.mp3' },
  { name: 'To Be Continued',           icon: '🎵', mp3: '/media/sounds/to-be-continued.mp3' },
  { name: 'Emotional damage',          icon: '💔', mp3: '/media/sounds/emotional-damage.mp3' },
  { name: 'Run!',                      icon: '🏃', mp3: '/media/sounds/run.mp3' },
  { name: 'Skibidi',                   icon: '🚽', mp3: '/media/sounds/skibidi.mp3' },
  { name: 'Nope',                      icon: '🚫', mp3: '/media/sounds/nope.mp3' },
  { name: 'We do a little trolling',   icon: '😈', mp3: '/media/sounds/we-do-a-little-trolling.mp3' },
];

// ── State ──
let allowOverlap = false;
let showFavoritesOnly = false;
let globalVolume = 0.8;
let currentAudios = [];
const favorites = JSON.parse(localStorage.getItem('sb-favorites') || '[]');

// ── Render ──
function renderSounds() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const board = document.getElementById('soundboard');
  const label = document.getElementById('sectionLabel');
  board.innerHTML = '';

  let list = sounds.filter(s => s.name.toLowerCase().includes(query));
  if (showFavoritesOnly) list = list.filter(s => favorites.includes(s.name));

  label.textContent = showFavoritesOnly ? 'Favorites' : 'All sounds';
  document.getElementById('favCount').textContent = favorites.length;

  if (list.length === 0) {
    board.innerHTML = '<div class="empty">No sounds found</div>';
    return;
  }

  list.forEach(sound => {
    const btn = document.createElement('div');
    btn.className = 'sound-btn';

    const isFav = favorites.includes(sound.name);
    btn.innerHTML = `
      <div class="sound-icon">${sound.icon}</div>
      <div class="sound-label">${sound.name}</div>
      <div class="prog-bar"><div class="prog-fill"></div></div>
      <button class="fav-btn ${isFav ? 'starred' : ''}" title="Favorite">★</button>
    `;

    // Play on click
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('fav-btn')) return;
      if (!allowOverlap) {
        currentAudios.forEach(a => { a.pause(); a.currentTime = 0; });
        currentAudios = [];
        document.querySelectorAll('.sound-btn.playing').forEach(b => b.classList.remove('playing'));
        document.querySelectorAll('.wave-bar').forEach(b => b.classList.remove('active'));
      }
      const audio = new Audio(CDN + sound.mp3);
      audio.volume = Math.min(globalVolume, 1);
      audio.play();
      currentAudios.push(audio);
      btn.classList.add('playing');
      document.querySelectorAll('.wave-bar').forEach(b => b.classList.add('active'));

      // Progress bar
      const fill = btn.querySelector('.prog-fill');
      audio.addEventListener('timeupdate', () => {
        if (audio.duration) fill.style.width = (audio.currentTime / audio.duration * 100) + '%';
      });
      audio.addEventListener('ended', () => {
        btn.classList.remove('playing');
        fill.style.width = '0%';
        currentAudios = currentAudios.filter(a => a !== audio);
        if (currentAudios.length === 0)
          document.querySelectorAll('.wave-bar').forEach(b => b.classList.remove('active'));
      });

      // Ripple
      const ripple = document.createElement('div');
      ripple.className = 'ripple-ring';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });

    // Favorite toggle
    btn.querySelector('.fav-btn').addEventListener('click', () => {
      const idx = favorites.indexOf(sound.name);
      if (idx === -1) favorites.push(sound.name);
      else favorites.splice(idx, 1);
      localStorage.setItem('sb-favorites', JSON.stringify(favorites));
      renderSounds();
    });

    board.appendChild(btn);
  });
}

// ── Controls ──
document.getElementById('searchInput').addEventListener('input', renderSounds);

document.getElementById('toggleButton').addEventListener('click', () => {
  allowOverlap = !allowOverlap;
  document.getElementById('toggleButton').classList.toggle('active', allowOverlap);
});

document.getElementById('stopButton').addEventListener('click', () => {
  currentAudios.forEach(a => { a.pause(); a.currentTime = 0; });
  currentAudios = [];
  document.querySelectorAll('.sound-btn.playing').forEach(b => b.classList.remove('playing'));
  document.querySelectorAll('.prog-fill').forEach(f => f.style.width = '0%');
  document.querySelectorAll('.wave-bar').forEach(b => b.classList.remove('active'));
});

document.getElementById('toggleFavorites').addEventListener('click', () => {
  showFavoritesOnly = !showFavoritesOnly;
  document.getElementById('toggleFavorites').classList.toggle('active', showFavoritesOnly);
  renderSounds();
});

// ── Volume ──
document.getElementById('volSlider').addEventListener('input', e => {
  const v = parseInt(e.target.value);
  globalVolume = v / 100;
  document.getElementById('volPct').textContent = v + '%';
  document.getElementById('volPct').style.color = v > 100 ? '#ff6b6b' : '#a76cff';
});

document.getElementById('overdriveBtn').addEventListener('click', () => {
  const s = document.getElementById('volSlider');
  s.max = 400; s.value = 400;
  s.dispatchEvent(new Event('input'));
});

// ── Loader ──
window.addEventListener('load', () => {
  renderSounds();
  setTimeout(() => {
    document.getElementById('loader').classList.add('fade');
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
      document.getElementById('main').classList.add('visible');
    }, 520);
  }, 800);
});
