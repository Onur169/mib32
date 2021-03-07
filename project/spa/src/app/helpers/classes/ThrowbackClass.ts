/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die Marker-Klasse repräsentiert ein instanziertes Event und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 */


 import { Demonstration } from "../interfaces/Demonstration";
import { Throwback } from "../interfaces/Throwback";

 export class ThrowbackClass implements Throwback {

   id: string;
   name: string;
   description: string;
   social_media_video_url: string;
   start_at: Date;
   end_at: Date;
   lat: number;
   lng: number;

   constructor(
     throwback: Throwback
     ){
       this.id=throwback.id;
       this.name=throwback.name;
       this.description=throwback.description;
       this.social_media_video_url=throwback.social_media_video_url;
       this.start_at=throwback.start_at;
       this.end_at=throwback.end_at;
       this.lat=throwback.lat;
       this.lng=throwback.lng;
   }


 }
