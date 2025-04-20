const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Créer le répertoire de sortie s'il n'existe pas
const outputDir = path.join(process.cwd(), 'public/assets/img/optimized');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const inputImage = path.join(process.cwd(), 'public/assets/img/domono-bg-hero.svg');

// Définir les tailles pour différents appareils
const sizes = [
  { name: 'small', width: 640 },  // mobile
  { name: 'medium', width: 768 }, // tablette
  { name: 'large', width: 1024 }, // petit desktop
  { name: 'xlarge', width: 1440 }, // desktop
  { name: 'xxlarge', width: 1920 } // grand desktop
];

// Définir les formats à générer
const formats = [
  { name: 'webp', options: { quality: 80 } },
  { name: 'avif', options: { quality: 65 } }
];

async function optimizeHeroImage() {
  try {
    console.log('Optimisation de l\'image hero en cours...');
    
    // Créer une image placeholder très basse qualité pour le chargement initial
    await sharp(inputImage)
      .resize(20)
      .webp({ quality: 20 })
      .toFile(path.join(outputDir, 'hero-placeholder.webp'));
    
    console.log('✅ Placeholder généré: hero-placeholder.webp');
    
    // Générer des images optimisées pour chaque taille et format
    for (const size of sizes) {
      for (const format of formats) {
        const outputPath = path.join(outputDir, `hero-${size.name}.${format.name}`);
        await sharp(inputImage)
          .resize(size.width)
          [format.name](format.options)
          .toFile(outputPath);
        
        console.log(`✅ Image générée: hero-${size.name}.${format.name}`);
      }
    }
    
    console.log('✅ Optimisation de l\'image hero terminée avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation de l\'image hero:', error);
  }
}

optimizeHeroImage(); 