import * as React from "react";
import './svgIconChevron.css';

// [[asau53]]

export class Asau53Colors {
  /**
   * цвет в нормальном состоянии
   */
  public normal: string = 'black'
  /**
   * цвет при наведении
   */
  public hover: string = 'red'
  /**
   * цвет в состоянии disabled родителя
   */
  public disable: string = 'silver'
  /**
   * цвет при нажатии
   */
  public click: string = 'silver'
}

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
  colors?: Asau53Colors,
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
const SvgIconChevron = ({
                          svgProps,
                          colors = new Asau53Colors(),
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
      viewBox={`0 0 ${cfg.w} ${cfg.h}`}
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
      <polyline fill="none" stroke-width="2" points="9 6 15 12 9 18"
                transform={`rotate(${angle}, ${cfg.w / 2}, ${cfg.h / 2})`}/>
    </svg>
  );
};

export default SvgIconChevron;
