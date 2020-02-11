import { PuntosFuerzaDecoratorI } from "./mejoras/interfaces/decorator";
import { MejoraPuntosFuerza } from "./mejoras/puntosFuerza";
import { MejoraPuntosFuerzaCaballero } from "./mejoras/puntosFuerzaCaballero";
import { UnidadI } from "./unidad";

export class Caballero implements FuerzaMejorableI, UnidadI {
    id: number;
    puntosFuerza: number;
    mejora: PuntosFuerzaDecoratorI;
    constructor({ id }: { id: number }) {
        this.id = id;
        this.puntosFuerza = 20;
        this.mejora = null;
    }
    mejorarPuntosFuerza() {
        this.mejora = new MejoraPuntosFuerza(this.mejora, new MejoraPuntosFuerzaCaballero());
    }
    getPuntosFuerza(): number {
        return this.mejora ? this.puntosFuerza + this.mejora.getPuntosFuerza() : this.puntosFuerza;
    }
}