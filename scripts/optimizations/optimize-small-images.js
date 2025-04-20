const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = path.join(process.cwd(), 'public/assets/img');
const OUTPUT_DIR = path.join(process.cwd(), 'public/assets/img/optimized');

// Créer le répertoire de sortie s'il n'existe pas
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Liste des images à optimiser avec leurs paramètres
const IMAGES_TO_OPTIMIZE = [
  { filename: 'google.webp', width: 80, height: 27, quality: 80 },
  { filename: 'trustpilot.svg', width: 110, height: null, quality: 100 }
  // Ajouter d'autres images si nécessaire
];

async function optimizeSmallImages() {
  try {
    for (const img of IMAGES_TO_OPTIMIZE) {
      const inputPath = path.join(INPUT_DIR, img.filename);
      const outputFilename = img.filename.replace(/\.[^/.]+$/, '.webp');
      const outputPath = path.join(OUTPUT_DIR, outputFilename);

      // Vérifier si le fichier source existe
      if (!fs.existsSync(inputPath)) {
        console.error(`Le fichier source ${inputPath} n'existe pas.`);
        continue;
      }

      // Traitement de l'image
      await sharp(inputPath)
        .resize(img.width, img.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({ quality: img.quality })
        .toFile(outputPath);

      // Afficher la taille du fichier généré
      const stats = fs.statSync(outputPath);
      console.log(`Image optimisée: ${outputPath} (${(stats.size / 1024).toFixed(2)} Ko)`);
    }

    // Créer une version très petite du logo Google pour les data URL inline
    if (IMAGES_TO_OPTIMIZE.some(img => img.filename === 'google.webp')) {
      const googleLogoPath = path.join(INPUT_DIR, 'google.webp');
      const tinyGooglePath = path.join(OUTPUT_DIR, 'google-tiny.webp');
      
      if (fs.existsSync(googleLogoPath)) {
        await sharp(googleLogoPath)
          .resize(40, 14, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .webp({ quality: 60 })
          .toFile(tinyGooglePath);
          
        const stats = fs.statSync(tinyGooglePath);
        console.log(`Logo Google miniature: ${tinyGooglePath} (${(stats.size / 1024).toFixed(2)} Ko)`);
      }
    }

    console.log('Optimisation des petites images terminée avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'optimisation des images:', error);
  }
}

// Exécuter la fonction
optimizeSmallImages(); 