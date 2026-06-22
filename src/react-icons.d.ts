import 'react-icons';
declare module 'react-icons' {
    export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
        className?: string;
    }
}
