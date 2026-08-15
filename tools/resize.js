const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = "./images";
const outputDir = "./resized";

const sizes = [800, 1000, 1600, 2000];

async function resizeImages() {
  for (const size of sizes) {
    const dir = path.join(outputDir, `${size}w`);
    fs.mkdirSync(dir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    if (!/\.(jpg|jpeg|png|webp|avif)$/i.test(file)) {
      continue;
    }

    const inputPath = path.join(inputDir, file);
    const name = path.basename(file, path.extname(file));

    for (const size of sizes) {
      const outputPath = path.join(
        outputDir,
        `${size}w`,
        `${name}-${size}.webp`
      );

      await sharp(inputPath)
        .resize({
          width: size,
          withoutEnlargement: true,
        })
        .webp({ quality: 85 })
        .toFile(outputPath);

      console.log(`Created: ${outputPath}`);
    }
  }
}

resizeImages()
  .then(() => console.log("All images resized successfully."))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });