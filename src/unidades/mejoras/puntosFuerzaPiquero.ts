import { TipoMejoraDecoratorI } from "./interfaces/tipoMejoraDecorator";

export class MejoraPuntosFuerzaPiquero implements TipoMejoraDecoratorI {
    static costo: number = 10;
    puntosMejora: number;
    constructor() { };
    getPuntosMejora() { return 3 };
}