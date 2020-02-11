import { UnidadesEjercitoI, TipoUnidadEjercito } from "./interfaces/unidadesEjercito";
import { MejoraUnidadesI } from "./interfaces/mejoraUnidades";
import { UnidadMejorableI } from "../unidades/UnidadMejorable";
import { TipoUnidad } from "../unidades/tipoUnidad";
import { TransformaUnidadesI } from "./interfaces/transformaUnidades";
import { MejoraPuntosFuerzaPiquero } from "../unidades/mejoras/puntosFuerzaPiquero";
import { MejoraPuntosFuerzaArquero } from "../unidades/mejoras/puntosFuerzaArquero";
import { MejoraPuntosFuerzaCaballero } from "../unidades/mejoras/puntosFuerzaCaballero";
import { Arquero } from "../unidades/arquero";

const mapUnidadToEjercito = {
    [TipoUnidad.ARQUERO]: TipoUnidadEjercito.ARQUEROS,
    [TipoUnidad.PIQUERO]: TipoUnidadEjercito.PIQUEROS,
    [TipoUnidad.CABALLERO]: TipoUnidadEjercito.CABALLEROS,
}
export class Ejercito implements MejoraUnidadesI, TransformaUnidadesI {
    cantidadMoneda: number;
    historialBatallas: Batalla[];
    unidades: UnidadesEjercitoI;
    costoMejoras: {
        [TipoUnidad.PIQUERO]: { mejoraFuerza: number, transformacion: number },
        [TipoUnidad.ARQUERO]: { mejoraFuerza: number, transformacion: number },
        [TipoUnidad.CABALLERO]: { mejoraFuerza: number }
    };

    constructor(unidades: UnidadesEjercitoI) {
        this.unidades = unidades;
        this.cantidadMoneda = 1000;
        this.historialBatallas = [];
        this.costoMejoras = {
            [TipoUnidad.PIQUERO]: { mejoraFuerza: MejoraPuntosFuerzaPiquero.costo, transformacion: 30 },
            [TipoUnidad.ARQUERO]: { mejoraFuerza: MejoraPuntosFuerzaArquero.costo, transformacion: 40 },
            [TipoUnidad.CABALLERO]: { mejoraFuerza: MejoraPuntosFuerzaCaballero.costo }
        };
    }

    mejorarUnidad(idUnidad: number, tipoUnidad: TipoUnidad) {
        if (this.cantidadMoneda < this.costoMejoras[tipoUnidad].mejoraFuerza) {
            throw Error("Fondos insuficientes para la mejora");
        }
        const unidadesTipo: Array<UnidadMejorableI> = this.unidades[mapUnidadToEjercito[tipoUnidad]];
        const unidadEncontrada: UnidadMejorableI = unidadesTipo.find((unidad: UnidadMejorableI) => unidad.id === idUnidad);
        if (!unidadEncontrada) {
            throw Error("La unidad no existe");
        }
        unidadEncontrada.mejorarPuntosFuerza();
        this.cantidadMoneda = this.cantidadMoneda - this.costoMejoras[tipoUnidad].mejoraFuerza;
    }
    transformarUnidad(idUnidad: number, tipoUnidad: TipoUnidad) {
        if (TipoUnidad.CABALLERO === tipoUnidad) throw Error("La unidad no se puede transformar");
        if (this.cantidadMoneda < this.costoMejoras[tipoUnidad].transformacion) throw Error("Fondos insuficientes para la transformacion");

        const unidadesTipo: Array<UnidadMejorableI> = this.unidades[mapUnidadToEjercito[tipoUnidad]];
        const unidadEncontrada: UnidadMejorableI = unidadesTipo.find((unidad: UnidadMejorableI) => unidad.id === idUnidad);
        if (!unidadEncontrada) {
            throw Error("La unidad no existe");
        }
        //La transformacion eliminara la vieja unidad y se perderan las modificaciones.
        this.unidades[mapUnidadToEjercito[tipoUnidad]] = unidadesTipo.filter((unidad: UnidadMejorableI) => unidad.id !== idUnidad);
        const newId = Math.floor(Math.random() * (200000 - 0));
        switch (tipoUnidad) {
            case TipoUnidad.PIQUERO: {
                this.unidades[TipoUnidadEjercito.ARQUEROS].push(new Arquero({ id: newId }));
            } break;
            case TipoUnidad.ARQUERO: {
                this.unidades[TipoUnidadEjercito.CABALLEROS].push(new Arquero({ id: newId }));
            } break;
            default: {}
        }
        this.cantidadMoneda = this.cantidadMoneda - this.costoMejoras[tipoUnidad].transformacion;
    }
}