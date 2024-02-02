import type { Meta, StoryObj } from '@storybook/react'

import { TestB } from './TestB'

const meta: Meta<typeof TestB> = {
  title: 'components/TestB',
  component: TestB,
  tags: ['autodocs'],
  args: { test: true },
  argTypes: { test: { control: 'boolean' } },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
