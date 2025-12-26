import React, { useState, useEffect } from 'react';
import { Swords, Trophy, Sparkles, Coins, Shield } from 'lucide-react';

// Resource symbols as SVG components
const ResourceIcon = ({ type, size = 20 }) => {
  const icons = {
    wood: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 4v16M12 4v16M16 4v16" />
      </svg>
    ),
    clay: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <rect x="6" y="6" width="12" height="12" rx="1" />
        <rect x="8" y="8" width="8" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    stone: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 8l10 6 10-6-10-6z" />
        <path d="M2 16l10 6 10-6" />
      </svg>
    ),
    glass: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4v16M4 12h16" />
      </svg>
    ),
    papyrus: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="6" y="4" width="12" height="16" rx="1" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    ),
    coin: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="9" />
        <text x="12" y="17" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">$</text>
      </svg>
    )
  };
  return icons[type] || null;
};

const ScienceIcon = ({ type, size = 20 }) => {
  const icons = {
    wheel: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 4v5M12 15v5M4 12h5M15 12h5" />
      </svg>
    ),
    compass: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="12,6 14,12 12,18 10,12" fill="currentColor" />
      </svg>
    ),
    tablet: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M8 6h8M8 10h8M8 14h5" />
      </svg>
    ),
    mortar: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v6" />
        <circle cx="12" cy="14" r="8" />
        <circle cx="12" cy="14" r="5" />
      </svg>
    ),
    sundial: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v8" />
        <circle cx="12" cy="14" r="8" />
        <path d="M12 10l4 4" />
      </svg>
    ),
    armillary: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <ellipse cx="12" cy="12" rx="10" ry="5" />
        <ellipse cx="12" cy="12" rx="5" ry="10" />
      </svg>
    )
  };
  return icons[type] || null;
};

