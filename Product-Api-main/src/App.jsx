import { BrowserRouter , Routes , Route} from "react-router-dom"
import Product from "./components/Product"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import ProductDetails from "./components/ProductDetails"

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Product/>}/>
          <Route path="/AddProduct" element={<AddProduct/>}/>
          <Route path="/UpdateProduct/:productId" element={<UpdateProduct/>}/>
          <Route path="/ProductDetails/:productId" element={<ProductDetails/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
