import { useState } from "react";
import "./QuizSection.css";

export default function QuizSection() {
  const [deviceName, setDeviceName] = useState("");
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [profile, setProfile] = useState("");

  const questions = [
    { id: 1, text: "Cuando [Nombre_Dispositivo] llegó a tus manos por primera vez, ¿cuál fue tu actitud?", options: [{ key: "A", label: "Amor a primera vista… (Nostálgico / Tecnólogo)" }, { key: "B", label: "Herramienta pura… (Utilitario)" }, { key: "C", label: "Entusiasmo pasajero… (Desapegado)" }] },
    { id: 2, text: "Si [Nombre_Dispositivo] empieza a ponerse lento o a fallar la batería, tú…", options: [{ key: "A", label: "Busco tutoriales… (Tecnólogo / Nostálgico)" }, { key: "B", label: "Lo sigo usando igual… (Utilitario)" }, { key: "C", label: "Empiezo a buscar activamente su reemplazo… (Desapegado)" }] },
    { id: 3, text: "¿Cómo definirías el estado físico actual (o final) de [Nombre_Dispositivo]?", options: [{ key: "A", label: "Impecable o con marcas de guerra muy bien cuidadas. (Nostálgico)" }, { key: "B", label: "Pantalla rota, batería inflada… (Utilitario)" }, { key: "C", label: "Pasó a mejor vida tan rápido que ni recuerdo si tenía rayones. (Desapegado)" }] },
    { id: 4, text: "Su espacio de almacenamiento interno usualmente estaba/está:", options: [{ key: "A", label: "Lleno de fotos, capturas viejas… (Nostálgico)" }, { key: "B", label: "Al límite, saturado de archivos de trabajo… (Utilitario)" }, { key: "C", label: "Limpio o gestionado en la nube… (Desapegado / Tecnólogo)" }] },
    { id: 5, text: "Cuando un cable o accesorio de [Nombre_Dispositivo] se daña, tu reacción es:", options: [{ key: "A", label: "Lo guardo en ‘el cajón de los cables’… (Nostálgico / Tecnólogo)" }, { key: "B", label: "Lo remiendo con cinta aislante… (Utilitario)" }, { key: "C", label: "Lo tiro a la basura y compro uno nuevo… (Desapegado)" }] },
    { id: 6, text: "¿Dónde se encuentra [Nombre_Dispositivo] en este preciso momento?", options: [{ key: "A", label: "En un cajón o estante, acumulando polvo… (Nostálgico)" }, { key: "B", label: "Conmigo en la batalla diaria… (Utilitario)" }, { key: "C", label: "Ya lo vendí, lo regalé o está en un paradero desconocido… (Desapegado)" }] },
    { id: 7, text: "Si [Nombre_Dispositivo] pudiera hablar y quejarse de ti, ¿qué te diría?", options: [{ key: "A", label: "¡Déjame ir, por favor! (Nostálgico)" }, { key: "B", label: "¡Dame un respiro! (Utilitario)" }, { key: "C", label: "Ni te acordaste de mí… (Desapegado)" }] },
    { id: 8, text: "Frente a la idea de reparar los componentes internos de [Nombre_Dispositivo]", options: [{ key: "A", label: "Me encantaría, pero es costoso… (Tecnólogo)" }, { key: "B", label: "Solo si sale más barato que comprar uno nuevo… (Utilitario)" }, { key: "C", label: "Demasiado trabajo. Prefiero actualizar… (Desapegado)" }] },
    { id: 9, text: "¿Qué tan consciente eres del impacto ambiental de los componentes dentro de [Nombre_Dispositivo]?", options: [{ key: "A", label: "Sé que tiene metales pesados y me preocupa… (Tecnólogo / Nostálgico)" }, { key: "B", label: "No pienso mucho en eso; me enfoco en el rendimiento… (Utilitario)" }, { key: "C", label: "Asumo que alguien más se encarga de reciclarlo… (Desapegado)" }] },
    { id: 10, text: "El último archivo en la memoria – Pregunta abierta", isOpen: true, placeholder: "Cuéntanos brevemente: ¿Cuál es ese momento anécdota o archivo guardado que aún recuerdas vívidamente junto a [Nombre_Dispositivo]?" }
  ];

  const handleOptionChange = (qId, value) => {
    setAnswers({ ...answers, [qId]: value });
  };

  const computeResult = () => {
    const count = { A: 0, B: 0, C: 0 };
    Object.values(answers).forEach(ans => ans && (count[ans] += 1));
    const maxKey = Object.entries(count).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
    let profileText = "";
    if (maxKey === "A") profileText = `El **Guardián Nostálgico** – Tu relación con ${deviceName || "el dispositivo"} es sentimental; lo ves como una cápsula del tiempo. REDIME puede ayudarte a darle un final digno y sostenible.`;
    else if (maxKey === "B") profileText = `El **Explotador Utilitario** – ${deviceName || "el dispositivo"} fue tu herramienta de trabajo incansable. Cuando llegue su fin, REDIME garantiza un reciclaje responsable.`;
    else profileText = `El **Desapegado Digital** – Cambias de dispositivo sin mirar atrás. REDIME facilita la recolección rápida y ecológica.`;
    setProfile(profileText);
    setShowResult(true);
  };

  return (
    <section className="quiz-section" id="quiz">
      <div className="quiz-container">
        <h2 className="quiz-title">¿Qué tipo de amante de la tecnología eres?</h2>
        <div className="quiz-device-input">
          <input
            type="text"
            placeholder="Ejemplo: Sonic A16, Samsung A16, Toshiba vieja…"
            value={deviceName}
            onChange={e => setDeviceName(e.target.value)}
            className="quiz-input"
          />
        </div>
        {questions.map(q => (
          <div key={q.id} className="quiz-card">
            <p className="quiz-question">{q.text.replace("[Nombre_Dispositivo]", deviceName || "tu dispositivo")}</p>
            {q.isOpen ? (
              <textarea
                placeholder={q.placeholder}
                value={answers[q.id] || ""}
                onChange={e => handleOptionChange(q.id, e.target.value)}
                className="quiz-textarea"
                rows={3}
              />
            ) : (
              q.options.map(opt => (
                <label key={opt.key} className="quiz-option">
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt.key}
                    checked={answers[q.id] === opt.key}
                    onChange={() => handleOptionChange(q.id, opt.key)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))
            )}
          </div>
        ))}
        <div className="quiz-action">
          <button onClick={computeResult} className="quiz-button">Ver mi perfil</button>
        </div>
        {showResult && (
          <div className="quiz-result">
            <h3 className="result-title">Tu arquetipo</h3>
            <p className="result-text" dangerouslySetInnerHTML={{ __html: profile }} />
            <a href="#unete" className="result-cta">¡Quiero aportar a Redime!</a>
          </div>
        )}
      </div>
    </section>
  );
}
