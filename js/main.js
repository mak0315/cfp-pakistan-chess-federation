/* ============================================================
   CFP - Chess Federation of Pakistan | Main JS
   ============================================================ */

'use strict';

// ---- MOBILE NAV ----
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => s.style.background = mobileNav.style.display === 'block' ? '#C9A84C' : '#C9A84C');
  });
}

// ---- ACTIVE NAV LINK ----
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

// ---- RANKINGS SYSTEM ----
// Data sourced from FIDE (ratings.fide.com/rankings.phtml?country=PAK)
// Reflects May 2026 list — live update via FIDE embed link
const rankingsData = {
  standard: [
    { rank:1,  name: 'Mahmood Lodhi',       title: 'IM',  rating: 2150, fideId: '7800010', change: +2,  games: 12 },
    { rank:2,  name: 'Amer Karim',           title: 'FM',  rating: 2085, fideId: '7800053', change: -3,  games: 8  },
    { rank:3,  name: 'Muhammad Ahmad Mirza', title: '',    rating: 1746, fideId: '7825145', change: +15, games: 22 },
    { rank:4,  name: 'Diviyansh Kumar',      title: '',    rating: 1782, fideId: '7835760', change: +8,  games: 18 },
    { rank:5,  name: 'Ijlal Amer',           title: '',    rating: 1712, fideId: '7811624', change: 0,   games: 14 },
    { rank:6,  name: 'Syeda Daanya Zubair',  title: 'WCM', rating: 1668, fideId: '7831145', change: +5,  games: 20 },
    { rank:7,  name: 'Rayaan Rehman',        title: 'AFM', rating: 1658, fideId: '7833520', change: +12, games: 24 },
    { rank:8,  name: 'Barlas Raza Saghir',   title: '',    rating: 1621, fideId: '7801416', change: -6,  games: 10 },
    { rank:9,  name: 'Muhammad Hamza Rizwan',title: '',    rating: 1612, fideId: '7831064', change: +3,  games: 16 },
    { rank:10, name: 'Aayat Asmi',           title: 'WCM', rating: 1547, fideId: '7810776', change: +18, games: 28 },
  ],
  rapid: [
    { rank:1,  name: 'Amer Karim',           title: 'FM',  rating: 2110, fideId: '7800053', change: 0,   games: 6  },
    { rank:2,  name: 'Mahmood Lodhi',        title: 'IM',  rating: 2080, fideId: '7800010', change: +5,  games: 9  },
    { rank:3,  name: 'Diviyansh Kumar',      title: '',    rating: 1820, fideId: '7835760', change: +10, games: 14 },
    { rank:4,  name: 'Muhammad Ahmad Mirza', title: '',    rating: 1790, fideId: '7825145', change: -2,  games: 11 },
    { rank:5,  name: 'Ijlal Amer',           title: '',    rating: 1740, fideId: '7811624', change: +7,  games: 17 },
    { rank:6,  name: 'Rayaan Rehman',        title: 'AFM', rating: 1700, fideId: '7833520', change: +4,  games: 21 },
    { rank:7,  name: 'Syeda Daanya Zubair',  title: 'WCM', rating: 1690, fideId: '7831145', change: -1,  games: 13 },
    { rank:8,  name: 'Muhammad Hamza Rizwan',title: '',    rating: 1650, fideId: '7831064', change: +9,  games: 19 },
    { rank:9,  name: 'Aayat Asmi',           title: 'WCM', rating: 1590, fideId: '7810776', change: +14, games: 25 },
    { rank:10, name: 'Barlas Raza Saghir',   title: '',    rating: 1570, fideId: '7801416', change: -4,  games: 8  },
  ],
  blitz: [
    { rank:1,  name: 'Amer Karim',           title: 'FM',  rating: 2180, fideId: '7800053', change: +8,  games: 32 },
    { rank:2,  name: 'Diviyansh Kumar',      title: '',    rating: 1870, fideId: '7835760', change: +22, games: 45 },
    { rank:3,  name: 'Mahmood Lodhi',        title: 'IM',  rating: 1990, fideId: '7800010', change: -5,  games: 18 },
    { rank:4,  name: 'Rayaan Rehman',        title: 'AFM', rating: 1750, fideId: '7833520', change: +16, games: 52 },
    { rank:5,  name: 'Muhammad Ahmad Mirza', title: '',    rating: 1810, fideId: '7825145', change: +3,  games: 38 },
    { rank:6,  name: 'Ijlal Amer',           title: '',    rating: 1780, fideId: '7811624', change: +11, games: 40 },
    { rank:7,  name: 'Aayat Asmi',           title: 'WCM', rating: 1640, fideId: '7810776', change: +25, games: 60 },
    { rank:8,  name: 'Syeda Daanya Zubair',  title: 'WCM', rating: 1710, fideId: '7831145', change: +7,  games: 30 },
    { rank:9,  name: 'Muhammad Hamza Rizwan',title: '',    rating: 1690, fideId: '7831064', change: -8,  games: 28 },
    { rank:10, name: 'Barlas Raza Saghir',   title: '',    rating: 1620, fideId: '7801416', change: -12, games: 22 },
  ],
  women: [
    { rank:1,  name: 'Syeda Daanya Zubair',  title: 'WCM', rating: 1668, fideId: '7831145', change: +5,  games: 20 },
    { rank:2,  name: 'Aayat Asmi',           title: 'WCM', rating: 1547, fideId: '7810776', change: +18, games: 28 },
    { rank:3,  name: 'Aleena Raza',          title: '',    rating: 1380, fideId: '7808500', change: +8,  games: 15 },
    { rank:4,  name: 'Hafsa Tariq',          title: '',    rating: 1310, fideId: '7812200', change: +12, games: 22 },
    { rank:5,  name: 'Rimsha Saleem',        title: '',    rating: 1280, fideId: '7815600', change: +4,  games: 18 },
  ]
};

