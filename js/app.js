/**
 * FFLegendsHub - Main Application
 * Core application logic and navigation
 */

const App = {
    currentPage: 'dashboard',
    isReady: false,

    /**
     * Initialize application
     */
    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupScrollButtons();
        this.detectPage();

        // Wait for DB to be ready
        window.addEventListener('dbReady', () => {
            this.isReady = true;
            window.dispatchEvent(new CustomEvent('appReady'));
        });

        // If DB already initialized
        if (DB.isInitialized) {
            this.isReady = true;
            window.dispatchEvent(new CustomEvent('appReady'));
        }
    },

    /**
     * Detect current page
     */
    detectPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'dashboard';

        const pageMap = {
            'index': 'dashboard',
            'dashboard': 'dashboard',
            'players': 'players',
            'oyuncular': 'players',
            'matches': 'matches',
            'draft': 'draft',
            'leaderboard': 'leaderboard',
            'champions': 'champions',
            'settings': 'settings'
        };

        this.currentPage = pageMap[page] || 'dashboard';
        this.highlightActiveNav();
    },

    /**
     * Setup navigation
     */
    setupNavigation() {
        const urlParams = new URLSearchParams(window.location.search);
        const seasonId = urlParams.get('season');

        // Add Season Banner if active
        if (seasonId) {
            this.showSeasonBanner(seasonId);
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            // Persist season param
            if (seasonId) {
                const href = link.getAttribute('href');
                if (href && !href.includes('season=')) {
                    const separator = href.includes('?') ? '&' : '?';
                    link.setAttribute('href', `${href}${separator}season=${seasonId}`);
                }
            }

            link.addEventListener('click', (e) => {
                // Let normal navigation happen
            });
        });
    },

    showSeasonBanner(seasonId) {
        const banner = document.createElement('div');
        banner.className = 'season-banner';
        banner.style.cssText = `
            background: linear-gradient(90deg, #ff8c00, #ff5f6d);
            color: white;
            padding: 10px 20px;
            text-align: center;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
            margin-bottom: 20px;
            border-radius: 8px;
        `;
        banner.innerHTML = `
            <span>📅 Şu an <strong>${seasonId}</strong> sezonunu görüntülüyorsunuz.</span>
            <button onclick="App.exitSeasonMode()" class="btn btn-sm" style="background: white; color: #ff8c00; border: none; padding: 4px 12px; font-size: 12px;">Mevcut Sezona Dön</button>
        `;

        const main = document.querySelector('.main-content');
        if (main) {
            main.insertBefore(banner, main.firstChild);
        }
    },

    exitSeasonMode() {
        // Remove season param and reload dashboard or current page
        const path = window.location.pathname;
        window.location.href = path; // Reloads without query params (mostly)
    },

    /**
     * Highlight active nav item
     */
    highlightActiveNav() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href) {
                const linkPage = href.replace('.html', '').replace('./', '');
                if ((linkPage === 'index' || linkPage === 'dashboard') && this.currentPage === 'dashboard') {
                    link.classList.add('active');
                } else if (linkPage === this.currentPage ||
                    (linkPage === 'oyuncular' && this.currentPage === 'players')) {
                    link.classList.add('active');
                }
            }
        });
    },

    /**
     * Setup mobile menu
     */
    setupMobileMenu() {
        const toggle = document.getElementById('menu-toggle');
        const sidebar = document.querySelector('.sidebar');

        if (toggle && sidebar) {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });

            document.addEventListener('click', (e) => {
                if (sidebar.classList.contains('open') &&
                    !sidebar.contains(e.target) &&
                    !toggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            });
        }
    },

    /**
     * Setup scroll buttons
     */
    setupScrollButtons() {
        const container = document.createElement('div');
        container.className = 'scroll-buttons';
        container.innerHTML = `
            <button class="scroll-btn" id="scroll-up-btn" title="Yukarı">▲</button>
            <button class="scroll-btn" id="scroll-down-btn" title="Aşağı">▼</button>
        `;
        document.body.appendChild(container);

        document.getElementById('scroll-up-btn')?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.getElementById('scroll-down-btn')?.addEventListener('click', () => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });
    },

    /**
     * Navigate to page
     */
    navigateTo(page) {
        window.location.href = page + '.html';
    },

    /**
     * Open modal
     */
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    /**
     * Close modal
     */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    /**
     * Close all modals
     */
    closeAllModals() {
        document.querySelectorAll('.modal-backdrop').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    },

    /**
     * Confirm dialog
     */
    confirm(message) {
        return window.confirm(message);
    },

    /**
     * Get URL parameter
     */
    getUrlParam(param) {
        return new URLSearchParams(window.location.search).get(param);
    },

    /**
     * Format player card HTML
     */
    formatPlayerCard(player, stats = null) {
        const playerStats = stats || Stats.calculatePlayerStats(player.id);
        if (!playerStats) return '';

        const initials = Utils.getInitials(player.nickname || player.name);
        const avatarColor = Utils.getAvatarColor(player.nickname || player.name);
        const mainRole = Stats.getMainRole(player);

        return `
            <div class="player-card card" data-id="${player.id}" onclick="window.location.href='players.html?id=${player.id}'">
                <div class="player-card-header">
                ${Utils.renderAvatarHtml(player, 'avatar-lg')}
                <div class="player-card-info">
                    <h4 class="player-nickname">${Utils.escapeHtml(player.nickname || player.name)}</h4>
                    ${player.realName ? `<span class="text-muted">${Utils.escapeHtml(player.realName)}</span>` : ''}
                </div>
                <span class="badge badge-gold">${Utils.getRoleName(mainRole)}</span>
            </div>
                <div class="player-card-stats">
                    <div class="stat-item">
                        <span class="stat-value">${playerStats.totalMatches}</span>
                        <span class="stat-label">Maç</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value ${playerStats.winRate >= 50 ? 'text-win' : 'text-lose'}">${playerStats.winRate}%</span>
                        <span class="stat-label">Kazanma</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${playerStats.kda}</span>
                        <span class="stat-label">KDA</span>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Format match card HTML
     */
    formatMatchCard(match) {
        const blueWon = match.winnerTeam === 'blue';
        const blueKills = match.blueTeam?.reduce((sum, p) => sum + (parseInt(p.kills || p.k) || 0), 0) || 0;
        const redKills = match.redTeam?.reduce((sum, p) => sum + (parseInt(p.kills || p.k) || 0), 0) || 0;

        return `
            <div class="match-card card" data-id="${match.id}">
                <div class="match-card-header">
                    <span class="match-date">${Utils.formatDate(match.date)}</span>
                    <span class="badge ${blueWon ? 'badge-blue' : 'badge-red'}">${blueWon ? 'Mavi Kazandı' : 'Kırmızı Kazandı'}</span>
                </div>
                <div class="match-card-teams">
                    <div class="team blue ${blueWon ? 'winner' : ''}">
                        <span class="badge badge-blue">Mavi</span>
                        <span class="team-score">${blueKills}</span>
                    </div>
                    <span class="vs">VS</span>
                    <div class="team red ${!blueWon ? 'winner' : ''}">
                        <span class="team-score">${redKills}</span>
                        <span class="badge badge-red">Kırmızı</span>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Format leaderboard row
     */
    formatLeaderboardRow(stats, rank) {
        const player = stats.player;
        const initials = Utils.getInitials(player.nickname || player.name);
        const avatarColor = Utils.getAvatarColor(player.nickname || player.name);

        let rankClass = '';
        if (rank === 1) rankClass = 'top-1';
        else if (rank === 2) rankClass = 'top-2';
        else if (rank === 3) rankClass = 'top-3';

        return `
            <tr>
                <td class="rank-cell">
                    <span class="rank ${rankClass}">#${rank}</span>
                </td>
                <td>
                    <div class="flex items-center gap-4">
                        ${Utils.renderAvatarHtml(player)}
                        <span>${Utils.escapeHtml(player.nickname || player.name)}</span>
                    </div>
                </td>
                <td class="text-center">${stats.totalMatches}</td>
                <td class="text-center">${stats.wins}/${stats.losses}</td>
                <td class="text-center ${stats.winRate >= 50 ? 'text-win' : 'text-lose'}">${stats.winRate}%</td>
                <td class="text-center" style="color: var(--gold)">${stats.kda}</td>
            </tr>
        `;
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Handle escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        App.closeAllModals();
    }
});
