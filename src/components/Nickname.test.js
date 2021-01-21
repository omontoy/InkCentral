import { render, cleanup, fireEvent } from '@testing-library/react'
import { NicknameInput } from './NicknameInput'

describe('NicknameInput', () => {
  afterEach(()=> {
    cleanup()
  })
  it('should change nickname form field', () => {
    const nickname = 'nickname1'
    const handleChange = jest.fn();
    
    const {  getByTestId } = render(<NicknameInput nickname={nickname} handleChange={handleChange} />)

    const nicknameInput = getByTestId('nickname')
    fireEvent.change(nicknameInput, { target: { value: nickname }})
    expect(nicknameInput.value).toBe(nickname)    
  })
})