// Card data for all three ages
const CARDS = {
  age1: [
    { id: 'lumber-yard', name: 'Lumber Yard', type: 'brown', cost: {}, produces: { wood: 1 }, points: 0 },
    { id: 'logging-camp', name: 'Logging Camp', type: 'brown', cost: { coin: 1 }, produces: { wood: 1 }, points: 0 },
    { id: 'clay-pool', name: 'Clay Pool', type: 'brown', cost: {}, produces: { clay: 1 }, points: 0 },
    { id: 'clay-pit', name: 'Clay Pit', type: 'brown', cost: { coin: 1 }, produces: { clay: 1 }, points: 0 },
    { id: 'quarry', name: 'Quarry', type: 'brown', cost: {}, produces: { stone: 1 }, points: 0 },
    { id: 'stone-pit', name: 'Stone Pit', type: 'brown', cost: { coin: 1 }, produces: { stone: 1 }, points: 0 },
    { id: 'glassworks', name: 'Glassworks', type: 'gray', cost: { coin: 1 }, produces: { glass: 1 }, points: 0 },
    { id: 'press', name: 'Press', type: 'gray', cost: { coin: 1 }, produces: { papyrus: 1 }, points: 0 },
    
    { id: 'guard-tower', name: 'Guard Tower', type: 'red', cost: { clay: 1 }, military: 1, points: 0 },
    { id: 'stable', name: 'Stable', type: 'red', cost: { wood: 1 }, military: 1, points: 0 },
    { id: 'garrison', name: 'Garrison', type: 'red', cost: { clay: 1 }, military: 1, points: 0 },
    { id: 'palisade', name: 'Palisade', type: 'red', cost: { coin: 2 }, military: 1, points: 0 },
    
    { id: 'baths', name: 'Baths', type: 'blue', cost: { stone: 1 }, points: 3, chain: 'aqueduct' },
    { id: 'altar', name: 'Altar', type: 'blue', cost: {}, points: 3, chain: 'temple' },
    { id: 'theater', name: 'Theater', type: 'blue', cost: {}, points: 3, chain: 'statue' },
    
    { id: 'apothecary', name: 'Apothecary', type: 'green', cost: { glass: 1 }, science: 'compass', points: 0, chain: 'stables' },
    { id: 'workshop', name: 'Workshop', type: 'green', cost: { papyrus: 1 }, science: 'wheel', points: 0, chain: 'laboratory' },
    { id: 'scriptorium', name: 'Scriptorium', type: 'green', cost: { papyrus: 1 }, science: 'tablet', points: 0, chain: 'courthouse' },
    
    { id: 'tavern', name: 'Tavern', type: 'yellow', cost: {}, effect: { coins: 4 }, points: 0 },
    { id: 'marketplace', name: 'Marketplace', type: 'yellow', cost: {}, effect: { trade: true }, points: 0 }
  ],
  age2: [
    { id: 'sawmill', name: 'Sawmill', type: 'brown', cost: { coin: 2 }, produces: { wood: 2 }, points: 0 },
    { id: 'brickyard', name: 'Brickyard', type: 'brown', cost: { coin: 2 }, produces: { clay: 2 }, points: 0 },
    { id: 'shelf-quarry', name: 'Shelf Quarry', type: 'brown', cost: { coin: 2 }, produces: { stone: 2 }, points: 0 },
    { id: 'glass-blower', name: 'Glass Blower', type: 'gray', cost: {}, produces: { glass: 1 }, points: 0 },
    { id: 'drying-room', name: 'Drying Room', type: 'gray', cost: {}, produces: { papyrus: 1 }, points: 0 },
    
    { id: 'walls', name: 'Walls', type: 'red', cost: { stone: 2 }, military: 2, points: 0 },
    { id: 'horse-breeders', name: 'Horse Breeders', type: 'red', cost: { clay: 1, wood: 1 }, military: 1, points: 0 },
    { id: 'barracks', name: 'Barracks', type: 'red', cost: { coin: 3 }, military: 1, points: 0 },
    { id: 'archery-range', name: 'Archery Range', type: 'red', cost: { stone: 1, wood: 1 }, military: 2, points: 0 },
    { id: 'parade-ground', name: 'Parade Ground', type: 'red', cost: { clay: 2, glass: 1 }, military: 2, points: 0 },
    
    { id: 'aqueduct', name: 'Aqueduct', type: 'blue', cost: { stone: 3 }, points: 5, chainedFrom: 'baths' },
    { id: 'temple', name: 'Temple', type: 'blue', cost: { wood: 1, papyrus: 1 }, points: 4, chainedFrom: 'altar' },
    { id: 'statue', name: 'Statue', type: 'blue', cost: { clay: 2 }, points: 4, chainedFrom: 'theater' },
    { id: 'courthouse', name: 'Courthouse', type: 'blue', cost: { wood: 2, glass: 1 }, points: 5, chainedFrom: 'scriptorium' },
    { id: 'rostrum', name: 'Rostrum', type: 'blue', cost: { stone: 1, wood: 1 }, points: 4 },
    
    { id: 'dispensary', name: 'Dispensary', type: 'green', cost: { clay: 2, stone: 1 }, science: 'compass', points: 0 },
    { id: 'laboratory', name: 'Laboratory', type: 'green', cost: { wood: 1, glass: 1, papyrus: 1 }, science: 'wheel', points: 0, chainedFrom: 'workshop' },
    { id: 'library', name: 'Library', type: 'green', cost: { stone: 1, wood: 1, glass: 1 }, science: 'tablet', points: 0 },
    { id: 'school', name: 'School', type: 'green', cost: { wood: 2, papyrus: 1 }, science: 'tablet', points: 0 },
    
    { id: 'forum', name: 'Forum', type: 'yellow', cost: { coin: 3 }, produces: { glass: 1, papyrus: 1 }, points: 0 },
    { id: 'caravansery', name: 'Caravansery', type: 'yellow', cost: { glass: 1, papyrus: 1 }, produces: { wood: 1, clay: 1, stone: 1 }, points: 0 },
    { id: 'customs-house', name: 'Customs House', type: 'yellow', cost: { clay: 1, papyrus: 1 }, effect: { trade: true }, points: 0 },
    { id: 'brewery', name: 'Brewery', type: 'yellow', cost: {}, effect: { coins: 6 }, points: 0 }
  ],
  age3: [
    { id: 'arsenal', name: 'Arsenal', type: 'red', cost: { clay: 3, wood: 2 }, military: 3, points: 0 },
    { id: 'pretorium', name: 'Pretorium', type: 'red', cost: { coin: 8 }, military: 3, points: 0 },
    { id: 'fortifications', name: 'Fortifications', type: 'red', cost: { stone: 2, clay: 1, papyrus: 1 }, military: 2, points: 0 },
    { id: 'siege-workshop', name: 'Siege Workshop', type: 'red', cost: { wood: 3, glass: 1 }, military: 2, points: 0 },
    { id: 'circus', name: 'Circus', type: 'red', cost: { clay: 2, stone: 2 }, military: 2, points: 0 },
    
    { id: 'pantheon', name: 'Pantheon', type: 'blue', cost: { clay: 1, wood: 1, papyrus: 2, glass: 1 }, points: 6 },
    { id: 'gardens', name: 'Gardens', type: 'blue', cost: { clay: 2, wood: 2 }, points: 6 },
    { id: 'town-hall', name: 'Town Hall', type: 'blue', cost: { stone: 3, wood: 2 }, points: 7 },
    { id: 'palace', name: 'Palace', type: 'blue', cost: { clay: 1, stone: 1, wood: 1, glass: 2, papyrus: 1 }, points: 8 },
    { id: 'senate', name: 'Senate', type: 'blue', cost: { clay: 2, stone: 1, papyrus: 1 }, points: 6 },
    
    { id: 'academy', name: 'Academy', type: 'green', cost: { stone: 1, wood: 1, glass: 2 }, science: 'compass', points: 3 },
    { id: 'study', name: 'Study', type: 'green', cost: { wood: 2, glass: 1, papyrus: 1 }, science: 'wheel', points: 3 },
    { id: 'observatory', name: 'Observatory', type: 'green', cost: { stone: 1, papyrus: 2 }, science: 'wheel', points: 3 },
    { id: 'university', name: 'University', type: 'green', cost: { clay: 1, glass: 1, papyrus: 1 }, science: 'tablet', points: 3 },
    
    { id: 'port', name: 'Port', type: 'yellow', cost: { wood: 1, glass: 1, papyrus: 1 }, effect: { vp_per_brown: 2 }, points: 3 },
    { id: 'armory', name: 'Armory', type: 'yellow', cost: { stone: 2, glass: 1 }, effect: { vp_per_red: 1 }, points: 3 },
    { id: 'lighthouse', name: 'Lighthouse', cost: { clay: 2, glass: 1 }, type: 'yellow', effect: { vp_per_yellow: 1 }, points: 3 },
    { id: 'arena', name: 'Arena', type: 'yellow', cost: { clay: 1, stone: 1, wood: 1 }, effect: { vp_per_wonder: 2 }, points: 3 },
    { id: 'chamber-of-commerce', name: 'Chamber of Commerce', type: 'yellow', cost: { papyrus: 2 }, effect: { vp_per_gray: 3 }, points: 3 },
    
    { id: 'builders-guild', name: 'Builders Guild', type: 'purple', cost: { stone: 2, clay: 1, wood: 1, glass: 1 }, effect: { vp_per_wonder_opp: 2 }, points: 0 },
    { id: 'merchants-guild', name: 'Merchants Guild', type: 'purple', cost: { clay: 1, wood: 1, glass: 1, papyrus: 1 }, effect: { vp_per_yellow_opp: 1 }, points: 0 },
    { id: 'shipowners-guild', name: 'Shipowners Guild', type: 'purple', cost: { wood: 2, glass: 1, papyrus: 1 }, effect: { vp_per_brownGray_own: 1 }, points: 0 }
  ]
};

const WONDERS = [
  { id: 'pyramids', name: 'The Pyramids', cost: { stone: 3 }, points: 9 },
  { id: 'colossus', name: 'The Colossus', cost: { clay: 3, glass: 1 }, points: 3, military: 2 },
  { id: 'lighthouse', name: 'The Lighthouse', cost: { stone: 1, wood: 1, glass: 1, papyrus: 1 }, points: 4, produces: { wood: 1, clay: 1, stone: 1 } },
  { id: 'temple-artemis', name: 'Temple of Artemis', cost: { wood: 1, stone: 1, glass: 1, papyrus: 1 }, points: 12, effect: { coins: 12 } },
  { id: 'hanging-gardens', name: 'Hanging Gardens', cost: { wood: 2, glass: 1, papyrus: 1 }, points: 3, effect: { coins: 6, replay: true } },
  { id: 'statue-zeus', name: 'Statue of Zeus', cost: { clay: 2, stone: 1, wood: 2 }, points: 3, military: 1, effect: { hit_shield: true } },
  { id: 'mausoleum', name: 'The Mausoleum', cost: { clay: 2, glass: 2, papyrus: 1 }, points: 2, effect: { from_discard: true } },
  { id: 'circus-maximus', name: 'Circus Maximus', cost: { clay: 2, stone: 2, wood: 1 }, points: 3, military: 1, effect: { destroy_gray: true } }
];

