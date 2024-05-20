import { useState } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import Form from './form';
import Link from 'next/link';
import { getFriendlyErrorMessage } from '@/app/auth/utils/errorMessages';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (e : React.FormEvent ) => {
        e.preventDefault();
        try {
            await signIn(email, password)
            router.push('/console');
        } catch (error : any) {
            console.log(error.code);
            setError(getFriendlyErrorMessage(error.code));
        }
    };

    return (
        <Form title="Log In" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Email"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Password"
                />
            {error && (
            <p className="mt-2 text-sm text-red-600">
                {error}
            </p>
            )}
            </div>
            <div>
                <button
                    type="submit"
                    className="block w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Log In
                </button>
            </div>
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                Not a user yet?{' '}
                <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                    <span> Sign Up </span>
                </Link>
                </p>
            </div>
        </Form>
    );
}

