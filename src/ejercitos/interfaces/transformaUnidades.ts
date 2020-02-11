import { TipoUnidad } from "../../unidades/tipoUnidad";

export interface TransformaUnidadesI {
    transformarUnidad: (idUnidad: number, tipoUnidad: TipoUnidad) => void;   
}