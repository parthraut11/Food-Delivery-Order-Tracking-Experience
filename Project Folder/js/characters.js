/**
 * CURIO Character & Mascot Design System
 * 100% Original, Safe, Non-Copyrighted Vector SVG Character Assets
 * Includes: Mascot CURIO, 5 Archetype Heroes, Monsters, and Pets
 */

const CurioCharacters = {
  // Mascot CURIO: Adorable cosmic star explorer
  getCurioSvg(expression = 'happy', size = 120) {
    let eyes = `
      <circle cx="48" cy="58" r="9" fill="#1E1B4B" />
      <circle cx="51" cy="55" r="3.5" fill="#FFFFFF" />
      <circle cx="72" cy="58" r="9" fill="#1E1B4B" />
      <circle cx="75" cy="55" r="3.5" fill="#FFFFFF" />
    `;
    let mouth = `<path d="M52 70 Q60 80 68 70" stroke="#1E1B4B" stroke-width="3.5" stroke-linecap="round" fill="none" />`;
    let cheekL = `<ellipse cx="40" cy="68" rx="6" ry="4" fill="#FDA4AF" opacity="0.8" />`;
    let cheekR = `<ellipse cx="80" cy="68" rx="6" ry="4" fill="#FDA4AF" opacity="0.8" />`;

    if (expression === 'cheer') {
      mouth = `<path d="M50 67 Q60 84 70 67 Z" fill="#F43F5E" stroke="#1E1B4B" stroke-width="2.5" />`;
    } else if (expression === 'wink') {
      eyes = `
        <circle cx="48" cy="58" r="9" fill="#1E1B4B" />
        <circle cx="51" cy="55" r="3.5" fill="#FFFFFF" />
        <path d="M66 60 Q72 52 78 60" stroke="#1E1B4B" stroke-width="3.5" stroke-linecap="round" fill="none" />
      `;
    }

    return `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="curio-mascot-svg">
      <defs>
        <radialGradient id="curioBodyGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FDE047" />
          <stop offset="60%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#D97706" />
        </radialGradient>
        <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="40%" stop-color="#60A5FA" />
          <stop offset="100%" stop-color="#3B82F6" />
        </radialGradient>
        <filter id="glowCurio" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Antenna with glowing star -->
      <path d="M60 38 Q58 20 60 12" stroke="#D97706" stroke-width="4.5" stroke-linecap="round" />
      <polygon points="60,4 63,11 71,12 65,17 67,25 60,20 53,25 55,17 49,12 57,11" fill="url(#starGrad)" filter="url(#glowCurio)" />

      <!-- Floating Little Hands -->
      <ellipse cx="24" cy="72" rx="9" ry="7" fill="#F59E0B" class="curio-hand-l" />
      <ellipse cx="96" cy="72" rx="9" ry="7" fill="#F59E0B" class="curio-hand-r" />

      <!-- Cute Bouncy Main Body -->
      <rect x="25" y="32" width="70" height="66" rx="33" fill="url(#curioBodyGrad)" filter="drop-shadow(0 8px 12px rgba(217,119,6,0.25))" />

      <!-- Tummy Highlight / Heart -->
      <path d="M60 84 Q55 77 50 82 Q45 88 60 96 Q75 88 70 82 Q65 77 60 84 Z" fill="#FEF08A" opacity="0.85" />

      <!-- Cheeks, Eyes & Mouth -->
      ${cheekL}
      ${cheekR}
      ${eyes}
      ${mouth}

      <!-- Tiny feet -->
      <ellipse cx="44" cy="98" rx="8" ry="5" fill="#D97706" />
      <ellipse cx="76" cy="98" rx="8" ry="5" fill="#D97706" />
    </svg>
    `;
  },

  // 1. Brave Web Hero ("Cobalt Weaver") - Sleek cobalt/gold web suit with tech visor
  getHeroWeb(size = 140) {
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="hero-avatar-svg hero-web">
      <defs>
        <linearGradient id="webSuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563EB" />
          <stop offset="100%" stop-color="#1E3A8A" />
        </linearGradient>
        <linearGradient id="webGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FBBF24" />
          <stop offset="100%" stop-color="#D97706" />
        </linearGradient>
      </defs>
      <!-- Background Badge Aura -->
      <circle cx="70" cy="70" r="64" fill="#EFF6FF" stroke="#3B82F6" stroke-width="4" />
      <circle cx="70" cy="70" r="56" fill="#DBEAFE" />

      <!-- Hero Torso & Shoulders -->
      <path d="M42 112 C42 90 52 82 70 82 C88 82 98 90 98 112 Z" fill="url(#webSuitGrad)" />
      <!-- Chest Web Emblem -->
      <path d="M70 84 L70 106 M58 92 L82 92 M60 102 L80 102" stroke="#FBBF24" stroke-width="2.5" stroke-linecap="round" />
      <polygon points="70,89 74,96 70,103 66,96" fill="#F59E0B" />

      <!-- Head Mask -->
      <ellipse cx="70" cy="54" rx="28" ry="32" fill="url(#webSuitGrad)" />
      <!-- Web lines on cowl -->
      <path d="M70 22 L70 42 M50 32 L90 32 M44 48 L96 48" stroke="#60A5FA" stroke-width="1.8" opacity="0.6" stroke-linecap="round" />

      <!-- Brave Glowing Visor Eyes -->
      <path d="M48 50 Q56 46 66 54 Q56 60 48 50 Z" fill="#FEF08A" stroke="#F59E0B" stroke-width="2" />
      <path d="M92 50 Q84 46 74 54 Q84 60 92 50 Z" fill="#FEF08A" stroke="#F59E0B" stroke-width="2" />

      <!-- Tech Gauntlet Web Shooters -->
      <rect x="34" y="98" width="10" height="14" rx="4" fill="url(#webGoldGrad)" />
      <rect x="96" y="98" width="10" height="14" rx="4" fill="url(#webGoldGrad)" />
    </svg>
    `;
  },

  // 2. Super Strong Green Hero ("Jade Titan") - Gentle moss giant with stone & leaf armor
  getHeroStrong(size = 140) {
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="hero-avatar-svg hero-strong">
      <defs>
        <linearGradient id="jadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#34D399" />
          <stop offset="100%" stop-color="#059669" />
        </linearGradient>
        <linearGradient id="stoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6EE7B7" />
          <stop offset="100%" stop-color="#047857" />
        </linearGradient>
      </defs>
      <!-- Background Badge Aura -->
      <circle cx="70" cy="70" r="64" fill="#ECFDF5" stroke="#10B981" stroke-width="4" />
      <circle cx="70" cy="70" r="56" fill="#D1FAE5" />

      <!-- Colossal Friendly Shoulders & Torso -->
      <path d="M30 114 C30 84 45 78 70 78 C95 78 110 84 110 114 Z" fill="url(#stoneGrad)" />
      <!-- Giant Leaf / Clover Crest -->
      <circle cx="70" cy="94" r="9" fill="#A7F3D0" />
      <circle cx="64" cy="98" r="6" fill="#34D399" />
      <circle cx="76" cy="98" r="6" fill="#34D399" />

      <!-- Big Friendly Head -->
      <ellipse cx="70" cy="50" rx="30" ry="28" fill="url(#jadeGrad)" />

      <!-- Mossy Hair / Nature Tuft -->
      <path d="M50 28 Q70 12 90 28 Q80 20 70 24 Q60 20 50 28 Z" fill="#047857" />

      <!-- Loving, Friendly Eyes & Smile -->
      <circle cx="58" cy="48" r="5" fill="#064E3B" />
      <circle cx="60" cy="46" r="2" fill="#FFFFFF" />
      <circle cx="82" cy="48" r="5" fill="#064E3B" />
      <circle cx="84" cy="46" r="2" fill="#FFFFFF" />

      <!-- Cheerful Giant Smile -->
      <path d="M60 62 Q70 72 80 62" stroke="#064E3B" stroke-width="4" stroke-linecap="round" fill="none" />
      <ellipse cx="50" cy="56" rx="5" ry="3" fill="#6EE7B7" opacity="0.7" />
      <ellipse cx="90" cy="56" rx="5" ry="3" fill="#6EE7B7" opacity="0.7" />
    </svg>
    `;
  },

  // 3. Tech Genius Hero ("Sparky Volt") - Violet & gold cyber gadgeteer with holographic goggles
  getHeroTech(size = 140) {
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="hero-avatar-svg hero-tech">
      <defs>
        <linearGradient id="techSuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8B5CF6" />
          <stop offset="100%" stop-color="#6D28D9" />
        </linearGradient>
        <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06B6D4" />
          <stop offset="100%" stop-color="#3B82F6" />
        </linearGradient>
      </defs>
      <!-- Background Badge Aura -->
      <circle cx="70" cy="70" r="64" fill="#F5F3FF" stroke="#8B5CF6" stroke-width="4" />
      <circle cx="70" cy="70" r="56" fill="#EDE9FE" />

      <!-- Tech suit body -->
      <path d="M40 114 C40 90 52 82 70 82 C88 82 100 90 100 114 Z" fill="url(#techSuitGrad)" />
      <!-- Power Core Reactor -->
      <circle cx="70" cy="98" r="10" fill="#22D3EE" stroke="#FEF08A" stroke-width="2.5" />
      <path d="M68 93 L72 98 L68 99 L72 103" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />

      <!-- Head & Spiky Energetic Hair -->
      <ellipse cx="70" cy="54" rx="26" ry="28" fill="#FDE047" />
      <path d="M48 36 L56 20 L66 32 L78 16 L84 32 L94 22 L92 40 Z" fill="#F59E0B" />

      <!-- Cyber Goggles -->
      <rect x="44" y="44" width="52" height="18" rx="8" fill="url(#visorGrad)" stroke="#E0E7FF" stroke-width="2.5" />
      <!-- Glow lines in visor -->
      <line x1="48" y1="53" x2="64" y2="53" stroke="#A5F3FC" stroke-width="2" stroke-linecap="round" />
      <line x1="76" y1="53" x2="92" y2="53" stroke="#A5F3FC" stroke-width="2" stroke-linecap="round" />

      <!-- Smart grin -->
      <path d="M62 66 Q70 72 78 66" stroke="#4C1D95" stroke-width="3" stroke-linecap="round" fill="none" />

      <!-- Floating Mini Drone Buddy -->
      <circle cx="108" cy="40" r="12" fill="#38BDF8" stroke="#0284C7" stroke-width="2" />
      <circle cx="108" cy="40" r="4" fill="#FFFFFF" />
    </svg>
    `;
  },

  // 4. Ice Princess ("Crystal Frostina") - Shimmering cyan & silver gown, snowflake tiara
  getHeroIce(size = 140) {
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="hero-avatar-svg hero-ice">
      <defs>
        <linearGradient id="iceDressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" />
          <stop offset="100%" stop-color="#0284C7" />
        </linearGradient>
        <linearGradient id="iceHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E0F2FE" />
          <stop offset="100%" stop-color="#BAE6FD" />
        </linearGradient>
      </defs>
      <!-- Background Badge Aura -->
      <circle cx="70" cy="70" r="64" fill="#F0F9FF" stroke="#0284C7" stroke-width="4" />
      <circle cx="70" cy="70" r="56" fill="#E0F2FE" />

      <!-- Crystal Gown -->
      <path d="M44 114 C44 92 54 84 70 84 C86 84 96 92 96 114 Z" fill="url(#iceDressGrad)" />
      <!-- Crystalline Collar & Gem -->
      <polygon points="70,82 78,92 70,102 62,92" fill="#E0F2FE" stroke="#FFFFFF" stroke-width="1.5" />

      <!-- Flowing Frost Platinum Hair -->
      <ellipse cx="70" cy="54" rx="27" ry="29" fill="url(#iceHairGrad)" />
      <path d="M42 54 C38 78 44 96 46 104 C50 88 50 68 50 56 Z" fill="#BAE6FD" />
      <path d="M98 54 C102 78 96 96 94 104 C90 88 90 68 90 56 Z" fill="#BAE6FD" />

      <!-- Face -->
      <ellipse cx="70" cy="55" rx="20" ry="21" fill="#FEF08A" opacity="0.4" />
      <ellipse cx="70" cy="55" rx="19" ry="20" fill="#FFFBEB" />

      <!-- Sparkling Eyes -->
      <ellipse cx="63" cy="54" rx="4" ry="5" fill="#0369A1" />
      <circle cx="65" cy="52" r="1.5" fill="#FFFFFF" />
      <ellipse cx="77" cy="54" rx="4" ry="5" fill="#0369A1" />
      <circle cx="79" cy="52" r="1.5" fill="#FFFFFF" />

      <!-- Sweet Smile -->
      <path d="M66 64 Q70 68 74 64" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <ellipse cx="58" cy="59" rx="3.5" ry="2" fill="#FDA4AF" />
      <ellipse cx="82" cy="59" rx="3.5" ry="2" fill="#FDA4AF" />

      <!-- Snowflake Tiara Crown -->
      <polygon points="70,22 75,32 84,28 78,38 88,40 76,44 64,44 52,40 62,38 56,28 65,32" fill="#38BDF8" stroke="#FFFFFF" stroke-width="1.5" />
    </svg>
    `;
  },

  // 5. Forest Princess ("Blossom Flora") - Rose & emerald petal gown, floral wreath crown
  getHeroForest(size = 140) {
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="hero-avatar-svg hero-forest">
      <defs>
        <linearGradient id="forestGownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FB7185" />
          <stop offset="100%" stop-color="#E11D48" />
        </linearGradient>
        <linearGradient id="natureHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#92400E" />
          <stop offset="100%" stop-color="#78350F" />
        </linearGradient>
      </defs>
      <!-- Background Badge Aura -->
      <circle cx="70" cy="70" r="64" fill="#FDF2F8" stroke="#EC4899" stroke-width="4" />
      <circle cx="70" cy="70" r="56" fill="#FCE7F3" />

      <!-- Petal Gown with leafy vines -->
      <path d="M44 114 C44 92 54 84 70 84 C86 84 96 92 96 114 Z" fill="url(#forestGownGrad)" />
      <path d="M70 84 Q74 98 70 114 M60 92 Q66 98 62 108 M80 92 Q74 98 78 108" stroke="#A7F3D0" stroke-width="2.5" stroke-linecap="round" />

      <!-- Flowing Chestnut Hair -->
      <ellipse cx="70" cy="54" rx="27" ry="29" fill="url(#natureHairGrad)" />
      <path d="M42 52 C36 76 44 98 48 108 C50 92 50 68 50 56 Z" fill="#78350F" />
      <path d="M98 52 C104 76 96 98 92 108 C90 92 90 68 90 56 Z" fill="#78350F" />

      <!-- Face -->
      <ellipse cx="70" cy="55" rx="19" ry="20" fill="#FFFBEB" />

      <!-- Big Gentle Eyes -->
      <ellipse cx="63" cy="54" rx="4" ry="5" fill="#047857" />
      <circle cx="65" cy="52" r="1.5" fill="#FFFFFF" />
      <ellipse cx="77" cy="54" rx="4" ry="5" fill="#047857" />
      <circle cx="79" cy="52" r="1.5" fill="#FFFFFF" />

      <!-- Happy Smile -->
      <path d="M66 64 Q70 69 74 64" stroke="#BE185D" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <ellipse cx="58" cy="59" rx="3.5" ry="2" fill="#F472B6" />
      <ellipse cx="82" cy="59" rx="3.5" ry="2" fill="#F472B6" />

      <!-- Floral Wreath Crown -->
      <path d="M50 36 Q70 28 90 36" stroke="#10B981" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="54" cy="34" r="5" fill="#F43F5E" />
      <circle cx="62" cy="31" r="5" fill="#FBBF24" />
      <circle cx="70" cy="30" r="6" fill="#F472B6" />
      <circle cx="78" cy="31" r="5" fill="#FBBF24" />
      <circle cx="86" cy="34" r="5" fill="#F43F5E" />
    </svg>
    `;
  },

  // Quirky Friendly Monster for Math Quest ("Giggle-Gargoyle" / "Puff-Grump")
  getMonsterSvg(transformed = false, size = 150) {
    if (transformed) {
      // Monster transformed into friendly sparkling floating critter!
      return `
      <svg width="${size}" height="${size}" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="monster-svg monster-transformed animate-float">
        <circle cx="70" cy="70" r="52" fill="#FDF2F8" stroke="#EC4899" stroke-width="3" stroke-dasharray="6 4" />
        <ellipse cx="70" cy="74" rx="36" ry="34" fill="#F472B6" />
        <!-- Floating party balloons -->
        <circle cx="36" cy="30" r="14" fill="#38BDF8" />
        <path d="M36 44 L36 60" stroke="#0284C7" stroke-width="1.5" />
        <circle cx="104" cy="30" r="14" fill="#FBBF24" />
        <path d="M104 44 L104 60" stroke="#D97706" stroke-width="1.5" />
        <!-- Big happy wink eyes -->
        <path d="M56 68 Q62 60 68 68" stroke="#831843" stroke-width="3.5" stroke-linecap="round" />
        <circle cx="82" cy="68" r="6" fill="#831843" />
        <circle cx="84" cy="66" r="2.5" fill="#FFFFFF" />
        <!-- Big happy grin -->
        <path d="M56 80 Q70 96 84 80 Z" fill="#9D174D" />
        <!-- Little flower on head -->
        <circle cx="70" cy="40" r="8" fill="#FDE047" />
        <circle cx="70" cy="40" r="4" fill="#F59E0B" />
        <!-- Sparkle stars -->
        <text x="25" y="100" font-size="20">✨</text>
        <text x="95" y="100" font-size="20">🌸</text>
      </svg>
      `;
    }

    // Default: Silly grumbly monster posing the arithmetic challenge
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="monster-svg monster-grump animate-breathe">
      <!-- Silly horns -->
      <polygon points="40,40 32,16 52,28" fill="#F59E0B" stroke="#D97706" stroke-width="2" />
      <polygon points="100,40 108,16 88,28" fill="#F59E0B" stroke="#D97706" stroke-width="2" />

      <!-- Fuzzy round body -->
      <ellipse cx="70" cy="76" rx="42" ry="40" fill="#8B5CF6" />
      <ellipse cx="70" cy="80" rx="32" ry="26" fill="#A78BFA" opacity="0.6" />

      <!-- Silly big cyclops / dual googly eyes -->
      <circle cx="54" cy="64" r="14" fill="#FFFFFF" stroke="#6D28D9" stroke-width="3" />
      <circle cx="56" cy="66" r="6" fill="#4C1D95" />
      <circle cx="58" cy="64" r="2" fill="#FFFFFF" />

      <circle cx="86" cy="64" r="14" fill="#FFFFFF" stroke="#6D28D9" stroke-width="3" />
      <circle cx="84" cy="66" r="6" fill="#4C1D95" />
      <circle cx="86" cy="64" r="2" fill="#FFFFFF" />

      <!-- Silly grumpy zig-zag mouth -->
      <path d="M52 94 L60 90 L68 96 L76 90 L84 94" stroke="#4C1D95" stroke-width="4" stroke-linecap="round" fill="none" />

      <!-- Little monster claws -->
      <circle cx="26" cy="80" r="9" fill="#7C3AED" />
      <circle cx="114" cy="80" r="9" fill="#7C3AED" />
    </svg>
    `;
  },

  // Render any hero by ID
  getHeroById(id, size = 120) {
    switch (id) {
      case 'hero_web':
        return { name: 'Cobalt Weaver', title: 'Brave Web Hero', color: '#2563EB', theme: 'web', svg: this.getHeroWeb(size) };
      case 'hero_strong':
        return { name: 'Jade Titan', title: 'Super Strong Hero', color: '#10B981', theme: 'nature', svg: this.getHeroStrong(size) };
      case 'hero_tech':
        return { name: 'Sparky Volt', title: 'Tech Genius Hero', color: '#8B5CF6', theme: 'tech', svg: this.getHeroTech(size) };
      case 'princess_ice':
        return { name: 'Crystal Frostina', title: 'Ice Princess', color: '#0284C7', theme: 'ice', svg: this.getHeroIce(size) };
      case 'princess_forest':
        return { name: 'Blossom Flora', title: 'Forest Princess', color: '#EC4899', theme: 'forest', svg: this.getHeroForest(size) };
      default:
        return { name: 'Cobalt Weaver', title: 'Brave Web Hero', color: '#2563EB', theme: 'web', svg: this.getHeroWeb(size) };
    }
  }
};

window.CurioCharacters = CurioCharacters;
