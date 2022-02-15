import './notionPageStyles.scss';
import { useState } from 'react';
import { Client } from '@notionhq/client';
import { BaseCell, BaseTuple, EnValueTypeNotion, HoggConnectorNotion, HoggOffsetCount, tupleToObject } from 'hogg-lib';

const notion = new Client({auth: process.env.REACT_APP_NOTION_TOKEN});

const hoggNotion = new HoggConnectorNotion()
hoggNotion.init({token: process.env.REACT_APP_NOTION_TOKEN || ''})

export default function NotionPage() {
  const [$dbId, $dbIdSet] = useState('5bda5482e2e14df388784831369e2ca9');

  function dbIdChange(ev: any) {
    $dbIdSet(ev?.target?.value)
  }

  async function updateOne(dbId: string, id: string, val: number) {
    const tuples = []
    // ---
    const cellId = new BaseCell().create('tid', id)
    const cell1 = new BaseCell().createAtNotion('random', val, EnValueTypeNotion.NUMBER)
    const tuple = new BaseTuple().create([cellId, cell1])
    tuples.push(tuple)
    // ---
    return hoggNotion
      .db(dbId)
      .update(tuples)
  }

  async function sendHandle() {
    const token = process.env.REACT_APP_NOTION_TOKEN
    console.log('!!-!!-!! token {220213120323}\n', token) // del+

    // ---
    const result = await hoggNotion.db($dbId).query(new HoggOffsetCount(true));
    const tids = result.map(tuple => {
      const obj: any = tupleToObject(tuple)
      return obj.tid
    })
    console.log('!!-!!-!! tids.length {220214215826}\n', tids.length) // del+
    const promises = tids.map(id => updateOne($dbId, id, 22))
    await Promise.all(promises)
    console.log(`!!-!!-!! -> :::::::::::::: DONE {220214220152}:${Date.now()}`) // del+

    // ---
    // const response = await notion.databases.query({
    //   database_id: $dbId,
    // });
    // console.log(response);

    // --- fetch
    // const options: RequestInit = {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Notion-Version': '2021-08-16',
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    //   // mode: 'no-cors',
    //   body: JSON.stringify({page_size: 100})
    // };
    //
    // fetch(`https://api.notion.com/v1/databases/${$dbId}/query`, options)
    //   .then(response => response.json())
    //   .then(response => console.log(response))
    //   .catch(err => {
    //     console.log('!!-!!-!! err {220214165601}\n', err) // del+
    //   });

    // --- axios
    // const options = {
    //   method: 'POST',
    //   url: 'https://api.notion.com/v1/databases/database_id/query',
    //   headers: {
    //     Accept: 'application/json',
    //     'Notion-Version': '2021-08-16',
    //     'Content-Type': 'application/json'
    //   },
    //   data: {page_size: 100}
    // };
    //
    // axios.request(options).then(function (response) {
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });
  }

  return (<div className="notion-con">
    <div className="pair">
      <label>db id</label>
      <input value={$dbId} onChange={dbIdChange}/>
    </div>
    <button className="btn" onClick={sendHandle}>send</button>
  </div>)
}
