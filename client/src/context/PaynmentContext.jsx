// src/context/PaymentContext.js
import React, { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export function PaymentProvider({ children }) {
    const [pm_id, setPm_id] = useState(null);

    return (
        <PaymentContext.Provider value={{ pm_id, setPm_id }}>
            {children}
        </PaymentContext.Provider>
    );
}

export function usePayment() {
    return useContext(PaymentContext);
}