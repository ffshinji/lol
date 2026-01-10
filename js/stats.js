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
            kda: deaths > 0 ? ((kills + assists) / deaths).toFixed(2) : (kills + assists).toFixed(2),
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
    getAllPlayerStats(sortBy = 'winRate', minGames = 1) {
        const rawPlayers = DB.getPlayers();
        const aggregatedPlayers = new Map();

        // Step 1: Aggregate players with same name
        rawPlayers.forEach(p => {
            if (!p.name) return;
            // Normalize name: remove EVERYTHING except alphanumeric characters for strict matching
            // This handles invisible chars, mixed scripts, spaces, etc.
            const key = p.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

            if (!aggregatedPlayers.has(key)) {
                // Clone to ensure we don't mutate DB state during display calc
                aggregatedPlayers.set(key, JSON.parse(JSON.stringify(p)));
            } else {
                const primary = aggregatedPlayers.get(key);
                const duplicate = p;

                // Merge Basic Stats
                primary.stats.matches = (primary.stats.matches || 0) + (duplicate.stats.matches || 0);
                primary.stats.wins = (primary.stats.wins || 0) + (duplicate.stats.wins || 0);
                primary.stats.losses = (primary.stats.losses || 0) + (duplicate.stats.losses || 0);
                primary.stats.kills = (primary.stats.kills || 0) + (duplicate.stats.kills || 0);
                primary.stats.deaths = (primary.stats.deaths || 0) + (duplicate.stats.deaths || 0);
                primary.stats.assists = (primary.stats.assists || 0) + (duplicate.stats.assists || 0);

                // Merge Role Stats (Visual only) - Simple addition
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
            .sort((a, b) => {
                let result = 0;
                switch (sortBy) {
                    case 'winRate':
                        if (b.winRate !== a.winRate) {
                            result = b.winRate - a.winRate;
                        } else {
                            // Tie-breaker: If win rates are equal
                            if (a.winRate === 0) {
                                // For 0% WR, more games = WORSE (lower in list)
                                // Since we want descending (Best -> Worst), more games should come AFTER fewer games
                                result = a.totalMatches - b.totalMatches;
                            } else {
                                // For >0% WR, more games = BETTER/RELIABLE (higher in list)
                                result = b.totalMatches - a.totalMatches;
                            }
                        }
                        break;
                    case 'kda':
                        result = parseFloat(b.kda) - parseFloat(a.kda);
                        break;
                    case 'matches':
                        result = b.totalMatches - a.totalMatches;
                        break;
                    case 'wins':
                        result = b.wins - a.wins;
                        break;
                    case 'kills':
                        result = b.kills - a.kills;
                        break;
                    default:
                        result = b.winRate - a.winRate;
                }
                // Final tie-breaker: Alphabetical order (A-Z)
                return result || a.player.name.localeCompare(b.player.name);
            });
    },

    /**
     * Get leaderboard
     */
    getLeaderboard(category = 'winRate', limit = 10, minGames = 1) {
        return this.getAllPlayerStats(category, minGames).slice(0, limit);
    },

    /**
     * Calculate champion statistics across all players
     */
    calculateChampionStats() {
        const champData = {};
        const totalMatches = DB.getMatches().length;

        DB.getPlayers().forEach(player => {
            Object.entries(player.stats.championStats || {}).forEach(([rawChampId, stats]) => {
                const champId = Utils.formatChampionName(rawChampId); // Normalize ID

                if (!champData[champId]) {
                    champData[champId] = {
                        id: champId,
                        matches: 0,
                        wins: 0,
                        kills: 0,
                        deaths: 0,
                        assists: 0,
                        players: new Set()
                    };
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
                winRate: c.matches > 0 ? Math.round((c.wins / c.matches) * 100) : 0,
                kda: c.deaths > 0 ? ((c.kills + c.assists) / c.deaths).toFixed(2) : (c.kills + c.assists).toFixed(2),
                pickRate: totalMatches > 0 ? ((c.matches / totalMatches) * 10).toFixed(1) : 0,
                uniquePlayers: c.players.size
            }))
            .sort((a, b) => b.matches - a.matches);
    },

    /**
     * Get top champion
     */
    getTopChampion() {
        const champions = this.calculateChampionStats();
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
    getDashboardStats() {
        const players = DB.getPlayers();
        const matches = DB.getMatches();

        if (players.length === 0) {
            return null;
        }

        // Use the same aggregation and sorting logic as the Leaderboard for consistency
        const playersByWR = this.getAllPlayerStats('winRate', 1);
        const playersByKDA = this.getAllPlayerStats('kda', 1);

        if (playersByWR.length === 0) {
            return {
                totalPlayers: players.length,
                totalMatches: matches.length,
                topWinRatePlayer: null,
                topKDAPlayer: null,
                recentMatches: matches.slice(-5).reverse()
            };
        }

        return {
            totalPlayers: players.length,
            totalMatches: matches.length,
            topWinRatePlayer: playersByWR[0],
            worstWinRatePlayer: playersByWR[playersByWR.length - 1],
            topKDAPlayer: playersByKDA[0],
            worstKDAPlayer: playersByKDA[playersByKDA.length - 1],
            recentMatches: matches.slice(-5).reverse(),
            topChampion: this.getTopChampion()
        };
    }
};
