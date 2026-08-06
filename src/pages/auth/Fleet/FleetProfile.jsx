import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import AuthInput from "@/components/auth/AuthInput";
import Button from "@/components/ui/Button";

import { ROUTES } from "@/constants/routes";

const FleetProfile = () => {

    const navigate = useNavigate();

    const { state } = useLocation();

    const [businessAddress, setBusinessAddress] = useState("");

    const [operatingCities, setOperatingCities] = useState("");

    const [bankName, setBankName] = useState("");

    const [accountNumber, setAccountNumber] = useState("");

    const [accountName, setAccountName] = useState("");

    const isValid = [

        businessAddress,

        operatingCities,

        bankName,

        accountNumber,

        accountName,

    ].every(value => value.trim());

    const handleContinue = () => {

        navigate(

            ROUTES.FLEET_SUCCESS,

            {

                state: {

                    ...state,

                    businessAddress,

                    operatingCities,

                    bankName,

                    accountNumber,

                    accountName,

                },

            }

        );

    };

    return (

        <AuthContainer>

            <AuthBackButton />

            <AuthProgressBar

                current={5}

                total={5}

            />

            <AuthHeader

                stacked

                darkText="Complete"

                lightText="your profile"

                description="Help us set up your fleet account."

            />

            <div className="space-y-5 mt-8">

                <AuthInput

                    label="Business Address"

                    placeholder="Enter business address"

                    value={businessAddress}

                    onChange={(e) =>

                        setBusinessAddress(e.target.value)

                    }

                />

                <AuthInput

                    label="Operating Cities"

                    placeholder="e.g Lagos, Abuja"

                    value={operatingCities}

                    onChange={(e) =>

                        setOperatingCities(e.target.value)

                    }

                />

                <AuthInput

                    label="Bank Name"

                    placeholder="Select Bank"

                    value={bankName}

                    onChange={(e) =>

                        setBankName(e.target.value)

                    }

                />

                <AuthInput

                    label="Account Number"

                    placeholder="0123456789"

                    value={accountNumber}

                    onChange={(e) =>

                        setAccountNumber(e.target.value)

                    }

                />

                <AuthInput

                    label="Account Name"

                    placeholder="John Doe"

                    value={accountName}

                    onChange={(e) =>

                        setAccountName(e.target.value)

                    }

                />

            </div>

            <div className="mt-10">

                <Button

                    variant="dark"

                    disabled={!isValid}

                    onClick={handleContinue}

                >

                    Save and Continue

                </Button>

            </div>

        </AuthContainer>

    );

};

export default FleetProfile;