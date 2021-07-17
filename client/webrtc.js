import { webgl_scene_init, webgl_add_video, webgl_animate, webgl_add_frame, webgl_add_tv, webgl_add_profile } from './webgl_video.js';
import { highlightGaze, shakeGazeSourcer, createGazeArrow, turnGazeSourcerToDst } from './gazeViz.js';
import { xg_add_photo3d, xg_scene_init, deleteProfile } from './xg_scene.js';

// const WS_PORT = 8443; //make sure this matches the port for the webscokets server
var WS_HOST = 'eye.3dvar.com';//"192.168.1.239";//'eye.3dvar.com';
// var WS_LOCAL_HOST = "192.168.1.240";
var connection_uids = {};
window.localUuid = "";
window.localDisplayName = "";
var localStream;
var eyePortMapping = { "eye.3dvar.com": 8443, "eye0.3dvar.com": 8444, "eye1.3dvar.com": 8445, "eye2.3dvar.com": 8446, "eye3.3dvar.com": 8447, "chat0.3dvar.com": 8600, "chat1.3dvar.com": 8601, "chat2.3dvar.com": 8602 };
window.serverConnection = null;
window.peerConnections = {}; // key is uuid, values are peer connection object and user defined display name string
window.remoteIDs = [];
window.remoteFrames = [];
window.remoteGazedFrames = [];
window.host = false;
window.remoteID4host = [];
var gazeCanvas;
var photo3dOptions = ["eyecontact", "thirdperson"];
var photo3dIndex = 0;
window.photo3d = photo3dOptions[photo3dIndex]; // thirdperson

// for host to save
window.audioData = [];
window.gazeData = [];
window.gazeCoord = [];

var peerConnectionConfig = {
  'iceServers': [
    { 'urls': 'stun:stun.stunprotocol.org:3478' },
    { 'urls': 'stun:stun.l.google.com:19302' },
  ]
};


