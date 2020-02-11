import { UnidadMejorableI } from "../../unidades/UnidadMejorable";

export enum TipoUnidadEjercito {
    PIQUEROS = "piqueros",
    ARQUEROS = "arqueros",
    CABALLEROS = "caballeros"
}

export interface UnidadesEjercitoI {
    [TipoUnidadEjercito.PIQUEROS]: Array<UnidadMejorableI>;
    [TipoUnidadEjercito.ARQUEROS]: Array<UnidadMejorableI>;
    [TipoUnidadEjercito.CABALLEROS]: Array<UnidadMejorableI>;
} 