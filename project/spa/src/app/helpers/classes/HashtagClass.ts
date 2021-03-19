/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die Hashtag-Klasse repräsentiert ein instanziertes Event und wird im Rahmen der Social-Komponente genutzt.
 */

 export class HashtagClass {

  id: string;
  hashtag: string;
  counter: string;
  name: string;

  constructor(id: string, hashtag: string, counter: string, name: string){
    this.id=id;
    this.hashtag=hashtag;
    this.counter=counter;
    this.name=name;

  }
 }
