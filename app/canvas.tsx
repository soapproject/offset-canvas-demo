'use client';

import {
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { findTop, initStage } from './canvas-util';
import { CanvasMeta, drawNodeCanvas, getOutputImages } from './node-canvas';

interface Props extends HTMLAttributes<HTMLElement> {}
export default function Canvas({ className, children }: Props) {
  const [_, startServerAction] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cavnasMeta, setCanvasMeta] = useState<CanvasMeta>({
    top: null,
    dataURL: '',
  });
  const [images, setImages] = useState<{ src: string; fileName: string }[]>([]);
  const [text, setText] = useState('');

  /**畫出前端的canvas, 然後把圖片dataURL跟A的頂點存到state */
  useEffect(() => {
    (async () => {
      const container = containerRef.current;
      const { stage, imageData } = await initStage(container, text);
      const top = findTop(imageData);
      setCanvasMeta({ top, dataURL: stage.toDataURL() });
    })();
  }, [text]);

  /**呼叫server action畫出後端canvase跟輸出圖片 */
  const generateImage = () => {
    startServerAction(async () => {
      await drawNodeCanvas(cavnasMeta, text);
      const images = await getOutputImages();
      setImages(images);
    });
  };

  return (
    <div className='overflow-auto p-4'>
      <div id='canvas-container' className={className} ref={containerRef}></div>
      <input
        className='border'
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={generateImage}>Draw</button>
      <div className=' flex gap-4'>
        {images.map((image, index) => (
          <div key={index}>
            <p>{image.fileName}</p>
            <img className='border' src={image.src} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
