import { FieldNT } from '../../blogic/misc';
import './styles.scss';

interface Props {
  field: FieldNT
}

export default function FieldTypeUI(props: Props) {
  return <>
    <div className={'con1'}>{props.field.nameVisual}</div>
  </>
}
