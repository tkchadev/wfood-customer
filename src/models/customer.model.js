const { pgDB } = require("../configs/db.connect");

const findUsernameCustomer = async (obj) => {
  sql =
    "SELECT cus_uuid FROM user_customer WHERE cus_username=${cus_username} AND is_deleted != 99";

  try {
    const result = await pgDB.query(sql, obj);
    if (result[0] == undefined || obj.cus_uuid == result[0].cus_uuid) {
      data = {
        status: true,
        message: ``,
        result: [],
      };
    } else {
      data = {
        status: false,
        message: `ชื่อผู้ใช้งานนี้ถูกใช้แล้ว`,
        result: [],
      };
    }

    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const createCustomerInfo = async (obj) => {
  sql =
    "INSERT INTO user_customer(${this:name}) VALUES(${this:csv}) RETURNING id";
  try {
    const result = await pgDB.query(sql, obj);
    if (result[0]) {
      data = {
        status: true,
        message: `Create Success`,
        result: result,
      };
    } else {
      data = {
        status: false,
        message: `Unsuccess`,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const updateCustomerInfo = async (obj) => {
  sql =
    "UPDATE user_customer SET " +
    "cus_username=${cus_username}," +
    "cus_name=${cus_name}," +
    "cus_phone=${cus_phone}," +
    "cus_email=${cus_email}," +
    "cus_comp_name=${cus_comp_name}," +
    "cus_comp_branch=${cus_comp_branch}," +
    "cus_comp_taxid=${cus_comp_taxid}," +
    "cus_comp_phone=${cus_comp_phone}," +
    "cus_comp_no=${cus_comp_no}," +
    "cus_comp_moo=${cus_comp_moo}," +
    "cus_comp_soi=${cus_comp_soi}," +
    "cus_comp_road=${cus_comp_road}," +
    "cus_comp_tambon=${cus_comp_tambon}," +
    "cus_comp_amphoe=${cus_comp_amphoe}," +
    "cus_comp_province=${cus_comp_province}," +
    "cus_comp_postcode=${cus_comp_postcode}," +
    "cus_addr_short=${cus_addr_short}," +
    "updated_at=${updated_at} " +
    "WHERE cus_uuid=${cus_uuid} RETURNING id";

  try {
    const result = await pgDB.query(sql, obj);
    if (result[0]) {
      data = {
        status: true,
        message: `Update Success`,
        result: result[0],
      };
    } else {
      data = {
        status: false,
        message: `Unsuccess`,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const createCustomerAddrs = async (obj) => {
  sql =
    "INSERT INTO customer_addrdelivery(${this:name}) VALUES(${this:csv}) RETURNING id";
  try {
    const result = await pgDB.query(sql, obj);
    if (result[0]) {
      data = {
        status: true,
        message: `Create Success`,
        result: [],
      };
    } else {
      data = {
        status: false,
        message: `Unsuccess (Customer Address)`,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const createCustomerCreditDefault = async (obj) => {
  sql =
    "INSERT INTO customer_credit(${this:name}) VALUES(${this:csv}) RETURNING id";
  try {
    const result = await pgDB.query(sql, obj);
    data = {
      status: true,
      message: `Create Success`,
      result: [],
    };

    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const updateCustomerAddrs = async (obj) => {
  sql =
    "UPDATE customer_addrdelivery SET " +
    "cusaddr_name=${cusaddr_name}," +
    "cusaddr_phone=${cusaddr_phone}," +
    "cusaddr_no=${cusaddr_no}," +
    "cusaddr_moo=${cusaddr_moo}," +
    "cusaddr_soi=${cusaddr_soi}," +
    "cusaddr_road=${cusaddr_road}," +
    "cusaddr_tambon=${cusaddr_tambon}," +
    "cusaddr_amphoe=${cusaddr_amphoe}," +
    "cusaddr_province=${cusaddr_province}," +
    "cusaddr_postcode=${cusaddr_postcode}," +
    "cusaddr_lat=${cusaddr_lat}," +
    "cusaddr_long=${cusaddr_long}," +
    "is_deleted=${is_deleted}," +
    "updated_at=${updated_at} " +
    " WHERE id=${id} RETURNING id";

  try {
    const result = await pgDB.query(sql, obj);
    if (result[0]) {
      data = {
        status: true,
        message: `Update Customer Addr Success`,
        result: result[0],
      };
    } else {
      data = {
        status: false,
        message: `Customer Addr Unsuccess`,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const deleteCustomerInfo = async (obj) => {
  sql =
    "UPDATE user_customer SET is_deleted=99 WHERE cus_uuid=${cus_uuid} RETURNING id";
  try {
    const result = await pgDB.query(sql, obj);
    if (result[0]) {
      data = {
        status: true,
        message: `Delete Success`,
        result: result[0],
      };
    } else {
      data = {
        status: false,
        message: `Unsuccess`,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const deleteCustomerAddr = async (id) => {
  sql = `UPDATE customer_addrdelivery SET is_deleted=99 WHERE id=${id} RETURNING *`;
  try {
    const result = await pgDB.query(sql);
    if (result[0]) {
      data = {
        status: true,
        message: `Delete Success`,
        result: [],
      };
    } else {
      data = {
        status: false,
        message: `Unsuccess`,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const selectAllCustomer = async (page) => {
  const itemsPerPage = 10;
  const offset = (parseInt(page) - 1) * itemsPerPage;
  sql = `SELECT cus_uuid,cus_username,cus_name,cus_addr_short,ref_emp FROM user_customer WHERE is_deleted != 99 LIMIT ${itemsPerPage} OFFSET ${offset}`;

  try {
    const result = await pgDB.query(sql);

    data = {
      status: true,
      message: `Success`,
      result: result,
    };

    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const selectCountCustomer = async (page) => {
  sql = `SELECT COUNT(*) FROM user_customer WHERE is_deleted != 99`;
  let count = await pgDB.query(sql);
  return count[0].count;
};

const selectCountCustomerAddr = async (id) => {
  sql = `SELECT COUNT(*) FROM customer_addrdelivery WHERE ref_cus = ${id} AND is_deleted != 99`;
  let count = await pgDB.query(sql);
  return count[0].count;
};

const selectCustomerInfoByUID = async (obj) => {
  sql =
    "SELECT * FROM user_customer WHERE cus_uuid=${cus_uuid} AND is_deleted != 99";
  try {
    const result = await pgDB.query(sql, obj);
    data = {
      status: true,
      message: `Success`,
      result: result[0],
    };

    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const selectCustomerAddrByUID = async (obj) => {
  sql =
    "SELECT * FROM customer_addrdelivery WHERE ref_cus=${ref_cus} AND is_deleted != 99";
  try {
    const result = await pgDB.query(sql, obj);
    data = {
      status: true,
      message: `Success`,
      result: result,
    };

    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const updateCustomerPassword = async (obj) => {
  sql =
    "UPDATE user_customer SET cus_password=${cus_password} WHERE cus_uuid=${cus_uuid} RETURNING *";
  try {
    const result = await pgDB.query(sql, obj);
    if (result[0]) {
      data = {
        status: true,
        message: `Change Password Success`,
        result: [],
      };
    } else {
      data = {
        status: false,
        message: `Unsuccess`,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

// Start Process In Customer

// one emp --> many cus
const updateEmpOfCustomer = async (obj) => {
  sql =
    "UPDATE user_customer SET ref_emp=${ref_emp} WHERE id=${cus_id} RETURNING id";
  try {
    const result = await pgDB.query(sql, obj);
    if (result[0]) {
      data = {
        status: true,
        message: `Update Success`,
        result: [],
      };
    } else {
      data = {
        status: false,
        message: `Unsuccess`,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};
const selectCustomerEmpIsNull = async () => {
  let t = null;
  sql = `SELECT id,cus_name FROM user_customer WHERE ref_emp IS NULL AND is_deleted != 99`;
  try {
    let result = await pgDB.query(sql);
    if (result[0]) {
      data = {
        status: true,
        message: `Select Success`,
        result: result,
      };
    } else {
      data = {
        status: true,
        message: ``,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};
const selectCustomerEmpNotNull = async () => {
  sql = `SELECT id,cus_name FROM user_customer WHERE ref_emp IS NOT NULL AND is_deleted != 99 `;
  try {
    let result = await pgDB.query(sql);
    if (result[0]) {
      data = {
        status: true,
        message: `Select Success`,
        result: result,
      };
    } else {
      data = {
        status: true,
        message: ``,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

// End Process In Customer

const selectEmpSales = async () => {
  sql = `SELECT id,emp_uuid,emp_name FROM user_emp WHERE emp_role = 3 AND is_deleted != 99 `;
  try {
    let result = await pgDB.query(sql);

    if (result[0]) {
      data = {
        status: true,
        message: `Select Success`,
        result: result,
      };
    } else {
      data = {
        status: false,
        message: `ไม่พบข้อมูล`,
        result: [],
      };
    }

    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const selectCustomerByEmpID = async (id) => {
  sql = `SELECT cus_username,cus_name,cus_phone FROM user_customer WHERE ref_emp = ${id} AND is_deleted != 99 `;
  try {
    let result = await pgDB.query(sql);

    if (result[0]) {
      data = {
        status: true,
        message: `Select Success`,
        result: result,
      };
    } else {
      data = {
        status: false,
        message: `ไม่พบข้อมูล`,
        result: [],
      };
    }

    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};


// จัดการลูกค้า-จัดการจับคู่ แก้ไขรายการ

const findEmpIDByUUID = async (obj) => {
  sql = "SELECT id FROM user_emp WHERE emp_uuid = ${emp_uuid} AND is_deleted != 99 AND emp_role = 3";

  try {
    const result = await pgDB.query(sql, obj);
    if (result[0]) {
      data = {
        status: true,
        message: ``,
        result: result[0],
      };
    } else {
      data = {
        status: false,
        message: `ไม่พบข้อมูล`,
        result: [],
      };
    }

    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const selectSaleEmpSelfForUpdate = async (id) => {
  sql = `SELECT id,emp_name FROM user_emp WHERE id = ${id} AND is_deleted != 99 AND emp_role = 3`;

  try {
    const result = await pgDB.query(sql);
    if (result[0]) {
      data = {
        status: true,
        message: ``,
        result: result,
      };
    } else {
      data = {
        status: false,
        message: `ไม่พบข้อมูล`,
        result: [],
      };
    }

    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const selectSaleEmpAllForUpdate = async (id) => {
  sql = `SELECT id,emp_name FROM user_emp WHERE id != ${id} AND is_deleted != 99 AND emp_role = 3 ORDER BY emp_name ASC`;

  try {
    const result = await pgDB.query(sql);
    if (result[0]) {
      data = {
        status: true,
        message: ``,
        result: result,
      };
    } else {
      data = {
        status: false,
        message: `ไม่พบข้อมูล`,
        result: [],
      };
    }

    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const selectCusEmpSelfForUpdate = async (id) => {
  sql = `SELECT id,cus_name FROM user_customer WHERE ref_emp = ${id} AND is_deleted != 99`;

  try {
    const result = await pgDB.query(sql);
    if (result[0]) {
      data = {
        status: true,
        message: ``,
        result: result,
      };
    } else {
      data = {
        status: false,
        message: `ไม่พบข้อมูล`,
        result: [],
      };
    }

    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const selectCusEmpAllForUpdate = async (id) => {
  sql = `SELECT id,cus_name FROM user_customer WHERE ref_emp IS NULL AND is_deleted != 99 ORDER BY cus_name ASC`;

  try {
    const result = await pgDB.query(sql);
    if (result[0]) {
      data = {
        status: true,
        message: ``,
        result: result,
      };
    } else {
      data = {
        status: false,
        message: `ไม่พบข้อมูล`,
        result: [],
      };
    }

    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};


// -----------------

module.exports = {
  findUsernameCustomer,
  createCustomerInfo,
  updateCustomerInfo,
  createCustomerAddrs,
  createCustomerCreditDefault,
  updateCustomerAddrs,
  deleteCustomerInfo,
  deleteCustomerAddr,
  selectAllCustomer,
  selectCountCustomer,
  selectCountCustomerAddr,
  selectCustomerInfoByUID,
  selectCustomerAddrByUID,
  updateCustomerPassword,
  updateEmpOfCustomer,
  selectCustomerEmpIsNull,
  selectCustomerEmpNotNull,
  selectEmpSales,
  selectCustomerByEmpID,
  findEmpIDByUUID,
  selectSaleEmpSelfForUpdate,
  selectSaleEmpAllForUpdate,
  selectCusEmpSelfForUpdate,
  selectCusEmpAllForUpdate
};
