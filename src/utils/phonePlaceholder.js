const PHONE_PLACEHOLDERS = {
    ng: "+234 (000) 000-0000",
    us: "+1 (000) 000-0000",
    gb: "+44 (0000) 000000",
    ca: "+1 (000) 000-0000",
    gh: "+233 (000) 000-000",
    ke: "+254 (000) 000000",
    za: "+27 (00) 000-0000",
    fr: "+33 0 00 00 00 00",
    de: "+49 (000) 0000000",
};

export const getPhonePlaceholder = (country) =>
    PHONE_PLACEHOLDERS[country] ||
    "+000 (000) 000-0000";