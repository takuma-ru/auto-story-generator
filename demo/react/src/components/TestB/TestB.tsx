import { FC, HTMLAttributes } from 'react'

type Props = {
  test: boolean
} & HTMLAttributes<HTMLDivElement>

export const TestB: FC<Props> = (props) => {
  return (
    <>
      <div {...props}>TestB</div>
    </>
  )
}
