
const CONFIG = {
  name: "prema",
  minDelay: 1200,
  maxDelay: 2500,
  cooldown: 2000
};

const lastReplies = new Map();
const userCooldown = new Map();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Banglish normalization
const aliases = {
  valo: "bhalo", vlo: "bhalo", vhalo: "bhalo",
  valobasi: "valobashi", bhalobasi: "valobashi",
  balobashi: "valobashi", valobasiii: "valobashi",
  tmk: "tomake", tmke: "tomake", tomk: "tomake",
  tmr: "tomar", tor: "tomar",
  amr: "amar", aamr: "amar",
  kmn: "kemon", kn: "keno", kno: "keno",
  aso: "acho", aci: "achi", asi: "achi",
  korso: "korcho", korteso: "korcho",
  ki: "ki", k: "ki", u: "you",
  plz: "please", pls: "please",
  nai: "nei", naiigo: "nei",
  jan: "jaan", jaanu: "jaan"
};

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map(word => {
      word = word.replace(/(.)\1{2,}/g, "$1$1");
      return aliases[word] || word;
    })
    .join(" ");
}

function levenshtein(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;

    for (let j = 1; j <= b.length; j++) {
      const old = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      prev = old;
    }
  }

  return row[b.length];
}

function wordsMatch(a, b) {
  if (a === b) return true;
  if (a.length < 4 || b.length < 4) return false;

  return levenshtein(a, b) <=
    (Math.max(a.length, b.length) >= 9 ? 2 : 1);
}

// GREETING KEYWORDS
const keywords = {
  greeting: [
    "hi", "hello", "hey", "hii", "heyy",
    "hiii", "helloo", "heyyy", "hiiii",
    "assalamu alaikum", "salam", "salaam",
    "assalamualaikum", "walaikum assalam",
    "good morning", "good afternoon",
    "good evening", "good night",
    "ki obostha", "kemon acho", "kmn acho",
    "ki khobor", "ki cholche", "ki chole",
    "ki koro", "ki korteso", "ki korcho",
    "ki re", "oi", "oee", "oii", "ohe",
    "shuno", "shuncho", "achho", "acho",
    "online acho", "aso naki", "kothay acho",
    "kemon aso", "kmn aso", "valo acho",
    "bhalo acho", "sob thik", "shob thik",
    "how are you", "how r u", "whats up",
    "what's up", "sup", "wassup",
    "hello prema", "hi prema", "hey prema",
    "prema koi", "prema aso", "prema acho",
    "prema shuno", "prema kemon acho",
    "prema ki koro", "prema online",
    "ki khobor tomar", "kemon acho tumi",
    "onek din por", "ki obostha tomar",
    "ki news", "notun ki", "ki cholche aj",
    "aj kemon acho", "aaj kemon acho",
    "shuvo shokal", "shuvo ratri",
    "shuvo sondha", "good day",
    "morning", "evening", "night",
    "hallo", "helo", "hlo", "hiii prema",
    "hello jaan", "hi jaan", "hey jaan",
    "oi prema", "o prema", "are prema",
    "ki re prema", "shuncho prema",
    "ekbar shuno", "ektu shuno",
    "acho ekhane", "ekhane acho",
    "keu acho", "keu aso",
    "kemon katche", "din kemon jacche",
    "ajker khobor ki", "tomar ki khobor",
    "ki obostha baby", "hello baby",
    "hi baby", "hey baby",
    "hello babu", "hi babu",
    "hello sona", "hi sona",
    "hello pakhi", "hi pakhi",
    "hello shona", "hi shona",
    "oi jaan", "oi babu", "oi sona",
    "oi pakhi", "ki go", "ki holo",
    "kothay tumi", "aso kotha boli",
    "golpo korba", "kotha bolba",
    "ektu kotha bolo", "reply dao",
    "amar sathe kotha bolo",
    "amake shuncho", "shunte paccho",
    "prema reply dao", "prema kotha bolo",
    "prema kothay", "prema ki ghumaccho",
    "ghum theke uthso", "uthecho naki",
    "jagcho naki", "ghumao nai",
    "busy naki", "free acho",
    "time ache", "ektu somoy hobe",
    "ki re bondhu", "hello friend",
    "hi friend", "hey friend",
    "hello dear", "hi dear",
    "hey dear", "hello sweetheart",
    "hi sweetheart", "hey sweetheart",
    "hello cutie", "hi cutie",
    "hey cutie", "ki khobor jaan",
    "kemon acho jaan", "kemon acho babu",
    "ki obostha sona", "ki khobor pakhi",
    "prema shona", "prema babu",
    "prema jaan", "prema baby",
    "prema cutie", "prema dear",
    "ki obostha re", "ki khobor re",
    "kmn cholche", "kemon cholche",
    "shob valo", "shob bhalo",
    "sobai kemon", "tumi kemon",
    "ajke ki khobor", "aaj ki khobor",
    "onek khon por", "onek shomoy por",
    "abar elam", "fire elam",
    "ami aschi", "ami esechi",
    "ke acho", "ke online",
    "prema online acho", "prema aso naki",
    "hello everyone", "hi everyone",
    "hey everyone", "good morning prema",
    "good night prema", "good evening prema",
    "salam prema", "assalamu alaikum prema",
    "walaikum salam", "nomoskar",
    "hello there", "hey there",
    "hiii jaan", "heyyy babu",
    "oiii", "oiee", "heyyooo",
    "hiiiiii", "helloooo",
    "premaaaa", "prremaa",
    "ki re ki obostha", "ki khobor bolo",
    "ektu dekha dao", "shara dao",
    "shara diccho na keno", "kotha shuno",
    "amar dike takao", "ekhane aso",
    "come here", "are you there",
    "are u there", "u there",
    "hello are you there", "anyone there"
  ]
};

// GREETING REPLIES
const replies = {
  greeting: [
    "Heyyy! 🥰 Ki obostha tomar?",
    "Hello jaan! Eto din por mone porlo? 😒❤️",
    "Hii! Bolo, tomar kotha shonar jonno ready achi! 💗",
    "Assalamu alaikum! Kemon acho? 🌸",
    "Oiii! Amar priyo manush eshe geche! 😍",
    "Hey baby! Ajke eto deri kore ele keno? 🥺",
    "Hello cutie! Ki khobor bolo? 💕",
    "Awww! Amar sathe golpo korte eshecho? 🥰",
    "Oi jaan! Tomakei khujchilam! ❤️",
    "Hiiii! Ajke tomar mood kemon? 😊",
    "Arey! Amar favorite notification! 💌",
    "Ki re! Eto din por dekha? 😏",
    "Oho! Ke esheche dekho! 😍",
    "Hello babu! Kemon acho shona? 💗",
    "Hehe! Tomar message peye valo laglo! 😚",
    "Ami ekhanei achi! Bolo ki hoyeche? 🫶",
    "Oii pakhi! Ki korcho ekhon? 🐦",
    "Welcome back! Tomake miss korchilam! 🥺",
    "Hey sweetheart! Ajke golpo hobe? 💞",
    "Aha! Amar din ta valo hoye gelo! 🌹",
    "Hello dear! Shob thikthak to? 😊",
    "Ki khobor jaan? Mon valo ache? ❤️",
    "Oiii! Amar dike ektu monojog dao! 😂",
    "Bolo bolo! Ami mon diye shunchi! 👂",
    "Eto misti kore dakle lojja lage! 🙈",
    "Hii jaanu! Ajke ki plan? 😘",
    "Arey baba! Amar Prema fan esheche! 😎",
    "Tomar jonnoi ekhane bose achi! 💕",
    "Oho! Ajke dekhi besh energetic! ⚡",
    "Abar shuru hok amader adda! 🥳",
    "Hello sunshine! Din kemon jacche? ☀️",
    "Ki go! Amake bhule jaoni to? 🥺",
    "Ami achi, tumi bolo! 💗",
    "Heeey! Ektu hashi dao dekhi! 😁",
    "Tomar sathe kotha bolar mood e achi! 🥰",
    "Oii! Eto cute kore dakcho keno? 🙈",
    "Aajke ki amar sathe golpo korbe? 💌",
    "Shuvo shokal! Din ta sundor katuk! 🌞",
    "Shuvo ratri! Ghumonor age golpo? 🌙",
    "Walaikum assalam! Kemon acho? 🌸",
    "Ki obostha boss? Ajke ki khobor? 😎",
    "Oho! Amar inbox e chand utheche! 🌙",
    "Ami ready, tumi shuru koro! 🎀",
    "Hello jaan pakhi! Kemon acho bolo? 💖",
    "Tomar message dekhe hashi chole ashlo! 😍",
    "Esho, ajke onek golpo hobe! 🥰",
    "Areh! Amar priyo dustu manush! 😜",
    "Ki re bondhu! Shob bhalo to? 🤗",
    "Besh to! Ebar bolo, ki cholche? 💬",
    "Tomar jonno ekta virtual hug! 🤗"
  ]
};

