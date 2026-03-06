import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-gray-100 text-center flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover"
      >
        <Image src={"/hero.svg"} alt="Background" layout="fill" objectFit="cover" />
      </div>
    </section>
  );
}
