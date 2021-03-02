/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die Marker-Klasse repräsentiert ein instanziertes Event und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 */


import { Demonstration } from "../interfaces/Demonstration";

export class Marker implements Demonstration {

  id: string;
  name: string;
  description: string;
  start_at: Date;
  end_at: Date;
  lat: number;
  lng: number;
  created_at: Date;
  deleted_at: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    start_at: Date,
    end_at: Date,
    lat: number,
    lng: number,
    created_at: Date,
    deleted_at: Date
    ){
      this.id=id;
      this.name=name;
      this.description=description;
      this.start_at=start_at;
      this.end_at=end_at;
      this.lat=lat;
      this.lng=lng;
      this.created_at=created_at;
      this.deleted_at=deleted_at;
  }
}
