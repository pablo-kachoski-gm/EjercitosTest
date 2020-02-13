import { MejoraUnidadesI } from "./mejoraUnidades";
import { TransformaUnidadesI } from "./transformaUnidades";
import { UnidadesEjercitoI, TipoUnidadEjercito } from "./unidadesEjercito";

export interface EjercitoI extends MejoraUnidadesI, TransformaUnidadesI {
    id: number;
    unidades: UnidadesEjercitoI;
    getPuntosTotales: () => number;
    agregarMoneda: (cantidadMoneda: number) => void;
    eliminarUnidad: (unidadId: number, tipoUnidad: TipoUnidadEjercito) => void;
}