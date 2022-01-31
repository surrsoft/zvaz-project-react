import * as React from "react";
import { ColorsAsau61 } from '../utils/ColorsAsau61';

// [[asau53]]


export class Asau53Animate {
  /**
   * если true то будет проигрываться анимация (см. [xx1])
   */
  enabled?: boolean = false
  /**
   * длительность проигрывания анимации (500 ms по умолчанию)
   */
  durationMillisec?: number
}

export interface Asau53SvgProps {
  /**
   * указнные здесь пропсы будут переопределять/добавляться к корневому svg
   */
  svgProps?: any,
  /**
   * цвета для состояний
   */
  colors?: ColorsAsau61,
  /**
   * угол поворота: 180 - смотрит влево, 0 - вправо
   */
  angle?: number,
  /**
   * [[xx1]] если {enabled: true, ...} то в состоянии 'disabled' будет проигрываться анимация меняющая цвет с normal к
   * disable и обратно
   */
  animate?: Asau53Animate,
  /**
   * текст который будет добавлен к идентификаторам CSS; может быть полезно для идентификации отдельных экземпляров
   */
  identId?: string
}

/**
 *
 * @param svgProps {Asau53SvgProps}
 * @param colors
 * @param angle
 * @param animate
 * @param identId
 * @constructor
 */
const SvgIconChevronDouble = ({
                                svgProps,
                                colors = new ColorsAsau61(),
                                angle = 180,
                                animate,
                                identId = ''
                              }: Asau53SvgProps) => {

  // ---
  let anim1 = '', anim2 = '', anim3 = '', anim4 = ';'

  if (animate && animate.enabled) {
    anim1 = `
      animation-name: asau53_anim_disable${identId};
      animation-duration: ${animate.durationMillisec || 500}ms;
      animation-timing-function: ease;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-play-state: paused;
    `;

    anim2 = `
      animation-name: asau_53_anim_hover${identId};
      animation-duration: 100ms;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
      animation-play-state: running;
    `;

    anim3 = 'animation-play-state: running;';

    anim4 = `
      @keyframes asau53_anim_disable${identId} {
        0% {
            fill: var(--colorNormal);
            stroke: var(--colorNormal);
        }
        100% {
            fill: var(--colorDisable);
            stroke: var(--colorDisable);
        }
      }
      
      @keyframes asau_53_anim_hover${identId} {
        0% {
          fill: var(--colorNormal);
          stroke: var(--colorNormal);
        }
        100% {
          fill: var(--colorHover);
          stroke: var(--colorHover);
        }
      }
    `;
  }

  // ---

  const cfg = {
    w: 24,
    h: 24
  }

  return (
    <svg
      className={`asau53_svg${identId}`}
      width={`${cfg.w}px`}
      height={`${cfg.h}px`}
      viewBox={`0 0 16 16`}
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <defs>
        <style>{`
          .asau53_svg${identId} {
              --colorNormal: ${colors?.normal};
              --colorHover: ${colors?.hover};
              --colorDisable: ${colors?.disable};
              --colorClick: ${colors?.click};
          }
          
          .asau53_svg${identId} {
              fill: var(--colorNormal);
              stroke: var(--colorNormal);
              
              ${anim1}
          }
          
          *:hover:not(:disabled) > .asau53_svg${identId} {
              fill: var(--colorHover);
              stroke: var(--colorHover);
              
              ${anim2}
          }
          
          *:disabled > .asau53_svg${identId} {
              fill: var(--colorDiasable);
              stroke: var(--colorDisable);
              
              ${anim3}
          }
          
          *:active > .asau53_svg${identId} {
              fill: var(--colorClick);
              stroke: var(--colorClick); 
          }
          
          ${anim4}
        `}</style>
      </defs>
      <g transform={`rotate(${angle}, ${16 / 2}, ${16 / 2})`} strokeWidth={0.5} fill="none" >
        <path
          d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
        <path
          d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
      </g>
    </svg>
  );
};

export default SvgIconChevronDouble;
