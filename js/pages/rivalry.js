/**
 * FFLegendsHub - Rivalry Page Logic
 */

const RivalryPage = {
    p1Id: null,
    p2Id: null,
    currentSeason: null,

    init() {
        console.log('Rivalry Page Initializing...');

        const setup = () => {
            this.populateSelectors();
            this.checkUrlParams();
        };

        window.addEventListener('appReady', setup);

        // If DB/App already initialized
        if ((typeof App !== 'undefined' && App.isReady) || (typeof DB !== 'undefined' && DB.isInitialized)) {
            setup();
        }

        // Event Listeners
        document.getElementById('p1-select').addEventListener('change', (e) => {
            this.p1Id = e.target.value;
            this.updatePlayerDisplay(1, this.p1Id);
            this.handleComparison();
        });

        document.getElementById('p2-select').addEventListener('change', (e) => {
            this.p2Id = e.target.value;
            this.updatePlayerDisplay(2, this.p2Id);
            this.handleComparison();
        });
    },

    populateSelectors() {
        let players;

        if (this.currentSeason && this.currentSeason !== 'Current') {
            // Get players active in this season
            const seasonStats = Stats.getAllPlayerStats('winRate', 1, this.currentSeason);
            players = seasonStats.map(s => s.player);
        } else {
            players = DB.getPlayers();
        }

        players.sort((a, b) => (a.nickname || a.name).localeCompare(b.nickname || b.name));

        const s1 = document.getElementById('p1-select');
        const s2 = document.getElementById('p2-select');

        // Clear existing
        s1.innerHTML = '<option value="">Oyuncu Seçin...</option>';
        s2.innerHTML = '<option value="">Oyuncu Seçin...</option>';

        players.forEach(p => {
            const opt1 = new Option(p.nickname || p.name, p.id);
            const opt2 = new Option(p.nickname || p.name, p.id);
            s1.add(opt1);
            s2.add(opt2);
        });
    },

    checkUrlParams() {
        const params = Utils.getUrlParams();
        const id1 = params.get('p1');
        const id2 = params.get('p2');
        const season = params.get('season');

        if (season) {
            this.currentSeason = season;
            const seasonBadge = document.getElementById('active-season-name');
            if (seasonBadge) {
                seasonBadge.textContent = season + ' Sezonu';
                seasonBadge.style.display = 'inline-block';
            }
        }

        if (id1) {
            document.getElementById('p1-select').value = id1;
            this.p1Id = id1;
            this.updatePlayerDisplay(1, id1);
        }
        if (id2) {
            document.getElementById('p2-select').value = id2;
            this.p2Id = id2;
            this.updatePlayerDisplay(2, id2);
        }

        if (id1 && id2) this.handleComparison();
    },

    updatePlayerDisplay(num, playerId) {
        const container = document.getElementById(`p${num}-display`);
        const player = DB.getPlayerById(playerId);
        const card = document.getElementById(`player-${num}-card`);

        if (!player) {
            container.innerHTML = `
                <div class="avatar avatar-lg" style="margin: 0 auto 15px;">?</div>
                <h3 class="text-muted">Seçilmedi</h3>
            `;
            card.classList.remove('active');
            return;
        }

        card.classList.add('active');
        container.innerHTML = `
            ${Utils.renderAvatarHtml(player, 'avatar-lg')}
            <h3 style="margin-top: 15px;">${player.nickname || player.name}</h3>
            <div class="text-xs text-muted" style="margin-top: 5px;">${Utils.getRoleName(player.mainRole)}</div>
        `;
    },

    handleComparison() {
        if (!this.p1Id || !this.p2Id) {
            document.getElementById('rivalry-results').classList.add('hidden');
            document.getElementById('rivalry-empty').classList.remove('hidden');
            return;
        }

        if (this.p1Id === this.p2Id) {
            Utils.showToast('Aynı oyuncuyu seçemezsiniz!', 'error');
            return;
        }

        document.getElementById('rivalry-results').classList.remove('hidden');
        document.getElementById('rivalry-empty').classList.add('hidden');

        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('p1', this.p1Id);
        url.searchParams.set('p2', this.p2Id);
        window.history.pushState({}, '', url);

        this.calculateRivalry();
    },

    calculateRivalry() {
        const p1 = DB.getPlayerById(this.p1Id);
        const p2 = DB.getPlayerById(this.p2Id);

        let matches = DB.getMatches();

        // Filter by season
        if (this.currentSeason && this.currentSeason !== 'Current') {
            matches = matches.filter(m => m.season === this.currentSeason);
        } else {
            matches = matches.filter(m => !m.season);
        }

        matches.sort((a, b) => new Date(b.date) - new Date(a.date));

        const p1Norms = [Utils.normalizeName(p1.name), Utils.normalizeName(p1.nickname)].filter(n => n !== '');
        const p2Norms = [Utils.normalizeName(p2.name), Utils.normalizeName(p2.nickname)].filter(n => n !== '');

        const mutualMatches = matches.filter(m => {
            const participants = [...m.blueTeam, ...m.redTeam].map(p => Utils.normalizeName(p.name));
            const hasP1 = participants.some(name => p1Norms.includes(name));
            const hasP2 = participants.some(name => p2Norms.includes(name));
            return hasP1 && hasP2;
        });

        // Update Total Indicator
        const indicator = document.getElementById('total-mutual-indicator');
        if (indicator) {
            indicator.style.display = 'inline-block';
            document.getElementById('total-mutual-count').textContent = mutualMatches.length;
        }

        const allyMatches = [];
        const rivalMatches = [];

        mutualMatches.forEach(m => {
            const p1OnBlue = m.blueTeam.some(p => p1Norms.includes(Utils.normalizeName(p.name)));
            const p2OnBlue = m.blueTeam.some(p => p2Norms.includes(Utils.normalizeName(p.name)));

            if (p1OnBlue === p2OnBlue) {
                allyMatches.push(m);
            } else {
                rivalMatches.push(m);
            }
        });

        this.renderAllies(allyMatches, p1, p2);
        this.renderRivals(rivalMatches, p1, p2);
        this.renderComparisonStats(p1, p2);
        this.renderRecentMutual(mutualMatches, p1, p2);
    },

    renderAllies(matches, p1, p2) {
        const total = matches.length;
        let wins = 0;

        matches.forEach(m => {
            const p1OnBlue = m.blueTeam.some(p => Utils.normalizeName(p.name) === Utils.normalizeName(p1.name) || Utils.normalizeName(p.name) === Utils.normalizeName(p1.nickname));
            const blueWon = m.winnerTeam === 'blue' || m.winner === 'blue';
            if ((p1OnBlue && blueWon) || (!p1OnBlue && !blueWon)) wins++;
        });

        const wr = total > 0 ? Math.round((wins / total) * 100) : 0;
        const losses = total - wins;

        document.getElementById('ally-wr').textContent = wr + '%';
        document.getElementById('ally-total').textContent = total;
        document.getElementById('ally-wins').textContent = wins;
        document.getElementById('ally-losses').textContent = total - wins;

        // Gauge animation
        const circle = document.getElementById('ally-circle');
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (wr / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        circle.style.stroke = Utils.getGradientColorValue(wr);

        // Synergy Text
        const text = document.getElementById('synergy-text');
        if (total === 0) {
            text.textContent = 'Veri Yok';
            text.className = 'badge text-muted';
        } else if (wr >= 60) {
            text.textContent = 'Mükemmel Sinerji';
            text.className = 'badge badge-green';
        } else if (wr >= 45) {
            text.textContent = 'Uyumlu Ikili';
            text.className = 'badge badge-cyan';
        } else {
            text.textContent = 'Zorlu Ortaklık';
            text.className = 'badge badge-red';
        }
    },

    renderRivals(matches, p1, p2) {
        const total = matches.length;
        let p1Wins = 0;
        let p2Wins = 0;

        matches.forEach(m => {
            const p1OnBlue = m.blueTeam.some(p => Utils.normalizeName(p.name) === Utils.normalizeName(p1.name) || Utils.normalizeName(p.name) === Utils.normalizeName(p1.nickname));
            const blueWon = m.winnerTeam === 'blue' || m.winner === 'blue';
            if ((p1OnBlue && blueWon) || (!p1OnBlue && !blueWon)) p1Wins++;
            else p2Wins++;
        });

        document.getElementById('p1-rival-wins').textContent = p1Wins;
        document.getElementById('p2-rival-wins').textContent = p2Wins;
        document.getElementById('rival-total').textContent = total;
        document.getElementById('p1-label').textContent = p1.nickname || p1.name;
        document.getElementById('p2-label').textContent = p2.nickname || p2.name;

        const p1Pct = total > 0 ? (p1Wins / total) * 100 : 50;
        const p2Pct = 100 - p1Pct;

        document.getElementById('rival-bar-1').style.width = p1Pct + '%';
        document.getElementById('rival-bar-2').style.width = p2Pct + '%';

        const domText = document.getElementById('rival-dominance-text');
        if (total === 0) {
            domText.textContent = 'Karsilasma Yok';
        } else if (Math.abs(p1Wins - p2Wins) <= 1) {
            domText.textContent = 'Basabasa Rekabet';
        } else if (p1Wins > p2Wins) {
            domText.textContent = `${p1.nickname || p1.name} Ustunluk Sagliyor`;
        } else {
            domText.textContent = `${p2.nickname || p2.name} Ustunluk Sagliyor`;
        }
    },

    renderComparisonStats(p1, p2) {
        const container = document.getElementById('comparison-stats');

        let s1, s2;

        if (this.currentSeason && this.currentSeason !== 'Current') {
            // Get seasonal stats for these specific players
            const allSeasonStats = Stats.getAllPlayerStats('winRate', 0, this.currentSeason);
            const p1SeasonRaw = allSeasonStats.find(s => s.player.id === p1.id);
            const p2SeasonRaw = allSeasonStats.find(s => s.player.id === p2.id);

            // Map to the structure expected by the render logic (matching p.stats)
            s1 = p1SeasonRaw ? { ...p1SeasonRaw, matches: p1SeasonRaw.totalMatches } : { wins: 0, losses: 0, matches: 0, kills: 0, deaths: 0, assists: 0 };
            s2 = p2SeasonRaw ? { ...p2SeasonRaw, matches: p2SeasonRaw.totalMatches } : { wins: 0, losses: 0, matches: 0, kills: 0, deaths: 0, assists: 0 };
        } else {
            // For current season, we can use calculation on live data
            const p1Stat = Stats.calculatePlayerStats(p1);
            const p2Stat = Stats.calculatePlayerStats(p2);
            s1 = { ...p1Stat, matches: p1Stat.totalMatches };
            s2 = { ...p2Stat, matches: p2Stat.totalMatches };
        }

        const rows = [
            { label: 'Win Rate', v1: Math.round((s1.wins / Math.max(1, s1.matches)) * 100), v2: Math.round((s2.wins / Math.max(1, s2.matches)) * 100), suffix: '%' },
            { label: 'KDA', v1: (s1.deaths > 0 ? (s1.kills + s1.assists) / s1.deaths : s1.kills + s1.assists).toFixed(2), v2: (s2.deaths > 0 ? (s2.kills + s2.assists) / s2.deaths : s2.kills + s2.assists).toFixed(2) },
            { label: 'Toplam Mac', v1: s1.matches || 0, v2: s2.matches || 0 },
            { label: 'Avg Kills', v1: (s1.kills / Math.max(1, s1.matches)).toFixed(1), v2: (s2.kills / Math.max(1, s2.matches)).toFixed(1) },
            { label: 'Avg Deaths', v1: (s1.deaths / Math.max(1, s1.matches)).toFixed(1), v2: (s2.deaths / Math.max(1, s2.matches)).toFixed(1) }
        ];

        container.innerHTML = rows.map(r => {
            const val1 = parseFloat(r.v1);
            const val2 = parseFloat(r.v2);
            let p1Pct = 50;
            if (val1 + val2 > 0) p1Pct = (val1 / (val1 + val2)) * 100;

            // Special handling for Deaths (lower is better)
            const p1Better = r.label === 'Avg Deaths' ? val1 < val2 : val1 > val2;

            return `
                <div class="stats-comparison-row">
                    <div style="text-align: right; font-weight: bold; ${p1Better ? 'color: var(--win-color)' : ''}">${r.v1}${r.suffix || ''}</div>
                    <div style="text-align: center;">
                        <div class="text-xs text-muted mb-1">${r.label}</div>
                        <div class="stats-bar-outer">
                            <div class="stats-bar-inner" style="width: ${p1Pct}%; background: ${p1Better ? 'var(--win-color)' : 'rgba(255,255,255,0.2)'}; opacity: 0.8;"></div>
                            <div class="stats-bar-inner" style="width: ${100 - p1Pct}%; background: ${!p1Better ? 'var(--win-color)' : 'rgba(255,255,255,0.2)'}; opacity: 0.8;"></div>
                        </div>
                    </div>
                    <div style="text-align: left; font-weight: bold; ${!p1Better ? 'color: var(--win-color)' : ''}">${r.v2}${r.suffix || ''}</div>
                </div>
            `;
        }).join('');
    },

    renderRecentMutual(matches, p1, p2) {
        const container = document.getElementById('recent-mutual-matches');
        if (matches.length === 0) {
            container.innerHTML = '<p class="text-muted text-center py-4">Ortak maç bulunamadı.</p>';
            return;
        }

        container.innerHTML = matches.slice(0, 10).map(m => {
            const p1OnBlue = m.blueTeam.some(p => Utils.normalizeName(p.name) === Utils.normalizeName(p1.name) || Utils.normalizeName(p.name) === Utils.normalizeName(p1.nickname));
            const p2OnBlue = m.blueTeam.some(p => Utils.normalizeName(p.name) === Utils.normalizeName(p2.name) || Utils.normalizeName(p.name) === Utils.normalizeName(p2.nickname));
            const isAlly = p1OnBlue === p2OnBlue;

            const blueWon = m.winnerTeam === 'blue' || m.winner === 'blue';
            const p1Win = (p1OnBlue && blueWon) || (!p1OnBlue && !blueWon);

            const p1Data = [...m.blueTeam, ...m.redTeam].find(p => Utils.normalizeName(p.name) === Utils.normalizeName(p1.name) || Utils.normalizeName(p.name) === Utils.normalizeName(p1.nickname));
            const p2Data = [...m.blueTeam, ...m.redTeam].find(p => Utils.normalizeName(p.name) === Utils.normalizeName(p2.name) || Utils.normalizeName(p.name) === Utils.normalizeName(p2.nickname));

            return `
                <div class="match-card-mini ${p1Win ? 'win' : 'lose'}">
                    <div class="flex items-center gap-2">
                        <img src="${Utils.getChampionIcon(p1Data.champion)}" style="width: 24px; height: 24px; border-radius: 4px;">
                        <span class="text-xs text-muted">vs</span>
                        <img src="${Utils.getChampionIcon(p2Data.champion)}" style="width: 24px; height: 24px; border-radius: 4px;">
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="badge ${isAlly ? 'badge-cyan' : 'badge-orange'}" style="font-size: 8px;">${isAlly ? 'MÜTTEFİK' : 'RAKİP'}</span>
                        <span style="font-size: 10px; opacity: 0.6;">${Utils.formatDate(m.date)}</span>
                    </div>
                    <div style="font-weight: bold; font-size: 12px;" class="${p1Win ? 'text-win' : 'text-lose'}">
                        ${p1Win ? 'P1 Kazan' : 'P2 Kazan'}
                    </div>
                </div>
            `;
        }).join('');
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => RivalryPage.init());
