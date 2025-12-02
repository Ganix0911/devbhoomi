import { SceneData, AudioMood, Chapter } from './types';

export const TOTAL_SCENES = 11;
export const SCROLL_HEIGHT_PER_SCENE = 2000; // Pixels of scroll per scene

// Replace this with your desired YouTube Video ID
// Current: Provided link (e5pGt1-Wy04)
export const YOUTUBE_AUDIO_ID = 'e5pGt1-Wy04'; 

export const AUDIO_SOURCES: Record<AudioMood, string> = {
  wind: 'https://assets.mixkit.co/active_storage/sfx/997/997-preview.mp3', // Strong wind
  water: 'https://assets.mixkit.co/active_storage/sfx/120/120-preview.mp3', // River stream
  forest: 'https://assets.mixkit.co/active_storage/sfx/2437/2437-preview.mp3', // Morning birds
  temple: 'https://assets.mixkit.co/active_storage/sfx/617/617-preview.mp3', // Temple bell
};

export const REGION_IMAGES = {
    GARHWAL: 'https://the-shooting-star.com/wp-content/uploads/2014/05/dsc05160.jpg',
    KUMAON: 'https://the-shooting-star.com/wp-content/uploads/2015/05/img_3624.jpg'
};

export const CITY_DISTANCES: Record<string, { km: number, flightTime: number }> = {
    'delhi': { km: 250, flightTime: 0.75 },
    'mumbai': { km: 1670, flightTime: 2.5 },
    'bangalore': { km: 2370, flightTime: 3 },
    'chennai': { km: 2400, flightTime: 3 },
    'kolkata': { km: 1550, flightTime: 2.5 },
    'pune': { km: 1700, flightTime: 2.5 },
    'hyderabad': { km: 1800, flightTime: 2.5 },
    'ahmedabad': { km: 1200, flightTime: 1.5 },
    'jaipur': { km: 500, flightTime: 1 },
    'lucknow': { km: 550, flightTime: 1 },
};

export const REGIONS = {
    GARHWAL: {
        title: "Garhwal",
        subtitle: "The Vertical Realm",
        desc: "Fire made this place. Then ice froze the flame into stone. The mountains here do not welcome; they judge. From the thunder of the upper Ganges to the absolute silence of Nanda Devi, this is where the earth pierces the heavens to speak with God.",
        culture: "Drums echo off the cliffs. The 'Pandav Nritya' is not a dance; it is a war reenacted in snow, performed by a people whose roots split the granite.",
        art: "Koti Banal—towers of wood and stone that have swayed with the earth's tremors for centuries, refusing to bow.",
        vibe: "Raw. Vertical. Divine."
    },
    KUMAON: {
        title: "Kumaon",
        subtitle: "The Whispering Hills",
        desc: "Here, the Himalayas soften. The stone turns to emerald rolls and haunted lakes. The mists hold memory, wrapping around ancient oaks and colonial ghosts. It is a land that sings rather than roars.",
        culture: "The night belongs to the 'Jagar'. The shaman calls, and the ancestors answer, dancing with the living in the flickering firelight.",
        art: "Aipan—sacred geometries drawn in rice paste and red clay, turning every doorstep into a portal for the divine.",
        vibe: "Mystic. Melodic. Timeless."
    }
};

export const PILLARS = [
    {
        title: "The Tether",
        desc: "Stones vibrate with mantras. The river washes away the weight of names. You do not visit; you return.",
        icon: "temple"
    },
    {
        title: "The Penance",
        desc: "The terrain demands a tribute of sweat. The land tests the limits of the human will.",
        icon: "mountain"
    },
    {
        title: "The Shadow",
        desc: "Eyes in the dark. The flash of the Monal. The transition zone where the tropics surrender to the alpine void.",
        icon: "leaf"
    },
    {
        title: "The Void",
        desc: "Beyond the maps. The Darma Valley. Ghost villages where silence is the only language spoken.",
        icon: "map"
    },
    {
        title: "The Bloodline",
        desc: "Epic poems danced in the snow. Red clay protecting the threshold from the encroaching dark.",
        icon: "users"
    },
    {
        title: "The Offering",
        desc: "Food born from hard earth. Smoky greens, nutty hemp, dark soy. A taste older than hunger.",
        icon: "utensils"
    }
];

