import { useEffect, useRef } from 'react';

function StreamVideo({ stream, muted = true }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.srcObject !== stream) el.srcObject = stream;
    el.play?.().catch(() => {});
  }, [stream]);
  return <video ref={ref} autoPlay muted={muted} playsInline />;
}

export function VideoStage({ video, selfName = 'Tú', cfg, screenStream, onStopShare }) {
  const { shape = 'rounded', mirror = true, showNames = true } = cfg || {};
  const mainRef = useRef(null);

  const remoteNames = video?.remoteNames || [];
  const devices = video?.devices || [];
  const isOn = video?.on || false;
  const sharing = !!screenStream;

  if (!isOn && remoteNames.length === 0 && !sharing) return null;

  const hasTiles = !!video?.stream || remoteNames.length > 0;

  const toggleFullscreen = () => {
    const el = mainRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  return (
    <section
      className="video-stage"
      data-sharing={String(sharing)}
      data-shape={shape}
      data-mirror={String(mirror)}
    >
      {/* Escenario principal: la pantalla compartida */}
      {sharing && (
        <div className="screen-main" ref={mainRef}>
          <StreamVideo stream={screenStream} />
          <span className="screen-main__live">● EN VIVO</span>
          <div className="screen-main__bar">
            <span className="screen-main__title">{selfName} está compartiendo su pantalla</span>
            <div className="screen-main__actions">
              <button className="screen-main__btn" onClick={toggleFullscreen} title="Pantalla completa">⛶</button>
              {onStopShare && (
                <button className="screen-main__btn screen-main__btn--stop" onClick={onStopShare}>
                  Dejar de compartir
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tira de participantes */}
      {hasTiles && (
        <div className="video-strip">
          {isOn && devices.length > 1 && (
            <select
              className="video-stage__camera"
              value={video.selectedId}
              onChange={(e) => video.changeDevice(e.target.value)}
              title="Elegir cámara"
            >
              {devices.map((d, i) => (
                <option key={d.deviceId || i} value={d.deviceId}>
                  {d.label || `Cámara ${i + 1}`}
                </option>
              ))}
            </select>
          )}

          {video?.stream && (
            <div className="video-tile video-tile--self">
              <StreamVideo stream={video.stream} />
              {showNames && <span className="video-tile__name">{selfName}</span>}
            </div>
          )}

          {remoteNames.map((name) => (
            <div className="video-tile" key={name}>
              <img ref={(el) => video.bindRemote(name, el)} alt={name} />
              {showNames && <span className="video-tile__name">{name}</span>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}