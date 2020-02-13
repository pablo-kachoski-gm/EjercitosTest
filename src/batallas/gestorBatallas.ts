import { EjercitoI } from "../ejercitos/interfaces/ejercito";
import { TipoUnidadEjercito } from "../ejercitos/interfaces/unidadesEjercito";

export class GestorDeBatallas {
    ejercitos: Array<EjercitoI>

    constructor() {
        this.ejercitos = [];
    }
    agregarEjercito(ejercito: EjercitoI) {
        const ejercitoEncontrado = this.ejercitos.find(ej => ej.id === ejercito.id);
        if (ejercitoEncontrado) {
            throw Error(`El ejercito ${ejercito.id} ya existe`);
        }
        this.ejercitos.push(ejercito)
    }
    enfrentarEjercitos(ejercito1Id: number, ejercito2Id: number) {
        if (!ejercito1Id || !ejercito2Id) {
            throw Error("Argumentos Invalidos");
        }

        const ejercito1 = this.ejercitos.find(ejercito => ejercito.id === ejercito1Id);
        if (!ejercito1) {
            throw Error(`El ejercito ${ejercito1Id} no existe`);
        }
        const ejercito2 = this.ejercitos.find(ejercito => ejercito.id === ejercito2Id);
        if (!ejercito2) {
            throw Error(`El ejercito ${ejercito1Id} no existe`);
        }

        const totalEj1 = ejercito1.getPuntosTotales();
        const totalEj2 = ejercito2.getPuntosTotales();

        if (totalEj1 == totalEj2) {
            this.elimininarUnidadEjercito(ejercito1);
            this.elimininarUnidadEjercito(ejercito2);
            return null;
        }

        if (totalEj1 > totalEj2) {
            ejercito1.agregarMoneda(100);
        } else {
            ejercito2.agregarMoneda(100);
        }
        return totalEj1 > totalEj2 ? ejercito1 : ejercito2;

    }
    private elimininarUnidadEjercito(ejercito: EjercitoI) {
        const piqueros = ejercito.unidades[TipoUnidadEjercito.PIQUEROS];
        if (piqueros.length > 0) {
            ejercito.eliminarUnidad(piqueros[0].id, TipoUnidadEjercito.PIQUEROS);
            return;
        }
        const arqueros = ejercito.unidades[TipoUnidadEjercito.ARQUEROS];
        if (arqueros.length > 0) {
            ejercito.eliminarUnidad(arqueros[0].id, TipoUnidadEjercito.ARQUEROS);
            return;
        }
        const caballeros = ejercito.unidades[TipoUnidadEjercito.CABALLEROS];
        if (caballeros.length > 0) {
            ejercito.eliminarUnidad(caballeros[0].id, TipoUnidadEjercito.CABALLEROS);
            return;
        }
    }
}