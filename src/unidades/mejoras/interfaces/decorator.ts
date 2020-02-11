export interface PuntosFuerzaDecoratorI {
    mejora: PuntosFuerzaDecoratorI;
    getPuntosFuerza: () => number;
}