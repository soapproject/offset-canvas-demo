import Konva from 'konva';
import path from 'path';

export const RED_THRESHOLD = 250;
export const CELL_SIZE = 10;
export const GRID_SIZE = [50, 50];
export const WORKAREA_SIZE = GRID_SIZE.map(size => size * CELL_SIZE);
export const FONT_SIZE = 120;
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

export async function initStage(
  container?: HTMLDivElement | null,
  text?: string
) {
  const stage = new Konva.Stage({
    container,
    width: WORKAREA_SIZE[0],
    height: WORKAREA_SIZE[1],
  } as any);
  const drawLayer = new Konva.Layer();
  const bgLayer = new Konva.Layer();

  // 底色
  const bgRect = new Konva.Rect({
    x: 0,
    y: 0,
    width: WORKAREA_SIZE[0],
    height: WORKAREA_SIZE[1],
    fill: '#5f5f5f',
    listening: false,
  });
  bgLayer.add(bgRect);
  // 網格
  const verticalLines = Array.from({ length: GRID_SIZE[0] + 1 }, (_, i) => {
    const x = i * CELL_SIZE;
    return new Konva.Line({
      points: [x, 0, x, WORKAREA_SIZE[1]],
      stroke: '#000000',
      strokeWidth: 1,
    });
  });
  const horizontalLines = Array.from({ length: GRID_SIZE[1] + 1 }, (_, i) => {
    const y = i * CELL_SIZE;
    return new Konva.Line({
      points: [0, y, WORKAREA_SIZE[0], y],
      stroke: '#000000',
      strokeWidth: 1,
    });
  });
  bgLayer.add(...verticalLines, ...horizontalLines);

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
    text: text ?? DEMO_TEXT,
    fontSize: FONT_SIZE,
    fontFamily: FONT_FAMILY,
  });
  drawLayer.add(textNode);

  stage.add(bgLayer);
  stage.add(drawLayer);
  stage.batchDraw();

  const ctx = drawLayer.getContext();
  const imageData = ctx.getImageData(0, 0, WORKAREA_SIZE[0], WORKAREA_SIZE[1]);
  return { stage, drawLayer, textNode, imageData };
}
