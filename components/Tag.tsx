import { classNames } from '../utils';

interface TagInterface { 
    text: string;
    Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
    classes: string;
    onClick: () => void;
}

export default function Tag ({
    text,
    classes,
    Icon,
    onClick
    }: TagInterface) {
  return (
    <span className={classNames("ml-2 mt-2 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium text-white", classes)}>
    {text}
    <Icon onClick={onClick} className="h-5 w-5 ml-1" aria-hidden="true" />
  </span>
)
}