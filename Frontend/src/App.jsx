import React,{useEffect,useState} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SideDrawer from './layout/SideDrawer';
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import SubmitCommission from './pages/SubmitCommission';
import { useDispatch } from 'react-redux';
import { fetchLeaderboard, fetchUser } from './store/slices/userSlice';
import About from './pages/About';
import { getAllAuctionItems } from './store/slices/auctionSlice';
import Leaderboard from './pages/Leaderboard';
import Auctions from './pages/Auctions';
import AuctionItem from './pages/AuctionItem';
import CreateAuction from './pages/CreateAuction';
import ViewMyAuctions from './pages/ViewMyAuctions';
import ViewAuctionDetails from './pages/ViewAuctionDetails';
import Dashboard from './pages/Dashboard/Dashboard';
import Drawer from './pages/Dashboard/sub-components/Drawer';
import UserProfile from './pages/UserProfile';
import PaymentGraph from './pages/Dashboard/sub-components/PaymentGraph';
import PaymentProofs from './pages/Dashboard/sub-components/paymentProofs';
import BiddersAuctioneersGraph from './pages/Dashboard/sub-components/BiddersAuctioneersGraph';
import AuctionItemDelete from './pages/Dashboard/sub-components/AuctionItemDelete';
import Contact from './pages/Contact';




const App = () => {
  const dispatch=useDispatch();
  useEffect(()=>{ 
    dispatch(fetchUser());
    dispatch(getAllAuctionItems());
    dispatch(fetchLeaderboard());

  },[]);

  return (
  
  <Router>
    <SideDrawer/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/submit-commission" element={<SubmitCommission/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/leaderboard" element={<Leaderboard/>}/>
      <Route path="/auctions" element={<Auctions/>}/>
      <Route path="/auction/item/:id" element={<AuctionItem/>}/>
      <Route path="/create-auction" element={<CreateAuction/>}/>
      <Route path="/view-my-auctions" element={<ViewMyAuctions/>}/>
      <Route path="/auction/details/:id" element={<ViewAuctionDetails/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/drawer" element={<Drawer/>}/>
      <Route path="/me" element={<UserProfile/>}/>
      <Route path="/contact-us" element={<Contact/>}/>
      <Route path="/dashboard/payment-graph" element={<PaymentGraph/>}/>
      <Route path="/dashboard/payment-proofs" element={<PaymentProofs/>}/>
      <Route path="/dashboard/users-graph" element={<BiddersAuctioneersGraph/>}/>
      <Route path="/dashboard/delete-auction-items" element={<AuctionItemDelete/>}/>
    </Routes>
    <ToastContainer position='top-right'/>
  </Router>
);
};

export default App;