const PROGRESS_TOKENS = [
  { id: 'agriculture', name: 'Agriculture', effect: 'Gain 6 coins and 4 VP' },
  { id: 'architecture', name: 'Architecture', effect: 'Future wonders cost 2 fewer resources' },
  { id: 'economy', name: 'Economy', effect: 'Enemy production is cheaper' },
  { id: 'law', name: 'Law', effect: 'Science symbols count as any type' },
  { id: 'masonry', name: 'Masonry', effect: 'Gain 2 coins per built blue card' },
  { id: 'mathematics', name: 'Mathematics', effect: 'Gain 3 VP per progress token' },
  { id: 'philosophy', name: 'Philosophy', effect: 'Gain 7 VP' },
  { id: 'strategy', name: 'Strategy', effect: 'Gain 2 military shields' },
  { id: 'theology', name: 'Theology', effect: 'Replay your last card' },
  { id: 'urbanism', name: 'Urbanism', effect: 'Gain 6 coins and chain any card' }
];

const INITIAL_PYRAMID_LAYOUTS = {
  age1: [
    // Row 1 (top)
    { card: 0, faceUp: true, row: 0, col: 0 },
    // Row 2
    { card: 1, faceUp: false, row: 1, col: 0 },
    { card: 2, faceUp: false, row: 1, col: 1 },
    // Row 3
    { card: 3, faceUp: true, row: 2, col: 0 },
    { card: 4, faceUp: true, row: 2, col: 1 },
    { card: 5, faceUp: true, row: 2, col: 2 },
    // Row 4
    { card: 6, faceUp: false, row: 3, col: 0 },
    { card: 7, faceUp: false, row: 3, col: 1 },
    { card: 8, faceUp: false, row: 3, col: 2 },
    { card: 9, faceUp: false, row: 3, col: 3 },
    // Row 5
    { card: 10, faceUp: true, row: 4, col: 0 },
    { card: 11, faceUp: true, row: 4, col: 1 },
    { card: 12, faceUp: true, row: 4, col: 2 },
    { card: 13, faceUp: true, row: 4, col: 3 },
    { card: 14, faceUp: true, row: 4, col: 4 },
    // Row 6
    { card: 15, faceUp: false, row: 5, col: 0 },
    { card: 16, faceUp: false, row: 5, col: 1 },
    { card: 17, faceUp: false, row: 5, col: 2 },
    { card: 18, faceUp: false, row: 5, col: 3 },
    { card: 19, faceUp: false, row: 5, col: 4 },
    { card: 20, faceUp: false, row: 5, col: 5 }
  ],
  age2: [
    // Row 1
    { card: 0, faceUp: true, row: 0, col: 0 },
    // Row 2
    { card: 1, faceUp: true, row: 1, col: 0 },
    { card: 2, faceUp: true, row: 1, col: 1 },
    // Row 3
    { card: 3, faceUp: false, row: 2, col: 0 },
    { card: 4, faceUp: false, row: 2, col: 1 },
    { card: 5, faceUp: false, row: 2, col: 2 },
    // Row 4
    { card: 6, faceUp: true, row: 3, col: 0 },
    { card: 7, faceUp: true, row: 3, col: 1 },
    { card: 8, faceUp: true, row: 3, col: 2 },
    { card: 9, faceUp: true, row: 3, col: 3 },
    // Row 5
    { card: 10, faceUp: true, row: 4, col: 0 },
    { card: 11, faceUp: true, row: 4, col: 1 },
    { card: 12, faceUp: true, row: 4, col: 2 },
    { card: 13, faceUp: true, row: 4, col: 3 },
    { card: 14, faceUp: true, row: 4, col: 4 },
    // Row 6
    { card: 15, faceUp: false, row: 5, col: 0 },
    { card: 16, faceUp: false, row: 5, col: 1 },
    { card: 17, faceUp: false, row: 5, col: 2 },
    { card: 18, faceUp: false, row: 5, col: 3 },
    { card: 19, faceUp: false, row: 5, col: 4 },
    { card: 20, faceUp: false, row: 5, col: 5 }
  ],
  age3: [
    // Guild row (choose 3 guilds)
    { card: 19, faceUp: true, row: 0, col: 0 },
    { card: 20, faceUp: true, row: 0, col: 1 },
    { card: 21, faceUp: true, row: 0, col: 2 },
    // Row 2
    { card: 0, faceUp: false, row: 1, col: 0 },
    { card: 1, faceUp: false, row: 1, col: 1 },
    // Row 3
    { card: 2, faceUp: true, row: 2, col: 0 },
    { card: 3, faceUp: true, row: 2, col: 1 },
    { card: 4, faceUp: true, row: 2, col: 2 },
    // Row 4
    { card: 5, faceUp: false, row: 3, col: 0 },
    { card: 6, faceUp: false, row: 3, col: 1 },
    { card: 7, faceUp: false, row: 3, col: 2 },
    { card: 8, faceUp: false, row: 3, col: 3 },
    // Row 5
    { card: 9, faceUp: true, row: 4, col: 0 },
    { card: 10, faceUp: true, row: 4, col: 1 },
    { card: 11, faceUp: true, row: 4, col: 2 },
    { card: 12, faceUp: true, row: 4, col: 3 },
    { card: 13, faceUp: true, row: 4, col: 4 },
    // Row 6
    { card: 14, faceUp: false, row: 5, col: 0 },
    { card: 15, faceUp: false, row: 5, col: 1 },
    { card: 16, faceUp: false, row: 5, col: 2 },
    { card: 17, faceUp: false, row: 5, col: 3 },
    { card: 18, faceUp: false, row: 5, col: 4 },
    { card: 19, faceUp: false, row: 5, col: 5 }
  ]
};

