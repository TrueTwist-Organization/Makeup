// Import all professional named product images from internal Image folder
import pCompactPowder from '../assets/products/Compact Powder.png';
import pCoralLipstick from '../assets/products/Creamy Lipstick Coral Shade.png';
import pEyebrowSet from '../assets/products/Eyebrow Pencil Set.png';
import pFacePrimer from '../assets/products/Face Primer Tube.png';
import pLiquidFoundation from '../assets/products/Liquid Foundation Bottle.png';
import pLiquidLipstickRed from '../assets/products/Liquid Lipstick Red Smudge.png';
import pBlackTube from '../assets/products/Matte Lipstick Black Tube.png';
import pNudeShade from '../assets/products/Matte Lipstick Nude Shade.png';
import pPinkCase from '../assets/products/Matte Lipstick Pink Case.png';
import pRedCase from '../assets/products/Matte Lipstick Red Case.png';
import pSoftBeige from '../assets/products/Matte Lipstick Soft Beige.png';
import pMetallicLipstick from '../assets/products/Metallic Lipstick.png';
import pNudeLipstick from '../assets/products/Nude Lipstick.png';
import pRoseGoldLipstick from '../assets/products/Rose Gold Lipstick Premium.png';
import pSlimEyeliner from '../assets/products/Slim Eyeliner Pen.png';
import pTurquoiseMascara from '../assets/products/Turquoise Mascara Tube.png';

// Import New Categories Images
import pFaceFoundation from '../assets/products/Glow Radiance Foundation.png';
import pFaceCompact from '../assets/products/Silk Touch Compact Powder.png';
import pFaceConcealer from '../assets/products/HD Flawless Concealer.png';
import pFaceBlush from '../assets/products/Blush Bloom Palette.png';
import pFaceHighlighter from '../assets/products/Crystal Glow Highlighter.png';

import pEyePalette from '../assets/products/Smokey Eyeshadow Palette.png';
import pEyeMascara from '../assets/products/Volume Lash Mascara.png';
import pEyeEyeliner from '../assets/products/Precision Eyeliner Pen.png';
import pEyeBrowKit from '../assets/products/Brow Sculpt Kit.png';

import pSkinGlowSerum from '../assets/products/Glow Serum Drops.png';
import pSkinVitaminC from '../assets/products/Vitamin C Face Serum.png';
import pSkinMist from '../assets/products/Hydrating Face Mist.png';
import pSkinNightRepair from '../assets/products/Night Repair Cream.png';
import pSkinSunscreen from '../assets/products/Sunscreen SPF 50 Glow Shield.png';

// Import scroll video for Black Tube
import blackTubeVideo from '../assets/products/black_tube_scroll.mp4';

export const categories = [
  {
    id: 'lips',
    name: 'Lips',
    emoji: '👄',
    description: 'Vibrant colors and professional finishes for stunning lips.',
    image: pRoseGoldLipstick,
    color: 'var(--primary-makeup)',
    gradient: 'linear-gradient(135deg, #ff4d6d 0%, #ff758f 100%)',
    pageBg: '/Lips.jpeg'
  },
  {
    id: 'face-products',
    name: 'Face Products',
    emoji: '🌸',
    description: 'Flawless foundations and glowing powders for your perfect base.',
    image: pFaceFoundation,
    color: 'var(--primary-face)',
    gradient: 'linear-gradient(135deg, #FF9A8B 0%, #FF6A88 100%)',
    pageBg: '/Face.jpeg'
  },
  {
    id: 'eye-makeup',
    name: 'Eye Makeup',
    emoji: '👁️',
    description: 'Dramatic palettes and precision liners for eyes that speak.',
    image: pEyePalette,
    color: 'var(--primary-eye)',
    gradient: 'linear-gradient(135deg, #21D4FD 0%, #B721FF 100%)',
    pageBg: '/Eyes.jpeg'
  },
  {
    id: 'skincare',
    name: 'Skincare',
    emoji: '✨',
    description: 'Nourishing serums and repair creams for a healthy, glowing skin.',
    image: pSkinGlowSerum,
    color: 'var(--primary-skincare)',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    pageBg: '/Skincare.jpeg'
  }
];

