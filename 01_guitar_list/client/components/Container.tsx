import React, { useEffect, useState } from 'react';

import Footer from 'components/Footer';
import Head from 'next/head';
import Link from 'next/link';
import { isServer } from 'utils/isServer';
import useKeypress from 'react-use-keypress';
import { useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/dist/client/router';
import { useTheme } from 'next-themes';
import { withApollo } from 'utils/withApollo';

const Container = (props: any) => {
  const [Mounted, setMounted] = useState<boolean>(false);
  const { resolvedTheme, setTheme } = useTheme();

  const { children, ...customMeta } = props;
  const router = useRouter();

  const { data, loading, error } = useMeQuery({
    variables: {
    },
    skip: isServer(),
  });

  const meta = {
    title: 'Template name',
    description: 'Template description',
    image:
      'https://cdn.discordapp.com/attachments/797485737272541250/893912493255176192/UnicornVectorGradient_7.png',
    type: 'website',
    ...customMeta,
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // useKeypress('t', () => {
  //   if (Mounted === true) setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  // });
  // useKeypress('h', () => {
  //   router.back();
  // });

  let navbar: JSX.Element
  if (loading) {
    //
  }
  else if (!data?.me) {
    navbar = (<div><Link href='/register'>
      <a className='text-gray-600 hover:text-gray-900 dark:hover:text-gray-100 dark:text-gray-300'>
        Register
      </a>
    </Link>
      <Link href='/login'>
        <a className='text-gray-600 hover:text-gray-900 dark:hover:text-gray-100 dark:text-gray-300'>
          Login
        </a>
      </Link></div>)
  } else {
    navbar = (<p>{data.me.username}</p>)
  }

  return (
    <div className='bg-white dark:bg-gray-900'>
      <Head>
        <title>{meta.title}</title>
        <meta name='robots' content='follow, index' />
        <meta content={meta.description} name='description' />
        {/* <meta property="og:url" content={`https://cretu.dev${router.asPath}`} /> */}
        {/* <link rel="canonical" href={`https://cretu.dev${router.asPath}`} /> */}
        <meta property='og:type' content={meta.type} />
        <meta property='og:site_name' content='Template' />
        <meta property='og:description' content={meta.description} />
        <meta property='og:title' content={meta.title} />
        <meta property='og:image' content={meta.image} />
        <meta name='twitter:card' content='summary_large_image' />
        {/* <meta name="twitter:site" content="@cristicrtu" /> */}
        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:description' content={meta.description} />
        <meta name='twitter:image' content={meta.image} />
        {meta.date && (
          <meta property='article:published_time' content={meta.date} />
        )}
      </Head>
      <nav className='flex items-center sticky-nav justify-between w-full max-w-5xl py-6 px-2 sm:px-8 md:px-40 mx-auto bg-white dark:bg-gray-900 bg-opacity-50 text-gray-900 dark:text-gray-100'>
        <div className='flex space-x-2 text-base items-center'>
          <Link href='/'>
            <a className='text-gray-600 hover:text-gray-900 dark:hover:text-gray-100 dark:text-gray-300'>
              Home
            </a>
          </Link>

          {navbar}
        </div>


      </nav>
      <main id='skip' className='flex flex-col  justify-center px-2'>
        <div className='my-24 mx-auto text-gray-900 dark:text-gray-100'>{children}</div>
        <Footer />
      </main>
    </div>
  );
}

export default withApollo({ ssr: false })(Container)