function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateName() {
  var name1 = ["abandoned", "able", "absolute", "adorable", "adventurous", "academic", "acceptable", "acclaimed", "accomplished", "accurate", "aching", "acidic", "acrobatic", "active", "actual", "adept", "admirable", "admired", "adolescent", "adorable", "adored", "advanced", "afraid", "affectionate", "aged", "aggravating", "aggressive", "agile", "agitated", "agonizing", "agreeable", "ajar", "alarmed", "alarming", "alert", "alienated", "alive", "all", "altruistic", "amazing", "ambitious", "ample", "amused", "amusing", "anchored", "ancient", "angelic", "angry", "anguished", "animated", "annual", "another", "antique", "anxious", "any", "apprehensive", "appropriate", "apt", "arctic", "arid", "aromatic", "artistic", "ashamed", "assured", "astonishing", "athletic", "attached", "attentive", "attractive", "austere", "authentic", "authorized", "automatic", "avaricious", "average", "aware", "awesome", "awful", "awkward", "babyish", "bad", "back", "baggy", "bare", "barren", "basic", "beautiful", "belated", "beloved", "beneficial", "better", "best", "bewitched", "big", "big-hearted", "biodegradable", "bite-sized", "bitter", "black", "black-and-white", "bland", "blank", "blaring", "bleak", "blind", "blissful", "blond", "blue", "blushing", "bogus", "boiling", "bold", "bony", "boring", "bossy", "both", "bouncy", "bountiful", "bowed", "brave", "breakable", "brief", "bright", "brilliant", "brisk", "broken", "bronze", "brown", "bruised", "bubbly", "bulky", "bumpy", "buoyant", "burdensome", "burly", "bustling", "busy", "buttery", "buzzing", "calculating", "calm", "candid", "canine", "capital", "carefree", "careful", "careless", "caring", "cautious", "cavernous", "celebrated", "charming", "cheap", "cheerful", "cheery", "chief", "chilly", "chubby", "circular", "classic", "clean", "clear", "clear-cut", "clever", "close", "closed", "cloudy", "clueless", "clumsy", "cluttered", "coarse", "cold", "colorful", "colorless", "colossal", "comfortable", "common", "compassionate", "competent", "complete", "complex", "complicated", "composed", "concerned", "concrete", "confused", "conscious", "considerate", "constant", "content", "conventional", "cooked", "cool", "cooperative", "coordinated", "corny", "corrupt", "costly", "courageous", "courteous", "crafty", "crazy", "creamy", "creative", "creepy", "criminal", "crisp", "critical", "crooked", "crowded", "cruel", "crushing", "cuddly", "cultivated", "cultured", "cumbersome", "curly", "curvy", "cute", "cylindrical", "damaged", "damp", "dangerous", "dapper", "daring", "darling", "dark", "dazzling", "dead", "deadly", "deafening", "dear", "dearest", "decent", "decimal", "decisive", "deep", "defenseless", "defensive", "defiant", "deficient", "definite", "definitive", "delayed", "delectable", "delicious", "delightful", "delirious", "demanding", "dense", "dental", "dependable", "dependent", "descriptive", "deserted", "detailed", "determined", "devoted", "different", "difficult", "digital", "diligent", "dim", "dimpled", "dimwitted", "direct", "disastrous", "discrete", "disfigured", "disgusting", "disloyal", "dismal", "distant", "downright", "dreary", "dirty", "disguised", "dishonest", "dismal", "distant", "distinct", "distorted", "dizzy", "dopey", "doting", "double", "downright", "drab", "drafty", "dramatic", "dreary", "droopy", "dry", "dual", "dull", "dutiful", "each", "eager", "earnest", "early", "easy", "easy-going", "ecstatic", "edible", "educated", "elaborate", "elastic", "elated", "elderly", "electric", "elegant", "elementary", "elliptical", "embarrassed", "embellished", "eminent", "emotional", "empty", "enchanted", "enchanting", "energetic", "enlightened", "enormous", "enraged", "entire", "envious", "equal", "equatorial", "essential", "esteemed", "ethical", "euphoric", "even", "evergreen", "everlasting", "every", "evil", "exalted", "excellent", "exemplary", "exhausted", "excitable", "excited", "exciting", "exotic", "expensive", "experienced", "expert", "extraneous", "extroverted", "extra-large", "extra-small", "fabulous", "failing", "faint", "fair", "faithful", "fake", "false", "familiar", "famous", "fancy", "fantastic", "far", "faraway", "far-flung", "far-off", "fast", "fat", "fatal", "fatherly", "favorable", "favorite", "fearful", "fearless", "feisty", "feline", "female", "feminine", "few", "fickle", "filthy", "fine", "finished", "firm", "first", "firsthand", "fitting", "fixed", "flaky", "flamboyant", "flashy", "flat", "flawed", "flawless", "flickering", "flimsy", "flippant", "flowery", "fluffy", "fluid", "flustered", "focused", "fond", "foolhardy", "foolish", "forceful", "forked", "formal", "forsaken", "forthright", "fortunate", "fragrant", "frail", "frank", "frayed", "free", "French", "fresh", "frequent", "friendly", "frightened", "frightening", "frigid", "frilly", "frizzy", "frivolous", "front", "frosty", "frozen", "frugal", "fruitful", "full", "fumbling", "functional", "funny", "fussy", "fuzzy", "gargantuan", "gaseous", "general", "generous", "gentle", "genuine", "giant", "giddy", "gigantic", "gifted", "giving", "glamorous", "glaring", "glass", "gleaming", "gleeful", "glistening", "glittering", "gloomy", "glorious", "glossy", "glum", "golden", "good", "good-natured", "gorgeous", "graceful", "gracious", "grand", "grandiose", "granular", "grateful", "grave", "gray", "great", "greedy", "green", "gregarious", "grim", "grimy", "gripping", "grizzled", "gross", "grotesque", "grouchy", "grounded", "growing", "growling", "grown", "grubby", "gruesome", "grumpy", "guilty", "gullible", "gummy", "hairy", "half", "handmade", "handsome", "handy", "happy", "happy-go-lucky", "hard", "hard-to-find", "harmful", "harmless", "harmonious", "harsh", "hasty", "hateful", "haunting", "healthy", "heartfelt", "hearty", "heavenly", "heavy", "hefty", "helpful", "helpless", "hidden", "hideous", "high", "high-level", "hilarious", "hoarse", "hollow", "homely", "honest", "honorable", "honored", "hopeful", "horrible", "hospitable", "hot", "huge", "humble", "humiliating", "humming", "humongous", "hungry", "hurtful", "husky", "icky", "icy", "ideal", "idealistic", "identical", "idle", "idiotic", "idolized", "ignorant", "ill", "illegal", "ill-fated", "ill-informed", "illiterate", "illustrious", "imaginary", "imaginative", "immaculate", "immaterial", "immediate", "immense", "impassioned", "impeccable", "impartial", "imperfect", "imperturbable", "impish", "impolite", "important", "impossible", "impractical", "impressionable", "impressive", "improbable", "impure", "inborn", "incomparable", "incompatible", "incomplete", "inconsequential", "incredible", "indelible", "inexperienced", "indolent", "infamous", "infantile", "infatuated", "inferior", "infinite", "informal", "innocent", "insecure", "insidious", "insignificant", "insistent", "instructive", "insubstantial", "intelligent", "intent", "intentional", "interesting", "internal", "international", "intrepid", "ironclad", "irresponsible", "irritating", "itchy", "jaded", "jagged", "jam-packed", "jaunty", "jealous", "jittery", "joint", "jolly", "jovial", "joyful", "joyous", "jubilant", "judicious", "juicy", "jumbo", "junior", "jumpy", "juvenile", "kaleidoscopic", "keen", "key", "kind", "kindhearted", "kindly", "klutzy", "knobby", "knotty", "knowledgeable", "knowing", "known", "kooky", "kosher", "lame", "lanky", "large", "last", "lasting", "late", "lavish", "lawful", "lazy", "leading", "lean", "leafy", "left", "legal", "legitimate", "light", "lighthearted", "likable", "likely", "limited", "limp", "limping", "linear", "lined", "liquid", "little", "live", "lively", "livid", "loathsome", "lone", "lonely", "long", "long-term", "loose", "lopsided", "lost", "loud", "lovable", "lovely", "loving", "low", "loyal", "lucky", "lumbering", "luminous", "lumpy", "lustrous", "luxurious", "mad", "made-up", "magnificent", "majestic", "major", "male", "mammoth", "married", "marvelous", "masculine", "massive", "mature", "meager", "mealy", "mean", "measly", "meaty", "medical", "mediocre", "medium", "meek", "mellow", "melodic", "memorable", "menacing", "merry", "messy", "metallic", "mild", "milky", "mindless", "miniature", "minor", "minty", "miserable", "miserly", "misguided", "misty", "mixed", "modern", "modest", "moist", "monstrous", "monthly", "monumental", "moral", "mortified", "motherly", "motionless", "mountainous", "muddy", "muffled", "multicolored", "mundane", "murky", "mushy", "musty", "muted", "mysterious", "naive", "narrow", "nasty", "natural", "naughty", "nautical", "near", "neat", "necessary", "needy", "negative", "neglected", "negligible", "neighboring", "nervous", "new", "next", "nice", "nifty", "nimble", "nippy", "nocturnal", "noisy", "nonstop", "normal", "notable", "noted", "noteworthy", "novel", "noxious", "numb", "nutritious", "nutty", "obedient", "obese", "oblong", "oily", "oblong", "obvious", "occasional", "odd", "oddball", "offbeat", "offensive", "official", "old", "old-fashioned", "only", "open", "optimal", "optimistic", "opulent", "orange", "orderly", "organic", "ornate", "ornery", "ordinary", "original", "other", "our", "outlying", "outgoing", "outlandish", "outrageous", "outstanding", "oval", "overcooked", "overdue", "overjoyed", "overlooked", "palatable", "pale", "paltry", "parallel", "parched", "partial", "passionate", "past", "pastel", "peaceful", "peppery", "perfect", "perfumed", "periodic", "perky", "personal", "pertinent", "pesky", "pessimistic", "petty", "phony", "physical", "piercing", "pink", "pitiful", "plain", "plaintive", "plastic", "playful", "pleasant", "pleased", "pleasing", "plump", "plush", "polished", "polite", "political", "pointed", "pointless", "poised", "poor", "popular", "portly", "posh", "positive", "possible", "potable", "powerful", "powerless", "practical", "precious", "present", "prestigious", "pretty", "precious", "previous", "pricey", "prickly", "primary", "prime", "pristine", "private", "prize", "probable", "productive", "profitable", "profuse", "proper", "proud", "prudent", "punctual", "pungent", "puny", "pure", "purple", "pushy", "putrid", "puzzled", "puzzling", "quaint", "qualified", "quarrelsome", "quarterly", "queasy", "querulous", "questionable", "quick", "quick-witted", "quiet", "quintessential", "quirky", "quixotic", "quizzical", "radiant", "ragged", "rapid", "rare", "rash", "raw", "recent", "reckless", "rectangular", "ready", "real", "realistic", "reasonable", "red", "reflecting", "regal", "regular", "reliable", "relieved", "remarkable", "remorseful", "remote", "repentant", "required", "respectful", "responsible", "repulsive", "revolving", "rewarding", "rich", "rigid", "right", "ringed", "ripe", "roasted", "robust", "rosy", "rotating", "rotten", "rough", "round", "rowdy", "royal", "rubbery", "rundown", "ruddy", "rude", "runny", "rural", "rusty", "sad", "safe", "salty", "same", "sandy", "sane", "sarcastic", "sardonic", "satisfied", "scaly", "scarce", "scared", "scary", "scented", "scholarly", "scientific", "scornful", "scratchy", "scrawny", "second", "secondary", "second-hand", "secret", "self-assured", "self-reliant", "selfish", "sentimental", "separate", "serene", "serious", "serpentine", "several", "severe", "shabby", "shadowy", "shady", "shallow", "shameful", "shameless", "sharp", "shimmering", "shiny", "shocked", "shocking", "shoddy", "short", "short-term", "showy", "shrill", "shy", "sick", "silent", "silky", "silly", "silver", "similar", "simple", "simplistic", "sinful", "single", "sizzling", "skeletal", "skinny", "sleepy", "slight", "slim", "slimy", "slippery", "slow", "slushy", "small", "smart", "smoggy", "smooth", "smug", "snappy", "snarling", "sneaky", "sniveling", "snoopy", "sociable", "soft", "soggy", "solid", "somber", "some", "spherical", "sophisticated", "sore", "sorrowful", "soulful", "soupy", "sour", "Spanish", "sparkling", "sparse", "specific", "spectacular", "speedy", "spicy", "spiffy", "spirited", "spiteful", "splendid", "spotless", "spotted", "spry", "square", "squeaky", "squiggly", "stable", "staid", "stained", "stale", "standard", "starchy", "stark", "starry", "steep", "sticky", "stiff", "stimulating", "stingy", "stormy", "straight", "strange", "steel", "strict", "strident", "striking", "striped", "strong", "studious", "stunning", "stupendous", "stupid", "sturdy", "stylish", "subdued", "submissive", "substantial", "subtle", "suburban", "sudden", "sugary", "sunny", "super", "superb", "superficial", "superior", "supportive", "sure-footed", "surprised", "suspicious", "svelte", "sweaty", "sweet", "sweltering", "swift", "sympathetic", "tall", "talkative", "tame", "tan", "tangible", "tart", "tasty", "tattered", "taut", "tedious", "teeming", "tempting", "tender", "tense", "tepid", "terrible", "terrific", "testy", "thankful", "that", "these", "thick", "thin", "third", "thirsty", "this", "thorough", "thorny", "those", "thoughtful", "threadbare", "thrifty", "thunderous", "tidy", "tight", "timely", "tinted", "tiny", "tired", "torn", "total", "tough", "traumatic", "treasured", "tremendous", "tragic", "trained", "tremendous", "triangular", "tricky", "trifling", "trim", "trivial", "troubled", "true", "trusting", "trustworthy", "trusty", "truthful", "tubby", "turbulent", "twin", "ugly", "ultimate", "unacceptable", "unaware", "uncomfortable", "uncommon", "unconscious", "understated", "unequaled", "uneven", "unfinished", "unfit", "unfolded", "unfortunate", "unhappy", "unhealthy", "uniform", "unimportant", "unique", "united", "unkempt", "unknown", "unlawful", "unlined", "unlucky", "unnatural", "unpleasant", "unrealistic", "unripe", "unruly", "unselfish", "unsightly", "unsteady", "unsung", "untidy", "untimely", "untried", "untrue", "unused", "unusual", "unwelcome", "unwieldy", "unwilling", "unwitting", "unwritten", "upbeat", "upright", "upset", "urban", "usable", "used", "useful", "useless", "utilized", "utter", "vacant", "vague", "vain", "valid", "valuable", "vapid", "variable", "vast", "velvety", "venerated", "vengeful", "verifiable", "vibrant", "vicious", "victorious", "vigilant", "vigorous", "villainous", "violet", "violent", "virtual", "virtuous", "visible", "vital", "vivacious", "vivid", "voluminous", "wan", "warlike", "warm", "warmhearted", "warped", "wary", "wasteful", "watchful", "waterlogged", "watery", "wavy", "wealthy", "weak", "weary", "webbed", "wee", "weekly", "weepy", "weighty", "weird", "welcome", "well-documented", "well-groomed", "well-informed", "well-lit", "well-made", "well-off", "well-to-do", "well-worn", "wet", "which", "whimsical", "whirlwind", "whispered", "white", "whole", "whopping", "wicked", "wide", "wide-eyed", "wiggly", "wild", "willing", "wilted", "winding", "windy", "winged", "wiry", "wise", "witty", "wobbly", "woeful", "wonderful", "wooden", "woozy", "wordy", "worldly", "worn", "worried", "worrisome", "worse", "worst", "worthless", "worthwhile", "worthy", "wrathful", "wretched", "writhing", "wrong", "wry", "yawning", "yearly", "yellow", "yellowish", "young", "youthful", "yummy", "zany", "zealous", "zesty", "zigzag", "rocky"];

  var name2 = ["people", "history", "way", "art", "world", "information", "map", "family", "government", "health", "system", "computer", "meat", "year", "thanks", "music", "person", "reading", "method", "data", "food", "understanding", "theory", "law", "bird", "literature", "problem", "software", "control", "knowledge", "power", "ability", "economics", "love", "internet", "television", "science", "library", "nature", "fact", "product", "idea", "temperature", "investment", "area", "society", "activity", "story", "industry", "media", "thing", "oven", "community", "definition", "safety", "quality", "development", "language", "management", "player", "variety", "video", "week", "security", "country", "exam", "movie", "organization", "equipment", "physics", "analysis", "policy", "series", "thought", "basis", "boyfriend", "direction", "strategy", "technology", "army", "camera", "freedom", "paper", "environment", "child", "instance", "month", "truth", "marketing", "university", "writing", "article", "department", "difference", "goal", "news", "audience", "fishing", "growth", "income", "marriage", "user", "combination", "failure", "meaning", "medicine", "philosophy", "teacher", "communication", "night", "chemistry", "disease", "disk", "energy", "nation", "road", "role", "soup", "advertising", "location", "success", "addition", "apartment", "education", "math", "moment", "painting", "politics", "attention", "decision", "event", "property", "shopping", "student", "wood", "competition", "distribution", "entertainment", "office", "population", "president", "unit", "category", "cigarette", "context", "introduction", "opportunity", "performance", "driver", "flight", "length", "magazine", "newspaper", "relationship", "teaching", "cell", "dealer", "debate", "finding", "lake", "member", "message", "phone", "scene", "appearance", "association", "concept", "customer", "death", "discussion", "housing", "inflation", "insurance", "mood", "woman", "advice", "blood", "effort", "expression", "importance", "opinion", "payment", "reality", "responsibility", "situation", "skill", "statement", "wealth", "application", "city", "county", "depth", "estate", "foundation", "grandmother", "heart", "perspective", "photo", "recipe", "studio", "topic", "collection", "depression", "imagination", "passion", "percentage", "resource", "setting", "ad", "agency", "college", "connection", "criticism", "debt", "description", "memory", "patience", "secretary", "solution", "administration", "aspect", "attitude", "director", "personality", "psychology", "recommendation", "response", "selection", "storage", "version", "alcohol", "argument", "complaint", "contract", "emphasis", "highway", "loss", "membership", "possession", "preparation", "steak", "union", "agreement", "cancer", "currency", "employment", "engineering", "entry", "interaction", "limit", "mixture", "preference", "region", "republic", "seat", "tradition", "virus", "actor", "classroom", "delivery", "device", "difficulty", "drama", "election", "engine", "football", "guidance", "hotel", "match", "owner", "priority", "protection", "suggestion", "tension", "variation", "anxiety", "atmosphere", "awareness", "bread", "climate", "comparison", "confusion", "construction", "elevator", "emotion", "employee", "employer", "guest", "height", "leadership", "mall", "manager", "operation", "recording", "respect", "sample", "transportation", "boring", "charity", "cousin", "disaster", "editor", "efficiency", "excitement", "extent", "feedback", "guitar", "homework", "leader", "mom", "outcome", "permission", "presentation", "promotion", "reflection", "refrigerator", "resolution", "revenue", "session", "singer", "tennis", "basket", "bonus", "cabinet", "childhood", "church", "clothes", "coffee", "dinner", "drawing", "hair", "hearing", "initiative", "judgment", "lab", "measurement", "mode", "mud", "orange", "poetry", "police", "possibility", "procedure", "queen", "ratio", "relation", "restaurant", "satisfaction", "sector", "signature", "significance", "song", "tooth", "town", "vehicle", "volume", "wife", "accident", "airport", "appointment", "arrival", "assumption", "baseball", "chapter", "committee", "conversation", "database", "enthusiasm", "error", "explanation", "farmer", "gate", "girl", "hall", "historian", "hospital", "injury", "instruction", "maintenance", "manufacturer", "meal", "perception", "pie", "poem", "presence", "proposal", "reception", "replacement", "revolution", "river", "son", "speech", "tea", "village", "warning", "winner", "worker", "writer", "assistance", "breath", "buyer", "chest", "chocolate", "conclusion", "contribution", "cookie", "courage", "desk", "drawer", "establishment", "examination", "garbage", "grocery", "honey", "impression", "improvement", "independence", "insect", "inspection", "inspector", "king", "ladder", "menu", "penalty", "piano", "potato", "profession", "professor", "quantity", "reaction", "requirement", "salad", "sister", "supermarket", "tongue", "weakness", "wedding", "affair", "ambition", "analyst", "apple", "assignment", "assistant", "bathroom", "bedroom", "beer", "birthday", "celebration", "championship", "cheek", "client", "consequence", "departure", "diamond", "dirt", "ear", "fortune", "friendship", "funeral", "gene", "girlfriend", "hat", "indication", "intention", "lady", "midnight", "negotiation", "obligation", "passenger", "pizza", "platform", "poet", "pollution", "recognition", "reputation", "shirt", "speaker", "stranger", "surgery", "sympathy", "tale", "throat", "trainer", "uncle", "youth", "time", "work", "film", "water", "money", "example", "while", "business", "study", "game", "life", "form", "air", "day", "place", "number", "part", "field", "fish", "back", "process", "heat", "hand", "experience", "job", "book", "end", "point", "type", "home", "economy", "value", "body", "market", "guide", "interest", "state", "radio", "course", "company", "price", "size", "card", "list", "mind", "trade", "line", "care", "group", "risk", "word", "fat", "force", "key", "light", "training", "name", "school", "top", "amount", "level", "order", "practice", "research", "sense", "service", "piece", "web", "boss", "sport", "fun", "house", "page", "term", "test", "answer", "sound", "focus", "matter", "kind", "soil", "board", "oil", "picture", "access", "garden", "range", "rate", "reason", "future", "site", "demand", "exercise", "image", "case", "cause", "coast", "action", "age", "bad", "boat", "record", "result", "section", "building", "mouse", "cash", "class", "period", "plan", "store", "tax", "side", "subject", "space", "rule", "stock", "weather", "chance", "figure", "man", "model", "source", "beginning", "earth", "program", "chicken", "design", "feature", "head", "material", "purpose", "question", "rock", "salt", "act", "birth", "car", "dog", "object", "scale", "sun", "note", "profit", "rent", "speed", "style", "war", "bank", "craft", "half", "inside", "outside", "standard", "bus", "exchange", "eye", "fire", "position", "pressure", "stress", "advantage", "benefit", "box", "frame", "issue", "step", "cycle", "face", "item", "metal", "paint", "review", "room", "screen", "structure", "view", "account", "ball", "discipline", "medium", "share", "balance", "bit", "black", "bottom", "choice", "gift", "impact", "machine", "shape", "tool", "wind", "address", "average", "career", "culture", "morning", "pot", "sign", "table", "task", "condition", "contact", "credit", "egg", "hope", "ice", "network", "north", "square", "attempt", "date", "effect", "link", "post", "star", "voice", "capital", "challenge", "friend", "self", "shot", "brush", "couple", "exit", "front", "function", "lack", "living", "plant", "plastic", "spot", "summer", "taste", "theme", "track", "wing", "brain", "button", "click", "desire", "foot", "gas", "influence", "notice", "rain", "wall", "base", "damage", "distance", "feeling", "pair", "savings", "staff", "sugar", "target", "text", "animal", "author", "budget", "discount", "file", "ground", "lesson", "minute", "officer", "phase", "reference", "register", "sky", "stage", "stick", "title", "trouble", "bowl", "bridge", "campaign", "character", "club", "edge", "evidence", "fan", "letter", "lock", "maximum", "novel", "option", "pack", "park", "quarter", "skin", "sort", "weight", "baby", "background", "carry", "dish", "factor", "fruit", "glass", "joint", "master", "muscle", "red", "strength", "traffic", "trip", "vegetable", "appeal", "chart", "gear", "ideal", "kitchen", "land", "log", "mother", "net", "party", "principle", "relative", "sale", "season", "signal", "spirit", "street", "tree", "wave", "belt", "bench", "commission", "copy", "drop", "minimum", "path", "progress", "project", "sea", "south", "status", "stuff", "ticket", "tour", "angle", "blue", "breakfast", "confidence", "daughter", "degree", "doctor", "dot", "dream", "duty", "essay", "father", "fee", "finance", "hour", "juice", "luck", "milk", "mouth", "peace", "pipe", "stable", "storm", "substance", "team", "trick", "afternoon", "bat", "beach", "blank", "catch", "chain", "consideration", "cream", "crew", "detail", "gold", "interview", "kid", "mark", "mission", "pain", "pleasure", "score", "screw", "sex", "shop", "shower", "suit", "tone", "window", "agent", "band", "bath", "block", "bone", "calendar", "candidate", "cap", "coat", "contest", "corner", "court", "cup", "district", "door", "east", "finger", "garage", "guarantee", "hole", "hook", "implement", "layer", "lecture", "lie", "manner", "meeting", "nose", "parking", "partner", "profile", "rice", "routine", "schedule", "swimming", "telephone", "tip", "winter", "airline", "bag", "battle", "bed", "bill", "bother", "cake", "code", "curve", "designer", "dimension", "dress", "ease", "emergency", "evening", "extension", "farm", "fight", "gap", "grade", "holiday", "horror", "horse", "husband", "loan", "mistake", "mountain", "nail", "noise", "occasion", "package", "patient", "pause", "phrase", "proof", "race", "relief", "sand", "sentence", "shoulder", "smoke", "stomach", "string", "tourist", "towel", "vacation", "west", "wheel", "wine", "arm", "aside", "associate", "bet", "blow", "border", "branch", "breast", "brother", "buddy", "bunch", "chip", "coach", "cross", "document", "draft", "dust", "expert", "floor", "god", "golf", "habit", "iron", "judge", "knife", "landscape", "league", "mail", "mess", "native", "opening", "parent", "pattern", "pin", "pool", "pound", "request", "salary", "shame", "shelter", "shoe", "silver", "tackle", "tank", "trust", "assist", "bake", "bar", "bell", "bike", "blame", "boy", "brick", "chair", "closet", "clue", "collar", "comment", "conference", "devil", "diet", "fear", "fuel", "glove", "jacket", "lunch", "monitor", "mortgage", "nurse", "pace", "panic", "peak", "plane", "reward", "row", "sandwich", "shock", "spite", "spray", "surprise", "till", "transition", "weekend", "welcome", "yard", "alarm", "bend", "bicycle", "bite", "blind", "bottle", "cable", "candle", "clerk", "cloud", "concert", "counter", "flower", "grandfather", "harm", "knee", "lawyer", "leather", "load", "mirror", "neck", "pension", "plate", "purple", "ruin", "ship", "skirt", "slice", "snow", "specialist", "stroke", "switch", "trash", "tune", "zone", "anger", "award", "bid", "bitter", "boot", "bug", "camp", "candy", "carpet", "cat", "champion", "channel", "clock", "comfort", "cow", "crack", "engineer", "entrance", "fault", "grass", "guy", "hell", "highlight", "incident", "island", "joke", "jury", "leg", "lip", "mate", "motor", "nerve", "passage", "pen", "pride", "priest", "prize", "promise", "resident", "resort", "ring", "roof", "rope", "sail", "scheme", "script", "sock", "station", "toe", "tower", "truck", "witness", "can", "will", "other", "use", "make", "good", "look", "help", "go", "great", "being", "still", "public", "read", "keep", "start", "give", "human", "local", "general", "specific", "long", "play", "feel", "high", "put", "common", "set", "change", "simple", "past", "big", "possible", "particular", "major", "personal", "current", "national", "cut", "natural", "physical", "show", "try", "check", "second", "call", "move", "pay", "let", "increase", "single", "individual", "turn", "ask", "buy", "guard", "hold", "main", "offer", "potential", "professional", "international", "travel", "cook", "alternative", "special", "working", "whole", "dance", "excuse", "cold", "commercial", "low", "purchase", "deal", "primary", "worth", "fall", "necessary", "positive", "produce", "search", "present", "spend", "talk", "creative", "tell", "cost", "drive", "green", "support", "glad", "remove", "return", "run", "complex", "due", "effective", "middle", "regular", "reserve", "independent", "leave", "original", "reach", "rest", "serve", "watch", "beautiful", "charge", "active", "break", "negative", "safe", "stay", "visit", "visual", "affect", "cover", "report", "rise", "walk", "white", "junior", "pick", "unique", "classic", "final", "lift", "mix", "private", "stop", "teach", "western", "concern", "familiar", "fly", "official", "broad", "comfortable", "gain", "rich", "save", "stand", "young", "heavy", "lead", "listen", "valuable", "worry", "handle", "leading", "meet", "release", "sell", "finish", "normal", "press", "ride", "secret", "spread", "spring", "tough", "wait", "brown", "deep", "display", "flow", "hit", "objective", "shoot", "touch", "cancel", "chemical", "cry", "dump", "extreme", "push", "conflict", "eat", "fill", "formal", "jump", "kick", "opposite", "pass", "pitch", "remote", "total", "treat", "vast", "abuse", "beat", "burn", "deposit", "print", "raise", "sleep", "somewhere", "advance", "consist", "dark", "double", "draw", "equal", "fix", "hire", "internal", "join", "kill", "sensitive", "tap", "win", "attack", "claim", "constant", "drag", "drink", "guess", "minor", "pull", "raw", "soft", "solid", "wear", "weird", "wonder", "annual", "count", "dead", "doubt", "feed", "forever", "impress", "repeat", "round", "sing", "slide", "strip", "wish", "combine", "command", "dig", "divide", "equivalent", "hang", "hunt", "initial", "march", "mention", "spiritual", "survey", "tie", "adult", "brief", "crazy", "escape", "gather", "hate", "prior", "repair", "rough", "sad", "scratch", "sick", "strike", "employ", "external", "hurt", "illegal", "laugh", "lay", "mobile", "nasty", "ordinary", "respond", "royal", "senior", "split", "strain", "struggle", "swim", "train", "upper", "wash", "yellow", "convert", "crash", "dependent", "fold", "funny", "grab", "hide", "miss", "permit", "quote", "recover", "resolve", "roll", "sink", "slip", "spare", "suspect", "sweet", "swing", "twist", "upstairs", "usual", "abroad", "brave", "calm", "concentrate", "estimate", "grand", "male", "mine", "prompt", "quiet", "refuse", "regret", "reveal", "rush", "shake", "shift", "shine", "steal", "suck", "surround", "bear", "brilliant", "dare", "dear", "delay", "drunk", "female", "hurry", "inevitable", "invite", "kiss", "neat", "pop", "punch", "quit", "reply", "representative", "resist", "rip", "rub", "silly", "smile", "spell", "stretch", "stupid", "tear", "temporary", "tomorrow", "wake", "wrap", "yesterday", "Thomas", "Tom", "Lieuwe"];

  var name = capFirst(name1[getRandomInt(0, name1.length + 1)]) + ' ' + capFirst(name2[getRandomInt(0, name2.length + 1)]);
  window.muteLocalVideo();
  return name;
}

