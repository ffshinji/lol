/**
 * FFLegendsHub - Database Module
 * Handles all localStorage operations
 */

const DB = {
    storageKey: 'fflegends_hub_data',
    isInitialized: false,
    data: null,

    /**
     * Initialize database
     */
    init() {
        this.data = this.loadData();

        // Auto-fix duplicates on init
        const idsFixed = this.fixDuplicateIds();
        if (this.deduplicatePlayers() || idsFixed) {
            console.log('Database maintenance completed.');
            this.saveData();
        }

        this.isInitialized = true;

        // Dispatch ready event
        window.dispatchEvent(new CustomEvent('dbReady', {
            detail: { cloudAvailable: false }
        }));

        return this.data;
    },

    /**
     * Fix duplicate IDs
     * Returns true if changes were made
     */
    fixDuplicateIds() {
        if (!this.data.players || this.data.players.length === 0) return false;

        const ids = new Set();
        let fixed = false;

        this.data.players.forEach(p => {
            // If ID is missing or duplicate
            if (!p.id || ids.has(p.id)) {
                console.warn('Fixing player ID for:', p.name, 'Old ID:', p.id);
                // Generate new ID
                p.id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
                fixed = true;
            }
            ids.add(p.id);
        });

        return fixed;
    },

    /**
     * Deduplicate players by merging their stats
     * Returns true if changes were made
     */
    deduplicatePlayers() {
        if (!this.data.players || this.data.players.length === 0) return false;

        const uniquePlayers = {};
        let hasDuplicates = false;

        // Group players by normalized name
        this.data.players.forEach(p => {
            const normName = p.name.trim().toLowerCase();
            if (!uniquePlayers[normName]) {
                uniquePlayers[normName] = [];
            }
            uniquePlayers[normName].push(p);
        });

        const newPlayerList = [];

        Object.values(uniquePlayers).forEach(group => {
            if (group.length > 1) {
                hasDuplicates = true;
                // Merge duplicates
                const primary = group[0];
                for (let i = 1; i < group.length; i++) {
                    const duplicate = group[i];

                    // Merge stats
                    primary.stats.matches += duplicate.stats.matches || 0;
                    primary.stats.wins += duplicate.stats.wins || 0;
                    primary.stats.losses += duplicate.stats.losses || 0;
                    primary.stats.kills += duplicate.stats.kills || 0;
                    primary.stats.deaths += duplicate.stats.deaths || 0;
                    primary.stats.assists += duplicate.stats.assists || 0;

                    // Merge champion stats
                    Object.entries(duplicate.stats.championStats || {}).forEach(([champ, stats]) => {
                        if (!primary.stats.championStats[champ]) {
                            primary.stats.championStats[champ] = stats;
                        } else {
                            const pStats = primary.stats.championStats[champ];
                            pStats.matches += stats.matches || 0;
                            pStats.wins += stats.wins || 0;
                            pStats.kills += stats.kills || 0;
                            pStats.deaths += stats.deaths || 0;
                            pStats.assists += stats.assists || 0;
                        }
                    });

                    // Merge role stats
                    Object.entries(duplicate.stats.roleStats || {}).forEach(([role, stats]) => {
                        if (!primary.stats.roleStats[role]) {
                            primary.stats.roleStats[role] = stats;
                        } else {
                            primary.stats.roleStats[role].matches += stats.matches || 0;
                            primary.stats.roleStats[role].wins += stats.wins || 0;
                        }
                    });
                }
                newPlayerList.push(primary);
            } else {
                newPlayerList.push(group[0]);
            }
        });

        if (hasDuplicates) {
            this.data.players = newPlayerList;
            return true;
        }
        return false;
    },

    /**
     * Load data from localStorage
     */
    loadData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.error('Error loading data:', e);
        }

        return {
            players: [],
            matches: [],
            settings: {
                theme: 'dark',
                language: 'tr'
            }
        };
    },

    /**
     * Save data to localStorage
     */
    saveData() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
            return true;
        } catch (e) {
            console.error('Error saving data:', e);
            return false;
        }
    },

    /**
     * Save a setting
     */
    saveSetting(key, value) {
        if (!this.data.settings) this.data.settings = {};
        this.data.settings[key] = value;
        return this.saveData();
    },

    /**
     * Get a setting
     */
    getSetting(key) {
        return this.data.settings?.[key];
    },

    /**
     * Get Gemini API Key
     */
    getGeminiApiKey() {
        return this.getSetting('geminiApiKey');
    },


    /**
     * Get all players
     */
    getPlayers() {
        return this.data.players || [];
    },

    /**
     * Get player by ID
     */
    getPlayerById(id) {
        return this.data.players.find(p => p.id === id);
    },

    /**
     * Get player by name
     */
    getPlayerByName(name) {
        if (!name) return null;
        return this.data.players.find(p =>
            p.name.trim().toLowerCase() === name.trim().toLowerCase() ||
            p.nickname?.trim().toLowerCase() === name.trim().toLowerCase()
        );
    },

    /**
     * Create or get player
     */
    createPlayer(name, data = {}) {
        let player = this.getPlayerByName(name);
        if (player) return player;

        player = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5), // Ensure unique ID
            name: name.trim(),
            nickname: data.nickname || name.trim(),
            realName: data.realName || '',
            mainRole: data.mainRole || 'FILL',
            secondaryRole: data.secondaryRole || 'FILL',
            avatar: data.avatar || null,
            createdAt: new Date().toISOString(),
            history: [],
            stats: {
                matches: 0,
                wins: 0,
                losses: 0,
                kills: 0,
                deaths: 0,
                assists: 0,
                championStats: {},
                roleStats: {}
            }
        };

        this.data.players.push(player);
        this.saveData();
        return player;
    },

    /**
     * Update player
     */
    updatePlayer(id, updates) {
        const index = this.data.players.findIndex(p => p.id === id);
        if (index === -1) return false;

        this.data.players[index] = { ...this.data.players[index], ...updates };
        this.saveData();
        return true;
    },

    /**
     * Delete player
     */
    deletePlayer(id) {
        const index = this.data.players.findIndex(p => p.id === id);
        if (index === -1) return false;

        this.data.players.splice(index, 1);
        this.saveData();
        return true;
    },

    /**
     * Get all matches
     */
    getMatches() {
        return this.data.matches || [];
    },

    /**
     * Get match by ID
     */
    getMatchById(id) {
        return this.data.matches.find(m => m.id === id);
    },

    /**
     * Save match and update player stats
     */
    saveMatch(matchData) {
        const match = {
            id: Date.now().toString(),
            date: matchData.date || new Date().toISOString(),
            ...matchData
        };

        this.data.matches.push(match);

        // Update player stats
        const blueWon = match.winnerTeam === 'blue' || match.winner === 'blue';
        const processTeam = (team, won) => {
            (team || []).forEach(player => {
                this.internalUpdatePlayerStats(player.name, player, won, player.role);
            });
        };

        processTeam(match.blueTeam, blueWon);
        processTeam(match.redTeam, !blueWon);

        this.saveData();
        return match;
    },

    /**
     * Update match and recalculate all stats
     */
    updateMatch(id, newData) {
        const index = this.data.matches.findIndex(m => m.id === id);
        if (index === -1) return false;

        this.data.matches[index] = { ...this.data.matches[index], ...newData, id: id };
        this.recalculateAllStats();
        return true;
    },

    /**
     * Delete match and recalculate
     */
    deleteMatch(id) {
        const index = this.data.matches.findIndex(m => m.id === id);
        if (index === -1) return false;

        this.data.matches.splice(index, 1);
        this.recalculateAllStats();
        return true;
    },

    /**
     * Recalculate ALL player stats from matches
     * This is the source of truth
     */
    recalculateAllStats() {
        console.log('Recalculating all statistics...');

        // 1. Reset all player stats
        this.data.players.forEach(player => {
            player.stats = {
                matches: 0,
                wins: 0,
                losses: 0,
                kills: 0,
                deaths: 0,
                assists: 0,
                championStats: {},
                roleStats: {}
            };
        });

        // 2. Re-process every match
        this.data.matches.forEach(match => {
            const blueWon = match.winnerTeam === 'blue' || match.winner === 'blue';

            const processTeam = (team, won) => {
                (team || []).forEach(playerData => {
                    this.internalUpdatePlayerStats(playerData.name, playerData, won, playerData.role);
                });
            };

            processTeam(match.blueTeam, blueWon);
            processTeam(match.redTeam, !blueWon);
        });

        this.saveData();
        console.log('Recalculation complete.');
    },

    /**
     * Internal version of updatePlayerStats that doesn't save to Disk every time
     */
    internalUpdatePlayerStats(name, matchData, won, role = 'FILL') {
        let player = this.getPlayerByName(name);
        if (!player) player = this.createPlayer(name);

        player.stats.matches++;
        if (won) player.stats.wins++;
        else player.stats.losses++;

        player.stats.kills += parseInt(matchData.kills || matchData.k) || 0;
        player.stats.deaths += parseInt(matchData.deaths || matchData.d) || 0;
        player.stats.assists += parseInt(matchData.assists || matchData.a) || 0;

        if (role !== 'FILL' && (player.mainRole === 'FILL' || !player.mainRole)) {
            player.mainRole = role;
        }

        let champName = matchData.championId || matchData.champion;
        if (champName) {
            const champId = Utils.formatChampionName(champName);
            if (!player.stats.championStats[champId]) {
                player.stats.championStats[champId] = {
                    matches: 0, wins: 0, kills: 0, deaths: 0, assists: 0
                };
            }
            const cs = player.stats.championStats[champId];
            cs.matches++;
            if (won) cs.wins++;
            cs.kills += parseInt(matchData.kills || matchData.k) || 0;
            cs.deaths += parseInt(matchData.deaths || matchData.d) || 0;
            cs.assists += parseInt(matchData.assists || matchData.a) || 0;
        }

        if (!player.stats.roleStats) player.stats.roleStats = {};
        if (!player.stats.roleStats[role]) {
            player.stats.roleStats[role] = { matches: 0, wins: 0 };
        }
        player.stats.roleStats[role].matches++;
        if (won) player.stats.roleStats[role].wins++;
    },

    /**
     * Export all data
     */
    exportData() {
        return JSON.stringify(this.data, null, 2);
    },

    /**
     * Import data
     */
    importData(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.data = imported;
            this.saveData();
            return true;
        } catch (e) {
            console.error('Import failed:', e);
            return false;
        }
    },

    /**
     * Clear all data
     */
    clearData() {
        this.data = {
            players: [],
            matches: [],
            settings: {}
        };
        this.saveData();
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    DB.init();
});
