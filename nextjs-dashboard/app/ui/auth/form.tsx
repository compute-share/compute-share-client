import { ReactNode, FormEvent } from 'react';

interface FormProps {
    title: string;
    onSubmit: (e: FormEvent) => void;
    children: ReactNode;
}

const Form = ({ title, onSubmit, children }: FormProps) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={onSubmit} className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center">{title}</h2>
            {children}
        </form>
        </div>
    );
};

export default Form;