export const SPIRITUAL_DATA = {
    CHAR_DHAM: [
        { name: "Yamunotri", desc: "The Origin", alt: "3,293m", deity: "The Mother" },
        { name: "Gangotri", desc: "The Source", alt: "3,100m", deity: "The Life-Giver" },
        { name: "Kedarnath", desc: "The Destroyer", alt: "3,583m", deity: "The Transformer" },
        { name: "Badrinath", desc: "The Preserver", alt: "3,133m", deity: "The Sustainer" }
    ],
    PANCH_KEDAR: [ 
        { name: "Kedarnath", part: "The Hump" },
        { name: "Tungnath", part: "The Arms" },
        { name: "Rudranath", part: "The Face" },
        { name: "Madmaheshwar", part: "The Navel" },
        { name: "Kalpeshwar", part: "The Hair" }
    ],
    PANCH_PRAYAG: [ 
        { name: "Vishnuprayag", river: "First Union" }, 
        { name: "Nandaprayag", river: "Blissful Union" }, 
        { name: "Karnaprayag", river: "Ear of Sun" }, 
        { name: "Rudraprayag", river: "Fury's Union" }, 
        { name: "Devprayag", river: "God's Union" }
    ],
    PANCH_BADRI: [ "Badrinath", "Adi Badri", "Vridha Badri", "Bhavishya Badri", "Yog Dhyan Badri" ]
};

export const SEASONS_INFO = [
    {
        name: "Vasant (The Awakening)",
        months: "Mar - Apr",
        desc: "The thaw begins. The valleys bleed crimson with Rhododendrons. The air tastes of melting snow and pine resin.",
        icon: "flower"
    },
    {
        name: "Grishma (The Open Gate)",
        months: "May - Jun",
        desc: "The heat drives humanity upward. The temple doors unbar. The high meadows bask in sharp, blinding sunlight.",
        icon: "sun"
    },
    {
        name: "Varsha (The Deluge)",
        months: "Jul - Sep",
        desc: "The mountains dissolve into mist. The Valley of Flowers explodes. The roads turn to rivers. Dangerous beauty.",
        icon: "cloud-rain"
    },
    {
        name: "Shishir (The Sleep)",
        months: "Dec - Feb",
        desc: "Absolute white silence. The gods sleep. The fires are lit. The snow leopards descend to claim the trails.",
        icon: "snowflake"
    }
];

export const FESTIVALS_INFO = [
    {
        name: "Harela",
        desc: "The Day of Green. We worship the earth's fertility before the harvest begins.",
        region: "Kumaon"
    },
    {
        name: "Bhaitauli",
        desc: "Brothers cross valleys to visit married sisters, carrying gifts to remind them they are not forgotten.",
        region: "Kumaon"
    },
    {
        name: "Phool Dei",
        desc: "Children become messengers of spring, placing fresh flowers on thresholds to welcome the light.",
        region: "All Uttarakhand"
    },
    {
        name: "Bagwal",
        desc: "The War of Stones. Blood is offered to the Goddess Varahi not by sacrifice, but by battle.",
        region: "Champawat"
    },
    {
        name: "Kumaoni Holi",
        desc: "The Musical Trance. Long nights where classical Ragas are sung in the dim glow of lamps.",
        region: "Kumaon"
    }
];

export const CUISINE_INFO = [
    {
        name: "Kafuli",
        desc: "Spinach and fenugreek, slow-cooked in iron until the vessel itself flavors the greens.",
        icon: "leaf"
    },
    {
        name: "Bhatt ki Churkani",
        desc: "Black soybeans from the high slopes. Dark, earthy, tasting of the winter soil.",
        icon: "soup"
    },
    {
        name: "Bhang ki Chutney",
        desc: "Hemp seeds ground on stone with lemon and fire. A sour, nutty heat.",
        icon: "seed"
    },
    {
        name: "Bal Mithai",
        desc: "Khoya roasted until it turns to chocolate fudge. The sweet endurance of Almora.",
        icon: "candy"
    }
];

export const ECO_REALITIES = [
    { title: "The Retreat", desc: "The Gangotri glacier recoils. The source of our holiest river is fleeing from us." },
    { title: "The Inferno", desc: "Winter droughts turn pine needles to tinder. The green lungs turn to ash." },
    { title: "The Wound", desc: "The mountains are young and restless. We cut them, and they bleed landslides." },
    { title: "The Exodus", desc: "1,500 villages stand silent. The ancestral homes return to the forest." }
];

export const CHAPTERS: Chapter[] = [
  {
    id: 'chap-1',
    roman: 'I',
    title: 'The Guardians',
    triggerIndex: 0.35
  },
  {
    id: 'chap-2',
    roman: 'II',
    title: 'Rivers of Memory',
    triggerIndex: 1.35
  },
  {
    id: 'chap-3',
    roman: 'III',
    title: 'The Wild Heart',
    triggerIndex: 3.35
  },
  {
    id: 'chap-4',
    roman: 'IV',
    title: 'Life Above Clouds',
    triggerIndex: 5.35
  },
  {
    id: 'chap-5',
    roman: 'V',
    title: 'Eternal Silence',
    triggerIndex: 8.35
  }
];

