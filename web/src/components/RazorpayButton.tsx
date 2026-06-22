'use client';

import React, { useEffect, useRef } from 'react';

interface RazorpayButtonProps {
    buttonId: string;
}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({ buttonId }) => {
    const containerRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear any existing buttons inside this container (e.g. on hot-reloading)
        containerRef.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
        script.setAttribute('data-payment_button_id', buttonId);
        script.async = true;

        containerRef.current.appendChild(script);

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [buttonId]);

    return (
        <form ref={containerRef} className="flex justify-center w-full my-4">
            {/* The Razorpay button script will inject the button inside this form */}
        </form>
    );
};

export default RazorpayButton;
