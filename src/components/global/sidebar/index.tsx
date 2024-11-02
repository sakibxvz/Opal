'use client';
import { getWorkSpaces } from '@/actions/workspace';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useQueryData } from '@/hooks/useQueryData';
import { WorkspaceProps, NotificationProps } from '@/types/index.type';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import Modal from '../modal';
import { PlusCircle } from 'lucide-react';
import Search from '../search';
import { MENU_ITEMS } from '@/constants';
import SidebarItem from './sidebar-item';
import { getNotifications } from '@/actions/user';
import WorkspacePlaceholder from './workspace-placeholder';
import GlobalCard from '../global-card';
import PaymentButton from '../payment-button';

type Props = {
	activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
	const router = useRouter();
	const pathName = usePathname();
	const { data, isFetched } = useQueryData(['user-workspaces'], getWorkSpaces);
	const { data: notifications } = useQueryData(
		['user-notifications'],
		getNotifications
	);

	const { data: workspace } = data as WorkspaceProps;
	const { data: count } = notifications as NotificationProps;

	const menuItems = MENU_ITEMS(activeWorkspaceId);

	const onChangeActiveWorkspace = (value: string) => {
		router.push(`/dashboard/${value}`);
	};

	const currentWorkspace = workspace.workspace.find(
		(workspace) => workspace.id === activeWorkspaceId
	);

	return (
		<div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden'>
			<div className='bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 '>
				<Image src='/opal-logo.svg' height={40} width={40} alt='logo' />
				<p className='text-2xl'>Opal</p>
			</div>

			<Select
				defaultValue={activeWorkspaceId}
				onValueChange={onChangeActiveWorkspace}
			>
				<SelectTrigger className='mt-16 text-neutral-400 bg-transparent'>
					<SelectValue placeholder='Select a workspace'></SelectValue>
				</SelectTrigger>
				<SelectContent className='bg-[#111111] backdrop-blur-xl'>
					<SelectGroup>
						<SelectLabel>Workspaces</SelectLabel>
						<Separator />
						{workspace.workspace.map((workspace) => (
							<SelectItem value={workspace.id} key={workspace.id}>
								{workspace.name}
							</SelectItem>
						))}
						{workspace.members.length > 0 &&
							workspace.members.map(
								(workspace) =>
									workspace.WorkSpace && (
										<SelectItem
											value={workspace.WorkSpace.id}
											key={workspace.WorkSpace.id}
										>
											{workspace.WorkSpace.name}
										</SelectItem>
									)
							)}
					</SelectGroup>
				</SelectContent>
			</Select>
			{currentWorkspace?.type === 'PUBLIC' &&
				workspace.subscription?.plan == 'PRO' && (
					<Modal
						trigger={
							<span className='text-sm cursor-pointer flex items-center justify-center bg-neutral-800/70 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2'>
								<PlusCircle
									size={15}
									className='text-neutral-800/90 fill-neutral-500'
								/>
								<span className='text-neutral-400 font-semibold text-xs'>
									Invite to Workspace
								</span>
							</span>
						}
						title='Invite to Workspace'
						description='Invite other users to your workspace'
					>
						<Search workspaceId={activeWorkspaceId} />
					</Modal>
				)}
			<p className='w-full text-[#9D9D9D] font-bold mt-4'>Menu</p>
			<nav className='w-full'>
				<ul>
					{menuItems.map((item) => (
						<SidebarItem
							href={item.href}
							icon={item.icon}
							selected={pathName === item.href}
							title={item.title}
							key={item.title}
							notifications={
								(item.title === 'Notifications' &&
									count._count &&
									count._count.notification) ||
								0
							}
						/>
					))}
				</ul>
			</nav>
			<Separator className='w-4/5' />
			<p className='w-full text-[#9D9D9D] font-bold mt-4'>Workspaces</p>
			{workspace.workspace.length === 1 && workspace.members.length === 0 && (
				<div className='w-full mt-[-10px] '>
					<p className='text-[#646161] font-medium text-sm'>
						{workspace.subscription?.plan === 'FREE'
							? ' Upgrade to Pro plan to create more workspaces'
							: 'No workspace found'}
					</p>
				</div>
			)}
			<nav className='w-full'>
				<ul className='h-[150px] overflow-auto overflow-x-hidden fade-layer'>
					{/* Render personal workspace */}
					{workspace.workspace.length > 0 &&
						workspace.workspace.map(
							(item) =>
								item.type === 'PERSONAL' && (
									<SidebarItem
										href={`/dashboard/${item.id}`}
										selected={pathName === `/dashboard/${item.id}`}
										title={item.name}
										notifications={0}
										key={item.name}
										icon={
											<WorkspacePlaceholder>
												{item.name.charAt(0)}
											</WorkspacePlaceholder>
										}
									/>
								)
						)}
					{/* Render others workspace */}
					{workspace.members.length > 0 &&
						workspace.members.map((item) => (
							<SidebarItem
								href={`/dashboard/${item.WorkSpace.id}`}
								selected={pathName === `/dashboard/${item.WorkSpace.id}`}
								title={item.WorkSpace.name}
								notifications={0}
								key={item.WorkSpace.name}
								icon={
									<WorkspacePlaceholder>
										{item.WorkSpace.name.charAt(0)}
									</WorkspacePlaceholder>
								}
							/>
						))}
				</ul>
			</nav>
			<Separator className='w-4/5' />
			{workspace.subscription?.plan === 'FREE' && (
				<GlobalCard
					title='Upgrade to Pro'
					description=' Unlock AI features like transcription, AI summary, and more.'
					footer={<PaymentButton />}
				/>
			)}
		</div>
	);
};

export default Sidebar;
