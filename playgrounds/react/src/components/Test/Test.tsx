import { FC, HTMLAttributes, PropsWithChildren } from 'react'

type TestProps = PropsWithChildren<
  {
    text: string
    number: number
    boolean: boolean
    array: string[]
    object: {
      key: string
    }
    function: () => void
    union: string | number
    optional?: string
    literal: 'literal'
    literalUnion: 'literal' | 'literal2'
    literalOptional?: 'literal'
    literalUnionOptional?: 'literal' | 'literal2'
  } & HTMLAttributes<HTMLDivElement>
>

export const Test: FC<TestProps> = ({
  text,
  number,
  boolean,
  array,
  object,
  function: func,
  union,
  optional,
  literal,
  literalUnion,
  literalOptional,
  literalUnionOptional,
  children,
  ...attrs
}) => {
  return (
    <div
      onClick={func}
      {...attrs}
    >
      {text}
      {number}
      {String(boolean)}
      {array}
      {object.key}
      {union}
      {optional}
      {literal}
      {literalUnion}
      {literalOptional}
      {literalUnionOptional}
      {children}
    </div>
  )
}
