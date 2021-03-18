/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die Marker-Klasse repräsentiert ein instanziertes Event und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 */


export class TestimonialsImageClass{

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



export class TestimonialClass {

  private id: string;
  private headline: string;
  private description: string;
  private token: string;
  private extension: string;
  private images: TestimonialsImageClass;
  private descriptionShortened: string;

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

  public getDescriptionShortened(): string{
    return this.descriptionShortened;
  }

  constructor(
    id: string,
    headline: string,
    description: string,
    token: string,
    extension: string,
    images: TestimonialsImageClass,
    descriptionShortened: string
    ){
      this.id=id;
      this.headline=headline;
      this.description=description;
      this.token=token;
      this.extension=extension;
      this.images=images;
      this.descriptionShortened=descriptionShortened
  }

}
