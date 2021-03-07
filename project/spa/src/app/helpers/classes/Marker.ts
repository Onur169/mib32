/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die Marker-Klasse repräsentiert ein instanziertes Event und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 */



export class Marker {

  private id: string;
  private name: string;
  private description: string;
  private startDate: Date;
  private endDate: Date;
  private lat: number;
  private lng: number;
  private locationName: string;

  constructor(
    id: string,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    lat: number,
    lng: number,
    locationName: string
    ){
      this.id=id;
      this.name=name;
      this.description=description;
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

    public getStartDate(): Date {
        return this.startDate;
    }

    public setStartDate(startDate: Date): void {
        this.startDate = startDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public setEndDate(endDate: Date): void {
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

    public getLocationName(): string {
      return this.locationName;
  }

  public setLocationName(locationName: string): void {
      this.locationName = locationName;
  }


}
