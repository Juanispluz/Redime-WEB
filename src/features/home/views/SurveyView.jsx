import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveSurveyResult } from '../services/surveyService';
import './SurveyView.css';

/* ─── Preguntas ─────────────────────────────────────────────────── */
const QUESTIONS = [
  "Haces nuevos amigos con frecuencia.",
  "Las ideas complejas y novedosas te entusiasman más que las simples y llanas.",
  "Sueles sentirte más persuadido por lo que resuena emocionalmente en ti que por los argumentos basados en hechos.",
  "Guardas dispositivos viejos por el valor emocional que tienen para ti.",
  "Te cuesta deshacerte de objetos aunque ya no los uses.",
  "Prefieres reparar un dispositivo antes que comprar uno nuevo.",
  "Sueles explorar todas las funciones de tus aparatos antes de reemplazarlos.",
  "Te identificas más con la utilidad de un objeto que con su historia.",
  "Crees que el ciclo de vida de un dispositivo debería extenderse lo más posible.",
  "Sientes que los dispositivos que has usado forman parte de tu identidad.",
];

const SCALE_LABELS = [
  'Totalmente en desacuerdo',
  'En desacuerdo',
  'Neutral',
  'De acuerdo',
  'Totalmente de acuerdo',
];

/* ─── Lógica de Arquetipos ──────────────────────────────────────── */
function calcArchetype(answers) {
  const total = Object.values(answers).reduce((s, v) => s + v, 0);
  const max = QUESTIONS.length * 5;
  const pct = (total / max) * 100;

  if (pct >= 70) {
    return {
      key: 'guardian',
      name: 'Guardián Nostálgico',
      emoji: '🛡️',
      color: '#4AB69A',
      desc: 'Tienes un vínculo profundo con tus dispositivos. Los ves como compañeros de vida, no solo herramientas. Conservas la historia digital con cariño.',
    };
  } else if (pct >= 40) {
    return {
      key: 'utilitario',
      name: 'Explotador Utilitario',
      emoji: '⚡',
      color: '#F5A623',
      desc: 'Eres pragmático y eficiente. Aprovechas tus dispositivos al máximo pero no te atas a ellos sentimentalmente. Equilibrado y funcional.',
    };
  } else {
    return {
      key: 'desapegado',
      name: 'Desapegado Digital',
      emoji: '🌊',
      color: '#7B9FCC',
      desc: 'Fluyes con la tecnología sin apego. Los dispositivos son medios, no fines. Eres de los que renueva sin mirar atrás.',
    };
  }
}

/* ─── Componente pregunta ───────────────────────────────────────── */
function SurveyQuestion({ index, question, selected, onSelect }) {
  return (
    <div className={`sv-question${selected ? ' sv-question-answered' : ''}`}>
      <p className="sv-question-text">
        <span className="sv-question-num">{String(index + 1).padStart(2, '0')}</span>
        {question}
      </p>
      <div className="sv-scale">
        <span className="sv-scale-edge-label">En desacuerdo</span>
        <div className="sv-circles">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => onSelect(val)}
              className={`sv-circle sv-circle-${val}${selected === val ? ' sv-circle-active' : ''}`}
              title={SCALE_LABELS[val - 1]}
              aria-label={SCALE_LABELS[val - 1]}
            />
          ))}
        </div>
        <span className="sv-scale-edge-label sv-scale-edge-right">De acuerdo</span>
      </div>
    </div>
  );
}

