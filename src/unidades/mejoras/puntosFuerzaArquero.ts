import { TipoMejoraDecoratorI } from "./interfaces/tipoMejoraDecorator";

export class MejoraPuntosFuerzaArquero implements TipoMejoraDecoratorI {
    static costo: number = 7;
    puntosMejora: number;
    constructor() { };
    getPuntosMejora() { return 20 };
}