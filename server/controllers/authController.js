import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createAccount, findAccountByEmail, getAccountInfo, getAllAccounts } from "../models/Account.js";
import {createShoppingCart, getShoppingCartByUserId } from "../models/Shopping_Cart.js";

dotenv.config();

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Dữ liệu đăng nhập:", { email, password });

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const account = await findAccountByEmail(email);
        if (!account) {
            return res.status(404).json({ message: "Account not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, account.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        // Kiểm tra và tạo Shopping_Cart nếu chưa có
        let cart = await getShoppingCartByUserId(account.account_id);
        if (!cart) {
            cart = await createShoppingCart(account.account_id);
            console.log("Tạo mới Shopping_Cart cho user:", cart);
        }

        // Tạo token JWT
        const token = jwt.sign(
            {
                account_id: account.account_id,
                cart_id: cart.cart_id,
                is_admin: account.is_admin
            },
            jwtSecret,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            status: 1,
            message: "Login successful",
            token,
            is_admin: account.is_admin,
            user: {
                account_id: account.account_id,
                cart_id: cart.cart_id
            }
        });
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        console.log("Dữ liệu yêu cầu:", req.body);
        return res.status(500).json({ message: "Internal server error!" });
    }
};




export const register = async (req, res) => {
    try {
        const { account_name, email, phone, password } = req.body;

        if (!account_name || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingAccount = await findAccountByEmail(email);
        if (existingAccount) {
            return res.status(400).json({ message: "Email already used" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        req.body.password = hashedPassword;

        const newAccount = await createAccount(req.body);
        console.log("New account:", newAccount);

        let newCart;
        if (newAccount) {
            newCart = await createShoppingCart(newAccount.account_id);
        }

        const token = jwt.sign(
            {
                account_id: newAccount.account_id,
                cart_id: newCart.cart_id,
                is_admin: false
            },
            jwtSecret,
            { expiresIn: "1d" }
        );

        return res.status(201).json({
            status: 1,
            message: "Account created successfully!",
            token
        });
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        console.log("Dữ liệu yêu cầu:", req.body);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

export const returnAllAccounts = async (req, res) => {
    try {
        const allAccounts = await getAllAccounts();
        return res.status(200).json(allAccounts);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách tài khoản:", error);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

export const returnAccountInfo = async (req, res) => {
    try {
        const { account_id } = req.params;
        const info = await getAccountInfo(account_id);
        return res.status(200).json({ info });
    } catch (error) {
        console.error("Lỗi khi lấy thông tin tài khoản:", error);
        return res.status(500).json({ message: "Internal server error!" });
    }
};