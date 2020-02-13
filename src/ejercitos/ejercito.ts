import { UnidadesEjercitoI, TipoUnidadEjercito } from "./interfaces/unidadesEjercito";
import { UnidadMejorableI } from "../unidades/UnidadMejorable";
import { TipoUnidad } from "../unidades/tipoUnidad";
import { MejoraPuntosFuerzaPiquero } from "../unidades/mejoras/puntosFuerzaPiquero";
import { MejoraPuntosFuerzaArquero } from "../unidades/mejoras/puntosFuerzaArquero";
import { MejoraPuntosFuerzaCaballero } from "../unidades/mejoras/puntosFuerzaCaballero";
import { Arquero } from "../unidades/arquero";
import { EjercitoI } from "./interfaces/ejercito";
import { Caballero } from "../unidades/caballero";

const mapUnidadToEjercito = {
    [TipoUnidad.ARQUERO]: TipoUnidadEjercito.ARQUEROS,
    [TipoUnidad.PIQUERO]: TipoUnidadEjercito.PIQUEROS,
    [TipoUnidad.CABALLERO]: TipoUnidadEjercito.CABALLEROS,
}
export class Ejercito implements EjercitoI {
    id: number;
    cantidadMoneda: number;
    unidades: UnidadesEjercitoI;
    costoMejoras: {
        [TipoUnidad.PIQUERO]: { mejoraFuerza: number, transformacion: number },
        [TipoUnidad.ARQUERO]: { mejoraFuerza: number, transformacion: number },
        [TipoUnidad.CABALLERO]: { mejoraFuerza: number }
    };

    constructor(unidades: UnidadesEjercitoI) {
        this.id = Math.floor(Math.random() * (200000 - 0));
        this.unidades = unidades || {
            [TipoUnidadEjercito.PIQUEROS]: [],
            [TipoUnidadEjercito.ARQUEROS]: [],
            [TipoUnidadEjercito.CABALLEROS]: []
        };
        this.cantidadMoneda = 1000;
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
                this.unidades[TipoUnidadEjercito.CABALLEROS].push(new Caballero({ id: newId }));
            } break;
            default: { }
        }
        this.cantidadMoneda = this.cantidadMoneda - this.costoMejoras[tipoUnidad].transformacion;
    }

    getPuntosTotales() {
        let puntosPiqueros = this.unidades[TipoUnidadEjercito.PIQUEROS]
            .map(piquero => piquero.getPuntosFuerza())
            .reduce((acum, puntosFuerza) => acum + puntosFuerza);
        let puntosArqueros = this.unidades[TipoUnidadEjercito.ARQUEROS]
            .map(arquero => arquero.getPuntosFuerza())
            .reduce((acum, puntosFuerza) => acum + puntosFuerza);
        let puntosCaballeros = this.unidades[TipoUnidadEjercito.CABALLEROS]
            .map(caballero => caballero.getPuntosFuerza())
            .reduce((acum, puntosFuerza) => acum + puntosFuerza);
        return puntosPiqueros + puntosArqueros + puntosCaballeros;
    }

    agregarMoneda(cantidadMoneda: number) {
        this.cantidadMoneda += cantidadMoneda;
    }

    eliminarUnidad(unidadId: number, tipoUnidad: TipoUnidadEjercito) {
        if (unidadId === undefined || tipoUnidad === undefined) {
            throw Error("Argumentos Invalidos");
        }
        this.unidades[tipoUnidad] = this.unidades[tipoUnidad].filter(unidad => unidad.id != unidadId)
    }

    obtenerMejorUnidad() {
        const unidadesEjercito = [
            ...this.unidades[TipoUnidadEjercito.PIQUEROS].map(unidad => ({ value: unidad, type: TipoUnidadEjercito.PIQUEROS })),
            ...this.unidades[TipoUnidadEjercito.ARQUEROS].map(unidad => ({ value: unidad, type: TipoUnidadEjercito.ARQUEROS })),
            ...this.unidades[TipoUnidadEjercito.CABALLEROS].map(unidad => ({ value: unidad, type: TipoUnidadEjercito.CABALLEROS }))
        ]
        let maxValue = 0;
        let maxUnit: any = null;
        unidadesEjercito.forEach((unidad) => {
            const puntosUnidad = unidad.value.getPuntosFuerza();
            maxValue = puntosUnidad >= maxValue ? puntosUnidad : maxValue;
            maxUnit = puntosUnidad >= maxValue ? unidad : maxUnit;
        })
        return { unidad: maxUnit.value, tipoUnidad: maxUnit.type };
    }
}