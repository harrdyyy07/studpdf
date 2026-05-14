'use client';

import React, { useState, useEffect } from 'react';

const WhatsAppPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasJoined, setHasJoined] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        
        // Check if the user has already joined (Permanent)
        const isJoined = localStorage.getItem('whatsapp_joined') === 'true';
        
        // Check if the user has dismissed it in THIS session (Temporary)
        const dismissedInSession = sessionStorage.getItem('whatsapp_popup_dismissed_session') === 'true';
        
        // Show if they haven't joined AND haven't dismissed it in this session
        if (!isJoined && !dismissedInSession) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                document.body.classList.add('no-scroll');
            }, 5000); // Show after 5 seconds

            return () => {
                clearTimeout(timer);
                document.body.classList.remove('no-scroll');
            };
        }
    }, []);

    const handleJoinClick = () => {
        setHasJoined(true);
        window.open("https://whatsapp.com/channel/0029Vav2A1CEwEk0N2paBj3X", "_blank");
    };

    const handleContinue = () => {
        setIsVisible(false);
        document.body.classList.remove('no-scroll');
        // If they click continue, we assume they joined and we won't show it again (Permanent)
        localStorage.setItem('whatsapp_joined', 'true');
    };

    const closePopup = () => {
        setIsVisible(false);
        document.body.classList.remove('no-scroll');
        // Save dismissal for THIS session only
        sessionStorage.setItem('whatsapp_popup_dismissed_session', 'true');
    };

    if (!hasMounted || !isVisible) return null;

    return (
        <div className="whatsapp-popup-overlay">
            <div className="whatsapp-popup-card">
                <button 
                    className="whatsapp-popup-close" 
                    onClick={closePopup}
                    aria-label="Close"
                >
                    &times;
                </button>

                <div className="whatsapp-popup-header">
                    <div className="whatsapp-icon-wrapper">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                    </div>
                    <div className="whatsapp-popup-info">
                        <h4>Join VTUwise Official</h4>
                        <p>Get latest notes & updates</p>
                    </div>
                </div>
                
                <div className="whatsapp-popup-body">
                    Stay updated with the latest VTU results, premium notes, and model question papers directly on your WhatsApp! 🚀
                </div>
                
                <div className="whatsapp-popup-actions">
                    <button 
                        onClick={handleJoinClick}
                        className="whatsapp-join-btn"
                    >
                        Join Now 🚀
                    </button>
                    
                    {hasJoined && (
                        <button 
                            onClick={handleContinue}
                            className="whatsapp-continue-btn"
                        >
                            I have joined, Continue to Site
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WhatsAppPopup;
