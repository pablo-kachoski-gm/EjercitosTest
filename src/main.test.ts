import { EjercitoFactory } from "./ejercitos/ejercitoFactory";
import { TiposCivilizaciones } from "./ejercitos/civilizaciones";
import { TipoUnidadEjercito } from "./ejercitos/interfaces/unidadesEjercito";
import { TipoUnidad } from "./unidades/tipoUnidad";
import { GestorDeBatallas } from "./batallas/gestorBatallas";

const { CHINOS, BIZANTINOS, INGLESES } = TiposCivilizaciones;
const { PIQUEROS, ARQUEROS, CABALLEROS } = TipoUnidadEjercito;
const { PIQUERO, ARQUERO, CABALLERO } = TipoUnidad;
const factory = new EjercitoFactory();

test('Prueba Capacidad Ejercito Chino', () => {
  const ejercito = factory.crearEjercito(CHINOS);
  expect(ejercito.unidades[PIQUEROS].length).toBe(2);
  expect(ejercito.unidades[ARQUEROS].length).toBe(25);
  expect(ejercito.unidades[CABALLEROS].length).toBe(2);
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
  const ejercito = factory.crearEjercito(CHINOS);
  expect(ejercito.unidades[PIQUEROS][0].getPuntosFuerza()).toBe(5);
  ejercito.mejorarUnidad(0, PIQUERO);
  expect(ejercito.cantidadMoneda).toBe(990);
  expect(ejercito.unidades[PIQUEROS][0].getPuntosFuerza()).toBe(8);
  ejercito.mejorarUnidad(0, PIQUERO);
  expect(ejercito.cantidadMoneda).toBe(980);
  expect(ejercito.unidades[PIQUEROS][0].getPuntosFuerza()).toBe(11);
});
test('Prueba Mejora Arquero', () => {
  const ejercito = factory.crearEjercito(CHINOS);
  expect(ejercito.unidades[ARQUEROS][0].getPuntosFuerza()).toBe(10);
  ejercito.mejorarUnidad(0, ARQUERO);
  expect(ejercito.cantidadMoneda).toBe(980);
  expect(ejercito.unidades[ARQUEROS][0].getPuntosFuerza()).toBe(17);
  ejercito.mejorarUnidad(0, ARQUERO);
  expect(ejercito.cantidadMoneda).toBe(960);
  expect(ejercito.unidades[ARQUEROS][0].getPuntosFuerza()).toBe(24);
});
test('Prueba Mejora Caballero', () => {
  const ejercito = factory.crearEjercito(CHINOS);
  expect(ejercito.unidades[CABALLEROS][0].getPuntosFuerza()).toBe(20);
  ejercito.mejorarUnidad(0, CABALLERO);
  expect(ejercito.cantidadMoneda).toBe(970);
  expect(ejercito.unidades[CABALLEROS][0].getPuntosFuerza()).toBe(30);
  ejercito.mejorarUnidad(0, CABALLERO);
  expect(ejercito.cantidadMoneda).toBe(940);
  expect(ejercito.unidades[CABALLEROS][0].getPuntosFuerza()).toBe(40);
});
test('Prueba Mejora Arquero Sin Fondos', () => {
  function mejorarUnidad() {
    const ejercito = factory.crearEjercito(CHINOS);
    ejercito.cantidadMoneda = 5;
    ejercito.mejorarUnidad(0, ARQUERO);
  }
  expect(mejorarUnidad).toThrowError("Fondos insuficientes para la mejora");
});
test('Prueba Mejora Piquero Sin Fondos', () => {
  function mejorarUnidad() {
    const ejercito = factory.crearEjercito(CHINOS);
    ejercito.cantidadMoneda = 2;
    ejercito.mejorarUnidad(0, PIQUERO);
  }
  expect(mejorarUnidad).toThrowError("Fondos insuficientes para la mejora");
});
test('Prueba Mejora Caballero Sin Fondos', () => {
  function mejorarUnidad() {
    const ejercito = factory.crearEjercito(CHINOS);
    ejercito.cantidadMoneda = 3;
    ejercito.mejorarUnidad(0, CABALLERO);
  }
  expect(mejorarUnidad).toThrowError("Fondos insuficientes para la mejora");
});
test('Prueba Mejora Caballero Id No existe', () => {
  function mejorarUnidad() {
    const ejercito = factory.crearEjercito(CHINOS);
    ejercito.mejorarUnidad(1000, CABALLERO);
  }
  expect(mejorarUnidad).toThrowError("La unidad no existe");
});
test('Prueba Transformar Piquero', () => {
  const ejercito = factory.crearEjercito(CHINOS);
  ejercito.transformarUnidad(0, PIQUERO);
  expect(ejercito.unidades[PIQUEROS].length).toBe(1);
  expect(ejercito.unidades[ARQUEROS].length).toBe(26);
  expect(ejercito.cantidadMoneda).toBe(970);
});
test('Prueba Transformar Arquero', () => {
  const ejercito = factory.crearEjercito(CHINOS);
  ejercito.transformarUnidad(0, ARQUERO);
  expect(ejercito.unidades[PIQUEROS].length).toBe(2);
  expect(ejercito.unidades[ARQUEROS].length).toBe(24);
  expect(ejercito.unidades[CABALLEROS].length).toBe(3);
  expect(ejercito.cantidadMoneda).toBe(960);
});

