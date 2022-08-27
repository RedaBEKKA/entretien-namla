import Supplier from "../../model/Supplier.js";

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    if (!suppliers) throw "some thing happen";
    res.status(200).json({
      suppliers,
    });
  } catch (error) {
    throw error;
  }
};
const getSupplierById = async (req, res) => {
  try {
    const supplierId = req.params.supplierId;

    const supplier = await Supplier.findById(supplierId);
    if (!supplier) throw "error";
    res.status(200).json({
      supplier,
    });
  } catch (error) {
    throw error;
  }
};

const createSupplier = async (req, res) => {
  try {
    const { name, email } = req.body;

    const create = await Supplier.create({
      name,
      email,
    });

    if (!create) throw "error ";
    res.status(201).json({ create });
  } catch (error) {
    throw error;
  }
};

export { getAllSuppliers, getSupplierById, createSupplier };
