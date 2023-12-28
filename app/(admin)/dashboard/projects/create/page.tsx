'use client';
export const revalidate = 0;
import { supabaseAdmin } from '@/services/supabase';
import {
    projectCreateFormSchema,
    projectCreateFormType,
} from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
const ProjectCreateForm = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [skill, setSkill] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const router = useRouter();
    const addSkills = () => {
        setSkills((prevState) => [...prevState, skill]);
        setSkill('');
    };
    const removeSkill = (skill: string) => {
        setSkills((prevState) => prevState.filter((prev) => prev !== skill));
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = useForm<projectCreateFormType>({
        resolver: zodResolver(projectCreateFormSchema),
    });
    const image = watch('image');
    useEffect(() => {
        if (image && image.length > 0) {
            setImageUrl(URL.createObjectURL(image['0']));
        }
    }, [image]);
    const onSubmit = async (data: projectCreateFormType) => {
        const fileName = Date.now() + data.image["0"].name;
        const body = {
            title: data.title,
            description: data.description,
            demo: data.demo,
            skills: skills,
            image: fileName
        }
        await supabaseAdmin
            .storage
            .from('projects')
            .upload(`images/${fileName}`, data.image["0"], {
                cacheControl: '3600',
                upsert: false
            })
        await supabaseAdmin.from("projects").insert([body])
        router.push('/dashboard/projects');
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='pb-20 space-y-5'>
            <div className='w-full h-[300px] rounded overflow-hidden'>
                <label
                    htmlFor='dropzone-file'
                    className='relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50'
                >
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                        <svg
                            className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 20 16'
                        >
                            <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                            />
                        </svg>
                        <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                            Click to upload
                        </p>
                    </div>
                    {
                        imageUrl && <Image
                            fill
                            priority
                            sizes={'500'}
                            src={imageUrl}
                            className='w-full object-cover'
                            alt='dd'
                        />
                    }
                    <input
                        {...register('image')}
                        id='dropzone-file'
                        type='file'
                        className='hidden'
                    />
                </label>
            </div>
            <div>
                <label
                    htmlFor='title'
                    className='block text-sm font-medium leading-6 text-slate-400'
                >
                    Title
                </label>
                <div className='mt-2'>
                    <input
                        id='title'
                        type='text'
                        required
                        {...register('title')}
                        className='block w-full rounded-md border-0 bg-gray-300 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                </div>
            </div>
            <div>
                <label
                    htmlFor='description'
                    className='block text-sm font-medium leading-6 text-slate-400'
                >
                    Description
                </label>
                <div className='mt-2'>
                    <input
                        id='description'
                        type='text'
                        required
                        {...register('description')}
                        className='block w-full rounded-md border-0 bg-gray-300 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                </div>
            </div>
            <div>
                <label
                    htmlFor='demo'
                    className='block text-sm font-medium leading-6 text-slate-400'
                >
                    Demo
                </label>
                <div className='mt-2'>
                    <input
                        id='demo'
                        type='text'
                        required
                        {...register('demo')}
                        className='block w-full rounded-md border-0 bg-gray-300 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                </div>
            </div>
            <div>
                <label
                    htmlFor='skills'
                    className='block text-sm font-medium leading-6 text-slate-400'
                >
                    Skills
                </label>
                <div className='mt-2 relative'>
                    <input
                        id='skills'
                        name='skills'
                        type='text'
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        className='block w-full rounded-md border-0 bg-gray-300 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                    <button type={'button'} onClick={addSkills}>
                        <Plus className='text-xl text-slate-900 absolute right-[10px] top-[7px] ' />
                    </button>
                </div>
                <ul className='flex flex-wrap gap-x-2 my-4'>
                    {skills?.map((skill) => (
                        <li
                            className='bg-gray-300 rounded-3xl px-2 py-1'
                            key={skill}
                        >
                            {skill}
                            <X
                                className='inline-flex cursor-pointer'
                                onClick={() => removeSkill(skill)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <button className='flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-white hover:bg-blue-800'>
                {isSubmitting ? <Loader2 className='animate-spin' /> : 'Create'}
            </button>
        </form>
    );
};

export default ProjectCreateForm;
