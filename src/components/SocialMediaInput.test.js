import { render, cleanup, fireEvent } from '@testing-library/react'
import { SocialMediaInput } from './SocialMediaInput'

describe('NicknameInput', () => {
  afterEach(()=> {
    cleanup()
  })
  it('should change social media input fields in the form', () => {
    const instagram = 'instagram1'
    const facebook = 'facebook1'
    const twitter = 'twitter1'
    const whatsapp = 'whatsapp1'
    const handleChange = jest.fn();
    
    const {  getByTestId } = render(<SocialMediaInput 
                                        instagram={instagram} 
                                        facebook={facebook}
                                        twitter={twitter}
                                        whatsapp={whatsapp} 
                                        handleChange={handleChange} />)

    const instagramInput = getByTestId('instagram')
    const facebookInput = getByTestId('facebook')
    const twitterInput = getByTestId('twitter')
    const whatsappInput = getByTestId('whatsapp')

    fireEvent.change(instagramInput, { target: { value: instagram }})
    fireEvent.change(facebookInput, { target: { value: facebook }})
    fireEvent.change(twitterInput, { target: { value: twitter }})
    fireEvent.change(whatsappInput, { target: { value: whatsapp }})
    expect(instagramInput.value).toBe(instagram)
    expect(facebookInput.value).toBe(facebook)
    expect(twitterInput.value).toBe(twitter)
    expect(whatsappInput.value).toBe(whatsapp)    
  })
})