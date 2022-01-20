import * as React from "react";
import './styles.css';

const SVGComponent = (props: any) => (
  <>
    <svg width="600px" height="600px" viewBox="-300 -300 600 600"
         xmlns="http://www.w3.org/2000/svg">

      <title>SVG demonstration</title>
      <desc>Mozilla CSS Getting Started - SVG demonstration</desc>

      <defs>
        <radialGradient id="fade" cx="0" cy="0" r="200"
                        gradientUnits="userSpaceOnUse">
          <stop id="fade-stop-1" offset="33%"/>
          <stop id="fade-stop-2" offset="95%"/>
        </radialGradient>
      </defs>

      <text id="heading" x="-280" y="-270">SVG demonstration</text>
      <text id="caption" x="-280" y="-250">Move your mouse pointer over the flower.</text>

      <g id="flower">
        <circle id="overlay" cx="0" cy="0" r="200" stroke="none" fill="url(#fade)"/>

        <g id="outer-petals">
          <g className="quadrant">
            <g className="segment">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(18)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(36)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(54)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(72)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
          </g>

          <g className="quadrant">
            <g className="segment" transform="rotate(90)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(108)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(126)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(144)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(162)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
          </g>

          <g className="quadrant">
            <g className="segment" transform="rotate(180)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(198)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(216)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(234)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(252)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
          </g>

          <g className="quadrant">
            <g className="segment" transform="rotate(270)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(288)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(306)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(324)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(342)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
          </g>
        </g>

        <g id="inner-petals" transform="rotate(9) scale(0.33)">
          <g className="quadrant">
            <g className="segment">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(18)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(36)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(54)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(72)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
          </g>

          <g className="quadrant">
            <g className="segment" transform="rotate(90)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(108)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(126)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(144)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(162)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
          </g>

          <g className="quadrant">
            <g className="segment" transform="rotate(180)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(198)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(216)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(234)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(252)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
          </g>

          <g className="quadrant">
            <g className="segment" transform="rotate(270)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(288)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(306)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(324)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
            <g className="segment" transform="rotate(342)">
              <path className="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z"/>
              <path className="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10"/>
            </g>
          </g>
        </g>
      </g>
    </svg>

  </>
);

export default SVGComponent;
