'use client';

import { useState } from 'react';
import { useAuth } from '@/app/hooks/useAuth';

export default function Page() {
    const { user } = useAuth();
    const [imagePath, setImagePath] = useState('');
    const [versionTag, setVersionTag] = useState('');
    const [dockerOptions, setDockerOptions] = useState('');
    const [jobName, setJobName] = useState('');
    const [launchMode, setLaunchMode] = useState('docker-run');
    const [command, setCommand] = useState('')
    const [args, setArgs] = useState('');
    const [cpuLimit, setCpuLimit] = useState<number | ''>(1);
    const [memoryLimit, setMemoryLimit] = useState<number | ''>(5);

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            console.log('Please sign in before submitting a job');
            return;
        }
    
        const payload = {
            buyer_id: user?.uid || '', // Assuming `user.uid` is the buyer_id
            image_name: `${imagePath.trim()}:${versionTag.trim()}`,
            command: [command.trim()],
            args: args.split(" ").filter(x => x.trim() !== ''),
            cpu_limits: `${cpuLimit}`,
            memory_limits: `${memoryLimit}Gi`,
            namespace: 'default',
            job_name: jobName.trim()
        };
    
        try {
            const response = await fetch('http://localhost:8080/api/add-job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        
            if (!response.ok) {
                console.log(response);
                throw new Error('Network response was not ok');
            }
        
            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col p-6 bg-gray-100">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Submit a Docker Image to run</h2>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image Path/Tag<span className="text-red-500">*</span></label>
            <input
                type="text"
                value={imagePath}
                onChange={(e) => setImagePath(e.target.value)}
                placeholder="Enter full docker image/tag name for docker pull"
                className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Version Tag<span className="text-red-500">*</span></label>
            <input
                type="text"
                value={versionTag}
                onChange={(e) => setVersionTag(e.target.value)}
                placeholder="Image Version"
                className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Docker Options</label>
            <input
                type="text"
                value={dockerOptions}
                onChange={(e) => setDockerOptions(e.target.value)}
                placeholder="Docker create/run options"
                className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Job Name<span className="text-red-500">*</span></label>
            <input
                type="text"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
                placeholder="Unique job name"
                className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            />
            </div>
            <h2 className="text-2xl font-bold mb-4">Launch Mode<span className="text-red-500">*</span></h2>
            <div className="mb-4">
            <div className="flex items-center">
                <input
                type="radio"
                id="docker-run"
                name="launchMode"
                value="docker-run"
                checked={launchMode === 'docker-run'}
                onChange={() => setLaunchMode('docker-run')}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                required
                />
                <label htmlFor="docker-run" className="ml-3 block text-sm font-medium text-gray-700">
                Docker Run: use docker ENTRYPOINT.
                </label>
            </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Memory Limit<span className="text-red-500">*</span>: {memoryLimit} GiB</label>
                    <input
                        type="range"
                        value={memoryLimit}
                        onChange={(e) => setMemoryLimit(Number(e.target.value))}
                        min="0"
                        max="10"
                        step="0.1"
                        className="w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">CPU Limit<span className="text-red-500">*</span>: {cpuLimit} cores</label>
                    <input
                        type="range"
                        value={cpuLimit}
                        onChange={(e) => setCpuLimit(Number(e.target.value))}
                        min="0"
                        max="4"
                        step="1"
                        className="w-full"
                        required
                    />
                </div>
            <h2 className="text-2xl font-bold mb-4">On-start Script</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Bash command<span className="text-red-500">*</span></label>
                <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="Bash command to run in container, eg. 'python3'"
                    className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Bash arguments<span className="text-red-500">*</span></label>
                <input
                    type="text"
                    value={args}
                    onChange={(e) => setArgs(e.target.value)}
                    placeholder="Arguments for bash command, eg. 'main.py 8000'"
                    className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mt-6">
            <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Submit
            </button>
            </div>
        </form>
        </main>
    );
}
