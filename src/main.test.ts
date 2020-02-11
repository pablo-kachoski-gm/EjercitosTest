import { EjercitoFactory } from "./ejercitos/ejercitoFactory";
import { TiposCivilizaciones } from "./ejercitos/civilizaciones";
import { TipoUnidadEjercito } from "./ejercitos/interfaces/unidadesEjercito";
import { TipoUnidad } from "./unidades/tipoUnidad";

const { CHINOS, BIZANTINOS, INGLESES } = TiposCivilizaciones;
const { PIQUEROS, ARQUEROS, CABALLEROS } = TipoUnidadEjercito;
const { PIQUERO, ARQUERO, CABALLERO } = TipoUnidad;
const factory = new EjercitoFactory();

test('Prueba Capacidad Ejercito Chino', () => {
  const ejercitoChino = factory.crearEjercito(CHINOS);
  expect(ejercitoChino.unidades[PIQUEROS].length).toBe(2);
  expect(ejercitoChino.unidades[ARQUEROS].length).toBe(25);
  expect(ejercitoChino.unidades[CABALLEROS].length).toBe(2);
});
test('Prueba Capacidad Ejercito Ingles', () => {
  const ejercitoIngles = factory.crearEjercito(INGLESES);
  expect(ejercitoIngles.unidades[PIQUEROS].length).toBe(10);
  expect(ejercitoIngles.unidades[ARQUEROS].length).toBe(10);
  expect(ejercitoIngles.unidades[CABALLEROS].length).toBe(10);
});
test('Prueba Capacidad Ejercito Bizantino', () => {
  const ejercitoBizantino = factory.crearEjercito(BIZANTINOS);
  expect(ejercitoBizantino.unidades[PIQUEROS].length).toBe(5);
  expect(ejercitoBizantino.unidades[ARQUEROS].length).toBe(8);
  expect(ejercitoBizantino.unidades[CABALLEROS].length).toBe(15);
});
test('Prueba Mejora Piquero', () => {
  const ejercitoChino = factory.crearEjercito(CHINOS);
  expect(ejercitoChino.unidades[PIQUEROS][0].getPuntosFuerza()).toBe(5);
  ejercitoChino.mejorarUnidad(0, PIQUERO);
  expect(ejercitoChino.cantidadMoneda).toBe(997);
  expect(ejercitoChino.unidades[PIQUEROS][0].getPuntosFuerza()).toBe(15);
  ejercitoChino.mejorarUnidad(0, PIQUERO);
  expect(ejercitoChino.cantidadMoneda).toBe(994);
  expect(ejercitoChino.unidades[PIQUEROS][0].getPuntosFuerza()).toBe(25);
});
test('Prueba Mejora Arquero', () => {
  const ejercitoChino = factory.crearEjercito(CHINOS);
  expect(ejercitoChino.unidades[ARQUEROS][0].getPuntosFuerza()).toBe(10);
  ejercitoChino.mejorarUnidad(0, ARQUERO);
  expect(ejercitoChino.cantidadMoneda).toBe(993);
  expect(ejercitoChino.unidades[ARQUEROS][0].getPuntosFuerza()).toBe(30);
  ejercitoChino.mejorarUnidad(0, ARQUERO);
  expect(ejercitoChino.cantidadMoneda).toBe(986);
  expect(ejercitoChino.unidades[ARQUEROS][0].getPuntosFuerza()).toBe(50);
});
test('Prueba Mejora Caballero', () => {
  const ejercitoChino = factory.crearEjercito(CHINOS);
  expect(ejercitoChino.unidades[CABALLEROS][0].getPuntosFuerza()).toBe(20);
  ejercitoChino.mejorarUnidad(0, CABALLERO);
  expect(ejercitoChino.cantidadMoneda).toBe(990);
  expect(ejercitoChino.unidades[CABALLEROS][0].getPuntosFuerza()).toBe(50);
  ejercitoChino.mejorarUnidad(0, CABALLERO);
  expect(ejercitoChino.cantidadMoneda).toBe(980);
  expect(ejercitoChino.unidades[CABALLEROS][0].getPuntosFuerza()).toBe(80);
});
test('Prueba Mejora Arquero Sin Fondos', () => {
  function mejorarUnidad() {
    const ejercitoChino = factory.crearEjercito(CHINOS);
    ejercitoChino.cantidadMoneda = 5;
    ejercitoChino.mejorarUnidad(0, ARQUERO);
  }
  expect(mejorarUnidad).toThrowError("Fondos insuficientes para la mejora");
});
test('Prueba Mejora Piquero Sin Fondos', () => {
  function mejorarUnidad() {
    const ejercitoChino = factory.crearEjercito(CHINOS);
    ejercitoChino.cantidadMoneda = 2;
    ejercitoChino.mejorarUnidad(0, PIQUERO);
  }
  expect(mejorarUnidad).toThrowError("Fondos insuficientes para la mejora");
});
test('Prueba Mejora Caballero Sin Fondos', () => {
  function mejorarUnidad() {
    const ejercitoChino = factory.crearEjercito(CHINOS);
    ejercitoChino.cantidadMoneda = 3;
    ejercitoChino.mejorarUnidad(0, CABALLERO);
  }
  expect(mejorarUnidad).toThrowError("Fondos insuficientes para la mejora");
});
test('Prueba Mejora Caballero Id No existe', () => {
  function mejorarUnidad() {
    const ejercitoChino = factory.crearEjercito(CHINOS);
    ejercitoChino.mejorarUnidad(1000, CABALLERO);
  }
  expect(mejorarUnidad).toThrowError("La unidad no existe");
});
test('Prueba Transformar Piquero', () => {
  const ejercitoChino = factory.crearEjercito(CHINOS);
  ejercitoChino.transformarUnidad(0, PIQUERO);
  expect(ejercitoChino.unidades[PIQUEROS].length).toBe(1);
  expect(ejercitoChino.unidades[ARQUEROS].length).toBe(26);
  expect(ejercitoChino.cantidadMoneda).toBe(970);
});
test('Prueba Transformar Arquero', () => {
  const ejercitoChino = factory.crearEjercito(CHINOS);
  ejercitoChino.transformarUnidad(0, ARQUERO);
  expect(ejercitoChino.unidades[PIQUEROS].length).toBe(2);
  expect(ejercitoChino.unidades[ARQUEROS].length).toBe(24);
  expect(ejercitoChino.unidades[CABALLEROS].length).toBe(3);
  expect(ejercitoChino.cantidadMoneda).toBe(960);
});