/* ─── Componente de Resultados ──────────────────────────────────── */
function SurveyResults({ name, device, answers, archetype, onReset }) {
  const total = Object.values(answers).reduce((s, v) => s + v, 0);
  const max = QUESTIONS.length * 5;
  const pct = Math.round((total / max) * 100);

  return (
    <div className="sv-results" style={{ '--archetype-color': archetype.color }}>
      {/* Header resultado */}
      <div className="sv-results-header">
        <div className="sv-results-emoji">{archetype.emoji}</div>
        <div className="sv-results-chip">Tu arquetipo digital</div>
        <h2 className="sv-results-name">{archetype.name}</h2>
        <p className="sv-results-desc">{archetype.desc}</p>
      </div>

      {/* Datos del encuestado */}
      <div className="sv-results-identity">
        <div className="sv-results-identity-row">
          <span className="sv-results-identity-label">Nombre</span>
          <span className="sv-results-identity-value">{name}</span>
        </div>
        <div className="sv-results-identity-sep" />
        <div className="sv-results-identity-row">
          <span className="sv-results-identity-label">Dispositivo</span>
          <span className="sv-results-identity-value">{device}</span>
        </div>
      </div>

      {/* Score visual */}
      <div className="sv-results-score-wrap">
        <div className="sv-results-score-label">Puntuación de apego digital</div>
        <div className="sv-results-score-bar-bg">
          <div className="sv-results-score-bar" style={{ width: `${pct}%` }} />
        </div>
        <div className="sv-results-score-pct">{pct}%</div>
      </div>

      {/* Resumen por pregunta */}
      <div className="sv-results-breakdown">
        {QUESTIONS.map((q, i) => (
          <div key={i} className="sv-results-row">
            <span className="sv-results-row-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="sv-results-row-q">{q}</span>
            <div className="sv-results-row-dots">
              {[1, 2, 3, 4, 5].map((v) => (
                <span
                  key={v}
                  className={`sv-results-dot${answers[i] === v ? ' sv-results-dot-active' : ''}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Acciones */}
      <div className="sv-results-actions">
        <button className="sv-submit" onClick={onReset}>
          Repetir encuesta
        </button>
        <Link to="/" className="sv-results-home-btn">
          Volver al inicio
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ─── Vista principal ───────────────────────────────────────────── */
export default function SurveyView() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState('');
  const [device, setDevice] = useState('');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [archetype, setArchetype] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'ok' | 'error' | null

  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / QUESTIONS.length) * 100);
  const canSubmit = answered === QUESTIONS.length && name.trim() && device.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const arc = calcArchetype(answers);
    setArchetype(arc);
    setSubmitted(true);

    // Guardar en Firestore
    setSaving(true);
    try {
      await saveSurveyResult({
        name: name.trim(),
        device: device.trim(),
        answers,
        archetype: arc.key,
        archetypeName: arc.name,
        score: Object.values(answers).reduce((s, v) => s + v, 0),
      });
      setSaveStatus('ok');
    } catch (err) {
      console.error('Error guardando encuesta:', err);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }

    // Scroll a resultados
    setTimeout(() => {
      document.getElementById('sv-results-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setArchetype(null);
    setName('');
    setDevice('');
    setSaveStatus(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="sv-page">
      <div className="sv-glow sv-glow-1" />
      <div className="sv-glow sv-glow-2" />

      <div className="sv-inner">
        {/* Back */}
        <Link to="/" className="sv-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="sv-header">
          <div className="sv-chip">
            <span className="sv-chip-dot" />
            Compañero Digital
          </div>
          <h1 className="sv-title">
            ¿Qué tipo de relación tienes<br />
            <span className="sv-title-accent">con tu teléfono?</span>
          </h1>
          <p className="sv-subtitle">
            Responde 10 afirmaciones y descubre tu <strong>arquetipo digital</strong>.
            Solo toma 2 minutos.
          </p>
        </div>

        <form className="sv-form" onSubmit={handleSubmit}>
          {/* ── Campos de identidad ── */}
          <div className="sv-identity-card">
            <h3 className="sv-identity-title">Antes de empezar…</h3>
            <div className="sv-identity-fields">
              <div className="sv-field">
                <label className="sv-field-label" htmlFor="sv-name">Tu nombre</label>
                <input
                  id="sv-name"
                  type="text"
                  className="sv-field-input"
                  placeholder="Ej: María García"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                />
              </div>
              <div className="sv-field">
                <label className="sv-field-label" htmlFor="sv-device">Tu dispositivo</label>
                <input
                  id="sv-device"
                  type="text"
                  className="sv-field-input"
                  placeholder="Ej: Samsung Galaxy S21"
                  value={device}
                  onChange={(e) => setDevice(e.target.value)}
                  maxLength={80}
                />
              </div>
            </div>
          </div>

          {/* ── Barra de progreso ── */}
          <div className="sv-progress-section">
            <div className="sv-progress-wrap">
              <div className="sv-progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <p className="sv-progress-label">{answered} de {QUESTIONS.length} respondidas</p>
          </div>

          {/* ── Preguntas ── */}
          {QUESTIONS.map((q, i) => (
            <SurveyQuestion
              key={i}
              index={i}
              question={q}
              selected={answers[i]}
              onSelect={(val) => setAnswers(prev => ({ ...prev, [i]: val }))}
            />
          ))}

          {/* ── Submit ── */}
          <div className="sv-footer">
            {!canSubmit && (
              <p className="sv-footer-note">
                {!name.trim() || !device.trim()
                  ? 'Completa tu nombre y dispositivo para continuar'
                  : `Faltan ${QUESTIONS.length - answered} preguntas por responder`}
              </p>
            )}
            <button type="submit" className="sv-submit" disabled={!canSubmit || saving}>
              {saving ? 'Guardando…' : 'Ver mi arquetipo'}
              {!saving && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        </form>

        {/* ── Resultados ── */}
        {submitted && archetype && (
          <>
            <div id="sv-results-anchor" />
            {saveStatus === 'ok' && (
              <div className="sv-save-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                Resultados guardados en la base de datos
              </div>
            )}
            {saveStatus === 'error' && (
              <div className="sv-save-badge sv-save-badge-error">
                No se pudieron guardar los resultados — revisa tu conexión
              </div>
            )}
            <SurveyResults
              name={name}
              device={device}
              answers={answers}
              archetype={archetype}
              onReset={handleReset}
            />
          </>
        )}
      </div>
    </div>
  );
}