window.start = function () {
  //
  var vizOptions = {
    8444: "none", 8445: "frame", 8446: "webgl", 8447: "none",
    8600: "none", 8601: "profile", 8602: "photo3d",
  }
  if (window.location.host.includes("3dvar")) {
    window.vizOption = vizOptions[eyePortMapping[window.location.host]];
  } else {
    window.vizOption = vizOptions[window.location.port];
  }
  console.log("window.vizOption", window.vizOption);
  // debug
  if (!window.webgazerReady) {
    console.log("window.webgazerReady", window.webgazerReady);
    setTimeout(start, 1000);
    return;
  }

  window.localUuid = createUUID();


  // check if "&displayName=xxx" is appended to URL, otherwise alert user to populate
  var urlParams = new URLSearchParams(window.location.search);
  window.localDisplayName = urlParams.get('displayName') || prompt('Enter your name', generateName());
  if (window.localDisplayName === null || window.localDisplayName === '') {
    window.localDisplayName = generateName();
  }
  // document.getElementById('localVideoContainer').appendChild(makeLabel(window.localDisplayName));
  // maintain such video
  // document.getElementById("webgazerVideoFeed").style.width = "240px";
  // specify audio for user media
  // window.maxVideoWidth = 320;
  // Todo: we don't need video for profile and 3D photo setup
  var constraints = {
    video: {
      width: { max: window.maxVideoWidth },
      height: { max: 240 },
      frameRate: { max: 30 },
    },
    audio: true,
  };

  if (window.localDisplayName == "host") {
    window.host = true;
    constraints.video = false;
    // constraints.audio = false;
    document.getElementById(webgazer.params.faceFeedbackBoxId).style.display = 'none';
    document.getElementById(webgazer.params.videoElementId).style.display = 'none';
  }
  // else {
  // set up local video stream from webgazer result
  // set up local video stream
  // host only needs to setup with audio or even no audio.
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        window.videoStream = stream;
        localStream = stream;
        // stream.getAudioTracks()[0].enabled = false;
        document.getElementById('localVideo').muted = true;
        document.getElementById('localVideo').srcObject = stream;
        // update to global
        // window.localStreamReady = true;
        // hide the self video until calibration is finished
        // don't need to hide now
        // document.getElementById('localVideoContainer').style.display = 'none';
        // document.getElementById('localVideoContainer').style.width = "15%";

      }).catch(errorHandler)

      // set up websocket and message all existing clients
      .then(() => {
        if (!window.host)
          getLocalAudio();
        if (window.location.host.includes("3dvar")) {
          window.serverConnection = new WebSocket('wss://' + "eye.3dvar.com" + ':' + eyePortMapping[window.location.host]);
        } else {
          window.serverConnection = new WebSocket('wss://' + window.location.hostname + ':' + window.location.port);
        }
        window.serverConnection.onmessage = gotMessageFromServer;
        window.serverConnection.onopen = event => {
          window.serverConnection.send(JSON.stringify({ 'displayName': window.localDisplayName, 'uuid': window.localUuid, 'dest': 'all' }));
        }

        if (window.vizOption != "photo3d") {
          webgl_scene_init(document.getElementById("webgl"));
        }
        else {
          xg_scene_init(document.getElementById("photo3d"));
          // viz self here
          if (!window.host)
            vizRemoteViaXGPhoto3D(null, 0, window.localUuid, window.localDisplayName);
        }

      }).catch(errorHandler);

  } else {
    alert('Your browser does not support getUserMedia API');
  }

  // resume after setting up local video stream calibration
  // webgazer.resume();
  // }
  // debug
  // webgl_video_init(document.getElementById("localVideo"), document.getElementById("webglContainer"));
}

