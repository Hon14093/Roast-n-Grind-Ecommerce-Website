import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createAccount, findAccountByEmail } from '../models/Account';

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

        const accountData = {
            account_name,
            email,
            phone,
            password: hashedPassword
        };

        const newAccount = await createAccount(accountData);
        console.log(newAccount);

        return res.status(201).json({
            message: 'Account created successfully!',
            account_id: newAccount.account_id
        })

    } catch (error) {
        console.log(error);
    }
}

export const login = async (res,req) => {
    try {
        const {email, paswword} = red.body;

        if (!email || !paswword) {
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
            message: 'Login successful',
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error!' });
    }
}
