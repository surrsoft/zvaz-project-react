import * as React from "react";
import './svgIconChevron.css';

export class Colors {
  constructor(
    public normal: string = 'black',
    public hover: string = 'red',
    public disable: string = 'silver',
    public click: string = '#7cfd73'
  ) {
  }
}

export interface Props {
  svgProps?: any,
  colors?: Colors
}

const SvgIconChevron = ({svgProps, colors = new Colors()}: Props) => {
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
              --colorDiasable: ${colors?.disable};
              --colorClick: ${colors?.click};
          }
          
          .cls220120165800 {
              fill: var(--colorNormal);
              stroke: var(--colorNormal);
          }
          
          *:hover > .cls220120165800, .cls220120165800:hover {
              fill: var(--colorHover);
              stroke: var(--colorHover);
          }
          
          *:disabled > .cls220120165800 {
              fill: var(--colorDiasable);
              stroke: var(--colorDiasable);
          }
          
          *:active > .cls220120165800 {
              fill: var(--colorClick);
              stroke: var(--colorClick);
          }
        `}</style>
      </defs>
      {/*<polyline fill="none" stroke-width="2" points="9 6 15 12 9 18" transform="matrix(-1 0 0 1 24 0)"/>*/}
      <polyline fill="none" stroke-width="2" points="9 6 15 12 9 18" transform="rotate(0)" />
    </svg>
  );
};

export default SvgIconChevron;