// function vizSelfProfile() {
//   if (window.vizOption == "photo3d") {
//     vizRemoteViaXGPhoto3D(0, window.localUuid, window.localDisplayName);
//   }
// }

// sound
// Meter class that generates a number correlated to audio volume.
// The meter class itself displays nothing, but it makes the
// instantaneous and time-decaying volumes available for inspection.
// It also reports on the fraction of samples that were at or near
// the top of the measurement range.
function SoundMeter(context) {
  this.context = context;
  this.instant = 0.0;
  this.slow = 0.0;
  this.clip = 0.0;
  this.script = context.createScriptProcessor(2048, 1, 1);
  const that = this;
  this.script.onaudioprocess = function (event) {
    const input = event.inputBuffer.getChannelData(0);
    let i;
    let sum = 0.0;
    let clipcount = 0;
    for (i = 0; i < input.length; ++i) {
      sum += input[i] * input[i];
      if (Math.abs(input[i]) > 0.99) {
        clipcount += 1;
      }
    }
    that.instant = Math.sqrt(sum / input.length);
    that.slow = 0.95 * that.slow + 0.05 * that.instant;
    that.clip = clipcount / input.length;
  };
}

SoundMeter.prototype.connectToSource = function (stream, callback) {
  if (window.host)
    return;
  console.log('SoundMeter connecting');
  try {
    this.mic = this.context.createMediaStreamSource(stream);
    this.mic.connect(this.script);
    // necessary to make sample run, but should not be.
    this.script.connect(this.context.destination);
    if (typeof callback !== 'undefined') {
      callback(null);
    }
  } catch (e) {
    console.error(e);
    if (typeof callback !== 'undefined') {
      callback(e);
    }
  }
};

