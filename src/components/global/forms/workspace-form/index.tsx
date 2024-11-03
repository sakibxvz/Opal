import { useCreateWorkspace } from '@/hooks/useCreateWorkspace';
import FormGenerator from '../../form-generator';
import { Button } from '@/components/ui/button';
import Loader from '../../loader';

const WorkspaceForm = () => {
	const { errors, isPending, onFormSubmit, register } = useCreateWorkspace();
	return (
		<form onSubmit={onFormSubmit} className='flex flex-col gap-y-3'>
			<FormGenerator
				name='name'
				placeholder={'Workspace Name'}
				label='Workspace Name'
				errors={errors}
				inputType='input'
				type='text'
				register={register}
			/>
			<Button
				className='text-sm w-full mt-2'
				type='submit'
				disabled={isPending}
			>
				<Loader state={isPending}>Create Workspace</Loader>
			</Button>
		</form>
	);
};

export default WorkspaceForm;
