/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Das Alliance-Inferface gibt die Attribute eines Bündnis-Objekts vor und wird im Rahmen des Alliance-Service genutzt genutzt.
 *
 */

 export interface AllianceImages{
  small: string;
  medium: string;
  large: string;
}

 export interface Alliance {
   id: string;
   name: string;
   url: string;
   token: string;
   extension: string;
   images: AllianceImages;
 }
