/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Das Demonsration-Inferface gibt die Attribute eines Events vor und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 * Ebenso für den Typ-sicheren Empfang eines Events.
 *
 */

export interface Demonstration {
    id: string;
    name: string;
    description: string;
    start_at: Date;
    end_at: Date;
    lat: number;
    lng: number;
    created_at: Date;
    deleted_at: Date;
}