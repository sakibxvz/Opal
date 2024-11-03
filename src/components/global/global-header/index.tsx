'use client';
import { WorkSpace } from '@prisma/client';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
	workspace: WorkSpace;
};

const GlobalHeader = ({ workspace }: Props) => {
	//pathname
	const pathName = usePathname().split(`/dashboard/${workspace.id}`)[1];
	return (
		<article className='felx felx- col gap-2'>
			<span className='text-[#707070] text-xs'>
				{workspace.type.toLocaleLowerCase()}
			</span>
			<h1 className='text-4xl'>
				{pathName && !pathName.includes('folder')
					? pathName.charAt(0).toUpperCase() + pathName.slice(1)
					: 'My Libary'}
			</h1>
		</article>
	);
};

export default GlobalHeader;
