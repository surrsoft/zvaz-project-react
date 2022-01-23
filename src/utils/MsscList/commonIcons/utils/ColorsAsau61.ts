/**
 * Представляет 4 цвета для кнопок и т.п.
 * id [[asau61]]
 */
export class ColorsAsau61 {
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

  buNormal(color: string): ColorsAsau61 {
    this.normal = color;
    return this;
  }

  buHover(color: string): ColorsAsau61 {
    this.hover = color;
    return this;
  }

  buDisabled(color: string): ColorsAsau61 {
    this.disable = color;
    return this;
  }

  buClick(color: string): ColorsAsau61 {
    this.click = color;
    return this;
  }

  /**
   * Создаёт типой CSS код для цветов (2) с именем CSS класса (1)
   * @param cssClassName (1) --
   * @param colors (2) --
   */
  static cssCreate(cssClassName: string, colors: ColorsAsau61) {
    if (!cssClassName || cssClassName.length < 1 || !colors) {
      return ''
    }
    return `
      .${cssClassName} {
        stroke: ${colors.normal};
        fill: ${colors.normal};
      }
      *:hover:not(:disabled):not(:active) > .${cssClassName} {
        stroke: ${colors.hover};
        fill: ${colors.hover};
      }
      *:disabled > .${cssClassName} {
        stroke: ${colors.disable};
        fill: ${colors.disable};
      }
      *:active > .${cssClassName} {
        stroke: ${colors.click};
        fill: ${colors.click};
      }
    `
  }
}
