import React, { useState } from 'react';
import fullItems from './Enriched_Magic_Items.json';
import './App.css';

function getRandom(arr, count = 1) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return count === 1 ? shuffled[0] : shuffled.slice(0, count);
}

function getPriceVariants(base) {
  const low = Math.floor(base * 0.75);
  const high = Math.ceil(base * 1.25);
  return { low, normal: base, high };
}

const shopNames = [
  "The Unseen Lantern", "Arcana & Oddities", "The Whispering Wand",
  "Mystic Curios", "Sigil & Spark", "The Starry Sigil",
  "Scroll & Sparkle", "The Silent Tome","The Gilded Wand",
"Mystra’s Favor",
"The Arcana Emporium",
"Whispering Wards",
"Eldritch Elegance",
"Fizzwick’s Fantastic Finds",
"The Wandering Wisp",
"Cauldron & Curiosity",
"Toadstool Trinkets",
"The Hopping Hat",
"The Obsidian Grimoire",
"Hex & Hollow",
"Black Candle Bazaar",
"The Shrouded Sigil",
"Nightshade Relics",
"Runes & Relics",
"The Forgotten Scroll",
"Dust & Magic",
"Scrollkeeper’s Sanctum",
"The Arcanist’s Archive",
"Vials & Visions",
"Moonroot Market",
"Alchemist’s Asylum",
"Philter & Flame",
"Brew & Bauble",
"Wands 'n’ Whatnot",
"Staff It Up!",
"Magic Mishaps & More",
"The Crystal Critter",
"Abra-cad-Abode",
"The Enchanter’s Nook",
"Mystic Merchant",
"The Sorcerer’s Shelf",
"The Charm Chamber",
"The Arcane Armory"
];

 const shopDescriptions = [
  "A cramped wooden stall covered in everburning torches and strange aromas.",
  "A floating crystal tower that hums when customers approach.",
  "Carved into a giant petrified tree glowing faintly with magical veins.",
  "An underground shop behind a false wall in a dusty library.",
  "A hollowed-out basilisk skull with shelves made of polished bone.",
  "A wagon-sized snail shell with a glowing sign that reads 'Open-ish'.",
  "A cave hidden behind a waterfall, lit by bioluminescent mushrooms.",
  "A rotating orb in midair, its walls shifting like dreamstuff.",
  "A hut on chicken legs that moves to avoid nosy inspectors.",
  "A gnome-run airship that lands only when it senses 'big spenders'.",
  "An abandoned temple where the statues whisper deals to passing buyers.",
  "A bakery that sells pastries up front and wands in the back oven room.",
  "A cobblestone courtyard only visible during the full moon."
];



const shopkeepers = [
  "Marlowe the Bronze – a warforged illusionist with a dry sense of humor and a love of riddles.",
  "Thrella Hallowhand – a blind half-elf enchantress who speaks in cryptic couplets.",
  "Dobbik Flintlock – a retired dwarven adventurer with one eye, a limp, and a taste for pipe smoke.",
  "Nirra Moonvine – an eladrin druid who changes her mood and outfit with the seasons.",
  "Skizzix – a goblin mage in a patched robe, constantly chewing candied beetles.",
  "Vaelor the Pale – a tiefling who never blinks and always whispers his prices.",
  "Edeena of the Veil – a seer who glimpses your past as you enter the store.",
  "Zynn Coinflipper – a gnome who flips a coin before every transaction.",
  "Orrin Driftwhistle – a halfling alchemist who mixes potions by ear.",
  "Krezk Irongut – a gruff half-orc who's surprisingly delicate with enchanted jewelry.",
  "Mistress Wyrmwhisper – a dragonborn with a smoky voice and scales that shimmer when she lies.",
  "Brother Cedric – a devout cleric who runs the shop to “balance his karma.”",
  "Magna the Unmoving – a stone-skinned earth genasi who hasn't blinked since last year."
];



  const patrons = [
  "A kobold bartering dragon toenails for magic beans.",
  "A noble drow inspecting a wand of fireballs with suspicion.",
  "A goblin child licking a display case.",
  "An orc poet reciting verses to a broom of flying.",
  "A tiefling silently watching from the shadows.",
  "A halfling gambler trying to haggle down a cursed dice set.",
  "A tabaxi tracing glyphs in the air with glowing fingers.",
  "A dragonborn noble loudly announcing every item they examine.",
  "A ghostly figure muttering about 'unfinished magical business.'",
  "Two elves comparing the shop to one 'way better in Silverymoon.'",
  "A nervous apprentice looking for a potion to turn into a cat.",
  "A bard trying to trade an original love song for a scroll of fireball.",
  "A squire asking if any of these boots are faster than a dire wolf.",
  "A mysterious cloaked figure asking for ‘anything cursed... on purpose.’"
];