export const SCENES: SceneData[] = [
  {
    id: 'intro',
    title: 'DEVBHOOMI',
    subtitle: 'The Land of Gods',
    description: 'Earth ends here. Only the sky remains. The wind does not blow; it recites ancient mantras. The soil holds the memory of the divine.',
    imageBg: 'https://www.euttaranchal.com/tourism/_imgs/uttarakhand-slider-2.webp', 
    color: '#ffffff', 
    cameraEffect: 'zoom-in',
    audioMood: 'wind',
  },
  {
    id: 'scene-01',
    title: 'The Summit',
    subtitle: 'Nanda Devi',
    description: 'She is not a mountain. She is the Bliss-Giving Goddess. A sanctuary of ice watching the world burn and freeze from her throne of white silence.',
    imageBg: 'https://t.eucdn.in/tourism/lg/auli-7440660.webp',
    color: '#cffafe', // cyan-100
    cameraEffect: 'pan-right',
    audioMood: 'wind',
  },
  {
    id: 'scene-02',
    title: 'The Divine River',
    subtitle: 'Rishikesh',
    description: 'The air vibrates with a thousand bells. Here, the Ganga is not water; she is a turquoise deity crashing against the feet of the faithful.',
    imageBg: 'https://t.eucdn.in/tourism/lg/rishikesh-3715497.webp',
    color: '#bae6fd', // sky-200
    cameraEffect: 'zoom-out',
    audioMood: 'water',
  },
  {
    id: 'scene-03',
    title: 'Sacred Stones',
    subtitle: 'Kedarnath',
    description: 'A cathedral of stone standing defiant against the glacier. The air is thin. The cold is absolute. The devotion is heavier than the granite walls.',
    imageBg: 'https://t.eucdn.in/tourism/lg/kedarnath-2802883.webp',
    color: '#fde68a', // amber-200
    cameraEffect: 'zoom-in',
    audioMood: 'temple',
  },
  {
    id: 'scene-04',
    title: 'Silent Hunter',
    subtitle: 'Jim Corbett',
    description: 'The jungle holds its breath. In the dense Sal forests, the stripes of the Royal Bengal merge with the shadows. You are no longer the master.',
    imageBg: 'https://static.toiimg.com/thumb/115448713/jim-corbett.jpg?width=1200&height=900',
    color: '#bef264', // lime-300
    cameraEffect: 'pan-left',
    audioMood: 'forest',
  },
  {
    id: 'scene-05',
    title: 'Valley of Flowers',
    subtitle: 'Bhyundar Valley',
    description: 'Nature’s own hallucination. For a few weeks, the meadow explodes into a riot of Blue Poppies, erasing the line between earth and dream.',
    imageBg: 'https://t.eucdn.in/tourism/lg/valley-of-flowers-5353172.webp',
    color: '#f5d0fe', // fuchsia-200
    cameraEffect: 'zoom-out',
    audioMood: 'forest',
  },
  {
    id: 'scene-06',
    title: 'Lord of Peaks',
    subtitle: 'Tungnath',
    description: 'The highest temple of Shiva. Where the bells ring across the peaks of Chaukhamba, echoing a mythology older than history.',
    imageBg: 'https://t.eucdn.in/tourism/lg/tungnath-4142887.webp',
    color: '#e9d5ff', // purple-200
    cameraEffect: 'pan-left',
    audioMood: 'temple',
  },
  {
    id: 'scene-07',
    title: 'Mini Switzerland',
    subtitle: 'Chopta',
    description: 'Rolling velvet meadows surrounded by ancient deodars. A window to the greater Himalayas, untouched, silent, and infinitely vast.',
    imageBg: 'https://t.eucdn.in/tourism/lg/chopta-8127908.webp',
    color: '#bbf7d0', // green-200
    cameraEffect: 'zoom-in',
    audioMood: 'forest',
  },
  {
    id: 'scene-08',
    title: 'Valley of Gods',
    subtitle: 'Har Ki Dun',
    description: 'The cradle of legends. Where the Pandavas walked to heaven. Time stops in villages on stilts, watched over by the Swargarohini peak.',
    imageBg: 'https://t.eucdn.in/tourism/lg/swargarohini-2909400.webp',
    color: '#e2e8f0', // slate-200
    cameraEffect: 'pan-right',
    audioMood: 'water',
  },
  {
    id: 'scene-09',
    title: 'The Winter Summit',
    subtitle: 'Kedarkantha',
    description: 'When the world freezes, this peak rises in white perfection. A triangular summit offering a theater of snow, sun, and silence.',
    imageBg: 'https://t.eucdn.in/tourism/lg/kedarkantha-7229410.webp',
    color: '#bae6fd', // sky-200
    cameraEffect: 'zoom-out',
    audioMood: 'wind',
  },
  {
    id: 'scene-10',
    title: 'The Hidden Gem',
    subtitle: 'Madmaheshwar',
    description: 'The Hidden Navel of Shiva. Far from the crowds, deep in a meadow encircled by peaks, lies a sanctuary of absolute solitude.',
    imageBg: 'https://himalayashelter.s3.ap-south-1.amazonaws.com/12_feb_2025_08_55_06-madmaheshwar46.jpg',
    color: '#fde68a', // amber-200
    cameraEffect: 'zoom-in',
    audioMood: 'temple',
  }
];

