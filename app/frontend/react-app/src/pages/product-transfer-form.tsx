// SPDX-License-Identifier: Apache-2.0
import { FC, ChangeEvent, useCallback, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { transferProduct } from "../services/contract-functions";
import { getTracker, getProduct } from '../services/api.service';

import SubmissionModal from "../components/submission-modal";
import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";
import { RolesInfo } from "../components/static-data";
import WalletLookupInput from "../components/wallet-lookup-input";
import { InputGroup } from "react-bootstrap";
import { Tracker, ProductToken } from "../components/static-data";

type ProductTransferFormProps = {
  provider?: Web3Provider | JsonRpcProvider,
  roles: RolesInfo,
  productId: number,
  signedInAddress: string
}
const ProductTransferForm: FC<ProductTransferFormProps> = ({ provider, roles, signedInAddress, productId }) => {

  const [submissionModalShow, setSubmissionModalShow] = useState(false);

  // Form inputs
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState<ProductToken>();
  const [tracker, setTracker] = useState<Tracker>();

  //const [trackerId, setTrackerId] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [result, setResult] = useState("");

  // After initial onFocus for retransferquired inputs, display red outline if invalid
  const [initializedAddressInput, setInitializedAddressInput] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(false);

  // After initial onFocus for required inputs, display red outline if invalid
  const [initializedProductAmountInput, setInitializedProductAmountInput] = useState(false);

  const onProductAmountChange  = useCallback((event: ChangeEvent<HTMLInputElement>) => { setProductAmount(event.target.value); }, []);

  function handleSubmit() {
    submit();
    setSubmissionModalShow(true);
  }

  useEffect(() => {
    const init = async () => {
      if (provider && signedInAddress && productId) {
        setFetchingProduct(true);
        const {product, status} = await getProduct(productId);
        if (product) {
          let {tracker, status} = await getTracker(product.trackerId);
          setProduct(product)
          if(tracker) setTracker(tracker)
        }
      }
    }
    init();
  }, [provider, signedInAddress, productId, fetchingProduct]);

  // populate form with URL params if found
  useEffect(() => {
    let queryParams = new URLSearchParams(window.location.search);
    let addressQueryParam = queryParams.get('address');
    let quantityQueryParam = queryParams.get('quantity');
    if (addressQueryParam) {
      setAddress(addressQueryParam);
    }
    if (quantityQueryParam) {
      setProductAmount(quantityQueryParam);
    }
  }, []);

  async function submit() {
    if (!provider) return;
    let productAmount_formatted
      = Math.round(Number(productAmount)*Number(product?.issued)/Number(product?.unitAmount));

    let result = await transferProduct(
      provider,productId,productAmount_formatted,address);
    setResult(result.toString());
  }

  const inputError = {
    boxShadow: '0 0 0 0.2rem rgba(220,53,69,.5)',
    borderColor: '#dc3545'
  };

  return roles.hasAnyRole ? (
    <>
      <SubmissionModal
        show={submissionModalShow}
        title="Issue tokens"
        body={result}
        onHide={() => {setSubmissionModalShow(false); setResult("")} }
      />
      <h2>Transfer product</h2>
      <p>{"Send your available products ("+["ID = "+productId,product?.name].join(', ')
          +") sourced from tracker ("+["ID = "+ product?.trackerId,(tracker?.metadata as any)?.description!].join(', ') +") to any address."
      }</p>
      <Form.Group className="mb-3" controlId="trackerIdInput">
        <Form.Label>Tracker ID</Form.Label>
        <Form.Control
          type="input"
          value={product?.trackerId}
          disabled={true}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="productIdInput">
        <Form.Label>Product ID</Form.Label>
        <Form.Control
          type="input"
          value={productId}
          disabled={true}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="addressInput">
        <Form.Label>Address</Form.Label>
        <InputGroup>
          <WalletLookupInput
            onChange={(v: string) => { setAddress(v) }}
            onWalletChange={(w)=>{
              setAddress(w ? w.address! : '');
            }}
            onBlur={() => setInitializedAddressInput(true)}
            style={(address || !initializedAddressInput) ? {} : inputError}
            />
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="productInput">

        <Form.Label>
          Product amount
        </Form.Label>
        <Form.Control
          type="input"
          placeholder="0"
          value={productAmount}
          onChange={onProductAmountChange}
          onBlur={() => setInitializedProductAmountInput(true)}
          style={(productAmount || !initializedProductAmountInput) ? {} : inputError}
        />
        <div>Available: {product?.available.toLocaleString('en-US')+" "+product?.unit}</div>

      </Form.Group>
      <Row className="mt-4">

        <Col>
          {/* Only enable issue if any role is found */}
          { roles.hasAnyRole
            ?
              <Button
                variant="primary"
                size="lg"
                className="w-100"
                onClick={handleSubmit}
              >
                Transfer
              </Button>
            :
              <Button variant="primary" size="lg" disabled>Must be a registered dealer</Button>
          }
        </Col>

      </Row>

    </>
  ) : (
    <p>You must be a registered dealer to issue tokens.</p>
  );
}

export default ProductTransferForm;
