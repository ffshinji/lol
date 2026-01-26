/**
 * Settings Page Logic
 */

// Expose functions globally
window.archiveSeason = archiveSeason;
window.resetSeason = resetSeason;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize DB
    if (typeof DB !== 'undefined') {
        DB.init();
        updateStats();
    }
});

function updateStats() {
    if (!DB.data) return;

    const pCount = document.getElementById('stats-players');
    const mCount = document.getElementById('stats-matches');
    const uTime = document.getElementById('stats-updated');

    if (pCount) pCount.textContent = DB.data.players.length;
    if (mCount) mCount.textContent = DB.data.matches.length;
    if (uTime) uTime.textContent = new Date().toLocaleString();
}

/**
 * Archive the current season
 */
/**
 * Archive the current season
 */
function archiveSeason() {
    const input = document.getElementById('season-name-input');
    const name = input ? input.value : null;

    if (!name) {
        alert('Lütfen sezon adı giriniz.');
        return;
    }

    // Modal is already the confirmation
    if (DB.archiveCurrentSeason(name)) {
        alert('Sezon başarıyla arşivlendi.');
        closeModal('archive-modal');
        location.reload();
    } else {
        alert('Hata: Sezon adı zaten var veya bir sorun oluştu.');
    }
}

function resetSeason() {
    // Modal is already the confirmation (Red warning + "Evet, Sıfırla" button)
    if (DB.resetCurrentSeason()) {
        alert('Sezon başarıyla sıfırlandı. Yeni sezon başladı!');
        closeModal('reset-season-modal');
        location.reload();
    } else {
        alert('Hata oluştu.');
    }
}

// Modal Helpers (if not globally available from app.js)
// Usually App.js handles modals, but settings might be standalone-ish.
// Let's rely on standard window functions if they exist, or define simple ones.

if (typeof window.openModal !== 'function') {
    window.openModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = 'block';
    }
}

if (typeof window.closeModal !== 'function') {
    window.closeModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target.classList.contains('modal-backdrop') || event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
