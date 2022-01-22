import * as React from "react";
import './svgIconChevron.css';

export class Colors {
  public normal: string = 'black'
  public hover: string = 'red'
  public disable: string = 'silver'
  public click: string = 'silver'
}

export interface Props {
  svgProps?: any,
  colors?: Colors,
  // угол поворота: 180 - смотрит влево, 0 - вправо
  angle?: number,
}

const SvgIconChevron = ({svgProps, colors = new Colors(), angle = 180}: Props) => {

  return (
    <svg
      className="cls220120165800"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <defs>
        <style>{`
          .cls220120165800 {
              --colorNormal: ${colors?.normal};
              --colorHover: ${colors?.hover};
              --colorDisable: ${colors?.disable};
              --colorClick: ${colors?.click};
          }
          
          .cls220120165800 {
              fill: var(--colorNormal);
              stroke: var(--colorNormal);
              
              animation-name: anim_disable_1406;
              animation-duration: 500ms;
              animation-timing-function: ease;
              animation-iteration-count: infinite;
              animation-direction: alternate;
              animation-play-state: paused;
          }
          
          *:hover:not(:disabled) > .cls220120165800 {
              fill: var(--colorHover);
              stroke: var(--colorHover);
              
              animation-name: anim_hover_1404;
              animation-duration: 100ms;
              animation-fill-mode: forwards;
              animation-iteration-count: 1;
              animation-play-state: running;
          }
          
          *:disabled > .cls220120165800 {
              fill: var(--colorDiasable);
              stroke: var(--colorDisable);
              
              animation-play-state: running;
          }
          
          *:active > .cls220120165800 {
              fill: var(--colorClick);
              stroke: var(--colorClick);
          }
          
          @keyframes anim_disable_1406 {
            0% {
                fill: var(--colorNormal);
                stroke: var(--colorNormal);
            }
            100% {
                fill: var(--colorDisable);
                stroke: var(--colorDisable);
            }
          }
          
          @keyframes anim_hover_1404 {
            0% {
              fill: var(--colorNormal);
              stroke: var(--colorNormal);
            }
            100% {
              fill: var(--colorHover);
              stroke: var(--colorHover);
            }
          }
        `}</style>
      </defs>
      <polyline className="cls1333poliline" fill="none" stroke-width="2" points="9 6 15 12 9 18" transform={`rotate(${angle}, 12, 12)`}/>
    </svg>
  );
};

export default SvgIconChevron;