interface TripData {
    days: number;
    pricePerPerson: number;
    region: 'Garhwal' | 'Kumaon';
    baseCamp: string;
    distanceFromHub: number; 
    difficulty: number; 
    bestMonths: string[];
    nearestHub: string;
}

export const TRIP_DATABASE: Record<string, TripData> = {
  'The Summit': { days: 6, pricePerPerson: 18500, region: 'Garhwal', baseCamp: 'Joshimath', distanceFromHub: 290, difficulty: 7, bestMonths: ['Jun', 'Jul', 'Aug', 'Sep'], nearestHub: 'Dehradun (DED)' },
  'The Divine River': { days: 3, pricePerPerson: 6500, region: 'Garhwal', baseCamp: 'Rishikesh', distanceFromHub: 20, difficulty: 1, bestMonths: ['Oct', 'Nov', 'Mar', 'Apr'], nearestHub: 'Dehradun (DED)' },
  'Sacred Stones': { days: 5, pricePerPerson: 14000, region: 'Garhwal', baseCamp: 'Sonprayag', distanceFromHub: 210, difficulty: 8, bestMonths: ['May', 'Jun', 'Sep', 'Oct'], nearestHub: 'Dehradun (DED)' },
  'Silent Hunter': { days: 3, pricePerPerson: 9500, region: 'Kumaon', baseCamp: 'Ramnagar', distanceFromHub: 80, difficulty: 2, bestMonths: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'], nearestHub: 'Pantnagar (PGH)' },
  'Valley of Flowers': { days: 6, pricePerPerson: 16500, region: 'Garhwal', baseCamp: 'Govindghat', distanceFromHub: 270, difficulty: 5, bestMonths: ['Jul', 'Aug', 'Sep'], nearestHub: 'Dehradun (DED)' },
  'Lord of Peaks': { days: 4, pricePerPerson: 10500, region: 'Garhwal', baseCamp: 'Chopta', distanceFromHub: 200, difficulty: 5, bestMonths: ['Apr', 'May', 'Oct', 'Nov'], nearestHub: 'Dehradun (DED)' },
  'Mini Switzerland': { days: 3, pricePerPerson: 7500, region: 'Garhwal', baseCamp: 'Chopta', distanceFromHub: 200, difficulty: 3, bestMonths: ['Mar', 'Apr', 'May', 'Oct', 'Nov', 'Dec'], nearestHub: 'Dehradun (DED)' },
  'Valley of Gods': { days: 7, pricePerPerson: 19000, region: 'Garhwal', baseCamp: 'Sankri', distanceFromHub: 190, difficulty: 6, bestMonths: ['May', 'Jun', 'Sep', 'Oct'], nearestHub: 'Dehradun (DED)' },
  'The Winter Summit': { days: 5, pricePerPerson: 11500, region: 'Garhwal', baseCamp: 'Sankri', distanceFromHub: 190, difficulty: 6, bestMonths: ['Dec', 'Jan', 'Feb', 'Mar'], nearestHub: 'Dehradun (DED)' },
  'The Hidden Gem': { days: 6, pricePerPerson: 14500, region: 'Garhwal', baseCamp: 'Ukhimath', distanceFromHub: 180, difficulty: 7, bestMonths: ['May', 'Jun', 'Sep', 'Oct'], nearestHub: 'Dehradun (DED)' },
  'Kuari Pass': { days: 5, pricePerPerson: 12500, region: 'Garhwal', baseCamp: 'Joshimath', distanceFromHub: 290, difficulty: 4, bestMonths: ['Dec', 'Jan', 'Mar', 'Apr'], nearestHub: 'Dehradun (DED)' },
  'Roopkund': { days: 8, pricePerPerson: 22000, region: 'Garhwal', baseCamp: 'Lohajung', distanceFromHub: 230, difficulty: 8, bestMonths: ['Jun', 'Sep'], nearestHub: 'Dehradun (DED)' },
  'Nag Tibba': { days: 2, pricePerPerson: 4500, region: 'Garhwal', baseCamp: 'Pantwari', distanceFromHub: 90, difficulty: 3, bestMonths: ['All Year'], nearestHub: 'Dehradun (DED)' },
  'Pindari Glacier': { days: 7, pricePerPerson: 17500, region: 'Kumaon', baseCamp: 'Loharkhet', distanceFromHub: 180, difficulty: 6, bestMonths: ['May', 'Jun', 'Sep', 'Oct'], nearestHub: 'Pantnagar (PGH)' }
};