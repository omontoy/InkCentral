import { render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from  'react-router-dom'
import moxios from 'moxios';
import { ForgotPassword } from './ForgotPassword'



describe('ForgotPassword', () => {
  beforeEach(()=> {
    moxios.install()
  })

  afterEach(()=> {
    moxios.uninstall()
    cleanup()
  })

  it('should change form fields and open a swal on button click', () => {
    const resetForm = {
      email: 'anyemail',
      userType: 'Client'
    }

    const {  getByTestId, getByText, debug } = render( <ForgotPassword/>, { wrapper: MemoryRouter })

    const emailInput = getByTestId('email')
    
    fireEvent.change(emailInput, { target: { value: resetForm.email }})
    expect(emailInput.value).toBe(resetForm.email)

    const userTypeInput = getByTestId('userType')
    fireEvent.change(userTypeInput, { target: { value: resetForm.userType }})
    expect(userTypeInput.value).toBe(resetForm.userType)

    const forgotPasswordButton = getByTestId('forgotPasswordButton')
    fireEvent.click(forgotPasswordButton)

  
    moxios.wait(function (){
      let req = moxios.requests.mostRecent()
      req.respondWith({
        status: 200
      })
      .then( waitFor(()=>{
        expect(getByText(/Excellent/i)).toBeInTheDocument()
      })
      )
    })
    // debug()  
  
  })

  it('should change form fields and open a swal error on button click', () => {
    const resetForm = {
      email: 'anyemail',
      userType: 'Client'
    }

    const {  getByTestId, getByText, debug } = render( <ForgotPassword/>, { wrapper: MemoryRouter })

    const emailInput = getByTestId('email')
    
    fireEvent.change(emailInput, { target: { value: resetForm.email }})
    expect(emailInput.value).toBe(resetForm.email)

    const userTypeInput = getByTestId('userType')
    fireEvent.change(userTypeInput, { target: { value: resetForm.userType }})
    expect(userTypeInput.value).toBe(resetForm.userType)

    const forgotPasswordButton = getByTestId('forgotPasswordButton')
    fireEvent.click(forgotPasswordButton)

  
    moxios.wait(function (){
      let req = moxios.requests.mostRecent()
      req.respondWith({
        status: 400,
        response: { message: 'something went wrong' }
      })
      .then( waitFor(()=>{
        expect(getByText(/something went wrong/i)).toBeInTheDocument()
      })
      )
    })
    // debug()  
  
  })

})


