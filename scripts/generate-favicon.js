const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const pngToIco = require('png-to-ico').default || require('png-to-ico');

async function generateFavicon() {
  try {
    // Read the profile image
    const profileImage = path.join(__dirname, '..', 'public', 'profile.png');
    
    // First, create PNG versions in different sizes
    const pngSizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 48, name: 'favicon-48x48.png' },
      { size: 64, name: 'favicon-64x64.png' },
      { size: 180, name: 'apple-touch-icon.png' },
    ];
    
    const tempDir = path.join(__dirname, '..', 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    // Generate PNG files
    for (const { size, name } of pngSizes) {
      const outputPath = path.join(tempDir, name);
      
      await sharp(profileImage)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .png()
        .toFile(outputPath);
        
      console.log(`✅ Generated: ${name}`);
      
      // Copy to public folder for web use
      if (name !== 'favicon-48x48.png' && name !== 'favicon-64x64.png') {
        fs.copyFileSync(outputPath, path.join(__dirname, '..', 'public', name));
      }
    }
    
    // Create ICO file from multiple sizes
    const icoInputFiles = [
      path.join(tempDir, 'favicon-16x16.png'),
      path.join(tempDir, 'favicon-32x32.png'),
      path.join(tempDir, 'favicon-48x48.png'),
    ];
    
    const icoBuffer = await pngToIco(icoInputFiles);
    fs.writeFileSync(path.join(__dirname, '..', 'app', 'favicon.ico'), icoBuffer);
    console.log('✅ Generated: favicon.ico');
    
    // Also copy to public for fallback
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.ico'), icoBuffer);
    
    // Clean up temp files
    fs.rmSync(tempDir, { recursive: true, force: true });
    
    console.log('🎉 All favicons generated successfully!');
    console.log('💡 Clear your browser cache to see the new favicon!');
    
  } catch (error) {
    console.error('❌ Error generating favicon:', error);
    process.exit(1);
  }
}

generateFavicon();
