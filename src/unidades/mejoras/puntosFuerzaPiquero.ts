import { TipoMejoraDecoratorI } from "./interfaces/tipoMejoraDecorator";

export class MejoraPuntosFuerzaPiquero implements TipoMejoraDecoratorI {
    static costo: number = 3;
    puntosMejora: number;
    constructor() { };
    getPuntosMejora() { return 10 };
}