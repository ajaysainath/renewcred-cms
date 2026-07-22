interface HeroProps {
  title: string;
  description: string;
}

export default function Hero({ title, description }: HeroProps) {
  return (
    <section className="mb-16">

      <h1 className="text-6xl italic font-light mt-8">
        {title}
      </h1>

      <p className="text-gray-400 mt-6 max-w-3xl leading-8">
        {description}
      </p>
    </section>
  );
}