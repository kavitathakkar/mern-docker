var express = require('express');

const {
createData,
getCompanies,
getProducts,
getProduct,
getQuaterlyResult,
getContactDetails,
addSupplier,
changeContactNumber,
deleteSupplier,
}= require('../controller/indexController');
var router = express. Router();

// index routes
router.get('/setupdb', createData);
router.get('/home', getCompanies);
router.get('/products', getProducts);
router.get('/productDetails/:product', getProduct);
router.get('/quaterlyResult', getQuaterlyResult);
router.get('/contactus', getContactDetails);
router.post('/supplierRegister', addSupplier);
router.put('/supplierUpdateContactNumber', changeContactNumber);
router.delete('/supplierRemove', deleteSupplier);

module.exports = router;