function App() {
  const [shop, setShop] = useState(null);
const [tier, setTier] = useState('Small Town');
const [searchTerm, setSearchTerm] = useState('');

const catalogResults = fullItems
  .filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.rules?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .slice(0, 25); // Limit to 25 results


  const generateShop = () => {
  const rarityWeights = {
    'Small Town': { Common: 40, Uncommon: 40, Rare: 15, 'Very Rare': 5, Legendary: 0 },
    'City':       { Common: 20, Uncommon: 40, Rare: 25, 'Very Rare': 10, Legendary: 5 },
    'Capital':    { Common: 5,  Uncommon: 25, Rare: 30, 'Very Rare': 25, Legendary: 15 },
  };

  function weightedRandomRarity(tierName) {
    const weights = rarityWeights[tierName];
    const entries = Object.entries(weights);
    const total = entries.reduce((acc, [, w]) => acc + w, 0);
    let rand = Math.random() * total;
    for (const [rarity, weight] of entries) {
      if (rand < weight) return rarity;
      rand -= weight;
    }
    return 'Common';
  }

  const filteredItems = [];
  while (filteredItems.length < 6) {
    const rarity = weightedRandomRarity(tier);
    const matching = fullItems.filter(i => i.rarity === rarity);
    if (matching.length > 0) {
      const item = getRandom(matching);
      if (!filteredItems.find(i => i.name === item.name)) {
        filteredItems.push({ ...item, prices: getPriceVariants(item.price) });
      }
    }
  }

  const visitors = getRandom(patrons, 3);
  const inventory = [...filteredItems];

  const broomItem = fullItems.find(i => i.name === "Broom of Flying");
  if (
    broomItem &&
    visitors.some(v => v.toLowerCase().includes("broom of flying")) &&
    !inventory.find(i => i.name === broomItem.name)
  ) {
    inventory.push({ ...broomItem, prices: getPriceVariants(broomItem.price) });
  }

  setShop({
    name: getRandom(shopNames),
    description: getRandom(shopDescriptions),
    keeper: getRandom(shopkeepers),
    visitors,
    inventory
  });
};


  return (
    <div className="App" style={{ padding: '2rem', maxWidth: '800px', margin: 'auto', fontFamily: 'serif' }}>
      <h1 style={{ fontSize: '2rem' }}>🧙 Magic Shop Generator</h1>
     <div style={{ marginBottom: '2rem' }}>
  {/* Toolbar Section */}
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: '700px',
    margin: '0 auto 1rem auto'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
      <label htmlFor="tier"><strong>Select Shop Tier:</strong></label>
      <select
        id="tier"
        value={tier}
        onChange={(e) => setTier(e.target.value)}
      >
        <option>Small Town</option>
        <option>City</option>
        <option>Capital</option>
      </select>
    </div>

    <input
      type="text"
      placeholder="Search all magic items..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: '0.5rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        background: '#fff7e6',
        width: '250px',
        marginBottom: '0.5rem'
      }}
    />
  </div>

  {/* Generate Button */}
  <div style={{ textAlign: 'center' }}>
    <button onClick={generateShop}>
      Generate Magic Shop
    </button>
  </div>
</div>


<div style={{ marginTop: '2rem' }}>
  <h2>📖 Magical Catalog</h2>
  <input
    type="text"
    placeholder="Search all magic items..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      padding: '0.5rem',
      width: '100%',
      maxWidth: '400px',
      marginBottom: '1rem',
      borderRadius: '6px',
      border: '1px solid #ccc'
    }}
  />
  
  {searchTerm && (
    <ul>
      {catalogResults.map((item, index) => (
        <li key={index}>
          <strong>{item.name}</strong>: {item.description}<br />
          <span className="text-sm italic">{item.rules}</span><br />
          <em>{item.rarity}</em> • Price: {item.price.toLocaleString()} gp
        </li>
      ))}
    </ul>
  )}
</div>




      {shop && (
        <div>
          <h2>🏪 {shop.name}</h2>
          <p><em>{shop.description}</em></p>
          <p><strong>Shopkeeper:</strong> {shop.keeper}</p>
          <p><strong>Visitors:</strong></p>
          <ul>
            {shop.visitors.map((v, i) => <li key={i}>{v}</li>)}
          </ul>
          <p><strong>Inventory:</strong></p>
          <ul>
            {shop.inventory.map((item, i) => (
              <li key={i}>
                <strong>{item.name}</strong>: {item.description}<br />
<span className="text-sm italic">{item.rules}</span><br />
                <em>{item.rarity}</em> • 
                Prices: {item.prices.low} gp (Low) | {item.prices.normal} gp (Normal) | {item.prices.high} gp (High)<br /><br />


              </li>
            ))}
          </ul>

        </div>
      )}



    </div>
  );
}

export default App;
