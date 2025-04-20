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
  { width: 1920, height: 1080, suffix: '1920' },  // Ajout de hauteur définie pour meilleur rapport de compression
  { width: 1280, height: 720, suffix: '1280' },   // Ajout de hauteur définie
  { width: 768, height: 432, suffix: '768' },     // Ajout de hauteur définie
  { width: 480, height: 270, suffix: '480' }      // Ajout de hauteur définie
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
        // Prétraitement pour optimiser la compression
        .toBuffer()
        .then(buffer => {
          return sharp(buffer)
            .webp({ 
              quality: 65,       // Réduction de la qualité pour diminuer la taille (était 80)
              effort: 6,         // Niveau max de compression
              lossless: false,   // Format avec perte pour réduire la taille
              nearLossless: false,
              reductionEffort: 6,
              smartSubsample: true,
              alphaQuality: 80   // Qualité du canal alpha un peu meilleure
            })
            .toFile(outputFile);
        });
      
      // Obtenir la taille du fichier en Ko
      const stats = fs.statSync(outputFile);
      const fileSizeKb = Math.round(stats.size / 1024);
      
      console.log(`✅ Généré: ${outputFile} (${fileSizeKb} Ko)`);
    }
    
    // Créer une version très légère pour le préchargement
    const placeholderFile = path.join(OUTPUT_DIR, `domono-bg-hero-placeholder.webp`);
    await sharp(inputFile)
      .resize({ width: 20, height: 11 })
      .blur(3)
      .webp({ quality: 20, effort: 6 })
      .toFile(placeholderFile);
    
    const placeholderStats = fs.statSync(placeholderFile);
    const placeholderSizeKb = Math.round(placeholderStats.size / 1024);
    console.log(`✅ Généré: ${placeholderFile} (${placeholderSizeKb} Ko) - Pour préchargement`);
    
    console.log('✨ Optimisation de l\'image héro terminée avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation:', error);
  }
}

optimizeHeroImage(); 