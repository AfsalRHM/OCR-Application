import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

export async function extractTextFromGoogleVision(
  buffer: Buffer
): Promise<string> {
  const [result] = await client.textDetection({ image: { content: buffer } });
  const detections = result.textAnnotations;

  if (!detections || detections.length === 0 || !detections[0].description) {
    return "";
  }

  return detections[0].description; 
}
