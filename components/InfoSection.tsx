import React, { useState, useEffect, useRef } from 'react';
import { SCENES, REGIONS, SPIRITUAL_DATA, SEASONS_INFO, FESTIVALS_INFO, ECO_REALITIES, CUISINE_INFO, TRIP_DATABASE, CITY_DISTANCES, REGION_IMAGES } from '../constants';
import { 
  Users, MapPin, CheckCircle, Loader2, X, 
  Mountain, Thermometer, History, Feather, 
  Info, Clock, IndianRupee, AlertTriangle, Leaf, BookOpen, 
  Skull, Sprout, Wind, Headphones, Play, Pause, 
  Mic, Utensils, Compass, Plane, Bus, Route,
  ChevronDown, ChevronUp, Palette, Music, Snowflake, Sun, CloudRain,
  ArrowRight
} from 'lucide-react';

// --- TYPES & DATA ---

interface LocationDetail {
  location: string;
  altitude: string;
  climate: string;
  significance: string;
  history: string;
  tradition: string;
  folklore: string;
  festivals: string;
  craft: string;
  community: string;
  ecology: string;
  wildlife: string;
  threat: string;
  riskLevel: 'Moderate' | 'High' | 'Critical';
  coordinates: { x: number, y: number }; 
}

const LOCATION_DETAILS: Record<string, LocationDetail> = {
  'The Summit': {
    location: 'Chamoli, Nanda Devi Biosphere',
    altitude: '7,816m',
    climate: 'Polar Silence',
    significance: 'She is the White Goddess who demands silence. A sanctuary of ice that watches empires rise and fall, indifferent to time.',
    history: 'A protected citadel since 1982. The mountains here hide secrets—including a lost nuclear device from 1965 that still whispers in the deep crevices.',
    tradition: 'Every 12 years, the Raj Jat Yatra escorts a four-horned ram into the ice, a final, tearful farewell to the daughter of the hills.',
    folklore: 'Legend speaks of Nanda, a princess of Kumaon, pursued by a Rohilla prince. To save her honor, she fled to the highest snows. As the enemy closed in, the mountain opened its stone heart to receive her. She became the mountain itself—the Bliss-Giving Goddess. Locals believe the plume of snow blowing from the summit is Nanda lighting her hearth. She protects the valley, but her wrath is swift against those who defile her sanctuary.',
    festivals: 'Nanda Ashtami - The day the goddess turns her back on the valley to return to her husband, Shiva.',
    craft: 'Ringaal basketry woven from the reeds of the lower rivers.',
    community: 'The Bhotia and Tolcha traders, who once walked the silk routes across the snow.',
    ecology: 'A fortress of peaks protecting a unique micro-climate found nowhere else on earth.',
    wildlife: 'The elusive Snow Leopard and the Blue Sheep that watches from the cliffs.',
    threat: 'The ice is retreating. The goddess is withdrawing her white veil.',
    riskLevel: 'High',
    coordinates: { x: 65, y: 35 }
  },
  'The Divine River': {
    location: 'Rishikesh, Dehradun',
    altitude: '340m',
    climate: 'River Mist',
    significance: 'The gateway where the human spirit attempts to merge with the divine current.',
    history: 'From ancient sages to modern seekers, this river bank has absorbed the prayers of the lost and the found for millennia.',
    tradition: 'At twilight, the Ganga Aarti offers fire to water, a synchronized gratitude to the life-giver that flows from the locks of Shiva.',
    folklore: 'Lakshman crossed these waters on jute ropes, a bridge of penance that still holds the name Lakshman Jhula.',
    festivals: 'The International Yoga Festival - where breath aligns with the rhythm of the river.',
    craft: 'The carving of sacred beads and the sculpting of idols from river clay.',
    community: 'A confluence of Sadhus, seekers, and the Garhwali guardians.',
    ecology: 'Riverine forests of Sheesham drinking from the glacial melt.',
    wildlife: 'The Golden Mahseer swimming against the current and the migratory waterfowls.',
    threat: 'Concrete is encroaching on the banks. The river struggles to breathe.',
    riskLevel: 'Critical',
    coordinates: { x: 25, y: 75 }
  },
  'Sacred Stones': {
    location: 'Rudraprayag',
    altitude: '3,583m',
    climate: 'Glacial Wind',
    significance: 'The highest of the twelve lights of Shiva. A place where the destroyer dwells.',
    history: 'Buried under snow for four centuries during the Little Ice Age, the temple emerged unscathed—a testament to stone and faith.',
    tradition: 'The head priest comes from Karnataka, binding the north and south in a single thread of devotion.',
    folklore: 'The Pandavas sought Shiva; he hid as a bull. Bhima caught the hump, and that stone hump remains as the Kedar Lingam.',
    festivals: 'Annakoot - The temple is buried in rice before the long winter sleep begins.',
    craft: 'The ancient art of Katyuri stone carving.',
    community: 'The stoic priests and keepers who brave the valley\'s wrath.',
    ecology: 'A landscape of glacial moraines and high-altitude meadows.',
    wildlife: 'The Himalayan Tahr standing sentinel on the cliffs above.',
    threat: 'The valley groans under the weight of too many footsteps. The memory of 2013 is still fresh.',
    riskLevel: 'Critical',
    coordinates: { x: 45, y: 35 }
  },
  'Silent Hunter': {
    location: 'Ramnagar, Nainital',
    altitude: '360m',
    climate: 'Dense Jungle',
    significance: 'The oldest sanctuary. Where the stripes of the tiger merge with the shadows of the Sal trees.',
    history: 'Named after the hunter who put down his rifle to become the jungle\'s greatest guardian.',
    tradition: 'The worship of Bhumia, the Lord of the Land, who protects the cattle from the jaws of the night.',
    folklore: 'Tales of the Bachelor of Powalgarh, a tiger so immense he became a myth before he became a trophy.',
    festivals: 'Vasant Panchami - Celebrating the first green shoots in the forest.',
    craft: 'Furniture woven from the invasive Lantana weed.',
    community: 'The Van Gujjars, who know the tiger\'s path better than their own.',
    ecology: 'Massive Sal forests and the life-giving Ramganga river.',
    wildlife: 'The Royal Bengal Tiger, the Asiatic Elephant, and the waiting Gharial.',
    threat: 'Resorts block the ancient corridors. The elephant has nowhere to walk.',
    riskLevel: 'High',
    coordinates: { x: 55, y: 85 }
  },
  'Valley of Flowers': {
    location: 'Chamoli',
    altitude: '3,600m',
    climate: 'Floral Mist',
    significance: 'A fleeting hallucination of nature. For a few weeks, the earth laughs in color.',
    history: 'Lost to the world until Frank Smythe stumbled into it in 1931 and forgot his way home.',
    tradition: 'Locals believe fairies dance here. They do not stay after dark, for the beauty belongs to the spirits.',
    folklore: 'This is Nandan Kanan, the garden of Indra, where Hanuman searched for the herb of life.',
    festivals: 'The festival is the bloom itself.',
    craft: 'The silence of the protected zone.',
    community: 'The Bhyundar villagers, guardians of the gate.',
    ecology: '520 species of plants waking up all at once.',
    wildlife: 'The Asiatic Black Bear and the Red Fox wandering through the petals.',
    threat: 'Invasive weeds are choking the native blooms. The colors are fading.',
    riskLevel: 'Moderate',
    coordinates: { x: 60, y: 30 }
  },
  'Lord of Peaks': {
    location: 'Rudraprayag',
    altitude: '3,680m',
    climate: 'Alpine Thin Air',
    significance: 'The Arms of Shiva. The highest point where the bells ring.',
    history: 'A temple standing for a millennium, defying the lightning and the snow.',
    tradition: 'In winter, the deity descends to the valley, leaving the peak to the wind.',
    folklore: 'Ravana wept here, his tears echoing off the Chandrashila peak to please Shiva.',
    festivals: 'Mahashivratri - A night vigil in the freezing dark.',
    craft: 'Wood that tells stories.',
    community: 'The Maithani guardians.',
    ecology: 'Forests of Rhododendron that bleed red in the spring.',
    wildlife: 'The iridescent Monal flying across the abyss.',
    threat: 'New paths cut deep wounds into the fragile soil.',
    riskLevel: 'Moderate',
    coordinates: { x: 48, y: 40 }
  },
  'Mini Switzerland': {
    location: 'Chopta',
    altitude: '2,680m',
    climate: 'Temperate Breeze',
    significance: 'A velvet meadow suspended in the sky. A place to breathe.',
    history: 'Once a grazing ground for cattle, now a grazing ground for the soul.',
    tradition: 'Offerings to the Earth God before the herds are let loose.',
    folklore: 'The playground of Gandharvas, the celestial musicians.',
    festivals: 'Harela - Celebrating the green blood of the earth.',
    craft: 'Weaving the warmth of wool.',
    community: 'The nomadic herders.',
    ecology: 'Ancient Oaks and Deodars standing guard.',
    wildlife: 'The Barking Deer calling in the twilight.',
    threat: 'Plastic flowers are blooming in the meadows.',
    riskLevel: 'High',
    coordinates: { x: 47, y: 45 }
  },
  'Valley of Gods': {
    location: 'Har Ki Dun',
    altitude: '3,566m',
    climate: 'Cold Shadow',
    significance: 'The path to heaven. The valley where time refuses to move forward.',
    history: 'Villages that worship Duryodhana, flipping the script of the great epic.',
    tradition: 'A society that shares everything, even marriage, mirroring the Pandavas.',
    folklore: 'The dog that followed Yudhishthira to heaven walked this very path.',
    festivals: 'Someshwar Mela - The deity travels on the shoulders of men.',
    craft: 'Houses built like fortresses against the cold.',
    community: 'The people of Rawai, the last keepers of the old ways.',
    ecology: 'Birch forests that look like ghosts in the mist.',
    wildlife: 'The Blue Sheep watching from the crags.',
    threat: 'Concrete is burying the ancient wood.',
    riskLevel: 'High',
    coordinates: { x: 20, y: 20 }
  },
  'The Winter Summit': {
    location: 'Kedarkantha',
    altitude: '3,800m',
    climate: 'Deep Snow',
    significance: 'A perfect triangle of white. The theater of the winter sun.',
    history: 'Not a temple, but a meditation. A place to confront the self.',
    tradition: 'The dance of the Pandavas is performed in the snow-bound villages below.',
    folklore: 'Shiva sat here to meditate, but the bull\'s bellow drove him to Kedarnath.',
    festivals: 'The Winter Magh Mela.',
    craft: 'Knitting against the cold.',
    community: 'The Rawain folk.',
    ecology: 'Oak forests that turn into a white desert.',
    wildlife: 'The Golden Eagle circling the thermals.',
    threat: 'Too many feet are trampling the silence.',
    riskLevel: 'Moderate',
    coordinates: { x: 22, y: 25 }
  },
  'The Hidden Gem': {
    location: 'Madmaheshwar',
    altitude: '3,497m',
    climate: 'Wet Alpine',
    significance: 'The Navel of the Lord. A sanctuary of solitude.',
    history: 'Hidden so deep that only the truly called find their way.',
    tradition: 'Priests from the south maintaining a bond that spans a continent.',
    folklore: 'Where the navel of the divine bull resurfaced from the earth.',
    festivals: 'The descent of the doli in November.',
    craft: 'Weaving bamboo from the lower valleys.',
    community: 'The keepers of Ukhimath.',
    ecology: 'High wetlands that mirror the sky.',
    wildlife: 'Butterflies that drink from the glacial melt.',
    threat: 'Roads are inching closer, threatening to shatter the peace.',
    riskLevel: 'Moderate',
    coordinates: { x: 50, y: 40 }
  }
};

