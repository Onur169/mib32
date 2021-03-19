import { SafeUrl } from "@angular/platform-browser";

/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die Alliance-Klasse repräsentiert ein instanziertes Bündnis mit ihren unterschiedlich responsiv angepassten Bildern und
 * wird im Rahmen der Alliance-Komponente genutzt.
 */
 export class AllianceImageClass{

  private small: SafeUrl;
  private medium: SafeUrl;
  private large: SafeUrl;

  public getSmall(): SafeUrl {
    return this.small;
  }

  public getMedium(): SafeUrl {
    return this.medium;
  }

  public getLarge(): SafeUrl {
    return this.large;
  }

  constructor(small: SafeUrl, medium: SafeUrl, large: SafeUrl){
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
