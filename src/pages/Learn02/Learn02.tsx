import './style.scss'
import { DragDropContext } from 'react-beautiful-dnd'
import DroppableWrapper from '../../components/drag_and_drop/DroppableWrapper'
import { BElemCls, FieldNT, Fields, TElemCurrent } from '../../blogic/misc'
import DraggableItemWrapper from '../../components/drag_and_drop/DraggableItemWrapper'
import FieldTypeUI from '../../components/FieldTypeUI'
import React, { useEffect, useRef } from 'react'
import SmGapH from '../../components/simple/SmGapH'
import { MdDns, MdSettings } from 'react-icons/md'
import {
  Badge,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  TagLeftIcon,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon, RepeatIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import {
  telemsAllSelector,
  telemsTelemCreateThunk,
  telemsReceiveThunk,
  telemsTelemUpdateThunk,
  telemsTelemDeleteThunk,
} from '../../store/telemsSlice/telemsSlice'
import { metaReceiveThunk } from '../../store/metaSlice/metaSlice'
import { telemCurrentUpdate } from '../../store/appSlice/appSlice'
import DebugPanel from '../../components/DebugPanel/DebugPanel'
import { useDebugPanelHandler } from '../../components/DebugPanel/useDebugPanel';
import DebugPanelWrap from '../../components/DebugPanel/DebugPanelWrap';

// ---

enum DRAGGABLE_ID {
  D1 = 'd1',
  D2 = 'd2',
}

const FieldUiFCM: React.FC<{ belem: BElemCls }> = ({belem}) => {
  const techName = belem.id
  const field = Fields.fieldByTechName(techName)
  if (!field) {
    return null
  }
  return (
    <div className={'op_elem'}>
      <div>{field.nameVisual}</div>
      {Fields.fieldJsx(field)}
    </div>
  )
}

const BElemsFCM = () => {
  return (
    <div className={'belems-container'}>
      <DroppableWrapper droppableId={DRAGGABLE_ID.D1}>
        {Fields.values().map((field, index) => {
          return (
            <DraggableItemWrapper key={index} draggableId={`${DRAGGABLE_ID.D1}-${index}`} index={index}>
              <FieldTypeUI field={field}/>
            </DraggableItemWrapper>
          )
        })}
      </DroppableWrapper>
    </div>
  )
}

function DeleteModalFCM({disabled, handler}: any) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const handler0 = () => {
    handler()
    onClose()
  }
  return (
    <>
      <Tooltip placement={'top'} label={'Удалить'}>
        <IconButton
          onMouseOver={useDebugPanelHandler({info: 'кнопка "Удалить" [[211230201752]]'})}
          aria-label="Remove"
          icon={<DeleteIcon/>}
          colorScheme={'red'}
          onClick={onOpen}
          disabled={disabled}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>удаление</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>удалить один элемент?</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              отмена
            </Button>
            <Button variant="ghost" onClick={handler0}>
              да
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const TElemConstructorFCM: React.FC<any> = ({selFields: belems}) => {
  const telemCurrent = useSelector((state) => {
    return _.get(state, 'app.telemCurrent', {})
  })

  const dispatch = useDispatch()

  const dis1 = !!telemCurrent.id
  const dis2 = !telemCurrent.id

  const createHandle = () => {
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
    const title = ev?.target?.value
    const telemCurrentNew = {...telemCurrent, title}
    dispatch(telemCurrentUpdate(telemCurrentNew))
  }

  return (
    <div className={'telem-container'}>
      {/* // --- buttons */}
      <div className={'buttons'}>
        <Tooltip placement={'top'} label={'Создать новый элемент'}>
          <IconButton
            onMouseOver={useDebugPanelHandler({info: 'кнопка "Создать новый элемент" [[211230201151]]'})}
            aria-label="Create"
            icon={<CheckIcon/>}
            colorScheme={'blue'}
            onClick={createHandle}
            disabled={dis1}
          />
        </Tooltip>
        <Tooltip placement={'top'} label={'Обновить'}>
          <DebugPanelWrap info="кнопка 'Обновить' [[211230221507]]">
            <IconButton
              aria-label="Update"
              icon={<RepeatIcon/>}
              colorScheme={'green'}
              onClick={updateHandler}
              disabled={dis2}
            />
          </DebugPanelWrap>
        </Tooltip>

        <DeleteModalFCM handler={deleteHandle} disabled={dis2}/>

        <Tooltip placement={'top'} label={'Очистить'}>
          <IconButton
            onMouseOver={useDebugPanelHandler({info: 'кнопка "Очистить" [[211230201712]]'})}
            aria-label="Clear"
            icon={<CloseIcon/>}
            onClick={clearHandle}
          />
        </Tooltip>
      </div>

      {/* // --- */}

      <SmGapH h={24}/>

      <DroppableWrapper droppableId={DRAGGABLE_ID.D2}>
        {telemCurrent?.id ? <div>id: {telemCurrent.id}</div> : ''}

        <input
          className={'titleInput'}
          type={'text'}
          placeholder={'title'}
          required={true}
          onChange={inputChangeHandler}
          value={telemCurrent.title || ''}
        />

        <SmGapH h={16}/>

        {belems.map((belem: BElemCls, index: any) => {
          return (
            <DraggableItemWrapper key={index0++} draggableId={`${DRAGGABLE_ID.D2}-${index}`} index={index}
                                  className={'op_draggable'}>
              <FieldUiFCM belem={belem}/>
            </DraggableItemWrapper>
          )
        })}
      </DroppableWrapper>
    </div>
  )
}

// ---

const TElemFCM = ({telem}: any) => {
  const dispatch = useDispatch()

  const editHandle = () => {
    dispatch(telemCurrentUpdate(telem))
  }

  return (
    <Container bg={'coral'} borderRadius={'md'} p={2}>
      <Heading size="sm" mb={4}>
        {telem.title}
      </Heading>
      <HStack pos="relative">
        <Badge variant="outline" colorScheme="green" bgColor="white" pos="absolute" bottom="0" right="0" m={2}>
          id: {telem.id}
        </Badge>

        <Tooltip placement={'top'} label={'Изменить'}>
          <IconButton aria-label="edit" icon={<EditIcon/>} colorScheme={'teal'} variant={'solid'} size={'sm'}
                      onClick={editHandle}/>
        </Tooltip>

        <Tooltip placement="top" label="Количество элементов">
          <Tag size="sm" variant="outline" colorScheme="teal">
            <TagLeftIcon as={MdSettings}/>
            <TagLabel>{_.get(telem, 'belems.length', '0')}</TagLabel>
          </Tag>
        </Tooltip>
      </HStack>
    </Container>
  )
}

// ---

const TElemsCFM = () => {
  const telems = useSelector((state: any) => {
    // [211024184516]
    return telemsAllSelector(state)
  })

  // ---
  return (
    <VStack className={'telems-container'}>
      {/* loop */}
      {telems.map((telem: any) => (
        <TElemFCM key={telem.id} telem={telem}/>
      ))}
      {/* end loop */}
    </VStack>
  )
}

// ---

let index0 = 0

export function Learn02() {
  const dispatch = useDispatch()

  const telemCurrent = useSelector((state) => {
    return _.get(state, 'app.telemCurrent', {})
  })

  useEffect(() => {
    dispatch(telemsReceiveThunk())
    dispatch(metaReceiveThunk())
  }, [dispatch])

  const onDragEndHandler = (result: any) => {
    const {destination, source, draggableId} = result

    if (!destination) {
      return
    }

    const sourceIndex = source.index
    const destinationIndex = destination.index
    const sourceDraggableId = source.droppableId
    const destinationDraggableId = destination.droppableId

    const telemCurrentNew = new TElemCurrent(telemCurrent)
    if (sourceDraggableId !== destinationDraggableId) {
      if (destinationDraggableId === DRAGGABLE_ID.D2) {
        // ^ если пермещение из D1 в D2
        const field: FieldNT | null = Fields.fieldByIndex(sourceIndex)
        if (field) {
          telemCurrentNew.belemAdd({id: field.nameTech}, destinationIndex)
          dispatch(telemCurrentUpdate({...telemCurrentNew}))
        }
      } else if (destinationDraggableId === DRAGGABLE_ID.D1) {
        // ^ если перемещение из D2 в D1
        telemCurrentNew.belemDelete(sourceIndex)
        dispatch(telemCurrentUpdate({...telemCurrentNew}))
      }
    } else if (destinationDraggableId === DRAGGABLE_ID.D2) {
      // ^ если перемещение внутри D2
      telemCurrentNew.belemMove(sourceIndex, destinationIndex)
      dispatch(telemCurrentUpdate({...telemCurrentNew}))
    }
  } // </ onDragEndHandler

  return (
    <div>
      <DebugPanel/>
      <div className={'zvaz-telems-page'}>
        <DragDropContext onDragEnd={onDragEndHandler}>
          <BElemsFCM/>
          <TElemConstructorFCM selFields={_.get(telemCurrent, 'belems', [])}/>
          <TElemsCFM/>
        </DragDropContext>
      </div>
    </div>
  )
}
