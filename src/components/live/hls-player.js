import { useEffect, useRef } from "react";
import Hls from "hls.js";
import styled from "styled-components";
import { useDrag } from "react-dnd";


const StyledVideo = styled.video`
  width: ${({ width }) => width || "100%"};
  height: "100%";
  cursor: pointer;
  object-fit: contain;
  &:hover ~ div {
    display: flex;
  }
`;

const HlsPlayer = ({ playerRef, playingSrc, posterSrc }) => {
  const hlsRef = useRef(null);
  useEffect(() => {
    let hls;
    const _initPlayer = () => {
      if (hls) {
        hls.destroy();
      }
      hls = new Hls({
        enableWorker: true,
        startLevel: -1,
      });

      if (playerRef.current) {
        hls.attachMedia(playerRef.current);
      }

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(playingSrc);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // setHlsInstance logic
        });
        hls.on(Hls.Events.FRAG_PARSING_METADATA, (_event, data) => {
          console.log("Data", { _event, data });
        });
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              _initPlayer();
              break;
          }
        }
      });

      hlsRef.current = hls;
    };

    if (Hls.isSupported()) {
      _initPlayer();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [playingSrc, playerRef]);

  return (
    <>
      <StyledVideo ref={playerRef} src={playingSrc} autoPlay={true} poster={posterSrc}/>
    </>
  );
};

export default HlsPlayer;