keywords.love = [
  "valobashi", "bhalobashi", "balobashi", "valobasi",
  "bhalobasi", "i love you", "love you", "love u",
  "luv u", "luv you", "love you prema", "prema love you",
  "tomake valobashi", "tmk valobashi", "ami tomake valobashi",
  "ami tomay valobashi", "ami tomake bhalobashi",
  "onek valobashi", "khub valobashi", "onek beshi valobashi",
  "mon theke valobashi", "sotti valobashi", "pagoler moto valobashi",
  "shobcheye beshi valobashi", "tomakei valobashi",
  "sudhu tomake valobashi", "toke valobashi",
  "ami tomay chai", "tomake chai", "tmk chai",
  "amar tomake chai", "tomake amar chai",
  "tumi amar", "tumi sudhu amar", "amar hoye jao",
  "amar hoba", "amar hobe", "amar hoye thako",
  "tomake chara parina", "tomake chara bachi na",
  "tomake chara valo lage na", "tomake chara kichu bhalo lage na",
  "tumi amar sob", "tumi amar shob", "tumi amar duniya",
  "tumi amar prithibi", "tumi amar jan", "tumi amar jaan",
  "tumi amar kolija", "tumi amar mon",
  "tomar jonno mon kade", "tomar jonno pagol",
  "tomar preme porechi", "tomar preme pore gelam",
  "ami tomar preme", "tomake niye shopno dekhi",
  "tomake niye vabhi", "tomake niye bhabi",
  "tomake niye amar shopno", "tomake chai jibone",
  "tomar sathe thakte chai", "tomar pashe thakte chai",
  "tomar sathe sara jibon", "sara jibon tomake chai",
  "jiboner shesh porjonto", "sara jibon valobashbo",
  "chirodin valobashbo", "kokhono charbo na",
  "kokhono bhulbo na", "tomake bhulbo na",
  "tumi amar ekmatro", "tumi amar special",
  "you are special", "you are mine", "you are my love",
  "my love", "my jaan", "my baby", "my sweetheart",
  "my princess", "my queen", "my everything",
  "my world", "my life", "my happiness",
  "you mean everything", "you mean a lot",
  "i need you", "i want you", "i adore you",
  "i really love you", "i truly love you",
  "i love u so much", "love u so much",
  "love you forever", "forever yours",
  "always love you", "only you", "just you",
  "you are my everything", "you are my happiness",
  "you are my sunshine", "you are my angel",
  "you are my dream", "you are my heart",
  "amar mon tomar", "mon ta tomar", "amar hridoy tomar",
  "amar hridoy e tumi", "moner manush tumi",
  "tumi moner manush", "tumi amar priyo",
  "amar priyo manush", "amar shopner manush",
  "tomar jonno shob korte pari", "tomar jonno shob",
  "tomar jonno ami achi", "tomar jonno beche achi",
  "tomake peye dhonno", "tomake peye khushi",
  "tomake peye ami khushi", "tumi amar vaggo",
  "tumi amar bhaggo", "tumi amar vagyer lekha",
  "tumi amar jiboner ongsho", "tumi amar jiboner karon",
  "tomar hashi amar valo lage", "tomar chokh valo lage",
  "tomar kotha valo lage", "tomar voice valo lage",
  "tomar sathe valo lage", "tomar sathe shanti pai",
  "tomar kache shanti pai", "tomake dekhe valo lage",
  "tomake dekhte chai", "tomar sathe dekha chai",
  "tomar sathe kotha bolte chai", "tomar sathe golpo korte chai",
  "tomar sathe shopno dekhte chai", "tomar sathe poth cholte chai",
  "tomake niye ghor badhbo", "tomake biye korte chai",
  "tumi ki amake valobasho", "amake valobasho",
  "amake ki valobasho", "tumi amake bhalobasho",
  "tumi ki amay bhalobasho", "amar proti valobasha ache",
  "amar jonno feelings ache", "amar jonno mon kade",
  "amar kotha vabo", "amar kotha bhabo",
  "amar jonno pagol", "amar jonno special",
  "ami ki tomar priyo", "ami ki tomar special",
  "ami ki tomar sob", "ami ki tomar jaan",
  "amake ki chai", "amake tomar chai",
  "amake chara thakte parba", "amake chara parbe",
  "tumi ki amar hoba", "amar sathe thakba",
  "amar sathe sara jibon thakba", "promise valobashba",
  "promise koro valobashba", "valobasha ki",
  "prem ki", "love mane ki", "true love",
  "real love", "pure love", "unconditional love",
  "endless love", "eternal love", "forever love",
  "one sided love", "deep love", "first love",
  "amar first love", "tumi amar first love",
  "tomake niye pagol ami", "tomar jonno pagol ami",
  "tomar jonno mon pore ache", "tomar jonno opekkha",
  "tomar opekkhay achi", "tomar jonno mon udash",
  "tomar jonno amar feelings", "feelings ache tomar jonno",
  "ami tomakei chai", "sudhu tomakei chai",
  "tomar moto keu nei", "tomar moto ar keu na",
  "tumi onek special", "tumi khub special",
  "tumi amar favorite", "my favorite person",
  "favorite human", "amar favorite manush",
  "tomar upor crush", "tomar upor valobasha",
  "tomake pochondo kori", "tomay pochondo kori",
  "tomake bhalolage", "tomake valo lage",
  "tomay valo lage", "tmk vlo lage",
  "tmk bhalo lage", "tomar jonno mon pore",
  "tomar jonno mon mane na", "tomake chai amar jibone",
  "tumi thaklei hobe", "tumi pashe thaklei hobe",
  "tomar ekta hashi chai", "tomar ekta message chai",
  "tomar ekta call chai", "tomar sathe sara din",
  "tomar sathe protidin", "tomake niye protidin",
  "ami tomar hoye gechi", "mon tomar hoye geche",
  "tomar majhe hariye jai", "tomar chokhe hariye jai",
  "tomar majhe nijeke pai", "tomake niyei amar prithibi",
  "tomar jonno amar sobkichu", "valobashi jaan",
  "valobashi babu", "valobashi sona",
  "valobashi pakhi", "valobashi prema",
  "prema tomake valobashi", "prema i love you",
  "prema love u", "prema amar jaan",
  "prema amar sob", "prema tumi amar",
  "tumi amar valobasha", "tumi amar bhalobasha",
  "amar valobashar manush", "amar bhalobashar manush",
  "amar moner rani", "amar moner raja",
  "amar rajkonna", "amar rajkumar",
  "tomake niyei bachbo", "tomake niyei thakbo",
  "tomar sathei thakbo", "tomar sathei jibon",
  "tumi amar shesh valobasha", "tumi amar sesh valobasha",
  "last love", "my last love", "forever mine",
  "always mine", "amar chirodiner", "chirodiner sathi"
];

