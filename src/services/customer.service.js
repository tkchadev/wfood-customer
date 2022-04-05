const customerModel = require("../models/customer.model");
const bcrypt = require("bcryptjs");
const jwt = require("../helper/jwt");
const moment = require("moment");

const createCustomerUser = async (obj, addrs) => {
  let result = await customerModel.findUsernameCustomer(obj);
  if (!result.status) {
    return result;
  }
  obj.cus_password = await bcrypt.hash(obj.cus_password, 8);
  let resCus = await customerModel.createCustomerInfo(obj);
  if (!resCus.status) {
    return resCus;
  }

  // Add credit auto default type 1
  let objCredit = {
    credit_type: 1,
    credit_status: 1,
    ref_cus: resCus.result[0].id,
  };
  let resCredit = await customerModel.createCustomerCreditDefault(objCredit);
  if (!resCredit.status) {
    return resCredit;
  }
  // ---

  for (let i in addrs.cus_addrdelivery) {
    let objAddr = addrs.cus_addrdelivery[i];
    objAddr["ref_cus"] = resCus.result[0].id;

    let resAddr = await customerModel.createCustomerAddrs(objAddr);
    if (!resAddr.status) {
      return resAddr;
    }
  }
  return resCus;
};

const updateCustomerUser = async (obj, addrs) => {
  let result = await customerModel.findUsernameCustomer(obj);
  if (!result.status) {
    return result;
  }
  let resInfo = await customerModel.updateCustomerInfo(obj);
  if (!resInfo.status) {
    return resInfo;
  }

  // console.log(resInfo.result.id);
  // console.log(addrs.cus_addrdelivery.length);

  for (let i = 0; i < addrs.cus_addrdelivery.length; i++) {
    let addr = addrs.cus_addrdelivery[i];
    addr["updated_at"] = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    if (parseInt(addr.id) != 0) {
      let resAddr = await customerModel.updateCustomerAddrs(addr);
      if (!resAddr.status) {
        return resAddr;
      }
    } else {
      if (parseInt(addr.is_deleted) != 99) {
        let data = {
          cusaddr_name: addr.cusaddr_name,
          cusaddr_phone: addr.cusaddr_phone,
          cusaddr_no: addr.cusaddr_no,
          cusaddr_moo: addr.cusaddr_moo,
          cusaddr_soi: addr.cusaddr_soi,
          cusaddr_road: addr.cusaddr_road,
          cusaddr_tambon: addr.cusaddr_tambon,
          cusaddr_amphoe: addr.cusaddr_amphoe,
          cusaddr_province: addr.cusaddr_province,
          cusaddr_postcode: addr.cusaddr_postcode,
          cusaddr_lat: addr.cusaddr_lat,
          cusaddr_long: addr.cusaddr_long,
          ref_cus: resInfo.result.id,
        };
        let resAddr = await customerModel.createCustomerAddrs(data);
        if (!resAddr.status) {
          return resAddr;
        }
      }
    }
  }

  return resInfo;
};

const selectAllCustomer = async (page) => {
  const itemsPerPage = 10;
  if (!page) {
    return { status: false, message: `No Page` };
  }
  let count = await customerModel.selectCountCustomer();
  let result = await customerModel.selectAllCustomer(page);
  if (!result.status) {
    return result;
  }
  let pageCount = Math.ceil(parseFloat(count) / itemsPerPage);
  let data = {
    status: result.status,
    message: result.message,
    result: {
      page_count: pageCount,
      page_current: parseInt(page),
      data: result.result,
    },
  };
  return data;
};

const selectCustomerByUID = async (obj) => {
  let resInfo = await customerModel.selectCustomerInfoByUID(obj);
  if (!resInfo.status) {
    return resInfo;
  }

  let objInfo = {
    ref_cus: resInfo.result.id,
  };
  let resAddr = await customerModel.selectCustomerAddrByUID(objInfo);
  if (!resAddr.status) {
    return resAddr;
  }

  let cusInfo = {
    cus_uuid: resInfo.result.cus_uuid,
    cus_username: resInfo.result.cus_username,
    cus_type: resInfo.result.cus_type,
    cus_name: resInfo.result.cus_name,
    cus_phone: resInfo.result.cus_phone,
    cus_email: resInfo.result.cus_email,
    cus_comp_name: resInfo.result.cus_comp_name,
    cus_comp_branch: resInfo.result.cus_comp_branch,
    cus_comp_taxid: resInfo.result.cus_comp_taxid,
    cus_comp_phone: resInfo.result.cus_comp_phone,
    cus_comp_no: resInfo.result.cus_comp_no,
    cus_comp_moo: resInfo.result.cus_comp_moo,
    cus_comp_soi: resInfo.result.cus_comp_soi,
    cus_comp_road: resInfo.result.cus_comp_road,
    cus_comp_tambon: resInfo.result.cus_comp_tambon,
    cus_comp_amphoe: resInfo.result.cus_comp_amphoe,
    cus_comp_province: resInfo.result.cus_comp_province,
    cus_comp_postcode: resInfo.result.cus_comp_postcode,
    cus_addr_short: resInfo.result.cus_addr_short,
  };

  let data = {
    status: true,
    message: `Success`,
    result: {
      customer_info: cusInfo,
      customer_addr: resAddr.result,
    },
  };

  return data;
};

