import { render, cleanup } from '@testing-library/react'
import { Cover } from './Cover'

describe('Cover', () => {
  afterEach(()=> {
    cleanup()
  })

  it('should render a jumbotron', () => {
    const { getByTestId } = render(<Cover/>);
    const jumbotron = getByTestId('jumbotron')
    expect(jumbotron).toBeInTheDocument();
    
  })

})