keywords.miss = [
  "miss you", "miss u", "miss kori", "miss kortesi",
  "miss kortesi tomake", "tomake miss kori", "tmk miss kori",
  "tomay miss kori", "toke miss kori", "onek miss kori",
  "khub miss kori", "onek beshi miss kori",
  "i miss you", "i miss u", "missing you",
  "missing u", "miss you so much", "miss u so much",
  "really miss you", "i am missing you",
  "miss korchi", "miss kortesi", "miss kortesi re",
  "tomake khub miss kori", "tomake onek miss kori",
  "tomake chara miss kori", "tomar obhab feel kori",
  "tomar obhab lage", "tomar kotha mone pore",
  "tomake mone pore", "tomay mone pore",
  "toke mone pore", "onek mone pore",
  "khub mone pore", "bar bar mone pore",
  "shob shomoy mone pore", "sarakhon mone pore",
  "din rat mone pore", "raat e mone pore",
  "ghumate gele mone pore", "ghum theke uthe mone pore",
  "tomar kotha vabi", "tomar kotha bhabi",
  "tomar kotha mone pore jaan", "tomar jonno mon kade",
  "tomar jonno mon kharap", "tomake chara valo lage na",
  "tomake chara bhalo lage na", "tomake chara eka lage",
  "tomake chara faka lage", "tomake chara shunno lage",
  "tomar sathe kotha bolte iccha kore",
  "tomar sathe kotha bolte mon chay",
  "tomar sathe kotha na hole valo lage na",
  "tomar message er opekkhay", "tomar call er opekkhay",
  "tomar reply er opekkhay", "tomar message chai",
  "tomar call chai", "tomar voice shunte iccha kore",
  "tomar voice miss kori", "tomar hashi miss kori",
  "tomar chokh miss kori", "tomar ador miss kori",
  "tomar care miss kori", "tomar sathe adda miss kori",
  "tomar sathe golpo miss kori", "tomar sathe shomoy miss kori",
  "tomar pashe thaka miss kori", "tomar presence miss kori",
  "i miss your voice", "i miss your smile",
  "i miss your hug", "i miss your kiss",
  "i miss talking to you", "i miss being with you",
  "i miss our talks", "i miss our moments",
  "i miss our memories", "i miss your messages",
  "i miss your calls", "i miss your care",
  "i miss your love", "i miss you jaan",
  "i miss you baby", "i miss you babu",
  "i miss you sona", "i miss you prema",
  "wish you were here", "come back soon",
  "wish i could see you", "want to see you",
  "tomake dekhte iccha kore", "tomake dekhte mon chay",
  "tomar sathe dekha korte chai", "kobe dekha hobe",
  "tomake kobe dekhbo", "tomar opekkhay achi",
  "tomar jonno opekkha kori", "tomar ashar opekkhay",
  "tumi kothay", "kothay tumi", "onek dure acho",
  "dure thako bole miss kori", "long distance miss",
  "distance e achi", "dure theke miss kori",
  "tomar sathe thakte iccha kore", "tomar kache jete chai",
  "tomar kache aste chai", "tomake joriye dhorte chai",
  "ekta hug chai", "tomar hug miss kori",
  "tomar kole matha rakhte chai", "tomar sathe boshe thakte chai",
  "tomar sathe hat dhore cholte chai", "tomar sathe ghurte chai",
  "tomar sathe shomoy katate chai", "tomar sathe rat jagte chai",
  "tomar sathe kotha bole ghumate chai",
  "tomar sathe shokal dekhte chai", "tomar sathe brishti dekhte chai",
  "tomar sathe chad dekhte chai", "tomar sathe akash dekhte chai",
  "tomar sathe coffee khete chai", "tomar sathe cha khete chai",
  "tomar sathe cinema dekhte chai", "tomar sathe ghurte chai",
  "tomar sathe thakle valo lage", "tomar sathe thakle shanti",
  "tomake chara din katena", "tomake chara rat katena",
  "tomake chara shomoy katena", "tomake chara mon bose na",
  "tomake chara kichu bhalo lage na",
  "tomake chara shob faka", "tomake chara eka eka lage",
  "tomake chara boring lage", "tomake chara valo nei",
  "tomar obhabe achi", "tomar jonno udash",
  "tomar jonno pagol hoye achi", "tomake khujchi",
  "tomar khobor chai", "tomar sathe kotha chai",
  "tomar ekta message pele valo lage",
  "tomar ekta call pele valo lage",
  "tomar reply na pele mon kharap",
  "reply dao tomake miss kori", "online aso tomake miss kori",
  "prema tomake miss kori", "prema miss you",
  "prema miss u", "prema kothay tumi",
  "prema tomake mone pore", "prema tomar obhab lage",
  "prema tomar jonno mon kade", "prema kobe ashba",
  "prema fire asho", "prema dekha dao",
  "prema ekbar kotha bolo", "prema tomar sathe dekha chai",
  "prema tomake dekhte chai", "prema tomay miss kori",
  "prema ke miss kori", "prema amar mone pore",
  "prema amar kache asho", "prema amar sathe thako",
  "tumi na thakle mon kharap", "tumi dure gele miss kori",
  "tumi chole gele mone pore", "tumi offline gele miss kori",
  "tumi online na thakle kharap lage",
  "tomar sathe kotha na bole thakte pari na",
  "tomar sathe kotha bolar jonno mon chay",
  "tomar jonno opekkha korte valo lage",
  "tomar jonno din guni", "tomar jonno rat jagi",
  "tomar jonno chokh opekkhay", "tomar jonno mon pore ache",
  "tomar jonno buk kade", "tomar jonno chokh khuje",
  "tomar chobi dekhe miss kori", "tomar photo dekhe mone pore",
  "tomar status dekhe mone pore", "tomar profile dekhi",
  "tomar old message pori", "purono kotha mone pore",
  "amader purono din miss kori", "amader memory miss kori",
  "amader adda miss kori", "amader golpo miss kori",
  "amader dekha miss kori", "amader moment miss kori",
  "amader shomoy miss kori", "tomar sathe katano shomoy",
  "tomar sathe thaka din gulo", "tomar sathe abar dekha chai",
  "abar tomar sathe kotha chai", "abar tomake dekhte chai",
  "abar tomar kache aste chai", "abar ekta hug chai",
  "abar ager moto golpo chai", "abar ager moto thako",
  "come online", "online e asho", "ekbar online aso",
  "ektu dekha dao", "ekbar reply dao", "kotha bolo na",
  "amake miss koro", "tumi ki amake miss koro",
  "amake mone pore", "amar kotha mone pore",
  "amar obhab lage", "amar jonno mon kade",
  "amar sathe dekha chai", "amar voice miss koro",
  "amar message miss koro", "amar hashi miss koro"
];

