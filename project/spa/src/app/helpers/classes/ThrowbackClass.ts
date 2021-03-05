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
   events_id: string;
   created_at: Date;
   deleted_at: Date;

   constructor(
     id: string,
     name: string,
     description: string,
     social_media_video_url: string,
     events_id: string,
     created_at: Date,
     deleted_at: Date
     ){
       this.id=id;
       this.name=name;
       this.description=description;
       this.social_media_video_url=social_media_video_url;
       this.events_id=events_id;
       this.created_at=created_at;
       this.deleted_at=deleted_at;
   }

 }
