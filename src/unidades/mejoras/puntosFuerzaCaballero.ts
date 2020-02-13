import { TipoMejoraDecoratorI } from "./interfaces/tipoMejoraDecorator";

export class MejoraPuntosFuerzaCaballero implements TipoMejoraDecoratorI {
    static costo: number = 30;
    puntosMejora: number;
    constructor() { };
    getPuntosMejora() { return 10 };
}