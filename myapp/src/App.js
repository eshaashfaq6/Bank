import './App.css';
import HomePage from './Pages/HomePage';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import AboutPage from './Pages/AboutPage';
import ContactUsPage from './Pages/ContactUsPage';
import RootLayout from './Root';
import UserLoginPage from './Pages/UserLoginPage';
import AdminLoginPage from './Pages/AdminLoginPage';
import AddUser from './Pages/AddUserPage';
import AddAccount from './Pages/AddAccountPage';
import UpdateAccountHelp from './Pages/UpdateAccountHelp';
import UpdateAccount from './Pages/UpdateAccount';
import DeleteAccount from './Pages/DeleteAccount';
import ViewAccounts from './Pages/ViewAccountsPage';
import Transaction from './Pages/TransactionPage';
import CashWithdrawl from './Pages/DebitPage';
import Deposit from './Pages/DepositPage';
import Balance from './Pages/BalancePage';
import AccountLogin from './Pages/AccountLogin';
import Credit from './Pages/CreditPage';
import MyTansactions from './Pages/MyTransactions';
import ViewUsers from './Pages/AllUsers';
import MyProfile from './Pages/MyProfile';
import DepositHelp from './Pages/DepositHelp';
import AllTansactions from './Pages/AllTransactions';
import Protected from './Components/Protected';

const router=createBrowserRouter([
  {path:'/',
  element:<RootLayout></RootLayout>,
  children:
  [{path:'/',element:<HomePage></HomePage>},
  {path:'/adminlogin',element:<AdminLoginPage></AdminLoginPage>},
  {path:'/userlogin',element:<UserLoginPage></UserLoginPage>},
  {path:'/adduser',element:<Protected Component={AddUser} allowedRoles={'admin'}/>},
  {path:'/about',element:<AboutPage></AboutPage>},
  {path:'/contact',element:<ContactUsPage></ContactUsPage>},
 
  {path:'/addaccount/:userId',element:<Protected Component={AddAccount} allowedRoles={'admin'}/>},
  {path:'/updateaccounthelp',element:<Protected Component={UpdateAccountHelp} allowedRoles={'admin'}/>},
  {path:'/updateaccount/:accountNo',element:<Protected Component={UpdateAccount} allowedRoles={'admin'}/>},
  {path:'/deleteaccount',element:<Protected Component={DeleteAccount} allowedRoles={'admin'}/>},
  {path:'/depos',element:<Protected Component={DepositHelp} allowedRoles={'admin'}/>},
  {path:'/alltransac',element:<Protected Component={AllTansactions} allowedRoles={'admin'}/>},
  {path:'/viewaccount',element:<Protected Component={ViewAccounts} allowedRoles={'admin'}/>},
  {path:'/viewuser',element:<Protected Component={ViewUsers} allowedRoles={'admin'}/>},
  {path:'/deposit/:accountNo',element:<Protected Component={Deposit} allowedRoles={'admin'}/>},



  {path:'/transaction',element:<Protected Component={Transaction} allowedRoles={'AccountHolder'}/>},
  {path:'/debit',element:<Protected Component={CashWithdrawl} allowedRoles={'AccountHolder'}/>},
  {path:'/credit',element:<Protected Component={Credit} allowedRoles={'AccountHolder'}/>},
  {path:'/balance',element:<Protected Component={Balance} allowedRoles={'AccountHolder'}/>},
  {path:'/accountLogin',element:<Protected Component={AccountLogin} allowedRoles={'AccountHolder'}/>},
  {path:'/myprofile',element:<MyProfile></MyProfile>},
  {path:'/mytransac',element:<Protected Component={MyTansactions} allowedRoles={'AccountHolder'}/>},
  
  
],
}

]);
function App() {
  
  return <RouterProvider router={router}/>;
}

export default App;
