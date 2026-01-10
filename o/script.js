// --- MOCK DATA ---
const CHAMPIONS = [
    { id: 'aatrox', name: 'Aatrox', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Aatrox.png' },
    { id: 'ahri', name: 'Ahri', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ahri.png' },
    { id: 'akali', name: 'Akali', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Akali.png' },
    { id: 'akshan', name: 'Akshan', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Akshan.png' },
    { id: 'alistar', name: 'Alistar', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Alistar.png' },
    { id: 'ambessa', name: 'Ambessa', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ambessa.png' },
    { id: 'amumu', name: 'Amumu', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Amumu.png' },
    { id: 'anivia', name: 'Anivia', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Anivia.png' },
    { id: 'annie', name: 'Annie', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Annie.png' },
    { id: 'aphelios', name: 'Aphelios', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Aphelios.png' },
    { id: 'ashe', name: 'Ashe', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ashe.png' },
    { id: 'aurelionsol', name: 'Aurelion Sol', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/AurelionSol.png' },
    { id: 'aurora', name: 'Aurora', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Aurora.png' },
    { id: 'azir', name: 'Azir', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Azir.png' },
    { id: 'bard', name: 'Bard', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Bard.png' },
    { id: 'belveth', name: 'Bel\'Veth', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Belveth.png' },
    { id: 'blitzcrank', name: 'Blitzcrank', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Blitzcrank.png' },
    { id: 'brand', name: 'Brand', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Brand.png' },
    { id: 'braum', name: 'Braum', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Braum.png' },
    { id: 'briar', name: 'Briar', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Briar.png' },
    { id: 'caitlyn', name: 'Caitlyn', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Caitlyn.png' },
    { id: 'camille', name: 'Camille', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Camille.png' },
    { id: 'cassiopeia', name: 'Cassiopeia', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Cassiopeia.png' },
    { id: 'chogath', name: 'Cho\'Gath', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Chogath.png' },
    { id: 'corki', name: 'Corki', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Corki.png' },
    { id: 'darius', name: 'Darius', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Darius.png' },
    { id: 'diana', name: 'Diana', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Diana.png' },
    { id: 'drmundo', name: 'Dr. Mundo', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/DrMundo.png' },
    { id: 'draven', name: 'Draven', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Draven.png' },
    { id: 'ekko', name: 'Ekko', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ekko.png' },
    { id: 'elise', name: 'Elise', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Elise.png' },
    { id: 'evelynn', name: 'Evelynn', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Evelynn.png' },
    { id: 'ezreal', name: 'Ezreal', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ezreal.png' },
    { id: 'fiddlesticks', name: 'Fiddlesticks', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Fiddlesticks.png' },
    { id: 'fiora', name: 'Fiora', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Fiora.png' },
    { id: 'fizz', name: 'Fizz', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Fizz.png' },
    { id: 'galio', name: 'Galio', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Galio.png' },
    { id: 'gangplank', name: 'Gangplank', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Gangplank.png' },
    { id: 'garen', name: 'Garen', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Garen.png' },
    { id: 'gnar', name: 'Gnar', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Gnar.png' },
    { id: 'gragas', name: 'Gragas', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Gragas.png' },
    { id: 'graves', name: 'Graves', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Graves.png' },
    { id: 'gwen', name: 'Gwen', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Gwen.png' },
    { id: 'hecarim', name: 'Hecarim', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Hecarim.png' },
    { id: 'heimerdinger', name: 'Heimerdinger', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Heimerdinger.png' },
    { id: 'hwei', name: 'Hwei', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Hwei.png' },
    { id: 'illaoi', name: 'Illaoi', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Illaoi.png' },
    { id: 'irelia', name: 'Irelia', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Irelia.png' },
    { id: 'ivern', name: 'Ivern', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ivern.png' },
    { id: 'janna', name: 'Janna', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Janna.png' },
    { id: 'jarvaniv', name: 'Jarvan IV', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/JarvanIV.png' },
    { id: 'jax', name: 'Jax', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Jax.png' },
    { id: 'jayce', name: 'Jayce', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Jayce.png' },
    { id: 'jhin', name: 'Jhin', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Jhin.png' },
    { id: 'jinx', name: 'Jinx', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Jinx.png' },
    { id: 'kaisa', name: 'Kai\'sa', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Kaisa.png' },
    { id: 'kalista', name: 'Kalista', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Kalista.png' },
    { id: 'karma', name: 'Karma', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Karma.png' },
    { id: 'karthus', name: 'Karthus', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Karthus.png' },
    { id: 'kassadin', name: 'Kassadin', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Kassadin.png' },
    { id: 'katarina', name: 'Katarina', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Katarina.png' },
    { id: 'kayle', name: 'Kayle', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Kayle.png' },
    { id: 'kayn', name: 'Kayn', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Kayn.png' },
    { id: 'kennen', name: 'Kennen', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Kennen.png' },
    { id: 'khazix', name: 'Kha\'Zix', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Khazix.png' },
    { id: 'kindred', name: 'Kindred', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Kindred.png' },
    { id: 'kled', name: 'Kled', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Kled.png' },
    { id: 'kogmaw', name: 'Kog\'Maw', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/KogMaw.png' },
    { id: 'ksante', name: 'K\'Sante', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/KSante.png' },
    { id: 'leblanc', name: 'LeBlanc', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Leblanc.png' },
    { id: 'leesin', name: 'Lee Sin', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/LeeSin.png' },
    { id: 'leona', name: 'Leona', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Leona.png' },
    { id: 'lillia', name: 'Lillia', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Lillia.png' },
    { id: 'lissandra', name: 'Lissandra', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Lissandra.png' },
    { id: 'lucian', name: 'Lucian', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Lucian.png' },
    { id: 'lulu', name: 'Lulu', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Lulu.png' },
    { id: 'lux', name: 'Lux', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Lux.png' },
    { id: 'malphite', name: 'Malphite', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Malphite.png' },
    { id: 'malzahar', name: 'Malzahar', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Malzahar.png' },
    { id: 'maokai', name: 'Maokai', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Maokai.png' },
    { id: 'masteryi', name: 'Master Yi', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/MasterYi.png' },
    { id: 'milio', name: 'Milio', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Milio.png' },
    { id: 'missfortune', name: 'Miss Fortune', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/MissFortune.png' },
    { id: 'mordekaiser', name: 'Mordekaiser', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Mordekaiser.png' },
    { id: 'morgana', name: 'Morgana', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Morgana.png' },
    { id: 'naafiri', name: 'Naafiri', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Naafiri.png' },
    { id: 'nami', name: 'Nami', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Nami.png' },
    { id: 'nasus', name: 'Nasus', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Nasus.png' },
    { id: 'nautilus', name: 'Nautilus', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Nautilus.png' },
    { id: 'neeko', name: 'Neeko', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Neeko.png' },
    { id: 'nidalee', name: 'Nidalee', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Nidalee.png' },
    { id: 'nilah', name: 'Nilah', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Nilah.png' },
    { id: 'nocturne', name: 'Nocturne', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Nocturne.png' },
    { id: 'nunu', name: 'Nunu & Willump', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Nunu.png' },
    { id: 'olaf', name: 'Olaf', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Olaf.png' },
    { id: 'ori', name: 'Orianna', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Orianna.png' },
    { id: 'ornn', name: 'Ornn', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ornn.png' },
    { id: 'pantheon', name: 'Pantheon', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Pantheon.png' },
    { id: 'poppy', name: 'Poppy', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Poppy.png' },
    { id: 'pyke', name: 'Pyke', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Pyke.png' },
    { id: 'qiyana', name: 'Qiyana', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Qiyana.png' },
    { id: 'quinn', name: 'Quinn', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Quinn.png' },
    { id: 'rakan', name: 'Rakan', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Rakan.png' },
    { id: 'rammus', name: 'Rammus', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Rammus.png' },
    { id: 'RekSai', name: "Rek'Sai", role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/RekSai.png' },
    { id: 'rell', name: 'Rell', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Rell.png' },
    { id: 'renata', name: 'Renata Glasc', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Renata.png' },
    { id: 'renekton', name: 'Renekton', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Renekton.png' },
    { id: 'rengar', name: 'Rengar', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Rengar.png' },
    { id: 'riven', name: 'Riven', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Riven.png' },
    { id: 'rumble', name: 'Rumble', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Rumble.png' },
    { id: 'ryze', name: 'Ryze', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ryze.png' },
    { id: 'samira', name: 'Samira', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Samira.png' },
    { id: 'sejuani', name: 'Sejuani', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Sejuani.png' },
    { id: 'senna', name: 'Senna', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Senna.png' },
    { id: 'seraphine', name: 'Seraphine', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Seraphine.png' },
    { id: 'sett', name: 'Sett', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Sett.png' },
    { id: 'shaco', name: 'Shaco', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Shaco.png' },
    { id: 'shen', name: 'Shen', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Shen.png' },
    { id: 'shyvana', name: 'Shyvana', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Shyvana.png' },
    { id: 'singed', name: 'Singed', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Singed.png' },
    { id: 'sion', name: 'Sion', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Sion.png' },
    { id: 'sivir', name: 'Sivir', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Sivir.png' },
    { id: 'skarner', name: 'Skarner', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Skarner.png' },
    { id: 'smolder', name: 'Smolder', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Smolder.png' },
    { id: 'sona', name: 'Sona', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Sona.png' },
    { id: 'soraka', name: 'Soraka', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Soraka.png' },
    { id: 'swain', name: 'Swain', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Swain.png' },
    { id: 'sylas', name: 'Sylas', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Sylas.png' },
    { id: 'syndra', name: 'Syndra', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Syndra.png' },
    { id: 'tahm', name: 'Tahm Kench', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/TahmKench.png' },
    { id: 'taliyah', name: 'Taliyah', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Taliyah.png' },
    { id: 'talon', name: 'Talon', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Talon.png' },
    { id: 'taric', name: 'Taric', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Taric.png' },
    { id: 'teemo', name: 'Teemo', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Teemo.png' },
    { id: 'thresh', name: 'Thresh', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Thresh.png' },
    { id: 'tristana', name: 'Tristana', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Tristana.png' },
    { id: 'trundle', name: 'Trundle', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Trundle.png' },
    { id: 'tryndamere', name: 'Tryndamere', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Tryndamere.png' },
    { id: 'twistedfate', name: 'Twisted Fate', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/TwistedFate.png' },
    { id: 'twitch', name: 'Twitch', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Twitch.png' },
    { id: 'udyr', name: 'Udyr', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Udyr.png' },
    { id: 'urgot', name: 'Urgot', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Urgot.png' },
    { id: 'varus', name: 'Varus', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Varus.png' },
    { id: 'vayne', name: 'Vayne', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Vayne.png' },
    { id: 'veigar', name: 'Veigar', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Veigar.png' },
    { id: 'velkoz', name: 'Vel\'Koz', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Velkoz.png' },
    { id: 'vex', name: 'Vex', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Vex.png' },
    { id: 'vi', name: 'Vi', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Vi.png' },
    { id: 'viego', name: 'Viego', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Viego.png' },
    { id: 'viktor', name: 'Viktor', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Viktor.png' },
    { id: 'vladimir', name: 'Vladimir', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Vladimir.png' },
    { id: 'volibear', name: 'Volibear', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Volibear.png' },
    { id: 'warwick', name: 'Warwick', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Warwick.png' },
    { id: 'wukong', name: 'Wukong', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/MonkeyKing.png' },
    { id: 'xayah', name: 'Xayah', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Xayah.png' },
    { id: 'xerath', name: 'Xerath', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Xerath.png' },
    { id: 'xinzhao', name: 'Xin Zhao', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/XinZhao.png' },
    { id: 'yasuo', name: 'Yasuo', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Yasuo.png' },
    { id: 'yone', name: 'Yone', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Yone.png' },
    { id: 'yorick', name: 'Yorick', role: 'top', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Yorick.png' },
    { id: 'yuumi', name: 'Yuumi', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Yuumi.png' },
    { id: 'zac', name: 'Zac', role: 'jungle', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Zac.png' },
    { id: 'zed', name: 'Zed', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Zed.png' },
    { id: 'zeri', name: 'Zeri', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Zeri.png' },
    { id: 'ziggs', name: 'Ziggs', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ziggs.png' },
    { id: 'zilean', name: 'Zilean', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Zilean.png' },
    { id: 'zoe', name: 'Zoe', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Zoe.png' },
    { id: 'zyra', name: 'Zyra', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Zyra.png' },
    { id: 'mel', name: 'Mel', role: 'support', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Mel_0.jpg', isCustom: true },
    { id: 'yunara', name: 'Yunara', role: 'bot', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yunara_0.jpg', isCustom: true },
    { id: 'zaahen', name: 'Zaahen', role: 'mid', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zaahen_0.jpg', isCustom: true }
];

// --- DRAFT CONFIG ---
// Action Types: 'ban', 'pick'
// Sides: 'blue', 'red'
const DRAFT_ORDER = [
    { side: 'blue', type: 'ban' }, { side: 'red', type: 'ban' },
    { side: 'blue', type: 'ban' }, { side: 'red', type: 'ban' },
    { side: 'blue', type: 'ban' }, { side: 'red', type: 'ban' },
    // First Pick Phase
    { side: 'blue', type: 'pick' }, { side: 'red', type: 'pick' },
    { side: 'red', type: 'pick' }, { side: 'blue', type: 'pick' },
    { side: 'blue', type: 'pick' }, { side: 'red', type: 'pick' },
    // Second Ban Phase
    { side: 'red', type: 'ban' }, { side: 'blue', type: 'ban' },
    { side: 'red', type: 'ban' }, { side: 'blue', type: 'ban' },
    // Final Pick Phase
    { side: 'red', type: 'pick' }, { side: 'blue', type: 'pick' },
    { side: 'blue', type: 'pick' }, { side: 'red', type: 'pick' },
];

const TURN_TIME = 30; // default seconds
const SYNC_CHANNEL = new BroadcastChannel('lol_draft_sync');

class DraftSimulator {
    constructor(config = null) {
        // Persistence: Load from localStorage if not provided (for links)
        if (!config) {
            const saved = localStorage.getItem('current_draft_config');
            if (saved) {
                config = JSON.parse(saved);
                console.log("Loaded config from localStorage:", config);
            }
        }

        this.config = config || {
            blueName: 'MAVİ TAKIM',
            redName: 'KIRMIZI TAKIM',
            mode: 'normal',
            bestOf: 1,
            turnTime: TURN_TIME,
            currentGameIndex: 1,
            results: []
        };

        // Ensure results and currentGameIndex exist (for backwards compatibility)
        if (!this.config.results) this.config.results = [];
        if (!this.config.currentGameIndex) this.config.currentGameIndex = 1;

        // Determine user perspective from URL
        const params = new URLSearchParams(window.location.search);
        this.userSide = params.get('side'); // 'blue', 'red', or 'spectate'
        this.activeGameIndex = parseInt(params.get('game')) || this.config.currentGameIndex;
        this.isAdmin = !this.userSide; // If no side param, assume local/admin mode

        this.stepIndex = 0;
        this.timer = this.config.turnTime;
        this.timerInterval = null;
        this.selectedChampion = null;

        this.blueTeam = { bans: [], picks: [] };
        this.redTeam = { bans: [], picks: [] };
        this.unavailableChampions = new Set();
        this.fearlessUsedChampions = new Set();

        // FEARLESS LOGIC: Load previous picks
        if (this.config.mode === 'fearless' && this.config.results) {
            this.config.results.forEach(res => {
                const picks = [...res.blueTeam.picks, ...res.redTeam.picks];
                picks.forEach(p => {
                    this.unavailableChampions.add(p.id);
                    this.fearlessUsedChampions.add(p.id);
                });
            });
            console.log("Fearless Mode: Loaded " + this.fearlessUsedChampions.size + " used champions.");
        }

        // Ready Check State
        this.readyStates = { blue: false, red: false };

        this.initUI();
        this.initSync();
        this.updateReadyUI();

        // If admin, broadcast initial state to sync any already open tabs
        if (this.isAdmin) {
            this.broadcast('init', {
                config: this.config,
                stepIndex: this.stepIndex,
                blueTeam: this.blueTeam,
                redTeam: this.redTeam,
                unavailable: Array.from(this.unavailableChampions),
                readyStates: this.readyStates
            });
        }
    }

    initUI() {
        document.querySelector('.blue-label').textContent = this.config.blueName;
        document.querySelector('.red-label').textContent = this.config.redName;

        // Update Ready Overlay Text
        document.querySelector('.blue-ready-name').textContent = this.config.blueName;
        document.querySelector('.red-ready-name').textContent = this.config.redName;

        // Set initial timer display to config value (not HTML default)
        document.getElementById('turn-timer').textContent = this.config.turnTime;

        // Reset countdown state
        this.countdownStarted = false;

        this.renderBanSlots();
        this.renderPickSlots();
        this.renderChampionGrid(CHAMPIONS);
        this.renderSeriesInfo();

        // Lock-in Button
        const lockBtn = document.getElementById('lock-in-btn');
        const newLockBtn = lockBtn.cloneNode(true);
        lockBtn.parentNode.replaceChild(newLockBtn, lockBtn);
        newLockBtn.addEventListener('click', () => this.lockInChampion());

        // Search Input
        const searchInput = document.getElementById('champion-search');
        const newSearchInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newSearchInput, searchInput);
        newSearchInput.addEventListener('input', (e) => this.applyFilters());

        // Ready Buttons
        const bReadyBtn = document.getElementById('blue-ready-btn');
        const rReadyBtn = document.getElementById('red-ready-btn');

        bReadyBtn.onclick = () => this.setReady('blue');
        rReadyBtn.onclick = () => this.setReady('red');

        // Disable ready buttons based on side
        if (this.userSide === 'red') bReadyBtn.disabled = true;
        if (this.userSide === 'blue') rReadyBtn.disabled = true;
        if (this.userSide === 'spectate') {
            bReadyBtn.disabled = true;
            rReadyBtn.disabled = true;
            bReadyBtn.textContent = "BEKLENİYOR";
            rReadyBtn.textContent = "BEKLENİYOR";
        }

        // Role Filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', (e) => {
                const targetBtn = e.target.closest('.filter-btn');
                if (!targetBtn) return;
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                targetBtn.classList.add('active');
                this.currentRoleFilter = targetBtn.dataset.role;
                this.applyFilters();
            });
        });

        this.currentRoleFilter = 'all';

        // Series Info Toggle (FEARLESS)
        const seriesToggle = document.getElementById('series-info-toggle');
        if (seriesToggle) {
            // Remove old listeners to prevent duplicates
            const newToggle = seriesToggle.cloneNode(true);
            seriesToggle.parentNode.replaceChild(newToggle, seriesToggle);

            newToggle.onclick = (e) => {
                e.stopPropagation();
                const popup = document.getElementById('series-detail-popup');
                popup.classList.toggle('hidden');
                if (!popup.classList.contains('hidden')) {
                    this.renderSeriesDetailInfo();
                }
            };

            // Close when clicking outside
            document.addEventListener('click', (e) => {
                const popup = document.getElementById('series-detail-popup');
                if (popup && !popup.classList.contains('hidden') && !e.target.closest('#series-info-bar')) {
                    popup.classList.add('hidden');
                }
            });
        }
    }

    initSync() {
        SYNC_CHANNEL.onmessage = (event) => {
            const { type, data } = event.data;
            switch (type) {
                case 'init':
                    this.onSyncInit(data);
                    break;
                case 'select':
                    this.onSyncSelect(data);
                    break;
                case 'lock':
                    this.onSyncLock(data);
                    break;
                case 'timer':
                    this.onSyncTimer(data);
                    break;
                case 'ready':
                    this.onSyncReady(data);
                    break;
                case 'countdown_start':
                    if (!this.countdownStarted) {
                        this.countdownStarted = true;
                        this.startReadyCountdown();
                    }
                    break;
            }
        };
    }

    broadcast(type, data) {
        SYNC_CHANNEL.postMessage({ type, data });
    }

    onSyncInit(data) {
        this.config = data.config;
        this.stepIndex = data.stepIndex;
        this.blueTeam = data.blueTeam;
        this.redTeam = data.redTeam;
        this.unavailableChampions = new Set(data.unavailable);
        this.readyStates = data.readyStates;
        this.initUI();
        this.updateReadyUI();
        if (this.readyStates.blue && this.readyStates.red) {
            this.startTurn();
        }
    }

    onSyncSelect(data) {
        const turn = DRAFT_ORDER[this.stepIndex];
        if (turn && turn.side === data.side) {
            const champ = CHAMPIONS.find(c => c.id === data.champId);
            if (champ) {
                this.selectedChampion = champ;
                const index = this.getCurrentTypeIndex(turn);
                const slot = document.getElementById(`${turn.side}-${turn.type}-${index}`);
                this.previewChampionInSlot(slot, champ);

                // Card Highlight
                document.querySelectorAll('.champion-card').forEach(c => {
                    const img = c.querySelector('img');
                    if (img && img.src === champ.img) {
                        c.classList.add('selected');
                    } else {
                        c.classList.remove('selected');
                    }
                });
            }
        }
    }

    onSyncLock(data) {
        const champ = CHAMPIONS.find(c => c.id === data.champId);
        if (champ) {
            this.selectedChampion = champ;
            this.lockInChampion(true); // true = sync source
        }
    }

    onSyncTimer(data) {
        if (!this.isAdmin) {
            this.timer = data.time;
            this.updateTimerDisplay();
        }
    }

    onSyncReady(data) {
        this.readyStates[data.side] = true;
        this.updateReadyUI();
    }

    setReady(side) {
        if (!this.isAdmin && this.userSide !== side) return;
        this.readyStates[side] = true;
        this.updateReadyUI();
        this.broadcast('ready', { side });
    }

    updateReadyUI() {
        const bBtn = document.getElementById('blue-ready-btn');
        const rBtn = document.getElementById('red-ready-btn');
        const bStatus = document.querySelector('#blue-ready-zone .ready-status');
        const rStatus = document.querySelector('#red-ready-zone .ready-status');

        if (this.readyStates.blue) {
            bBtn.textContent = "HAZIR";
            bBtn.classList.add('ready');
            bStatus.textContent = "HAZIR!";
            bStatus.classList.add('is-ready');
        }
        if (this.readyStates.red) {
            rBtn.textContent = "HAZIR";
            rBtn.classList.add('ready');
            rStatus.textContent = "HAZIR!";
            rStatus.classList.add('is-ready');
        }

        // Both ready -> show 5-second countdown
        if (this.readyStates.blue && this.readyStates.red && !this.countdownStarted) {
            this.countdownStarted = true;
            this.startReadyCountdown();
        }
    }

    startReadyCountdown() {
        // Hide ready buttons, show countdown
        document.getElementById('ready-title').textContent = "DRAFT BAŞLIYOR!";
        document.getElementById('ready-subtitle').style.display = 'none';
        document.getElementById('ready-buttons-area').style.display = 'none';
        document.getElementById('start-countdown').classList.remove('hidden');

        const countdownEl = document.getElementById('countdown-number');
        let count = 5;
        countdownEl.textContent = count;

        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownEl.textContent = count;
            } else {
                clearInterval(countdownInterval);
                // Hide the entire overlay
                document.getElementById('ready-check-overlay').classList.add('hidden');
                // Start the draft for ALL tabs (admin controls the master timer interval)
                if (!this.timerInterval) {
                    this.startTurn();
                }
            }
        }, 1000);

        // Broadcast countdown to sync tabs
        if (this.isAdmin) {
            this.broadcast('countdown_start', {});
        }
    }

    canAct() {
        if (this.isAdmin) return true;
        if (this.userSide === 'spectate') return false;
        const currentTurn = DRAFT_ORDER[this.stepIndex];
        return this.userSide === currentTurn.side;
    }

    startTurn() {
        const turn = DRAFT_ORDER[this.stepIndex];
        if (!turn) {
            this.endDraft();
            return;
        }

        this.timer = this.config.turnTime;
        this.updateTimerDisplay();
        this.updateStatusDisplay(turn);
        this.highlightActiveSlot(turn);

        if (this.timerInterval) clearInterval(this.timerInterval);

        // Every tab runs a local timer for responsiveness
        this.timerInterval = setInterval(() => {
            this.handleTimer();
            // Only the master (admin) or the active side broadcasts to keep tabs synced
            if (this.isAdmin || this.canAct()) {
                this.broadcast('timer', { time: this.timer });
            }
        }, 1000);

        this.selectedChampion = null;
        document.getElementById('lock-in-btn').disabled = true;

        // Custom turn guidance
        if (!this.canAct() && this.userSide !== 'spectate') {
            document.getElementById('phase-info').textContent += " (SIRANI BEKLE)";
        } else if (this.userSide === 'spectate') {
            document.getElementById('phase-info').textContent += " (İZLİYORSUN)";
        }

        this.applyFilters();
    }

    handleTimer() {
        if (this.timer > 0) {
            this.timer--;
            this.updateTimerDisplay();
        } else {
            clearInterval(this.timerInterval);
            setTimeout(() => {
                if (this.selectedChampion) {
                    this.lockInChampion();
                } else {
                    this.passTurn();
                }
            }, 1000);
        }
    }

    updateTimerDisplay() {
        const timerDiv = document.getElementById('turn-timer');
        timerDiv.textContent = this.timer;
        timerDiv.style.color = this.timer <= 5 ? '#ff4e4e' : 'var(--hextech-gold)';
    }

    updateStatusDisplay(turn) {
        const infoDiv = document.getElementById('phase-info');
        const sideName = turn.side === 'blue' ? this.config.blueName : this.config.redName;
        infoDiv.textContent = `${sideName} ${turn.type.toUpperCase()}`;
        infoDiv.style.color = turn.side === 'blue' ? 'var(--blue-side-color)' : 'var(--red-side-color)';
    }

    selectChampion(champ, cardElement) {
        if (!this.canAct()) return;

        this.selectedChampion = champ;
        document.querySelectorAll('.champion-card').forEach(c => c.classList.remove('selected'));
        cardElement.classList.add('selected');
        document.getElementById('lock-in-btn').disabled = false;

        const turn = DRAFT_ORDER[this.stepIndex];
        const index = this.getCurrentTypeIndex(turn);
        const slot = document.getElementById(`${turn.side}-${turn.type}-${index}`);
        this.previewChampionInSlot(slot, champ);

        // Sync preview
        this.broadcast('select', { side: turn.side, champId: champ.id });
    }

    previewChampionInSlot(slot, champion) {
        if (!slot) return;
        if (slot.classList.contains('ban-slot')) {
            slot.innerHTML = `<img src="${champion.img}" style="opacity: 0.7;">`;
        } else {
            const imgBg = slot.querySelector('.champion-img-bg');
            const img = imgBg.querySelector('img');
            const nameDiv = slot.querySelector('.champion-name');
            let splash;
            if (champion.isCustom) {
                splash = champion.img;
            } else {
                const parts = champion.img.split('/');
                const fileName = parts[parts.length - 1].split('.')[0];
                splash = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${fileName}_0.jpg`;
            }
            img.src = splash;
            imgBg.classList.add('preview');
            img.style.opacity = '0.7';
            nameDiv.textContent = champion.name;
        }
    }

    lockInChampion(isFromSync = false) {
        if (!this.selectedChampion) return;
        if (!isFromSync && !this.canAct()) return;

        const turn = DRAFT_ORDER[this.stepIndex];
        if (!turn) return; // Draft is complete

        const team = turn.side === 'blue' ? this.blueTeam : this.redTeam;

        if (turn.type === 'ban') team.bans.push(this.selectedChampion);
        else team.picks.push(this.selectedChampion);

        this.unavailableChampions.add(this.selectedChampion.id);
        this.updateFinalUI(turn);

        // Sync lock
        if (!isFromSync) {
            this.broadcast('lock', { side: turn.side, champId: this.selectedChampion.id });
        }

        this.stepIndex++;
        this.startTurn();
    }

    passTurn() {
        this.stepIndex++;
        this.startTurn();
    }

    updateFinalUI(turn) {
        const index = this.getCurrentTypeIndex(turn) - 1;
        const slotId = `${turn.side}-${turn.type}-${index}`;
        const slot = document.getElementById(slotId);

        if (turn.type === 'ban') {
            slot.innerHTML = `<img src="${this.selectedChampion.img}">`;
            slot.classList.add('filled');
        } else {
            const imgBg = slot.querySelector('.champion-img-bg');
            const img = imgBg.querySelector('img');
            img.style.opacity = '1';
            imgBg.classList.remove('preview');
            imgBg.classList.add('filled');
        }
    }

    renderSeriesInfo() {
        const container = document.getElementById('series-links');
        if (!container) return;

        container.innerHTML = '';
        const count = parseInt(this.config.bestOf) || 1;

        for (let i = 1; i <= count; i++) {
            const link = document.createElement('span');
            const isCompleted = this.config.results && this.config.results.some(r => r.gameIndex === i);
            const isActive = this.activeGameIndex === i;
            const isNext = i === this.config.currentGameIndex && !isCompleted;
            const isFuture = i > this.config.currentGameIndex;

            link.className = 'series-link' + (isActive ? ' active' : '');

            const icon = document.createElement('i');
            if (isCompleted) {
                icon.className = 'fas fa-check';
            } else if (isActive || isNext) {
                icon.className = 'fas fa-play';
            } else {
                icon.className = 'fas fa-lock';
            }

            link.appendChild(icon);
            link.appendChild(document.createTextNode(` DRAFT${i}`));

            // Make all links clickable
            link.style.cursor = 'pointer';

            const gameIndex = i; // Capture for closure
            const self = this; // Capture this for closure
            link.addEventListener('click', function () {
                // Re-evaluate state at click time!
                const nowCompleted = self.config.results && self.config.results.some(r => r.gameIndex === gameIndex);
                const nowActive = self.activeGameIndex === gameIndex;
                const nowNext = gameIndex === self.config.currentGameIndex && !nowCompleted;
                const nowFuture = gameIndex > self.config.currentGameIndex;

                console.log('Clicked DRAFT' + gameIndex, { nowCompleted, nowActive, nowNext, nowFuture, stepIndex: self.stepIndex, currentGameIndex: self.config.currentGameIndex });

                if (nowCompleted) {
                    // Show summary for completed game from history
                    self.showGameSummary(gameIndex);
                } else if (nowActive && self.stepIndex >= DRAFT_ORDER.length) {
                    // Current game is complete, show its summary
                    self.showDraftSummary();
                } else if (nowActive) {
                    // Current game still in progress, show summary anyway
                    self.showDraftSummary();
                } else if (nowNext || gameIndex <= self.config.currentGameIndex) {
                    // Show links for this game
                    self.showNextGameLinks(gameIndex);
                } else if (nowFuture) {
                    // Cannot access future games yet
                    alert('Önce DRAFT' + (gameIndex - 1) + ' tamamlanmalı!');
                }
            });

            container.appendChild(link);

            if (i < count) {
                const sep = document.createElement('span');
                sep.className = 'series-separator';
                sep.textContent = ' | ';
                container.appendChild(sep);
            }
        }
    }

    showGameSummary(gameIndex) {
        const result = this.config.results.find(r => r.gameIndex === gameIndex);
        if (!result) return;

        // Temporarily set blueTeam/redTeam to show this game's summary
        const tempBlue = this.blueTeam;
        const tempRed = this.redTeam;

        this.blueTeam = result.blueTeam;
        this.redTeam = result.redTeam;

        const overlay = document.getElementById('draft-summary-overlay');
        const boInfo = document.getElementById('summary-bo-info');
        boInfo.textContent = `Bo${this.config.bestOf}: Game-${gameIndex}`;

        this.populateSummarySide('blue');
        this.populateSummarySide('red');

        overlay.classList.remove('hidden');

        // Restore original teams
        this.blueTeam = tempBlue;
        this.redTeam = tempRed;

        document.getElementById('summary-close-btn').onclick = () => {
            overlay.classList.add('hidden');
        };
    }

    showNextGameLinks(index) {
        const baseUrl = window.location.origin + window.location.pathname;
        document.getElementById('link-blue-input').value = `${baseUrl}?side=blue&game=${index}`;
        document.getElementById('link-red-input').value = `${baseUrl}?side=red&game=${index}`;
        document.getElementById('link-spec-input').value = `${baseUrl}?side=spectate&game=${index}`;

        const vm = window.viewManager;
        if (vm) vm.switchView('draft-links');
    }


    getCurrentTypeIndex(turn) {
        if (!turn) return 0;
        const team = turn.side === 'blue' ? this.blueTeam : this.redTeam;
        return turn.type === 'ban' ? team.bans.length : team.picks.length;
    }

    renderBanSlots() {
        const b = document.getElementById('blue-bans');
        const r = document.getElementById('red-bans');
        b.innerHTML = r.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            b.innerHTML += `<div class="ban-slot" id="blue-ban-${i}"></div>`;
            r.innerHTML += `<div class="ban-slot" id="red-ban-${i}"></div>`;
        }
    }

    renderPickSlots() {
        const b = document.getElementById('blue-picks');
        const r = document.getElementById('red-picks');
        b.innerHTML = r.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            b.innerHTML += `<div class="pick-slot" id="blue-pick-${i}"><div class="champion-img-bg"><img src=""></div><div class="champion-name"></div></div>`;
            r.innerHTML += `<div class="pick-slot" id="red-pick-${i}"><div class="champion-img-bg"><img src=""></div><div class="champion-name"></div></div>`;
        }
    }

    renderChampionGrid(champs) {
        const grid = document.getElementById('champion-grid');
        grid.innerHTML = '';
        champs.forEach(champ => {
            const card = document.createElement('div');
            const isUnavailable = this.unavailableChampions.has(champ.id);
            const isUsed = this.fearlessUsedChampions && this.fearlessUsedChampions.has(champ.id);

            card.className = `champion-card ${isUnavailable ? 'unavailable' : ''} ${isUsed ? 'used' : ''}`;
            // isUsed CSS handles content via ::after, but for safety or different styling we can leave innerHTML simple
            card.innerHTML = `<img src="${champ.img}"><div class="champ-name-hover">${champ.name}</div>`;

            if (!isUnavailable && (this.isAdmin || this.canAct())) {
                card.addEventListener('click', () => this.selectChampion(champ, card));
            }
            grid.appendChild(card);
        });
    }

    applyFilters() {
        const query = document.getElementById('champion-search').value.toLowerCase();
        const filtered = CHAMPIONS.filter(c => {
            const matchesRole = this.currentRoleFilter === 'all' || c.role === this.currentRoleFilter;
            const matchesQuery = c.name.toLowerCase().includes(query);
            return matchesRole && matchesQuery;
        });
        this.renderChampionGrid(filtered);
    }

    highlightActiveSlot(turn) {
        document.querySelectorAll('.ban-slot, .pick-slot').forEach(s => s.classList.remove('active'));
        const index = this.getCurrentTypeIndex(turn);
        const slot = document.getElementById(`${turn.side}-${turn.type}-${index}`);
        if (slot) slot.classList.add('active');
    }

    endDraft() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        document.getElementById('phase-info').textContent = "DRAFT TAMAMLANDI";
        document.getElementById('phase-info').style.color = "var(--hextech-gold)";

        // Save Result if it's the current game and not already saved
        // Ensure config.results exists (safe check)
        if (!this.config.results) this.config.results = [];

        const alreadySaved = this.config.results.some(r => r.gameIndex === this.activeGameIndex);

        if (this.activeGameIndex === this.config.currentGameIndex && !alreadySaved) {
            console.log("Saving draft results for Game " + this.activeGameIndex);

            this.config.results.push({
                gameIndex: this.activeGameIndex,
                blueTeam: JSON.parse(JSON.stringify(this.blueTeam)), // Deep clone
                redTeam: JSON.parse(JSON.stringify(this.redTeam)),   // Deep clone
                winner: null
            });

            // Advance currentGameIndex if Bo3/Bo5 not over
            // Ensure bestOf is handled as integer
            const bestOf = parseInt(this.config.bestOf) || 1;
            if (this.config.currentGameIndex < bestOf) {
                this.config.currentGameIndex++;
                console.log("Advanced currentGameIndex to:", this.config.currentGameIndex);
            } else {
                console.log("Series complete!");
            }

            localStorage.setItem('current_draft_config', JSON.stringify(this.config));

            // Re-render series info so icons update (Check -> Play, Lock -> Play)
            this.renderSeriesInfo();
        } else {
            console.log("Draft ended but not saving.", {
                active: this.activeGameIndex,
                current: this.config.currentGameIndex,
                alreadySaved
            });
        }

        this.showDraftSummary();
    }

    showDraftSummary() {
        const overlay = document.getElementById('draft-summary-overlay');
        const boInfo = document.getElementById('summary-bo-info');

        // Update Bo Info
        boInfo.textContent = `Bo${this.config.bestOf}: Game-${this.activeGameIndex}`;

        // Populate Blue Picks & Bans
        this.populateSummarySide('blue');
        // Populate Red Picks & Bans
        this.populateSummarySide('red');

        overlay.classList.remove('hidden');

        // Close Button Listener
        document.getElementById('summary-close-btn').onclick = () => {
            overlay.classList.add('hidden');
        };

        // Match Result Button Listener
        const resultBtn = document.getElementById('open-result-modal-btn');
        if (resultBtn) {
            resultBtn.onclick = () => {
                overlay.classList.add('hidden');
                this.showMatchResultModal();
            };
        }
    }

    showMatchResultModal() {
        const modal = document.getElementById('match-result-modal');
        modal.classList.remove('hidden');

        // Populate Blue Inputs
        const blueContainer = document.getElementById('blue-player-inputs');
        blueContainer.innerHTML = '';
        this.blueTeam.picks.forEach(p => {
            const row = document.createElement('div');
            row.className = 'player-input-row';
            row.innerHTML = `
                <img src="${p.img}">
                <input type="text" class="player-name-input" placeholder="Player Name" data-champ="${p.id}">
                <div class="kda-inputs">
                    <input type="number" class="kda-input k-input" placeholder="K" min="0">/
                    <input type="number" class="kda-input d-input" placeholder="D" min="0">/
                    <input type="number" class="kda-input a-input" placeholder="A" min="0">
                </div>
            `;
            blueContainer.appendChild(row);
        });

        // Populate Red Inputs
        const redContainer = document.getElementById('red-player-inputs');
        redContainer.innerHTML = '';
        this.redTeam.picks.forEach(p => {
            const row = document.createElement('div');
            row.className = 'player-input-row';
            row.innerHTML = `
                <img src="${p.img}">
                <input type="text" class="player-name-input" placeholder="Player Name" data-champ="${p.id}">
                <div class="kda-inputs">
                    <input type="number" class="kda-input k-input" placeholder="K" min="0">/
                    <input type="number" class="kda-input d-input" placeholder="D" min="0">/
                    <input type="number" class="kda-input a-input" placeholder="A" min="0">
                </div>
            `;
            redContainer.appendChild(row);
        });

        document.getElementById('cancel-match-btn').onclick = () => {
            modal.classList.add('hidden');
            document.getElementById('draft-summary-overlay').classList.remove('hidden');
        };

        const saveBtn = document.getElementById('save-match-btn');
        // Remove old listener
        const newSaveBtn = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
        newSaveBtn.onclick = () => this.saveMatchResult();
    }

    saveMatchResult() {
        const winnerRadio = document.querySelector('input[name="match-winner"]:checked');
        if (!winnerRadio) {
            alert('Lütfen kazanan takımı seçiniz!');
            return;
        }
        const winner = winnerRadio.value;

        const collectPlayers = (containerId) => {
            const players = [];
            const rows = document.getElementById(containerId).querySelectorAll('.player-input-row');
            rows.forEach((row, index) => {
                const name = row.querySelector('.player-name-input').value;
                const champId = row.querySelector('.player-name-input').dataset.champ;
                const k = row.querySelector('.k-input').value;
                const d = row.querySelector('.d-input').value;
                const a = row.querySelector('.a-input').value;
                const roles = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
                const role = roles[index] || 'FILL';
                players.push({ name, championId: champId, k, d, a, role });
            });
            return players;
        };

        const bluePlayers = collectPlayers('blue-player-inputs');
        const redPlayers = collectPlayers('red-player-inputs');

        // Save to DataManager
        if (window.dataManager) {
            window.dataManager.saveMatch({
                mode: this.config.mode,
                gameIndex: this.activeGameIndex,
                winner: winner,
                blueTeam: bluePlayers,
                redTeam: redPlayers,
                draftData: {
                    bluePicks: this.blueTeam.picks,
                    redPicks: this.redTeam.picks,
                    blueBans: this.blueTeam.bans,
                    redBans: this.redTeam.bans
                }
            });
            alert('Maç sonucu kaydedildi!');
        }

        document.getElementById('match-result-modal').classList.add('hidden');
    }

    populateSummarySide(side) {
        const team = side === 'blue' ? this.blueTeam : this.redTeam;
        const bansContainer = document.getElementById(`summary-${side}-bans`);
        const picksContainer = document.getElementById(`summary-${side}-picks`);

        bansContainer.innerHTML = '';
        picksContainer.innerHTML = '';

        // Bans
        team.bans.forEach(champ => {
            const icon = document.createElement('div');
            icon.className = 'summary-ban-icon';
            icon.innerHTML = `<img src="${champ.img}" title="${champ.name}">`;
            bansContainer.appendChild(icon);
        });

        // Picks
        team.picks.forEach(champ => {
            const card = document.createElement('div');
            card.className = 'summary-pick-card';

            const splash = this.getSplashUrl(champ);

            card.innerHTML = `
                <img src="${splash}" class="splash-bg">
                <span class="champ-name">${champ.name}</span>
            `;
            picksContainer.appendChild(card);
        });
    }

    getSplashUrl(champion) {
        if (champion.isCustom) return champion.img;
        const parts = champion.img.split('/');
        const fileName = parts[parts.length - 1].split('.')[0];
        return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${fileName}_0.jpg`;
    }

    renderSeriesDetailInfo() {
        const list = document.getElementById('used-champs-list');
        const modeLabel = document.getElementById('info-mode-label');
        if (!list) return;

        list.innerHTML = '';
        modeLabel.textContent = `Mode: ${this.config.mode === 'fearless' ? 'Fearless' : 'Normal'}`;

        if (!this.config.results || this.config.results.length === 0) {
            list.innerHTML = '<div class="no-data" style="color:#666; font-style:italic;">Henüz oyun oynanmadı.</div>';
            return;
        }

        this.config.results.forEach((res) => {
            const group = document.createElement('div');
            group.className = 'game-group';
            group.innerHTML = `<h4>Game ${res.gameIndex}</h4>`;

            const grid = document.createElement('div');
            grid.className = 'used-grid';

            // Collect all picks
            const picks = [...res.blueTeam.picks, ...res.redTeam.picks];
            picks.forEach(p => {
                const thumb = document.createElement('div');
                thumb.className = 'used-thumb';
                thumb.innerHTML = `<img src="${p.img}" title="${p.name}">`;
                grid.appendChild(thumb);
            });

            group.appendChild(grid);
            list.appendChild(group);
        });
    }

    showNextGameLinks(index) {
        if (event) event.preventDefault();

        const baseUrl = window.location.origin + window.location.pathname;
        const blueInput = document.getElementById('link-blue-input');

        console.log("showNextGameLinks called for Game " + index);

        if (blueInput) {
            blueInput.value = `${baseUrl}?side=blue&game=${index}`;
            document.getElementById('link-red-input').value = `${baseUrl}?side=red&game=${index}`;
            document.getElementById('link-spec-input').value = `${baseUrl}?side=spectate&game=${index}`;
        }

        const vm = window.viewManager;
        if (vm) {
            console.log("Switching view using ViewManager");
            vm.switchView('draft-links');
        } else {
            console.warn("ViewManager not found globally, using corrected fallback");
            // Fallback: manually show using correct logic
            document.querySelectorAll('.content-view').forEach(el => el.classList.remove('active'));
            const linksView = document.getElementById('view-draft-links');
            if (linksView) linksView.classList.add('active');
        }

        const title = document.querySelector('#view-draft-links h1');
        if (title) title.textContent = `DRAFT ${index} LİNKLERİ`;
    }
}

// --- DRAFT SETUP MANAGER ---
class DraftSetupManager {
    constructor(viewManager) {
        this.viewManager = viewManager;
        this.container = document.getElementById('view-draft-setup');
        this.settings = { blueName: 'BLUE TEAM', redName: 'RED TEAM', mode: 'normal', bestOf: '1', turnTime: 30 };
        this.init();
    }

    init() {
        // Selection Buttons
        this.container.querySelectorAll('.setup-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target.closest('.setup-btn');
                if (!target || target.disabled) return;

                const type = target.dataset.type;
                const val = target.dataset.value;
                const group = target.closest('.button-group, .segmented-control');

                group.querySelectorAll('.setup-btn').forEach(b => b.classList.remove('active'));
                target.classList.add('active');

                if (type === 'mode') {
                    this.settings.mode = val;
                    // FEARLESS LOGIC
                    const boGroup = document.getElementById('bo-select');
                    const bo1Btn = boGroup.querySelector('[data-value="1"]');
                    const bo3Btn = boGroup.querySelector('[data-value="3"]');

                    if (val === 'fearless') {
                        bo1Btn.disabled = true;
                        bo1Btn.style.opacity = '0.5';
                        bo1Btn.style.cursor = 'not-allowed';

                        if (this.settings.bestOf == 1) {
                            bo1Btn.classList.remove('active');
                            bo3Btn.classList.add('active');
                            this.settings.bestOf = '3';
                        }
                    } else {
                        bo1Btn.disabled = false;
                        bo1Btn.style.opacity = '1';
                        bo1Btn.style.cursor = 'pointer';
                    }
                }

                if (type === 'bo') this.settings.bestOf = val;
                if (type === 'timer') this.settings.turnTime = parseInt(val);
            });
        });

        // Create Draft Button
        document.getElementById('start-draft-btn').addEventListener('click', () => {
            this.settings.blueName = document.getElementById('blue-team-name').value || 'BLUE TEAM';
            this.settings.redName = document.getElementById('red-team-name').value || 'RED TEAM';

            // SAVE TO STORAGE
            localStorage.setItem('current_draft_config', JSON.stringify(this.settings));

            this.showLinks();
        });

        // Link View Buttons
        document.getElementById('copy-blue-btn').addEventListener('click', () => this.copyToClipboard('link-blue-input', 'copy-blue-btn'));
        document.getElementById('copy-red-btn').addEventListener('click', () => this.copyToClipboard('link-red-input', 'copy-red-btn'));
        document.getElementById('copy-spec-btn').addEventListener('click', () => this.copyToClipboard('link-spec-input', 'copy-spec-btn'));

        document.getElementById('confirm-links-btn').addEventListener('click', () => {
            this.viewManager.switchView('draft-simulator');
            window.activeSimulator = new DraftSimulator(this.settings);
        });
    }

    showLinks() {
        const baseUrl = window.location.origin + window.location.pathname;
        document.getElementById('link-blue-input').value = `${baseUrl}?side=blue`;
        document.getElementById('link-red-input').value = `${baseUrl}?side=red`;
        document.getElementById('link-spec-input').value = `${baseUrl}?side=spectate`;
        this.viewManager.switchView('draft-links');
    }

    copyToClipboard(inputId, btnId) {
        const input = document.getElementById(inputId);
        input.select();
        document.execCommand('copy');
        const btn = document.getElementById(btnId);
        const old = btn.textContent;
        btn.textContent = '✅ Kopyalandı!';
        setTimeout(() => btn.textContent = old, 1500);
    }
}

// --- VIEW MANAGEMENT ---
class ViewManager {
    constructor() {
        this.navItems = document.querySelectorAll('.nav-item');
        this.views = document.querySelectorAll('.content-view');
        this.init();
    }

    init() {
        this.navItems.forEach(item => {
            item.addEventListener('click', () => {
                const viewId = item.dataset.view;
                if (viewId) this.switchView(viewId);
            });
        });

        // URL Check for Direct Access
        const params = new URLSearchParams(window.location.search);
        if (params.has('side')) {
            this.switchView('draft-simulator');
            window.activeSimulator = new DraftSimulator();
        }
    }

    switchView(viewId) {
        this.navItems.forEach(i => i.classList.toggle('active', i.dataset.view === viewId));
        this.views.forEach(v => v.classList.toggle('active', v.id === `view-${viewId}`));
        // Emit Event for other controllers
        window.dispatchEvent(new CustomEvent('view-changed', { detail: { viewId } }));
    }
}


// --- STATS CONTROLLER ---
class StatsController {
    constructor() {
        this.dm = window.dataManager;
        this.init();
    }

    init() {
        // Listen for view changes
        window.addEventListener('view-changed', (e) => this.onViewChanged(e.detail.viewId));

        // Player Search
        const searchBtn = document.getElementById('player-search-btn');
        if (searchBtn) searchBtn.addEventListener('click', () => this.searchPlayer());
        const searchInput = document.getElementById('player-search-input');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.searchPlayer();
            });
        }

        // Leaderboard Filters
        document.querySelectorAll('.lb-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.lb-filter').forEach(b => b.classList.remove('active', 'hextech-btn'));
                document.querySelectorAll('.lb-filter').forEach(b => b.classList.add('outline-btn'));
                e.target.classList.add('active', 'hextech-btn');
                e.target.classList.remove('outline-btn');
                this.renderLeaderboard(e.target.dataset.sort);
            });
        });

        // Import/Export
        const exportBtn = document.getElementById('export-data-btn');
        if (exportBtn) exportBtn.addEventListener('click', () => this.exportData());

        const importBtn = document.getElementById('import-data-btn');
        const importFile = document.getElementById('import-data-file');
        if (importBtn && importFile) {
            importBtn.addEventListener('click', () => importFile.click());
            importFile.addEventListener('change', (e) => this.importData(e));
        }
    }

    onViewChanged(viewId) {
        if (viewId === 'leaderboard') this.renderLeaderboard();
        if (viewId === 'past-matches') this.renderPastMatches();
        if (viewId === 'dashboard') this.updateDashboard();
        if (viewId === 'champion-stats') this.renderChampionStats();
    }

    updateDashboard() {
        const stats = this.dm.getDashboardStats();
        if (!stats) return;

        const setText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };

        if (stats.bestWr) {
            setText('dash-best-wr-name', stats.bestWr.name);
            const wr = (stats.bestWr.stats.wins / stats.bestWr.stats.matches * 100).toFixed(0);
            setText('dash-best-wr-val', wr + '%');
        }
        if (stats.worstWr) {
            setText('dash-worst-wr-name', stats.worstWr.name);
            const wr = (stats.worstWr.stats.wins / stats.worstWr.stats.matches * 100).toFixed(0);
            setText('dash-worst-wr-val', wr + '%');
        }
        if (stats.bestKda) {
            setText('dash-best-kda-name', stats.bestKda.name);
            const kda = ((stats.bestKda.stats.kills + stats.bestKda.stats.assists) / Math.max(1, stats.bestKda.stats.deaths)).toFixed(1);
            setText('dash-best-kda-val', kda);
        }
        if (stats.worstKda) {
            setText('dash-worst-kda-name', stats.worstKda.name);
            const kda = ((stats.worstKda.stats.kills + stats.worstKda.stats.assists) / Math.max(1, stats.worstKda.stats.deaths)).toFixed(1);
            setText('dash-worst-kda-val', kda);
        }

        // Recent Matches
        const list = document.getElementById('dash-recent-list');
        if (list && stats.recentMatches) {
            list.innerHTML = '';
            stats.recentMatches.forEach(m => {
                const row = document.createElement('div');
                const date = new Date(m.date).toLocaleString('tr-TR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                row.style.cssText = `display:flex; justify-content:space-between; padding:10px; background:rgba(255,255,255,0.05); border-left:3px solid ${m.winner === 'blue' ? '#0ac8b9' : '#ff4444'}; margin-bottom:5px;`;
                row.innerHTML = `
                    <div style="font-weight:bold; color:#fff;">GAME ${m.gameIndex}</div>
                    <div style="color:${m.winner === 'blue' ? '#0ac8b9' : '#ff4444'}; font-weight:bold;">${m.winner.toUpperCase()} WIN</div>
                    <div style="color:#888; font-size:0.8rem;">${date}</div>
                `;
                list.appendChild(row);
            });
        }
    }

    renderChampionStats() {
        const header = document.getElementById('champ-stats-header');
        const tbody = document.getElementById('champ-stats-body');
        if (!tbody || !header) return;
        tbody.innerHTML = '';
        header.innerHTML = '';

        // Aggregate Data
        const stats = {};
        let totalMatches = this.dm.data.matches.length;
        if (totalMatches === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px; color:#666; font-style:italic;">Veri yok.</td></tr>';
            return;
        }

        this.dm.data.matches.forEach(m => {
            // Picks
            const process = (team, won) => {
                team.forEach(p => {
                    if (!p.championId) return;
                    if (!stats[p.championId]) stats[p.championId] = { matches: 0, wins: 0, k: 0, d: 0, a: 0, bans: 0 };
                    const s = stats[p.championId];
                    s.matches++;
                    if (won) s.wins++;
                    s.k += parseInt(p.k) || 0;
                    s.d += parseInt(p.d) || 0;
                    s.a += parseInt(p.a) || 0;
                });
            };
            process(m.blueTeam, m.winner === 'blue');
            process(m.redTeam, m.winner === 'red');

            // Bans
            const countBans = (bans) => {
                if (!bans) return;
                bans.forEach(bid => {
                    if (!stats[bid]) stats[bid] = { matches: 0, wins: 0, k: 0, d: 0, a: 0, bans: 0 };
                    stats[bid].bans++;
                });
            };
            if (m.draftData) {
                countBans(m.draftData.blueBans);
                countBans(m.draftData.redBans);
            }
        });

        const allChamps = Object.keys(stats);
        if (allChamps.length === 0) return;

        // Sorts
        const sortedByMatches = [...allChamps].sort((a, b) => stats[b].matches - stats[a].matches);
        const sortedByWR = [...allChamps].filter(c => stats[c].matches > 0).sort((a, b) => (stats[b].wins / Math.max(1, stats[b].matches)) - (stats[a].wins / Math.max(1, stats[a].matches)));
        const sortedByKDA = [...allChamps].filter(c => stats[c].matches > 0).sort((a, b) => {
            const kdaA = (stats[a].k + stats[a].a) / Math.max(1, stats[a].d);
            const kdaB = (stats[b].k + stats[b].a) / Math.max(1, stats[b].d);
            return kdaB - kdaA;
        });
        const sortedByBans = [...allChamps].sort((a, b) => stats[b].bans - stats[a].bans);

        // Header Metrics
        const mostPlayed = sortedByMatches[0];
        const bestWr = sortedByWR[0];
        const worstWr = sortedByWR[sortedByWR.length - 1];
        const bestKDA = sortedByKDA[0];
        const mostBanned = sortedByBans[0];

        const getMetrics = (id) => {
            const s = stats[id];
            const wr = s.matches > 0 ? (s.wins / s.matches * 100).toFixed(1) : 0;
            const kda = s.matches > 0 ? ((s.k + s.a) / Math.max(1, s.d)).toFixed(2) : 0;
            const banRate = (s.bans / totalMatches * 100).toFixed(1);
            return { wr, kda, banRate, s };
        };

        const createCard = (title, id, val, sub) => {
            if (!id) return '';
            return `
                <div style="background:rgba(30, 35, 40, 0.8); border:1px solid #444; padding:15px; border-radius:4px; display:flex; align-items:center; gap:15px; box-shadow:0 0 10px rgba(0,0,0,0.5);">
                     <div style="flex:1;">
                        <div style="color:#888; font-size:0.8rem; text-transform:uppercase; letter-spacing:1px;">${title}</div>
                        <div style="font-size:1.2rem; font-weight:bold; color:#fff; margin-top:5px;">${id}</div>
                        <div style="color:#c8aa6e; font-size:0.9rem; font-weight:bold;">${val}</div>
                        <div style="color:#666; font-size:0.75rem;">${sub}</div>
                     </div>
                     <img src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${id}.png" style="width:50px; height:50px; border-radius:50%; border:2px solid #c8aa6e; object-fit:cover;">
                </div>
             `;
        };

        let html = '';
        html += `<div style="background:rgba(30, 35, 40, 0.8); border:1px solid #444; padding:20px; border-radius:4px; display:flex; flex-direction:column; justify-content:center;">
                    <div style="font-size:2rem; font-weight:bold; color:#fff;">${allChamps.length}</div>
                    <div style="color:#888; font-size:0.8rem;">Oynanan Şampiyon</div>
                 </div>`;

        if (mostPlayed) {
            const m = getMetrics(mostPlayed);
            html += createCard('En Çok Oynanan', mostPlayed, `${m.s.matches} Maç`, `WR: ${m.wr}%`);
        }
        if (bestWr) {
            const m = getMetrics(bestWr);
            html += createCard('En Yüksek Winrate', bestWr, `${m.wr}%`, `${m.s.matches} Maç`);
        }
        if (worstWr && worstWr !== bestWr) {
            const m = getMetrics(worstWr);
            html += createCard('En Düşük Winrate', worstWr, `${m.wr}%`, `${m.s.matches} Maç`);
        }
        if (bestKDA) {
            const m = getMetrics(bestKDA);
            html += createCard('En Yüksek KDA', bestKDA, `${m.kda}`, `KDA Oranı`);
        }
        if (mostBanned && stats[mostBanned].bans > 0) {
            const m = getMetrics(mostBanned);
            html += createCard('En Çok Banlanan', mostBanned, `${m.banRate}%`, `${stats[mostBanned].bans} Ban`);
        }
        header.innerHTML = html;

        // Table
        sortedByMatches.forEach(id => {
            const s = stats[id];
            const wr = s.matches > 0 ? (s.wins / s.matches * 100).toFixed(1) : 0;
            const kda = s.matches > 0 ? ((s.k + s.a) / Math.max(1, s.d)).toFixed(2) : '-';
            const pr = (s.matches / totalMatches * 100).toFixed(1);
            const br = (s.bans / totalMatches * 100).toFixed(1);

            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid #333';
            tr.innerHTML = `
                <td style="display:flex; align-items:center; gap:10px; padding:15px;">
                    <img src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${id}.png" style="width:36px; height:36px; border-radius:50%; border:1px solid #444; object-fit: cover;">
                    <span style="color:#fff; font-weight:bold;">${id}</span>
                </td>
                <td style="padding:15px;">${s.matches}</td>
                <td style="padding:15px; color:#888;">${pr}%</td>
                <td style="padding:15px;">
                    <span style="color:#0ac8b9">${s.wins}W</span> <span style="color:#444">/</span> <span style="color:#ff4444">${s.matches - s.wins}L</span>
                </td>
                <td style="padding:15px; color:${wr >= 50 ? '#0ac8b9' : '#ff4444'}; font-weight:bold;">${wr}%</td>
                <td style="padding:15px; color:#c8aa6e;">${kda}</td>
                <td style="padding:15px; color:#aaa;">${br}%</td>
            `;
            tbody.appendChild(tr);
        });
    }

    getProfileIcon(name) {
        let hash = 0;
        for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
        const iconId = Math.abs(hash % 29);
        return `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${iconId}.png`;
    }

    renderLeaderboard(sortBy = 'wr') {
        const tbody = document.getElementById('leaderboard-body');
        if (!tbody) return;
        tbody.innerHTML = '';

        const players = this.dm.getLeaderboard(sortBy);

        players.forEach((p, index) => {
            const tr = document.createElement('tr');
            tr.style.cssText = 'border-bottom:1px solid #333; transition:background 0.2s;';
            tr.onmouseover = () => tr.style.background = 'rgba(255,255,255,0.05)';
            tr.onmouseout = () => tr.style.background = 'transparent';

            const wr = p.stats.matches > 0 ? ((p.stats.wins / p.stats.matches) * 100).toFixed(0) : 0;
            const kda = ((p.stats.kills + p.stats.assists) / Math.max(1, p.stats.deaths)).toFixed(2);
            const kdaDetailed = `${p.stats.kills} / ${p.stats.deaths} / ${p.stats.assists}`;

            // Main Role
            let mainRole = '-';
            if (p.stats.roleStats) {
                const sortedRoles = Object.entries(p.stats.roleStats).sort(([, a], [, b]) => b.matches - a.matches);
                if (sortedRoles.length > 0) mainRole = sortedRoles[0][0];
            }
            const roleIcons = {
                TOP: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-top.svg',
                JUNGLE: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-jungle.svg',
                MID: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-middle.svg',
                ADC: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-bottom.svg',
                SUPPORT: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-utility.svg',
                FILL: ''
            };
            const roleIcon = roleIcons[mainRole] ? `<img src="${roleIcons[mainRole]}" style="width:24px; filter:invert(1) brightness(0.7);">` : `<span style="color:#666; font-size:0.8rem;">${mainRole}</span>`;

            const icon = this.getProfileIcon(p.name);

            tr.innerHTML = `
                <td style="padding:15px; font-weight:bold; color:#c8aa6e; font-size:1.2rem;">#${index + 1}</td>
                <td style="padding:15px; display:flex; align-items:center; gap:15px;">
                    <img src="${icon}" style="width:40px; height:40px; border-radius:50%; border:2px solid #444;">
                    <span style="font-weight:bold; font-size:1rem; color:#fff;">${p.name}</span>
                </td>
                <td style="padding:15px;">${roleIcon}</td>
                <td style="padding:15px;">
                    <span style="font-weight:bold; color:#fff;">${p.stats.matches}</span> <span style="color:#888; font-size:0.8rem;">(${p.stats.wins}W - ${p.stats.losses}L)</span>
                </td>
                <td style="padding:15px; color:${wr >= 50 ? '#0ac8b9' : '#ff4444'}; font-weight:bold; font-size:1.1rem;">${wr}%</td>
                <td style="padding:15px; color:${parseFloat(kda) >= 3 ? '#0ac8b9' : '#c8aa6e'}; font-weight:bold; font-size:1.1rem;">${kda}</td>
                <td style="padding:15px; color:#888; font-size:0.9rem;">${kdaDetailed}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    renderPastMatches() {
        const list = document.getElementById('match-list');
        if (!list) return;
        list.innerHTML = '';

        const matches = this.dm.data.matches.slice().reverse(); // Newest first
        if (matches.length === 0) {
            list.innerHTML = '<div class="no-data" style="color:#666; font-style:italic;">Henüz kayıtlı maç yok.</div>';
            return;
        }

        matches.forEach(m => {
            const el = document.createElement('div');
            el.className = `match-item`;
            el.style.cssText = 'background:rgba(255,255,255,0.05); padding:15px; margin-bottom:10px; border-left: 4px solid ' + (m.winner === 'blue' ? '#0ac8b9' : '#ff4444');

            const date = new Date(m.date).toLocaleString('tr-TR');
            const mode = m.mode === 'fearless' ? 'FEARLESS' : (m.mode === 'tournament' ? 'TOURNAMENT' : 'NORMAL');

            el.innerHTML = `
                <div style="display:flex; justify-content:space-between;">
                    <span style="font-weight:bold; color:#fff;">GAME ${m.gameIndex} (${mode})</span>
                    <span style="color:#888; font-size:0.8rem;">${date}</span>
                </div>
                <div style="margin-top:5px; color:${m.winner === 'blue' ? '#0ac8b9' : '#ff4444'}">
                    Winner: ${m.winner.toUpperCase()} TEAM
                </div>
            `;
            list.appendChild(el);
        });
    }

    searchPlayer() {
        const query = document.getElementById('player-search-input').value.trim();
        if (!query) return;

        const player = this.dm.getPlayer(query);
        const content = document.getElementById('player-profile-content');

        if (!player) {
            alert('Oyuncu bulunamadı!');
            content.classList.add('hidden');
            return;
        }

        content.classList.remove('hidden');

        // --- Header ---
        const header = document.getElementById('pp-header');
        const icon = this.getProfileIcon(player.name);

        let mainRole = 'FILL';
        if (player.stats.roleStats) {
            const sorted = Object.entries(player.stats.roleStats).sort(([, a], [, b]) => b.matches - a.matches);
            if (sorted.length > 0) mainRole = sorted[0][0];
        }
        const wr = player.stats.matches > 0 ? (player.stats.wins / player.stats.matches * 100).toFixed(0) : 0;
        const kda = ((player.stats.kills + player.stats.assists) / Math.max(1, player.stats.deaths)).toFixed(2);

        const roleIcons = {
            TOP: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-top.svg',
            JUNGLE: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-jungle.svg',
            MID: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-middle.svg',
            ADC: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-bottom.svg',
            SUPPORT: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-utility.svg',
            FILL: ''
        };
        const roleImg = roleIcons[mainRole] ? `<img src="${roleIcons[mainRole]}" style="width:20px; filter:invert(1);">` : '';

        header.innerHTML = `
             <img src="${icon}" style="width:100px; height:100px; border-radius:50%; border:3px solid #0ac8b9; box-shadow:0 0 15px rgba(10,200,185,0.4);">
             <div style="flex:1;">
                 <h2 style="font-size:2.5rem; margin:0; color:#fff; font-weight:bold;">${player.name}</h2>
                 <div style="display:flex; align-items:center; gap:10px; margin-top:5px;">
                      <span style="background:#333; padding:4px 10px; border-radius:4px; font-size:0.8rem; color:#ccc; display:flex; align-items:center; gap:5px;">
                          ${roleImg} ${mainRole}
                      </span>
                 </div>
             </div>
             <div style="text-align:right;">
                 <div style="color:${wr >= 50 ? '#0ac8b9' : '#ff4444'}; font-size:2rem; font-weight:bold;">${wr}%</div>
                 <div style="color:#888; font-size:0.9rem;">Kazanma Oranı</div>
                 <div style="font-size:1.2rem; font-weight:bold; color:#fff; margin-top:10px;">${player.stats.matches} Maç</div>
                 <div style="color:#c8aa6e; font-size:1.2rem; font-weight:bold;">${kda} KDA</div>
             </div>
        `;

        // --- Stats Cards ---
        const cardsCtx = document.getElementById('pp-stats-cards');
        const avgK = (player.stats.kills / Math.max(1, player.stats.matches)).toFixed(1);
        const avgD = (player.stats.deaths / Math.max(1, player.stats.matches)).toFixed(1);
        const avgA = (player.stats.assists / Math.max(1, player.stats.matches)).toFixed(1);

        cardsCtx.innerHTML = `
            <div style="background:rgba(255,255,255,0.03); padding:15px; border-radius:8px; border:1px solid #333;">
                <div style="color:#c8aa6e; font-size:1.2rem; font-weight:bold;">${avgK} / ${avgD} / ${avgA}</div>
                <div style="color:#666; font-size:0.8rem;">Ortalama K/D/A</div>
            </div>
             <div style="background:rgba(255,255,255,0.03); padding:15px; border-radius:8px; border:1px solid #333;">
                <div style="color:#fff; font-size:1.2rem; font-weight:bold;">0</div>
                <div style="color:#666; font-size:0.8rem;">Penta Kill</div>
            </div>
             <div style="background:rgba(255,255,255,0.03); padding:15px; border-radius:8px; border:1px solid #333;">
                <div style="color:#fff; font-size:1.2rem; font-weight:bold;">-</div>
                <div style="color:#666; font-size:0.8rem;">Ortalama Hasar</div>
            </div>
        `;

        // --- Champ Pool --- (Top 3)
        const poolDiv = document.getElementById('profile-top-champs');
        poolDiv.innerHTML = '';
        const champs = Object.entries(player.stats.championStats || {}).sort(([, a], [, b]) => b.matches - a.matches).slice(0, 3);
        champs.forEach(([id, s]) => {
            const cwr = (s.wins / s.matches * 100).toFixed(0);
            const ckda = ((s.kills + s.assists) / Math.max(1, s.deaths)).toFixed(2);
            const row = document.createElement('div');
            row.style.cssText = 'display:flex; align-items:center; gap:10px; padding:10px; background:rgba(0,0,0,0.2); border-radius:6px;';
            row.innerHTML = `
                  <img src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${id}.png" style="width:40px; height:40px; border-radius:4px; object-fit:cover;">
                  <div style="flex:1;">
                      <div style="color:#fff; font-weight:bold;">${id}</div>
                      <div style="color:#888; font-size:0.8rem;">${s.matches} maç</div>
                  </div>
                  <div style="text-align:right;">
                      <div style="color:${cwr >= 50 ? '#0ac8b9' : '#ff4444'}; font-weight:bold;">${cwr}%</div>
                      <div style="color:#c8aa6e; font-size:0.8rem;">${ckda} KDA</div>
                  </div>
             `;
            poolDiv.appendChild(row);
        });

        // --- Role Stats ---
        const roleDiv = document.getElementById('profile-role-stats');
        roleDiv.innerHTML = '';
        const roles = Object.entries(player.stats.roleStats || {}).sort(([, a], [, b]) => b.matches - a.matches);
        if (roles.length === 0) roleDiv.innerHTML = '<div style="color:#666;">Veri yok.</div>';
        roles.forEach(([r, s]) => {
            const rwr = (s.wins / s.matches * 100).toFixed(0);
            const pct = (s.matches / player.stats.matches * 100).toFixed(0);
            const bar = document.createElement('div');
            bar.innerHTML = `
                 <div style="display:flex; justify-content:space-between; color:#ccc; font-size:0.8rem; margin-bottom:2px;">
                     <span>${r}</span>
                     <span>${s.matches} maç (${rwr}%)</span>
                 </div>
                 <div style="height:6px; background:#333; border-radius:3px; overflow:hidden;">
                      <div style="height:100%; width:${pct}%; background:${rwr >= 50 ? '#0ac8b9' : '#c8aa6e'};"></div>
                 </div>
             `;
            roleDiv.appendChild(bar);
        });

        // History
        const historyList = document.getElementById('profile-match-history');
        historyList.innerHTML = '';
        const history = [...player.history].reverse().slice(0, 5);
        history.forEach(matchId => {
            const m = this.dm.data.matches.find(x => x.id === matchId);
            if (!m) return;

            let pStats = m.blueTeam.find(x => x.name === player.name) || m.redTeam.find(x => x.name === player.name);
            if (!pStats) return;

            const isBlue = m.blueTeam.includes(pStats);
            const won = (m.winner === 'blue' && isBlue) || (m.winner === 'red' && !isBlue);

            const el = document.createElement('div');
            el.className = 'match-item';
            el.style.borderLeft = `4px solid ${won ? '#0ac8b9' : '#ff4444'}`;
            el.innerHTML = `
                  <div class="match-champ">
                      <img src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${pStats.championId}.png" style="width:48px; height:48px; border-radius:50%; border:1px solid #444; object-fit:cover;">
                  </div>
                  <div class="match-info">
                      <div class="match-result" style="color:${won ? '#0ac8b9' : '#ff4444'}; font-weight:bold;">${won ? 'VICTORY' : 'DEFEAT'}</div>
                      <div class="match-kda" style="color:#fff;">${pStats.k}/${pStats.d}/${pStats.a}</div>
                  </div>
                  <div style="margin-left:auto; text-align:right;">
                       <div style="color:#888; font-size:0.8rem;">${m.mode.toUpperCase()}</div>
                       <div style="color:#666; font-size:0.7rem;">${pStats.role || 'FILL'}</div>
                  </div>
             `;
            historyList.appendChild(el);
        });
    }

    exportData() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.dm.data));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "lol_sim_data_" + Date.now() + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target.result);
                if (json.players && json.matches) {
                    this.dm.data = json;
                    this.dm.saveData();
                    alert('Veriler başarıyla yüklendi!');
                    this.renderPastMatches();
                } else {
                    alert('Geçersiz dosya formatı!');
                }
            } catch (err) {
                alert('Dosya okunamadı!');
            }
        };
        reader.readAsText(file);
    }
}


// --- DATA MANAGER (Stats & History) ---
class DataManager {
    constructor() {
        this.DB_KEY = 'lol_sim_db_v1';
        this.data = this.loadData();
        this.cleanupSample();
    }

    cleanupSample() {
        // Find the specific sample match
        const initialCount = this.data.matches.length;
        this.data.matches = this.data.matches.filter(m => !(m.mode === 'custom' && m.blueTeam.some(p => p.name === 'FF Shinji' && p.championId === 'Mel')));

        if (this.data.matches.length < initialCount) {
            console.log('Sample match removed. Rebuilding stats...');
            this.rebuildStats();
            this.saveData();
        }
    }

    rebuildStats() {
        // Reset players logic
        this.data.players = [];
        this.data.matches.forEach(m => {
            const process = (team, won) => {
                team.forEach(p => {
                    this.updatePlayerStats(
                        p.name,
                        p.championId,
                        won,
                        parseInt(p.k) || 0,
                        parseInt(p.d) || 0,
                        parseInt(p.a) || 0,
                        m.id
                    );
                });
            };
            process(m.blueTeam, m.winner === 'blue');
            process(m.redTeam, m.winner === 'red');
        });
    }

    loadData() {
        const stored = localStorage.getItem(this.DB_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return {
            players: [], // { id, name, stats: { matches, wins, losses, kills, deaths, assists, championStats: {} }, history: [] }
            matches: []  // { id, date, mode, winner, blueTeam: [], redTeam: [], duration }
        };
    }

    saveData() {
        localStorage.setItem(this.DB_KEY, JSON.stringify(this.data));
    }

    // --- PLAYERS ---
    getPlayer(name) {
        return this.data.players.find(p => p.name.toLowerCase() === name.toLowerCase());
    }

    createPlayer(name) {
        if (!name || name.trim() === '') return null;
        if (this.getPlayer(name)) return this.getPlayer(name);

        const newPlayer = {
            id: 'p_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            name: name,
            stats: {
                matches: 0, wins: 0, losses: 0,
                kills: 0, deaths: 0, assists: 0,
                championStats: {}, // { champId: { matches, wins, k, d, a } }
                roleStats: {} // { role: { matches, wins } }
            },
            history: []
        };
        this.data.players.push(newPlayer);
        this.saveData();
        return newPlayer;
    }

    updatePlayerStats(playerName, championId, isWin, k, d, a, matchId, role = 'FILL') {
        let player = this.getPlayer(playerName);
        if (!player) player = this.createPlayer(playerName);
        if (!player) return; // Name was empty

        // General Stats
        player.stats.matches++;
        if (isWin) player.stats.wins++; else player.stats.losses++;
        player.stats.kills += k;
        player.stats.deaths += d;
        player.stats.assists += a;

        // Champion Stats
        if (championId) {
            if (!player.stats.championStats[championId]) {
                player.stats.championStats[championId] = { matches: 0, wins: 0, kills: 0, deaths: 0, assists: 0 };
            }
            const cs = player.stats.championStats[championId];
            cs.matches++;
            if (isWin) cs.wins++;
            cs.kills += k;
            cs.deaths += d;
            cs.assists += a;
        }

        // Role Stats
        if (role) {
            if (!player.stats.roleStats) player.stats.roleStats = {};
            if (!player.stats.roleStats[role]) player.stats.roleStats[role] = { matches: 0, wins: 0 };
            player.stats.roleStats[role].matches++;
            if (isWin) player.stats.roleStats[role].wins++;
        }

        // History
        if (!player.history.includes(matchId)) {
            player.history.push(matchId);
        }

        this.saveData();
    }

    // --- MATCHES ---
    saveMatch(matchData) {
        // matchData: { mode, gameIndex, winner, blueTeam: [{name, role, championId, k,d,a}], redTeam: [...] }
        const matchId = 'm_' + Date.now();
        const newMatch = {
            id: matchId,
            date: new Date().toISOString(),
            ...matchData
        };

        this.data.matches.push(newMatch);

        // Update Players
        const processTeam = (teamData, isWin) => {
            teamData.forEach(p => {
                if (p.name && p.name.trim() !== '') {
                    this.updatePlayerStats(
                        p.name,
                        p.championId,
                        isWin,
                        parseInt(p.k) || 0,
                        parseInt(p.d) || 0,
                        parseInt(p.a) || 0,
                        matchId,
                        p.role || 'FILL'
                    );
                }
            });
        };

        processTeam(matchData.blueTeam, matchData.winner === 'blue');
        processTeam(matchData.redTeam, matchData.winner === 'red');

        this.saveData();
        return newMatch;
    }

    // --- ANALYTICS ---
    getLeaderboard(sortBy = 'wr') {
        const minMatches = 1;
        return this.data.players.filter(p => p.stats.matches >= minMatches).sort((a, b) => {
            const wrA = (a.stats.wins / a.stats.matches) || 0;
            const wrB = (b.stats.wins / b.stats.matches) || 0;

            if (sortBy === 'wr') {
                if (wrB !== wrA) return wrB - wrA;
                return b.stats.matches - a.stats.matches; // Break ties with matches
            }
            if (sortBy === 'kda') {
                const kdaA = (a.stats.kills + a.stats.assists) / Math.max(1, a.stats.deaths);
                const kdaB = (b.stats.kills + b.stats.assists) / Math.max(1, b.stats.deaths);
                return kdaB - kdaA;
            }
            return 0;
        });
    }

    getDashboardStats() {
        const sorted = this.getLeaderboard('wr');
        if (sorted.length === 0) return null;

        const bestWr = sorted[0];
        // For worst WR, we want someone with at least a few matches to avoid "1 game 1 loss" appearing as worst over "10 games 1 win" maybe? 
        // Or just raw worst WR.
        const worstWr = [...sorted].sort((a, b) => (a.stats.wins / a.stats.matches) - (b.stats.wins / b.stats.matches))[0];

        const sortedKda = this.getLeaderboard('kda');
        const bestKda = sortedKda[0];
        const worstKda = [...sortedKda].reverse()[0];

        return {
            bestWr,
            worstWr,
            bestKda,
            worstKda,
            recentMatches: this.data.matches.slice(-3).reverse() // Last 3 matches
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.viewManager = new ViewManager();
    window.dataManager = new DataManager();
    window.statsController = new StatsController();
    new DraftSetupManager(window.viewManager);
});
