import { TipoMejoraDecoratorI } from "./interfaces/tipoMejoraDecorator";

export class MejoraPuntosFuerzaArquero implements TipoMejoraDecoratorI {
    static costo: number = 20;
    puntosMejora: number;
    constructor() { };
    getPuntosMejora() { return 7 };
}