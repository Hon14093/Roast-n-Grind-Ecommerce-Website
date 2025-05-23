-- CreateTable
CREATE TABLE "Account" (
    "account_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "account_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "Account_Payment_Method" (
    "apm_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "provider" VARCHAR(60) NOT NULL,
    "account_number" VARCHAR(50) NOT NULL,
    "expiry_date" DATE NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "account_id" UUID NOT NULL,
    "method_id" INTEGER NOT NULL,

    CONSTRAINT "Account_Payment_Method_pkey" PRIMARY KEY ("apm_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "address_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "unit_number" VARCHAR(10) NOT NULL,
    "street_number" VARCHAR(100) NOT NULL,
    "address_line1" VARCHAR(100) NOT NULL,
    "address_line2" VARCHAR(100),
    "city" VARCHAR(50) NOT NULL,
    "region" VARCHAR(50),
    "postal_code" VARCHAR(10) NOT NULL,
    "country_id" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "Aroma" (
    "aroma_id" SERIAL NOT NULL,
    "aroma_name" VARCHAR(60) NOT NULL,

    CONSTRAINT "Aroma_pkey" PRIMARY KEY ("aroma_id")
);

-- CreateTable
CREATE TABLE "Cart_Details" (
    "cd_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "quantity" INTEGER NOT NULL,
    "cart_id" UUID NOT NULL,
    "pw_id" UUID NOT NULL,

    CONSTRAINT "Cart_Details_pkey" PRIMARY KEY ("cd_id")
);

-- CreateTable
CREATE TABLE "Country" (
    "country_id" SERIAL NOT NULL,
    "country_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "Discount" (
    "discount_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "discount_code" VARCHAR(15) NOT NULL,
    "discount_value" REAL NOT NULL,
    "max_discount_amount" REAL NOT NULL,
    "min_order_amount" REAL NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("discount_id")
);

-- CreateTable
CREATE TABLE "Flavour_Note" (
    "flavour_id" SERIAL NOT NULL,
    "flavour_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Flavour_Note_pkey" PRIMARY KEY ("flavour_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "order_date" TIMESTAMP(6) NOT NULL,
    "order_total" REAL NOT NULL,
    "note" VARCHAR(1024),
    "account_id" UUID NOT NULL,
    "shipping_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "discount_id" UUID NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "Order_Details" (
    "od_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "quantity" INTEGER NOT NULL,
    "subtotal" REAL NOT NULL,
    "is_ground" BOOLEAN NOT NULL,
    "order_id" UUID NOT NULL,
    "pw_id" UUID NOT NULL,

    CONSTRAINT "Order_Details_pkey" PRIMARY KEY ("od_id")
);

-- CreateTable
CREATE TABLE "Order_Status" (
    "status_id" SERIAL NOT NULL,
    "status_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Order_Status_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "Payment_Method" (
    "method_id" SERIAL NOT NULL,
    "method_name" VARCHAR(60) NOT NULL,

    CONSTRAINT "Payment_Method_pkey" PRIMARY KEY ("method_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "product_name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(200),
    "image_url" VARCHAR(200) NOT NULL,
    "roast_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "aroma_id" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Product_Flavour" (
    "product_id" UUID NOT NULL,
    "flavour_id" INTEGER NOT NULL,

    CONSTRAINT "Product_Flavour_pkey" PRIMARY KEY ("product_id","flavour_id")
);

-- CreateTable
CREATE TABLE "Product_Type" (
    "type_id" SERIAL NOT NULL,
    "type_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "product_type_pkey" PRIMARY KEY ("type_id")
);

-- CreateTable
CREATE TABLE "Product_Weight" (
    "pw_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "product_price" REAL NOT NULL,
    "qty_in_stock" INTEGER NOT NULL,
    "weight_id" INTEGER NOT NULL,
    "product_id" UUID NOT NULL,

    CONSTRAINT "Product_Weight_pkey" PRIMARY KEY ("pw_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "review_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "review_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "star" INTEGER NOT NULL,
    "comment" VARCHAR(1000),
    "product_id" UUID NOT NULL,
    "account_id" UUID NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "Shipping_Method" (
    "shipping_id" SERIAL NOT NULL,
    "shipping_method" VARCHAR(50) NOT NULL,
    "shipping_price" REAL NOT NULL,

    CONSTRAINT "Shipping_Method_pkey" PRIMARY KEY ("shipping_id")
);

-- CreateTable
CREATE TABLE "Shopping_Cart" (
    "cart_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "account_id" UUID NOT NULL,

    CONSTRAINT "Shopping_Cart_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "User_Address" (
    "ua_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "is_defeault" BOOLEAN NOT NULL DEFAULT false,
    "account_id" UUID NOT NULL,
    "address_id" UUID NOT NULL,

    CONSTRAINT "User_Address_pkey" PRIMARY KEY ("ua_id")
);

-- CreateTable
CREATE TABLE "Weight_Option" (
    "weight_id" SERIAL NOT NULL,
    "weight_name" VARCHAR(15) NOT NULL,

    CONSTRAINT "Weight_Option_pkey" PRIMARY KEY ("weight_id")
);

-- CreateTable
CREATE TABLE "Coffee_Bean" (
    "bean_id" SERIAL NOT NULL,
    "bean_name" VARCHAR(60) NOT NULL,

    CONSTRAINT "Coffee_Beans_pkey" PRIMARY KEY ("bean_id")
);

-- CreateTable
CREATE TABLE "Product_Blend" (
    "product_id" UUID NOT NULL,
    "bean_id" INTEGER NOT NULL,

    CONSTRAINT "Product_Blend_pkey" PRIMARY KEY ("product_id","bean_id")
);

-- CreateTable
CREATE TABLE "Roast_Level" (
    "roast_id" SERIAL NOT NULL,
    "roast_lvl" VARCHAR(50) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("roast_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_unique" ON "Account"("email");

-- AddForeignKey
ALTER TABLE "Account_Payment_Method" ADD CONSTRAINT "fk_account_1" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account_Payment_Method" ADD CONSTRAINT "fk_payment_2" FOREIGN KEY ("method_id") REFERENCES "Payment_Method"("method_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "fk_country" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Details" ADD CONSTRAINT "fk_cart_details_1" FOREIGN KEY ("cart_id") REFERENCES "Shopping_Cart"("cart_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Details" ADD CONSTRAINT "fk_cart_details_2" FOREIGN KEY ("pw_id") REFERENCES "Product_Weight"("pw_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "fk_account_order" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "fk_discount" FOREIGN KEY ("discount_id") REFERENCES "Discount"("discount_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "fk_shipping" FOREIGN KEY ("shipping_id") REFERENCES "Shipping_Method"("shipping_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "fk_status" FOREIGN KEY ("status_id") REFERENCES "Order_Status"("status_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Details" ADD CONSTRAINT "fk_order_details_1" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Details" ADD CONSTRAINT "fk_order_details_2" FOREIGN KEY ("pw_id") REFERENCES "Product_Weight"("pw_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "fk_aroma" FOREIGN KEY ("aroma_id") REFERENCES "Aroma"("aroma_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "fk_product_type" FOREIGN KEY ("type_id") REFERENCES "Product_Type"("type_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "fk_roast_lvl" FOREIGN KEY ("roast_id") REFERENCES "Roast_Level"("roast_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Flavour" ADD CONSTRAINT "fk_flavour_to_product" FOREIGN KEY ("flavour_id") REFERENCES "Flavour_Note"("flavour_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Flavour" ADD CONSTRAINT "fk_product_to_flavour" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Weight" ADD CONSTRAINT "fk_product_to_weight" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Weight" ADD CONSTRAINT "fk_weight_to_product" FOREIGN KEY ("weight_id") REFERENCES "Weight_Option"("weight_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "fk_account_review" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "fk_product_review" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shopping_Cart" ADD CONSTRAINT "fk_account_cart" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Address" ADD CONSTRAINT "fk_account_to_address" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Address" ADD CONSTRAINT "fk_address_to_account" FOREIGN KEY ("address_id") REFERENCES "Address"("address_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Blend" ADD CONSTRAINT "fk_bean_to_product" FOREIGN KEY ("bean_id") REFERENCES "Coffee_Bean"("bean_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Blend" ADD CONSTRAINT "fk_product_to_bean" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Order" ADD COLUMN "address_id" UUID;
ALTER TABLE "Order" ADD CONSTRAINT "fk_address" FOREIGN KEY ("address_id") REFERENCES "Address"("address_id") ON DELETE SET NULL ON UPDATE CASCADE;
-- Lưu lại lịch sử giao dịch VN Pay
CREATE TABLE "Payment_Transaction" (
  "transaction_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "order_id" UUID NOT NULL,
  "txn_ref" VARCHAR(50) NOT NULL,
  "amount" REAL NOT NULL,
  "response_code" VARCHAR(10) NOT NULL,
  "transaction_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Payment_Transaction_pkey" PRIMARY KEY ("transaction_id"),
  CONSTRAINT "fk_order" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE
);