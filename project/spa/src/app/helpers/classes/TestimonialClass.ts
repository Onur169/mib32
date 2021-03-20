/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die Marker-Klasse repräsentiert ein instanziertes Event und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 */

import { SafeUrl } from "@angular/platform-browser";


export class TestimonialsImageClass{

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



export class TestimonialClass {

  private id: string;
  private headline: string;
  private description: string;
  private token: string;
  private extension: string;
  private images: TestimonialsImageClass;

  public getId(): string {
    return this.id;
  }

  public getHeadline(): string {
    return this.headline;
  }

  public getDescription(): string {
    return this.description;
  }

  public getToken(): string {
    return this.token;
  }

  public getExtension(): string {
    return this.extension;
  }

  public getImages(): TestimonialsImageClass {
    return this.images;
  }

  constructor(
    id: string,
    headline: string,
    description: string,
    token: string,
    extension: string,
    images: TestimonialsImageClass
    ){
      this.id=id;
      this.headline=headline;
      this.description=description;
      this.token=token;
      this.extension=extension;
      this.images=images;
  }

}
