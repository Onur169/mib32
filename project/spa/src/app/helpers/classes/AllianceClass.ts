/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die Marker-Klasse repräsentiert ein instanziertes Event und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 */

 export class AllianceImageClass{

  private small: string;
  private medium: string;
  private large: string;

  public getSmall(): string {
    return this.small;
  }

  public getMedium(): string {
    return this.medium;
  }

  public getLarge(): string {
    return this.large;
  }


  constructor(small: string, medium: string, large: string){
    this.small=small;
    this.medium=medium;
    this.large=large;
  }
}

 export class AllianceClass {

  private picture:AllianceImageClass;
  private path: string
  private name: string;


  public getPicture(): AllianceImageClass {
    return this.picture;
  }

  public getPath(): string {
    return this.path;
  }

  public getName(): string {
    return this.name;
  }


  constructor(
    picture:AllianceImageClass,
    path: string,
    name: string,
  ){
    this.picture=picture;
    this.path=path;
    this.name=name;
  }

}
