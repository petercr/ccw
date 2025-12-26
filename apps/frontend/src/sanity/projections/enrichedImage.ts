import groq from 'groq';

export const enrichedImageProjection = groq`
  _type == "enrichedImage" => {
    ...,
    credits->{
      name
    }
  }
`;