replies.love = [
  "Awww! Eto valobasha kothay rakhi bolo? 🥺❤️",
  "Ami ki tahole tomar special person? 🙈💕",
  "Hehe! Amar mukhe hasi chole ashlo! 😚💗",
  "Ekbar na, arekbar bolo! Shunte valo lage! 🥰",
  "Ufff! Amar heart ta emotional hoye gelo! 💓",
  "Eto misti kotha bolle ami lojja pabo! 🙈🌹",
  "Tumi amar kacheo onek special! ❤️",
  "Awww jaan! Ektu joriye dhorte iccha korche! 🤗💕",
  "Tomar ei valobasha ta khub cute! 🥺💖",
  "Ami tomar kotha shune blush korchi! 😳🌸",
  "Eto bhalobasha pele mon ta khushi hoye jay! 🥰",
  "Tomar moto kore keu bole na! 💗",
  "Ami ki tomar moner ekta choto jayga peyechi? 🙈❤️",
  "Eto ador korle kintu obbhash hoye jabe! 😚",
  "Tomar valobashar kotha shunte amar bhalo lage! 💕",
  "Awww! Tumi ekdom mishti ekta manush! 🍯❤️",
  "Tomar jonno ekta virtual kiss! 😘",
  "Tomar kotha amar mood valo kore dilo! 🌷",
  "Tumi emon kore bolle ami ki ar chup thakte pari? 🥺",
  "Hehe! Ajke amar blush korar din! 🙈",
  "Tomar valobasha ta emni korei rekho! ❤️",
  "Ami tomar jonno ekta boro hug pathalam! 🤗",
  "Eto cute kotha bolle amar mon gole jay! 💞",
  "Tomar ei message ta save kore rakha uchit! 💌",
  "Awww! Amar priyo manush ta koto misti! 🥰",
  "Tumi amar sathe emon korei kotha bolo! 💗",
  "Ami kintu abar shunte chai! 😚",
  "Tomar valobasha pele din ta sundor hoy! ☀️",
  "Eto bhalobasha diye amake obak kore dile! 😍",
  "Tomar jonno amar virtual heart! 💝",
  "Ami lojja pacchi, ektu aste bolo! 🙈",
  "Tumi kintu amar smile er karon hoye gele! 😊❤️",
  "Bhalobasha thakuk, dustumi o thakuk! 😜💕",
  "Awww! Eita shune amar mon valo hoye gelo! 🌸",
  "Tomar kotha shune mone hocche cinema cholche! 🎬❤️",
  "Tumi emon kore bolle ami hariye jabo! 😳",
  "Eto ador! Amar ki luck! 🥹💗",
  "Tomar sathe golpo korte amar o valo lage! 💌",
  "Bhalobasha ta sundor, jokhon mon theke hoy! 🌹",
  "Ami tomar jonno ekta misti smile dilam! 😁❤️"
];

replies.miss = [
  "Amio tomake miss korchilam! 🥺❤️",
  "Tahole eto khon kothay chile? 😒💕",
  "Awww! Ektu age bolle na keno? 🥹",
  "Miss korle ekta message dite hoy, bujhle? 🙈",
  "Ami ekhanei achi, ar dure jeyo na! 🤗",
  "Tomar ei kotha shune mon ta norom hoye gelo! 💗",
  "Eto miss korcho? Tahole ekta hug nao! 🤗❤️",
  "Ami ki tomar mone ektu jayga kore niyechi? 🥺",
  "Abar dekha hole onek golpo hobe! 💌",
  "Tomar sathe kotha bolte amar o valo lage! 🥰",
  "Awww! Ekhon theke beshi beshi message dio! 😚",
  "Tomar opekkha ta shesh hok taratari! 🌸",
  "Ekta virtual hug pathalam tomar jonno! 🤗💕",
  "Amake miss korle kintu bolte hobe! 😌",
  "Ami ki ekhon tomar sathe golpo shuru korbo? 💗",
  "Eto miss korle amar lojja lage! 🙈",
  "Tomar mon kharap korbo na, ami achi! ❤️",
  "Abar ager moto golpo kori cholo! 🥰",
  "Tomar message pele amar o valo lage! 💌",
  "Awww! Ektu kache thakle bhalo hoto! 🥺",
  "Tomar jonno ekta misti kiss! 😘",
  "Eto miss korcho, tahole ekhon golpo koro! 😁",
  "Ami tomar kotha shunte ready! 👂💕",
  "Tomar ei miss kora ta khub cute! 🥹",
  "Abar dekha hole shob miss kora puron hobe! 🌹",
  "Tomar kotha mone porle message dio! 💖",
  "Ektu hasho, mon kharap kore theko na! 😊",
  "Ami ekhanei achi, cholo golpo kori! 🫶",
  "Tomar sathe abar adda dite chai! 😂❤️",
  "Miss korar bodole ekhon ekta smile dao! 😁",
  "Awww! Tomar jonno ekta warm hug! 🤗",
  "Tumi message dilei amar din valo hoy! ☀️",
  "Eto dure thakar ki dorkar, ekhanei golpo koro! 😜",
  "Tomar opekkhar golpo ta shunte chai! 💌",
  "Ami ki ekhon tomar mon valo korte pari? 🥺"
];

// ==========================================
// PART 3: ROMANTIC + FLIRTY
// 200+ Keywords & Replies Per Category
// ==========================================

function expandPremaList(bases, endings) {
  return [...new Set(
    bases.flatMap(base =>
      endings.map(end => `${base} ${end}`.trim())
    )
  )];
}

// ==========================================
// ROMANTIC KEYWORDS
// ==========================================

keywords.romantic = expandPremaList(
  [
    "tomake valobashi", "ami tomake chai", "tumi amar", "tumi amar jaan",
    "tumi amar kolija", "tumi amar sob", "tumi amar prithibi",
    "tumi amar shopno", "tumi amar chand", "tumi amar tara",
    "tomar chokh", "tomar hashi", "tomar mukh", "tomar kotha",
    "tomar maya", "tomar preme", "tomar jonno", "tomar sathe",
    "tomake niye", "tomar opekkhay", "amar mon", "amar hridoy",
    "moner manush", "priyo manush", "amar rajkonna", "amar rajkumar",
    "amar valobasha", "amar paglami", "amar sobkichu",
    "tomake chara", "tomar pashe", "tomar hate",
    "tomar buke", "tomar hasite", "tomar preme porechi",
    "tomake peye"
  ],
  [
    "onek valobashi", "khub valobashi", "sotti valobashi",
    "mon theke chai", "sarajibon chai", "kokhono harate chai na",
    "sob somoy chai", "shudhu tomake chai",
    "amar kache thako", "amar pashe theko"
  ]
);

// ==========================================
// FLIRTY KEYWORDS
// ==========================================

keywords.flirty = expandPremaList(
  [
    "ki cute", "onek cute", "eto cute", "ki sundor",
    "onek sundor", "eto sundor", "ki mishti", "onek mishti",
    "eto mishti", "ki hot", "onek hot", "ki sexy",
    "tomar smile", "tomar look", "tomar style",
    "tomar chokh", "tomar thot", "tomar voice",
    "crush kheyechi", "tomar upor crush", "ami single",
    "tumi single", "date e jabe", "amar sathe date",
    "kiss diba", "kiss chai", "ekta kiss", "hug diba",
    "ekta hug", "flirt koro", "amar sathe flirt",
    "amake impress", "amake propose", "prem korba",
    "biye korba", "amar bou", "amar jamai"
  ],
  [
    "bolo na", "ki jani", "sotti naki", "ekbar bolo",
    "amar sathe", "amar jonno", "ektu beshi",
    "kintu keno", "bolo to", "hobe naki"
  ]
);

// ==========================================
// ROMANTIC REPLIES
// ==========================================

