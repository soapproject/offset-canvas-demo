import Konva from 'konva';
import path from 'path';

export const RED_THRESHOLD = 250;
export const CANVAS_SIZE = 500;
export const FONT_SIZE = 160;
export const FONT_FAMILY = 'Cubic11';
export const DEMO_TEXT = 'AABBABC';

/**從圖片左上角開始掃描 找到第一個大於RED_THRESHOLD就是A的頂點 */
export function findTop(imageData: ImageData) {
  const data = imageData.data;
  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      const red = data[(y * imageData.width + x) * 4];
      if (red > RED_THRESHOLD) {
        return { x, y };
      }
    }
  }
  return null;
}

export async function initStage(container?: HTMLDivElement | null) {
  const stage = new Konva.Stage({
    container,
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  } as any);
  const drawLayer = new Konva.Layer();
  if (typeof document !== 'undefined') {
    // 前端環境
    await document.fonts.load(`1rem ${FONT_FAMILY}`);
  } else {
    // 後端環境
    const canvas = await import('canvas');
    const fontPath = path.join(process.cwd(), 'public/fonts', 'Cubic_11.ttf');
    canvas.registerFont(fontPath, { family: FONT_FAMILY });
  }
  const textNode = new Konva.Text({
    fill: 'red',
    text: DEMO_TEXT,
    fontSize: FONT_SIZE,
    fontFamily: FONT_FAMILY,
  });
  drawLayer.add(textNode);
  stage.add(drawLayer);
  stage.batchDraw();

  const ctx = drawLayer.getContext();
  const imageData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  return { stage, drawLayer, textNode, imageData };
}
