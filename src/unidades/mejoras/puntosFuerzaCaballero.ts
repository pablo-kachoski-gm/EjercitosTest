import { TipoMejoraDecoratorI } from "./interfaces/tipoMejoraDecorator";

export class MejoraPuntosFuerzaCaballero implements TipoMejoraDecoratorI {
    static costo: number = 10;
    puntosMejora: number;
    constructor() { };
    getPuntosMejora() { return 30 };
}