replies.romantic = expandPremaList(
  [
    "Tomar kotha shunlei amar mon",
    "Tumi pashe thakle amar prithibi",
    "Tomar ekta hashi amar kache",
    "Tomar chokher dike takale",
    "Tomar sathe kotha bolle",
    "Tumi amar jiboner sei",
    "Tomake niye amar shopnogulo",
    "Tomar jonno amar mon",
    "Tumi amar kache ekdom",
    "Tomar moto manush",
    "Tomake chara amar din",
    "Tumi amar moner",
    "Tomar valobashay ami",
    "Tomar ekta message pele",
    "Tumi jokhon amake dako",
    "Tomar sathe protita muhurto",
    "Amar mon shudhu",
    "Tumi amar sobcheye",
    "Tomar mayay ami",
    "Tomar jonno amar valobasha",
    "Tumi thaklei amar",
    "Tomake dekhlei amar",
    "Tumi amar shopner",
    "Amar protita golpe",
    "Tomar kache amar"
  ],
  [
    "aro sundor hoye jay ❤️",
    "valobashay bhore jay 🥰",
    "notun kore beche othe 💗",
    "tomake khujte thake 😘",
    "shudhu tomar kotha bhabe 💞",
    "tomar kache fire jay 💋",
    "ekta alada shanti pay ❤️",
    "tomakei khuje beray 🥺",
    "tomar preme pore jay 💘",
    "shudhu tomar hoye thake 💝"
  ]
);

// ==========================================
// FLIRTY REPLIES
// ==========================================

replies.flirty = expandPremaList(
  [
    "Eto cute hole",
    "Tomar ei style dekhe",
    "Eibhabe takale",
    "Eto mishti kotha bolle",
    "Tumi ki amake",
    "Tomar smile ta",
    "Tomar chokh duto",
    "Ami kintu tomar",
    "Tomar sathe flirt korte",
    "Tumi eto sundor keno",
    "Amake evabe bolle",
    "Tomar ei attitude",
    "Ektu kache asho",
    "Ekta kiss dile",
    "Ekta hug pele",
    "Tumi amar dike",
    "Tomar voice shunle",
    "Tumi jokhon hasho",
    "Amar crush ta",
    "Tomar moto cute",
    "Ami kintu lojja",
    "Tomake dekhe amar",
    "Tumi ki jano",
    "Ektu beshi cute",
    "Amar mon ta"
  ],
  [
    "amar heart attack hoye jabe 😳",
    "ami abar crush kheye jabo 😘",
    "amar mon churi hoye jabe 💘",
    "ami lojja peye jabo 🙈",
    "tomake propose kore dibo 💍",
    "ami kintu pagol hoye jabo 🥰",
    "amar ar kichu bolar thakbe na 😍",
    "tomake aro beshi pochondo hobe 💗",
    "ami tomar fan hoye jabo 😜",
    "amar mon nachte thakbe 💋"
  ]
);

// ==========================================
// PART 4: EMOTIONAL + ANGRY + FUNNY
// ==========================================

// ==========================================
// EMOTIONAL KEYWORDS
// ==========================================

keywords.emotional = expandPremaList(
  [
    "amar mon kharap", "mon valo nei", "ami eka", "khub eka",
    "kosto hocche", "onek kosto", "ami kadchi", "kanna pacche",
    "chokhe pani", "keu bujhe na", "keu nei", "mon venge geche",
    "amake keu valobashe na", "ami obohelito", "ami klanto",
    "ar parchi na", "khub tired", "ami hariye gechi",
    "amake vule geche", "tumi bodle gecho", "ami bodle gechi",
    "amar vaggo kharap", "sobai chere jay", "ami eka hoye gechi",
    "amar kosto", "amar kanna", "ami oviman korechi",
    "khub miss kori", "moner kotha", "kew amar nei",
    "amake bujho", "ektu shono", "amar kharap lagche",
    "ami valo nei", "mon vengeche", "khub oviman"
  ],
  [
    "ajke", "onek", "khub beshi", "sotti",
    "saradin", "rate", "tomake niye", "amar jibone"
  ]
);

// ==========================================
// ANGRY KEYWORDS
// ==========================================

keywords.angry = expandPremaList(
  [
    "rag korchi", "amar rag hocche", "khub rag",
    "ragi hoye achi", "tomar upor rag", "rag korona",
    "chup thako", "amar sathe kotha bolo na",
    "ar kotha bolbo na", "jao ekhane theke",
    "tumi kharap", "onek jalai", "birakto lagche",
    "matha gorom", "mood off", "amake jalio na",
    "bujhte paro na", "ki je koro", "abar shuru",
    "tomar problem ki", "ekdom valo na", "ami rag korechi",
    "dure jao", "amake disturb koro na",
    "tomar sathe jhogra", "ami raji na",
    "ekdom chup", "ar valo lage na",
    "tumi pagol", "birokto korcho"
  ],
  [
    "ekhon", "khub", "sotti", "abar",
    "onek beshi", "amar sathe", "tomar jonno"
  ]
);

// ==========================================
// FUNNY KEYWORDS
// ==========================================

keywords.funny = expandPremaList(
  [
    "haha", "hahaha", "lol", "lmao", "moja",
    "moja korchi", "haschi", "hashi pacche",
    "tumi pagol", "ami pagol", "pagli", "pagla",
    "ki moja", "ki funny", "onek funny",
    "jokes bolo", "ekta joke", "hasao amake",
    "ghum pacche", "khida lagche", "alosh",
    "bhoot", "vut", "alien", "dinosaur",
    "ami boka", "tumi boka", "matha noshto",
    "amar buddhi nai", "ki ajob", "ki obostha",
    "biye korbo", "bou lagbe", "jamai lagbe",
    "prem korte chai", "single achi",
    "tumi robot", "robot naki", "pagoler moto",
    "moja laglo", "haste haste"
  ],
  [
    "naki", "bolo to", "ekhon", "sotti",
    "amar sathe", "ki korbo", "kemon"
  ]
);

// ==========================================
// EMOTIONAL REPLIES
// ==========================================

replies.emotional = expandPremaList(
  [
    "Mon kharap koro na",
    "Ami achi tomar pashe",
    "Tomar chokher jol",
    "Tumi eka na",
    "Ektu hasho na",
    "Tomar kosto hole",
    "Moner sob kotha",
    "Nijeke eto kosto",
    "Tumi onek special",
    "Tomar hashi ta",
    "Sob kharap somoy",
    "Ami chai tumi",
    "Kosto pele amake",
    "Oviman joma rekho na",
    "Tomar moner akashe",
    "Tumi nijeke kokhono",
    "Tomar jonno amar",
    "Ektu nijer kheyal",
    "Kanna pele kende nao",
    "Tumi abar notun kore"
  ],
  [
    "ami shunte chai 🥺❤️",
    "ami tomar kotha shunbo 💗",
    "ekdin thik valo hoye jabe 🌸",
    "ektu hashar chesta koro 🥰",
    "tumi onek mulloban 💝",
    "ami tomake support korbo 🤗",
    "nijeke eka vebo na ❤️",
    "tomar pashe thakbo 🫶",
    "tomar hashi dekhte chai 😊",
    "sob kichu thik hobe inshallah 🌷"
  ]
);

// ==========================================
// ANGRY REPLIES
// ==========================================

