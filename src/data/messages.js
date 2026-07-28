// Frases que rotan solas. Agrega, quita o edita las que quieras —
// el orden no importa, la app elige una distinta cada día.

export const DAILY_MESSAGES = [
  "Hoy también eres lo primero que pienso al despertar.",
  "La distancia es solo un número contando los días para abrazarte.",
  "Cada mensaje tuyo es mi parte favorita del día.",
  "Estoy construyendo una vida contigo, aunque hoy sea desde lejos.",
  "Ojalá pudieras sentir de este lado cuánto te quiero hoy.",
  "No importa el huso horario, mi cabeza siempre está en tu zona.",
  "Un día menos, un abrazo más cerca.",
  "Gracias por hacer que la espera valga la pena.",
  "Hoy quiero que sepas que eres mi lugar favorito.",
  "Contando estrellas y contando días, en ese orden.",
  "Si el cielo que ves es el mismo que veo yo, ya estamos un poco juntos.",
  "Nada de esto se siente lejos cuando pienso en verte.",
  "Hoy te mando toda la calma que necesites.",
  "Eres la razón por la que reviso el calendario con una sonrisa.",
  "Cada día que pasa es un día menos para tenerte cerca.",
  "Te quiero incluso en los días donde solo hay silencio y buenas noches.",
  "La espera es dura, pero tú haces que valga cada segundo.",
  "Hoy, como siempre, elijo quererte a la distancia.",
  "Falta menos. Siempre falta menos.",
  "Pienso en la primera cosa que voy a decirte cuando te vea.",
  "Eres mi ancla incluso cuando estamos a kilómetros.",
  "No hay mapa que aleje lo que sentimos.",
  "Un mensaje tuyo arregla cualquier día difícil.",
  "Sigo eligiéndote, todos los días, sin excepción.",
  "Hoy te extraño con una sonrisa, porque sé que ya falta poco.",
  "La distancia nos enseñó a valorar hasta los detalles pequeños.",
  "Cuenta regresiva activada, corazón en modo espera feliz.",
  "Cada día contigo, aunque sea a la distancia, es un buen día.",
  "Guardo cada detalle para contártelo cuando te vea.",
  "Hoy también, gracias por escogerme a pesar del kilometraje.",
];

// Frases cortas para el banner de aniversario mensual (día 7).
export const ANNIVERSARY_PHRASES = [
  "Gracias por un mes más a tu lado 💛",
  "Otro mes juntos, otro mes de gratitud.",
  "Un mes más eligiéndonos, distancia incluida.",
  "Cada 7 es un pequeño recordatorio de lo afortunado que soy.",
  "Un mes más sumando a esta historia.",
  "Gracias por seguir aquí, mes tras mes.",
];

// Frases para el momento sorpresa (cuando empieza la recta final).
export const SURPRISE_PHRASES = [
  "Pronto nos veremos, amor ✈️",
  "Ya casi. Prepárate, voy en camino.",
  "La cuenta regresiva ya se siente real.",
  "Guarda un abrazo grande, que ya casi te lo entrego en persona.",
];

// Elige un elemento de forma determinística según un índice (mismo índice =
// misma frase siempre, así el mensaje del día no cambia si recargas la app).
export function pickDeterministic(list, index) {
  return list[((index % list.length) + list.length) % list.length];
}
