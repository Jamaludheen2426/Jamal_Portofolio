const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  try {
    // Read the profile image
    const profileImage = path.join(__dirname, '..', 'public', 'profile.png');
    
    // Create multiple favicon formats
    const sizes = [
      { size: 32, name: 'favicon.ico' },
      { size: 180, name: 'apple-touch-icon.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 16, name: 'favicon-16x16.png' },
    ];
    
    for (const { size, name } of sizes) {
      const outputPath = path.join(__dirname, '..', 'app', name);
      
      await sharp(profileImage)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .toFile(outputPath);
        
      console.log(`✅ Generated: ${name}`);
    }
    
    console.log('🎉 All favicons generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating favicon:', error);
    process.exit(1);
  }
}

generateFavicon();
