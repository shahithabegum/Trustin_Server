const express = require('express');
const CompanyRoute = express.Router();

const {createCompanyprofile,getAll,getByUser,connectCompany,Update_company} = require('../controller/Companycontroller')
const {authToken} = require('../controller/verifyToken')
CompanyRoute.post('/create',authToken,createCompanyprofile)
CompanyRoute.put('/network/:useremail',connectCompany)
CompanyRoute.put('/update/:_id',authToken,Update_company)
CompanyRoute.get('/getbyuser/:useremail',authToken,getByUser)
CompanyRoute.get('/get',authToken,getAll)

module.exports=CompanyRoute;