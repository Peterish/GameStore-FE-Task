import { useState } from "react";
import contractABI from "./abi.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemId, setItemId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [retrieved, setRetrieved] = useState([])

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleBuy = () => {
    setShowBuy(true);
  };
  const handleCloseBuy = () => {
    setShowBuy(false);
  };

  const contractAddress = "0x0B76bE562724D106AC18789cea0Be029da501cEF";

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function handleAdd() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const myGameStoreContract = new ethers.Contract(contractAddress, contractABI, signer);

      try { 
        const transaction = await myGameStoreContract.addProduct(itemPrice, itemName);
        await transaction.wait();
        toast.success("Product added successfully!", {
          position: "top-center",
        });

        setItemPrice('');
        setItemName('')

      } catch (error) {
        toast.error(`Product addition Failed! Only owner can add Product`, {
          position: "top-center",
        });
      } 
    }
  }

  async function handleBuyProduct() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const myGameStoreContract = new ethers.Contract(contractAddress, contractABI, signer);

      try { 
        const transaction = await myGameStoreContract.buyProduct(itemId, amount);
        await transaction.wait();
        toast.success("Product bought successfully!", {
          position: "top-center",
        });

        setItemPrice('');
        setItemName('')

      } catch (error) {
        toast.error(`Product addition Failed! `, {
          position: "top-center",
        });
      } 
    }
  }
  
  async function handleAllProduct() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const myGameStoreContract = new ethers.Contract(contractAddress, contractABI, signer);

      try { 
        const transaction = await myGameStoreContract.getAllProducts();
        console.log(transaction)
        setRetrieved(transaction)

        toast.success("Product bought successfully!", {
          position: "top-center",
        });

      } catch (error) {
        toast.error(`Product addition Failed! Only owner can add Product`, {
          position: "top-center",
        });
      } 
    }
  }


  return (
    <div style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/high-angle-controllers-headphones_23-2149829136.jpg?w=1800&t=st=1717955166~exp=1717955766~hmac=fc8f0fa2bf38f7cf4816ebcca2cfd4bfa8fbe328ec1a37a5b7d8541a5caa9b6a' }} className="bg-[#1a1a1a] bg-cover bg-center min-h-[100vh] w-[100%] bg-blend-overlay flex justify-center items-center text-white max-w-[1440px] mx-auto">
      <div className="lg:w-[50%] md:w-[50%] w-[90%] mx-auto">
        <h1 className="font-bold lg:text-[4rem] md:text-[4rem] text-[2rem] mt-2 text-center">Welcome to <span className="text-[#9C27B0] drop-shadow-md">GameStore</span></h1>
        <p className="text-center lg:text-[1.2rem] md:text-[1.2rem] text-[.9rem] mb-8 text-center">Trade premium virtual game accessories</p>
        <section className="flex flex-col lg:flex-row md:flex-row lg:w-[70%] mx-auto justify-between md:w-[60%] w-[100%] flex-wrap">
          <div className="md:w-[45%] lg:w-[31%] w-[90%] mx-auto">
          <button
            data-ripple-light="true"
            data-dialog-target="dialog"
            className="w-[100%] mb-4 select-none rounded-lg bg-gradient-to-tr from-[#9C27B0] to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={handleShowModal}
          >
            Add Product
          </button>
          {showModal && (
            <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
              <div className="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
                <div className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-black">
                  <h2 className="font-bold lg:text-[1.8rem] md:text-[1.8rem] text-[1.4rem] mt-2">Add Products</h2>
                  <p className="mb-4 text-xxs">Only  the Admin can add products</p>
                 <input type="text" placeholder="Price of item" className="py-2 px-4 border border-gray-200 rounded-lg w-[100%]  mb-4" onChange={(e) => setItemPrice(e.target.value)} />
                 <input type="text" placeholder="Name of Item" className="py-2 px-4 border border-gray-200 rounded-lg w-[100%]  mb-4" onChange={(e) => setItemName(e.target.value)} />
                </div>
                <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
                  <button
                    className="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button onClick={handleAdd}
                    className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
          <div className="md:w-[45%] lg:w-[31%] w-[90%] mx-auto">
          <button
            data-ripple-light="true"
            data-dialog-target="dialog"
            className="w-[100%] mb-4  select-none rounded-lg bg-gradient-to-tr from-[#9C27B0] to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={handleBuy}
          >
            Buy Product
          </button>
          {showBuy && (
            <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
              <div className="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
                <div className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-black">
                  <h2 className="font-bold lg:text-[1.8rem] md:text-[1.8rem] text-[1.4rem] mt-2">Buy Products</h2>
                  <p className="mb-4 text-xxs">Open to everyone, select products by their ID</p>
                 <input type="text" placeholder="Product ID" className="py-2 px-4 border border-gray-200 rounded-lg w-[100%]  mb-4" onChange={(e) => setItemId(e.target.value)}/>
                 <input type="text" placeholder="Amount" className="py-2 px-4 border border-gray-200 rounded-lg w-[100%]  mb-4" onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
                  <button
                    className="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={handleCloseBuy}
                  >
                    Cancel
                  </button>
                  <button onClick={handleBuyProduct}
                    className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
          <div className="md:w-[45%] lg:w-[31%] w-[90%] mx-auto">
          <button
            className="w-[100%] mb-4  select-none rounded-lg bg-gradient-to-tr from-[#9C27B0] to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={handleAllProduct}>
           All Product
          </button>
          </div>
        </section>
        <section className="mt-8 flex flex-col lg:flex-row md:flex-row justify-between flex-wrap">
         {retrieved.map((info) => ( <div className="bg-[#00000096] p-4 rounded-lg w-[100%] lg:w-[31%] md:w-[48%] mb-4"> 
            <img src="https://img.freepik.com/free-photo/gamification-3d-rendering-concept_23-2149484774.jpg?t=st=1717977397~exp=1717980997~hmac=636af3ef0c834f1d86bfcceed7e955770f18d3448caa3be79799bf4c14340834&w=1800" alt="" className="rounded-lg mb-4" />
            <p>Id: {Number(info.id)}</p>
            <p>Item Name: {info.name}</p>
            <p>Item Price: {Number(info.amount)} USDC</p>
          </div>))}
        </section>
      </div>
    </div>
  );
};

export default App;
