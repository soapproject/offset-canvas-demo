'use server';

import fs from 'fs-extra';
import path from 'path';
import { findTop, initStage } from './canvas-util';

const SAVE_PATH = path.join(process.cwd(), 'out');

async function saveImage(dataURL: string, name: string) {
  const imagePath = path.join(SAVE_PATH, name);
  const imageBuffer = Buffer.from(dataURL.split(',')[1], 'base64');
  await fs.outputFile(imagePath, imageBuffer);
}

export interface CanvasMeta {
  /**文字A的尖端座標 */
  top: {
    x: number;
    y: number;
  } | null;
  dataURL: string;
}
export async function drawNodeCanvas(
  { top: frontendTop, dataURL: frontendDataURL }: CanvasMeta,
  text: string
) {
  // 畫後端canvas
  const { stage, textNode, imageData } = await initStage(undefined, text);

  // 把初始的前端跟後端canvas圖片存到專案的out資料夾
  await saveImage(frontendDataURL, 'frontend.png');
  const backendDataURL = stage.toDataURL();
  await saveImage(backendDataURL, 'backend-initial.png');

  const backendTop = findTop(imageData);

  // 比對前後端top, offset後端文字
  if (frontendTop && backendTop) {
    const offsetX = backendTop.x - frontendTop.x;
    const offsetY = backendTop.y - frontendTop.y;
    textNode.x(textNode.x() + offsetX);
    textNode.y(textNode.y() - offsetY);
    stage.batchDraw();
  }

  // 把更改過的後端canvas圖片存到out
  const adjustedBackendDataURL = stage.toDataURL();
  await saveImage(adjustedBackendDataURL, 'backend-adjusted.png');
}

export async function getOutputImages() {
  const files = await fs.readdir(SAVE_PATH);
  const pngFiles = files.filter(file => file.endsWith('.png'));
  const base64Images = await Promise.all(
    pngFiles.map(async file => {
      const filePath = path.join(SAVE_PATH, file);
      const fileBuffer = await fs.readFile(filePath);
      return {
        src: `data:image/png;base64,${fileBuffer.toString('base64')}`,
        fileName: file,
      };
    })
  );
  return base64Images;
}
