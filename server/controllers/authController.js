import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createAccount, findAccountByEmail, getAllAccounts } from '../models/Account.js';

dotenv.config();

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

// Registration controller
export const register = async (req,res) => {
    try {
        const {account_name, email, phone, password} = req.body;
        

        if (!account_name || !email || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required.'});
        }

        // check if email already exist
        const existingAccount = await findAccountByEmail(email);
        if (existingAccount) {
            return res.status(400).json({ message: 'Email already used' });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        req.body.password = hashedPassword;

        const newAccount = await createAccount(req.body);
        console.log(newAccount);

        return res.status(201).json({
            message: 'Account created successfully!',
            account_id: newAccount.account_id
        })

    } catch (error) {
        console.log(error);
        console.log(req.body);
    }
}

// for future reference: if doesn't run, try changing parameters to (req,res,next)
export const login = async (req,res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required.'});
        }

        const account = await findAccountByEmail(email);
        if (!account) {
            return res.status(400).json({ message: 'Account not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, account.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        // generate token
        const token = jwt.sign(
            {
                account_id: account.account_id,
                is_admin: account.is_admin
            },
            jwtSecret,
            { expiresIn: '1d' } // Token expiry time
        );

        return res.status(200).json({
            status: 1,
            message: 'Login successful',
            token
        })

    } catch (error) {
        console.log(error);
        console.log(req.body)
        return res.status(500).json({ message: 'Internal server error!' });
    }
}

export const returnAllAccounts = async (req,res) => {
    try {
        const allAccounts = await getAllAccounts();
        return res.status(200).json(allAccounts);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error!'});
    }
}