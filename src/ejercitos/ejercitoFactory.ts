import { TiposCivilizaciones } from "./civilizaciones";
import { TipoUnidad } from "../unidades/tipoUnidad";
import { TipoUnidadEjercito } from "./interfaces/unidadesEjercito";

import { Ejercito } from "./ejercito";
import { Piquero } from "../unidades/piquero";
import { Arquero } from "../unidades/arquero";
import { Caballero } from "../unidades/caballero";

const { CHINOS, INGLESES, BIZANTINOS } = TiposCivilizaciones;
const { ARQUERO, PIQUERO, CABALLERO } = TipoUnidad;
export class EjercitoFactory {
    constructor() { }

    crearEjercito(civilizacion: TiposCivilizaciones): Ejercito {
        const civilizaciones: any = {
            [CHINOS]: { [PIQUERO]: 2, [ARQUERO]: 25, [CABALLERO]: 2 },
            [INGLESES]: { [PIQUERO]: 10, [ARQUERO]: 10, [CABALLERO]: 10 },
            [BIZANTINOS]: { [PIQUERO]: 5, [ARQUERO]: 8, [CABALLERO]: 15 }
        }
        const unidadesIniciales = civilizaciones[civilizacion];

        const cantidadPiqueros = unidadesIniciales[PIQUERO];
        const piqueros: Array<Piquero> = [];
        Array.from(Array(cantidadPiqueros)).forEach((_, index) =>
            piqueros.push(new Piquero({ id: index }))
        );

        const cantidadArqueros = unidadesIniciales[ARQUERO];
        const arqueros: Array<Arquero> = [];
        Array.from(Array(cantidadArqueros)).forEach(
            (_, index) => arqueros.push(new Arquero({ id: index }))
        );

        const cantidadCaballeros = unidadesIniciales[CABALLERO];
        const caballeros: Array<Caballero> = [];
        Array.from(Array(cantidadCaballeros)).forEach(
            (_, index) => caballeros.push(new Caballero({ id: index }))
        );

        return new Ejercito({
            [TipoUnidadEjercito.PIQUEROS]: piqueros,
            [TipoUnidadEjercito.ARQUEROS]: arqueros,
            [TipoUnidadEjercito.CABALLEROS]: caballeros
        });
    }
}