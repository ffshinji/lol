window.GeminiAPI = {
    BASE_URL: 'https://generativelanguage.googleapis.com/v1beta',

    async getWorkingModel(apiKey) {
        try {
            const response = await fetch(`${this.BASE_URL}/models?key=${apiKey}`);
            const data = await response.json();
            const bestModel = data.models.find(m =>
                m.supportedGenerationMethods.includes('generateContent') &&
                m.name.includes('flash')
            );
            return bestModel ? bestModel.name : 'models/gemini-1.5-flash';
        } catch (e) {
            return 'models/gemini-1.5-flash';
        }
    },

    async testApiKey(apiKey) {
        try {
            const modelName = await this.getWorkingModel(apiKey);
            const response = await fetch(`${this.BASE_URL}/models?key=${apiKey}`);
            if (response.ok) {
                localStorage.setItem('lol_tracker_gemini_model', modelName);
                return { success: true, model: modelName };
            }
            return { success: false, error: "API Anahtarı geçersiz." };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    async analyzeMatchScreenshot(imageBase64, apiKey) {
        try {
            const workingModel = await this.getWorkingModel(apiKey);
            const url = `${this.BASE_URL}/${workingModel}:generateContent?key=${apiKey}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: this.buildPrompt() },
                            { inline_data: { mime_type: 'image/png', data: imageBase64 } }
                        ]
                    }],
                    generationConfig: {
                        temperature: 0.1,
                        response_mime_type: "application/json"
                    }
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || `API Hatası: ${response.status}`);
            return this.parseGeminiResponse(data);
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    buildPrompt() {
        return `You are an expert League of Legends data analyst. Analyze this scoreboard screenshot.
        
        CRITICAL INSTRUCTION - VISUAL RECOGNITION:
        - If champion names are missing, obscured, or not written, YOU MUST IDENTIFY THE CHAMPION BY THEIR ICON/PORTRAIT.
        - You know every League of Legends champion icon. Use this visual knowledge.
        - Do not hallucinate names. If you are 100% sure of the icon, use that champion name.
        
        Extract 10 players total (5 Blue Team, 5 Red Team).
        The standard order is Top, Jungle, Mid, ADC, Support. If the list seems to follow this order, assign roles accordingly.
        
        For each player, extract:
        - name: The player's summoner name (if visible, otherwise "Unknown")
        - champion: The champion name (Derived from text OR Icon)
        - role: TOP, JUNGLE, MID, ADC, or SUPPORT
        - kills, deaths, assists needed accurately.
        - gold: Total gold (parse "12.5k" as 12500)
        - damage: Total damage dealt
        
        Return ONLY a raw JSON object with this exact structure (no markdown formatting):
        {
          "blueTeam": [{"name": "...", "champion": "...", "role": "...", "kills": 0, "deaths": 0, "assists": 0, "gold": 0, "damage": 0}],
          "redTeam": [...],
          "winner": "blue" or "red"
        }`;
    },

    parseGeminiResponse(apiResponse) {
        try {
            let text = apiResponse.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) throw new Error('Cevap boş.');

            const matchData = JSON.parse(text.trim());

            // CS ve Gold için güçlendirilmiş sayı temizleyici
            const cleanNumber = (val) => {
                if (val === undefined || val === null || val === "") return 0;
                if (typeof val === 'number') return val;

                let cleaned = String(val).toLowerCase().trim();

                // Eğer "14.5k" gibi bir değer gelirse
                if (cleaned.includes('k')) {
                    return parseFloat(cleaned.replace('k', '').replace(',', '.')) * 1000;
                }

                // Sadece rakamları tut (harfleri ve gereksiz boşlukları sil)
                cleaned = cleaned.replace(/\D/g, '');
                return parseInt(cleaned) || 0;
            };

            const normalize = (players) => (players || []).map(p => ({
                name: String(p.name || 'Bilinmiyor'),
                champion: String(p.champion || 'Bilinmiyor'),
                role: String(p.role || 'Bilinmiyor').toUpperCase(),
                kills: parseInt(p.kills) || 0,
                deaths: parseInt(p.deaths) || 0,
                assists: parseInt(p.assists) || 0,
                k: parseInt(p.kills) || 0,
                d: parseInt(p.deaths) || 0,
                a: parseInt(p.assists) || 0,
                cs: 0,
                gold: cleanNumber(p.gold),
                damage: cleanNumber(p.damage)
            }));

            return {
                success: true,
                matchData: {
                    blueTeam: normalize(matchData.blueTeam),
                    redTeam: normalize(matchData.redTeam),
                    winnerTeam: String(matchData.winner || 'blue').toLowerCase()
                }
            };
        } catch (error) {
            return { success: false, error: "Veri okuma hatası: " + error.message };
        }
    },

    async imageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
};

console.log("FFLegendsHub: GeminiAPI (CS Düzeltildi) yüklendi.");