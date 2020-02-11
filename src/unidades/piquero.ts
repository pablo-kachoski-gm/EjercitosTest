import { PuntosFuerzaDecoratorI } from "./mejoras/interfaces/decorator";
import { MejoraPuntosFuerza } from "./mejoras/puntosFuerza";
import { MejoraPuntosFuerzaPiquero } from "./mejoras/puntosFuerzaPiquero";
import { UnidadI } from "./unidad";

export class Piquero implements FuerzaMejorableI, UnidadI {
    id: number;
    puntosFuerza: number;
    mejora: PuntosFuerzaDecoratorI;
    constructor({ id }: { id: number }) {
        this.id = id;
        this.puntosFuerza = 5;
        this.mejora = null;
    }
    mejorarPuntosFuerza() {
        this.mejora = new MejoraPuntosFuerza(this.mejora, new MejoraPuntosFuerzaPiquero());
    }
    getPuntosFuerza(): number {
        return this.mejora ? this.puntosFuerza + this.mejora.getPuntosFuerza() : this.puntosFuerza;
    }
}