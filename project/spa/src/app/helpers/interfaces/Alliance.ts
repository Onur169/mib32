/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Das Alliance-Inferface gibt die Attribute eines Bündnis-Objekts vor und wird im Rahmen des Alliance-Service genutzt genutzt.
 *
 */


 export interface AllianceProps {
   src: string;
   name: string;
   url: string;
 }

 export interface Alliance{
  files: AllianceProps[];
}
