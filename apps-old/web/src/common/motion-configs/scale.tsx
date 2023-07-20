// import { HTMLMotionProps } from 'framer-motion'
import { MotionVariants } from './easings'

type ScaleMotionVariant = MotionVariants<'enter' | 'exit'>

const variants: ScaleMotionVariant = {
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.1,
      easings: 'easeout',
    },
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

// export const scaleConfig: HTMLMotionProps<any> = {
export const scaleConfig = {
  initial: 'exit',
  animate: 'enter',
  exit: 'exit',
  variants,
}