test('Prueba Obtener total puntos ejercito chino', () => {
  const ejercito = factory.crearEjercito(CHINOS);
  // 2 -> 5
  // 25 -> 10
  // 2 -> 20
  // 10 + 250 + 40 = 300
  expect(ejercito.getPuntosTotales()).toBe(300);
});
test('Prueba Obtener total puntos ejercito ingles', () => {
  const ejercito = factory.crearEjercito(INGLESES);
  // 10 -> 5
  // 10 -> 10
  // 10 -> 20
  // 50 + 100 + 200 = 350
  expect(ejercito.getPuntosTotales()).toBe(350);
});
test('Prueba Obtener total puntos ejercito bizantino', () => {
  const ejercito = factory.crearEjercito(BIZANTINOS);
  // 5 -> 5
  // 8 -> 10
  // 15 -> 20
  // 25 + 80 + 300 = 405
  expect(ejercito.getPuntosTotales()).toBe(405);
});
test('Prueba Obtener total puntos ejercito bizantino con mejoras Caballeros', () => {
  const ejercito = factory.crearEjercito(BIZANTINOS);
  ejercito.mejorarUnidad(0, CABALLERO);
  ejercito.mejorarUnidad(0, CABALLERO);
  ejercito.mejorarUnidad(1, CABALLERO);
  ejercito.mejorarUnidad(2, CABALLERO);
  // 5 -> 5
  // 8 -> 10
  // 15 -> 20
  // 25 + 80 + 300 + 40 = 445
  expect(ejercito.getPuntosTotales()).toBe(445);
});
test('Prueba Obtener total puntos ejercito bizantino con mejoras Piqueros', () => {
  const ejercito = factory.crearEjercito(BIZANTINOS);
  ejercito.mejorarUnidad(0, PIQUERO);
  ejercito.mejorarUnidad(0, PIQUERO);
  ejercito.mejorarUnidad(1, PIQUERO);
  ejercito.mejorarUnidad(2, PIQUERO);
  ejercito.mejorarUnidad(3, PIQUERO);
  // 5 -> 5
  // 8 -> 10
  // 15 -> 20
  // 25 + 80 + 300 = 405
  expect(ejercito.getPuntosTotales()).toBe(420);
});
test('Prueba Batalla Ejercito CHINO vs BIZANTINOS', () => {
  const ejercitoChino = factory.crearEjercito(CHINOS);
  const ejercitoBizantino = factory.crearEjercito(BIZANTINOS);

  const gestorBatalla = new GestorDeBatallas();
  gestorBatalla.agregarEjercito(ejercitoChino);
  gestorBatalla.agregarEjercito(ejercitoBizantino);

  expect(gestorBatalla.enfrentarEjercitos(ejercitoChino.id, ejercitoBizantino.id)).toBe(ejercitoBizantino);
  expect(ejercitoBizantino.cantidadMoneda).toBe(1100);

});
test('Prueba Batalla Ejercito CHINOS vs INGLESES', () => {
  const ejercitoChino = factory.crearEjercito(CHINOS);
  const ejercitoIngles = factory.crearEjercito(INGLESES);

  const gestorBatalla = new GestorDeBatallas();
  gestorBatalla.agregarEjercito(ejercitoChino);
  gestorBatalla.agregarEjercito(ejercitoIngles);

  expect(gestorBatalla.enfrentarEjercitos(ejercitoChino.id, ejercitoIngles.id)).toBe(ejercitoIngles);
  expect(ejercitoIngles.cantidadMoneda).toBe(1100);

});
test('Prueba Batalla Ejercito BIZANTINOS vs INGLESES', () => {
  const ejercitoBizantino = factory.crearEjercito(BIZANTINOS);
  const ejercitoIngles = factory.crearEjercito(INGLESES);

  const gestorBatalla = new GestorDeBatallas();
  gestorBatalla.agregarEjercito(ejercitoBizantino);
  gestorBatalla.agregarEjercito(ejercitoIngles);

  expect(gestorBatalla.enfrentarEjercitos(ejercitoBizantino.id, ejercitoIngles.id)).toBe(ejercitoBizantino);
  expect(ejercitoBizantino.cantidadMoneda).toBe(1100);

});
test('Prueba Batalla Ejercito BIZANTINOS vs INGLESES', () => {
  const ejercitoBizantino = factory.crearEjercito(BIZANTINOS); // 405
  ejercitoBizantino.mejorarUnidad(0, PIQUERO);
  ejercitoBizantino.mejorarUnidad(0, PIQUERO);
  ejercitoBizantino.mejorarUnidad(0, PIQUERO);
  ejercitoBizantino.mejorarUnidad(0, PIQUERO);
  ejercitoBizantino.mejorarUnidad(0, PIQUERO);

  const ejercitoIngles = factory.crearEjercito(INGLESES); // 350
  ejercitoIngles.mejorarUnidad(0, CABALLERO); // 10
  ejercitoIngles.mejorarUnidad(0, CABALLERO); // 10
  ejercitoIngles.mejorarUnidad(0, CABALLERO); // 10
  ejercitoIngles.mejorarUnidad(0, CABALLERO); // 10
  ejercitoIngles.mejorarUnidad(0, CABALLERO); // 10
  ejercitoIngles.mejorarUnidad(0, CABALLERO); // 10
  ejercitoIngles.mejorarUnidad(0, CABALLERO); // 10

  const gestorBatalla = new GestorDeBatallas();
  gestorBatalla.agregarEjercito(ejercitoBizantino);
  gestorBatalla.agregarEjercito(ejercitoIngles);
 
  expect(ejercitoBizantino.getPuntosTotales()).toBe(420);
  expect(ejercitoIngles.getPuntosTotales()).toBe(420);
  
  expect(gestorBatalla.enfrentarEjercitos(ejercitoBizantino.id, ejercitoIngles.id)).toBe(null);
 
  expect(ejercitoBizantino.unidades[PIQUEROS].length).toBe(4);
  expect(ejercitoIngles.unidades[PIQUEROS].length).toBe(9);

});