SoundMeter.prototype.stop = function () {
  this.mic.disconnect();
  this.script.disconnect();
};


function getLocalAudio() {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.audioContext = new AudioContext();
  } catch (e) {
    alert('Web Audio API not supported.');
  }
  const soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
  soundMeter.connectToSource(window.videoStream, function (e) {
    if (e) {
      alert(e);
      return;
    }
    if (!window.host) {
      setInterval(() => {
        // console.log("local audio:", soundMeter.instant.toFixed(4), soundMeter.slow.toFixed(4), soundMeter.clip);
        if (window.serverConnection && window.serverConnection.readyState == 1) {
          window.serverConnection.send(JSON.stringify({
            'audio': soundMeter.instant.toFixed(4),
            'uuid': window.localUuid,
            'dest': 'all'
          }));
          // 
          if (window.webglScene && window.vizOption == "profile") {
            if ("remoteVideo_" + window.localUuid in window.webglScene.meshes) {
              window.webglScene.meshes["remoteVideo_" + window.localUuid].toggleSpeakingIcon(soundMeter.instant.toFixed(4) > 0.02);
              window.webglScene.meshes["remoteVideo_" + window.localUuid].adjustSpeakingCircle(soundMeter.instant.toFixed(4));
            }

          } else if (window.vizOption == "photo3d") {
            if (window.myCharList.length > 0 && window.myCharList[0].uuid == "remoteVideo_".concat(window.localUuid))
              window.myCharList[0].updateVolume(soundMeter.instant.toFixed(4));
          }
        }
      }, 200);
    }
  });
}

window.observe = function (peerIndex) {
  console.log("we have " + window.remoteID4host.length + " users:");
  window.remoteID4host.forEach(element => {
    console.log("\tID:" + element);
  });
  // send to the server and retrieve the correct remoteID order.
  peerIndex = Math.min(peerIndex, window.remoteID4host.length - 1);
  window.serverConnection.send(JSON.stringify({ 'observe': window.localUuid, 'dest': window.remoteID4host[peerIndex] }));

}

