/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die Marker-Klasse repräsentiert ein instanziertes Event und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 */

 export class ThrowbackClass{

   private id: string;
   private name: string;
   private description: string;
   private social_media_video_url: string;
   private start_at: Date;
   private end_at: Date;
   private lat: number;
   private lng: number;

   constructor(
    id: string,
    name: string,
    description: string,
    social_media_video_url: string,
    start_at: Date,
    end_at: Date,
    lat: number,
    lng: number
     ){
       this.id=id;
       this.name=name;
       this.description=description;
       this.social_media_video_url=social_media_video_url;
       this.start_at=start_at;
       this.end_at=end_at;
       this.lat=lat;
       this.lng=lng;
   }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getSocial_media_video_url(): string {
        return this.social_media_video_url;
    }

    public setSocial_media_video_url(social_media_video_url: string): void {
        this.social_media_video_url = social_media_video_url;
    }

    public getStart_at(): Date {
        return this.start_at;
    }

    public setStart_at(start_at: Date): void {
        this.start_at = start_at;
    }

    public getEnd_at(): Date {
        return this.end_at;
    }

    public setEnd_at(end_at: Date): void {
        this.end_at = end_at;
    }

    public getLat(): number {
        return this.lat;
    }

    public setLat(lat: number): void {
        this.lat = lat;
    }

    public getLng(): number {
        return this.lng;
    }

    public setLng(lng: number): void {
        this.lng = lng;
    }




 }
