import IllustrationSuccess from "../Success/IllustrationSuccess";

import { ROUTES } from "@/constants/routes";

import successIllustration from "@/assets/images/individual-success.svg";
import leasehours from "@/assets/images/leasehours.svg";

const IndividualRegistrationSuccess = () => {

    return (

        <IllustrationSuccess

            image={successIllustration}
            image2={leasehours}

            title={"You're in.\nWelcome to\nLeaseHub."}

            description="You're just one step away from booking trips for your clients today."

            buttonText="Let's go"

            redirectTo={ROUTES.DASHBOARD}

        />

    );

};

export default IndividualRegistrationSuccess;