function gotMessageFromServer(message) {
  var signal = JSON.parse(message.data);
  var peerUuid = signal.uuid;

  // Ignore messages that are not for us or from ourselves
  if (peerUuid == window.localUuid || (signal.dest != window.localUuid && signal.dest != 'all')) return;

  if (signal.displayName && signal.dest == 'all') {
    // set up peer connection object for a newcomer peer
    setUpPeer(peerUuid, signal.displayName);
    window.serverConnection.send(JSON.stringify({ 'displayName': window.localDisplayName, 'uuid': window.localUuid, 'dest': peerUuid }));

  } else if (signal.displayName && signal.dest == window.localUuid) {
    // initiate call if we are the newcomer peer
    setUpPeer(peerUuid, signal.displayName, true);

  } else if (signal.sdp) {
    window.peerConnections[peerUuid].pc.setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(function () {
      // Only create answers in response to offers
      if (signal.sdp.type == 'offer') {
        window.peerConnections[peerUuid].pc.createAnswer().then(description => createdDescription(description, peerUuid)).catch(errorHandler);
      }
    }).catch(errorHandler);
    // console.log("debug", peerUuid);
  } else if (signal.ice) {
    window.peerConnections[peerUuid].pc.addIceCandidate(new RTCIceCandidate(signal.ice)).catch(errorHandler);
  } else if (signal.gaze && signal.dest == 'all') {
    // console.log("[recv gaze event] src:" + peerUuid + " dst:" + signal.gaze);
    if (isAudioRecordStart && window.host) {
      var curItem = {
        "user": window.peerConnections[signal.uuid] == null ? signal.uuid : window.peerConnections[signal.uuid].displayName,
        "dst": signal.gaze == "none" ? "none" : (window.peerConnections[signal.gaze] == null ? signal.gaze : window.peerConnections[signal.gaze].displayName),
        "x": signal.gazeCoordX.toFixed(2),
        "y": signal.gazeCoordY.toFixed(2),
        "ts": Date.now()
      };
      // console.log(curItem);
      window.gazeData.push(curItem);
    }

    if (window.vizOption == "frame") {
      // if gaze is self, highlight the peerUuid
      if (signal.gaze == window.localUuid) {
        highlightGaze(peerUuid);
      }
      // else create arrow from peerUuid to gaze
      else {
        createGazeArrow(peerUuid, signal.gaze);
      }
    }
    else if (window.vizOption == "webgl") {
      // if gaze is self, shake the peerUuid
      if (signal.gaze == window.localUuid) {
        shakeGazeSourcer(peerUuid);
      }
      // else rotate the peerUuid
      else {
        turnGazeSourcerToDst(peerUuid, signal.gaze); //gazeCoordX
      }
    } else if (window.vizOption == "profile") {
      // we don't need to do anything for profile setup for gaze awareness
    }
    else if (window.vizOption == "photo3d") {
      // TODO match gaze position to coordinates
      // Q: if looking at self, should face to viewer or profile?
      // console.log("[recv gaze event] src:", ("remoteVideo_" + peerUuid in window.mapUuidChar) ? window.mapUuidChar["remoteVideo_" + peerUuid].index : window.mapUuidChar["remoteVideo_" + peerUuid], " dst:", window.mapUuidChar["remoteVideo_" + signal.gaze], (signal.gaze == "none") ? "none" : window.mapUuidChar["remoteVideo_" + signal.gaze].index);
      if (("remoteVideo_" + peerUuid) in window.mapUuidChar) {
        if (signal.gaze == "none") {
          window.mapUuidChar["remoteVideo_" + peerUuid].gazeDst = -1;
        } else if (signal.gaze == window.localUuid) {
          // A is looking at self
          window.mapUuidChar["remoteVideo_" + peerUuid].gazeDst = 0;
        }
        else if (signal.gaze == peerUuid) {
          // A is looking at A
          window.mapUuidChar["remoteVideo_" + peerUuid].gazeDst = window.mapUuidChar["remoteVideo_" + peerUuid].index;
        } else {
          // peer is looking at signal.gaze
          window.mapUuidChar["remoteVideo_" + peerUuid].gazeDst = window.mapUuidChar["remoteVideo_" + signal.gaze].index;
        }
        // console.log("[rcv]", peerUuid, window.mapUuidChar["remoteVideo_" + peerUuid].index, "looking at", window.mapUuidChar["remoteVideo_" + peerUuid].gazeDst)
      }
    }
  } else if (signal.mouseDst && signal.dest == 'all') {
    if (window.vizOption == "photo3d") {
      if (signal.mouseDst != -1)
        window.mapUuidChar["remoteVideo_" + peerUuid].mouseDst = window.mapUuidChar["remoteVideo_" + signal.mouseDst].index;
      else
        window.mapUuidChar["remoteVideo_" + peerUuid].mouseDst = -1;
      // console.log("[rcv]", peerUuid, window.mapUuidChar["remoteVideo_" + peerUuid].index, "looking at", window.mapUuidChar["remoteVideo_" + peerUuid].mouseDst)
    }
  }
  else if (signal.viz && signal.dest == 'all') {
    window.vizOption = signal.viz;
    console.log("vizOption:" + window.vizOption);
  } else if (signal.observe && signal.dest == window.localUuid) {
    window.serverConnection.send(JSON.stringify({ 'ack': JSON.stringify(window.remoteIDs), 'uuid': window.localUuid, 'dest': signal.observe }));
  } else if (window.host && signal.ack && signal.dest == window.localUuid) {
    // TODO: how to see specific participant's perspective as a host?
    // update the remote ID array for visualization
    window.remoteIDs = JSON.parse(signal.ack);
    // reorgnize window.webglScene.meshes, and hide the one not in signal.ack
    window.remoteID4host.forEach(element => {
      if (window.remoteIDs.indexOf('remoteVideo_' + element) == -1) {
        // self
        window.observeSelf = 'remoteVideo_' + element;
        window.webglScene.hideMesh('remoteVideo_' + element);
      }
    });
    if (window.webglScene)
      window.webglScene.updatePlacement();
    window.webglScene.observe(window.peerConnections[signal.uuid].displayName);
    // TODO
    if (window.vizOption == "photo3d") {

    }
    // }
  } else if (signal.tobii) {
    var tobii = document.getElementById(webgazer.params.gazeDotId + "tobii");
    tobii.style.display = "block";
    // window.ShowGazePoints(true);
    tobii.style.transform = 'translate3d(' + signal.x + 'px,' + signal.y + 'px,0)';
    // 
    console.log("tobii ", signal.x, ",", signal.y, " predfilter ", window.gaze.filterx, ",", window.gaze.filtery);
  } else if (signal.audio) {
    if (window.webglScene && window.webglScene.meshes) {
      if (("remoteVideo_" + signal.uuid) in window.webglScene.meshes) {
        window.webglScene.meshes["remoteVideo_" + signal.uuid].toggleSpeakingIcon(signal.audio > 0.02);
        if (isAudioRecordStart && window.host) {
          window.audioData.push({
            "user": window.peerConnections[signal.uuid].displayName,
            "al": signal.audio,
            "ts": Date.now()
          });
        }
        if (window.vizOption == "profile") {
          window.webglScene.meshes["remoteVideo_" + signal.uuid].adjustSpeakingCircle(signal.audio);
        }
      }
    }
    if (window.vizOption == "photo3d") {
      for (let i in window.myCharList) {
        if (window.myCharList[i].uuid == "remoteVideo_" + signal.uuid) {
          window.myCharList[i].updateVolume(signal.audio);
          break;
        }
      }
    }
  }
  else if (signal.photo3d && signal.dest == 'all' && !window.host) {
    window.photo3d = signal.photo3d;
    console.log("window.photo3d", window.photo3d);
  }
}

function setUpPeer(peerUuid, displayName, initCall = false) {
  window.peerConnections[peerUuid] = { 'displayName': displayName, 'pc': new RTCPeerConnection(peerConnectionConfig) };
  window.peerConnections[peerUuid].pc.onicecandidate = event => gotIceCandidate(event, peerUuid);
  window.peerConnections[peerUuid].pc.ontrack = event => gotRemoteStream(event, peerUuid);
  window.peerConnections[peerUuid].pc.oniceconnectionstatechange = event => checkPeerDisconnect(event, peerUuid);
  if (localStream)
    window.peerConnections[peerUuid].pc.addStream(localStream);

  if (initCall) {
    window.peerConnections[peerUuid].pc.createOffer().then(description => createdDescription(description, peerUuid)).catch(errorHandler);
  }
}

function gotIceCandidate(event, peerUuid) {
  if (event.candidate != null) {
    window.serverConnection.send(JSON.stringify({ 'ice': event.candidate, 'uuid': window.localUuid, 'dest': peerUuid }));
  }
}

function createdDescription(description, peerUuid) {
  console.log(`got description, peer ${peerUuid}`);
  window.peerConnections[peerUuid].pc.setLocalDescription(description).then(function () {
    window.serverConnection.send(JSON.stringify({ 'sdp': window.peerConnections[peerUuid].pc.localDescription, 'uuid': window.localUuid, 'dest': peerUuid }));
  }).catch(errorHandler);
}

function gotRemoteStream(event, peerUuid) {
  if (peerUuid in connection_uids) {
    return;
  }
  connection_uids[peerUuid] = true;
  console.log(`got remote stream, peer ${peerUuid}`);

  if (window.remoteIDs == null) {
    window.remoteIDs = [];
    window.remoteFrames = [];
    window.remoteGazedFrames = [];
  }
  if (window.peerConnections[peerUuid].displayName != "host") {
    // don't add host to remoteIDs which is related to visualization
    window.remoteIDs.push('remoteVideo_' + peerUuid);
    window.remoteFrames.push('remoteVideo_frame_' + peerUuid);
    window.remoteGazedFrames.push('remoteVideo_gazed_' + peerUuid);
  }

  if (window.host || window.localDisplayName == "host") {
    remoteID4host.push(peerUuid);
  }

  // updateLayout();
  if (window.peerConnections[peerUuid].displayName != "host") {
    if (window.vizOption == "frame") {
      vizRemoteViaWebglWithFrame(event, peerUuid);
    } else if (window.vizOption == "webgl") {
      vizRemoteViaWebgl(event, peerUuid);
    } else if (window.vizOption == "profile") {
      vizRemoteViaWebglUsingProfile(event, Object.keys(window.peerConnections).indexOf(peerUuid) + 1, peerUuid);
    } else if (window.vizOption == "photo3d") {
      vizRemoteViaXGPhoto3D(event, Object.keys(window.peerConnections).indexOf(peerUuid) + 1, peerUuid);
    } else {
      // none
      vizRemoteViaWebgl(event, peerUuid, false);
    }
    if (window.host && window.vizOption != "none") {
      // viz every one on the left?
      vizForHost(event, peerUuid);
    }
  } else {
    // show for audio
    vizHostForAudio(event, peerUuid);
  }
}

function updateVizForHost() {
  var index = 0;
  Object.keys(window.peerConnections).forEach(peerUuid => {
    document.getElementById("remoteVideo_" + peerUuid).style.top
      = index / 2 * 210 + "px";
    // document.getElementById("remoteVideo_" + peerUuid).style.left
    //   = index % 2 * 300 + "px";
    index = index + 1;
  });
}

function vizForHost(event, peerUuid) {
  //assign stream to new HTML video element
  var vidElement = document.createElement('video');
  vidElement.setAttribute('autoplay', '');
  // vidElement.setAttribute('muted', '');
  vidElement.srcObject = event.streams[0];
  // vidElement.style.display = 'none';
  vidElement.style.width = "204.8px";
  vidElement.style.height = "153.6px";
  // Mirror video feed
  vidElement.style.setProperty("-moz-transform", "scale(-1, 1)");
  vidElement.style.setProperty("-webkit-transform", "scale(-1, 1)");
  vidElement.style.setProperty("-o-transform", "scale(-1, 1)");
  vidElement.style.setProperty("transform", "scale(-1, 1)");
  vidElement.style.setProperty("filter", "FlipH");

  var vidContainer = document.createElement('div');
  vidContainer.setAttribute('id', 'remoteVideo_' + peerUuid);
  // vidContainer.setAttribute('class', 'videoContainer');
  vidContainer.style.position = "fixed";
  vidContainer.style.top = (Object.keys(window.peerConnections).length - 1) / 2 * 310 + "px";
  // vidContainer.style.left = (Object.keys(window.peerConnections).length - 1) % 2 * 300 + "px";
  vidContainer.appendChild(vidElement);
  vidContainer.appendChild(makeLabel(window.peerConnections[peerUuid].displayName));

  // webgl_add_video(vidElement, "remoteVideo_" + peerUuid, window.peerConnections[peerUuid].displayName);
  // webgl_video_init(vidElement, vidContainer, videoWidth, videoHeight);

  document.getElementById('host').appendChild(vidContainer);
}

