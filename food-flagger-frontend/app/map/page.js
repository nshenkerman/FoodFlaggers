import dynamic from 'next/dynamic';

const MapComponentWithNoSSR = dynamic(
  () => import('@/components/MapComponent'), // adjust the path accordingly
  {
    ssr: false, // This line is important. It's saying that this component should only be rendered on the client side
  }
);

export default function Home() {
  return (
    <div>
      <MapComponentWithNoSSR />
    </div>
  );
}
