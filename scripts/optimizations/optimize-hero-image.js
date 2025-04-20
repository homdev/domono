const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../../public/assets/img');
const OUTPUT_DIR = path.join(__dirname, '../../public/assets/img/optimized');

// Créer le répertoire de sortie s'il n'existe pas
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Configuration des dimensions pour les différentes tailles
const sizes = [
  { width: 1920, height: null, suffix: '1920' },
  { width: 1280, height: null, suffix: '1280' },
  { width: 768, height: null, suffix: '768' },
  { width: 480, height: null, suffix: '480' }
];

async function optimizeHeroImage() {
  try {
    console.log('🔍 Optimisation de l\'image héro...');
    
    // Source de l'image héro
    const inputFile = path.join(INPUT_DIR, 'domono-bg-hero.svg');
    
    if (!fs.existsSync(inputFile)) {
      console.error(`❌ Fichier source introuvable: ${inputFile}`);
      return;
    }
    
    // Générer les images WebP pour chaque taille
    for (const size of sizes) {
      const outputFile = path.join(OUTPUT_DIR, `domono-bg-hero-${size.suffix}.webp`);
      
      await sharp(inputFile)
        .resize({ 
          width: size.width, 
          height: size.height,
          fit: 'cover',
          position: 'center'
        })
        .webp({ 
          quality: 80, // Bon équilibre entre qualité et taille
          effort: 6    // Niveau de compression (0-6), 6 est le plus élevé
        })
        .toFile(outputFile);
      
      // Obtenir la taille du fichier en Ko
      const stats = fs.statSync(outputFile);
      const fileSizeKb = Math.round(stats.size / 1024);
      
      console.log(`✅ Généré: ${outputFile} (${fileSizeKb} Ko)`);
    }
    
    console.log('✨ Optimisation de l\'image héro terminée avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation:', error);
  }
}

optimizeHeroImage(); 