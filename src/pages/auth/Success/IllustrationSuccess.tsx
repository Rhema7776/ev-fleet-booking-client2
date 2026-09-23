import AuthSuccessLayout from "./AuthSuccessLayout";

interface IllustrationSuccessProps {
  image: string;
  image2: string;
  title: string;
  description: string;
  buttonText: string;
  redirectTo: string;
}

const IllustrationSuccess = ({
  image,
  image2,
  title,
  description,
  buttonText,
  redirectTo,
}: IllustrationSuccessProps) => {
  return (
    <AuthSuccessLayout buttonText={buttonText} redirectTo={redirectTo}>
      {/* Was w-[199 px] — stray space inside a Tailwind arbitrary value.
          Tailwind can't parse "199 px" as a valid length, so this
          generated no CSS at all; the image has always just rendered at
          its natural intrinsic size instead of the intended 199px. */}
      <img src={image} alt="" className="w-[199px] h-[91px] object-contain" />
      <img src={image2} alt="" className="w-[214px] h-[58px] object-contain" />

      <h1 className="text-white text-3xl header-font leading-none whitespace-pre-line">
        {title}
      </h1>

      <p className="text-white/90 mt-6 max-w-sm">{description}</p>
    </AuthSuccessLayout>
  );
};

export default IllustrationSuccess;
