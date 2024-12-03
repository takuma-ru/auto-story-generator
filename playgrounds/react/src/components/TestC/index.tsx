import { FC, HTMLAttributes } from 'react'

type Props = {
  test: boolean
} & HTMLAttributes<HTMLDivElement>

export const TestC: FC<Props> = (props) => {
  return (
    <>
      <div {...props}>TestB</div>
    </>
  )
}
