/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Das Throw-Inferface gibt die Attribute eines Rückblicks vor und wird im Rahmen der Throwback-Komponente genutzt.
 * Ebenso für den Typ-sicheren Empfang eines Events.
 *
 */

 export interface Throwback {
  id: string;
  description: string;
  social_media_video_url: string;
  events_id: string;
  created_at: Date;
  deleted_at: Date;
}
