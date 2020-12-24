import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getLoggedClient } from '../store/clientReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const handler = window.ePayco.checkout.configure({
  key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
  test: true,
});

export function Payment() {

  const dispatch = useDispatch();
  const { client } = useSelector(
    ({ clientReducer: { client } }) => {
      return { client }
    }
  )

  useEffect(() => {
    dispatch(getLoggedClient())
  },[])

  function handleClick() {

    handler.open({
      external: 'false',
      autoclick: false,

      amount: '20000',
      name: 'Tatuaje',
      description: 'Realización de un Tatuaje',
      currency: 'cop',

      country: 'CO',
      lang: 'en',
      tax: '0',
      tax_base: '0',

      invoice: '12346',
      extra1: 'extra1',
      extra2: 'extra2',
      extra3: 'extra3',

      response: `${process.env.REACT_APP_BASE_URL}/response`,

      name_billing: client.name,
      address_billing: `${client.name}`,
      type_doc_billing: 'cc',
      number_doc_billing: '5452454542',
      mobilephone_billing: '3164587954'
    })
  }

  return (
    <Container>
      <Row className="justify-content-sm-center">
        <Col sm="4">
          <button
            variant="warning"
            className="form-control"
            type="button"
            variant="primary"
            onClick={handleClick}
          >
            Pagar
          </button>
        </Col>
      </Row>
    </Container>
  )
}
