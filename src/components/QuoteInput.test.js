import { render, cleanup, fireEvent } from '@testing-library/react'
import { QuoteInput } from './QuoteInput'

describe('QuoteInput', () => {
  afterEach(()=> {
    cleanup()
  })

  it('should change quote form field', () => {
    const quote = 'quote 1'
    const handleChange = jest.fn();
    
    const {  getByTestId } = render(<QuoteInput quote={quote} handleChange={handleChange} />)

    const quoteInput = getByTestId('quote')
    fireEvent.change(quoteInput, { target: { value: quote }})
    expect(quoteInput.value).toBe(quote)
    
  })

})
