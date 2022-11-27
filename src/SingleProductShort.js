import React, { useState } from "react";
import { useGlobalContext } from "./context";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import noProductImg from "./images/no product image.png";
// import { AiOutlineCheck } from "react-icons/ai";

const SingleProduct = ({ product }) => {
  const {
    updateProductQuantity,
    buyProduct,
    decreasProductAmount,
    cart,
    getQuantity,
    deleteFromCart,
  } = useGlobalContext();

  const [showSecondaryInfo, setShowSecondaryInfo] = React.useState(false);

  const {
    id,
    name,
    unitPrice,
    img,
    weight,
    country,
    desc,
    company,
    productImages,
  } = product;

  // console.log("--------------productImages---------------");
  // console.log(productImages);

  let image = "";
  if (!img) {
    if (productImages[0]) {
      image = "data:image/jpeg;base64," + productImages[0].picByte;
    }
  }
  let amount = 0;
  amount = getQuantity(id);
  // console.log("SingleProductShort component >> amount is: " + amount);
  const toggleInfoSecondry = () => {
    setShowSecondaryInfo(!showSecondaryInfo);
    window.addEventListener("scroll", function () {
      setShowSecondaryInfo(false);
    });
  };

  // console.log("SingleProductShort component >> running... ");
  return (
    <div key={id} className="single-product-short row">
      <div
        className={amount > 0 ? "photo-and-basic choosen" : "photo-and-basic"}
      >
        <div className="img-container ">
          <img src={img || image || noProductImg} alt="product" />
          {/* <i class="fa-solid fa-award"></i> */}
          {/* <i class="fa-solid fa-badge-percent"></i> */}
        </div>
        <div className={"product-details row "}>
          <div className={amount > 0 ? "info incart " : "info"}>
            <h2 className="info--name ">{name}</h2>
            <h3 className="info--price">
              {unitPrice} <i className="fa-solid fa-shekel-sign"></i>
            </h3>
            {weight && <h4 className="info--weight">الوزن : {weight}</h4>}
            <button
              className="btn extra-details-btn"
              onClick={toggleInfoSecondry}
            >
              التفاصيل
            </button>
          </div>
          <div className="control ">
            <button
              className={amount > 0 ? "btn gone" : "btn"}
              onClick={() => buyProduct(product)}
            >
              Buy
            </button>
            <button
              className={amount == 0 ? "fa fa-trash btn gone" : "btn cancel"}
              onClick={() => deleteFromCart(id)}
            >
              Cancel
            </button>
            <div className="under-btn ">
              <button onClick={() => decreasProductAmount(product)}>-</button>
              <input
                type="text"
                value={amount}
                onChange={updateProductQuantity}
              />
              <button onClick={() => buyProduct(product)}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          showSecondaryInfo
            ? "info-secondary show-info-secondary"
            : "info-secondary"
        }
      >
        <button
          className="close-info-secondary fa fa-times"
          onClick={toggleInfoSecondry}
        ></button>
        {company && <h3 className="info--company">الشركة : {company}</h3>}
        {country && <p className="info--country">بلد المنشأ : {country}</p>}
        {desc && <p className="info--desc">الوصف : {desc}</p>}
      </div>
    </div>
  );
};
export default SingleProduct;
