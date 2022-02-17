import React, { PropsWithChildren, useContext, useState } from 'react';

export enum AB {
  A = 'a',
  B = 'b',
}

const values = {
  a: 0,
  b: 0,
  increment: (symb: AB) => {
  }
}

export const ValuesContext = React.createContext(values)

function CompR(props: any) {
  const {a, b} = useContext(ValuesContext)
  return (
    <div>
      <div>CompAB</div>
      <div>A + B: {a + b}</div>
      <div>{props.children}</div>
    </div>
  )
}

export default function CompAB(props: PropsWithChildren<{}>) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const value = {
    a,
    b,
    increment: (symb: AB) => {
      if (symb === AB.A) {
        setA(a + 1);
      } else {
        setB(b + 1)
      }
    }
  };

  return (
    <ValuesContext.Provider value={value}>
      <CompR>{props.children}</CompR>
    </ValuesContext.Provider>
  )
}