export const products = {
  lips: [
    { 
      id: 4, 
      name: 'Matte Lipstick Soft Beige', 
      price: '₹699', 
      image: pSoftBeige, 
      category: 'Lipstick',
      description: 'A sophisticated Soft Beige shade in a luxurious matte finish.',
      details: ['Intense pigment', 'Non-drying', '12h Wear', 'Velvet Finish']
    },
    { 
      id: 5, 
      name: 'Matte Lipstick Nude Shade', 
      price: '₹749', 
      image: pNudeShade, 
      category: 'Lipstick',
      description: 'The perfect Nude Shade for everyday elegance.',
      details: ['Universal nude', 'Smudge-proof', 'Creamy Matte', 'Organic Oils']
    },
    { 
      id: 6, 
      name: 'Matte Lipstick Black Tube', 
      price: '₹949', 
      image: pBlackTube, 
      video: blackTubeVideo,
      category: 'Lipstick',
      description: 'Bold color in a sleek Black Tube.',
      details: ['Bold impact', 'Luxe packaging', 'Hydrating formula', 'One-swipe pay-off']
    },
    { 
      id: 7, 
      name: 'Liquid Lipstick Red Smudge', 
      price: '₹1,199', 
      image: pLiquidLipstickRed, 
      category: 'Liquid Lipstick',
      description: 'Our iconic Liquid Lipstick with a uniquely blurred effect.',
      details: ['Blurred effect', 'Transfer-resistant', 'Lightweight', 'High Definition']
    },
    { 
      id: 8, 
      name: 'Matte Lipstick Red Case', 
      price: '₹599', 
      image: pRedCase, 
      category: 'Lipstick',
      description: 'Celebrate our classic Red Shade in its signature Red Case.',
      details: ['Classic red', 'Velvety texture', 'Long-lasting', 'Paraben Free']
    },
    { 
      id: 10, 
      name: 'Creamy Lipstick Coral Shade', 
      price: '₹1,499', 
      image: pCoralLipstick, 
      category: 'Lipstick',
      description: 'A vibrant Coral Shade with a creamy, nourishing finish.',
      details: ['Creamy texture', 'Moisturizing formula', 'Sun Protection', 'Shea Butter']
    },
    { 
      id: 11, 
      name: 'Nude Lipstick', 
      price: '₹549', 
      image: pNudeLipstick, 
      category: 'Lipstick',
      description: 'Our Pure Nude lipstick defines and enhances.',
      details: ['Natural definition', 'Daily essential', 'Soft Texture', 'Non-sticky']
    },
    { 
      id: 12, 
      name: 'Metallic Lipstick', 
      price: '₹899', 
      image: pMetallicLipstick, 
      category: 'Lipstick',
      description: 'Shimmering metallic finish for a bold, futuristic look.',
      details: ['Metallic sheen', 'High pigment', 'Multi-dimensional', 'Smooth application']
    },
    { 
      id: 13, 
      name: 'Matte Lipstick Pink Case', 
      price: '₹2,199', 
      image: pPinkCase, 
      category: 'Lipstick',
      description: 'Limited edition Matte Lipstick in a designer Pink Case.',
      details: ['Designer casing', 'Ultra-matte', 'No bleeding', 'Anti-oxidants']
    },
    { 
      id: 17, 
      name: 'Rose Gold Lipstick Premium', 
      price: '₹2,499', 
      image: pRoseGoldLipstick, 
      category: 'Lipstick',
      description: 'Luxurious Rose Gold infusion for the ultimate glow.',
      details: ['24K Glow', 'Premium feel', 'Silk Smooth', 'Dermat tested']
    }
  ],
  'face-products': [
    { 
      id: 2, 
      name: 'Face Primer Tube', 
      price: '₹899', 
      image: pFacePrimer, 
      category: 'Face Primer', 
      description: 'Create a flawless canvas for your makeup.',
      details: ['Pore blurring', 'Oil control', 'Smooth finish', 'All-day grip']
    },
    { 
      id: 3, 
      name: 'Liquid Foundation Bottle', 
      price: '₹1,299', 
      image: pLiquidFoundation, 
      category: 'Foundation', 
      description: 'Full coverage matte foundation.',
      details: ['Full coverage', 'Breathable', 'Matte finish', 'Sweat-proof']
    },
    { 
      id: 16, 
      name: 'Compact Powder', 
      price: '₹1,599', 
      image: pCompactPowder, 
      category: 'Compact Powder', 
      description: 'Weightless matte powder for a flawless finish.',
      details: ['Weightless', 'Even tone', 'SPF 15', 'Travel friendly']
    },
    { 
      id: 18, 
      name: 'Glow Radiance Foundation', 
      price: '₹1,699', 
      image: pFaceFoundation, 
      category: 'Foundation', 
      description: 'Advanced glow-infusing foundation.',
      details: ['Radiant glow', 'Hydrating', 'Medium coverage', 'Natural finish']
    },
    { 
      id: 19, 
      name: 'Silk Touch Compact Powder', 
      price: '₹1,299', 
      image: pFaceCompact, 
      category: 'Powder', 
      description: 'Silky smooth compact.',
      details: ['Silk effect', 'Touch-up ready', 'Zero cakey', 'Mineral rich']
    },
    { 
      id: 20, 
      name: 'HD Flawless Concealer', 
      price: '₹949', 
      image: pFaceConcealer, 
      category: 'Concealer', 
      description: 'High-definition concealer.',
      details: ['Dark circle cover', 'HD finish', 'No creasing', 'Spot correction']
    },
    { 
      id: 21, 
      name: 'Blush Bloom Palette', 
      price: '₹1,499', 
      image: pFaceBlush, 
      category: 'Blush', 
      description: 'Natural flush blush palette.',
      details: ['Natural flush', 'Highly blendable', 'Dual shade', 'Satin glow']
    },
    { 
      id: 22, 
      name: 'Crystal Glow Highlighter', 
      price: '₹1,199', 
      image: pFaceHighlighter, 
      category: 'Highlighter', 
      description: 'Multi-dimensional shimmer highlighter.',
      details: ['Crystal shine', 'Highlighting', 'Strobe effect', 'Fine shimmer']
    }
  ],
  'eye-makeup': [
    { 
      id: 1, 
      name: 'Eyebrow Pencil Set', 
      price: '₹499', 
      image: pEyebrowSet, 
      category: 'Eyebrows', 
      description: 'Define and shape your brows.',
      details: ['Natural shape', 'Smudge proof', 'Precision tip', 'Long stay']
    },
    { 
      id: 14, 
      name: 'Turquoise Mascara Tube', 
      price: '₹1,299', 
      image: pTurquoiseMascara, 
      category: 'Mascara', 
      description: 'Professional volume mascara.',
      details: ['Extra volume', 'Turquoise tint', 'Waterproof', 'Lash lift']
    },
    { 
      id: 15, 
      name: 'Slim Eyeliner Pen', 
      price: '₹499', 
      image: pSlimEyeliner, 
      category: 'Eyeliner', 
      description: 'Precision control eyeliner.',
      details: ['Ultra-fine line', 'Sketch pen base', 'Quick dry', 'Intense black']
    },
    { 
      id: 23, 
      name: 'Smokey Eyeshadow Palette', 
      price: '₹1,899', 
      image: pEyePalette, 
      category: 'Eyeshadow', 
      description: 'Perfect smokey eye look.',
      details: ['9 Rich shades', 'Velvet matte', 'High shimmer', 'Blendable']
    },
    { 
      id: 24, 
      name: 'Volume Lash Mascara', 
      price: '₹999', 
      image: pEyeMascara, 
      category: 'Mascara', 
      description: 'Dramatic volume and length.',
      details: ['Dramatic length', 'Clump free', 'Pro brush', 'Conditioning']
    },
    { 
      id: 25, 
      name: 'Precision Eyeliner Pen', 
      price: '₹699', 
      image: pEyeEyeliner, 
      category: 'Eyeliner', 
      description: 'Ultra-fine tip precision.',
      details: ['Precision tip', 'Flick ready', 'Matte finish', '24h Wear']
    },
    { 
      id: 26, 
      name: 'Brow Sculpt Kit', 
      price: '₹1,149', 
      image: pEyeBrowKit, 
      category: 'Eyebrows', 
      description: 'Sculpt and define like a pro.',
      details: ['Sculpt system', 'Setting wax', 'Angled brush', 'Mirror included']
    }
  ],
  'skincare': [
    { 
      id: 27, 
      name: 'Glow Serum Drops', 
      price: '₹1,449', 
      image: pSkinGlowSerum, 
      category: 'Serum', 
      description: 'Hydrating morning glow drops.',
      details: ['Morning glow', 'Ultra hydrating', 'Non-greasy', 'Hyaluronic acid']
    },
    { 
      id: 28, 
      name: 'Vitamin C Face Serum', 
      price: '₹1,899', 
      image: pSkinVitaminC, 
      category: 'Serum', 
      description: 'Brightening Vitamin C therapy.',
      details: ['Brightening', 'Dark spot repair', 'Collagen boost', 'Natural oils']
    },
    { 
      id: 29, 
      name: 'Hydrating Face Mist', 
      price: '₹799', 
      image: pSkinMist, 
      category: 'Mist', 
      description: 'Refresh skin on the go.',
      details: ['Instant refresh', 'Cooling effect', 'Set makeup', 'Aloe vera']
    },
    { 
      id: 30, 
      name: 'Night Repair Cream', 
      price: '₹2,499', 
      image: pSkinNightRepair, 
      category: 'Cream', 
      description: 'Overnight renewal therapy.',
      details: ['Overnight repair', 'Anti-aging', 'Deep nourishing', 'Rich minerals']
    },
    { 
      id: 31, 
      name: 'Sunscreen SPF 50 Glow Shield', 
      price: '₹899', 
      image: pSkinSunscreen, 
      category: 'Sunscreen', 
      description: 'SPF 50 with golden glow.',
      details: ['Broad spectrum', 'Glow shield', 'No white cast', 'Water resistant']
    }
  ]
};
