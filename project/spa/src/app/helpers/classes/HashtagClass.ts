/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die Hashtag-Klasse repräsentiert ein instanziertes Event und wird im Rahmen der Social-Komponente genutzt.
 */

 export class HashtagClass {

  private id: string;
  private hashtag: string;
  private counter: string;
  private name: string;

  public getId(): string {
    return this.id;
  }

  public getHashtag(): string {
    return this.hashtag;
  }

  public getCounter(): string {
    return this.counter;
  }

  public getName(): string {
    return this.name;
  }


  constructor(id: string, hashtag: string, counter: string, name: string){
    this.id=id;
    this.hashtag=hashtag;
    this.counter=counter;
    this.name=name;

  }
 }
