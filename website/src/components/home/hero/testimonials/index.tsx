import localFont from "next/font/local";
import TweetCard from "../components/tweet-card";

const bethanyFont = localFont({
  src: "../../../../assets/fonts/Bethany-Elingston.otf",
  variable: "--font-bethany",
});

const testimonials = [
  {
    avatar:
      "https://pbs.twimg.com/profile_images/1901218639870930944/cOUwIJLh_400x400.jpg",
    handle: "v_serbulenko",
    name: "Volodymyr",
    quote: "This is huge 💪",
    date: "Feb 2, 2026",
  },
  {
    avatar:
      "https://pbs.twimg.com/profile_images/1980669444096466947/q6xlDQQY_400x400.jpg",
    handle: "Fernando_Her85",
    name: "Fernando Herrera",
    isVerified: true,
    date: "Feb 7, 2026",

    quote: "I have to try this :)",
  },
  {
    avatar:
      "https://pbs.twimg.com/profile_images/1940486720190820352/7gl2X1b2_400x400.jpg",
    name: "Expo",
    handle: "expo",
    isVerified: true,
    date: "Feb 6, 2026",
    quote: "These are pretty 🤩",
  },
  {
    avatar:
      "https://pbs.twimg.com/profile_images/1912368461809852416/58i5jQSX_400x400.jpg",
    name: "Thomino",
    handle: "ThominoDesign",
    quote: "wow! thanks a lot for sharing. amazing!",
    date: "Feb 2, 2026",
  },
];

export default function Testimonials() {
  return (
    <section className="@container py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="space-y-4">
          <h2
            className={`${bethanyFont.className} text-balance text-4xl font-medium font-bethany`}
          >
            How people feel about Reacticx
          </h2>
          <p className="text-zinc-500 text-balance dark:text-zinc-400">
            Hear from our users about their experience with Reacticx and how it
            has transformed their development workflow.
          </p>
        </div>
        <div className="@xl:grid-cols-2 mt-12 grid gap-3">
          {testimonials.map((testimonial, index) => (
            <TweetCard
              key={index}
              authorName={testimonial.name}
              authorHandle={testimonial.handle}
              authorImage={testimonial.avatar}
              content={[testimonial.quote]}
              isVerified={testimonial.isVerified ?? false}
              timestamp={testimonial.date}
              href={`https://x.com/${testimonial.handle}`}
              reply={undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