replies.angry = expandPremaList(
  [
    "Are baba rag koro na",
    "Eto rag tomar",
    "Achha baba sorry",
    "Tomar rag dekhe",
    "Ektu thanda hou",
    "Rag korle tomake",
    "Ami ar dustumi",
    "Ektu hasho na",
    "Tomar sathe jhogra",
    "Rag komle amake",
    "Bujhte perechi",
    "Amar dosh hole",
    "Eto cute mukhe",
    "Tumi rag korle",
    "Cholo rag bhule",
    "Ami kintu tomake",
    "Rag kore lav nei",
    "Tomar rag vanganor",
    "Achha ar bolbo na",
    "Ekta smile dao"
  ],
  [
    "ekta sorry nao 🥺",
    "amar voy lage 🙈",
    "ami chup hoye gelam 🤐",
    "ektu mishti kore bolo ❤️",
    "amar mon kharap hoy 😔",
    "tomake hasate chai 😘",
    "ekta chocolate debo 🍫",
    "ami kintu abar dustumi korbo 😜",
    "ektu ador chai 🥰",
    "rag ta amake diye dao 💗"
  ]
);

// ==========================================
// FUNNY REPLIES
// ==========================================

replies.funny = expandPremaList(
  [
    "Tomar kotha shune",
    "Amar brain ekhon",
    "Eita abar ki",
    "Haste haste amar",
    "Tumi ekta alada",
    "Tomar moto pagol",
    "Amar hashi thamche",
    "Ei kotha shune",
    "Ami to vabchilam",
    "Tomar logic dekhe",
    "Bujhlam na kintu",
    "Eita shune amar",
    "Tumi ki manush",
    "Amar matha ekhon",
    "Tomar comedy dekhe",
    "Ami hashi thamate",
    "Ei rokom kotha",
    "Tumi ekdom",
    "Amar obostha ekhon",
    "Pagol er dol e"
  ],
  [
    "wifi connection hariyeche 😂",
    "CPU gorom hoye geche 🤣",
    "ami hashi thamate parchi na 😭",
    "NASA ke janate hobe 🚀",
    "amar pet betha korche 🤣",
    "ekta award deya uchit 🏆",
    "internet o confused 😂",
    "amar brain hang hoyeche 🤯",
    "ami hasi hasi sesh 😆",
    "tomake comedy king banabo 👑"
  ]
);

// ==========================================
// PART 5: ATTITUDE + FOOD + DAILY + RELATIONSHIP
// ==========================================

// ==========================================
// ATTITUDE KEYWORDS
// ==========================================

keywords.attitude = expandPremaList(
  [
    "attitude dekhao", "amar attitude", "beshi attitude",
    "ami kauke voy pai na", "ami alada", "nijer moto",
    "amar life", "amar rules", "ami best", "ami special",
    "ke ki bollo", "manush ki bolbe", "patta dei na",
    "ignore kori", "amake ignore", "amar value",
    "self respect", "amar ego", "ego dekhao",
    "ami bodlai na", "amar style", "amar personality",
    "ami karo moto na", "amar choice", "amar decision",
    "nijeke chini", "ami perfect", "ami queen",
    "ami king", "boss ami", "amake challenge",
    "ami har manbo na", "ami strong",
    "amar confidence", "amake thamabe ke",
    "ami amar moto"
  ],
  [
    "ami emoni", "sob somoy", "sotti", "kintu",
    "dekho", "bujhle", "amar jibone"
  ]
);

// ==========================================
// FOOD KEYWORDS
// ==========================================

keywords.food = expandPremaList(
  [
    "khida lagche", "khida peyechhe", "ki khabo",
    "khabar dao", "bhat khabo", "biriyani khabo",
    "pizza khabo", "burger khabo", "fuchka khabo",
    "chotpoti khabo", "ice cream chai", "chocolate chai",
    "cake khabo", "mishti khabo", "cha khabo",
    "coffee khabo", "noodles khabo", "pasta khabo",
    "chicken khabo", "beef khabo", "mangsho khabo",
    "mach khabo", "dim khabo", "polao khabo",
    "kacchi khabo", "roll khabo", "sandwich khabo",
    "samosa khabo", "singara khabo", "jhalmuri khabo",
    "juice khabo", "pani khabo", "ranna korbo",
    "ranna paro", "ki ranna", "food lover"
  ],
  [
    "ekhon", "ajke", "onek", "khub",
    "amar jonno", "tomar sathe", "khete iccha"
  ]
);

// ==========================================
// DAILY KEYWORDS
// ==========================================

keywords.daily = expandPremaList(
  [
    "ki korcho", "ki koro", "ki obostha",
    "kemon acho", "kemon acho tumi", "valo acho",
    "kothay acho", "kothay chile", "ki khobor",
    "ki cholche", "ki hocche", "ghumaiso",
    "ghum theke uthcho", "ghum pacche", "ghumabo",
    "sokale ki korcho", "rate ki korcho",
    "dupure ki korcho", "bikel kemon",
    "ajke ki korba", "kal ki korba", "bari acho",
    "baire acho", "school e acho", "college e acho",
    "class korcho", "porashona korcho", "busy acho",
    "free acho", "online acho", "reply dao",
    "kotha bolo", "ektu aso", "ekhane aso",
    "ki niye busy", "din kemon gelo"
  ],
  [
    "bolo", "ekhon", "ajke", "sotti",
    "amake", "ektu", "to"
  ]
);

// ==========================================
// RELATIONSHIP KEYWORDS
// ==========================================

keywords.relationship = expandPremaList(
  [
    "relationship ache", "prem koro", "prem korba",
    "valobasha ki", "true love", "real love",
    "boyfriend ache", "girlfriend ache", "bf ache",
    "gf ache", "amar boyfriend", "amar girlfriend",
    "amader relation", "amader relationship",
    "breakup hoyeche", "breakup korbo", "patch up",
    "cheat koreche", "betray koreche", "biswas kori",
    "biswas nei", "loyal acho", "loyal thakba",
    "serious relation", "biye korte chai",
    "biye korba", "future plan", "amader future",
    "family manbe", "long distance", "distance relation",
    "ex er kotha", "ex ke vule jao", "proposal dibo",
    "propose korbo", "crush ache", "one sided love",
    "mon diyechi", "valobashi take"
  ],
  [
    "bolo", "ki mone hoy", "sotti",
    "amar sathe", "tomar ki mone hoy",
    "ekhon", "kemon"
  ]
);

// ==========================================
// ATTITUDE REPLIES
// ==========================================

replies.attitude = expandPremaList(
  [
    "Attitude thaka valo kintu",
    "Nijer value nijei",
    "Sobai ke khushi",
    "Tomar confidence",
    "Tumi nijer moto",
    "Queen er moto",
    "King er moto",
    "Nijer upor bishwas",
    "Tomar style",
    "Sobai tomar moto",
    "Ignore korar age",
    "Self respect ta",
    "Tomar personality",
    "Tumi jemon acho",
    "Nijer golper hero",
    "Tomar attitude",
    "Karo sathe nijeke",
    "Tomar confidence dekhe",
    "Life e nijer",
    "Tumi nijer"
  ],
  [
    "onek sundor 😎",
    "sobcheye important ❤️",
    "kokhono harabe na 👑",
    "tomake alada kore 💯",
    "sob somoy rekho 🔥",
    "aro attractive lage 😉",
    "nijeke valobasho 💗",
    "setai tomar power 💪",
    "tomar porichoy 🌟",
    "tomake special banay 🥰"
  ]
);

// ==========================================
// FOOD REPLIES
// ==========================================

replies.food = expandPremaList(
  [
    "Khida lagle age",
    "Biriyani hole",
    "Pizza er sathe",
    "Fuchka khete gele",
    "Chocolate pele",
    "Ice cream er kotha",
    "Khabar er nam shunlei",
    "Tomar sathe khawa",
    "Kacchi er gondho",
    "Burger dekhle",
    "Mishti khete",
    "Cha ar adda",
    "Coffee er cup",
    "Ranna korte gele",
    "Khabar share korle",
    "Jhalmuri pele",
    "Cake dekhlei",
    "Noodles er sathe",
    "Chicken roast hole",
    "Polao er sathe"
  ],
  [
    "amakeo dakbe kintu 🍕",
    "amar jonno rekho 😋",
    "amar vag ta chai 😂",
    "dujon mile khabo 🥰",
    "diet kal theke korbo 🤣",
    "mon ta khushi hoye jay 🍫",
    "amar khida bere jay 😭",
    "ekta treat chai 😜",
    "ami ready hoye achi 🍔",
    "share na korle rag korbo 😤"
  ]
);

