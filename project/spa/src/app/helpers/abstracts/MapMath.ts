/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Das MapMath-Interface stellt diverse RechenOperation für die Map zu Verfügung.
 *
 */

import { Marker } from "../classes/Marker";


export abstract class MapMath {


  /**
   *Gibt alle Events aus, die innerhalb des gewählten Radius des Standorts liegen.
   *@param positionlng -Längengrad des eigenen Standorts
   *@param positionlat -Breitengrad des eigenen Standorts
   *@param markers -Alle Events, die in Frage kommen
   *@param maxKmDistance -Distanz auf die geprüft werden soll
  **/
  getNextEvents(positionlng:number, positionlat:number, markers: Marker[], maxKmDistance: number): Marker[]{

    let markersInsideRadius: Marker[]=[];

    markers.forEach(marker =>{
      if(this.checkIfIsInRadius(positionlng, positionlat, marker, this.convertToTude(maxKmDistance))){
        markersInsideRadius.push(marker);
      }
    });
    return markersInsideRadius;
  }

  //konvertiert km in Längen-/Breitengrad und gibt diesen zurück
  private convertToTude(kmLength: number): number{
    return kmLength/111.13;
  }

  private checkIfIsInRadius(positionlng:number, positionlat:number, marker: Marker, maxTudeDistance:number): boolean{
    let space=Math.sqrt((marker.lat-positionlat)*(marker.lat-positionlat)+(marker.lng-positionlng)*(marker.lng-positionlng));

    if(space<=maxTudeDistance)return true;
    else return false;
  }
}
