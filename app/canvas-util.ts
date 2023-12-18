import Konva from 'konva';

export const RED_THRESHOLD = 250;
export const CANVAS_SIZE = 250;
export const FONT_SIZE = 160;

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

export function initStage(container?: HTMLDivElement | null) {
  const stage = new Konva.Stage({
    container,
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  } as any);
  const drawLayer = new Konva.Layer();
  const textNode = new Konva.Text({
    fill: 'red',
    text: 'A',
    fontSize: FONT_SIZE,
  });
  drawLayer.add(textNode);
  stage.add(drawLayer);
  stage.batchDraw();

  const ctx = drawLayer.getContext();
  const imageData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  return { stage, drawLayer, textNode, imageData };
}