const TOOLTIP_CONTEXT: Record<string, string> = {
    altitude: "The thinness of the air. The closeness to the sky.",
    climate: "The mood of the elements you must endure.",
    risk: "The fragility of the landscape. Tread lightly.",
    significance: "Why this place haunts the collective memory.",
};

// --- HELPER COMPONENTS ---

// Scroll Reveal Hook
const useReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const WithTooltip: React.FC<{ label: string; text: string; icon: React.ReactNode }> = ({ label, text, icon }) => (
    <div className="group relative flex items-center gap-2 cursor-help w-max">
        {icon}
        <div className="fixed md:absolute bottom-auto md:bottom-full left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto md:mb-2 md:w-56 bg-black/90 backdrop-blur border border-white/20 text-gray-300 text-[10px] p-3 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
            <span className="font-bold text-amber-200 block mb-1 uppercase tracking-wider">{label}</span>
            {text}
        </div>
    </div>
);

const MiniMap: React.FC<{ x: number, y: number, label: string }> = ({ x, y, label }) => {
    return (
        <div className="relative w-full aspect-video bg-[#0a0a0a] rounded border border-white/10 overflow-hidden mb-4 group">
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }} />
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-white/5" fill="currentColor">
                <path d="M 20 10 L 60 5 L 90 20 L 95 60 L 80 90 L 40 95 L 10 70 Z" />
            </svg>
            <div 
                className="absolute w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)] z-10 animate-pulse"
                style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
            />
            <div 
                className="absolute text-[10px] text-white/70 font-mono uppercase tracking-widest bg-black/80 px-2 py-1 border border-white/10 z-20"
                style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -150%)' }}
            >
                {label}
            </div>
        </div>
    );
};

