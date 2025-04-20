// CSS Critique injecté directement pour améliorer le FCP
export default function Head() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* CSS critique pour éviter les layout shifts */
        :root {
          --background: 0 0% 100%;
          --foreground: 222.2 84% 4.9%;
          --primary: 24 74% 50%;
          --primary-foreground: 210 40% 98%;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: 'Inter', sans-serif;
        }
        
        .hero-section {
          position: relative;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* Réserver l'espace pour les éléments importants */
        [data-critical-section] {
          min-height: 300px;
          position: relative;
          contain: layout paint;
        }
        
        /* Précharger avec un aspect ratio correct */
        [data-img-container] {
          position: relative;
          overflow: hidden;
        }
        
        [data-img-container="hero"] {
          aspect-ratio: 16/9;
          background-color: #e2e8f0;
        }
      ` }} />
    </>
  )
} 