import { PropsWithChildren } from 'react';

export default function CompT(props: PropsWithChildren<{}>) {
  return (<div className="comp-t">
    {props.children}
  </div>)
}
