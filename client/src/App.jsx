import React, { useEffect, useState } from "react";
import CryptoCoders from "./contracts/CryptoCoders.json";
import getWeb3 from "./getWeb3";
import { Navbar, Container, Row, Col } from "react-bootstrap";

import "./App.css";

const App = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [coders, setCoders] = useState([]);
  const [mintText, setMintText] = useState("");

  //load all the NFTs
  const loadNFTS = async (contract) => {
    //Returns the total amount of tokens stored by the contract.
    const totalSupply = await contract.methods.totalSupply().call(); //call() you can think this is get and no gas fee usually.
    console.log(totalSupply);

    let nft = [];
    for (let i = 0; i < totalSupply; i++) {
      let coder = await contract.methods.coders(i).call();
      nft.push(coder);
    }
    setCoders(nft);

    console.log(nft);
  };

  //load WEB3 account from Metamask
  const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    setAccount(accounts[0]);
  };

  //Load the contract
  const loadWeb3Contract = async (web3) => {
    //get current Network Id
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    const networkData = CryptoCoders.networks[networkId];
    // console.log(networkData);
    if (networkData) {
      const abi = CryptoCoders.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      console.log(contract);
      setContract(contract);
      return contract;
    }
  };

  //Mint function
  const mint = (text) => {
    // console.log(text);
    if (!text.trim()) return;
    contract.methods
      .mint(text)
      .send({ from: account }, (error, transactionHash) => {
        if (error) {
          console.log(error.message);
        } else {
          setCoders([...coders, text]);
          setMintText("");
          console.log(
            `mint succeeded, your transaction hash is: ${transactionHash}`
          );
        }
      });
  };

  useEffect(async () => {
    const web3 = await getWeb3();
    console.log(web3);
    let contract = await loadWeb3Contract(web3);
    await loadWeb3Account(web3);
    await loadNFTS(contract);
  }, []);

  return (
    <div>
      <Navbar bg="light">
        <Container fluid>
          <Navbar.Brand href="#home">CryptoCoders</Navbar.Brand>
          <span>{account}</span>
        </Container>
      </Navbar>
      <Container fluid className="mt-5">
        <Row>
          <Col xs={12} className="d-flex flex-column align-items-center">
            <img
              src="https://avatars.dicebear.com/api/pixel-art/Jimmy.svg"
              alt=""
              className="mb-4"
              width="72"
            />
            <h1 className="fw-bold display-5">Crypto Coders</h1>

            <Col xs={6}>
              <p className="lead text-center fw-bold">
                There are some of the most highly motivated coders in the world!
                We are here to learn coding and apply it to the betterment of
                humanity. We are inventors, innovators, and creators.
              </p>
            </Col>
            <Col xs={6} className="d-flex flex-column align-items-center">
              <input
                type="text"
                placeholder="e.g. Jimmy"
                className="form-control mb-2"
                value={mintText}
                onChange={(e) => setMintText(e.target.value)}
              />
              <button
                onClick={() => mint(mintText)}
                className="btn btn-primary col-12 "
              >
                Mint
              </button>
            </Col>
          </Col>
          <Col
            xs={8}
            className="d-flex align-items-center justify-content-center m-auto flex-wrap "
          >
            {coders.map((coder, key) => (
              <div key={key} className="d-flex flex-column align-items-center">
                <img
                  width="150"
                  src={`https://avatars.dicebear.com/api/pixel-art/${coder}.svg`}
                  alt=""
                />
                <span className="fw-bold">{coder}</span>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
