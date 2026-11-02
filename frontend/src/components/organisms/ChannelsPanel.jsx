import { Icon } from '../atoms';
import { STATUS } from '../../hooks/useP2P';

function ChannelIcon({ icono }) {
  if (icono && icono.startsWith('data:image')) {
    return <img className="channel-row__img" src={icono} alt="" />;
  }
  return <span className="channel-row__emoji">{icono || '🐙'}</span>;
}

export function ChannelsPanel({ channels, currentCode, onSwitch, onConnect, status, query = '' }) {
  const q = query.trim().toLowerCase();
  const list = (channels || []).filter(
    (c) => !q || `${c.nombre} ${c.subtitulo} ${c.codigo}`.toLowerCase().includes(q)
  );

  // El botón de conectar está disponible siempre que no estemos conectando
  const canConnect = status !== STATUS.CONNECTING;

  return (
    <section className="panel channels-panel">
      <h3 className="section-title">Canales</h3>
      {list.length === 0 ? (
        <p className="channels-panel__empty">
          {q ? 'Sin coincidencias.' : 'Aún no hay canales guardados.'}
        </p>
      ) : (
        <ul className="channels-panel__list">
          {list.map((c) => {
            const isCurrent = c.codigo === currentCode;
            return (
              <li key={c.codigo} className={`channel-row ${isCurrent ? 'channel-row--current' : ''}`}>
                <button
                  className="channel-row__main"
                  onClick={() => onSwitch(c.codigo)}
                  title={`Cambiar a este canal (${c.codigo})`}
                >
                  <span className="channel-row__icon">
                    <ChannelIcon icono={c.icono} />
                  </span>
                  <span className="channel-row__text">
                    <span className="channel-row__name">{c.nombre}</span>
                    {c.subtitulo && <span className="channel-row__sub">{c.subtitulo}</span>}
                  </span>
                </button>
                {canConnect && !isCurrent && (
                  <button
                    className="channel-row__connect"
                    onClick={() => onConnect(c.codigo)}
                    title={`Conectarse a ${c.codigo}`}
                    aria-label={`Conectarse a ${c.nombre}`}
                  >
                    <Icon name="play" size={12} />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}