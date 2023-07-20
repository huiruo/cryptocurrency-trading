import React, { ReactNode } from 'react'

export interface ModalState {
  isOpen: boolean
  referenceElement: HTMLDivElement
  popperElement: HTMLDivElement
}

export interface ModalRenderProps {
  isOpen: boolean
  open(): void
  close(): void
}

export interface ModalProps {
  /**
   * 点击 body 是否自动关闭
   */
  maskClosable?: boolean
  /**
   * Modal 完全关闭后的回调
   */
  afterClose?(): void
  /**
   * 打开时回调
   */
  onOpen?(): void
  onClose(): void
  header?: React.ReactNode
  children: ReactNode
  footer?: React.ReactNode
  /**
   * 是否显示关闭按钮
   */
  showCloseButton?: boolean
  showMask?: boolean
  width?: string
  height?: string
  isVisible: boolean
}

export interface action<T> {
  text?: string;
  onPress?: (...args: any[]) => void | Promise<any>;
  style?: T | string;
}

