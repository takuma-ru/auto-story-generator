import type { Meta, StoryObj } from '@storybook/react'

import { TestC } from './index.tsx'

const meta: Meta<typeof TestC> = {
  title: 'components/TestC',
  component: TestC,
  tags: ['autodocs'],
  args: { test: true },
  argTypes: { test: { control: 'boolean' } },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
