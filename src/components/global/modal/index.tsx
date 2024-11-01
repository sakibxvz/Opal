import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
	trigger: React.ReactNode;
	children: React.ReactNode;
	title: string;
	description: string;
	clssName?: string;
};

const Modal = ({ trigger, children, title, description, clssName }: Props) => {
	return (
		<Dialog>
			<DialogTrigger className={clssName} asChild>
				{trigger}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
