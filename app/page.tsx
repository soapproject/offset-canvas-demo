import Canvas from './canvas';

export default function Home() {
  return (
    <main className='flex h-full flex-col items-center justify-center gap-4'>
      <Canvas className='border' />
    </main>
  );
}
