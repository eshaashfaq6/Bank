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
import DeleteUser from './Pages/DeleteUser';
import MyProfile from './Pages/MyProfile';
import DepositHelp from './Pages/DepositHelp';

const router=createBrowserRouter([
  {path:'/',
  element:<RootLayout></RootLayout>,
  children:
  [{path:'/',element:<HomePage></HomePage>},
  {path:'/adminlogin',element:<AdminLoginPage></AdminLoginPage>},
  {path:'/userlogin',element:<UserLoginPage></UserLoginPage>},
  {path:'/adduser',element:<AddUser></AddUser>},
  {path:'/about',element:<AboutPage></AboutPage>},
  {path:'/contact',element:<ContactUsPage></ContactUsPage>},
  {path:'/addaccount',element:<AddAccount></AddAccount>},
  {path:'/addaccount/:userId',element:<AddAccount></AddAccount>},
  {path:'/updateaccounthelp',element:<UpdateAccountHelp></UpdateAccountHelp>},
  {path:'/updateaccount',element:<UpdateAccount></UpdateAccount>},
  {path:'/updateaccount/:accountNo',element:<UpdateAccount></UpdateAccount>},
  {path:'/deleteaccount',element:<DeleteAccount></DeleteAccount>},
  {path:'/transaction',element:<Transaction></Transaction>},
  {path:'/transaction/:accountNo',element:<Transaction></Transaction>},
  {path:'/debit',element:<CashWithdrawl></CashWithdrawl>},
  {path:'/debit/:accountNo',element:<CashWithdrawl></CashWithdrawl>},
  {path:'/deposit',element:<Deposit></Deposit>},
  {path:'/deleteUser',element:<DeleteUser></DeleteUser>},
  {path:'/deposit/:accountNo',element:<Deposit></Deposit>},
  {path:'/credit',element:<Credit></Credit>},
  {path:'/credit/:accountNo',element:<Credit></Credit>},
  {path:'/balance',element:<Balance></Balance>},
  {path:'/balance/:accountNo',element:<Balance></Balance>},
  {path:'/accountLogin',element:<AccountLogin></AccountLogin>},
  {path:'/viewaccount',element:<ViewAccounts></ViewAccounts>},
  {path:'/viewuser',element:<ViewUsers></ViewUsers>},
  {path:'/myprofile',element:<MyProfile></MyProfile>},
  {path:'/mytransac/:accountNo',element:<MyTansactions></MyTansactions>},
  
  {path:'/depos',element:<DepositHelp></DepositHelp>}
],
}

]);
function App() {
  return <RouterProvider router={router}/>;
}

export default App;
