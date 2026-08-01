const AuthDivider = () => {
    return (
        <div className="flex items-center gap-4 my-8">

            <div className="flex-1 h-px bg-gray-200" />

            <span className="text-sm text-gray-400">
                or
            </span>

            <div className="flex-1 h-px bg-gray-200" />

        </div>
    );
};

export default AuthDivider;