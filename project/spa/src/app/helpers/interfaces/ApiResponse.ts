/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Das API-Inferface gibt die möglichen Attribute einer Antwort als Demonstrations-, Throwback, Testimonial- oder
 * Alliance Interfaces vor und wird im Rahmen der entsprechenden Komponenten genutzt.
 *
 */

 import { Alliance } from "./Alliance";
import { Demonstration } from "./Demonstration";
import { SocialHashtag } from "./SocialHashtag";
import { Testimonial } from "./Testimonials";
import { Throwback } from "./Throwback";

 export interface ApiResponse {
   ack: string;
   data: Demonstration[] | Throwback[] | Testimonial[] | Alliance[]| SocialHashtag[];
   prev_page_url: string;
   next_page_url: string;
   current_page: number;
   max_pages: number;
 }
