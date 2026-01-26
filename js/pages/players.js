/**
 * FFLegendsHub - Players Page
 * Compact player cards for 30+ players
 */

const PlayersPage = {
    currentView: 'list',
    currentPlayer: null,
    showAllMatches: false,

    /**
     * Initialize
     */
    init() {
        window.addEventListener('appReady', () => {
            this.loadPlayers();
            this.setupSearch();
        });

        if (typeof App !== 'undefined' && App.isReady) {
            this.loadPlayers();
            this.setupSearch();
        }

        // Check URL for player ID
        const urlParams = new URLSearchParams(window.location.search);
        const playerId = urlParams.get('id');
        if (playerId) {
            this.showPlayerDetail(playerId);
        }
    },

    /**
     * Setup search
     */
    setupSearch() {
        const searchInput = document.getElementById('player-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterPlayers(e.target.value);
            });
        }
    },

    /**
     * Load all players with compact cards
     */
    loadPlayers() {
        const container = document.getElementById('players-grid');
        if (!container) return;

        const urlParams = new URLSearchParams(window.location.search);
        const seasonId = urlParams.get('season');

        let players = [];

        if (seasonId) {
            // Load from Archive
            const seasonData = DB.getSeasonData(seasonId);
            if (seasonData && seasonData.leaderboard) {
                // Map leaderboard format back to player format slightly
                // Leaderboard entry: { player: {...}, winRate: ..., totalMatches: ... }
                // We need 'player' object with 'stats' attached from the entry.
                players = seasonData.leaderboard.map(entry => {
                    const p = { ...entry.player };
                    // Overwrite stats with the snapshot stats
                    p.stats = {
                        matches: entry.totalMatches,
                        wins: entry.wins,
                        losses: entry.losses,
                        kills: entry.kills,
                        deaths: entry.deaths,
                        assists: entry.assists,
                        championStats: entry.championStats || {}, // Might need checking if snapshot saves this
                        roleStats: entry.roleStats || {}
                    };
                    return p;
                });

                // Update Title
                const titleEl = document.querySelector('.page-title');
                if (titleEl) titleEl.textContent = `👥 Oyuncular (${seasonId})`;
            }
        } else {
            // Load Live
            players = DB.getPlayers();
        }

        if (players.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1">
                    <div style="font-size: 3rem; margin-bottom: var(--space-4);">👥</div>
                    <h3>Henüz veri yok</h3>
                    <p class="text-muted">${seasonId ? 'Bu sezonda oyuncu verisi bulunamadı.' : 'Ayarlardan oyuncu ekleyebilirsiniz.'}</p>
                </div>
            `;
            return;
        }

        // Compact card grid - 4 columns
        container.style.gridTemplateColumns = 'repeat(4, 1fr)';
        container.style.gap = 'var(--space-4)';

        container.innerHTML = players.map(player => {
            const stats = player.stats || { matches: 0, wins: 0, losses: 0, kills: 0, deaths: 0, assists: 0 };
            const winRate = stats.matches > 0 ? Math.round((stats.wins / stats.matches) * 100) : 0;
            const kda = stats.deaths > 0 ? ((stats.kills + stats.assists) / stats.deaths).toFixed(2) : (stats.kills + stats.assists).toFixed(2);
            const initials = Utils.getInitials(player.nickname || player.name);
            const avatarColor = Utils.getAvatarColor(player.nickname || player.name);
            const role = player.mainRole || 'FILL';
            const secondRole = player.secondaryRole || 'FILL';
            const roleName = Utils.getRoleName(role);
            const mainRoleIcon = Utils.getRoleIcon(role);
            const secondRoleIcon = Utils.getRoleIcon(secondRole);

            return `
                <div class="player-card-compact" onclick="PlayersPage.showPlayerDetail('${player.id}')" style="cursor: pointer;">
                    <div class="flex items-center gap-3 mb-3">
                        ${Utils.renderAvatarHtml(player, 'avatar-sm')}
                        <div style="flex: 1; min-width: 0;">
                            <div style="font-weight: var(--font-semibold); font-size: var(--text-sm); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                ${Utils.escapeHtml(player.nickname || player.name)}
                            </div>
                            <div class="role-icons-container" style="display: flex; align-items: center; gap: 4px; margin-top: 2px;">
                                <img src="${mainRoleIcon}" alt="${role}" class="role-icon" title="${roleName}">
                                ${secondRole ? `<img src="${secondRoleIcon}" alt="${secondRole}" class="role-icon role-icon-secondary" title="${Utils.getRoleName(secondRole)}">` : ''}
                            </div>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); font-size: var(--text-xs);">
                        <div>
                            <span style="color: #ff8c00;">Maç:</span> 
                            <span style="font-weight: var(--font-medium);">${stats.matches}</span>
                        </div>
                        <div>
                            <span style="color: #ff8c00;">WR:</span> 
                            <span style="${Utils.getWinRateColor(winRate)}; font-weight: var(--font-bold);">${winRate}%</span>
                        </div>
                        <div>
                            <span style="color: #ff8c00;">W/L:</span> 
                            <span class="text-win">${stats.wins}</span>/<span class="text-lose">${stats.losses}</span>
                        </div>
                        <div>
                            <span style="color: #ff8c00;">KDA:</span> 
                            <span style="${Utils.getKDAColor(kda)}; font-weight: var(--font-medium);">${kda}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    /**
     * Filter players
     */
    filterPlayers(query) {
        const cards = document.querySelectorAll('.player-card-compact');
        const q = query.toLowerCase();

        cards.forEach(card => {
            const name = card.textContent.toLowerCase();
            card.style.display = name.includes(q) ? '' : 'none';
        });
    },

    /**
     * Show player detail
     */
    showPlayerDetail(playerId) {
        const urlParams = new URLSearchParams(window.location.search);
        const seasonId = urlParams.get('season');

        let player = null;

        if (seasonId) {
            const seasonData = DB.getSeasonData(seasonId);
            if (seasonData && seasonData.leaderboard) {
                const entry = seasonData.leaderboard.find(e => e.player.id === playerId);
                if (entry) {
                    player = { ...entry.player };
                    player.stats = {
                        matches: entry.totalMatches,
                        wins: entry.wins,
                        losses: entry.losses,
                        kills: entry.kills,
                        deaths: entry.deaths,
                        assists: entry.assists,
                        championStats: entry.championStats || {},
                        roleStats: entry.roleStats || {}
                    };
                }
            }
        } else {
            player = DB.getPlayerById(playerId);
        }

        if (!player) return;

        this.currentPlayer = player;
        this.currentView = 'detail';

        const listView = document.getElementById('players-list-view');
        const detailView = document.getElementById('player-detail-view');

        if (listView) listView.classList.add('hidden');
        if (detailView) {
            detailView.classList.remove('hidden');
            this.showAllMatches = false; // Reset on new player load
            this.renderPlayerDetail(player);
        }
    },

    /**
     * Show players list
     */
    showPlayersList() {
        this.currentView = 'list';
        this.currentPlayer = null;

        const listView = document.getElementById('players-list-view');
        const detailView = document.getElementById('player-detail-view');

        if (listView) listView.classList.remove('hidden');
        if (detailView) detailView.classList.add('hidden');

        window.history.pushState({}, '', 'players.html');
    },

    /**
     * Render player detail
     */
    renderPlayerDetail(player) {
        const stats = player.stats || { matches: 0, wins: 0, losses: 0, kills: 0, deaths: 0, assists: 0, championStats: {}, roleStats: {} };
        const container = document.getElementById('player-detail-content');
        if (!container) return;

        const winRate = stats.matches > 0 ? Math.round((stats.wins / stats.matches) * 100) : 0;
        const kda = stats.deaths > 0 ? ((stats.kills + stats.assists) / stats.deaths).toFixed(2) : (stats.kills + stats.assists).toFixed(2);
        const avgK = stats.matches > 0 ? (stats.kills / stats.matches).toFixed(1) : 0;
        const avgD = stats.matches > 0 ? (stats.deaths / stats.matches).toFixed(1) : 0;
        const avgA = stats.matches > 0 ? (stats.assists / stats.matches).toFixed(1) : 0;

        const initials = Utils.getInitials(player.nickname || player.name);
        const avatarColor = Utils.getAvatarColor(player.nickname || player.name);
        const roleName = Utils.getRoleName(player.mainRole || 'FILL');

        // Calculate Role Stats for Bars
        const roleStats = stats.roleStats || {};
        const totalRoleMatches = Object.values(roleStats).reduce((sum, r) => sum + r.matches, 0);
        const roles = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
        const roleBarsHtml = roles.map(roleKey => {
            const rStats = roleStats[roleKey] || { matches: 0, wins: 0 };
            if (rStats.matches === 0) return '';
            const percentage = Math.round((rStats.matches / Math.max(1, totalRoleMatches)) * 100);
            const roleWinRate = Math.round((rStats.wins / rStats.matches) * 100);

            // Colors for roles
            const roleColors = {
                'TOP': '#e74c3c', 'JUNGLE': '#2ecc71', 'MID': '#3498db', 'ADC': '#f1c40f', 'SUPPORT': '#9b59b6'
            };
            const barColor = roleColors[roleKey] || '#95a5a6';

            return `
                <div class="role-stat-row">
                    <div class="flex items-center gap-2" style="width: 100px;">
                        <img src="${Utils.getRoleIcon(roleKey)}" style="width: 16px; height: 16px;">
                        <span style="font-weight: 500;">${Utils.getRoleName(roleKey)}</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${percentage}%; background: ${barColor};"></div>
                    </div>
                    <div style="width: 80px; text-align: right; color: var(--text-secondary);">
                        <span style="color: var(--text-primary); font-weight: bold;">${rStats.matches}</span> <span style="font-size: 10px;">(${roleWinRate}%)</span>
                    </div>
                </div>
            `;
        }).join('');


        // Get Recent Games
        let allMatches = DB.getMatches().sort((a, b) => new Date(b.date) - new Date(a.date));

        const urlParams = new URLSearchParams(window.location.search);
        const seasonId = urlParams.get('season');

        if (seasonId) {
            allMatches = allMatches.filter(m => m.season === seasonId);
        } else {
            allMatches = allMatches.filter(m => !m.season);
        }

        // Filter matches where this player participated (Normalized check)
        const playerMatches = allMatches.filter(m => {
            return [...m.blueTeam, ...m.redTeam].some(p => {
                const pName = Utils.normalizeName(p.name);
                const targetName = Utils.normalizeName(player.name);
                const targetNick = Utils.normalizeName(player.nickname);

                return pName === targetName || (targetNick && pName === targetNick);
            });
        });


        container.innerHTML = `
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-6); margin-bottom: var(--space-6);">
                <!-- Left: Header & Stats -->
                <div class="card">
                    <div class="flex items-center gap-6 mb-6">
                        ${Utils.renderAvatarHtml(player, 'avatar-lg')}
                        <div>
                            <h2 style="margin-bottom: var(--space-2)">${Utils.escapeHtml(player.nickname || player.name)}</h2>
                            <div class="flex flex-wrap gap-4 mt-2">
                                <div class="flex items-center gap-2" style="background: var(--bg-secondary); padding: 4px 10px; border-radius: 6px;">
                                    <img src="${Utils.getRoleIcon(player.mainRole || 'FILL')}" style="width: 20px; height: 20px;">
                                    <span class="badge badge-orange" style="margin:0; padding:0; background:none; border:none;">${roleName}</span>
                                </div>
                                ${player.secondaryRole && player.secondaryRole !== 'FILL' ? `
                                <div class="flex items-center gap-2" style="background: var(--bg-secondary); padding: 4px 10px; border-radius: 6px;">
                                    <img src="${Utils.getRoleIcon(player.secondaryRole)}" style="width: 20px; height: 20px;">
                                    <span class="badge badge-orange" style="margin:0; padding:0; background:none; border:none;">${Utils.getRoleName(player.secondaryRole)}</span>
                                </div>` : ''}
                                
                                <!-- PLAYER RANK -->
                                ${(() => {
                const leaderboard = Stats.getLeaderboard('winRate', 1000, 1);
                const rank = leaderboard.findIndex(s => s.player.id === player.id) + 1;
                if (rank > 0) {
                    return `
                                        <div style="background: rgba(255, 140, 0, 0.1); padding: 4px 12px; border-radius: 6px; border: 1px solid rgba(255, 140, 0, 0.3); box-shadow: 0 0 10px rgba(255, 140, 0, 0.2); display: flex; align-items: center;">
                                            <span style="font-weight: bold; color: #ff8c00; font-size: 0.85rem; text-shadow: 0 0 5px rgba(255, 140, 0, 0.3);">Rank: ${rank}</span>
                                        </div>`;
                }
                return '';
            })()}
            
                                <!-- Season Ranks -->
                                ${(() => {
                const seasonRanks = DB.getPlayerSeasonRanks ? DB.getPlayerSeasonRanks(player.id) : {};
                return Object.entries(seasonRanks).map(([season, rank]) => {
                    const rankColor = rank === 1 ? '#FFD700' : (rank === 2 ? '#C0C0C0' : (rank === 3 ? '#CD7F32' : '#888'));
                    return `
                                            <div style="background: rgba(255, 255, 255, 0.05); padding: 4px 10px; border-radius: 6px; border: 1px solid ${rankColor}; display: flex; align-items: center; margin-left: 8px;">
                                                <span style="font-weight: bold; color: ${rankColor}; font-size: 0.8rem;">${season} Rank: ${rank}</span>
                                            </div>`;
                }).join('');
            })()}
                            </div>
                            <p class="mt-4">
                                <span class="text-win">${stats.wins} Galibiyet</span> - 
                                <span class="text-lose">${stats.losses} Mağlubiyet</span>
                            </p>
                        </div>
                   
                        <!-- Stats Circles (Simple CSS implementation) -->
                        <div class="flex gap-4" style="margin-left: auto;">
                            <div style="text-align: center;">
                                <div style="width: 70px; height: 70px; border-radius: 50%; border: 3px solid var(--border-color); display: flex; align-items: center; justify-content: center; flex-direction: column;">
                                    <span style="font-size: 18px; font-weight: bold;">${stats.matches}</span>
                                    <span style="font-size: 10px; color: var(--text-secondary);">Played</span>
                                </div>
                            </div>
                             <div style="text-align: center;">
                                <div style="
                                    width: 70px; 
                                    height: 70px; 
                                    border-radius: 50%; 
                                    background: conic-gradient(${Utils.getGradientColorValue(winRate)} ${winRate}%, #2a2e35 ${winRate}%); 
                                    display: flex; 
                                    align-items: center; 
                                    justify-content: center; 
                                    position: relative;
                                ">
                                    <!-- Inner circle to make it a ring -->
                                    <div style="
                                        width: 60px; 
                                        height: 60px; 
                                        background: var(--bg-primary); 
                                        border-radius: 50%; 
                                        display: flex; 
                                        flex-direction: column; 
                                        align-items: center; 
                                        justify-content: center;
                                        z-index: 2;
                                    ">
                                        <span style="font-size: 16px; font-weight: bold; color: #fff;">${winRate}%</span>
                                        <span style="font-size: 8px; color: var(--text-secondary); text-transform: uppercase;">Winrate</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <!-- Summary Stats -->
                    <div class="grid grid-cols-3 gap-4" style="text-align: center; border-top: 1px solid var(--border-color); padding-top: var(--space-4);">
                        <div>
                            <div style="font-size: var(--text-xs); color: #ff8c00; font-weight: bold; text-transform: uppercase;">TOPLAM MAÇ</div>
                            <div style="font-size: var(--text-xl); font-weight: bold;">${stats.matches}</div>
                        </div>
                         <div>
                            <div style="font-size: var(--text-xs); color: #ff8c00; font-weight: bold; text-transform: uppercase;">KDA</div>
                            <div style="font-size: var(--text-xl); font-weight: bold; ${Utils.getKDAColor(kda)}">${kda}</div>
                        </div>
                         <div>
                            <div style="font-size: var(--text-xs); color: #ff8c00; font-weight: bold; text-transform: uppercase;">ORTALAMA K/D/A</div>
                            <div style="font-size: var(--text-xl); font-weight: bold;">
                                <span style="color: #22c55e;">${avgK}</span><span style="color: var(--text-secondary); opacity: 0.5;">/</span><span style="color: #e25050;">${avgD}</span><span style="color: var(--text-secondary); opacity: 0.5;">/</span><span style="color: #ffb84d;">${avgA}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Role Stats -->
                <div class="card">
                     <div class="card-header">
                        <h3 class="card-title" style="font-size: var(--text-md); color: #ff8c00;">Rol İstatistiği</h3>
                    </div>
                    <div>
                        ${roleBarsHtml || '<p class="text-muted text-center" style="padding: 20px;">Henüz rol verisi yok.</p>'}
                    </div>
                </div>
            </div>

            <!-- Bottom Grid: History & Pool -->
             <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-6);">
                <!-- Match History -->
                <div>
                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
                        <h3 class="profile-section-title" style="margin-bottom: 0;">Geçmiş Oyunlar</h3>
                        <a href="javascript:void(0)" onclick="PlayersPage.toggleMatchHistory()" style="font-size: var(--text-sm); color: var(--cyan); text-decoration: none;">
                            ${this.showAllMatches ? 'Daha Az Göster' : 'Tümünü Gör'}
                        </a>
                     </div>
                     <div class="recent-match-list">
                        ${this.renderMatchHistory(this.showAllMatches ? playerMatches : playerMatches.slice(0, 5), player)}
                     </div>
                </div>

                <!-- Champion Pool -->
                <div>
                    <h3 class="profile-section-title">⭐ Şampiyon Havuzu</h3>
                    <div class="card" style="padding: 0;">
                         <div style="padding: var(--space-4);">
                             ${this.renderChampionPool(stats.championStats)}
                         </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Toggle match history expansion
     */
    toggleMatchHistory() {
        this.showAllMatches = !this.showAllMatches;
        if (this.currentPlayer) {
            this.renderPlayerDetail(this.currentPlayer);
        }
    },

    /**
     * Render match history list
     */
    renderMatchHistory(matches, player) {
        if (!matches || matches.length === 0) {
            return '<div class="card"><p class="text-muted text-center" style="padding: 20px;">Henüz maç geçmişi yok.</p></div>';
        }

        const playerName = player.name; // For display purposes if needed

        return matches.map(match => {
            // Find player data in match (Normalized check - Name OR Nickname)
            const pData = [...match.blueTeam, ...match.redTeam].find(p => {
                const pName = Utils.normalizeName(p.name);
                const targetName = Utils.normalizeName(player.name);
                const targetNick = Utils.normalizeName(player.nickname);

                return pName === targetName || (targetNick && pName === targetNick);
            });

            if (!pData) return '';

            const isBlue = match.blueTeam.includes(pData);
            const winner = match.winnerTeam;
            const isWin = (isBlue && winner === 'blue') || (!isBlue && winner === 'red');
            const resultText = isWin ? 'Victory' : 'Defeat';
            const resultClass = isWin ? 'text-win' : 'text-lose';
            const cardClass = isWin ? 'win' : 'loss';
            const champIcon = Utils.getChampionIcon(pData.championId || pData.champion);
            const dateStr = Utils.formatDate(match.date);

            // CS and KDA formatting
            const cs = pData.cs || 0;
            const kdaVal = pData.deaths > 0 ? ((parseFloat(pData.kills) + parseFloat(pData.assists)) / parseFloat(pData.deaths)).toFixed(2) : "Perf";

            // Team Grids Implementation
            const renderGridFn = (team) => `
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px;">
                    ${team.map(p => {
                const cIcon = Utils.getChampionIcon(p.championId || p.champion);
                const pName = Utils.normalizeName(p.name);
                const isSelf = pName === Utils.normalizeName(player.name) || (player.nickname && pName === Utils.normalizeName(player.nickname));
                return `<img src="${cIcon}" title="${Utils.escapeHtml(p.name)}" style="width: 20px; height: 20px; border-radius: 2px; border: ${isSelf ? '1px solid #fff' : 'none'}; opacity: ${isSelf ? '1' : '0.8'};">`;
            }).join('')}
                </div>
            `;

            return `
                <div class="recent-match-card ${cardClass}" onclick="openMatchDetailForDate('${match.id}')" style="cursor:pointer">
                    <!-- Left: Result & Time -->
                    <div class="match-game-info" style="width: 100px;">
                         <div class="${resultClass} match-result-badge">${resultText}</div>
                         <div class="text-muted" style="font-size: 10px;">${match.gameMode || 'Soloqueue'}</div>
                         <div class="text-muted" style="font-size: 10px;">${dateStr}</div>
                    </div>
                    
                    <!-- Middle: Stats -->
                    <div class="flex items-center gap-3" style="flex: 1.5;">
                         <div class="relative">
                            <img src="${champIcon}" class="match-champion-img" alt="${pData.champion}" style="width: 48px; height: 48px; border-radius: 50%;">
                            <span style="position:absolute; bottom: -5px; right: -5px; background: #202020; border-radius: 50%; padding: 2px; font-size: 10px; border: 1px solid #444;">${pData.level || 18}</span>
                         </div>
                         <div class="flex flex-col">
                            <span style="font-weight: bold; font-size: 16px; letter-spacing: 0.5px;">${pData.kills} / <span style="color: var(--lose)">${pData.deaths}</span> / ${pData.assists}</span>
                            <span class="text-muted" style="font-size: 11px;">
                                <span style="font-weight:bold; ${Utils.getKDAColor(kdaVal)}">${kdaVal} KDA</span> 
                                <span style="margin: 0 4px">•</span> ${cs} CS
                            </span>
                         </div>
                    </div>
                    
                    <!-- Right: Teams & Items -->
                     <div class="flex flex-col gap-2" style="width: 140px;">
                        ${renderGridFn(match.blueTeam)}
                        ${renderGridFn(match.redTeam)}
                     </div>
                </div>
            `;
        }).join('');
    },

    /**
     * Render champion pool
     */
    renderChampionPool(championStats) {
        const champs = Object.entries(championStats || {})
            .sort(([, a], [, b]) => (b.matches || 0) - (a.matches || 0))
            .slice(0, 8);

        if (champs.length === 0) {
            return '<p class="text-muted">Henüz şampiyon verisi yok.</p>';
        }

        return champs.map(([rawChampId, stats]) => {
            const champId = Utils.formatChampionName(rawChampId); // Ensure formatted
            // Aggregate if needed? No, calculateChampionStats does global, here we assume player stats are already unique keys because of our DB fix.
            // But if old data exists, we might need to handle it. For now assuming new DB logic fixes it.

            const wr = stats.matches > 0 ? Math.round((stats.wins / stats.matches) * 100) : 0;
            const kda = stats.deaths > 0 ? ((stats.kills + stats.assists) / stats.deaths).toFixed(2) : (stats.kills + stats.assists).toFixed(2);

            // Calculate simple visual bar for games played relative to max
            const maxGames = champs[0][1].matches;
            const barWidth = Math.max(10, (stats.matches / maxGames) * 100);

            return `
                <div class="flex items-center gap-4 mb-4">
                    <img src="${Utils.getChampionIcon(champId)}" 
                         alt="${champId}" 
                         style="width: 36px; height: 36px; border-radius: var(--radius-md);"
                         onerror="this.src='${Utils.getProfileIcon(champId)}'">
                    <div style="flex: 1">
                        <div class="flex justify-between mb-1">
                             <div style="font-weight: var(--font-semibold); font-size: var(--text-sm);">${champId}</div>
                             <div class="text-muted" style="font-size: var(--text-xs);"><span style="${Utils.getWinRateColor(wr)}; font-weight: bold;">${wr}%</span> (${stats.matches} Played)</div>
                        </div>
                        <div style="width: 100%; height: 6px; background: var(--bg-secondary); border-radius: 4px; overflow: hidden;">
                             <div style="width: ${barWidth}%; height: 100%; background: ${Utils.getAvatarColor(champId)};"></div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
};


// Helper for accessing match details from player stats
function openMatchDetailForDate(matchId) {
    // We need to redirect to matches.html and open the specific match logic
    // OR we can make a modal here? Ideally keep it consistent.
    // For now, let's look up the match object and if we are on players.html, maybe just show a simple alert or ideally, use the SAME modal if possible.
    // Actually, `matches.html` has the modal logic. We should probably move the Modal logic to `app.js` or `utils.js` so it's global?
    // Given the constraints, let's just create a quick modal instance here OR redirect.
    // Redirecting is safer:
    window.location.href = `matches.html?matchId=${matchId}`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    PlayersPage.init();
});
