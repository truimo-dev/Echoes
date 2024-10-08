import type {ElementType, FC, HTMLAttributes} from 'react';

interface ComponentProps extends HTMLAttributes<HTMLOrSVGElement> {
    as?: ElementType;
}

const Component: FC<ComponentProps> = ({ as: Tag = 'div', ...props }) => {
    return <Tag {...props} />;
}

export {
    Component
}
