import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";


const IntroCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-50%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[400px] w-[400px] overflow-hidden rounded-xl bg-white opacity-90"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="p-8 text-6xl font-black uppercase text-white">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default IntroCarousel;


type CardType = {
  url: string;
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "/main-blob.svg",
    title: "I",
    id: 1,
  },
  {
    url: "/main-blob.svg",
    title: "learn",
    id: 2,
  },
  {
    url: "/main-blob.svg",
    title: "and",
    id: 3,
  },
  {
    url: "/main-blob.svg",
    title: "build",
    id: 4,
  },
  {
    url: "/main-blob.svg",
    title: "cool",
    id: 5,
  },
  {
    url: "/main-blob.svg",
    title: "stuff",
    id: 6,
  },
  {
    url: "/main-blob.svg",
    title: ": )",
    id: 7,
  },
];