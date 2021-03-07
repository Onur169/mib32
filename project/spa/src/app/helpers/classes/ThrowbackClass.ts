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
   private socialMediaVideoUrl: string;
   private startDate: Date;
   private endDate: Date;
   private lat: number;
   private lng: number;
   private locationName: string;


   constructor(
    id: string,
    name: string,
    description: string,
    socialMediaVideoUrl: string,
    startDate: Date,
    endDate: Date,
    lat: number,
    lng: number,
    locationName: string
     ){
       this.id=id;
       this.name=name;
       this.description=description;
       this.socialMediaVideoUrl=socialMediaVideoUrl;
       this.startDate=startDate;
       this.endDate=endDate;
       this.lat=lat;
       this.lng=lng;
       this.locationName=locationName;
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

    public getsocialMediaVideoUrl(): string {
        return this.socialMediaVideoUrl;
    }

    public setsocialMediaVideoUrl(socialMediaVideoUrl: string): void {
        this.socialMediaVideoUrl = socialMediaVideoUrl;
    }

    public getstartDate(): Date {
        return this.startDate;
    }

    public setstartDate(startDate: Date): void {
        this.startDate = startDate;
    }

    public getendDate(): Date {
        return this.endDate;
    }

    public setendDate(endDate: Date): void {
        this.endDate = endDate;
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
