import { MdxViewer } from '@/components/mdx-viewer';
import { getBlogPosts } from '@/db/blog';
import { notFound } from 'next/navigation';

const BlogById = () => {
    let post = getBlogPosts().find((post) => post.slug === 'test');
    if (!post) {
        notFound();
    }
    return (
        <article className='prose-quoteless prose prose-neutral mx-auto max-w-screen-md dark:prose-invert '>
            <MdxViewer source={post.content} />
        </article>
    );
};

export default BlogById;
