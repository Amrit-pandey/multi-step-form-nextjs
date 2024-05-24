interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    label?: string;
    disabled? :boolean
    outline?: boolean
}

const Button = ({onClick, label, disabled, outline} : ButtonProps) => {
    return(
        <button 
        onClick={onClick}
        disabled={disabled}
        className={`
        relative
        disabled
        rounded-lg
        hover:opacity-80
        transition
        w-full
        disabled:opacity-70
        p-4
        disabled:cursor-not-allowed
        ${outline ? 'bg-white' : "bg-rose-500"}
        ${outline ? 'border border-black' : 'border border-rose-500'}
        ${outline ? "text-black" : "text-white"}
        `}
        >
            {label}
        </button>
    )
}

export default Button;