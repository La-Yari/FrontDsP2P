/**
 * Zona de videollamada (arriba del chat).
 * El aspecto sale de los atributos data-* (layout.json del mod)
 * y del video.css del mod: clases .video-stage, .video-tile, .video-tile--self,
 * .video-tile__name, .video-stage__camera
 */
export function VideoStage({ video, selfName = 'Tú', cfg }) {
  const { mode = 'grid', shape = 'rounded', mirror = true, showNames = true } = cfg || {};
  const tiles = Object.entries(video.remote);

  // Sin cámara propia ni video de otros: no ocupa espacio
  if (!video.on && tiles.length === 0) return null;

  return (
    <section className="video-stage" data-mode={mode} data-shape={shape} data-mirror={String(mirror)}>
      {/* Selector de cámara: solo si hay más de una */}
      {video.on && video.devices.length > 1 && (
        <select
          className="video-stage__camera"
          value={video.selectedId}
          onChange={(e) => video.changeDevice(e.target.value)}
          title="Elegir cámara"
        >
          {video.devices.map((d, i) => (
            <option key={d.deviceId || i} value={d.deviceId}>
              {d.label || `Cámara ${i + 1}`}
            </option>
          ))}
        </select>
      )}
      {video.stream && (
        <div className="video-tile video-tile--self">
          <video
            autoPlay
            muted
            playsInline
            ref={(el) => {
              if (el && el.srcObject !== video.stream) el.srcObject = video.stream;
            }}
          />
          {showNames && <span className="video-tile__name">{selfName}</span>}
        </div>
      )}
      {tiles.map(([name, frame]) => (
        <div className="video-tile" key={name}>
          <img src={frame.src} alt={name} />
          {showNames && <span className="video-tile__name">{name}</span>}
        </div>
      ))}
    </section>
  );
}