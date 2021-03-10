/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Das Demonsration-Inferface gibt die Attribute eines Events vor und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 * Ebenso für den Typ-sicheren Empfang eines Events.
 *
 */

import { Testimonial } from "./Testimonials";

 export interface TestimonialsResponse {
   ack: string,
   data: Testimonial[],
   prev_page_url: string,
   next_page_url: string,
   current_page: number,
   max_pages: number
 }
