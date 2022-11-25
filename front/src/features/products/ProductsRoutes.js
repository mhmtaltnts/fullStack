
import {
    Route,
  } from "react-router-dom";

  import ProductsList from "./ProductList/ProductsList.jsx";
  import EditProduct from "./EditPrdoduct/EditProduct.jsx";
  import NewProduct from "./NewProduct/NewProduct.jsx";

export const ProductsRoutes = (
    <Route path='products'>
        <Route index element={<ProductsList />} />
        <Route path=':id' element={<EditProduct />} />
        <Route path='new' element={<NewProduct />} />
    </Route>
)