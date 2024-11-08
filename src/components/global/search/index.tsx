import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useMutationData } from '@/hooks/useMutationData';
import { useSearch } from '@/hooks/useSearch';
import { useQueryClient } from '@tanstack/react-query';
import { User } from 'lucide-react';
import Loader from '../loader';
import { inviteMembers } from '@/actions/user';

type Props = {
	workspaceId: string;
};

const Search = ({ workspaceId }: Props) => {
	const { query, onSearchQuery, isFetching, onUsers } = useSearch(
		'get-users',
		'USERS'
	);
	//TODO: Wire up sending invitations to users
	const { isPending, mutate } = useMutationData(
		['invite-member'],
		(data: { receiverId: string; email: string }) =>
			inviteMembers(workspaceId, data.receiverId, data.email)
	);

	return (
		<div className='flex flex-col gap-y-5'>
			<Input
				onChange={onSearchQuery}
				value={query}
				className='bg-transparent bottom-2 outline-none'
				placeholder='Search for users...'
				type='text'
			/>
			{isFetching ? (
				<div className='flex flex-col gap-y-2'>
					<Skeleton className='w-full h-8 rounded-xl' />
				</div>
			) : !onUsers ? (
				<p className='text-center text-sm text-[#a4a4a4]'>No Users Found</p>
			) : (
				<div>
					{onUsers.map((user) => (
						<div
							key={user.id}
							className='flex gap-x-3 items-center border-2 w-full p-3 rounded-xl'
						>
							<Avatar>
								<AvatarImage src={user.image as string} alt='user logo' />
								<AvatarFallback>
									<User />
								</AvatarFallback>
							</Avatar>
							<div className='flex flex-col items-start'>
								<h3 className='text-bold text-lg capitalize'>
									{user.firstname} {user.lastname}
								</h3>
								<p className='lowercase text-xs bg-white px-2 rounded-lg text-[#1e1e1e]'>
									{user.subscription?.plan}
								</p>
							</div>
							<div className='flex-1 flex justify-end items-center'>
								<Button
									onClick={() =>
										mutate({ receiverId: user.id, email: user.email })
									}
									variant='default'
									className='w-5/12 font-bold'
								>
									<Loader state={isPending} color='#000'>
										Invite
									</Loader>
								</Button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Search;
