/**
 * FFLegendsHub - Utilities Module
 * Helper functions used across the application
 */

const Utils = {
    /**
     * Format champion name to standard ID
     */
    formatChampionName(champId) {
        if (!champId || typeof champId !== 'string') return 'Unknown';

        // Remove special characters and spaces, capitalize first letter
        let formattedId = champId.replace(/[^a-zA-Z0-9]/g, '');
        formattedId = formattedId.charAt(0).toUpperCase() + formattedId.slice(1).toLowerCase();

        // Special cases mapping
        const specialCases = {
            'wukong': 'MonkeyKing',
            'jarvaniv': 'JarvanIV',
            'reksai': 'RekSai',
            'kogmaw': 'KogMaw',
            'leesin': 'LeeSin',
            'missfortune': 'MissFortune',
            'tahmkench': 'TahmKench',
            'drmundo': 'DrMundo',
            'masteryi': 'MasterYi',
            'xinzao': 'XinZhao',
            'xinzhao': 'XinZhao',
            'belveth': 'Belveth',
            // Custom/New Champions
            'mel': 'Mel',
            'yunara': 'Yunara',
            'zaahen': 'Zaahen',
            'ambessa': 'Ambessa'
        };

        // Check special cases
        const lowerId = formattedId.toLowerCase();
        if (specialCases[lowerId]) {
            return specialCases[lowerId];
        }

        // Fallback format
        formattedId = champId.replace(/[' .]/g, '');
        formattedId = formattedId.charAt(0).toUpperCase() + formattedId.slice(1);
        return formattedId;
    },

    normalizeName(name) {
        if (!name) return '';
        let n = name.toString().toLowerCase();

        // Map Turkish characters
        const map = {
            'ş': 's', 'ı': 'i', 'ç': 'c', 'ğ': 'g', 'ü': 'u', 'ö': 'o',
            'Ş': 's', 'I': 'i', 'Ç': 'c', 'Ğ': 'g', 'Ü': 'u', 'Ö': 'o'
        };

        Object.keys(map).forEach(key => {
            n = n.split(key).join(map[key]);
        });

        return n.replace(/[^a-z0-9]/g, '');
    },

    /**
     * Get champion display name (e.g. MonkeyKing -> Wukong, XinZhao -> Xin Zhao)
     */
    getChampionDisplayName(champId) {
        if (!champId) return 'Unknown';

        const displayMaps = {
            'MonkeyKing': 'Wukong',
            'XinZhao': 'Xin Zhao',
            'LeeSin': 'Lee Sin',
            'DrMundo': 'Dr. Mundo',
            'JarvanIV': 'Jarvan IV',
            'KogMaw': "Kog'Maw",
            'RekSai': "Rek'Sai",
            'MissFortune': 'Miss Fortune',
            'TahmKench': 'Tahm Kench',
            'MasterYi': 'Master Yi',
            'AurelionSol': 'Aurelion Sol',
            'TwistedFate': 'Twisted Fate',
            'RenataGlasc': 'Renata Glasc',
            'Nunu': 'Nunu & Willump'
        };

        return displayMaps[champId] || champId;
    },

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    /**
     * Get champion icon URL from DDragon
     */
    getChampionIcon(champId) {
        if (!champId) return 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/29.png';

        const formattedId = this.formatChampionName(champId);

        // Custom URL Overrides for new champions
        const customUrls = {
            'Mel': 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Mel.png',
            'Yunara': 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Yunara.png',
            'Zaahen': 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Zaahen.png'
        };

        if (customUrls[formattedId]) {
            return customUrls[formattedId];
        }

        return `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${formattedId}.png`;
    },

    /**
     * Get profile icon based on player name
     */
    getProfileIcon(name) {
        const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
        const iconId = (hash % 28) + 1;
        return `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${iconId}.png`;
    },

    /**
     * Get role icon URL
     */
    getRoleIcon(role) {
        const icons = {
            'FILL': 'https://i.hizliresim.com/3h0xhq5.png',
            'TOP': 'https://draftlol.dawe.gg/static/media/position-top.b8751069432fe163496f.svg',
            'JUNGLE': 'https://draftlol.dawe.gg/static/media/position-jungle.5e69f9ec34fbe57e75c8.svg',
            'MID': 'https://draftlol.dawe.gg/static/media/position-middle.34427fb8c407c39d57e2.svg',
            'ADC': 'https://draftlol.dawe.gg/static/media/position-bottom.21509e3883c16b6fc3d0.svg',
            'SUPPORT': 'https://draftlol.dawe.gg/static/media/position-utility.c5a52aaac8d51b65adf7.svg'
        };
        return icons[role?.toUpperCase()] || icons['FILL'];
    },

    /**
     * Get role display name
     */
    getRoleName(role) {
        const names = {
            TOP: 'Top',
            JUNGLE: 'Jungle',
            MID: 'Mid',
            ADC: 'ADC',
            SUPPORT: 'Support',
            FILL: 'Fill'
        };
        return names[role] || role;
    },

    /**
     * Format date
     */
    formatDate(dateString, format = 'DD/MM/YYYY') {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return format
            .replace('DD', day)
            .replace('MM', month)
            .replace('YYYY', year)
            .replace('HH', hours)
            .replace('mm', minutes);
    },

    /**
     * Format duration (seconds to mm:ss)
     */
    formatDuration(seconds) {
        if (!seconds) return '-';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${String(secs).padStart(2, '0')}`;
    },

    /**
     * Get gradient color value (Raw color string)
     */
    getGradientColorValue(value, minHue = 0, maxHue = 120) {
        // Clamp value between 0 and 100
        const percent = Math.max(0, Math.min(100, value));
        // Calculate hue based on percentage
        const hue = (percent / 100) * (maxHue - minHue) + minHue;
        // Return HSL string
        return `hsl(${hue}, 90%, 50%)`;
    },

    /**
     * Get gradient color style (CSS rule)
     */
    getGradientColor(value, minHue = 0, maxHue = 120) {
        return `color: ${this.getGradientColorValue(value, minHue, maxHue)};`;
    },

    /**
     * Format KDA
     */
    formatKDA(kills, deaths, assists) {
        const kda = ((kills + assists) / Math.max(1, deaths)).toFixed(2);
        return {
            kda: parseFloat(kda),
            display: `${kills}/${deaths}/${assists}`,
            color: parseFloat(kda) >= 3 ? 'var(--cyan)' : parseFloat(kda) >= 2 ? 'var(--gold)' : 'var(--text-secondary)'
        };
    },

    /**
     * Get win rate color
     */
    getWinRateColor(wr) {
        return this.getGradientColor(wr);
    },

    /**
     * Get KDA color
     */
    getKDAColor(kdaVal) {
        const kda = parseFloat(kdaVal);
        const percentage = (kda / 6) * 100;
        return this.getGradientColor(percentage);
    },

    /**
     * Get KDA rating class
     */
    getKDARatingClass(kda) {
        if (kda >= 5) return 'kda-legendary';
        if (kda >= 3) return 'kda-good';
        if (kda >= 2) return 'kda-average';
        return 'kda-poor';
    },

    /**
     * Get initials from name
     */
    getInitials(name) {
        if (!name) return '?';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    },

    /**
     * Get avatar color based on name
     */
    getAvatarColor(name) {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        ];
        const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
        return colors[hash % colors.length];
    },

    /**
     * Render standardized avatar HTML
     */
    renderAvatarHtml(player, sizeClass = '') {
        const name = player.nickname || player.name || '?';
        const initials = this.getInitials(name);
        const avatarColor = this.getAvatarColor(name);

        return `
            <div class="avatar ${sizeClass}" style="background: ${avatarColor};">
                ${player.avatar
                ? `<img src="${player.avatar}" alt="${this.escapeHtml(name)}" style="width:100%;height:100%;object-fit:cover;">`
                : `<span class="avatar-text">${initials}</span>`
            }
            </div>
        `;
    },

    /**
     * Escape HTML
     */
    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    /**
     * Format large number (1000 -> 1K)
     */
    formatLargeNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    },

    /**
     * Calculate win rate
     */
    calcWinRate(wins, total) {
        if (total === 0) return 0;
        return Math.round((wins / total) * 100);
    },

    /**
     * Parse URL parameters
     */
    getUrlParams() {
        return new URLSearchParams(window.location.search);
    },

    /**
     * Set URL parameter
     */
    setUrlParam(key, value) {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    },

    /**
     * Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Show toast notification
     */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 24px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            color: var(--text-primary);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    /**
     * Copy to clipboard with visual feedback
     */
    copyToClipboard(inputId, btn) {
        const input = document.getElementById(inputId);
        if (!input) return;

        input.select();
        document.execCommand('copy');

        let targetBtn = btn;
        if (typeof btn === 'string') {
            targetBtn = document.getElementById(btn);
        }

        if (targetBtn) {
            const originalHtml = targetBtn.innerHTML;
            targetBtn.innerHTML = '✅ Kopyalandı!';
            targetBtn.classList.add('copied');
            setTimeout(() => {
                targetBtn.innerHTML = originalHtml;
                targetBtn.classList.remove('copied');
            }, 2000);
        }

        this.showToast('Link kopyalandı!', 'success');
    }
};

// SVG Icons (commonly used)
const Icons = {
    home: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    users: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    file: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>`,
    trophy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    settings: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`
};
