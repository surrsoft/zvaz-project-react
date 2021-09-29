import './style.scss';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableWrapper from '../../components/drag_and_drop/DroppableWrapper';
import { FieldNT, Fields } from '../../blogic/misc';
import DraggableItemWrapper from '../../components/drag_and_drop/DraggableItemWrapper';
import FieldTypeUI from '../../components/FieldTypeUI';
import { stdArrElemMove } from '../../components/simple/utils';
import React, { useEffect, useState } from 'react';
import SmGapH from '../../components/simple/SmGapH';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, DeleteIcon, RepeatIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { telemsReceiveThunk } from '../../store/store';

enum DND_ID {
  D1 = 'd1',
  D2 = 'd2'
}

function fnFieldUI(field: FieldNT) {
  return <div className={'op_elem'}>
    <div>{field.nameVisual}</div>
    {Fields.inputByField(field)}
  </div>;
}

const BElems = () => {
  return (<div className={'belems-container'}>
    <DroppableWrapper droppableId={DND_ID.D1}>
      {
        Fields.values().map((field, index) => {
          return <DraggableItemWrapper key={index} draggableId={`${DND_ID.D1}-${index}`} index={index}>
            <FieldTypeUI field={field}/>
          </DraggableItemWrapper>
        })
      }
    </DroppableWrapper>
  </div>)
}
const TElemConstructor: React.FC<any> = ({selFields}) => {
  const telemCurrent = useSelector(state => _.get(state, 'telemsSlice.telemCurrent', null))

  const createHandle = () => {
    if (telemCurrent) {

    }
  }

  return (<div className={'telem-container'}>

    <div className={'buttons'}>
      <Tooltip placement={'top'} label={'Создать'}>
        <IconButton aria-label="Create" icon={<CheckIcon/>} colorScheme={'blue'} onClick={createHandle}/>
      </Tooltip>
      <Tooltip placement={'top'} label={'Обновить'}>
        <IconButton aria-label="Update" icon={<RepeatIcon/>} colorScheme={'green'}/>
      </Tooltip>
      <Tooltip placement={'top'} label={'Удалить'}>
        <IconButton aria-label="Remove" icon={<DeleteIcon/>} colorScheme={'red'}/>
      </Tooltip>
      <Tooltip placement={'top'} label={'Очистить'}>
        <IconButton aria-label="Clear" icon={<CloseIcon/>}/>
      </Tooltip>
    </div>

    <SmGapH h={24}/>

    <DroppableWrapper droppableId={DND_ID.D2}>
      <input className={'titleInput'} type={'text'} placeholder={'название'} required={true}/>
      <SmGapH h={16}/>
      {
        selFields.map((field: any, index: any) => {
          return <DraggableItemWrapper
            key={index0++}
            draggableId={`${DND_ID.D2}-${index}`}
            index={index}
            className={'op_draggable'}
          >
            {
              fnFieldUI(field)
            }
          </DraggableItemWrapper>
        })
      }
    </DroppableWrapper>
  </div>)
}
const TElems = () => {
  return (<div className={'telems-container'}>telems</div>)
}

let index0 = 0;

export function Learn02() {
  const dispatch = useDispatch()
  const [selFields, selFieldsSet] = useState([] as FieldNT[]);

  useEffect(() => {
    console.log(`!!-!!-!! -> :::::::::::::: dispatch () {210928200024}:${Date.now()}`); // del+
    dispatch(telemsReceiveThunk())
  }, []);

  const onDragEndHandler = (result: any) => {
    console.log(`!!-!!-!! -> :::::::::::::: onDragEnd() {210423113201}:${Date.now()}`); // del+
    const {destination, source, draggableId} = result;
    console.log('!!-!!-!! 1212-10 destination {210423121200}\n', destination); // del+
    console.log('!!-!!-!! 1212-20 source {210423121214}\n', source); // del+
    console.log('!!-!!-!! 1212-30 draggableId {210423121227}\n', draggableId); // del+

    if (!destination) {
      return
    }

    const sIndex = source.index;
    const dIndex = destination.index;
    const sDid = source.droppableId
    const dDid = destination.droppableId

    const sField = Fields.values()[sIndex]

    if (sDid !== dDid) {
      if (dDid === DND_ID.D2) {
        selFields.splice(dIndex, 0, sField)
        selFieldsSet([...selFields])
      }
    } else if (dDid === DND_ID.D2) {
      const arr0 = [...selFields]
      stdArrElemMove(arr0, sIndex, dIndex)
      selFieldsSet(arr0)
    }

  }

  return (<div className={'zvaz-telems-page'}>
    <DragDropContext onDragEnd={onDragEndHandler}>
      <BElems/>
      <TElemConstructor selFields={selFields}/>
      <TElems/>
    </DragDropContext>
  </div>)
}
