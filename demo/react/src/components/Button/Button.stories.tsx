import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    primary: undefined,
    backgroundColor: undefined,
    size: undefined,
    label: undefined,
    onClick: undefined,
  },
  argTypes: {
    primary: { control: 'boolean' },
    backgroundColor: { control: 'text' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
