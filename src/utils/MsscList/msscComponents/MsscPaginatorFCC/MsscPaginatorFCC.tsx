import React  from 'react';
import SvgIconChevron from '../../commonIcons/SvgIconChevron/SvgIconChevron';
import SvgIconChevronDouble from '../../commonIcons/SvgIconChevronDouble/SvgIconChevronDouble';

export interface MsscPaginatorProps {
  pageCurrNum?: number
  pageAllCountNum?: number
  disabled?: boolean
  cbChange?: (nextPageNum: number) => void
}

export default function MsscPaginatorFCC({
                                           pageCurrNum = 1,
                                           pageAllCountNum = 1,
                                           cbChange,
                                           disabled = false
                                         }: MsscPaginatorProps) {
  const paginationHandler = {
    handle: (toLimit = false, isUp = false) => async () => {
      if (cbChange) {
        let nextPage: number = 0;
        if (isUp) {
          if (pageCurrNum < pageAllCountNum) {
            nextPage = toLimit ? pageAllCountNum : pageCurrNum + 1;
          }
        } else {
          if (pageCurrNum > 1) {
            nextPage = toLimit ? 1 : pageCurrNum - 1
          }
        }
        if (nextPage > 0) {
          cbChange?.(nextPage)
        }
      }
    },
  }

  return (
    <div className="mssc-paginator">

      <button
        className="mssc-paginator__btn-m-step"
        disabled={disabled}
        onClick={paginationHandler.handle(true, false)}
      >
        <SvgIconChevronDouble
          svgProps={{width: "14px", height: "14px"}}
          angle={180}
          animate={{enabled: true, durationMillisec: 600}}
        />
      </button>

      <button
        className="mssc-paginator__btn-one-step"
        disabled={disabled}
        onClick={paginationHandler.handle(false, false)}
      >
        <SvgIconChevron
          svgProps={{width: "20px", height: "20px"}}
          angle={180}
          animate={{enabled: true, durationMillisec: 600}}
        />
      </button>
      {/*  */}
      <div className="mssc-paginator__text">{pageCurrNum} / {pageAllCountNum}</div>
      {/*  */}
      <button
        className="mssc-paginator__btn-one-step"
        disabled={disabled}
        onClick={paginationHandler.handle(false, true)}
      >
        <SvgIconChevron
          svgProps={{width: "20px", height: "20px"}}
          angle={0}
          animate={{enabled: true, durationMillisec: 600}}
        />
      </button>

      <button
        className="mssc-paginator__btn-m-step"
        disabled={disabled}
        onClick={paginationHandler.handle(true, true)}
      >
        <SvgIconChevronDouble
          svgProps={{width: "14px", height: "14px"}}
          angle={0}
          animate={{enabled: true, durationMillisec: 600}}
        />
      </button>

    </div>
  )
}
