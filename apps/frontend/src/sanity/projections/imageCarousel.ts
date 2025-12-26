import groq from 'groq';

export const imageCarouselProjection = groq`
  _type == "imageCarousel" => {
    ...,
    images[] {
      ...,
      credits->{
        name
      }
    }
  }
`;
