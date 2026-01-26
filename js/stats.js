/**
 * FFLegendsHub - Statistics Module
 * Calculates player and champion statistics
 */

const Stats = {
    /**
     * Calculate player statistics
     * Accepts ID or Player Object
     */
    calculatePlayerStats(playerOrId) {
        let player = playerOrId;
        if (typeof playerOrId === 'string') {
            player = DB.getPlayerById(playerOrId);
        }

        if (!player) return null;

        const stats = player.stats;
        const totalMatches = stats.matches || 0;
        const wins = stats.wins || 0;
        const losses = stats.losses || 0;
        const kills = stats.kills || 0;
        const deaths = stats.deaths || 0;
        const assists = stats.assists || 0;

        return {
            player: player,
            totalMatches: totalMatches,
            wins: wins,
            losses: losses,
            winRate: totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0,
            kills: kills,
            deaths: deaths,
            assists: assists,
            kda: (kills + assists) === 0 && deaths > 0 ? (deaths * -1).toFixed(2) : (deaths > 0 ? ((kills + assists) / deaths).toFixed(2) : (kills + assists).toFixed(2)),
            avgKills: totalMatches > 0 ? (kills / totalMatches).toFixed(1) : 0,
            avgDeaths: totalMatches > 0 ? (deaths / totalMatches).toFixed(1) : 0,
            avgAssists: totalMatches > 0 ? (assists / totalMatches).toFixed(1) : 0,
            championStats: stats.championStats || {},
            roleStats: stats.roleStats || {}
        };
    },

    /**
     * Get all player statistics sorted (Aggregated by Name)
     */
    /**
     * Get all player statistics sorted (Aggregated by Name)
     */
    getAllPlayerStats(sortBy = 'winRate', minGames = 1, seasonId = null) {
        let rawPlayers = DB.getPlayers();
        const aggregatedPlayers = new Map();

        // If Season ID is provided, we must reconstruct stats from MATCHES for that season
        if (seasonId && seasonId !== 'Current') {
            // 1. Get Season Matches
            const seasonMatches = DB.getMatches().filter(m => m.season === seasonId);

            // 2. Clear current stats and use season matches to calculate
            // We need a temporary map of player stats for this season
            const seasonPlayerStats = {}; // name -> stats

            seasonMatches.forEach(match => {
                const blueWon = match.winnerTeam === 'blue' || match.winner === 'blue';
                const processTeam = (team, won) => {
                    (team || []).forEach(p => {
                        const name = p.name || 'Unknown';
                        const realPlayer = DB.getPlayerByName(name);

                        // Use real player ID as key if possible, otherwise use normalized name
                        const key = realPlayer ? realPlayer.id : Utils.normalizeName(name);

                        if (!seasonPlayerStats[key]) {
                            seasonPlayerStats[key] = {
                                name: realPlayer ? realPlayer.name : name,
                                id: realPlayer ? realPlayer.id : 'temp_' + key,
                                stats: { matches: 0, wins: 0, losses: 0, kills: 0, deaths: 0, assists: 0, roleStats: {} }
                            };

                            if (realPlayer) {
                                seasonPlayerStats[key].nickname = realPlayer.nickname;
                                seasonPlayerStats[key].avatar = realPlayer.avatar;
                                seasonPlayerStats[key].mainRole = realPlayer.mainRole;
                            }
                        }

                        const ps = seasonPlayerStats[key].stats;
                        ps.matches++;
                        if (won) ps.wins++; else ps.losses++;
                        ps.kills += parseInt(p.kills || p.k) || 0;
                        ps.deaths += parseInt(p.deaths || p.d) || 0;
                        ps.assists += parseInt(p.assists || p.a) || 0;

                        // Role
                        const role = p.role || 'FILL';
                        if (!ps.roleStats[role]) ps.roleStats[role] = { matches: 0, wins: 0 };
                        ps.roleStats[role].matches++;
                        if (won) ps.roleStats[role].wins++;
                    });
                };
                processTeam(match.blueTeam, blueWon);
                processTeam(match.redTeam, !blueWon);
            });

            // 3. Convert to array mimicking DB.getPlayers() output
            rawPlayers = Object.values(seasonPlayerStats);
        }

        // Step 1: Aggregate players with same name (or just process if already unique from construction above)
        // ... Logic is same as before, but operating on our (potentially constructed) rawPlayers list

        rawPlayers.forEach(p => {
            if (!p.name) return;
            // Aggregate by ID if available, otherwise by normalized name
            const key = p.id || Utils.normalizeName(p.name);

            if (!aggregatedPlayers.has(key)) {
                aggregatedPlayers.set(key, JSON.parse(JSON.stringify(p)));
            } else {
                // If we constructed season stats above, they are already unique keys, so this else branch might not hit frequently
                // unless db has dupes. For live data it's important.
                const primary = aggregatedPlayers.get(key);
                const duplicate = p;

                // Merge Basic Stats
                primary.stats.matches = (primary.stats.matches || 0) + (duplicate.stats.matches || 0);
                primary.stats.wins = (primary.stats.wins || 0) + (duplicate.stats.wins || 0);
                primary.stats.losses = (primary.stats.losses || 0) + (duplicate.stats.losses || 0);
                primary.stats.kills = (primary.stats.kills || 0) + (duplicate.stats.kills || 0);
                primary.stats.deaths = (primary.stats.deaths || 0) + (duplicate.stats.deaths || 0);
                primary.stats.assists = (primary.stats.assists || 0) + (duplicate.stats.assists || 0);

                Object.entries(duplicate.stats.roleStats || {}).forEach(([role, rStats]) => {
                    if (!primary.stats.roleStats[role]) primary.stats.roleStats[role] = { matches: 0, wins: 0 };
                    primary.stats.roleStats[role].matches += rStats.matches || 0;
                    primary.stats.roleStats[role].wins += rStats.wins || 0;
                });
            }
        });

        // Step 2: Calculate Derived Stats & Sort
        return Array.from(aggregatedPlayers.values())
            .map(p => this.calculatePlayerStats(p))
            .filter(s => s && s.totalMatches >= minGames)
            .sort((a, b) => { // ... Sort logic (omitted for brevity, assume same) ...
                let result = 0;
                switch (sortBy) {
                    case 'winRate':
                        if (b.winRate !== a.winRate) result = b.winRate - a.winRate;
                        else if (a.winRate === 0) result = a.totalMatches - b.totalMatches;
                        else result = b.totalMatches - a.totalMatches;
                        break;
                    case 'kda': result = parseFloat(b.kda) - parseFloat(a.kda); break;
                    case 'matches': result = b.totalMatches - a.totalMatches; break;
                    case 'wins': result = b.wins - a.wins; break;
                    case 'kills': result = b.kills - a.kills; break;
                    default:
                        if (Math.abs(b.winRate - a.winRate) > 0) result = b.winRate - a.winRate;
                        else {
                            const netA = (a.wins || 0) - (a.losses || 0);
                            const netB = (b.wins || 0) - (b.losses || 0);
                            if (netB !== netA) result = netB - netA;
                            else result = b.totalMatches - a.totalMatches;
                        }
                        break;
                }
                return result || a.player.name.localeCompare(b.player.name);
            });
    },

    /**
     * Get leaderboard
     */
    getLeaderboard(category = 'winRate', limit = 10, minGames = 1, seasonId = null) {
        return this.getAllPlayerStats(category, minGames, seasonId).slice(0, limit);
    },

    /**
     * Calculate champion statistics across all players
     * @param {string|null} seasonId - Optional season filter
     */
    calculateChampionStats(seasonId = null) {
        // ... (Same as existing calculateChampionStats) ...
        const champData = {};
        // If Season is provided (archived), we MUST calculate from matches
        if (seasonId && seasonId !== 'Current') {
            const matches = DB.getMatches().filter(m => m.season === seasonId);
            const totalMatches = matches.length;

            matches.forEach(match => {
                const processTeam = (team, won) => {
                    (team || []).forEach(p => {
                        const rawChampId = p.championId || p.champion;
                        if (!rawChampId) return;
                        const champId = Utils.formatChampionName(rawChampId);
                        if (!champData[champId]) {
                            champData[champId] = { id: champId, matches: 0, wins: 0, kills: 0, deaths: 0, assists: 0, players: new Set() };
                        }
                        const c = champData[champId];
                        c.matches++;
                        if (won) c.wins++;
                        c.kills += parseInt(p.kills || p.k) || 0;
                        c.deaths += parseInt(p.deaths || p.d) || 0;
                        c.assists += parseInt(p.assists || p.a) || 0;
                        c.players.add(p.name || p.id);
                    });
                };
                const blueWon = match.winner === 'blue' || match.winnerTeam === 'blue';
                processTeam(match.blueTeam, blueWon);
                processTeam(match.redTeam, !blueWon);
            });

            return Object.values(champData)
                .map(c => ({
                    ...c,
                    losses: c.matches - c.wins,
                    winRate: c.matches > 0 ? Math.round((c.wins / c.matches) * 100) : 0,
                    kda: c.deaths > 0 ? ((c.kills + c.assists) / c.deaths).toFixed(2) : (c.kills + c.assists).toFixed(2),
                    pickRate: totalMatches > 0 ? ((c.matches / totalMatches) * 10).toFixed(1) : 0,
                    uniquePlayers: c.players.size
                }))
                .sort((a, b) => b.matches - a.matches);

        } else {
            // Default / Current Behavior (Use Player Stats Speed)
            const totalMatches = DB.getMatches().filter(m => !m.season).length;

            DB.getPlayers().forEach(player => {
                Object.entries(player.stats.championStats || {}).forEach(([rawChampId, stats]) => {
                    const champId = Utils.formatChampionName(rawChampId);
                    if (!champData[champId]) {
                        champData[champId] = { id: champId, matches: 0, wins: 0, kills: 0, deaths: 0, assists: 0, players: new Set() };
                    }
                    champData[champId].matches += stats.matches;
                    champData[champId].wins += stats.wins;
                    champData[champId].kills += stats.kills;
                    champData[champId].deaths += stats.deaths;
                    champData[champId].assists += stats.assists;
                    champData[champId].players.add(player.id);
                });
            });

            return Object.values(champData)
                .map(c => ({
                    ...c,
                    losses: c.matches - c.wins,
                    winRate: c.matches > 0 ? Math.round((c.wins / c.matches) * 100) : 0,
                    kda: c.deaths > 0 ? ((c.kills + c.assists) / c.deaths).toFixed(2) : (c.kills + c.assists).toFixed(2),
                    pickRate: totalMatches > 0 ? ((c.matches / totalMatches) * 10).toFixed(1) : 0,
                    uniquePlayers: c.players.size
                }))
                .sort((a, b) => b.matches - a.matches);
        }
    },

    /**
     * Get top champion
     */
    getTopChampion(seasonId = null) {
        const champions = this.calculateChampionStats(seasonId);
        return champions.length > 0 ? champions[0] : null;
    },

    /**
     * Get player's main role
     */
    getMainRole(player) {
        if (!player || !player.stats.roleStats) return 'FILL';
        const roles = Object.entries(player.stats.roleStats);
        if (roles.length === 0) return 'FILL';
        return roles.sort(([, a], [, b]) => b.matches - a.matches)[0][0];
    },

    /**
     * Get player rank position
     */
    getPlayerRank(playerId, category = 'winRate', minGames = 3) {
        const leaderboard = this.getAllPlayerStats(category, minGames);
        const index = leaderboard.findIndex(s => s.player.id === playerId);
        return index === -1 ? null : index + 1;
    },

    /**
     * Get dashboard overview stats
     */
    getDashboardStats(seasonId = null) {
        let players = DB.getPlayers();
        let matches = DB.getMatches();

        if (seasonId && seasonId !== 'Current') {
            // For dashboard, we might want to return valid data even if players is technically 'empty' in base DB
            // We use getAllPlayerStats's reconstruction logic to verify player count
            matches = matches.filter(m => m.season === seasonId);
        } else {
            matches = matches.filter(m => !m.season);
        }

        // Use the same aggregation and sorting logic as the Leaderboard for consistency
        const playersByWR = this.getAllPlayerStats('winRate', 1, seasonId);
        const playersByKDA = this.getAllPlayerStats('kda', 1, seasonId);

        // Even if playersByWR represents the active 'players' for this season
        const playerCount = playersByWR.length;

        if (playerCount === 0) {
            return {
                totalPlayers: 0,
                totalMatches: matches.length,
                topWinRatePlayer: null,
                topKDAPlayer: null,
                recentMatches: matches.slice(-5).reverse()
            };
        }

        return {
            totalPlayers: playerCount,
            totalMatches: matches.length,
            topWinRatePlayer: playersByWR[0],
            worstWinRatePlayer: playersByWR[playersByWR.length - 1],
            topKDAPlayer: playersByKDA[0],
            worstKDAPlayer: playersByKDA[playersByKDA.length - 1],
            recentMatches: matches.slice(-5).reverse(),
            topChampion: this.getTopChampion(seasonId)
        };
    }
};
