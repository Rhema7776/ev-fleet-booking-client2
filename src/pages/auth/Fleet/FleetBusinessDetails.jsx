import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import AuthInput from "@/components/auth/AuthInput";
import AuthPage from "@/components/auth/AuthPage";
import TermsFooter from "@/components/auth/TermsFooter";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

const FleetBusinessDetails = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [companyName, setCompanyName] = useState("");

    const [contactPerson, setContactPerson] = useState("");

    



    const isValid =
    companyName.trim().length > 0 &&
    contactPerson.trim().length > 0;



    const handleContinue = () => {

        navigate(ROUTES.FLEET_REGISTER, {

            state: {

                companyName,

                contactPerson,

            },

        });

    };

    return (

        <AuthContainer>
            <AuthPage>

            <div className="flex items-center gap-3">
                <AuthBackButton />

                <AuthProgressBar
                    current={1}
                    total={5}
                />
            </div>

            <AuthHeader
                title={
                    <>
                        <span className="text-[#7B7F86]">
                            Create your
                        </span>{" "}

                        <span className="text-[#071B14]">
                            fleet
                        </span>

                        <br />

                        <span className="text-[#071B14]">
                            owner account!
                        </span>
                    </>
                }
            />

            <div className="space-y-5 mt-8">

                <AuthInput
                    label="Business Name"
                    placeholder="Enter business name"
                    value={companyName}
                    onChange={(e) =>
                        setCompanyName(e.target.value)
                    }
                />

                <AuthInput
                    label="Contact Person"
                    placeholder="Enter contact person"
                    value={contactPerson}
                    onChange={(e) =>
                        setContactPerson(e.target.value)
                    }
                />

            </div>

            <div className="mt-10">

               <Button
                    variant={isValid ? "dark" : "disabled"}
                    disabled={!isValid}
                    loading={loading}
                    onClick={handleContinue}
                >
                    Continue
                </Button>

            </div>
           
            <TermsFooter />
            </AuthPage>

        </AuthContainer>

    );

};

export default FleetBusinessDetails;