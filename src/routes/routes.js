const router = require("express").Router();
const customerController = require("../controllers/customer.controller");
const jwt = require("../helper/jwt");

router.post("/create", jwt.verifyToken, customerController.postCreateCustomerUser);
router.put("/update", jwt.verifyToken, customerController.putUpdateCustomerUser);
router.delete("/delete/:uuid", jwt.verifyToken, customerController.delCustomer);
router.get("/list", jwt.verifyToken, customerController.getAllCustomer);
router.get("/info/:uuid", jwt.verifyToken, customerController.getCustomerInfoByUID);
router.put("/change-password", jwt.verifyToken, customerController.putCustomerPassword);

router.put("/match/emp", jwt.verifyToken, customerController.putMathEmpToCustomer);
router.get("/without/emp", jwt.verifyToken, customerController.getCustomerWithoutEmp);
router.get("/with/emp", jwt.verifyToken, customerController.getCustomerWithEmp);
router.get("/list/matchemp", jwt.verifyToken, customerController.getListCusMatchInEmp);

// จัดการลูกค้า-จัดการจับคู่ แก้ไขรายการ

router.get("/list/cusupdate/:emp_uuid", jwt.verifyToken, customerController.getListCusForUpdate);
router.get("/list/empupdate/:emp_uuid", jwt.verifyToken, customerController.getListEmpForUpdate);


module.exports = router;
