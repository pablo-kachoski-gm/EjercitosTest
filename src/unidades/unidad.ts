import { PuntosFuerzaDecoratorI } from "./mejoras/interfaces/decorator";

export interface UnidadI {
        id: number;
        puntosFuerza: number;
        mejora: PuntosFuerzaDecoratorI;
        getPuntosFuerza: () => number;
}