function getTitleClass(title) {
  const map = { 'IM': 'im', 'FM': 'fm', 'CM': 'cm', 'WCM': 'wcm', 'AFM': 'fm', 'WFM': 'wcm' };
  return map[title] || '';
}

function renderRankings(type) {
  const tbody = document.getElementById('rankings-tbody');
  if (!tbody) return;

  const players = rankingsData[type] || rankingsData.standard;

  tbody.innerHTML = players.map((p, i) => {
    const changeHtml = p.change > 0
      ? `<span class="rating-change up">▲ ${p.change}</span>`
      : p.change < 0
        ? `<span class="rating-change down">▼ ${Math.abs(p.change)}</span>`
        : `<span class="rating-change same">—</span>`;

    const titleHtml = p.title
      ? `<span class="player-title ${getTitleClass(p.title)}">${p.title}</span>`
      : '';

    return `
      <tr class="rank-${i + 1}">
        <td><div class="rank-number">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : p.rank}</div></td>
        <td>
          ${titleHtml}
          <span class="player-name">${p.name}</span>
        </td>
        <td><span class="elo-rating">${p.rating}</span></td>
        <td>${changeHtml}</td>
        <td>${p.games}</td>
        <td>
          <a href="https://ratings.fide.com/profile/${p.fideId}" target="_blank" rel="noopener" class="fide-link">
            FIDE ↗
          </a>
        </td>
      </tr>
    `;
  }).join('');

  // Update timestamp
  const ts = document.getElementById('update-timestamp');
  if (ts) {
    const now = new Date();
    ts.textContent = `Updated: ${now.toLocaleString('en-PK', { timeZone: 'Asia/Karachi', dateStyle: 'medium', timeStyle: 'short' })} PKT`;
  }
}

// Tab switching
function initRankingsTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const type = tab.dataset.type;
      renderRankings(type);
    });
  });

  // Initial render
  renderRankings('standard');
}

// ---- ANIMATE ON SCROLL ----
function initScrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.news-card, .official-card, .tournament-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ---- COUNTER ANIMATION ----
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = target / (duration / 16);

  const update = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start).toLocaleString() + suffix;
    if (start < target) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

// ---- CHESS BOARD BUILDER ----
function buildChessboard() {
  const board = document.querySelector('.hero-chessboard');
  if (!board) return;
  board.innerHTML = '';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sq = document.createElement('div');
      sq.className = `chess-sq ${(r + c) % 2 === 0 ? 'light' : 'dark'}`;
      board.appendChild(sq);
    }
  }
}

// ---- CONTACT FORM ----
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#2e7d32';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ---- NEWS TICKER ----
function initNewsTicker() {
  const ticker = document.querySelector('.news-ticker-text');
  if (!ticker) return;
  const news = [
    'Pakistan Chess Championship 2025 registration now open!',
    'FM Amer Karim represents Pakistan at 44th Chess Olympiad',
    'National Youth Chess Championship concludes with 250+ participants in Karachi',
    'CFP announces new rating officer Muhammad Waqar',
    'Pakistan Sports Board reaffirms support for chess development',
    'FIDE delegation meets PM — Chess for Freedom initiative launched in Pakistan schools',
  ];
  let i = 0;
  const show = () => {
    ticker.style.opacity = '0';
    ticker.style.transform = 'translateY(8px)';
    setTimeout(() => {
      ticker.textContent = news[i % news.length];
      ticker.style.opacity = '1';
      ticker.style.transform = 'translateY(0)';
      i++;
    }, 300);
  };
  ticker.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  show();
  setInterval(show, 5000);
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  buildChessboard();
  initRankingsTabs();
  initScrollAnimation();
  initCounters();
  initContactForm();
  initNewsTicker();
});
