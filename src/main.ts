import { EjercitoFactory } from "./ejercitos/ejercitoFactory";
import { TiposCivilizaciones } from "./ejercitos/civilizaciones";

const { CHINOS, BIZANTINOS, INGLESES } = TiposCivilizaciones;
const factory = new EjercitoFactory();

const ejercitoChino = factory.crearEjercito(CHINOS);
const ejercitoBizantino = factory.crearEjercito(BIZANTINOS);
const ejercitoIngles = factory.crearEjercito(INGLESES);


console.log(ejercitoChino.unidades);
console.log(ejercitoBizantino.unidades);
console.log(ejercitoIngles.unidades);