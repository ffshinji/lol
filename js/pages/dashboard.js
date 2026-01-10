/**
 * FFLegendsHub - Dashboard Page
 */

const DashboardPage = {
    /**
     * Initialize dashboard
     */
    init() {
        window.addEventListener('appReady', () => {
            this.loadDashboard();
        });

        // If already ready
        if (App.isReady) {
            this.loadDashboard();
        }
    },

    /**
     * Load dashboard data
     */
    loadDashboard() {
        const stats = Stats.getDashboardStats();

        // Update stat cards
        document.getElementById('total-players').textContent = DB.getPlayers().length;
        document.getElementById('total-matches').textContent = DB.getMatches().length;

        if (stats) {
            // Top Win Rate
            if (stats.topWinRatePlayer) {
                const topWR = stats.topWinRatePlayer;
                document.getElementById('top-winrate-player').innerHTML = `
                    <div class="flex items-center gap-3">
                        ${Utils.renderAvatarHtml(topWR.player, 'avatar-md')}
                        <div>
                            <span style="font-size: var(--text-xl); font-weight: bold; color: var(--win);">${topWR.winRate}%</span>
                            <span style="font-size: var(--text-sm); color: var(--text-secondary); display: block;">${Utils.escapeHtml(topWR.player.nickname || topWR.player.name)}</span>
                        </div>
                    </div>
                `;
            }

            // Top KDA
            if (stats.topKDAPlayer) {
                const topKDA = stats.topKDAPlayer;
                document.getElementById('top-player').innerHTML = `
                    <div class="flex items-center gap-3">
                        ${Utils.renderAvatarHtml(topKDA.player, 'avatar-md')}
                        <div>
                            <span style="font-size: var(--text-xl); font-weight: bold; color: var(--cyan);">${topKDA.kda}</span>
                            <span style="font-size: var(--text-sm); color: var(--text-secondary); display: block;">${Utils.escapeHtml(topKDA.player.nickname || topKDA.player.name)}</span>
                        </div>
                    </div>
                `;
            }

            // Recent Matches
            this.loadRecentMatches(stats.recentMatches);

            // Leaderboard Preview
            this.loadLeaderboardPreview();
        }

        // Show quick start if no data
        const quickStart = document.getElementById('quick-start');
        if (quickStart) {
            quickStart.style.display = DB.getMatches().length === 0 ? 'block' : 'none';
        }
    },

    /**
     * Load recent matches
     */
    loadRecentMatches(matches) {
        const container = document.getElementById('recent-matches');
        if (!container) return;

        if (!matches || matches.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="padding: var(--space-8)">
                    <p class="text-muted">Henüz maç kaydı yok.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = matches.map(match => App.formatMatchCard(match)).join('');
    },

    /**
     * Load leaderboard preview
     */
    loadLeaderboardPreview() {
        const container = document.getElementById('leaderboard-preview');
        if (!container) return;

        const leaderboard = Stats.getLeaderboard('winRate', 5, 1);

        if (leaderboard.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="padding: var(--space-8)">
                    <p class="text-muted">Henüz oyuncu yok.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width: 60px">Sıra</th>
                            <th>Oyuncu</th>
                            <th class="text-center">Maç</th>
                            <th class="text-center">W/L</th>
                            <th class="text-center">WR</th>
                            <th class="text-center">KDA</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${leaderboard.map((s, i) => App.formatLeaderboardRow(s, i + 1)).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    DashboardPage.init();
});