// Shuffle function
const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Main component
export default function SevenWondersDuel() {
  const [gameMode, setGameMode] = useState(null); // 'pvp' or 'ai'
  const [gameState, setGameState] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedWonder, setSelectedWonder] = useState(null);
  const [actionMode, setActionMode] = useState(null); // 'build', 'wonder', 'discard'
  const [message, setMessage] = useState('');

  // Initialize game
  const initGame = (mode) => {
    // Shuffle all cards
    const shuffledAge1 = shuffle([...CARDS.age1]);
    const shuffledAge2 = shuffle([...CARDS.age2]);
    const shuffledAge3 = shuffle([...CARDS.age3]);
    
    // Select 3 random guilds for age 3
    const guilds = shuffledAge3.filter(c => c.type === 'purple');
    const selectedGuilds = shuffle(guilds).slice(0, 3);
    const nonGuilds = shuffledAge3.filter(c => c.type !== 'purple');
    const age3Cards = [...selectedGuilds, ...nonGuilds];

    // Shuffle wonders and select 8 (4 per player)
    const shuffledWonders = shuffle([...WONDERS]);
    const wonderPool = shuffledWonders.slice(0, 8);

    setGameState({
      mode,
      age: 1,
      currentPlayer: 1,
      pyramid: INITIAL_PYRAMID_LAYOUTS.age1.map((pos, idx) => ({
        ...pos,
        card: shuffledAge1[pos.card],
        taken: false
      })),
      deckAge1: shuffledAge1,
      deckAge2: shuffledAge2,
      deckAge3: age3Cards,
      players: {
        1: {
          coins: 7,
          cards: [],
          wonders: wonderPool.slice(0, 4),
          builtWonders: [],
          military: 0,
          science: {},
          progressTokens: []
        },
        2: {
          coins: 7,
          cards: [],
          wonders: wonderPool.slice(4, 8),
          builtWonders: [],
          military: 0,
          science: {},
          progressTokens: []
        }
      },
      militaryTrack: 0, // -9 to 9, starts at 0
      winner: null,
      victoryType: null
    });
    setGameMode(mode);
    setMessage('Player 1 starts! Select a card from the pyramid.');
  };

  // Check if card is accessible (not covered)
  const isCardAccessible = (pyramid, position) => {
    if (position.taken) return false;
    
    const { row, col } = position;
    
    // Check if any card below covers this one
    const belowLeft = pyramid.find(p => p.row === row + 1 && p.col === col && !p.taken);
    const belowRight = pyramid.find(p => p.row === row + 1 && p.col === col + 1 && !p.taken);
    
    return !belowLeft && !belowRight;
  };

  // Calculate resource production
  const getProduction = (player) => {
    const production = { wood: 0, clay: 0, stone: 0, glass: 0, papyrus: 0 };
    player.cards.forEach(card => {
      if (card.produces) {
        Object.keys(card.produces).forEach(resource => {
          production[resource] = (production[resource] || 0) + card.produces[resource];
        });
      }
    });
    player.builtWonders.forEach(wonder => {
      if (wonder.produces) {
        Object.keys(wonder.produces).forEach(resource => {
          production[resource] = (production[resource] || 0) + wonder.produces[resource];
        });
      }
    });
    return production;
  };

  // Check if player can afford card
  const canAffordCard = (player, card, opponentProduction) => {
    if (!card.cost) return true;
    
    const production = getProduction(player);
    let coinsNeeded = card.cost.coin || 0;
    
    const resources = ['wood', 'clay', 'stone', 'glass', 'papyrus'];
    for (const resource of resources) {
      const needed = card.cost[resource] || 0;
      const have = production[resource] || 0;
      if (have < needed) {
        const toBuy = needed - have;
        coinsNeeded += toBuy * 2; // Resources cost 2 coins + 1 per opponent production
        coinsNeeded += (opponentProduction[resource] || 0) * toBuy;
      }
    }
    
    return player.coins >= coinsNeeded;
  };

  // Check if card is free through chaining
  const isFreeChain = (player, card) => {
    if (!card.chainedFrom) return false;
    return player.cards.some(c => c.chain === card.chainedFrom);
  };

  // Apply card effect
  const applyCardEffect = (player, card) => {
    const newPlayer = { ...player };
    
    if (card.effect) {
      if (card.effect.coins) {
        newPlayer.coins += card.effect.coins;
      }
    }
    
    return newPlayer;
  };

  // Build card
  const buildCard = (cardPosition) => {
    const card = cardPosition.card;
    const currentPlayer = gameState.currentPlayer;
    const player = gameState.players[currentPlayer];
    const opponent = gameState.players[currentPlayer === 1 ? 2 : 1];
    const opponentProduction = getProduction(opponent);
    
    // Check if can afford or free chain
    if (!isFreeChain(player, card) && !canAffordCard(player, card, opponentProduction)) {
      setMessage('Cannot afford this card!');
      return;
    }
    
    // Calculate cost
    let cost = 0;
    if (!isFreeChain(player, card) && card.cost) {
      const production = getProduction(player);
      cost = card.cost.coin || 0;
      
      const resources = ['wood', 'clay', 'stone', 'glass', 'papyrus'];
      for (const resource of resources) {
        const needed = card.cost[resource] || 0;
        const have = production[resource] || 0;
        if (have < needed) {
          const toBuy = needed - have;
          cost += toBuy * 2;
          cost += (opponentProduction[resource] || 0) * toBuy;
        }
      }
    }
    
    // Update state
    const newPyramid = gameState.pyramid.map(p => 
      p === cardPosition ? { ...p, taken: true } : p
    );
    
    let newPlayer = { ...player };
    newPlayer.coins -= cost;
    newPlayer.cards = [...newPlayer.cards, card];
    
    // Apply card effects
    newPlayer = applyCardEffect(newPlayer, card);
    
    // Military
    if (card.military) {
      newPlayer.military += card.military;
    }
    
    // Science
    if (card.science) {
      newPlayer.science[card.science] = (newPlayer.science[card.science] || 0) + 1;
    }
    
    // Reveal covered cards
    const newPyramidRevealed = newPyramid.map(p => {
      if (!p.faceUp && isCardAccessible(newPyramid, p)) {
        return { ...p, faceUp: true };
      }
      return p;
    });
    
    const newPlayers = {
      ...gameState.players,
      [currentPlayer]: newPlayer
    };
    
    // Update military track
    const militaryDiff = newPlayers[1].military - newPlayers[2].military;
    
    // Check for science victory
    const scienceTypes = Object.keys(newPlayer.science).length;
    if (scienceTypes >= 6) {
      setGameState({
        ...gameState,
        winner: currentPlayer,
        victoryType: 'science',
        players: newPlayers
      });
      setMessage(`Player ${currentPlayer} wins by Scientific Supremacy!`);
      return;
    }
    
    // Check for military victory
    if (Math.abs(militaryDiff) >= 9) {
      const winner = militaryDiff > 0 ? 1 : 2;
      setGameState({
        ...gameState,
        winner,
        victoryType: 'military',
        players: newPlayers,
        militaryTrack: militaryDiff
      });
      setMessage(`Player ${winner} wins by Military Supremacy!`);
      return;
    }
    
    // Check if age is over
    const cardsLeft = newPyramidRevealed.filter(p => !p.taken).length;
    if (cardsLeft === 0) {
      // Move to next age or end game
      if (gameState.age < 3) {
        startNextAge(newPlayers, militaryDiff);
      } else {
        endGame(newPlayers, militaryDiff);
      }
      return;
    }
    
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    setGameState({
      ...gameState,
      pyramid: newPyramidRevealed,
      players: newPlayers,
      currentPlayer: nextPlayer,
      militaryTrack: militaryDiff
    });
    
    setSelectedCard(null);
    setActionMode(null);
    
    // AI turn
    if (gameMode === 'ai' && nextPlayer === 2) {
      setTimeout(() => aiTurn({ ...gameState, pyramid: newPyramidRevealed, players: newPlayers, currentPlayer: 2, militaryTrack: militaryDiff }), 1000);
    } else {
      setMessage(`Player ${nextPlayer}'s turn`);
    }
  };

  // Build wonder
  const buildWonder = (cardPosition, wonder) => {
    const currentPlayer = gameState.currentPlayer;
    const player = gameState.players[currentPlayer];
    const opponent = gameState.players[currentPlayer === 1 ? 2 : 1];
    const opponentProduction = getProduction(opponent);
    
    if (!canAffordCard(player, wonder, opponentProduction)) {
      setMessage('Cannot afford this wonder!');
      return;
    }
    
    // Calculate cost (same as card)
    const production = getProduction(player);
    let cost = wonder.cost.coin || 0;
    
    const resources = ['wood', 'clay', 'stone', 'glass', 'papyrus'];
    for (const resource of resources) {
      const needed = wonder.cost[resource] || 0;
      const have = production[resource] || 0;
      if (have < needed) {
        const toBuy = needed - have;
        cost += toBuy * 2;
        cost += (opponentProduction[resource] || 0) * toBuy;
      }
    }
    
    const newPyramid = gameState.pyramid.map(p => 
      p === cardPosition ? { ...p, taken: true } : p
    );
    
    let newPlayer = { ...player };
    newPlayer.coins -= cost;
    newPlayer.wonders = newPlayer.wonders.filter(w => w.id !== wonder.id);
    newPlayer.builtWonders = [...newPlayer.builtWonders, { ...wonder, discardedCard: cardPosition.card }];
    
    if (wonder.military) {
      newPlayer.military += wonder.military;
    }
    
    if (wonder.effect && wonder.effect.coins) {
      newPlayer.coins += wonder.effect.coins;
    }
    
    const newPyramidRevealed = newPyramid.map(p => {
      if (!p.faceUp && isCardAccessible(newPyramid, p)) {
        return { ...p, faceUp: true };
      }
      return p;
    });
    
    const newPlayers = {
      ...gameState.players,
      [currentPlayer]: newPlayer
    };
    
    const militaryDiff = newPlayers[1].military - newPlayers[2].military;
    
    if (Math.abs(militaryDiff) >= 9) {
      const winner = militaryDiff > 0 ? 1 : 2;
      setGameState({
        ...gameState,
        winner,
        victoryType: 'military',
        players: newPlayers,
        militaryTrack: militaryDiff
      });
      setMessage(`Player ${winner} wins by Military Supremacy!`);
      return;
    }
    
    const cardsLeft = newPyramidRevealed.filter(p => !p.taken).length;
    if (cardsLeft === 0) {
      if (gameState.age < 3) {
        startNextAge(newPlayers, militaryDiff);
      } else {
        endGame(newPlayers, militaryDiff);
      }
      return;
    }
    
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    setGameState({
      ...gameState,
      pyramid: newPyramidRevealed,
      players: newPlayers,
      currentPlayer: nextPlayer,
      militaryTrack: militaryDiff
    });
    
    setSelectedCard(null);
    setSelectedWonder(null);
    setActionMode(null);
    
    if (gameMode === 'ai' && nextPlayer === 2) {
      setTimeout(() => aiTurn({ ...gameState, pyramid: newPyramidRevealed, players: newPlayers, currentPlayer: 2, militaryTrack: militaryDiff }), 1000);
    } else {
      setMessage(`Player ${nextPlayer}'s turn`);
    }
  };

  // Discard for coins
  const discardCard = (cardPosition) => {
    const currentPlayer = gameState.currentPlayer;
    const player = gameState.players[currentPlayer];
    
    const newPyramid = gameState.pyramid.map(p => 
      p === cardPosition ? { ...p, taken: true } : p
    );
    
    const newPlayer = { ...player, coins: player.coins + 2 + player.builtWonders.length };
    
    const newPyramidRevealed = newPyramid.map(p => {
      if (!p.faceUp && isCardAccessible(newPyramid, p)) {
        return { ...p, faceUp: true };
      }
      return p;
    });
    
    const newPlayers = {
      ...gameState.players,
      [currentPlayer]: newPlayer
    };
    
    const cardsLeft = newPyramidRevealed.filter(p => !p.taken).length;
    if (cardsLeft === 0) {
      if (gameState.age < 3) {
        startNextAge(newPlayers, gameState.militaryTrack);
      } else {
        endGame(newPlayers, gameState.militaryTrack);
      }
      return;
    }
    
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    setGameState({
      ...gameState,
      pyramid: newPyramidRevealed,
      players: newPlayers,
      currentPlayer: nextPlayer
    });
    
    setSelectedCard(null);
    setActionMode(null);
    
    if (gameMode === 'ai' && nextPlayer === 2) {
      setTimeout(() => aiTurn({ ...gameState, pyramid: newPyramidRevealed, players: newPlayers, currentPlayer: 2 }), 1000);
    } else {
      setMessage(`Player ${nextPlayer}'s turn`);
    }
  };

  // Start next age
  const startNextAge = (players, militaryTrack) => {
    const nextAge = gameState.age + 1;
    const deckKey = `deckAge${nextAge}`;
    const layoutKey = `age${nextAge}`;
    
    const newPyramid = INITIAL_PYRAMID_LAYOUTS[layoutKey].map((pos, idx) => ({
      ...pos,
      card: gameState[deckKey][pos.card],
      taken: false
    }));
    
    setGameState({
      ...gameState,
      age: nextAge,
      pyramid: newPyramid,
      players,
      currentPlayer: 1,
      militaryTrack
    });
    
    setMessage(`Age ${nextAge} begins! Player 1 starts.`);
  };

  // End game and calculate winner
  const endGame = (players, militaryTrack) => {
    const calculateVP = (player, opponent) => {
      let vp = 0;
      
      // Blue cards
      player.cards.forEach(card => {
        vp += card.points || 0;
      });
      
      // Wonders
      player.builtWonders.forEach(wonder => {
        vp += wonder.points || 0;
      });
      
      // Coins
      vp += Math.floor(player.coins / 3);
      
      // Military
      if (militaryTrack > 0 && player === players[1]) {
        if (militaryTrack >= 6) vp += 10;
        else if (militaryTrack >= 3) vp += 5;
        else if (militaryTrack >= 1) vp += 2;
      } else if (militaryTrack < 0 && player === players[2]) {
        if (militaryTrack <= -6) vp += 10;
        else if (militaryTrack <= -3) vp += 5;
        else if (militaryTrack <= -1) vp += 2;
      }
      
      // Science pairs
      const scienceSymbols = Object.values(player.science);
      scienceSymbols.forEach(count => {
        const pairs = Math.floor(count / 2);
        vp += pairs * 4; // Each pair is worth 4 points  
      });
      
      // Yellow card effects
      player.cards.forEach(card => {
        if (card.effect) {
          if (card.effect.vp_per_brown) {
            const brownCards = player.cards.filter(c => c.type === 'brown').length;
            vp += brownCards * card.effect.vp_per_brown;
          }
          if (card.effect.vp_per_gray) {
            const grayCards = player.cards.filter(c => c.type === 'gray').length;
            vp += grayCards * card.effect.vp_per_gray;
          }
          if (card.effect.vp_per_red) {
            const redCards = player.cards.filter(c => c.type === 'red').length;
            vp += redCards * card.effect.vp_per_red;
          }
          if (card.effect.vp_per_yellow) {
            const yellowCards = player.cards.filter(c => c.type === 'yellow').length;
            vp += yellowCards * card.effect.vp_per_yellow;
          }
          if (card.effect.vp_per_wonder) {
            vp += player.builtWonders.length * card.effect.vp_per_wonder;
          }
        }
      });
      
      // Purple guild effects
      player.cards.forEach(card => {
        if (card.type === 'purple' && card.effect) {
          if (card.effect.vp_per_wonder_opp) {
            vp += opponent.builtWonders.length * card.effect.vp_per_wonder_opp;
          }
          if (card.effect.vp_per_yellow_opp) {
            const oppYellow = opponent.cards.filter(c => c.type === 'yellow').length;
            vp += oppYellow * card.effect.vp_per_yellow_opp;
          }
          if (card.effect.vp_per_brownGray_own) {
            const brownGray = player.cards.filter(c => c.type === 'brown' || c.type === 'gray').length;
            vp += brownGray * card.effect.vp_per_brownGray_own;
          }
        }
      });
      
      return vp;
    };
    
    const vp1 = calculateVP(players[1], players[2]);
    const vp2 = calculateVP(players[2], players[1]);
    
    const winner = vp1 > vp2 ? 1 : (vp2 > vp1 ? 2 : null);
    
    setGameState({
      ...gameState,
      winner,
      victoryType: 'points',
      players: {
        ...players,
        1: { ...players[1], finalVP: vp1 },
        2: { ...players[2], finalVP: vp2 }
      },
      militaryTrack
    });
    
    if (winner) {
      setMessage(`Player ${winner} wins with ${winner === 1 ? vp1 : vp2} victory points!`);
    } else {
      setMessage(`Tie game! Both players have ${vp1} victory points.`);
    }
  };

  // Simple AI
  const aiTurn = (state) => {
    const player = state.players[2];
    const opponent = state.players[1];
    const opponentProduction = getProduction(opponent);
    
    // Get accessible cards
    const accessibleCards = state.pyramid.filter(p => isCardAccessible(state.pyramid, p) && !p.taken);
    
    // Prioritize science if close to victory
    const scienceTypes = Object.keys(player.science).length;
    if (scienceTypes >= 4) {
      const scienceCard = accessibleCards.find(p => 
        p.card.science && 
        !player.science[p.card.science] &&
        canAffordCard(player, p.card, opponentProduction)
      );
      if (scienceCard) {
        buildCard(scienceCard);
        return;
      }
    }
    
    // Try to build high-value cards
    const affordableCards = accessibleCards.filter(p => 
      isFreeChain(player, p.card) || canAffordCard(player, p.card, opponentProduction)
    );
    
    if (affordableCards.length > 0) {
      // Score each card
      const scoredCards = affordableCards.map(p => {
        let score = p.card.points || 0;
        if (p.card.military) score += p.card.military * 2;
        if (p.card.science) score += 5;
        if (p.card.type === 'brown' || p.card.type === 'gray') score += 2;
        if (isFreeChain(player, p.card)) score += 10;
        return { position: p, score };
      });
      
      scoredCards.sort((a, b) => b.score - a.score);
      buildCard(scoredCards[0].position);
      return;
    }
    
    // Try to build a wonder
    if (player.wonders.length > 0) {
      const affordableWonder = player.wonders.find(w => canAffordCard(player, w, opponentProduction));
      if (affordableWonder && accessibleCards.length > 0) {
        buildWonder(accessibleCards[0], affordableWonder);
        return;
      }
    }
    
    // Discard for coins
    if (accessibleCards.length > 0) {
      discardCard(accessibleCards[0]);
    }
  };

  // Card click handler
  const handleCardClick = (position) => {
    if (gameState.winner) return;
    if (gameMode === 'ai' && gameState.currentPlayer === 2) return;
    
    if (!isCardAccessible(gameState.pyramid, position)) {
      setMessage('Card is not accessible!');
      return;
    }
    
    setSelectedCard(position);
    setActionMode(null);
    setSelectedWonder(null);
  };

  if (!gameMode) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2c1810 0%, #4a2c1a 50%, #6b4423 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Cinzel', serif",
        color: '#f4e4c1'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', padding: '40px' }}>
          <h1 style={{
            fontSize: '3.5rem',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            letterSpacing: '2px'
          }}>
            7 Wonders Duel
          </h1>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '40px',
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            Build your civilization through three ages. Achieve victory through military might, scientific discovery, or accumulated glory.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button
              onClick={() => initGame('pvp')}
              style={{
                padding: '15px 40px',
                fontSize: '1.2rem',
                background: 'linear-gradient(135deg, #8b6914 0%, #c9a227 100%)',
                border: '2px solid #f4e4c1',
                borderRadius: '8px',
                color: '#2c1810',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: "'Cinzel', serif",
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.target.style.transform = 'scale(1)'}
            >
              Player vs Player
            </button>
            <button
              onClick={() => initGame('ai')}
              style={{
                padding: '15px 40px',
                fontSize: '1.2rem',
                background: 'linear-gradient(135deg, #6b4423 0%, #8b6914 100%)',
                border: '2px solid #f4e4c1',
                borderRadius: '8px',
                color: '#f4e4c1',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: "'Cinzel', serif",
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.target.style.transform = 'scale(1)'}
            >
              Player vs AI
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!gameState) return null;

  const currentPlayer = gameState.players[gameState.currentPlayer];
  const opponent = gameState.players[gameState.currentPlayer === 1 ? 2 : 1];
  const opponentProduction = getProduction(opponent);

  const getCardColor = (type) => {
    const colors = {
      brown: '#8b4513',
      gray: '#708090',
      red: '#b22222',
      green: '#228b22',
      blue: '#1e90ff',
      yellow: '#ffd700',
      purple: '#9370db'
    };
    return colors[type] || '#666';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2c1810 0%, #4a2c1a 50%, #6b4423 100%)',
      padding: '20px',
      fontFamily: "'Cinzel', serif",
      color: '#f4e4c1'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap" rel="stylesheet" />
      
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
        borderBottom: '2px solid #8b6914',
        paddingBottom: '15px'
      }}>
        <h1 style={{ fontSize: '2rem', margin: '0 0 10px 0' }}>
          Age {gameState.age}
        </h1>
        {message && (
          <div style={{
            padding: '10px',
            background: 'rgba(139, 105, 20, 0.3)',
            borderRadius: '4px',
            fontSize: '1.1rem'
          }}>
            {message}
          </div>
        )}
      </div>

      {/* Players Info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {[1, 2].map(playerNum => {
          const player = gameState.players[playerNum];
          const isActive = gameState.currentPlayer === playerNum && !gameState.winner;
          
          return (
            <div key={playerNum} style={{
              background: isActive ? 'rgba(139, 105, 20, 0.3)' : 'rgba(0, 0, 0, 0.3)',
              border: `2px solid ${isActive ? '#c9a227' : '#8b6914'}`,
              borderRadius: '8px',
              padding: '15px'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.3rem' }}>
                Player {playerNum} {gameMode === 'ai' && playerNum === 2 && '(AI)'}
                {gameState.winner === playerNum && ' 👑'}
              </h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Coins size={20} />
                <span style={{ fontSize: '1.1rem' }}>{player.coins}</span>
                <Swords size={20} style={{ marginLeft: '15px' }} />
                <span style={{ fontSize: '1.1rem' }}>{player.military}</span>
              </div>
              
              {Object.keys(player.science).length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Science:</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {Object.entries(player.science).map(([type, count]) => (
                      <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ScienceIcon type={type} size={18} />
                        <span>×{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
                Cards: {player.cards.length} | Wonders: {player.builtWonders.length}/4
              </div>
              
              {gameState.winner && player.finalVP !== undefined && (
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '10px' }}>
                  Final Score: {player.finalVP}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Military Track */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '1.1rem' }}>
          Military Track
        </div>
        <div style={{ position: 'relative', height: '40px' }}>
          <div style={{
            position: 'absolute',
            left: '10%',
            right: '10%',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '4px',
            background: 'linear-gradient(to right, #b22222 0%, #666 50%, #1e90ff 100%)'
          }} />
          {[-9, -6, -3, 0, 3, 6, 9].map(pos => (
            <div key={pos} style={{
              position: 'absolute',
              left: `${50 + (pos / 9) * 40}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#8b6914',
              border: '2px solid #f4e4c1'
            }} />
          ))}
          <div style={{
            position: 'absolute',
            left: `${50 + (gameState.militaryTrack / 9) * 40}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '2rem'
          }}>
            ⚔️
          </div>
        </div>
      </div>

      {/* Pyramid */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Card Pyramid</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          {[...Array(6)].map((_, rowIdx) => {
            const rowCards = gameState.pyramid.filter(p => p.row === rowIdx);
            return (
              <div key={rowIdx} style={{ display: 'flex', gap: '10px' }}>
                {rowCards.map((position, colIdx) => {
                  const accessible = isCardAccessible(gameState.pyramid, position);
                  const card = position.card;
                  const isSelected = selectedCard === position;
                  
                  if (position.taken) {
                    return (
                      <div key={colIdx} style={{
                        width: '80px',
                        height: '110px',
                        opacity: 0.2
                      }} />
                    );
                  }
                  
                  return (
                    <div
                      key={colIdx}
                      onClick={() => handleCardClick(position)}
                      style={{
                        width: '80px',
                        height: '110px',
                        background: position.faceUp ? getCardColor(card.type) : '#3a2414',
                        border: `3px solid ${isSelected ? '#ffd700' : (accessible ? '#c9a227' : '#666')}`,
                        borderRadius: '6px',
                        cursor: accessible ? 'pointer' : 'not-allowed',
                        opacity: accessible ? 1 : 0.5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '5px',
                        fontSize: '0.7rem',
                        textAlign: 'center',
                        color: '#fff',
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? '0 0 15px rgba(255, 215, 0, 0.6)' : 'none'
                      }}
                    >
                      {position.faceUp ? (
                        <>
                          <div style={{ fontWeight: 'bold', marginBottom: '3px', fontSize: '0.6rem', lineHeight: '1.1' }}>
                            {card.name}
                          </div>
                          
                          {/* Cost */}
                          {card.cost && Object.keys(card.cost).length > 0 && (
                            <div style={{ display: 'flex', gap: '2px', marginBottom: '2px', flexWrap: 'wrap', justifyContent: 'center' }}>
                              {Object.entries(card.cost).map(([resource, amount]) => (
                                <div key={resource} style={{ display: 'flex', alignItems: 'center', fontSize: '0.65rem' }}>
                                  {resource === 'coin' ? (
                                    <span>💰{amount}</span>
                                  ) : (
                                    <>
                                      <ResourceIcon type={resource} size={12} />
                                      <span style={{ fontSize: '0.6rem' }}>{amount}</span>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Production */}
                          {card.produces && (
                            <div style={{ display: 'flex', gap: '3px', marginBottom: '2px', flexWrap: 'wrap', justifyContent: 'center' }}>
                              {Object.entries(card.produces).map(([resource, amount]) => (
                                <div key={resource} style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.2)', padding: '1px 3px', borderRadius: '2px' }}>
                                  <ResourceIcon type={resource} size={12} />
                                  {amount > 1 && <span style={{ fontSize: '0.6rem', marginLeft: '1px' }}>×{amount}</span>}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Effects */}
                          <div style={{ display: 'flex', gap: '3px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {card.points > 0 && (
                              <div style={{ fontSize: '0.75rem' }}>★{card.points}</div>
                            )}
                            {card.military > 0 && (
                              <div style={{ fontSize: '0.7rem' }}>⚔️{card.military}</div>
                            )}
                            {card.science && (
                              <ScienceIcon type={card.science} size={14} />
                            )}
                            {card.effect?.coins && (
                              <div style={{ fontSize: '0.7rem' }}>+{card.effect.coins}💰</div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div style={{ fontSize: '1.5rem' }}>?</div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Panel */}
      {selectedCard && !gameState.winner && (
        <div style={{
          background: 'rgba(139, 105, 20, 0.4)',
          border: '2px solid #c9a227',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginTop: 0 }}>Selected: {selectedCard.card.name}</h3>
          
          <div style={{ marginBottom: '15px' }}>
            {selectedCard.card.cost && Object.keys(selectedCard.card.cost).length > 0 && (
              <div style={{ marginBottom: '10px' }}>
                <strong>Cost:</strong>{' '}
                {Object.entries(selectedCard.card.cost).map(([resource, amount]) => (
                  <span key={resource} style={{ marginRight: '10px' }}>
                    {resource === 'coin' ? (
                      <>💰 {amount}</>
                    ) : (
                      <>
                        <ResourceIcon type={resource} size={16} /> {amount}
                      </>
                    )}
                  </span>
                ))}
              </div>
            )}
            
            {isFreeChain(currentPlayer, selectedCard.card) && (
              <div style={{ color: '#90ee90', marginBottom: '10px' }}>
                ✓ FREE (Chained from {selectedCard.card.chainedFrom})
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => buildCard(selectedCard)}
              disabled={!isFreeChain(currentPlayer, selectedCard.card) && !canAffordCard(currentPlayer, selectedCard.card, opponentProduction)}
              style={{
                padding: '10px 20px',
                background: '#228b22',
                border: '2px solid #f4e4c1',
                borderRadius: '6px',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: "'Cinzel', serif",
                fontSize: '1rem',
                opacity: (isFreeChain(currentPlayer, selectedCard.card) || canAffordCard(currentPlayer, selectedCard.card, opponentProduction)) ? 1 : 0.5
              }}
            >
              Build Card
            </button>
            
            {currentPlayer.wonders.length > 0 && (
              <button
                onClick={() => setActionMode('wonder')}
                style={{
                  padding: '10px 20px',
                  background: '#8b6914',
                  border: '2px solid #f4e4c1',
                  borderRadius: '6px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontFamily: "'Cinzel', serif",
                  fontSize: '1rem'
                }}
              >
                Build Wonder
              </button>
            )}
            
            <button
              onClick={() => discardCard(selectedCard)}
              style={{
                padding: '10px 20px',
                background: '#666',
                border: '2px solid #f4e4c1',
                borderRadius: '6px',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: "'Cinzel', serif",
                fontSize: '1rem'
              }}
            >
              Discard (+{2 + currentPlayer.builtWonders.length}💰)
            </button>
          </div>
          
          {actionMode === 'wonder' && (
            <div style={{ marginTop: '20px' }}>
              <h4>Choose Wonder to Build:</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {currentPlayer.wonders.map(wonder => (
                  <button
                    key={wonder.id}
                    onClick={() => buildWonder(selectedCard, wonder)}
                    disabled={!canAffordCard(currentPlayer, wonder, opponentProduction)}
                    style={{
                      padding: '15px',
                      background: 'rgba(139, 105, 20, 0.4)',
                      border: '2px solid #c9a227',
                      borderRadius: '6px',
                      color: '#f4e4c1',
                      cursor: 'pointer',
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.9rem',
                      opacity: canAffordCard(currentPlayer, wonder, opponentProduction) ? 1 : 0.5,
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{wonder.name}</div>
                    <div style={{ fontSize: '0.8rem' }}>
                      Cost: {Object.entries(wonder.cost).map(([r, a]) => `${r}: ${a}`).join(', ')}
                    </div>
                    <div style={{ fontSize: '0.8rem' }}>
                      {wonder.points} VP
                      {wonder.military && ` | ${wonder.military}⚔️`}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Game Over */}
      {gameState.winner && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #8b6914 0%, #c9a227 100%)',
            padding: '40px',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#2c1810',
            maxWidth: '500px'
          }}>
            <Trophy size={64} style={{ marginBottom: '20px' }} />
            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
              Player {gameState.winner} Wins!
            </h2>
            <p style={{ fontSize: '1.3rem', marginBottom: '30px' }}>
              {gameState.victoryType === 'military' && 'Military Supremacy'}
              {gameState.victoryType === 'science' && 'Scientific Supremacy'}
              {gameState.victoryType === 'points' && `${gameState.players[gameState.winner].finalVP} Victory Points`}
            </p>
            <button
              onClick={() => {
                setGameMode(null);
                setGameState(null);
              }}
              style={{
                padding: '15px 40px',
                fontSize: '1.2rem',
                background: '#2c1810',
                border: '2px solid #f4e4c1',
                borderRadius: '8px',
                color: '#f4e4c1',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: "'Cinzel', serif"
              }}
            >
              New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
