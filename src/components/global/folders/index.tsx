'use client'
import FolderDuotone from '@/components/icons/folder-duotone';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

import React, { useCallback } from 'react';
import Folder from './folder';

type Props = {
	workspaceId: string;
};



const Folders = ({ workspaceId }: Props) => {
    const handleWheel = useCallback(
			(event: React.WheelEvent<HTMLDivElement>) => {
				event.preventDefault();
				const container = event.currentTarget;
				const scrollAmount = event.deltaY * 2; // Adjust the multiplier for speed
				container.scrollBy({
					left: scrollAmount,
					behavior: 'smooth',
				});
			},
			[]
		);
	// get folders from workspaceId
	// optimastic variabel
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<FolderDuotone />
					<h2 className='text-[#BDBDBD] text-xl'>Folders</h2>
				</div>
				<div className='flex items-center gap-2'>
					<p className='text-[#BDBDBD] '>See all</p>
					<ArrowRight color='#707070' />
				</div>
			</div>
			<section
				onWheel={handleWheel}
				className={cn(
					'flex items-center gap-4 overflow-x-auto w-full hide-scrollbar show-scrollbar-on-hover pb-2'
				)}
			>
				<Folder name='Folder Title' />
				<Folder name='Folder Title' />
				<Folder name='Folder Title' />
				<Folder name='Folder Title' />
				<Folder name='Folder Title' />
				<Folder name='Folder Title' />
				<Folder name='Folder Title' />
				<Folder name='Folder Title' />
			</section>
		</div>
	);
};

export default Folders;
