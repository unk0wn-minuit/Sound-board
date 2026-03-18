// ── Sound data (from cdn.jsdelivr.net/gh/genizy/soundboard@main) ──
const CDN = 'https://cdn.jsdelivr.net/gh/genizy/soundboard@main';

const sounds = [
  { name: 'FAHHHHHHHHHHHHHH',             color: 'rgb(255, 0, 0)',     mp3: '/media/sounds/fahhhhhhhhhhhhhh.mp3' },
  { name: 'VINE BOOM SOUND',              color: 'rgb(255, 0, 0)',     mp3: '/media/sounds/vine-boom.mp3' },
  { name: 'FAAAH',                        color: 'rgb(0, 0, 255)',     mp3: '/media/sounds/faaah.mp3' },
  { name: 'Fart',                         color: 'rgb(102, 51, 0)',    mp3: '/media/sounds/dry-fart.mp3' },
  { name: 'Fahhh',                        color: 'rgb(255, 0, 0)',     mp3: '/media/sounds/fahhh_KcgAXfs.mp3' },
  { name: 'rizz sound effect',            color: 'rgb(255, 0, 0)',     mp3: '/media/sounds/rizz-sound-effect.mp3' },
  { name: 'Among Us role reveal sound',   color: 'rgb(255, 0, 0)',     mp3: '/media/sounds/among-us-role-reveal-sound.mp3' },
  { name: 'Chicken on tree screaming',    color: 'rgb(255, 0, 0)',     mp3: '/media/sounds/chicken-on-tree-screaming.mp3' },
  { name: 'Anime Wow',                    color: 'rgb(255, 54, 100)',  mp3: '/media/sounds/anime-wow.mp3' },
  { name: 'Bruh',                         color: 'rgb(255, 255, 0)',   mp3: '/media/sounds/bruh.mp3' },
  { name: 'GigaChad',                     color: 'rgb(255, 165, 0)',   mp3: '/media/sounds/gigachad.mp3' },
  { name: 'MLG Air Horn',                 color: 'rgb(0, 200, 255)',   mp3: '/media/sounds/mlg-airhorn.mp3' },
  { name: 'Oof',                          color: 'rgb(255, 80, 0)',    mp3: '/media/sounds/oof.mp3' },
  { name: 'Sad Violin',                   color: 'rgb(100, 100, 255)', mp3: '/media/sounds/sad-violin.mp3' },
  { name: 'Siren',                        color: 'rgb(255, 0, 0)',     mp3: '/media/sounds/siren.mp3' },
  { name: 'Crickets',                     color: 'rgb(0, 180, 0)',     mp3: '/media/sounds/cricket-sound.mp3' },
  { name: 'Windows Error',                color: 'rgb(0, 120, 215)',   mp3: '/media/sounds/windows-error.mp3' },
  { name: 'Windows XP Startup',           color: 'rgb(0, 120, 215)',   mp3: '/media/sounds/windows-xp-startup.mp3' },
  { name: 'To Be Continued',              color: 'rgb(255, 220, 0)',   mp3: '/media/sounds/to-be-continued.mp3' },
  { name: 'Emotional damage',             color: 'rgb(220, 0, 80)',    mp3: '/media/sounds/emotional-damage.mp3' },
  { name: 'Run!',                         color: 'rgb(255, 100, 0)',   mp3: '/media/sounds/run.mp3' },
  { name: 'Skibidi',                      color: 'rgb(0, 200, 200)',   mp3: '/media/sounds/skibidi.mp3' },
  { name: 'Nope',                         color: 'rgb(255, 0, 0)',     mp3: '/media/sounds/nope.mp3' },
  { name: 'We do a little trolling',      color: 'rgb(150, 0, 200)',   mp3: '/media/sounds/we-do-a-little-trolling.mp3' },
  { name: 'Apple Pay',                    color: 'rgb(255, 0, 0)',     mp3: '/media/sounds/applepay.mp3' },
  { name: 'Bone Crack',                   color: 'rgb(255, 255, 160)', mp3: '/media/sounds/bone-crack.mp3' },
  { name: 'rip my granny she got hit by a bazooka', color: 'rgb(147, 255, 233)', mp3: '/media/sounds/rip-my-granny-she-got-hit-by-a-bazooka.mp3' },
  { name: 'SpongeBob Fail',               color: 'rgb(202, 195, 26)',  mp3: '/media/sounds/spongebob-fail.mp3' },
  { name: 'Hub Intro Sound',              color: 'rgb(255, 150, 30)',  mp3: '/media/sounds/hub-intro-sound.mp3' },
  { name: 'LIZARD BUTTON',               color: 'rgb(127, 168, 255)', mp3: '/media/sounds/lizard-button.mp3' },
  { name: 'Dexter meme',                  color: 'rgb(255, 0, 0)',     mp3: '/media/sounds/dexter-meme.mp3' },
  { name: 'Metal pipe clang',             color: 'rgb(92, 92, 92)',    mp3: '/media/sounds/metal-pipe-clang.mp3' },
  { name: 'Fart Button',                  color: 'rgb(51, 153, 0)',    mp3: '/media/sounds/perfect-fart.mp3' },
  { name: 'Tuco: GET OUT',               color: 'rgb(255, 0, 0)',     mp3: '/media/sounds/tuco-get-out.mp3' },
  { name: 'BRUH',                         color: 'rgb(255, 255, 51)',  mp3: '/media/sounds/movie_1.mp3' },
  ];

// ── State ──
let allowOverlap = false;
let showFavoritesOnly = false;
let globalVolume = 0.8;
let currentAudios = [];
const favorites = JSON.parse(localStorage.getItem('sb-favorites') || '[]');

// ── Web Audio context for overdrive (>100% volume) ──
let audioCtx = null;
function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

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
        const btn = document.createElement('button');
        btn.className = 'sound-btn';
        btn.style.setProperty('--btn-color', sound.color);

                   const isFav = favorites.includes(sound.name);
        btn.innerHTML = `
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
                           const gain = globalVolume;

                                              if (gain <= 1) {
                                                        // Normal volume: direct Audio API
                             audio.volume = gain;
                                                        audio.play();
                                              } else {
                                                        // Overdrive: use Web Audio GainNode
                             const ctx = getAudioCtx();
                                                        const source = ctx.createMediaElementSource(audio);
                                                        const gainNode = ctx.createGain();
                                                        gainNode.gain.value = gain;
                                                        source.connect(gainNode);
                                                        gainNode.connect(ctx.destination);
                                                        audio.play();
                                              }

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
                   btn.querySelector('.fav-btn').addEventListener('click', (e) => {
                           e.stopPropagation();
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
    s.max = 400;
    s.value = 400;
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