const changeCustomerPassword = async (obj) => {
  obj.cus_password = await bcrypt.hash(obj.cus_password, 8);
  return await customerModel.updateCustomerPassword(obj);
};

const deleteCustomer = async (obj) => {
  let resInfo = await customerModel.deleteCustomerInfo(obj);
  if (!resInfo.status) {
    return resInfo;
  }
  let resAddr = await customerModel.selectCustomerAddrByUID({
    ref_cus: resInfo.result.id,
  });
  for (i = 0; i < resAddr.result.length; i++) {
    await customerModel.deleteCustomerAddr(resAddr.result[i].id);
  }

  let data = {
    status: true,
    message: "Delete Success",
    result: {},
  };

  return data;
};

const mathEmpForCustomer = async (obj) => {
  for (let i = 0; i < obj.cus_id.length; i++) {
    let data = {
      cus_id: obj.cus_id[i],
      ref_emp: obj.emp_id,
    };
    let result = await customerModel.updateEmpOfCustomer(data);
    if (!result.status) {
      return result;
    }
  }
  let data = {
    status: true,
    message: "Success",
    result: {},
  };
  return data;
};

const selectCustomerEmpIsNull = async () => {
  let result = await customerModel.selectCustomerEmpIsNull();
  return result;
};

const selectCustomerEmpNotNull = async () => {
  let result = await customerModel.selectCustomerEmpNotNull();
  return result;
};

const selectListCusMatchInEmp = async () => {
  let resEmp = await customerModel.selectEmpSales();
  if (!resEmp.status) {
    return resEmp;
  }

  let emps = resEmp.result;

  let arr = [];
  for (let i = 0; i < emps.length; i++) {
    let resCus = await customerModel.selectCustomerByEmpID(emps[i].id);
    if (resCus.status) {
      let data = {
        emp_uuid: emps[i].emp_uuid,
        emp_name: emps[i].emp_name,
        customer_list: resCus.result,
      };
      arr.push(data);
    }
  }

  let data = {
    status: true,
    message: `Select Success`,
    result: arr,
  };

  return data;
};

const selectListEmpForUpdate = async (obj) => {
  let resEmp = await customerModel.findEmpIDByUUID(obj);
  if (!resEmp.status) {
    return resEmp;
  }

  //  get empself
  let resEmpSelf = await customerModel.selectSaleEmpSelfForUpdate(
    resEmp.result.id
  );
  if (!resEmpSelf.status) {
    return resEmpSelf;
  }

  let arr = [];

  let empSelf = resEmpSelf.result;
  for (let i = 0; i < empSelf.length; i++) {
    let data = {
      id: empSelf[i].id,
      emp_name: empSelf[i].emp_name,
      status: true,
    };
    arr.push(data);
  }

  // get emp other
  let resEmpAll = await customerModel.selectSaleEmpAllForUpdate(
    resEmp.result.id
  );
  if (!resEmpAll.status) {
    return resEmpAll;
  }
  let empAll = resEmpAll.result;
  for (let i = 0; i < empAll.length; i++) {
    let data = {
      id: empAll[i].id,
      emp_name: empAll[i].emp_name,
      status: false,
    };
    arr.push(data);
  }

  let data = {
    status: true,
    message: `Success`,
    result: arr,
  };

  return data
};

const selectListCusForUpdate = async (obj) => {
  let resEmp = await customerModel.findEmpIDByUUID(obj);
  if (!resEmp.status) {
    return resEmp;
  }

  //  get empself
  let resCusEmpSelf = await customerModel.selectCusEmpSelfForUpdate(
    resEmp.result.id
  );
  if (!resCusEmpSelf.status) {
    return resCusEmpSelf;
  }

  let arr = [];

  let cusEmpSelf = resCusEmpSelf.result;
  for (let i = 0; i < cusEmpSelf.length; i++) {
    let data = {
      id: cusEmpSelf[i].id,
      cus_name: cusEmpSelf[i].cus_name,
      status: true,
    };
    arr.push(data);
  }

  // get emp other
  let resCusEmpAll = await customerModel.selectCusEmpAllForUpdate(
    resEmp.result.id
  );
  if (!resCusEmpAll.status) {
    return resCusEmpAll;
  }
  let cusEmpAll = resCusEmpAll.result;
  for (let i = 0; i < cusEmpAll.length; i++) {
    let data = {
      id: cusEmpAll[i].id,
      cus_name: cusEmpAll[i].cus_name,
      status: false,
    };
    arr.push(data);
  }

  let data = {
    status: true,
    message: `Success`,
    result: arr,
  };

  return data
};

module.exports = {
  createCustomerUser,
  updateCustomerUser,
  selectAllCustomer,
  selectCustomerByUID,
  changeCustomerPassword,
  deleteCustomer,
  mathEmpForCustomer,
  selectCustomerEmpIsNull,
  selectCustomerEmpNotNull,
  selectListCusMatchInEmp,
  selectListEmpForUpdate,
  selectListCusForUpdate
};
