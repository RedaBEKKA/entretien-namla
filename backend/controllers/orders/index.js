import Order from "../../model/Order.js";
import client from "../../redis/index.js";
const getAllOrders = async (req, res) => {
  try {
    //get data from cache

    let data = [];
    const value = await client.get("orders");
    if (value) {
      data = JSON.parse(value);
    } else {
      //get data from databse
      const orders = await Order.find();
      if (!orders) throw "some thing happen";
      data = orders;

      //set cache
      client.set("orders", JSON.stringify(orders));
    }

    res.status(200).json({
      data,
    });
  } catch (error) {
    throw error;
  }
};
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);
    if (!order) throw "error";
    res.status(200).json({
      order,
    });
  } catch (error) {
    throw error;
  }
};

//create new order
const createOrder = async (req, res) => {
  try {
    const { title, description } = req.body;

    const create = await Order.create({
      title,
      description,
    });

    if (!create) throw "error ";
    res.status(201).json({ create });
  } catch (error) {
    throw error;
  }
};

export { getAllOrders, getOrderById, createOrder };
