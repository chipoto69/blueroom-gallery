import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../../assets');
const OUTPUT_DIR = join(__dirname, '../public/gallery');

// Compression settings optimized for web and Vercel
const COMPRESSION_SETTINGS = {
  quality: 82, // Good balance between quality and size
  progressive: true, // Better for web loading
  mozjpeg: true // Use mozjpeg for better compression
};

const MAX_WIDTH = 1920; // Max width for large displays
const MAX_HEIGHT = 1080; // Max height to maintain reasonable aspect ratios

async function compressImages() {
  try {
    // Ensure output directory exists
    await mkdir(OUTPUT_DIR, { recursive: true });

    // Read all files from assets directory
    const files = await readdir(ASSETS_DIR);

    // Filter for image files
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to compress`);

    let totalOriginalSize = 0;
    let totalCompressedSize = 0;

    // Process each image
    for (const file of imageFiles) {
      const inputPath = join(ASSETS_DIR, file);
      const outputPath = join(OUTPUT_DIR, file.replace(/\.(png|jpeg)$/i, '.jpg'));

      console.log(`\nProcessing: ${file}`);

      // Get original file stats
      const { size: originalSize } = await sharp(inputPath).metadata()
        .then(async (metadata) => {
          const stats = await sharp(inputPath).stats();
          return { size: stats.size || 0 };
        });

      // Compress and optimize
      const info = await sharp(inputPath)
        .resize(MAX_WIDTH, MAX_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg(COMPRESSION_SETTINGS)
        .toFile(outputPath);

      totalOriginalSize += originalSize || info.size * 5; // Estimate if not available
      totalCompressedSize += info.size;

      const compressionRatio = originalSize
        ? ((1 - info.size / originalSize) * 100).toFixed(1)
        : 'N/A';

      console.log(`  ✓ Compressed: ${(info.size / 1024 / 1024).toFixed(2)}MB`);
      console.log(`  ✓ Reduction: ${compressionRatio}%`);
      console.log(`  ✓ Dimensions: ${info.width}x${info.height}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('COMPRESSION COMPLETE');
    console.log('='.repeat(60));
    console.log(`Total images processed: ${imageFiles.length}`);
    console.log(`Total size reduction: ${((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(1)}%`);
    console.log(`Final size: ${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Output directory: ${OUTPUT_DIR}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('Error compressing images:', error);
    process.exit(1);
  }
}

// Run the compression
compressImages();
