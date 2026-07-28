// Frases que rotan solas. Agrega, quita o edita las que quieras —
// el orden no importa, la app elige una distinta cada día.

export const DAILY_MESSAGES = [
  "Hoy también eres lo primero que pienso al despertar.",
  "La distancia es solo un número, y cada día ese número achica.",
  "Cada mensaje tuyo es mi parte favorita del día.",
  "Estoy construyendo una vida contigo, aunque hoy sea desde lejos.",
  "Ojalá pudieras sentir desde allá cuánto titaño hoy.",
  "No importa la hora que sea allá, mi cabeza sigue en tu zona horaria.",
  "Un día menos, un abrazo más cerca.",
  "Gracias por hacer que la espera valga la pena.",
  "Hoy quiero que sepas que eres mi lugar favorito.",
  "Contando estrellas y contando días, en ese orden.",
  "Si el cielo que ves es el mismo que veo yo, ya estamos un poco juntos.",
  "Nada se siente tan lejos cuando pienso en lo cerca que ya estamos de vernos.",
  "Hoy te mando toda la calma que necesites, y un apapachito virtual.",
  "Eres la razón por la que reviso el calendario con una sonrisa.",
  "Cada día que pasa es un día menos para tenerte cerca.",
  "Te quiero hasta en los días en los que solo alcanza para un \"buenas noches\" y ya.",
  "La espera es dura, pero tú haces que valga cada segundo.",
  "Hoy, como siempre, elijo quererte a la distancia.",
  "Falta menos. Siempre falta menos.",
  "Pienso en la primera cosa que voy a decirte cuando te vea.",
  "Eres mi ancla incluso cuando estamos a kilómetros.",
  "Ningún mapa puede contra lo que sentimos.",
  "Un mensaje tuyo arregla cualquier día difícil.",
  "Sigo eligiéndote, todos los días, sin excepción.",
  "Hoy titaño con una sonrisa, porque sé que ya falta poco.",
  "La distancia nos enseñó a valorar hasta los detalles pequeños.",
  "Cuenta regresiva activada, corazón en modo espera feliz.",
  "Cada día contigo, aunque sea a la distancia, es un buen día.",
  "Guardo cada detalle para contártelo cuando te vea.",
  "Hoy también, gracias por escogerme a pesar del kilometraje.",
  "Te mando un bisito por aquí, aunque no llegue como se siente de verdad.",
  "Hoy me urge un apapacho tuyo, de esos que arreglan el día completo.",
  "Te quiero muchito, y cada día un poquito más.",
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
  "Ten listo un abrazo grande, que ya casi te lo entrego en persona.",
];

// Elige un elemento de forma determinística según un índice (mismo índice =
// misma frase siempre, así el mensaje del día no cambia si recargas la app).
export function pickDeterministic(list, index) {
  return list[((index % list.length) + list.length) % list.length];
}