const LoreAccordion: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/5 last:border-0">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors px-3 group"
            >
                <div className="flex items-center gap-3">
                    <div className="text-amber-200/60 group-hover:text-amber-200 transition-colors">{icon}</div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{title}</span>
                </div>
                {isOpen ? <ChevronUp size={14} className="text-amber-200" /> : <ChevronDown size={14} className="text-gray-600 group-hover:text-white" />}
            </button>
            <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 pt-0 pl-10 text-sm text-gray-400 leading-relaxed italic border-l border-white/5 ml-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- SECTIONS ---

const Manifesto: React.FC = () => {
    const { ref, isVisible } = useReveal();
    return (
        <div ref={ref} className={`py-32 max-w-5xl mx-auto text-center px-6 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block mb-8 p-3 border border-red-500/30 rounded-full bg-red-950/10 backdrop-blur-sm">
                <Skull size={24} className="text-red-500" />
            </div>
            <h2 className="font-cinematic text-4xl md:text-7xl text-white mb-10 leading-[0.9] tracking-tight">
                The Mountains Are <br/><span className="text-red-500 italic font-serif">Bleeding</span>.
            </h2>
            <div className="space-y-8 text-lg md:text-2xl text-gray-400 font-sans font-light leading-relaxed max-w-3xl mx-auto">
                <p>
                    We call it <em>Devbhoomi</em>. But the gods are retreating.
                    The glaciers are recoiling in silence. 
                    The ancient paths are sinking.
                </p>
                <p className="text-white border-l-2 border-red-500 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                    To come here is to bear witness. To walk these paths is a burden of responsibility.
                    What footprint will you leave on the snow?
                </p>
            </div>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-red-500/50 to-transparent mx-auto mt-20" />
        </div>
    );
};

const EcoRealitiesSection: React.FC = () => {
    const { ref, isVisible } = useReveal(0.2);
    return (
        <div ref={ref} className={`max-w-7xl mx-auto px-4 md:px-12 mb-32 transition-all duration-1000 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="font-cinematic text-sm md:text-base text-center text-red-500/80 mb-16 uppercase tracking-[0.4em] flex items-center justify-center gap-4">
                <span className="h-px w-8 bg-red-900"/> The Warning <span className="h-px w-8 bg-red-900"/>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
                {ECO_REALITIES.map((item, idx) => (
                    <div key={idx} className="bg-[#080808] p-8 hover:bg-red-950/10 transition-colors duration-500 group relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
                        <h4 className="text-red-200 font-cinematic text-lg mb-4">{item.title}</h4>
                        <p className="text-gray-500 text-xs leading-loose group-hover:text-gray-300 transition-colors">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const RegionSplit: React.FC = () => {
    const { ref, isVisible } = useReveal(0.2);
    return (
        <div ref={ref} className={`max-w-full mx-auto mb-32 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
                {/* Garhwal */}
                <div className="relative group overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
                        style={{ backgroundImage: `url('${REGION_IMAGES.GARHWAL}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"/>
                    <div className="relative h-full flex flex-col justify-end p-12 lg:p-24 z-10">
                        <h4 className="font-cinematic text-5xl md:text-7xl text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">{REGIONS.GARHWAL.title}</h4>
                        <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-8">{REGIONS.GARHWAL.subtitle}</p>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-md opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 delay-100 border-l border-amber-500 pl-4">{REGIONS.GARHWAL.desc}</p>
                        <div className="flex gap-12 text-xs uppercase tracking-widest text-white/40">
                             <div>
                                <span className="block text-white mb-1">Pulse</span>
                                {REGIONS.GARHWAL.vibe}
                             </div>
                        </div>
                    </div>
                </div>

                {/* Kumaon */}
                <div className="relative group overflow-hidden">
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
                        style={{ backgroundImage: `url('${REGION_IMAGES.KUMAON}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"/>
                    <div className="relative h-full flex flex-col justify-end p-12 lg:p-24 z-10 text-left lg:text-right items-start lg:items-end">
                        <h4 className="font-cinematic text-5xl md:text-7xl text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">{REGIONS.KUMAON.title}</h4>
                        <p className="text-green-400 text-xs uppercase tracking-[0.3em] mb-8">{REGIONS.KUMAON.subtitle}</p>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-md opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 delay-100 border-l lg:border-l-0 lg:border-r border-green-500 pl-4 lg:pl-0 lg:pr-4">{REGIONS.KUMAON.desc}</p>
                         <div className="flex gap-12 text-xs uppercase tracking-widest text-white/40">
                             <div className="text-left lg:text-right">
                                <span className="block text-white mb-1">Pulse</span>
                                {REGIONS.KUMAON.vibe}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SeasonsSection: React.FC = () => {
    const { ref, isVisible } = useReveal(0.2);
    const getIcon = (icon: string) => {
        switch(icon) {
            case 'flower': return <Sprout size={20} className="text-pink-300" />;
            case 'sun': return <Sun size={20} className="text-amber-300" />;
            case 'cloud-rain': return <CloudRain size={20} className="text-blue-300" />;
            case 'snowflake': return <Snowflake size={20} className="text-cyan-200" />;
            default: return <Clock size={20} />;
        }
    };

    return (
        <div ref={ref} className={`max-w-7xl mx-auto px-6 mb-32 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col items-center mb-16">
                <div className="h-16 w-px bg-gradient-to-b from-transparent to-white/20 mb-6"/>
                <h3 className="font-cinematic text-2xl text-white uppercase tracking-[0.2em] text-center">The Turning of the Wheel</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {SEASONS_INFO.map((season, idx) => (
                    <div key={idx} className="group border border-white/5 bg-[#0a0a0a] p-8 hover:border-white/20 transition-all duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">{getIcon(season.icon)}</div>
                        <span className="text-xs text-white/30 uppercase tracking-widest block mb-4 group-hover:text-amber-200 transition-colors">{season.months}</span>
                        <h4 className="text-white font-cinematic text-xl mb-4 group-hover:translate-x-2 transition-transform duration-300">{season.name}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed border-t border-white/5 pt-4 group-hover:text-gray-300 transition-colors">{season.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SpiritualSection: React.FC = () => {
    const { ref, isVisible } = useReveal(0.1);
    return (
        <div ref={ref} className={`mb-32 bg-[#050505] py-24 border-y border-white/5 relative overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.1)_0%,transparent_70%)]"/>
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <h3 className="font-cinematic text-3xl text-center text-amber-100/90 mb-2 uppercase tracking-[0.2em]">The Geometry of the Soul</h3>
                <p className="text-center text-white/30 text-xs uppercase tracking-widest mb-20">The Map of the Divine</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-16">
                         <div className="border-l-2 border-amber-500/50 pl-6 relative">
                             <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_orange]"/>
                            <h4 className="text-white font-cinematic text-2xl mb-6">The Cardinal Anchors</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {SPIRITUAL_DATA.CHAR_DHAM.map((dham, idx) => (
                                    <div key={idx} className="group">
                                        <div className="text-amber-200 font-bold mb-1 group-hover:text-white transition-colors">{dham.name}</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">{dham.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* The Body of Shiva */}
                        <div className="border-l-2 border-purple-500/50 pl-6 relative">
                             <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_purple]"/>
                             <h4 className="text-white font-cinematic text-2xl mb-6">The Body of Shiva</h4>
                            <div className="flex flex-wrap gap-3">
                                {SPIRITUAL_DATA.PANCH_KEDAR.map((k, idx) => (
                                    <div key={idx} className="px-4 py-2 bg-purple-900/10 border border-purple-500/20 rounded-full hover:bg-purple-900/20 hover:border-purple-500/40 transition-all cursor-default group">
                                        <span className="text-purple-100 text-xs font-bold mr-1 group-hover:text-white transition-colors">{k.name}</span>
                                        <span className="text-purple-400/60 text-[10px] uppercase tracking-wider">({k.part})</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* The Confluences */}
                        <div className="border-l-2 border-blue-500/50 pl-6 relative">
                             <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_blue]"/>
                             <h4 className="text-white font-cinematic text-2xl mb-6">The Confluences</h4>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                {SPIRITUAL_DATA.PANCH_PRAYAG.map((p, idx) => (
                                    <div key={idx} className="flex items-baseline gap-2 group">
                                        <span className="text-blue-100 font-bold text-sm group-hover:text-white transition-colors">{p.name}:</span>
                                        <span className="text-blue-400/60 text-xs uppercase tracking-wide">{p.river}</span>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>

                    <div className="relative aspect-square hidden lg:flex items-center justify-center opacity-60">
                         {/* Abstract Geometric SVG representation */}
                         <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_60s_linear_infinite]">
                             <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/20"/>
                             <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-amber-500/30"/>
                             <path d="M100 10 L178 145 L22 145 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/20"/>
                             <path d="M100 190 L22 55 L178 55 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/20"/>
                         </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FestivalsSection: React.FC = () => {
    const { ref, isVisible } = useReveal(0.2);
    return (
        <div ref={ref} className={`max-w-7xl mx-auto px-6 mb-32 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="font-cinematic text-2xl text-left text-white mb-12 uppercase tracking-[0.2em] border-l-4 border-white/20 pl-6">Rituals of Blood and Stone</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {FESTIVALS_INFO.map((fest, idx) => (
                    <div key={idx} className="bg-[#0f0f0f] border border-white/5 p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-500 h-full">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full group-hover:from-amber-500/10 transition-colors duration-500" />
                        <span className="text-[10px] text-amber-500/70 uppercase tracking-widest block mb-4">{fest.region}</span>
                        <h4 className="text-white font-cinematic text-2xl mb-4 group-hover:translate-x-2 transition-transform duration-300">{fest.name}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{fest.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CuisineSection: React.FC = () => {
    const { ref, isVisible } = useReveal(0.2);
    return (
        <div ref={ref} className={`max-w-7xl mx-auto px-6 mb-32 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="font-cinematic text-2xl text-left md:text-right text-white mb-12 uppercase tracking-[0.2em] border-l-4 md:border-l-0 md:border-r-4 border-white/20 pl-6 md:pl-0 md:pr-6">The Taste of Earth</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                 {CUISINE_INFO.map((item, idx) => (
                    <div key={idx} className="bg-[#0a0a0a] border border-white/5 p-8 flex flex-col items-center text-center hover:bg-white/5 transition-all duration-500 group">
                        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 text-amber-200/50 group-hover:text-amber-200 group-hover:scale-110 group-hover:border-amber-200/30 transition-all duration-500">
                            <Utensils size={24} strokeWidth={1} />
                        </div>
                        <h4 className="text-white font-cinematic text-lg mb-4">{item.name}</h4>
                        <div className="w-8 h-px bg-white/10 mb-4 group-hover:w-16 group-hover:bg-amber-500/50 transition-all duration-500"/>
                        <p className="text-gray-500 text-xs leading-relaxed italic group-hover:text-gray-400">"{item.desc}"</p>
                    </div>
                 ))}
            </div>
        </div>
    );
};

const AdventureTable: React.FC = () => {
    const { ref, isVisible } = useReveal(0.2);
    return (
        <div ref={ref} className={`max-w-5xl mx-auto px-6 mb-32 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
             <div className="flex flex-col items-center mb-16">
                 <h3 className="font-cinematic text-2xl text-white mb-2 uppercase tracking-[0.2em]">Ascensions</h3>
                 <div className="flex items-center gap-4">
                     <span className="h-px w-12 bg-white/10" />
                     <p className="text-white/40 text-xs uppercase tracking-widest">The Price of Passage</p>
                     <span className="h-px w-12 bg-white/10" />
                 </div>
             </div>
             
             {/* Desktop Table */}
             <div className="hidden md:block overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                     <thead>
                         <tr className="border-b border-white/10 text-white/30 text-[10px] uppercase tracking-widest">
                             <th className="p-6 font-normal">The Path</th>
                             <th className="p-6 font-normal">The Realm</th>
                             <th className="p-6 font-normal">Origin Point</th>
                             <th className="p-6 font-normal">Duration of Spirit</th>
                             <th className="p-6 font-normal">The Toll</th>
                         </tr>
                     </thead>
                     <tbody className="text-sm text-gray-400">
                         {Object.entries(TRIP_DATABASE)
                            .filter(([_, data]) => data.difficulty > 2)
                            .sort((a, b) => b[1].difficulty - a[1].difficulty)
                            .map(([name, data], idx) => (
                             <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                 <td className="p-6 font-cinematic text-lg text-white group-hover:text-amber-200 transition-colors">{name}</td>
                                 <td className="p-6 text-xs uppercase tracking-wider">{data.region}</td>
                                 <td className="p-6 text-xs uppercase tracking-wider">{data.baseCamp}</td>
                                 <td className="p-6 italic">{data.days} Days in the Void</td>
                                 <td className="p-6">
                                     <div className="flex items-center gap-2">
                                         <div className={`w-1.5 h-1.5 rounded-full ${data.difficulty > 6 ? 'bg-red-500 shadow-[0_0_8px_red]' : data.difficulty > 3 ? 'bg-amber-500' : 'bg-green-500'}`} />
                                         <span className="text-xs font-mono">{data.difficulty}/10</span>
                                     </div>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>

             {/* Mobile Card View */}
             <div className="md:hidden space-y-4">
                 {Object.entries(TRIP_DATABASE)
                    .filter(([_, data]) => data.difficulty > 2)
                    .sort((a, b) => b[1].difficulty - a[1].difficulty)
                    .map(([name, data], idx) => (
                    <div key={idx} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-cinematic text-xl text-white mb-1">{name}</h4>
                                <span className="text-[10px] uppercase tracking-widest text-amber-500/70">{data.region}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded">
                                <div className={`w-1.5 h-1.5 rounded-full ${data.difficulty > 6 ? 'bg-red-500' : data.difficulty > 3 ? 'bg-amber-500' : 'bg-green-500'}`} />
                                <span className="text-xs font-mono text-gray-300">{data.difficulty}/10</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 border-t border-white/5 pt-4">
                            <div>
                                <span className="block text-white/20 uppercase tracking-wider text-[9px] mb-1">Origin</span>
                                {data.baseCamp}
                            </div>
                            <div className="text-right">
                                <span className="block text-white/20 uppercase tracking-wider text-[9px] mb-1">Duration</span>
                                {data.days} Days
                            </div>
                        </div>
                    </div>
                 ))}
             </div>
        </div>
    );
};

const Epilogue: React.FC = () => {
    return (
        <div className="relative z-20 py-32 text-center px-6 border-t border-white/10 bg-black">
            <Feather size={32} className="text-amber-400 mx-auto mb-8 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]" />
            <h3 className="font-cinematic text-3xl md:text-4xl text-amber-400 mb-8 tracking-[0.25em] uppercase drop-shadow-lg">The Silence Awaits</h3>
            <p className="max-w-3xl mx-auto text-white font-serif text-xl md:text-2xl leading-loose italic drop-shadow-md">
            "The mountains do not need us. We need them. We need their stillness to silence our noise. 
            Tread lightly. Let your footprints be the only thing you leave, and silence the only thing you take."
            </p>
        </div>
    );
};

// --- MAIN INFO SECTION COMPONENT ---

const InfoSection: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{title: string, data: LocationDetail} | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'culture' | 'ecology' | 'threat' | 'audio'>('story');
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  const [userCity, setUserCity] = useState('');
  const [routeData, setRouteData] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', contact: '', people: 1, destination: SCENES[1].title });
  const [quote, setQuote] = useState<any>(null);

  useEffect(() => {
    if (!selectedLocation && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setActiveTrack(null);
    }
  }, [selectedLocation]);

  const handleCloseModal = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setActiveTrack(null);
    setIsClosing(true);
    setTimeout(() => {
      setSelectedLocation(null);
      setIsClosing(false);
      setActiveTab('story');
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'people' ? parseInt(value) || 1 : value }));
  };

  const calculateLogistics = (city: string, destination: string) => {
      const cityKey = city.toLowerCase().trim();
      const trip = TRIP_DATABASE[destination];
      if (!trip) return null;
      const cityData = CITY_DISTANCES[cityKey] || { km: 250, flightTime: 0 }; 
      const isDistant = cityData.km > 400;
      const mode = isDistant ? 'Flight + Road' : 'Road / Train';
      const nearestHub = trip.nearestHub || 'Dehradun';
      
      const howToReach = isDistant 
        ? `Your wings carry you to ${nearestHub}. From there, the road coils for ${trip.distanceFromHub}km, carrying you deeper into the silence of ${trip.baseCamp}.`
        : `The iron rails bring you to ${nearestHub}. Then, the ascent begins—a ${trip.distanceFromHub}km climb towards the sanctuary of ${trip.baseCamp}.`;

      return {
          totalDist: cityData.km + trip.distanceFromHub,
          flightTime: cityData.flightTime,
          roadDist: trip.distanceFromHub,
          trekDiff: trip.difficulty,
          baseCamp: trip.baseCamp,
          region: trip.region,
          mode: mode,
          nearestHub: nearestHub,
          howToReach: howToReach,
          bestMonths: trip.bestMonths
      };
  };

  useEffect(() => {
      if (userCity && formData.destination) {
          setRouteData(calculateLogistics(userCity, formData.destination));
      }
  }, [userCity, formData.destination]);

  const handleQuickBook = (e: React.MouseEvent, destinationTitle: string) => {
    e.stopPropagation();
    setFormData(prev => ({...prev, destination: destinationTitle}));
    setIsFormOpen(true);
    setTimeout(() => {
        const planSection = document.getElementById('plan-trip');
        if (planSection) planSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const speakSection = (section: 'story' | 'ecology' | 'threat') => {
    if (!selectedLocation) return;
    window.speechSynthesis.cancel();
    if (activeTrack === section && isSpeaking) {
        setIsSpeaking(false);
        setActiveTrack(null);
        return;
    }
    let textToRead = "";
    if (section === 'story') {
        textToRead = `The Legend of ${selectedLocation.title}. ${selectedLocation.data.significance}. The Tradition: ${selectedLocation.data.tradition}. The Folklore: ${selectedLocation.data.folklore}`;
    } else if (section === 'ecology') {
        textToRead = `The Life of ${selectedLocation.title}. ${selectedLocation.data.ecology}. The creatures here include: ${selectedLocation.data.wildlife}`;
    } else if (section === 'threat') {
        textToRead = `A Warning. ${selectedLocation.data.threat}. The Risk Level is ${selectedLocation.data.riskLevel}`;
    }
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9; 
    utterance.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    let preferredVoice = voices.find(v => v.lang.includes('en-GB') && (v.name.includes('Female') || v.name.includes('Google UK English Female')));
    if (!preferredVoice) preferredVoice = voices.find(v => v.lang.includes('en-GB'));
    if (!preferredVoice) preferredVoice = voices.find(v => v.lang.includes('en'));
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.onend = () => { setIsSpeaking(false); setActiveTrack(null); };
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setActiveTrack(section);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowResult(false);
    const payload = {
        ...formData,
        userCity: userCity,
        _subject: `New Journey Inquiry: ${formData.destination} - ${formData.name}`,
        calculatedRoute: routeData ? {
            totalDistance: routeData.totalDist,
            mode: routeData.mode,
            nearestHub: routeData.nearestHub,
            baseCamp: routeData.baseCamp
        } : null,
        estimatedCost: (TRIP_DATABASE[formData.destination]?.pricePerPerson || 10000) * formData.people
    };
    try {
        const response = await fetch("https://formspree.io/f/mpwgnyye", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            const tripData = TRIP_DATABASE[formData.destination] || { days: 5, pricePerPerson: 10000 };
            setQuote({
                days: tripData.days,
                perPerson: tripData.pricePerPerson,
                total: tripData.pricePerPerson * formData.people
            });
            setShowResult(true);
        } else {
             alert("The message could not reach us. Please try again.");
        }
    } catch (error) {
        alert("The signal failed. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const getDifficultyColor = (level: number) => {
      if (level <= 3) return 'bg-green-500 shadow-[0_0_5px_green]';
      if (level <= 6) return 'bg-amber-500 shadow-[0_0_5px_orange]';
      return 'bg-red-600 shadow-[0_0_8px_red]';
  }

  return (
    <div className="relative z-10 bg-[#020202] text-gray-200 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <Manifesto />
      <EcoRealitiesSection />
      <RegionSplit />
      <SeasonsSection />
      <SpiritualSection />
      <FestivalsSection />
      <CuisineSection />

      {/* SCENE GRID */}
      <div className="max-w-[1400px] mx-auto px-6 pb-32">
        <div className="flex flex-col items-center mb-24">
             <h3 className="font-cinematic text-4xl text-white mb-4 uppercase tracking-[0.2em]">The Scenes</h3>
             <p className="text-white/30 text-xs uppercase tracking-[0.4em]">Witness the Beauty</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-20">
          {SCENES.filter(s => s.id !== 'intro').map((scene, idx) => {
            const details = LOCATION_DETAILS[scene.title];
            const pricing = TRIP_DATABASE[scene.title] || { days: 5, pricePerPerson: 10000, difficulty: 5, bestMonths: [] };
            
            return (
              <div 
                  key={scene.id} 
                  className="group relative flex flex-col cursor-pointer"
                  onClick={() => details && setSelectedLocation({title: scene.title, data: details})}
              >
                {/* Image Container with Cinematic Reveal */}
                <div className="aspect-[3/4] overflow-hidden rounded-[2px] mb-8 bg-[#0a0a0a] relative border border-white/5 group-hover:border-white/30 transition-all duration-700">
                  <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 grayscale-[0.4] group-hover:grayscale-0"
                      style={{ backgroundImage: `url(${scene.imageBg})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${getDifficultyColor(pricing.difficulty)}`} />
                      <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-white">Lvl {pricing.difficulty}</span>
                  </div>
                </div>

                {/* Typography */}
                <div className="flex-grow flex flex-col px-2">
                  <h3 className="font-cinematic text-3xl text-white mb-2 group-hover:text-amber-100 transition-colors tracking-tight">
                    {scene.title}
                  </h3>
                  <div className="h-px w-12 bg-white/20 mb-4 group-hover:w-24 group-hover:bg-amber-500/50 transition-all duration-500" />
                  <h4 className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-6">
                    {scene.subtitle}
                  </h4>

                  <div 
                    onClick={(e) => handleQuickBook(e, scene.title)}
                    className="flex items-center justify-between py-3 border-y border-white/5 group-hover:border-white/20 transition-all duration-500"
                  >
                        <div className="flex items-center gap-2 text-gray-500 group-hover:text-white transition-colors">
                            <Clock size={12} />
                            <span className="text-[10px] uppercase tracking-widest">{pricing.days} Days</span>
                        </div>
                        <div className="flex items-center gap-2 text-amber-500/60 group-hover:text-amber-200 transition-colors">
                            <IndianRupee size={12} />
                            <span className="text-[10px] font-mono font-bold tracking-wider">{pricing.pricePerPerson.toLocaleString()}</span>
                        </div>
                  </div>

                  {details && (
                    <div className="mt-6">
                        <p className="text-xs text-gray-500 mb-6 line-clamp-2 italic leading-relaxed group-hover:text-gray-400 transition-colors">"{details.significance}"</p>
                        <div className="flex items-center gap-2 text-[10px] text-white/60 uppercase tracking-widest group-hover:text-white transition-colors">
                            <span className="border-b border-transparent group-hover:border-white transition-all">Unlock Story</span>
                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedLocation && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
                <div 
                    className={`absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity duration-500 ease-out ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                    onClick={(e) => { e.stopPropagation(); handleCloseModal(); }}
                />
                
                <div className={`relative w-full md:max-w-7xl bg-[#080808] border border-white/10 shadow-2xl overflow-hidden rounded-none md:rounded-sm flex flex-col md:flex-row h-[100dvh] md:h-[90vh] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
                    
                    {/* Image Column */}
                    <div className="w-full md:w-5/12 h-64 md:h-full relative shrink-0 overflow-hidden">
                        <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${SCENES.find(s => s.title === selectedLocation.title)?.imageBg})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-6 animate-slide-up">
                            <div>
                                <h2 className="font-cinematic text-3xl md:text-5xl text-white leading-[0.9] mb-2">{selectedLocation.title}</h2>
                                <p className="text-[10px] text-amber-500 uppercase tracking-[0.3em] font-bold">{selectedLocation.data.location}</p>
                            </div>
                            
                            <div className="space-y-3 pt-4 border-t border-white/10">
                                <div className="flex items-center gap-3 text-white/60 text-xs">
                                   <WithTooltip label="Elevation" text={TOOLTIP_CONTEXT.altitude} icon={<Mountain size={14} className="text-white" />} />
                                   <span className="font-mono tracking-wider">{selectedLocation.data.altitude}</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/60 text-xs">
                                   <WithTooltip label="Atmosphere" text={TOOLTIP_CONTEXT.climate} icon={<Thermometer size={14} className="text-white" />} />
                                   <span className="font-mono tracking-wider">{selectedLocation.data.climate}</span>
                                </div>
                            </div>
                        </div>
                        
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleCloseModal(); }}
                            className="absolute top-4 right-4 p-2 text-white bg-black/50 backdrop-blur-md rounded-full md:hidden z-50"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content Column */}
                    <div className="flex-grow flex flex-col bg-[#080808] relative">
                         <button 
                            onClick={(e) => { e.stopPropagation(); handleCloseModal(); }}
                            className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors z-50 hidden md:block"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex items-center justify-between w-full border-b border-white/5 px-4 md:px-12 pt-6 md:pt-14 md:pr-32 overflow-x-hidden gap-2 md:gap-0 shrink-0">
                            {[
                                { id: 'story', icon: BookOpen, label: 'The Myth' },
                                { id: 'culture', icon: Users, label: 'The Blood' },
                                { id: 'ecology', icon: Sprout, label: 'The Breath' },
                                { id: 'threat', icon: AlertTriangle, label: 'The Omen' },
                                { id: 'audio', icon: Headphones, label: 'Voice' }
                            ].map((tab) => (
                                <button 
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`pb-4 text-[9px] md:text-[10px] font-bold uppercase tracking-wide md:tracking-[0.2em] transition-all flex items-center justify-center gap-1 md:gap-2 flex-1 md:flex-none whitespace-nowrap ${activeTab === tab.id ? 'text-amber-200 border-b-2 border-amber-200' : 'text-white/30 hover:text-white'}`}
                                >
                                    <tab.icon size={12} className="md:w-[14px] md:h-[14px]" /> 
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="p-6 md:p-10 overflow-y-auto flex-grow scrollbar-hide">
                            <div className="animate-slide-up">
                                {activeTab === 'story' && (
                                    <div className="space-y-10 max-w-2xl">
                                        <div className="pl-4 border-l-2 border-amber-500/50">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Info size={12} className="text-amber-500" />
                                                <h4 className="text-amber-500 text-[10px] uppercase tracking-[0.3em]">The Weight</h4>
                                            </div>
                                            <p className="text-xl md:text-2xl text-gray-200 font-serif leading-relaxed italic opacity-90">"{selectedLocation.data.significance}"</p>
                                        </div>
                                        <div>
                                            <h4 className="font-cinematic text-lg text-white mb-4 flex items-center gap-2 opacity-80">The Echo</h4>
                                            <p className="text-gray-400 text-sm leading-loose font-light">{selectedLocation.data.history}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-cinematic text-lg text-white mb-4 flex items-center gap-2 opacity-80">Living Memory</h4>
                                            <p className="text-gray-400 text-sm leading-loose font-light">{selectedLocation.data.tradition}</p>
                                        </div>
                                        <div className="pt-4">
                                           <MiniMap x={selectedLocation.data.coordinates.x} y={selectedLocation.data.coordinates.y} label={selectedLocation.title} />
                                        </div>
                                    </div>
                                )}

                                 {activeTab === 'culture' && (
                                    <div className="space-y-4 max-w-2xl">
                                        <LoreAccordion title="Folklore & Myth" icon={<BookOpen size={14} />}>
                                            {selectedLocation.data.folklore}
                                        </LoreAccordion>
                                        <LoreAccordion title="Rituals" icon={<Music size={14} />}>
                                            {selectedLocation.data.festivals}
                                        </LoreAccordion>
                                        <LoreAccordion title="Hand & Stone" icon={<Palette size={14} />}>
                                            {selectedLocation.data.craft}
                                        </LoreAccordion>
                                        <LoreAccordion title="The Guardians" icon={<Users size={14} />}>
                                            {selectedLocation.data.community}
                                        </LoreAccordion>
                                    </div>
                                )}

                                {activeTab === 'ecology' && (
                                    <div className="space-y-8 max-w-2xl">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-white/5 p-6 border border-white/5">
                                                <div className="flex items-center gap-2 text-green-400 mb-4">
                                                    <Leaf size={16} />
                                                    <h4 className="text-[10px] uppercase tracking-[0.3em]">From the Earth</h4>
                                                </div>
                                                <p className="text-gray-400 text-xs leading-relaxed">{selectedLocation.data.ecology}</p>
                                            </div>
                                            <div className="bg-white/5 p-6 border border-white/5">
                                                <div className="flex items-center gap-2 text-blue-300 mb-4">
                                                    <Wind size={16} />
                                                    <h4 className="text-[10px] uppercase tracking-[0.3em]">Breathing Life</h4>
                                                </div>
                                                <p className="text-gray-400 text-xs leading-relaxed">{selectedLocation.data.wildlife}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'threat' && (
                                    <div className="space-y-8 max-w-2xl">
                                        <div className="bg-red-950/10 p-8 border border-red-500/20">
                                            <div className="flex items-center gap-3 text-red-500 mb-4">
                                                <Skull size={20} />
                                                <h4 className="text-xs font-bold uppercase tracking-[0.3em]">The Danger</h4>
                                            </div>
                                            <p className="text-red-100/70 text-sm leading-loose">
                                                {selectedLocation.data.threat}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Fragility Status</span>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 border ${
                                                selectedLocation.data.riskLevel === 'Critical' ? 'bg-red-950/30 text-red-400 border-red-500/30' : 
                                                selectedLocation.data.riskLevel === 'High' ? 'bg-orange-900/30 text-orange-300 border-orange-500/30' : 
                                                'bg-green-900/30 text-green-300 border-green-500/30'
                                            }`}>
                                                {selectedLocation.data.riskLevel}
                                            </span>
                                         </div>
                                    </div>
                                )}

                                {activeTab === 'audio' && (
                                    <div className="h-[40vh] flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white/5 to-transparent border border-white/5">
                                        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                                            <Mic size={24} className="text-white/60" />
                                        </div>
                                        
                                        <h3 className="font-cinematic text-2xl text-white mb-8 tracking-widest uppercase">The Narrator</h3>
                                        
                                        <div className="w-full max-w-md space-y-3">
                                            {['story', 'ecology', 'threat'].map((section, idx) => (
                                                <button 
                                                    key={section}
                                                    onClick={() => speakSection(section as any)}
                                                    className={`w-full p-4 flex items-center justify-between transition-all duration-300 group ${activeTrack === section ? 'bg-amber-900/20 border-l-2 border-amber-500 pl-6' : 'bg-transparent border-l-2 border-white/10 hover:bg-white/5 hover:border-white/30'}`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-[10px] font-mono text-gray-500 group-hover:text-white transition-colors">0{idx + 1}</div>
                                                        <div className="text-xs uppercase tracking-widest text-gray-300 group-hover:text-amber-100 transition-colors">{section}</div>
                                                    </div>
                                                    <div className="opacity-50 group-hover:opacity-100">
                                                        {activeTrack === section && isSpeaking ? <Pause size={12} className="text-amber-400" /> : <Play size={12} />}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 md:p-8 border-t border-white/5 bg-[#0a0a0a] flex justify-between items-center shrink-0">
                            <span className="text-[10px] text-white/30 hidden md:block uppercase tracking-[0.3em]">
                                The Path Awaits
                            </span>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFormData(prev => ({...prev, destination: selectedLocation.title}));
                                    handleCloseModal();
                                    setTimeout(() => {
                                        const planSection = document.getElementById('plan-trip');
                                        if (planSection) planSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        setIsFormOpen(true);
                                    }, 400);
                                }}
                                className="w-full md:w-auto bg-white text-black hover:bg-gray-200 px-8 py-4 font-sans font-bold text-[10px] uppercase tracking-[0.3em] transition-all duration-300"
                            >
                                Begin Journey
                            </button>
                        </div>
                    </div>
                </div>
            </div>
      )}

      <AdventureTable />
      <Epilogue />

      {/* PLANNER SECTION (THE VOW) */}
      <div id="plan-trip" className="py-32 bg-[#020202] relative border-t border-white/5">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 className="font-cinematic text-4xl text-green-400 mb-6 uppercase tracking-[0.1em]">The Calling</h2>
                <p className="text-white/40 mb-16 max-w-xl mx-auto text-sm font-light leading-relaxed">
                    The path is steep. The reward is silence. Prepare your spirit for the ascent.
                </p>
                
                {!isFormOpen ? (
                <button 
                    onClick={() => setIsFormOpen(true)}
                    className="group relative px-10 py-5 overflow-hidden border border-white/20 text-white font-sans text-xs tracking-[0.3em] uppercase hover:text-black transition-colors duration-500"
                >
                    <span className="absolute inset-0 w-full h-full bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"/>
                    <span className="relative z-10">Open The Vow</span>
                </button>
                ) : (
                <div className="bg-[#080808] border border-white/10 p-6 md:p-16 text-left animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <div className="flex justify-between items-center mb-12">
                         <div>
                            <h3 className="font-cinematic text-2xl text-white uppercase tracking-widest mb-1">The Vow</h3>
                            <div className="h-px w-12 bg-amber-500/50"/>
                         </div>
                        <button onClick={() => setIsFormOpen(false)} className="text-white/30 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                             <div className="space-y-4 group">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-amber-500/70 flex items-center gap-2"><MapPin size={10}/> The Hearth You Leave</label>
                                <input 
                                    type="text" 
                                    name="userCity"
                                    value={userCity} 
                                    onChange={(e) => setUserCity(e.target.value)} 
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors text-base md:text-lg font-light tracking-wide placeholder-white/10" 
                                    placeholder="e.g. Mumbai..." 
                                />
                            </div>
                            <div className="space-y-4 group">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-amber-500/70 flex items-center gap-2"><Compass size={10}/> Where Does The Spirit Go?</label>
                                <select name="destination" value={formData.destination} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors text-base md:text-lg font-light tracking-wide">
                                    {Object.keys(TRIP_DATABASE).map(title => (
                                    <option key={title} value={title} className="bg-black text-white">{title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        {routeData && (
                            <div className="animate-in fade-in slide-in-from-top-4 duration-700 space-y-8 bg-white/5 p-8 border border-white/5">
                                <div className="flex gap-4 items-start">
                                    <Route className="text-amber-200/60 shrink-0 mt-1" size={16} />
                                    <div>
                                        <h4 className="text-[10px] text-amber-200 font-bold uppercase tracking-[0.2em] mb-2">The Approach</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed font-light italic">"{routeData.howToReach}"</p>
                                    </div>
                                </div>

                                <div className="relative pt-8 pb-4">
                                    <div className="absolute top-[60%] left-0 w-full h-px bg-white/10" />
                                    <div className="flex justify-between items-end relative z-10">
                                        <div className="text-center">
                                            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{userCity}</div>
                                            <div className="w-2 h-2 bg-white rounded-full mx-auto" />
                                        </div>
                                        {routeData.mode.includes('Flight') && <div className="mb-2"><Plane size={14} className="text-white/40" /></div>}
                                        <div className="text-center">
                                            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">{routeData.nearestHub.split(' ')[0]}</div>
                                            <div className="w-1.5 h-1.5 border border-white/50 rounded-full mx-auto bg-black" />
                                        </div>
                                        <div className="mb-2"><Bus size={14} className="text-white/40" /></div>
                                        <div className="text-center">
                                            <div className="text-[10px] uppercase tracking-widest text-amber-500 mb-2 font-bold">{routeData.baseCamp}</div>
                                            <div className="w-3 h-3 border border-amber-500 rounded-full mx-auto bg-black" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-gray-500">
                                    <span>Toll on Body: {routeData.trekDiff}/10</span>
                                    <span className="h-px w-8 bg-white/10" />
                                    <span>Distance: ~{routeData.totalDist} km</span>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Pilgrim Name</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white/60 transition-colors text-base" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Companions</label>
                                <input required type="number" min="1" name="people" value={formData.people} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white/60 transition-colors text-base" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                             <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">How Do We Reach You?</label>
                                <input required type="tel" name="contact" value={formData.contact} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white/60 transition-colors text-base" />
                            </div>
                             <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">The Written Word</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white/60 transition-colors text-base" />
                            </div>
                        </div>

                        <button disabled={loading} type="submit" className="w-full bg-white hover:bg-gray-200 text-black font-sans text-xs font-bold uppercase tracking-[0.3em] py-5 mt-8 transition-all duration-300 flex justify-center items-center gap-3">
                            {loading ? <Loader2 className="animate-spin" /> : 'Request Pilgrimage Plan'}
                        </button>
                    </form>

                    {showResult && (
                        <div className="mt-12 pt-12 border-t border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700 text-center">
                            <div className="font-cinematic text-4xl text-white mb-2">{quote?.days} Days of Ascent</div>
                            <div className="text-xl text-amber-200/80 font-mono">
                                ₹ {quote?.total.toLocaleString()} <span className="text-sm text-gray-500 ml-2">Total Offering</span>
                            </div>
                            <p className="text-gray-500 text-xs mt-6 max-w-md mx-auto leading-relaxed">
                                The prayer has been sent. A guardian of the {TRIP_DATABASE[formData.destination]?.region} hills will reach out to {formData.name} before the sun sets.
                            </p>
                        </div>
                    )}
                </div>
                )}
                
                <div className="mt-24 text-white/10 text-[10px] tracking-[0.4em] uppercase font-light">
                    &copy; {new Date().getFullYear()} Devbhoomi. Preserving the Silence.
                </div>
            </div>
      </div>

    </div>
  );
};

export default InfoSection;