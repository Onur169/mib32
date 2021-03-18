/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Das Testimonilas-Inferface gibt die Attribute eines Testimonials vor und wird im Rahmen der Testimonials-Komponente genutzt.
 * Ebenso für den Typ-sicheren Empfang eines Events.
 *
 */

 export interface TestimonialImages{
  small: string;
  medium: string;
  large: string;
}


 export interface Testimonial {
  id: string;
  headline: string;
  description: string;
  token: string;
  extension: string;
  images: TestimonialImages;
  description_shortened: string;
}
