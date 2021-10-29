import React, { useEffect, useRef } from 'react'
import {getReplayConsolePlugin} from 'rrweb';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

interface RRWebPlayerProps {
  events: any[]
}

const RRWebPlayer: React.FC<RRWebPlayerProps> = ({events}) => {
  const ref = useRef<any>();

  useEffect(() => {
    if(ref.current) {
      new rrwebPlayer({
        target: ref.current, // customizable root element
        props: {
          events,
          plugins: [
            getReplayConsolePlugin({
                level: ['info', 'log', 'warn', 'error'],
              }),
            ],
        },
      });
    }
  }, [ref.current, events])

  return (
    <div style={{height: 656}} ref={ref}></div>
  )
}

export default RRWebPlayer