function vizRemoteViaFrame(event, peerUuid) {
  //assign stream to new HTML video element
  var vidElement = document.createElement('video');
  vidElement.setAttribute('autoplay', '');
  vidElement.setAttribute('muted', '');
  vidElement.srcObject = event.streams[0];

  var vidContainer = document.createElement('div');
  vidContainer.setAttribute('id', 'remoteVideo_' + peerUuid);
  vidContainer.setAttribute('class', 'videoContainer');
  vidContainer.appendChild(vidElement);
  vidContainer.appendChild(makeLabel(window.peerConnections[peerUuid].displayName));

  // create a frame
  var frameElement = document.createElement('div');
  frameElement.setAttribute('class', 'frameContainer');
  var regularFrameImg = document.createElement("img");
  regularFrameImg.setAttribute('id', 'remoteVideo_frame_' + peerUuid);
  regularFrameImg.setAttribute('class', 'regularFrame');
  regularFrameImg.src = "regularFrame.png";
  // regularFrameImg.width = width;
  // regularFrameImg.height = height;
  // frameElement.appendChild(regularFrameImg);
  frameElement.appendChild(regularFrameImg);

  var gazeFrameImg = document.createElement("img");
  gazeFrameImg.setAttribute('id', 'remoteVideo_gazed_' + peerUuid);
  gazeFrameImg.setAttribute('class', 'regularFrame');
  gazeFrameImg.src = "gazedFrame.png";
  gazeFrameImg.style.display = 'none';
  frameElement.appendChild(gazeFrameImg);

  var arrowImg = document.createElement("img");
  arrowImg.setAttribute('id', 'remoteVideo_arrow_' + peerUuid);
  arrowImg.setAttribute('class', 'regularArrow');
  arrowImg.src = "arrow.png";
  arrowImg.style.display = 'none';
  frameElement.appendChild(arrowImg);

  document.getElementById('videos').appendChild(vidContainer);
  document.getElementById('frames').appendChild(frameElement);
}

function vizRemoteViaWebglWithFrame(event, peerUuid) {
  //assign stream to new HTML video element
  var vidElement = document.createElement('video');
  vidElement.setAttribute('autoplay', '');
  // vidElement.setAttribute('muted', '');
  vidElement.srcObject = event.streams[0];
  vidElement.style.display = 'none';

  var vidContainer = document.createElement('div');
  vidContainer.setAttribute('id', 'remoteVideo_' + peerUuid);
  vidContainer.setAttribute('class', 'videoContainer');
  vidContainer.appendChild(vidElement);
  // vidContainer.appendChild(makeLabel(window.peerConnections[peerUuid].displayName));

  webgl_add_video(vidElement, "remoteVideo_" + peerUuid, window.peerConnections[peerUuid].displayName);
  webgl_add_frame("remoteVideo_" + peerUuid);

  document.getElementById('videos').appendChild(vidContainer);
}

function vizRemoteViaWebglUsingProfile(event, index, peerUuid, displayName = window.peerConnections[peerUuid].displayName) {
  if (index != 0) {
    //remote
    var vidElement = document.createElement('video');
    vidElement.setAttribute('autoplay', '');
    // vidElement.setAttribute('muted', '');
    vidElement.srcObject = event.streams[0];
    vidElement.style.display = 'none';

    var vidContainer = document.createElement('div');
    vidContainer.setAttribute('id', 'remoteVideo_' + peerUuid);
    vidContainer.setAttribute('class', 'videoContainer');
    vidContainer.appendChild(vidElement);
    document.getElementById('videos').appendChild(vidContainer);
  }
  // Todo
  webgl_add_profile(index, "remoteVideo_" + peerUuid, displayName);
}

function vizRemoteViaXGPhoto3D(event, index, peerUuid, displayName = window.peerConnections[peerUuid].displayName) {
  if (index != 0) {
    // remote
    var vidElement = document.createElement('video');
    vidElement.setAttribute('autoplay', '');
    // vidElement.setAttribute('muted', '');
    vidElement.srcObject = event.streams[0];
    vidElement.style.display = 'none';

    var vidContainer = document.createElement('div');
    vidContainer.setAttribute('id', 'remoteVideo_' + peerUuid);
    vidContainer.setAttribute('class', 'videoContainer');
    vidContainer.appendChild(vidElement);
    document.getElementById('videos').appendChild(vidContainer);
  }

  // Todo
  xg_add_photo3d(index, "remoteVideo_" + peerUuid, displayName);
}

function vizHostForAudio(event, peerUuid) {
  //assign stream to new HTML video element
  var vidElement = document.createElement('video');
  vidElement.setAttribute('autoplay', '');
  // vidElement.setAttribute('muted', '');
  vidElement.srcObject = event.streams[0];
  vidElement.style.display = 'none';

  var vidContainer = document.createElement('div');
  vidContainer.setAttribute('id', 'remoteVideo_' + peerUuid);
  vidContainer.setAttribute('class', 'videoContainer');
  vidContainer.appendChild(vidElement);
  document.getElementById('videos').appendChild(vidContainer);
}

function vizRemoteViaWebgl(event, peerUuid, addTV = true) {
  //assign stream to new HTML video element
  var vidElement = document.createElement('video');
  vidElement.setAttribute('autoplay', '');
  // vidElement.setAttribute('muted', '');
  vidElement.srcObject = event.streams[0];
  vidElement.style.display = 'none';

  var vidContainer = document.createElement('div');
  vidContainer.setAttribute('id', 'remoteVideo_' + peerUuid);
  vidContainer.setAttribute('class', 'videoContainer');
  vidContainer.appendChild(vidElement);
  // vidContainer.appendChild(makeLabel(window.peerConnections[peerUuid].displayName));

  webgl_add_video(vidElement, "remoteVideo_" + peerUuid, window.peerConnections[peerUuid].displayName);
  // webgl_video_init(vidElement, vidContainer, videoWidth, videoHeight);
  if (addTV)
    webgl_add_tv("remoteVideo_" + peerUuid)
  // create a frame
  // var frameElement = document.createElement('div');
  // frameElement.setAttribute('class', 'frameContainer');
  // var regularFrameImg = document.createElement("img");
  // regularFrameImg.setAttribute('id', 'remoteVideo_frame_' + peerUuid);
  // regularFrameImg.setAttribute('class', 'regularFrame');
  // regularFrameImg.src = "regularFrame.png";
  // frameElement.appendChild(regularFrameImg);

  document.getElementById('videos').appendChild(vidContainer);
  // document.getElementById('frames').appendChild(frameElement);
}

function vizLocalViaWebgl(event, peerUuid, addTV = true) {
  webgl_add_video(document.getElementById('localVideo'), "remoteVideo_" + peerUuid, window.peerConnections[peerUuid].displayName);
  // webgl_video_init(vidElement, vidContainer, videoWidth, videoHeight);

  document.getElementById('videos').appendChild(vidContainer);
  // document.getElementById('frames').appendChild(frameElement);
}

function printRemoteCoords() {
  for (var i = 0; i < window.remoteIDs.length; i++) {
    var rect = document.getElementById(window.remoteIDs[i]).getBoundingClientRect();
    console.log(window.remoteIDs[i], rect.top, rect.right, rect.bottom, rect.left);
  }
}

function checkPeerDisconnect(event, peerUuid) {
  var state = window.peerConnections[peerUuid].pc.iceConnectionState;
  console.log(`connection with peer ${peerUuid} ${state}`);
  if (state === "failed" || state === "closed" || state === "disconnected") {
    delete window.peerConnections[peerUuid];
    delete connection_uids[peerUuid];
    // if (document.getElementById('remoteVideo_' + peerUuid))
    //   document.getElementById('videos').removeChild(document.getElementById('remoteVideo_' + peerUuid));
    // if (window.vizOption == "frame")
    //   document.getElementById('frames').removeChild(document.getElementById('remoteVideo_frame_' + peerUuid).parentElement);
    // else {
    //   window.webglScene.removeMesh('remoteVideo_' + peerUuid);
    // }
    if (window.vizOption == "profile" || window.vizOption == "none") {
      window.webglScene.removeMesh('remoteVideo_' + peerUuid);
    } else if (window.vizOption == "photo3d") {
      console.log(window.myCharList);
      if ('remoteVideo_' + peerUuid in window.mapUuidChar) {
        var index = window.mapUuidChar['remoteVideo_' + peerUuid].index;
        deleteProfile(index);
      }

      // window.myCharList.splice(index, 1);
      console.log("after", window.myCharList);
    }
    const index1 = window.remoteIDs.indexOf('remoteVideo_' + peerUuid);
    if (index1 > -1) {
      window.remoteIDs.splice(index1, 1);
      window.remoteFrames.splice(index1, 1);
      window.remoteGazedFrames.splice(index1, 1);
    }
    // for host
    if (window.host) {
      var index2 = window.remoteID4host.indexOf(peerUuid);
      if (index2 > -1) {
        window.remoteID4host.splice(index2, 1);
      }
      // TODO: remove corresponding video feed and deal with different condition
      var ele = document.getElementById('remoteVideo_' + peerUuid);
      if (ele)
        ele.remove();
      updateVizForHost();
      //   if (window.vizOption == "photo3d") {
      //   deleteProfile(index);
      // }
    }
    // document.getElementById('frames').removeChild(document.getElementById('remoteVideo_gazed_' + peerUuid));
    // updateLayout();
    if (window.webglScene)
      window.webglScene.updatePlacement();
  }
}