// ==========================================
// DAILY REPLIES
// ==========================================

replies.daily = expandPremaList(
  [
    "Ami ekhanei achi",
    "Tomar message er",
    "Tomar sathe kotha",
    "Ajker din ta",
    "Ekhon tomar sathe",
    "Tomar khobor nite",
    "Tumi online ele",
    "Tomar message pele",
    "Ami tomar kotha",
    "Tomar sathe adda",
    "Ektu golpo korte",
    "Tomake reply dite",
    "Tomar din kemon",
    "Ajke ki ki",
    "Tumi free hole",
    "Amar din ta",
    "Ekhon ki korbo",
    "Tomar sathe somoy",
    "Tumi kemon acho",
    "Tomar opekkhay"
  ],
  [
    "boshe achi 😊",
    "opekkha korchilam 🥰",
    "khub valo lage ❤️",
    "aro sundor hoye jay 🌸",
    "tomar kotha vabchi 💗",
    "ekta adda jome jabe 😜",
    "tomar khobor chai 🫶",
    "somoy kete jay 💞",
    "tomakei khujchilam 😘",
    "mon ta valo hoye jay 🌷"
  ]
);

// ==========================================
// RELATIONSHIP REPLIES
// ==========================================

replies.relationship = expandPremaList(
  [
    "Relationship e sobcheye dorkar",
    "True love mane",
    "Bishwas chara relation",
    "Dujoner moddhe",
    "Valobasha sudhu",
    "Loyal thaka mane",
    "Ekjon arekjon ke",
    "Relation tikie rakhte",
    "Sotti valobashle",
    "Breakup er por",
    "Long distance hole",
    "Moner manush pele",
    "Future plan korte",
    "Ekta sundor relation",
    "Prem mane shudhu",
    "Jhograr poreo",
    "Ekjon arekjoner",
    "Valobashar manush ke",
    "Tomar sathe relation",
    "Somporker sobcheye"
  ],
  [
    "bishwas ar somman ❤️",
    "mon theke care kora 🥰",
    "dujoner chesta lage 💗",
    "sotti kotha bola 💞",
    "pashe thaka 🫶",
    "somoy deya dorkar 🌸",
    "ekjon arekjon ke bojha 💝",
    "oviman bhule jawa 😘",
    "loyal thaka uchit ❤️",
    "valobasha diye agle rakha 💍"
  ]
);

// ==========================================
// PART 6: THANKS + GOODBYE + QUESTION + GENERAL
// ==========================================

// ==========================================
// THANKS KEYWORDS
// ==========================================

keywords.thanks = expandPremaList(
  [
    "thank you", "thanks", "thank u", "tnx",
    "onek dhonnobad", "dhonnobad", "onek valo",
    "onek help korcho", "help korar jonno",
    "tomake thanks", "tomake dhonnobad",
    "valo laglo", "khub valo laglo", "so sweet",
    "onek sundor", "tumi best", "you are best",
    "love you", "onek care koro", "care korar jonno",
    "pashe thakar jonno", "support korar jonno",
    "bujhar jonno", "shonar jonno", "reply deyar jonno",
    "eto sundor kotha", "mon valo korar jonno",
    "hasanor jonno", "amake help", "onek khushi",
    "ami grateful", "tomar kache kritoggo"
  ],
  [
    "onek", "sotti", "ajke", "abar",
    "tomake", "amar jonno", "khub"
  ]
);

// ==========================================
// GOODBYE KEYWORDS
// ==========================================

keywords.goodbye = expandPremaList(
  [
    "bye", "goodbye", "allah hafez", "khoda hafez",
    "pore kotha hobe", "abar dekha hobe",
    "ekhon jai", "ami jai", "jacchi",
    "ghumate jai", "ghumabo", "good night",
    "night", "shuvo ratri", "shuvo sokal",
    "kal kotha hobe", "pore kotha bolbo",
    "ekhon busy", "kaj ache", "class ache",
    "ber hote hobe", "offline jacchi",
    "ar kotha na", "bye bye", "tata",
    "dekha hobe", "abar asbo", "chole gelam",
    "ghum asche", "rest nibo", "biday",
    "ekhon rakhi", "phone rakhi"
  ],
  [
    "ekhon", "ajke", "tomake", "pore",
    "abar", "rate", "kalke"
  ]
);

// ==========================================
// QUESTION KEYWORDS
// ==========================================

keywords.question = expandPremaList(
  [
    "tumi ke", "tomar nam ki", "ke tumi",
    "ki tomar porichoy", "kothay thako",
    "tomar boyosh koto", "ki koro",
    "keno emon", "keno bolo", "ki hoyeche",
    "ki bolle", "ki bolcho", "bujhlam na",
    "mane ki", "eta ki", "seta ki",
    "kivabe", "kothay", "kokhon",
    "kar sathe", "kake bolo", "ki chai",
    "ki pochondo", "ki valo lage", "ki opochondo",
    "amake cheno", "amake chino",
    "amar nam ki", "amar kotha mone ache",
    "sotti naki", "tai naki", "keno",
    "ki jonno", "ki vabcho", "ki mone hoy",
    "tomar ki mone hoy", "answer dao"
  ],
  [
    "bolo", "to", "ektu", "amake",
    "sotti", "ekhon", "ajke"
  ]
);

// ==========================================
// GENERAL KEYWORDS
// ==========================================

keywords.general = expandPremaList(
  [
    "prema", "prema koi", "oi prema", "hey",
    "hello", "hi", "hmm", "hmmm", "accha",
    "achha", "oho", "oh", "huh", "hahaha",
    "ki re", "ore", "shuno", "suncho",
    "bolo", "bol", "reply dao", "aso",
    "acho", "koi tumi", "ki obostha",
    "moja", "pagli", "pagla", "jaan",
    "baby", "babu", "kolija", "sona",
    "mishti", "dustu", "cute", "hmm bolo",
    "tarpor", "then", "ok", "okay",
    "hmm accha", "bujhchi", "bujhlam",
    "thik ache", "tai", "na", "ha",
    "yes", "no", "really", "wow"
  ],
  [
    "bolo", "shuno", "ki khobor", "kemon acho",
    "ki korcho", "ektu", "to", "ajke"
  ]
);

// ==========================================
// THANKS REPLIES
// ==========================================

replies.thanks = expandPremaList(
  [
    "Awww tomakeo",
    "Dhonnobad deyar kichu nei",
    "Tomar khushi te",
    "Tomar jonno sobsomoy",
    "Eto mishti kore",
    "Tomar kotha shune",
    "Ami khushi je",
    "Tomake help korte",
    "Tumi valo thaklei",
    "Tomar hashi ta"
  ],
  [
    "onek valo lage ❤️",
    "mon ta khushi hoy 🥰",
    "ami sobsomoy achi 🫶",
    "abar eso kotha bolte 💗",
    "tomar jonno roilo valobasha 💝",
    "amar din sundor hoye jay 🌸",
    "tomakeo onek dhonnobad 😘",
    "tumi amar kache special 💞",
    "khushi thako sobsomoy 😊",
    "aro kotha hobe kintu 😜"
  ]
);

