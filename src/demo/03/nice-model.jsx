import { Modal } from 'antd'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const USER_INFO_MODAL = 'user-info-modal'

const modalCallbacks = {}
export const modalReducer = (state = { hiding: {} }, action) => {
    switch (action.type) {
        case 'nice-modal-show':
            return {
                ...state,
                [action.payload.modalId]: action.payload.args || true,
                hiding: {
                    ...state.hiding,
                    [action.payload.modalId]: false,
                },
            }
        case 'nice-modal-hide':
            return action.payload.force
                ? {
                      ...state,
                      [action.payload.modalId]: false,
                      hiding: { [action.payload.modalId]: false },
                  }
                : { ...state, hiding: { [action.payload.modalId]: true } }
        default:
            return state
    }
}

function showModal(modalId, args) {
    return {
        type: 'nice-modal-show',
        payload: {
            modalId,
            args,
        },
    }
}

function hideModal(modalId, force) {
    return {
        type: 'nice-modal-hide',
        payload: {
            modalId,
            force,
        },
    }
}

export const useNiceModal = modalId => {
    const dispatch = useDispatch()

    const show = useCallback(
        args => {
            return new Promise(res => {
                modalCallbacks[modalId] = res
                dispatch(showModal(modalId, args))
            })
        },
        [dispatch, modalId]
    )

    const resolve = useCallback(
        args => {
            if (modalCallbacks[modalId]) {
                modalCallbacks[modalId](args)
                delete modalCallbacks[modalId]
            }
        },
        [modalId]
    )

    const hide = useCallback(
        force => {
            dispatch(hideModal(modalId, force))
            delete modalCallbacks[modalId]
        },
        [modalId, dispatch]
    )

    const args = useSelector(state => state[modalId])
    const hiding = useSelector(state => state.hiding[modalId])

    return useMemo(
        () => ({ args, hide, show, visible: !!args, resolve, hiding }),
        [args, hide, show, resolve, hiding]
    )
}

function NiceModal({ id, children, ...rest }) {
    const modal = useNiceModal(id)
    return (
        <Modal
            onCancel={() => modal.hide()}
            onOk={() => modal.hide()}
            afterClose={() => modal.hide(true)}
            visible={!modal.hiding}
            {...rest}
        >
            {children}
        </Modal>
    )
}

export const createNiceModal = (modalId, Component) => {
    return props => {
        const { visible, args } = useNiceModal(modalId)
        if (!visible) return null
        return <Component {...args} {...props} />
    }
}

NiceModal.create = createNiceModal
NiceModal.useModal = useNiceModal

export default NiceModal
