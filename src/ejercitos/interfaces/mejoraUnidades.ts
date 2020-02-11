import { TipoUnidad } from "../../unidades/tipoUnidad";

export interface MejoraUnidadesI {
    mejorarUnidad: (idUnidad: number, tipoUnidad: TipoUnidad) => void;   
}