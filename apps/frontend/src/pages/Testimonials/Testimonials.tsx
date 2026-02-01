import { Route } from "@/routes/testimonials.tsx";
import { dataset, projectId } from "@/sanity/projectDetails.ts";
import type { Testimonial } from "@/types/testimonial.ts";
import { createImageUrlBuilder } from "@sanity/image-url";
import {
  avatarBg,
  avatarImage,
  card,
  cardBody,
  cardGrid,
  cardName,
  container,
  headerPill,
  headerTitle,
} from "./Testimonials.css.ts";

export const TestimonialsPage = () => {
  const { initial } = Route.useLoaderData();
  const testimonials = initial.data;

  return (
    <article className={container}>
      <header className={headerPill}>
        <h1 className={headerTitle}>Testimonials</h1>
      </header>
      <div className={cardGrid}>
        {testimonials.map((testimonial: Testimonial) => (
          <div key={testimonial._id} className={card}>
            {testimonial.mainImage ? (
              <div className={avatarBg}>
                <img
                  className={avatarImage}
                  src={createImageUrlBuilder({ projectId, dataset })
                    .image(testimonial.mainImage)
                    .width(200)
                    .height(200)
                    .fit("crop")
                    .auto("format")
                    .url()}
                  alt={testimonial.name}
                  loading="lazy"
                />
              </div>
            ) : null}
            <h3 className={cardName}>{testimonial.name}</h3>
            <p className={cardBody}>{testimonial.body}</p>
          </div>
        ))}
      </div>
    </article>
  );
};
