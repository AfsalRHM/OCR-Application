import sharp from "sharp";

export async function preprocessImage(imageBuffer: Buffer): Promise<Buffer> {
  const processedImage = await sharp(imageBuffer)
    .resize(1500)
    .grayscale()
    .threshold(120)
    .toBuffer();

  return processedImage;
}
