import { classNames } from '../utils';

interface ButtonInterface { 
    radius?: string;
    text: string;
    textSize?: string
    onClick?: () => void
}
export default function Button ({
    text,
    radius,
    textSize,
    onClick
    }: ButtonInterface) {

  return (
    <button
    className={classNames(`bg-black font-semibold hover:shadow-md shadow text-white text-${textSize} px-3 py-2 outline-none focus:outline-none`, radius === 'full' ? 'rounded-full' : 'rounded')}
    onClick={onClick}
    type="button"
    >
    {text}
    </button>
)
}