import React, { useEffect, useCallback, useRef } from 'react'
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { ModalProps } from './types'
import { ModalHeader } from './header'
import './index.css';

export const TradeModal = (props: ModalProps) => {
    const {
        children,
        maskClosable = false,
        header,
        footer,
        afterClose,
        onOpen,
        onClose,
        showCloseButton = false,
        showMask = false,
        width,
        height,
        isVisible,
        ...rest
    } = props

    const modalEl = useRef<any>('')
    const domEl = document.body
    const nodeRef = useRef(null);

    const handleClose = useCallback(() => {
        onClose();
    }, []);

    const handleClick = useCallback((e: React.MouseEvent) => {
        if (!modalEl.current.contains(e.target as Node)
            && modalEl.current.current !== e.target) {
            if (maskClosable) {
                handleClose()
            }
        }
    }, []);

    useEffect(() => {
        if (afterClose && !isVisible) {
            afterClose()
        }
        if (onOpen && isVisible) {
            onOpen()
        }
    }, [isVisible])

    /*
    onEnter={onEnter}
    const onEnter = () => {
        console.log('---->onEnter');
        // setIsVisible(true)
    }
     */

    if (!isVisible) {
        return null
    }

    if (!domEl) return null

    return ReactDOM.createPortal(
        <div onClick={handleClick}>
            {showMask ? <div className='trade-modal-mask'></div> : null}
            <div className='trade-modal-wrap'>
                <CSSTransition
                    nodeRef={nodeRef}
                    in={isVisible} // 代表是’淡入’状态，还是’淡出’状态
                    timeout={300}
                    classNames='trade-modal'
                    unmountOnExit
                    enter={true}
                    exit={true}
                    appear={true}  // 第一次进入页面时是否有动画效果
                >
                    <div style={{ width: width || '60%', height: height || '450px' }} className='trade-modal-transparent' ref={modalEl}>
                        <div className='trade-modal-content'>
                            {showCloseButton ?
                                <button onClick={() => onClose()} className='trade-modal-close'>
                                    <span className='trade-modal-close-x'></span>
                                </button> : null}
                            <ModalHeader header={header} />
                            <div className='trade-modal-body'>
                                {children}
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        </div>, domEl)
}
