import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from "./Routes";
import Footer from './components/Footer/Footer';
import { AuthProvider } from './contexts/AuthContext';

function App() {

   return (
   <AuthProvider>
   <div className="App">
       
     <Router>
       <Navbar/>
        <Switch>
            <Routes/>    
        </Switch>
        <Footer />
        
      </Router>     
   </div>
   </AuthProvider>
  
  );
};

export default App;
