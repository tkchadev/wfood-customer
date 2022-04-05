const customerServies = require("../services/customer.service");
const moment = require("moment");

const postCreateCustomerUser = async (req, res) => {
  const obj = {
    cus_username: req.body.cus_username,
    cus_password: req.body.cus_password,
    cus_type: req.body.cus_type,
    cus_name: req.body.cus_name,
    cus_phone: req.body.cus_phone,
    cus_email: req.body.cus_email,
    cus_comp_name: req.body.cus_comp_name,
    cus_comp_branch: req.body.cus_comp_branch,
    cus_comp_taxid: req.body.cus_comp_taxid,
    cus_comp_phone: req.body.cus_comp_phone,
    cus_comp_no: req.body.cus_comp_no,
    cus_comp_moo: req.body.cus_comp_moo,
    cus_comp_soi: req.body.cus_comp_soi,
    cus_comp_road: req.body.cus_comp_road,
    cus_comp_tambon: req.body.cus_comp_tambon,
    cus_comp_amphoe: req.body.cus_comp_amphoe,
    cus_comp_province: req.body.cus_comp_province,
    cus_comp_postcode: req.body.cus_comp_postcode,
    cus_addr_short: req.body.cus_addr_short,
  };
  let addrs = {
    cus_addrdelivery: req.body.cus_addrdelivery,
  };
  const result = await customerServies.createCustomerUser(obj, addrs);
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const putUpdateCustomerUser = async (req, res) => {
  const obj = {
    cus_uuid: req.body.cus_uuid,
    cus_username: req.body.cus_username,
    cus_name: req.body.cus_name,
    cus_phone: req.body.cus_phone,
    cus_email: req.body.cus_email,
    cus_comp_name: req.body.cus_comp_name,
    cus_comp_branch: req.body.cus_comp_branch,
    cus_comp_taxid: req.body.cus_comp_taxid,
    cus_comp_phone: req.body.cus_comp_phone,
    cus_comp_no: req.body.cus_comp_no,
    cus_comp_moo: req.body.cus_comp_moo,
    cus_comp_soi: req.body.cus_comp_soi,
    cus_comp_road: req.body.cus_comp_road,
    cus_comp_tambon: req.body.cus_comp_tambon,
    cus_comp_amphoe: req.body.cus_comp_amphoe,
    cus_comp_province: req.body.cus_comp_province,
    cus_comp_postcode: req.body.cus_comp_postcode,
    cus_addr_short: req.body.cus_addr_short,
    updated_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  };
  let addrs = {
    cus_addrdelivery: req.body.cus_addrdelivery,
  };
  const result = await customerServies.updateCustomerUser(obj, addrs);
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const getAllCustomer = async (req, res) => {
  const page = req.query.page;
  const result = await customerServies.selectAllCustomer(page);
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const getCustomerInfoByUID = async (req, res) => {
  const obj = {
    cus_uuid: req.params.uuid
  }
  const result = await customerServies.selectCustomerByUID(obj)
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const putCustomerPassword = async (req, res) => {
  const obj = {
    cus_uuid: req.body.cus_uuid,
    cus_password: req.body.cus_password,
  };
  const result = await customerServies.changeCustomerPassword(obj)
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const delCustomer = async (req, res) => {
  const obj = {
    cus_uuid: req.params.uuid,
  };
  const result = await customerServies.deleteCustomer(obj)
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const putMathEmpToCustomer = async (req, res) => {
  const obj = {
    cus_id: req.body.cus_id,
    emp_id: req.body.emp_id
  };
  const result = await customerServies.mathEmpForCustomer(obj)
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};
const getCustomerWithoutEmp = async (req, res) => {
  // const page = req.query.page;
  const result = await customerServies.selectCustomerEmpIsNull();
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};
const getCustomerWithEmp = async (req, res) => {
  // const page = req.query.page;
  const result = await customerServies.selectCustomerEmpNotNull();
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const getListCusMatchInEmp = async (req, res) => {
  // const page = req.query.page;
  const result = await customerServies.selectListCusMatchInEmp();
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const getListEmpForUpdate = async (req, res) => {
  const obj = {
    emp_uuid: req.params.emp_uuid
  }
  const result = await customerServies.selectListEmpForUpdate(obj);
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const getListCusForUpdate = async (req, res) => {
  const obj = {
    emp_uuid: req.params.emp_uuid
  }
  const result = await customerServies.selectListCusForUpdate(obj);
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

module.exports = {
  postCreateCustomerUser,
  putUpdateCustomerUser,
  getAllCustomer,
  getCustomerInfoByUID,
  putCustomerPassword,
  delCustomer,
  putMathEmpToCustomer,
  getCustomerWithoutEmp,
  getCustomerWithEmp,
  getListCusMatchInEmp,
  getListEmpForUpdate,
  getListCusForUpdate,
  
};
