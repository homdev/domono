const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Chemins d'entrée et de sortie
const inputDir = path.join(__dirname, '../../public/assets/img');
const outputDir = path.join(__dirname, '../../public/assets/img/optimized');

// Créer le répertoire de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Définir les tailles et qualités pour les différentes versions
const sizes = [
  { name: 'hero-mobile', width: 480, quality: 75 },
  { name: 'hero-tablet', width: 768, quality: 75 },
  { name: 'hero-desktop-md', width: 1280, quality: 75 },
  { name: 'hero-desktop', width: 1920, quality: 70 }
];

// Créer une version placeholder légère
const createPlaceholder = async (inputPath) => {
  try {
    // Génération d'une version très petite pour le placeholder
    await sharp(inputPath)
      .resize(20) // Très petite résolution
      .webp({ quality: 20 }) // Qualité très basse pour le placeholder
      .toFile(path.join(outputDir, 'hero-placeholder.webp'));

    // Génération du placeholder en base64 pour usage inline
    const placeholderBuffer = await sharp(inputPath)
      .resize(10)
      .webp({ quality: 1 })
      .toBuffer();
    
    const base64Placeholder = `data:image/webp;base64,${placeholderBuffer.toString('base64')}`;
    
    // Écrire le placeholder base64 dans un fichier pour référence
    fs.writeFileSync(
      path.join(outputDir, 'hero-placeholder-base64.txt'),
      base64Placeholder
    );
    
    console.log('✅ Placeholder généré avec succès');
    return base64Placeholder;
  } catch (error) {
    console.error('Erreur lors de la génération du placeholder:', error);
    return null;
  }
};

// Fonction principale pour optimiser les images
const optimizeHeroImage = async () => {
  // Chemin vers l'image source de haute qualité
  const inputPath = path.join(inputDir, 'domono-bg-hero.jpg');

  // Vérifier que le fichier source existe
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Fichier source introuvable: ${inputPath}`);
    return;
  }

  console.log(`🔄 Optimisation de l'image héro depuis: ${inputPath}`);

  try {
    // Générer le placeholder d'abord
    const placeholder = await createPlaceholder(inputPath);
    console.log(`🔍 Placeholder base64 généré (${placeholder?.length} caractères)`);

    // Générer les différentes tailles d'images optimisées
    for (const size of sizes) {
      console.log(`🔄 Génération de ${size.name} (${size.width}px)...`);
      
      await sharp(inputPath)
        .resize(size.width)
        .webp({ 
          quality: size.quality,
          effort: 6, // Utilisation d'un effort d'encodage élevé pour une meilleure compression
          nearLossless: true, // Mode proche sans perte pour une meilleure qualité visuelle
          smartSubsample: true // Sous-échantillonnage intelligent pour réduire la taille
        })
        .toFile(path.join(outputDir, `${size.name}.webp`));
      
      console.log(`✅ ${size.name}.webp généré`);
    }

    // Générer également une version AVIF pour les navigateurs qui le supportent (meilleure compression)
    for (const size of sizes) {
      if (size.name === 'hero-desktop' || size.name === 'hero-mobile') {
        console.log(`🔄 Génération de ${size.name} en AVIF...`);
        
        await sharp(inputPath)
          .resize(size.width)
          .avif({ 
            quality: size.quality - 5, // AVIF peut utiliser une qualité plus basse pour un résultat similaire
            effort: 9, // Effort maximum pour AVIF
            chromaSubsampling: '4:2:0' // Sous-échantillonnage pour réduire davantage la taille
          })
          .toFile(path.join(outputDir, `${size.name}.avif`));
        
        console.log(`✅ ${size.name}.avif généré`);
      }
    }

    console.log('✅ Toutes les versions de l\'image héro ont été générées avec succès!');
    
    // Afficher un résumé des fichiers générés
    const files = fs.readdirSync(outputDir).filter(file => file.startsWith('hero-'));
    console.log('\n📊 Résumé des fichiers générés:');
    
    files.forEach(file => {
      const stats = fs.statSync(path.join(outputDir, file));
      const fileSizeKB = (stats.size / 1024).toFixed(2);
      console.log(`   - ${file}: ${fileSizeKB} KB`);
    });
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation des images:', error);
  }
};

// Exécuter la fonction d'optimisation
optimizeHeroImage(); 