window.videoHeight = window.innerHeight * 0.98;
window.videoWidth = window.innerWidth * 0.98;
function updateLayout() {
  // update CSS grid based on number of diplayed videos
  var rowHeight = '98vh';
  var colWidth = '98vw';
  var topMar = "80px";

  var frameHeight = 600, frameWidth = 800;
  var numVideos = Object.keys(window.peerConnections).length; // do not add one to exclude local video
  var leftImageMar = ((window.innerWidth - frameWidth) / 2).toString() + "px";
  var leftMar = ((window.innerWidth - videoWidth * Math.min(numVideos, 2)) / 2).toString() + "px";

  if (numVideos > 1 && numVideos <= 4) { // 2x2 grid
    rowHeight = '34vh';//'48vh';
    colWidth = '34vw';//'48vw';
    window.videoHeight = 435 * 0.8;
    window.videoWidth = 580 * 0.8;
    frameHeight = 600 * 0.8;
    frameWidth = 800 * 0.8;
    topMar = "60px";
    leftImageMar = ((window.innerWidth - videoWidth * Math.min(numVideos, 2)) / 4 - 90 * 0.75).toString() + "px";
    // todo
    leftMar = ((window.innerWidth - videoWidth * Math.min(numVideos, 2)) / 4).toString() + "px";
    for (var i = 2; i < remoteFrames.length && window.vizOption == "frame"; i++) {
      document.getElementById(window.remoteFrames[i]).style.top = "450px";
      document.getElementById(window.remoteGazedFrames[i]).style.top = "450px";
    }

  } else if (numVideos > 4) { // 3x3 grid
    rowHeight = '27vh';//'32vh';
    colWidth = '27vw';//'32vw';
    videoHeight = '300px';
    videoWidth = '400px';
  }

  console.log(window.innerWidth, videoWidth, numVideos, leftMar, leftImageMar);

  document.documentElement.style.setProperty(`--rowHeight`, rowHeight);
  document.documentElement.style.setProperty(`--localRowHeight`, '32vh');
  document.documentElement.style.setProperty(`--colWidth`, colWidth);
  document.documentElement.style.setProperty(`--videoHeight`, videoHeight.toString() + "px");
  document.documentElement.style.setProperty(`--videoWidth`, videoWidth.toString() + "px");
  document.documentElement.style.setProperty(`--frameHeight`, frameHeight.toString() + "px");
  document.documentElement.style.setProperty(`--frameWidth`, frameWidth.toString() + "px");
  document.documentElement.style.setProperty(`--topMar`, topMar);
  document.documentElement.style.setProperty(`--leftMar`, leftMar);
  document.documentElement.style.setProperty(`--leftImageMar`, leftImageMar);
}

function makeLabel(label) {
  var vidLabel = document.createElement('div');
  vidLabel.appendChild(document.createTextNode(label));
  vidLabel.setAttribute('class', 'videoLabel');
  return vidLabel;
}

function errorHandler(error) {
  console.log(error);
}

// Taken from http://stackoverflow.com/a/105074/515584
// Strictly speaking, it's not a real UUID, but it gets the job done here
function createUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// who is talking?
// do we want to know 'who is talking'?
// here is a record for host
var isAudioRecordStart = false;
var audioRecordEvent = null;
window.startAudioRecord = function () {
  // we need to check that for every one now
  isAudioRecordStart = true;
}

// audioRecordEvent = window.setInterval(function () {
//   Object.keys(window.peerConnections).forEach(peer => {
//     window.peerConnections[peer].pc.getStats(null).then(stats => {
//       stats.forEach(report => {
//         if (report.id.includes("AudioSource")) {
//           if (report.audioLevel) {
//             // console.log(window.peerConnections[peer].displayName, report.audioLevel, report.timestamp);
//             if (isAudioRecordStart && window.host) {
//               window.audioData.push({
//                 "user": window.peerConnections[peer].displayName,
//                 "al": report.audioLevel.toFixed(5),
//                 "ts": report.timestamp
//               });
//             }
//             // update the state
//             // if (window.webglScene.meshes["remoteVideo_" + peer])
//               // window.webglScene.meshes["remoteVideo_" + peer].toggleSpeakingIcon(report.audioLevel > 0.12);
//           }
//         }
//       });
//     });
//   });
// }, 200);

window.debugRender = function (val) {
  Object.keys(window.peerConnections).forEach(peer => {
    if (window.webglScene.meshes["remoteVideo_" + peer]) {
      if (val) {
        window.webglScene.meshes["remoteVideo_" + peer].mesh.scale.z = 1;
      } else {
        window.webglScene.meshes["remoteVideo_" + peer].mesh.scale.z = 0;
      }
    }
  });
}

function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  }
  else {
    pom.click();
  }
}

window.stopAudioRecord = function () {
  isAudioRecordStart = false;
  // window.clearInterval(audioRecordEvent);
  // save data
  download('gazeData' + Date.now() + '.txt', JSON.stringify(window.gazeData));
  window.gazeData = [];
  // download('gazeCoord' + Date.now() + '.txt', JSON.stringify(window.gazeCoord));
  // window.gazeCoord = [];
  download('audioData' + Date.now() + '.txt', JSON.stringify(window.audioData));
  window.audioData = [];
}
const findAudioSource = (element) => element.includes("AudioSource");

// webgazerVideoFeed
window.muteLocalVideo = function () {
  var vid = document.getElementById("localVideoContainer");
  if (vid)
    vid.muted = true;

  var vid = document.getElementById("webgazerVideoFeed");
  if (vid)
    vid.muted = true;
}

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === 'v') {
    webgazer.showPredictionPoints(!webgazer.params.showGazeDot);
    console.log("switch to showGazeDot", webgazer.params.showGazeDot)
  }
  else if (keyName === 't' && window.host) {
    photo3dIndex = 1 - photo3dIndex;
    window.photo3d = photo3dOptions[photo3dIndex];
    console.log("window.photo3d", window.photo3d);
    // send to the server
    window.serverConnection.send(JSON.stringify({
      'photo3d': window.photo3d,
      'dest': 'all'
    }));
  }
}, false);

document.addEventListener("mousedown",
  (e) => {
    if (window.host)
      return;
    if (window.vizOption != "photo3d")
      return;
    // calculate distance btw mouse and each screen
    var dis = window.innerWidth;
    var mouseDst = -1;
    for (let i in window.myCharList) {
      var dx = window.myCharList[i].screenPosX - e.clientX;
      var dy = window.myCharList[i].screenPosY - e.clientY;
      var curDis = Math.sqrt(dx * dx + dy * dy);
      if (curDis < dis) {
        mouseDst = window.myCharList[i].uuid.substring(12);
        dis = curDis;
      }
    }
    if (window.localUuid.length > 0) {
      if (mouseDst == -1)
        window.mapUuidChar["remoteVideo_" + window.localUuid].mouseDst = mouseDst;
      else {
        window.mapUuidChar["remoteVideo_" + window.localUuid].mouseDst = window.mapUuidChar["remoteVideo_" + mouseDst].index;
      }
    }

    if (window.serverConnection && window.serverConnection.readyState == 1) {
      window.serverConnection.send(JSON.stringify({
        'uuid': window.localUuid,
        'mouseDst': mouseDst,
        'dest': 'all'
      }));
    }
  },
  false
);

document.addEventListener("mouseup",
  (e) => {
    if (window.host)
      return;
    if (window.vizOption != "photo3d")
      return;
    if (window.localUuid.length > 0)
      window.mapUuidChar["remoteVideo_" + window.localUuid].mouseDst = -1;
    if (window.serverConnection && window.serverConnection.readyState == 1) {
      window.serverConnection.send(JSON.stringify({
        'uuid': window.localUuid,
        'mouseDst': -1,
        'dest': 'all'
      }));
    }
  },
  false
);

// start();
webgl_animate();