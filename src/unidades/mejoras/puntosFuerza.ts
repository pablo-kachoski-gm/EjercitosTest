import { PuntosFuerzaDecoratorI } from "./interfaces/decorator";
import { TipoMejoraDecoratorI } from "./interfaces/tipoMejoraDecorator";

export class MejoraPuntosFuerza implements PuntosFuerzaDecoratorI {
    mejora: PuntosFuerzaDecoratorI;
    tipoMejora: TipoMejoraDecoratorI;

    constructor(mejora: PuntosFuerzaDecoratorI, tipoMejora: TipoMejoraDecoratorI) {
        this.mejora = mejora;
        this.tipoMejora = tipoMejora;
    }

    getPuntosFuerza() {
        return this.mejora ?
            this.tipoMejora.getPuntosMejora() + this.mejora.getPuntosFuerza()
            : this.tipoMejora.getPuntosMejora();
    }
    getTipoMejora() {
        return this.tipoMejora;
    }
}