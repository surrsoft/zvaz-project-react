import React, { ReactNode, useEffect, useState } from 'react';
import './styles.scss';
import { MsscSource } from '../MsscSource';
import { RsuvTxNumIntAB, RsuvTxNumIntDiap } from 'rsuv-lib';
import { MsscElem } from '../MsscElem';
import { HoggConnectorAirtable } from 'hogg-lib';

interface MsscListProps {
  source: MsscSource<any> | null
}


const MsscList = ({source}: MsscListProps): JSX.Element => {
  const elemsOnPage = 10;
  const [$pageNumCurrent, $pageNumCurrentSet] = useState(1);
  const [$elems, $elemsSet] = useState<MsscElem[]>([]);
  const [$elemsCountAll, $elemsCountAllSet] = useState(0);

  useEffect(() => {
    if (source) {
      (async () => {
        const elemsCountResult: RsuvTxNumIntAB = await source.elemsCountByFilter([])
        const elemsCountAll = elemsCountResult.val
        const elemsResult: MsscElem[] = await source.elems(new RsuvTxNumIntDiap(new RsuvTxNumIntAB(0), new RsuvTxNumIntAB(2)), [], [])
        $elemsSet(elemsResult)
        $elemsCountAllSet(elemsCountAll)
      })();
    }
  }, []);

  return (<div>
    <div>MsscList</div>

  </div>)
}

export default MsscList;
