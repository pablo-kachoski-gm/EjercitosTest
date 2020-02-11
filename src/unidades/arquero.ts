import { PuntosFuerzaDecoratorI } from "./mejoras/interfaces/decorator";
import { MejoraPuntosFuerza } from "./mejoras/puntosFuerza";
import { UnidadI } from "./unidad";
import { MejoraPuntosFuerzaArquero } from "./mejoras/puntosFuerzaArquero";

export class Arquero implements FuerzaMejorableI, UnidadI {
    id: number;
    puntosFuerza: number;
    mejora: PuntosFuerzaDecoratorI;
    constructor({ id }: {id: number}) {
        this.id = id;
        this.puntosFuerza = 10;
        this.mejora = null;
    }
    mejorarPuntosFuerza() {
        this.mejora = new MejoraPuntosFuerza(this.mejora, new MejoraPuntosFuerzaArquero() );
    }
    getPuntosFuerza(): number {
        return this.mejora ? this.puntosFuerza + this.mejora.getPuntosFuerza() : this.puntosFuerza;
    }
}