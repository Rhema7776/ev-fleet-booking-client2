import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    ImagePlus,
    ChevronDown,
    Check,
} from "lucide-react";

import AuthContainer from "@/components/auth/AuthContainer";
import AuthBackButton from "@/components/auth/AuthBackButton";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthProgressBar from "@/components/auth/AuthProgressBar";
import Button from "@/components/ui/button";

import { ROUTES } from "@/constants/routes";

const CompleteEnterpriseProfile = () => {

    const navigate = useNavigate();
    const location = useLocation();

    console.log(location.state);

    const {
        email,
        businessName,
        contactPerson,
        phoneNumber,
    } = location.state || {};

    const fileInputRef = useRef(null);

    const [logoFile, setLogoFile] = useState(null);

    const [logoPreview, setLogoPreview] = useState("");

    const [businessDescription, setBusinessDescription] = useState("");

    const [operatingCities, setOperatingCities] = useState("");

    const handleLogoUpload = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setLogoFile(file);

        setLogoPreview(URL.createObjectURL(file));

    };

    const enterpriseData = {

        email,
        businessName,
        contactPerson,
        phoneNumber,
        businessDescription,
        operatingCities,
        logo: logoFile,
        logoPreview,

    };

    const handleDone = () => {

        navigate(
            ROUTES.ENTERPRISE_SUCCESS,
            {
                state: {
                    enterpriseData,
                },
            }
        );

    };

    const handleSkip = () => {

        navigate(
            ROUTES.ENTERPRISE_SUCCESS,
            {
                state: {
                    enterpriseData,
                },
            }
        );

    };

    const canContinue =
        logoPreview &&
        businessDescription.trim() &&
        operatingCities.trim();

    return (

        <AuthContainer>
            <div className="flex items-center gap-3">
                <AuthBackButton />

                <AuthProgressBar
                    current={4}
                    total={5}
                />

            </div>


            <AuthHeader
                stacked
                darkText="Complete"
                lightText="your profile"
            />

            <div className="mt-10 space-y-7">

                {/* Logo Upload */}

                <div>

                    <button

                        type="button"

                        onClick={() =>
                            fileInputRef.current.click()
                        }

                        className={`
                            w-full
                            rounded-full
                            border
                            h-20
                            px-6
                            flex
                            items-center
                            gap-5
                            transition-all
                            duration-300

                            ${
                                logoPreview
                                    ? "border-brand-primary shadow-md"
                                    : "border-slate-300"
                            }
                        `}
                    >

                        <div
                            className="
                                w-12
                                h-12
                                rounded-full
                                bg-slate-100
                                overflow-hidden
                                flex
                                items-center
                                justify-center
                                shrink-0
                            "
                        >

                            {
                                logoPreview ?

                                    <img

                                        src={logoPreview}

                                        className="w-full h-full object-cover"

                                    />

                                :

                                    <ImagePlus
                                        size={24}
                                        className="text-slate-500"
                                    />

                            }

                        </div>

                        <div className="text-left flex-1">

                            <p className="font-semibold">

                                {
                                    logoPreview ?

                                        "Logo selected"

                                    :

                                        "Add your logo"

                                }

                            </p>

                            {
                                logoFile &&

                                <p className="text-xs text-slate-500 truncate">

                                    {logoFile.name}

                                </p>
                            }

                        </div>

                        {
                            logoPreview &&

                            <Check
                                className="text-brand-primary"
                            />
                        }

                    </button>

                    <input

                        ref={fileInputRef}

                        hidden

                        type="file"

                        accept="image/*"

                        onChange={handleLogoUpload}

                    />

                </div>

                {/* Business Description */}

                <div>

                    <label className="font-medium">

                        Business description

                    </label>

                    <textarea

                        rows={6}

                        value={businessDescription}

                        onChange={(e)=>
                            setBusinessDescription(e.target.value)
                        }

                        placeholder="What kind of services does your business run?"

                        className="
                            mt-2
                            w-full
                            rounded-3xl
                            border
                            border-slate-300
                            px-5
                            py-4
                            resize-none
                            focus:outline-none
                            focus:border-brand-primary
                            focus:ring-2
                            focus:ring-brand-primary/20
                            transition
                        "

                    />

                </div>

                {/* Operating Cities */}

                <div>

                    <label className="font-medium">

                        Operating cities

                    </label>

                    <div className="relative">

                        <input

                            value={operatingCities}

                            onChange={(e)=>
                                setOperatingCities(e.target.value)
                            }

                            placeholder="Lagos, Abuja"

                            className="
                                mt-2
                                w-full
                                rounded-full
                                border
                                border-slate-300
                                h-14
                                px-5
                                pr-14
                                focus:outline-none
                                focus:border-brand-primary
                                focus:ring-2
                                focus:ring-brand-primary/20
                            "

                        />

                        <ChevronDown

                            size={20}

                            className="
                                absolute
                                right-5
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "

                        />

                    </div>

                </div>

            </div>

            {/* Footer */}

            <div className="flex gap-4 mt-14">

                <Button

                    variant="secondary"

                    className="flex-1"

                    onClick={handleSkip}

                >

                    Skip

                </Button>

                <Button

                    variant="dark"

                    className="flex-[2]"

                    disabled={!canContinue}

                    onClick={handleDone}

                >

                    Done

                </Button>

            </div>

        </AuthContainer>

    );

};

export default CompleteEnterpriseProfile;