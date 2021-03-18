/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Das Throw-Inferface gibt die Attribute eines Rückblicks vor und wird im Rahmen der Throwback-Komponente genutzt.
 *
 */

 export interface Throwback {
  id: string;
  name: string
  description: string;
  social_media_video_url: string;
  start_at: Date;
  end_at: Date;
  lat: number;
  lng: number;
  location_name: string;
  description_shortened: string;
}
