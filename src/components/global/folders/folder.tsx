'use client';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import Loader from '../loader';
import FolderDuotone from '@/components/icons/folder-duotone';
import { useRef, useState } from 'react';
import { useMutationData } from '@/hooks/useMutationData';
import { renameFolders } from '@/actions/workspace';
import { Input } from '@/components/ui/input';

type Props = {
	name: string;
	id: string;
	optimistic?: boolean;
	count?: number;
};

const Folder = ({ name, id, optimistic, count }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const folderCradRef = useRef<HTMLDivElement>(null);

	const pathName = usePathname();
	const router = useRouter();
	const [onRename, setOnRename] = useState(false);

	const Rename = () => setOnRename(true);
	const Renamed = () => setOnRename(false);

	//WIP: add loading state

	// Optimistic
	const { mutate, isPending } = useMutationData(
		['rename-folders'],
		(data: { name: string }) => renameFolders(id, name),
		'workspace-folders',
		Renamed
	);

    const handleFolderClick = () => {
        if (onRename) return;
		router.push(`${pathName}/folder/${id}`);
	};

	const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
		e.stopPropagation();
		Rename();
	};

	const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
		if (inputRef.current && folderCradRef.current) {
			if (inputRef.current.value) {
				mutate({ name: inputRef.current.value, id });
			} else Renamed();
		}
	};

	return (
		<div
			onClick={handleFolderClick}
			ref={folderCradRef}
			className={cn(
				'flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px]'
			)}
		>
			<Loader state={false}>
				<div className='flex flex-col gap-[1px]'>
					{onRename ? (
						<Input
							onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
								updateFolderName(e);
							}}
							autoFocus
							placeholder={name}
							className='border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0'
							ref={inputRef}
						/>
					) : (
						<p
							onClick={(e) => e.stopPropagation()}
							onDoubleClick={handleNameDoubleClick}
							className='text-neutral-300'
						>
							{name}
						</p>
					)}

					<span className='text-sm text-neutral-500 '>{count || 0} videos</span>
				</div>
			</Loader>
			<FolderDuotone />
		</div>
	);
};

export default Folder;
