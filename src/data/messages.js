// Frases que rotan solas. Agrega, quita o edita las que quieras —
// el orden no importa, la app elige una distinta cada día.

export const DAILY_MESSAGES = [
  "No importa qué hora sea allá, mi cabeza sigue en tu zona horaria.",
  "Guardé una historia graciosa hoy solo para contártela en la noche.",
  "Te quiero incluso en los días donde solo alcanza para un buenas noches rápido.",
  "Me atrapé sonriéndole al teléfono otra vez por un mensaje tuyo.",
  "Falta menos que ayer y eso ya hace que hoy sea un buen día.",
  "Tengo una lista mental de abrazos acumulados esperando por ti.",
  "A veces abro la galería solo para ver esa foto donde salimos riendo.",
  "Ojalá la distancia entendiera que mi lugar favorito es a tu lado.",
  "Sigo eligiéndote a ti, todos los días, sin dudarlo un segundo.",
  "Haces que cualquier martes ordinario se sienta un poquito más bonito.",
  "Si hoy el día estuvo pesado, imagíname dándote ese abrazo que te debo.",
  "Pienso en la primera cosa que te voy a decir cuando te vea bajar.",
  "Qué suerte la mía haber coincidido contigo entre tanta gente.",
  "No hay distancia que enfríe las ganas gigantes que tengo de verte.",
  "Hoy te pensé cuando escuché esa canción que siempre pones.",
  "Gracias por estar presentes en mi vida, incluso cuando no estás cerca.",
  "Aviso importante: hoy me haces muchísima falta por acá.",
  "Nosotros sabemos que esto vale cada segundo de espera.",
  "Anoté otro restaurante al que tenemos que ir juntos cuando vengas.",
  "Tenerte a ti hace que la paciencia valga totalmente la pena.",
  "Saber que al final del día leeo tu mensaje cambia todo.",
  "Hoy también amanecí con la certeza de que somos el equipo perfecto.",
  "Ojalá pudiera teletransportarme cinco minutos para darte un beso y volver.",
  "Me encanta recordar la última vez que nos vimos y cómo nos reímos.",
  "Un día más superado, un día más cerca de abrazarte fuerte.",
  "Hay días difíciles, pero pensar en ti siempre me devuelve la calma.",
  "Eres mi espacio seguro, sin importar cuánta tierra nos separe.",
  "Prometo que el primer abrazo de reencuentro va a durar por lo menos un minuto.",
  "A veces me sorprendo planeando qué ropa me voy a poner el día que te vea.",
  "La espera se vuelve suave cuando sé quién me espera del otro lado.",
  "Qué bonita es la vida desde que estás en ella, así sea por pantalla.",
  "No te imaginas la sonrisa que pongo cuando veo tu nombre en las notificaciones.",
  "Si el día se pone complicado, recuerda que de este lado hay alguien pensando en ti.",
  "Contar los días para verte es mi pasatiempo favorito.",
  "Hoy simplemente quería decirte que me haces muy feliz."
];

// Frases cortas para el banner de aniversario mensual (día 7).
export const ANNIVERSARY_PHRASES = [
  "Un mes más juntos y sigo estando igual de enamorado.",
  "Gracias por hacer que otro mes juntos se sienta como nada.",
  "Sumamos un mes más a esta bonita historia de dos.",
  "Cada día 7 me recuerda la gran suerte que tengo de tenerte.",
  "Otro mes eligiéndonos con las mismas ganas del primer día.",
  "Un mes más cerquita de todo lo que estamos planeando.",
  "Feliz día siete, mi persona favorita del mundo.",
  "Gracias por hacer que cada mes a tu lado valga todo."
];

// Frases para el momento sorpresa (cuando empieza la recta final).
export const SURPRISE_PHRASES = [
  "La recta final empezó y yo ya no quepo de la emoción.",
  "Prepárate, que la cuenta regresiva ahora sí se cuenta en horas.",
  "Ten listo el abrazo más largo de tu vida, ya voy en camino.",
  "Guarda espacio en tu agenda, porque en nada nos estamos viendo.",
  "Se terminó la espera virtual, la próxima conversación es frente a frente.",
  "A partir de hoy los días van a volar, ¡ya casi te veo!"
];

// Elige un elemento de forma determinística según un índice (mismo índice =
// misma frase siempre, así el mensaje del día no cambia si recargas la app).
export function pickDeterministic(list, index) {
  return list[((index % list.length) + list.length) % list.length];
}