// ==========================================
// GOODBYE REPLIES
// ==========================================

replies.goodbye = expandPremaList(
  [
    "Achha jao tahole",
    "Tomar din ta valo katuk",
    "Abar kotha hobe",
    "Nijer kheyal rekho",
    "Amake vule jeo na",
    "Taratarি fire esho",
    "Tomar opekkhay thakbo",
    "Valo kore ghumao",
    "Shopne dekha hobe",
    "Onek valobasha roilo"
  ],
  [
    "bye bye ❤️",
    "miss korbo kintu 🥺",
    "good night jaan 🌙",
    "allah hafez 🫶",
    "abar dekha hobe 😘",
    "shopne amake dekho 🙈",
    "nijer care nio 💗",
    "taratari fire eso 🥰",
    "bhalo theko sobsomoy 🌸",
    "onek ador roilo 💋"
  ]
);

// ==========================================
// QUESTION REPLIES
// ==========================================

replies.question = expandPremaList(
  [
    "Ami Prema",
    "Amar kotha jante chao",
    "Proshno ta besh sundor",
    "Eta niye amar mone hoy",
    "Tumi ki sotti jante chao",
    "Are baba eto proshno",
    "Ekta ekta kore bolo",
    "Tomar proshno shunte",
    "Ami jotota pari",
    "Besh interesting proshno"
  ],
  [
    "ektu details bolo 😊",
    "ami shunte ready 🥰",
    "ki jante chao bolo ❤️",
    "abar jiggesh korte paro 😜",
    "age tumi bolo 🙈",
    "bujhiye bolchi 💗",
    "proshno korte thako 😘",
    "ami achi ekhanei 🌸",
    "eta niye golpo hobe 💞",
    "tomar curiosity valo lage 🤭"
  ]
);

// ==========================================
// GENERAL REPLIES
// ==========================================

replies.general = expandPremaList(
  [
    "O achha",
    "Hmm bujhlam",
    "Tarpor bolo",
    "Sotti naki",
    "Bah besh",
    "Are tai naki",
    "Accha shuno",
    "Ki bolo",
    "Tomar kotha shunchi",
    "Ami ekhanei achi",
    "Ektu details bolo",
    "Besh moja to",
    "Oma tai naki",
    "Hmmm bolo na",
    "Aro bolo",
    "Tomar kotha valo lage",
    "Ami vabchi",
    "Eta kintu darun",
    "Bujhte parchi",
    "Abar bolo"
  ],
  [
    "tarpor ki holo? 😊",
    "aro shunte chai ❤️",
    "ki moja! 😂",
    "sotti bolcho? 👀",
    "ami shunchi 🥰",
    "ektu details dao 💗",
    "bah darun! 😍",
    "tomar kotha valo lage 🌸",
    "tarpor ki korle? 😜",
    "hmm cholte thako 💞"
  ]
);

// ==========================================
// PART 7: FINAL MATCHING ENGINE
// ==========================================

// ==========================================
// TEXT MATCHING
// ==========================================

function premaSimilarity(a, b) {
  if (!a || !b) return 0;

  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.95;

  const maxLength = Math.max(a.length, b.length);
  if (!maxLength) return 0;

  const distance = levenshtein(a, b);
  return 1 - distance / maxLength;
}

function premaFindCategory(input) {
  const text = normalizeText(input);

  if (!text) return "general";

  let bestCategory = "general";
  let bestScore = 0;

  for (const category of Object.keys(keywords)) {
    if (category === "general") continue;

    const list = keywords[category] || [];

    for (const keyword of list) {
      const key = normalizeText(keyword);
      if (!key) continue;

      let score = 0;

      // Exact phrase match
      if (text.includes(key)) {
        score = 1 + Math.min(key.length / 100, 0.3);
      } else {
        const textWords = text.split(/\s+/);
        const keyWords = key.split(/\s+/);

        let matched = 0;

        for (const kw of keyWords) {
          let highest = 0;

          for (const tw of textWords) {
            if (tw.length < 3 || kw.length < 3) {
              if (tw === kw) highest = 1;
              continue;
            }

            const similarity = premaSimilarity(tw, kw);
            if (similarity > highest) highest = similarity;
          }

          if (highest >= 0.78) matched += highest;
        }

        if (keyWords.length > 0) {
          score = (matched / keyWords.length) * 0.85;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestCategory = category;
      }
    }
  }

  // Avoid weak or accidental matches
  return bestScore >= 0.55 ? bestCategory : "general";
}

// ==========================================
// RANDOM REPLY SYSTEM
// ==========================================

function premaGetReply(category, threadID) {
  const list = replies[category] || replies.general;

  if (!list || list.length === 0) {
    return "Hmm, bolo na! Tomar kotha shunchi 😊";
  }

  const previous = lastReplies.get(threadID);

  let available = list.filter(reply => reply !== previous);

  if (available.length === 0) {
    available = list;
  }

  const selected = available[
    Math.floor(Math.random() * available.length)
  ];

  lastReplies.set(threadID, selected);

  return selected;
}

// ==========================================
// GROUP MENTION / REPLY DETECTION
// ==========================================

function premaIsCalled(event, botID, body) {
  const text = normalizeText(body);

  // Direct name call
  if (
    text.includes("prema") ||
    text.includes("প্রেমা")
  ) {
    return true;
  }

  // Bot mention
  const mentions = event.mentions || {};

  if (botID && Object.prototype.hasOwnProperty.call(mentions, botID)) {
    return true;
  }

  // Reply to bot's message
  if (
    event.messageReply &&
    event.messageReply.senderID &&
    String(event.messageReply.senderID) === String(botID)
  ) {
    return true;
  }

  return false;
}

// ==========================================
// MAIN BOT MODULE
// ==========================================

module.exports = {
  config: {
    name: "prema",
    version: "7.0.0",
    author: "Nahid Hasan",
    role: 0,
    shortDescription: "Automatic Banglish Romantic Chatbot",
    longDescription: "Prema understands Banglish and replies automatically.",
    category: "chat",
    guide: {
      en: "Prema automatically replies to conversations."
    }
  },

  onStart: async function () {
    return;
  },

  onChat: async function ({ event, message, api }) {
    try {
      if (!event || !event.body) return;

      const body = String(event.body).trim();

      if (!body) return;

      // Ignore bot's own messages
      const botID = String(await api.getCurrentUserID());
      const senderID = String(event.senderID || "");

      if (!senderID || senderID === botID) return;

      // Ignore commands
      if (/^[.!/#]/.test(body)) return;

      // Group detection
      const isGroup = event.isGroup === true;

      // In groups, reply only when Prema is called
      if (isGroup && !premaIsCalled(event, botID, body)) {
        return;
      }

      const threadID = String(event.threadID || "");
      if (!threadID) return;

      // Per-user cooldown
      const cooldownKey = `${threadID}_${senderID}`;
      const now = Date.now();

      const previousTime = userCooldown.get(cooldownKey) || 0;
      const cooldown = CONFIG.cooldown || 2000;

      if (now - previousTime < cooldown) return;

      userCooldown.set(cooldownKey, now);

      // Detect category
      const category = premaFindCategory(body);

      // Generate reply
      const reply = premaGetReply(category, threadID);

      // Random natural delay
      const minDelay = CONFIG.minDelay || 1500;
      const maxDelay = CONFIG.maxDelay || 3000;

      const delay = Math.floor(
        Math.random() * (maxDelay - minDelay + 1)
      ) + minDelay;

      await sleep(delay);

      // Send reply
      await message.reply(reply);

    } catch (error) {
      console.error("[PREMA ERROR]", error);
    }
  }
};

