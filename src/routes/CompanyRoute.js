const express = require('express');
const CompanyRoute = express.Router();

const {createCompanyprofile,getAll,getByUser} = require('../controller/Companycontroller')
const {authToken} = require('../controller/verifyToken')
CompanyRoute.post('/create',authToken,createCompanyprofile)
CompanyRoute.get('/getbyuser/:useremail',authToken,getByUser)
CompanyRoute.get('/get',authToken,getAll)

module.exports=CompanyRoute;