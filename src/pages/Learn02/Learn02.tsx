import './style.scss';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableWrapper from '../../components/drag_and_drop/DroppableWrapper';
import { FieldNT, Fields } from '../../blogic/misc';
import DraggableItemWrapper from '../../components/drag_and_drop/DraggableItemWrapper';
import FieldTypeUI from '../../components/FieldTypeUI';
import { stdArrElemMove } from '../../components/simple/utils';
import React, { useEffect, useState } from 'react';
import SmGapH from '../../components/simple/SmGapH';
import {
  Button,
  Container,
  IconButton,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
  ModalOverlay,
  Stack,
  Tooltip,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, DeleteIcon, RepeatIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  telemsAllSelector,
  telemsTelemCreateThunk,
  telemsReceiveThunk,
  telemsTelemUpdateThunk, telemsTelemDeleteThunk
} from '../../store/telemsSlice/telemsSlice';
import { metaReceiveThunk } from '../../store/metaSlice/metaSlice';
import { telemCurrentUpdate } from '../../store/appSlice/appSlice';

enum DRAGGABLE_ID {
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
    <DroppableWrapper droppableId={DRAGGABLE_ID.D1}>
      {
        Fields.values().map((field, index) => {
          return <DraggableItemWrapper key={index} draggableId={`${DRAGGABLE_ID.D1}-${index}`} index={index}>
            <FieldTypeUI field={field}/>
          </DraggableItemWrapper>
        })
      }
    </DroppableWrapper>
  </div>)
}

function DeleteModal({disabled, handler}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handler0 = () => {
    handler();
    onClose();
  }
  return (
    <>
      <Tooltip placement={'top'} label={'Удалить'}>
        <IconButton aria-label="Remove" icon={<DeleteIcon/>} colorScheme={'red'} onClick={onOpen} disabled={disabled}/>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>удаление</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            удалить один элемент?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              отмена
            </Button>
            <Button variant="ghost" onClick={handler0}>да</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const TElemConstructor: React.FC<any> = ({selFields}) => {
  const telemCurrent = useSelector(state => {
    return _.get(state, 'app.telemCurrent', {})
  })
  console.log('!!-!!-!! TElemConstructor: telemCurrent {211024190736}\n', telemCurrent) // del+

  const dispatch = useDispatch()

  const dis1 = !!telemCurrent.id
  const dis2 = !telemCurrent.id

  const createHandle = () => {
    console.log(`!!-!!-!! -> :::::::::::::: createHandle() {211023132847}:${Date.now()}`) // del+
    dispatch(telemsTelemCreateThunk({...telemCurrent}))
  }

  function updateHandler() {
    dispatch(telemsTelemUpdateThunk({...telemCurrent}))
  }

  function clearHandle() {
    dispatch(telemCurrentUpdate({}))
  }

  function deleteHandle() {
    dispatch(telemsTelemDeleteThunk({id: telemCurrent?.id, dispatch}))
  }


  function inputChangeHandler(ev: any) {
    console.log('!!-!!-!! 0944- ev {211024094422}\n', ev.target.value) // del+
    console.log('!!-!!-!! telemCurrent {211024094930}\n', telemCurrent) // del+
    const title = ev?.target?.value
    const telemCurrentNew = {...telemCurrent, title}
    dispatch(telemCurrentUpdate(telemCurrentNew))
  }

  return (<div className={'telem-container'}>

    <div className={'buttons'}>
      <Tooltip placement={'top'} label={'Создать новый элемент'}>
        <IconButton aria-label="Create" icon={<CheckIcon/>} colorScheme={'blue'} onClick={createHandle} disabled={dis1} />
      </Tooltip>
      <Tooltip placement={'top'} label={'Обновить'}>
        <IconButton aria-label="Update" icon={<RepeatIcon/>} colorScheme={'green'} onClick={updateHandler} disabled={dis2}/>
      </Tooltip>

      <DeleteModal handler={deleteHandle} disabled={dis2} />

      <Tooltip placement={'top'} label={'Очистить'}>
        <IconButton aria-label="Clear" icon={<CloseIcon/>} onClick={clearHandle}/>
      </Tooltip>
    </div>

    <SmGapH h={24}/>

    <DroppableWrapper droppableId={DRAGGABLE_ID.D2}>
      {telemCurrent?.id ? (<div>id: {telemCurrent.id}</div>) : ''}

      <input className={'titleInput'} type={'text'} placeholder={'title'} required={true}
             onChange={inputChangeHandler} value={telemCurrent.title || ''}/>

      <SmGapH h={16}/>

      {
        selFields.map((field: any, index: any) => {
          return <DraggableItemWrapper
            key={index0++}
            draggableId={`${DRAGGABLE_ID.D2}-${index}`}
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

// ---

const TElem = ({telem}: any) => {
  const dispatch = useDispatch()

  const editHandle = () => {
    dispatch(telemCurrentUpdate(telem))
  }

  return (<Container bg={'coral'} borderRadius={'md'} p={2}>
    <div><span>id: </span><span>{telem.id}</span></div>
    <div><span>title: </span><span>{telem.title}</span></div>
    <Button colorScheme={'teal'} variant={'solid'} size={'sm'} onClick={editHandle}>edit</Button>
  </Container>)
}

// ---

const TElems = () => {
  const telems = useSelector((state: any) => {
    // [211024184516]
    return telemsAllSelector(state)
  })

  // ---
  return (<VStack className={'telems-container'}>
    {
      telems.map((telem: any) => (<TElem key={telem.id} telem={telem}/>))
    }
  </VStack>)
}

// ---

let index0 = 0;

export function Learn02() {
  const dispatch = useDispatch()
  const [selFields, selFieldsSet] = useState([] as FieldNT[]);

  const telemCurrent = useSelector(state => {
    return _.get(state, 'app.telemCurrent', {})
  })

  useEffect(() => {
    console.log(`!!-!!-!! L02 -> :::::::::::::: dispatch () {210928200024}:${Date.now()}`); // del+
    dispatch(telemsReceiveThunk())
    dispatch(metaReceiveThunk())
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

    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    const sourceDraggableId = source.droppableId
    const destinationDraggableId = destination.droppableId

    const fieldInfo: FieldNT = Fields.values()[sourceIndex]

    if (sourceDraggableId !== destinationDraggableId) {
      if (destinationDraggableId === DRAGGABLE_ID.D2) {
        // ^ если пермещение из D1 в D2
        selFields.splice(destinationIndex, 0, fieldInfo)
        selFieldsSet([...selFields])
        // dispatch(telemCurrentUpdate({...telemCurrent}))
      }
    } else if (destinationDraggableId === DRAGGABLE_ID.D2) {
      // ^ если перемещение внутри D2
      const arr0 = [...selFields]
      stdArrElemMove(arr0, sourceIndex, destinationIndex)
      selFieldsSet(arr0)
    }

  } // </ onDragEndHandler

  return (<div className={'zvaz-telems-page'}>
    <button onClick={() => {
      dispatch(metaReceiveThunk())
    }}>debug
    </button>

    <DragDropContext onDragEnd={onDragEndHandler}>
      <BElems/>
      <TElemConstructor selFields={selFields}/>
      <TElems/>
    </DragDropContext>
  </div>)
}
