'use client';

import {
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { findTop, initStage } from './canvas-util';
import { CanvasMeta, drawNodeCanvas } from './node-canvas';

interface Props extends HTMLAttributes<HTMLElement> {}
export default function Canvas({ className, children }: Props) {
  const [_, startServerAction] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cavnasMeta, setCanvasMeta] = useState<CanvasMeta>({
    top: null,
    dataURL: '',
  });

  /**畫出前端的canvas, 然後把圖片dataURL跟A的頂點存到state */
  useEffect(() => {
    const container = containerRef.current;
    const { stage, imageData } = initStage(container);
    const top = findTop(imageData);
    setCanvasMeta({ top, dataURL: stage.toDataURL() });
  }, []);

  /**呼叫server action畫出後端canvase跟輸出圖片 */
  const generateImage = () => {
    startServerAction(async () => {
      await drawNodeCanvas(cavnasMeta);
    });
  };

  return (
    <div>
      <div id='canvas-container' className={className} ref={containerRef}></div>
      <button onClick={generateImage}>Draw</button>
    </div>
  );
}