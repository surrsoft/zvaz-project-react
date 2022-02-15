import './multilevelMenuPageStyles.scss';
import SaucMLMenuFCC, { SaucMenuElem } from '../../utils/SaucMLMenu/SaucMLMenuFCC';
import { ReactComponent as IconBell } from '../../utils/SaucMLMenu/icons/bell.svg';
import { ReactComponent as IconCaret } from '../../utils/SaucMLMenu/icons/caret.svg';

export default function MultilevelMenuPage() {
  const menuElemsSTA: SaucMenuElem[] = [
    {
      id: 'auto',
      body: (<div>Автомобили</div>),
      cb: (el) => {
        console.log('!!-!!-!! el {220215131411}\n', el) // del+
      },
      icon: (<IconBell/>),
      children: [
        {
          id: 'su',
          body: (<div>Отечественные</div>),
          cb: (el) => {
            console.log('!!-!!-!! el {220215131940}\n', el) // del+
          }
        },
        {
          id: 'in',
          body: (<div>Иномарки</div>),
          children: [
            {
              id: 'Mazda', body: (<div>Mazda</div>), cb: (el) => {
                console.log('!!-!!-!! el {220215155830}\n', el) // del+
              }
            },
            {
              id: 'Honda', body: (<div>Honda</div>), cb: (el) => {
                console.log('!!-!!-!! el {220215155831}\n', el) // del+
              }
            }
          ],

        }
      ]
    },
    {
      id: 'estate',
      body: (<div>Недвижимость</div>),
      cb: (el) => {
        console.log('!!-!!-!! el {220215131412}\n', el) // del+
      }
    }
  ]

  return (<div>
    <SaucMLMenuFCC menuElems={menuElemsSTA}>
      <IconCaret className="a-icon"/>
    </SaucMLMenuFCC>
  </div>)
}
