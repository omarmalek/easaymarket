import React from "react";
import { useGlobalContext } from "../context";
import { FaTimes } from "react-icons/fa";

const OrderDetails = ({ currentOrder, role, setShowOrderDetials }) => {
  const { updateOrder } = useGlobalContext();
  console.log("currentOrder: >> ");
  console.log(currentOrder);
  const {
    id,
    // customerId,
    // orderSetterId,
    // deliveryManId,
    // delivaryCharge,
    cartTotal,
    date,
    // paymentType,
    delivaryServiceType,
    packed,
    sentDelivery,
    delivered,
    // paid,
    cancelled,
    rejected,
    // customerEvaluation,
    // controlNotes,
    customerName,
    customerPhone,
    customerAddress,
  } = currentOrder;
  return (
    <div className="order-view-details-component">
      <div className="header">
        <button
          className="btn form-close"
          onClick={() => {
            setShowOrderDetials(false);
          }}
        >
          <FaTimes />
        </button>
        <h1>تفاصيل الطلبية</h1>
        {/* <i className="somelogo">
          <span>number of new orders</span>
        </i> */}
      </div>
      <div className="order-details" id="order-details">
        <form>
          <div className=" row1 row">
            <div className="form-item">
              <label htmlFor="">رقم الطلبية </label>
              <input type="text" value={id} readOnly />
            </div>
            <div className="form-item">
              <label htmlFor="">اسم الزبون</label>
              <input type="text" value={customerName} readOnly />
            </div>
            <div className="form-item">
              <label>مبلغ الطلبية </label>
              <input type="text" value={cartTotal} readOnly />
            </div>
            <div className="form-item">
              <label> وقت الطلب</label>
              <input type="text" value={date} readOnly />
            </div>
          </div>
          <div className=" row2 row">
            <div className="form-item">
              <label htmlFor=""> تم التحضير </label>
              <input type="text" value={packed ? "yes" : "No"} readOnly />
            </div>
            <div className="form-item">
              <label htmlFor=""> ارسلت ديليفري </label>
              <input type="text" value={sentDelivery ? "yes" : "No"} readOnly />
            </div>
            <div className="form-item">
              <label htmlFor=""> تم التسليم</label>
              <input type="text" value={delivered ? "yes" : "No"} readOnly />
            </div>
            <div className="form-item">
              <label> ملغاة </label>
              <input type="text" value={cancelled ? "yes" : "No"} readOnly />
            </div>
            <div className="form-item">
              <label> مرفوضة </label>
              <input type="text" value={rejected ? "yes" : "No"} readOnly />
            </div>
          </div>
          <div className=" row3 row">
            <div className="form-item">
              <label> فئة التوصيل</label>
              <input type="text" value={delivaryServiceType} readOnly />
            </div>
            <div className="form-item">
              <label> الهاتف</label>
              <input type="text" value={customerPhone} readOnly />
            </div>
          </div>
          <div className=" row4 row">
            <div className="form-item">
              <label> العنوان</label>
              <input type="text" value={customerAddress} readOnly />
            </div>
          </div>
          <div className="control-control-btns ">
            {(role === "admin" || role === "setter") && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                طباعة <i className="fa fa-print"></i>
              </button>
            )}
            {(role === "admin" || role === "setter") && (
              <button
                onClick={() => {
                  updateOrder(currentOrder, "packed");
                }}
              >
                تم التحضير <i className="fa-solid fa-person-carry-box"></i>
              </button>
            )}
            {(role === "admin" || role === "setter") && (
              <button onClick={() => updateOrder(currentOrder, "sentDelivery")}>
                تم التسليم الى الديليفري
              </button>
            )}
            {(role === "admin" || role === "delivery") && (
              <button onClick={() => updateOrder(currentOrder, "delivered")}>
                تم التوصيل الى الزبون
              </button>
            )}
            {role === "admin" && (
              <button onClick={() => updateOrder(currentOrder, "rejected")}>
                {/**is this right */}
                رفض العملية
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="order-cart">
        <table className="table">
          <thead>
            <tr>
              <th>م</th>
              <th>الصنف</th>
              <th>الكمية</th>
              <th>السعر</th>
              <th>المجموع</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentOrder.orderCart
              ? currentOrder.orderCart.map((item, index) => {
                  const {
                    id,
                    // productId,
                    productName,
                    unitPrice,
                    productAmount,
                    packType,
                  } = item;
                  let sumOfRow = 0;
                  sumOfRow = unitPrice * productAmount;
                  sumOfRow = parseFloat(sumOfRow.toFixed(2));
                  return (
                    <tr key={id}>
                      <td className="counter">
                        <span id="counter"></span>
                      </td>
                      <td>{productName}</td>
                      <td>{productAmount + " " + packType}</td>
                      <td>
                        {unitPrice}
                        <span> شيقل</span>
                      </td>
                      <td>
                        {sumOfRow} <i className="fa-solid fa-shekel-sign"></i>
                      </td>
                      <td>
                        <button
                          className="remov-btn"
                          // onClick={() => deleteFromCart(product.productId)}
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrderDetails;
